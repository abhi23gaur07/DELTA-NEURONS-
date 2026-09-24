/**
 * DELTA NEURONS: Backend Server & REST API
 * Built with native Node.js (node:http, node:fs, node:path) + native node:sqlite
 * Port: 3000
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');
const db = require('./database.js');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'frontend');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // -----------------------------------------------------------
  // REST API ROUTES
  // -----------------------------------------------------------

  // 1. Auth: Login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const { username, password } = await parseBody(req);
      const user = db.findUserByUsername(username);

      if (!user || user.password !== password) {
        return sendJson(res, 401, { success: false, message: 'ভুল ব্যৱহাৰকাৰী নাম বা পাছৱৰ্ড (Invalid credentials)' });
      }

      return sendJson(res, 200, {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.full_name,
          role: user.role,
          phone: user.phone
        }
      });
    } catch (e) {
      return sendJson(res, 400, { success: false, message: e.message });
    }
  }

  // 2. Auth: Register
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    try {
      const { username, password, fullName, role, phone } = await parseBody(req);

      if (!username || !password || !fullName || !role) {
        return sendJson(res, 400, { success: false, message: 'Missing required registration fields' });
      }

      const existing = db.findUserByUsername(username);
      if (existing) {
        return sendJson(res, 409, { success: false, message: 'ব্যৱহাৰকাৰী নাম ইতিমধ্যে ব্যৱহৃত (Username already exists)' });
      }

      const newUser = db.createUser(username, password, fullName, role, phone);
      return sendJson(res, 201, {
        success: true,
        user: newUser,
        message: 'সফলভাৱে পঞ্জীয়ন হ’ল (Registered successfully)'
      });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 3. Sync: Status (Health ping)
  if ((pathname === '/api/sync/status' || pathname === '/api/health') && req.method === 'GET') {
    return sendJson(res, 200, {
      online: true,
      status: 'SERVER_ACTIVE',
      serverTime: new Date().toISOString()
    });
  }

  // 4. Sync: Push (Flushes client-side offline queued events into SQLite)
  if (pathname === '/api/sync/push' && req.method === 'POST') {
    try {
      const { queue, userId } = await parseBody(req);
      if (!Array.isArray(queue) || queue.length === 0) {
        return sendJson(res, 200, { success: true, syncedCount: 0 });
      }

      let count = 0;
      queue.forEach(item => {
        if (item.type === 'GAME_SESSION') {
          db.saveGameSession(
            userId || item.payload.userId || 1,
            item.payload.gameName,
            item.payload.score,
            item.payload.latencySec,
            item.payload.accuracyPct,
            item.payload.hintsUsed
          );
          count++;
        } else if (item.type === 'MED_TOGGLE') {
          db.toggleMedication(item.payload.id, item.payload.isTaken);
          count++;
        } else if (item.type === 'HYDRATION') {
          db.recordHydration(userId || 1, item.payload.glassesCount);
          count++;
        }
      });

      db.logSyncAudit(userId || 1, 'BATCH_AUTO_SYNC', count);

      return sendJson(res, 200, {
        success: true,
        syncedCount: count,
        message: `${count} টা তথ্য কেন্দ্ৰীয় ডাটাবেছত সংৰক্ষিত হ’ল (Successfully synced with server)`
      });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 5. Sync: Pull (Fetch latest cloud/server state)
  if (pathname === '/api/sync/pull' && req.method === 'GET') {
    const patientId = Number(parsedUrl.searchParams.get('patientId')) || 1;
    const report = db.getClinicalReport(patientId);
    return sendJson(res, 200, {
      success: true,
      medications: report.medications,
      hydration: report.hydration,
      summary: report.summary
    });
  }

  // 6. Clinical Report (For Doctor)
  if (pathname === '/api/reports/clinical' && req.method === 'GET') {
    const patientId = Number(parsedUrl.searchParams.get('patientId')) || 1;
    const report = db.getClinicalReport(patientId);
    return sendJson(res, 200, { success: true, report });
  }

  // 7. Family Portal: Add Medication
  if (pathname === '/api/family/medication' && req.method === 'POST') {
    try {
      const { patientId, name, time, pillIcon, addedByRole } = await parseBody(req);
      if (!name || !time) {
        return sendJson(res, 400, { success: false, message: 'Medication name and time are required' });
      }
      const newMed = db.addMedication(patientId, name, time, pillIcon, addedByRole || 'family');
      return sendJson(res, 201, { success: true, medication: newMed });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 8. Family Portal: Toggle Medication (Mark Taken / Not Taken)
  if (pathname === '/api/family/medication/toggle' && req.method === 'POST') {
    try {
      const { id, isTaken } = await parseBody(req);
      const updated = db.toggleMedication(id, isTaken);
      return sendJson(res, 200, { success: true, medication: updated });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 9. Family Portal: Add Care Note
  if (pathname === '/api/family/notes' && req.method === 'POST') {
    try {
      const { patientId, authorName, noteText } = await parseBody(req);
      if (!noteText) {
        return sendJson(res, 400, { success: false, message: 'Note text required' });
      }
      const note = db.addFamilyNote(patientId, authorName || 'Family Member', noteText);
      return sendJson(res, 201, { success: true, note });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 10. Admin: Get Users & Stats
  if (pathname === '/api/admin/users' && req.method === 'GET') {
    const users = db.getAllUsers();
    return sendJson(res, 200, { success: true, users });
  }

  if (pathname === '/api/admin/stats' && req.method === 'GET') {
    const stats = db.getDatabaseStats();
    return sendJson(res, 200, { success: true, stats });
  }

  // 11. Head Admin: Universal Inspection Overview (All Tables)
  if (pathname === '/api/headadmin/overview' && req.method === 'GET') {
    const overview = db.getHeadAdminOverview();
    return sendJson(res, 200, { success: true, overview });
  }

  // -----------------------------------------------------------
  // STATIC FILE SERVING
  // -----------------------------------------------------------
  let relativePath = pathname === '/' ? 'login.html' : pathname.replace(/^\//, '');
  if (relativePath === 'login') relativePath = 'login.html';
  if (relativePath === 'app') relativePath = 'index.html';
  const filePath = path.join(PUBLIC_DIR, relativePath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ ERROR: Port ${PORT} is already in use by another process.`);
    console.error(`👉 Close the existing server instance or run with PORT=3001.\n`);
  } else {
    console.error('\n❌ Server error:', err);
  }
});

process.on('uncaughtException', (err) => {
  console.error('\n⚠️ Uncaught Exception caught (server kept alive):', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('\n⚠️ Unhandled Rejection caught (server kept alive):', reason);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
============================================================
  🧠 DELTA NEURONS: Full-Stack Platform Active!
============================================================
  🌐 Local URL:       http://localhost:${PORT}
  📁 Database:        SQLite (delta_neurons.db)
  🔄 Auto-Sync:       Active (/api/sync/push, /api/sync/pull)
  👥 Pre-seeded Users:
     • Patient:       bapuji       / pass123
     • Doctor:        dr_sharma    / doc123
     • Family:        anita_family / family123
     • Admin:         admin        / admin123
     • Head Admin:    head_admin   / head123
============================================================
  `);
});

