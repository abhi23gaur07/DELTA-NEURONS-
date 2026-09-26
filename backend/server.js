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
const { classifyDementiaStage } = require('./ai_model/model_classifier.js');
const { generateClinicalDementiaReport } = require('./ai_model/clinical_report_generator.js');

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
      const body = await parseBody(req);
      const { username, password, fullName, role, phone, ...extraData } = body;

      if (!username || !password || !fullName || !role) {
        return sendJson(res, 400, { success: false, message: 'Missing required registration fields' });
      }

      const existing = db.findUserByUsername(username);
      if (existing) {
        return sendJson(res, 409, { success: false, message: 'ব্যৱহাৰকাৰী নাম ইতিমধ্যে ব্যৱহৃত (Username already exists)' });
      }

      const newUser = db.createUser(username, password, fullName, role, phone, extraData);
      return sendJson(res, 201, {
        success: true,
        user: newUser,
        message: 'সফলভাৱে পঞ্জীয়ন হ’ল (Registered successfully in Delta Neurons Database)'
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
        if (item.type === 'GAME_SESSION' || item.type === 'EXERCISE_SESSION') {
          db.saveGameSession(
            userId || item.payload.userId || 1,
            item.payload.gameName,
            item.payload.score || 80,
            item.payload.latencySec || 5.0,
            item.payload.accuracyPct || 85,
            item.payload.hintsUsed || 0
          );
          count++;
        } else if (item.type === 'MED_TOGGLE') {
          db.toggleMedication(item.payload.id, item.payload.isTaken);
          count++;
        } else if (item.type === 'MED_ADD') {
          db.addMedication(
            item.payload.patientId || userId || 1,
            item.payload.name,
            item.payload.time,
            item.payload.pillIcon || '💊',
            item.payload.instructions || ''
          );
          count++;
        } else if (item.type === 'HYDRATION') {
          db.recordHydration(userId || 1, item.payload.glassesCount);
          count++;
        } else if (item.type === 'OFFLINE_PROGRESS') {
          db.saveOfflineProgress(userId || item.payload.userId || 1, item.payload.progress || item.payload);
          count++;
        }
      });

      db.logSyncAudit(userId || 1, 'BATCH_AUTO_SYNC', count);

      return sendJson(res, 200, {
        success: true,
        syncedCount: count,
        message: `${count} টা অফলাইন তথ্য কেন্দ্ৰীয় ডাটাবেছত সংৰক্ষিত হ’ল (Successfully synced with server)`
      });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 4b. Sync: Offline Progress Snapshot
  if (pathname === '/api/sync/offline-progress' && req.method === 'POST') {
    try {
      const { userId, progress } = await parseBody(req);
      const resData = db.saveOfflineProgress(userId || 1, progress || {});
      return sendJson(res, 200, { success: true, ...resData });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  if (pathname === '/api/sync/offline-progress' && req.method === 'GET') {
    try {
      const uId = parsedUrl.searchParams.get('userId') || 1;
      const progress = db.getOfflineProgress(Number(uId));
      return sendJson(res, 200, { success: true, data: progress });
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

  // 10b. Admin: Get Registered Patients Database
  if (pathname === '/api/admin/patients' && req.method === 'GET') {
    const patients = db.getRegisteredPatients();
    return sendJson(res, 200, { success: true, patients });
  }

  // 10c. Admin: Get Registered Doctors Database
  if (pathname === '/api/admin/doctors' && req.method === 'GET') {
    const doctors = db.getRegisteredDoctors();
    return sendJson(res, 200, { success: true, doctors });
  }

  // 10d. Admin: Get Registered Caregivers Database
  if (pathname === '/api/admin/caregivers' && req.method === 'GET') {
    const caregivers = db.getRegisteredCaregivers();
    return sendJson(res, 200, { success: true, caregivers });
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

  // 12. Doctor Portal: Prescribe / Add Medication
  if (pathname === '/api/doctor/medication' && req.method === 'POST') {
    try {
      const { patientId, name, time, pillIcon, instructions } = await parseBody(req);
      if (!name || !time) {
        return sendJson(res, 400, { success: false, message: 'Medication name and time are required' });
      }
      const medName = instructions ? `${name} (${instructions})` : name;
      const newMed = db.addMedication(patientId || 1, medName, time, pillIcon || '💊', 'doctor');
      return sendJson(res, 201, { success: true, medication: newMed, message: 'Prescription added successfully' });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 13. Doctor Portal: Delete / Discontinue Medication
  if (pathname === '/api/doctor/medication' && req.method === 'DELETE') {
    try {
      const { id } = await parseBody(req);
      if (!id) {
        return sendJson(res, 400, { success: false, message: 'Medication ID required' });
      }
      db.deleteMedication(id);
      return sendJson(res, 200, { success: true, message: 'Medication discontinued' });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 14. AI Engine: 7-Stage Dementia Classifier
  if (pathname === '/api/ai/classify-dementia-stage' && req.method === 'POST') {
    try {
      const assessmentData = await parseBody(req);
      const classification = classifyDementiaStage(assessmentData);
      return sendJson(res, 200, { success: true, classification });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 15. AI Engine: Generate & Save Clinical Dementia Staging Report
  if (pathname === '/api/ai/generate-report' && req.method === 'POST') {
    try {
      const { patientId, assessmentData, doctorInfo, saveToDb } = await parseBody(req);
      const pId = Number(patientId) || 1;
      
      // Get patient details from DB
      const patientRecord = db.getClinicalReport(pId).patient || { id: pId, full_name: 'Bapuji Goswami', age: 72 };
      const patient = {
        id: patientRecord.user_id || patientRecord.id || pId,
        fullName: patientRecord.full_name || 'Bapuji Goswami',
        age: patientRecord.age || 72,
        location: patientRecord.location || 'Dispur, Guwahati (Assam)',
        emergencyContact: patientRecord.emergency_contact || '+91 94350 98765'
      };

      const report = generateClinicalDementiaReport(patient, assessmentData || {}, doctorInfo);

      if (saveToDb !== false) {
        const saved = db.saveDementiaAIReport({
          patientId: pId,
          doctorId: doctorInfo ? doctorInfo.id : 2,
          predictedStage: report.staging.stageNumber,
          stageName: report.staging.stageName,
          confidencePct: report.staging.confidencePct,
          stageDescription: report.staging.stageDescription,
          clinicalSummary: `Stage ${report.staging.stageNumber}: ${report.staging.stageName} (${report.staging.gdsEquivalent}) - Evaluated for ${patient.fullName}`,
          cognitiveDomainScores: report.domainAnalysis,
          riskFactors: report.riskFactors,
          recommendedMedications: report.carePlan.pharmacologicalRecommendations,
          recommendedExercises: report.carePlan.prescribedChairYogaBreathing,
          recommendedGames: report.carePlan.prescribedCognitiveGames,
          caregiverGuidance: report.carePlan.caregiverGuidance,
          rawAssessment: assessmentData
        });
        report.savedRecordId = saved ? saved.id : null;
      }

      return sendJson(res, 200, { success: true, report });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 16. AI Engine: Fetch Past Dementia Reports
  if (pathname === '/api/ai/reports' && req.method === 'GET') {
    const patientId = parsedUrl.searchParams.get('patientId');
    const reports = db.getDementiaAIReports(patientId ? Number(patientId) : null);
    return sendJson(res, 200, { success: true, reports });
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

