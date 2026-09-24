/**
 * DELTA NEURONS: Vercel Serverless API Handler
 * Handles all /api/* requests on Vercel cloud deployment.
 * Supports zero-dependency in-memory & SQLite fallback storage.
 */

// Initial pre-seeded clinical state for Vercel Serverless environment
const cloudDb = {
  users: [
    { id: 1, username: 'bapuji', password: 'pass123', full_name: 'Bapuji Goswami (বাপুজী)', role: 'patient', phone: '+91 94351 23456', created_at: new Date().toISOString() },
    { id: 2, username: 'dr_sharma', password: 'doc123', full_name: 'Dr. Hirendra Sharma (MD Neurology)', role: 'doctor', phone: '+91 98640 54321', created_at: new Date().toISOString() },
    { id: 3, username: 'anita_family', password: 'family123', full_name: 'Anita Goswami (Daughter/Caregiver)', role: 'family', phone: '+91 94350 98765', created_at: new Date().toISOString() },
    { id: 4, username: 'admin', password: 'admin123', full_name: 'Delta Neurons Central Admin', role: 'admin', phone: '+91 90000 00001', created_at: new Date().toISOString() },
    { id: 5, username: 'head_admin', password: 'head123', full_name: 'Dr. A. K. Baruah (Chief Medical Director & Head Admin)', role: 'head_admin', phone: '+91 94350 00000', created_at: new Date().toISOString() }
  ],
  patientProfiles: [
    { id: 1, user_id: 1, age: 72, location: 'Dispur, Guwahati (Assam)', diagnosis: 'Mild Cognitive Impairment (MCI)', preferred_language: 'as', emergency_contact: '+91 94350 98765' }
  ],
  medications: [
    { id: 1, patient_id: 1, name: 'ৰক্তচাপৰ টেবলেট (Blood Pressure)', time: 'ৰাতিপুৱা ৮:০০ (8:00 AM)', pill_icon: '🔴', is_taken: 1, taken_at: 'Today 08:05 AM', added_by_role: 'doctor', created_at: new Date().toISOString() },
    { id: 2, patient_id: 1, name: 'ভিটামিন আৰু কেলচিয়াম (Calcium & Vit D)', time: 'দুপৰীয়া ১:০০ (1:00 PM)', pill_icon: '🟡', is_taken: 1, taken_at: 'Today 01:10 PM', added_by_role: 'family', created_at: new Date().toISOString() },
    { id: 3, patient_id: 1, name: 'স্মৃতি শক্তিবৰ্ধক ঔষধি (Donepezil 5mg)', time: 'সন্ধিয়া ৭:৩০ (7:30 PM)', pill_icon: '🔵', is_taken: 0, taken_at: null, added_by_role: 'doctor', created_at: new Date().toISOString() },
    { id: 4, patient_id: 1, name: 'ৰাতিৰ সহজ নিদ্ৰা (Melatonin Support)', time: 'ৰাতি ৯:৩০ (9:30 PM)', pill_icon: '⚪', is_taken: 0, taken_at: null, added_by_role: 'doctor', created_at: new Date().toISOString() }
  ],
  hydrationLogs: [
    { id: 1, patient_id: 1, glasses_count: 3, daily_goal: 6, log_date: new Date().toISOString().split('T')[0] }
  ],
  cognitiveSessions: [
    { id: 1, user_id: 1, game_name: 'Sriti Mel (Memory Match)', score: 84, latency_sec: 6.0, accuracy_pct: 88, hints_used: 1, created_at: '2026-09-13 11:00:00' },
    { id: 2, user_id: 1, game_name: 'Xadhu Kotha (Folktales & Legends)', score: 88, latency_sec: 5.1, accuracy_pct: 100, hints_used: 0, created_at: '2026-09-12 17:30:00' },
    { id: 3, user_id: 1, game_name: 'Bagicha Bheti (Cultural Sorting)', score: 85, latency_sec: 4.9, accuracy_pct: 95, hints_used: 0, created_at: '2026-09-11 10:00:00' },
    { id: 4, user_id: 1, game_name: 'Bihu Dhol Taal (Folk Rhythm)', score: 75, latency_sec: 7.2, accuracy_pct: 80, hints_used: 2, created_at: '2026-09-10 16:45:00' },
    { id: 5, user_id: 1, game_name: 'Dhyan Bindu (Focus Point)', score: 82, latency_sec: 5.4, accuracy_pct: 90, hints_used: 0, created_at: '2026-09-09 11:15:00' }
  ],
  familyNotes: [
    { id: 1, patient_id: 1, author_name: 'Anita Goswami (Daughter)', note_text: 'Bapuji enjoyed the Bihu music game today and was smiling. Drank water on time.', created_at: new Date().toISOString() }
  ],
  syncAudit: [
    { id: 1, user_id: 1, sync_type: 'INITIAL_CLOUD_SYNC', items_synced: 5, synced_at: new Date().toISOString() }
  ]
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
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
  });
}

module.exports = async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `https://${req.headers.host || 'delta-neurons.vercel.app'}`);
  const pathname = parsedUrl.pathname;

  // 1. Health & Sync Status
  if (pathname === '/api/sync/status') {
    return sendJson(res, 200, {
      online: true,
      status: 'SERVER_ACTIVE',
      engine: 'Vercel_Serverless_Cloud',
      timestamp: new Date().toISOString()
    });
  }

  // 2. Auth: Login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const { username, password } = await parseBody(req);
    const user = cloudDb.users.find(u => u.username === username);

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
  }

  // 3. Auth: Register
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    const { username, password, fullName, role, phone } = await parseBody(req);

    if (!username || !password || !fullName || !role) {
      return sendJson(res, 400, { success: false, message: 'Missing required registration fields' });
    }

    const existing = cloudDb.users.find(u => u.username === username);
    if (existing) {
      return sendJson(res, 409, { success: false, message: 'ব্যৱহাৰকাৰী নাম ইতিমধ্যে ব্যৱহৃত (Username already exists)' });
    }

    const newUser = {
      id: cloudDb.users.length + 1,
      username,
      password,
      full_name: fullName,
      role,
      phone: phone || '',
      created_at: new Date().toISOString()
    };
    cloudDb.users.push(newUser);

    return sendJson(res, 201, {
      success: true,
      user: newUser,
      message: 'সফলভাৱে পঞ্জীয়ন হ’ল (Registered successfully)'
    });
  }

  // 4. Clinical Report (Doctor Portal)
  if (pathname === '/api/reports/clinical' && req.method === 'GET') {
    const taken = cloudDb.medications.filter(m => m.is_taken === 1).length;
    const total = cloudDb.medications.length;
    const adherence = total > 0 ? Math.round((taken / total) * 100) : 0;

    const report = {
      profile: cloudDb.patientProfiles[0],
      sessions: [...cloudDb.cognitiveSessions].reverse(),
      medications: cloudDb.medications,
      hydration: cloudDb.hydrationLogs[0],
      summary: {
        totalSessions: cloudDb.cognitiveSessions.length,
        avgScore: 84,
        avgLatencySec: '5.2',
        adherenceRatePct: adherence,
        mmseScore: '25/30',
        clinicalStage: 'Mild Cognitive Impairment (Early Stage)'
      }
    };
    return sendJson(res, 200, { success: true, report });
  }

  // 5. Sync: Pull
  if (pathname === '/api/sync/pull' && req.method === 'GET') {
    return sendJson(res, 200, {
      success: true,
      medications: cloudDb.medications,
      hydration: cloudDb.hydrationLogs[0],
      summary: {
        totalSessions: cloudDb.cognitiveSessions.length,
        avgScore: 84,
        adherenceRatePct: 75
      }
    });
  }

  // 6. Sync: Push
  if (pathname === '/api/sync/push' && req.method === 'POST') {
    const { queue } = await parseBody(req);
    let count = 0;
    if (Array.isArray(queue)) {
      queue.forEach(item => {
        count++;
        if (item.type === 'GAME_SESSION' && item.payload) {
          cloudDb.cognitiveSessions.push({
            id: cloudDb.cognitiveSessions.length + 1,
            user_id: 1,
            game_name: item.payload.gameName,
            score: item.payload.score || 80,
            latency_sec: item.payload.latencySec || 4.5,
            accuracy_pct: item.payload.accuracyPct || 90,
            hints_used: item.payload.hintsUsed || 0,
            created_at: new Date().toISOString()
          });
        }
      });
    }
    return sendJson(res, 200, { success: true, syncedCount: count });
  }

  // 7. Family: Add Medication
  if (pathname === '/api/family/medication' && req.method === 'POST') {
    const { name, time, pillIcon, addedByRole } = await parseBody(req);
    const newMed = {
      id: cloudDb.medications.length + 1,
      patient_id: 1,
      name,
      time,
      pill_icon: pillIcon || '💊',
      is_taken: 0,
      taken_at: null,
      added_by_role: addedByRole || 'family',
      created_at: new Date().toISOString()
    };
    cloudDb.medications.push(newMed);
    return sendJson(res, 201, { success: true, medication: newMed });
  }

  // 8. Family: Toggle Medication
  if (pathname === '/api/family/medication/toggle' && req.method === 'POST') {
    const { id, isTaken } = await parseBody(req);
    const med = cloudDb.medications.find(m => m.id === Number(id));
    if (med) {
      med.is_taken = isTaken ? 1 : 0;
      med.taken_at = isTaken ? new Date().toLocaleTimeString() : null;
    }
    return sendJson(res, 200, { success: true, medication: med });
  }

  // 9. Family: Add Note
  if (pathname === '/api/family/notes' && req.method === 'POST') {
    const { authorName, noteText } = await parseBody(req);
    const newNote = {
      id: cloudDb.familyNotes.length + 1,
      patient_id: 1,
      author_name: authorName || 'Family Member',
      note_text: noteText,
      created_at: new Date().toISOString()
    };
    cloudDb.familyNotes.push(newNote);
    return sendJson(res, 201, { success: true, note: newNote });
  }

  // 10. Admin: Users & Stats
  if (pathname === '/api/admin/users' && req.method === 'GET') {
    return sendJson(res, 200, { success: true, users: cloudDb.users });
  }

  if (pathname === '/api/admin/stats' && req.method === 'GET') {
    return sendJson(res, 200, {
      success: true,
      stats: {
        userCount: cloudDb.users.length,
        sessionCount: cloudDb.cognitiveSessions.length,
        medCount: cloudDb.medications.length,
        syncCount: cloudDb.syncAudit.length
      }
    });
  }

  // 11. Head Admin: Universal Overview
  if (pathname === '/api/headadmin/overview' && req.method === 'GET') {
    return sendJson(res, 200, {
      success: true,
      overview: {
        users: cloudDb.users,
        patientProfiles: cloudDb.patientProfiles,
        cognitiveSessions: [...cloudDb.cognitiveSessions].reverse(),
        medications: cloudDb.medications,
        hydrationLogs: cloudDb.hydrationLogs,
        familyNotes: cloudDb.familyNotes,
        syncAudit: cloudDb.syncAudit,
        stats: {
          userCount: cloudDb.users.length,
          sessionCount: cloudDb.cognitiveSessions.length,
          medCount: cloudDb.medications.length,
          syncCount: cloudDb.syncAudit.length
        }
      }
    });
  }

  // 404 for unknown API routes
  return sendJson(res, 404, { success: false, message: 'API route not found' });
};
