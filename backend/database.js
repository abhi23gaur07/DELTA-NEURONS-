/**
 * DELTA NEURONS: Native SQLite Database Module
 * Uses Node.js built-in `node:sqlite.DatabaseSync` (Zero npm dependencies)
 * Persistent SQLite storage in `delta_neurons.db`
 */

const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const DB_PATH = path.join(__dirname, 'delta_neurons.db');
const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for high concurrency
db.exec('PRAGMA journal_mode = WAL;');

// Initialize Database Schema
function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('patient', 'doctor', 'family', 'admin', 'head_admin')),
      phone TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS patient_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL UNIQUE,
      age INTEGER DEFAULT 72,
      location TEXT DEFAULT 'Guwahati, Assam',
      diagnosis TEXT DEFAULT 'Mild Cognitive Impairment (MCI)',
      preferred_language TEXT DEFAULT 'as',
      emergency_contact TEXT DEFAULT '+91 94350 XXXXX',
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS doctor_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL UNIQUE,
      medical_license TEXT DEFAULT 'NER-MC-VERIFIED',
      specialty TEXT DEFAULT 'Chief Clinical Neurologist (MD Neurology)',
      hospital_affiliation TEXT DEFAULT 'NER Memory Care Network, Guwahati',
      years_experience INTEGER DEFAULT 12,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS patient_offline_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL UNIQUE,
      progress_data TEXT NOT NULL,
      last_synced TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS cognitive_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      game_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      latency_sec REAL NOT NULL,
      accuracy_pct INTEGER NOT NULL,
      hints_used INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      name TEXT NOT NULL,
      time TEXT NOT NULL,
      pill_icon TEXT DEFAULT '💊',
      is_taken INTEGER DEFAULT 0,
      taken_at TEXT,
      added_by_role TEXT DEFAULT 'doctor',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS hydration_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      glasses_count INTEGER NOT NULL,
      daily_goal INTEGER DEFAULT 6,
      log_date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS family_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      author_name TEXT NOT NULL,
      note_text TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sync_audit (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      sync_type TEXT NOT NULL,
      items_synced INTEGER DEFAULT 1,
      synced_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dementia_ai_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      doctor_id INTEGER,
      predicted_stage INTEGER NOT NULL,
      stage_name TEXT NOT NULL,
      confidence_pct REAL NOT NULL,
      stage_description TEXT NOT NULL,
      clinical_summary TEXT,
      cognitive_domain_scores TEXT,
      risk_factors TEXT,
      recommended_medications TEXT,
      recommended_exercises TEXT,
      recommended_games TEXT,
      caregiver_guidance TEXT,
      raw_assessment TEXT,
      assessed_at TEXT NOT NULL,
      FOREIGN KEY (patient_id) REFERENCES users(id)
    );
  `);

  seedDefaultData();
  seedAdditionalRecords();
}

// Seed Initial Accounts & Mock Clinical Records
function seedDefaultData() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount > 0) return; // Already seeded

  const now = new Date().toISOString();

  // 1. Pre-seed 4 Role Accounts
  const insertUser = db.prepare(`
    INSERT INTO users (username, password, full_name, role, phone, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertUser.run('bapuji', 'pass123', 'Bapuji Goswami (বাপুজী)', 'patient', '+91 94351 23456', now);
  insertUser.run('dr_sharma', 'doc123', 'Dr. Hirendra Sharma (MD Neurology)', 'doctor', '+91 98640 54321', now);
  insertUser.run('anita_family', 'family123', 'Anita Goswami (Daughter/Caregiver)', 'family', '+91 94350 98765', now);
  insertUser.run('admin', 'admin123', 'Delta Neurons Central Admin', 'admin', '+91 90000 00001', now);
  insertUser.run('head_admin', 'head123', 'Dr. A. K. Baruah (Chief Medical Director & Head Admin)', 'head_admin', '+91 94350 00000', now);

  // Patient Profile
  db.prepare(`
    INSERT INTO patient_profiles (user_id, age, location, diagnosis, preferred_language, emergency_contact)
    VALUES (1, 72, 'Dispur, Guwahati (Assam)', 'Mild Cognitive Impairment (MCI)', 'as', '+91 94350 98765')
  `).run();

  // 2. Pre-seed Default Medications
  const insertMed = db.prepare(`
    INSERT INTO medications (patient_id, name, time, pill_icon, is_taken, taken_at, added_by_role, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertMed.run(1, 'ৰক্তচাপৰ টেবলেট (Blood Pressure)', 'ৰাতিপুৱা ৮:০০ (8:00 AM)', '🔴', 1, 'Today 08:05 AM', 'doctor', now);
  insertMed.run(1, 'ভিটামিন আৰু কেলচিয়াম (Calcium & Vit D)', 'দুপৰীয়া ১:০০ (1:00 PM)', '🟡', 1, 'Today 01:10 PM', 'family', now);
  insertMed.run(1, 'স্মৃতি শক্তিবৰ্ধক ঔষধি (Donepezil 5mg)', 'সন্ধিয়া ৭:৩০ (7:30 PM)', '🔵', 0, null, 'doctor', now);
  insertMed.run(1, 'ৰাতিৰ সহজ নিদ্ৰা (Melatonin Support)', 'ৰাতি ৯:৩০ (9:30 PM)', '⚪', 0, null, 'doctor', now);

  // 3. Pre-seed Hydration Log
  db.prepare(`
    INSERT INTO hydration_logs (patient_id, glasses_count, daily_goal, log_date)
    VALUES (1, 3, 6, date('now'))
  `).run();

  // 4. Pre-seed Cognitive Game Session History (for Doctor's Report)
  const insertSession = db.prepare(`
    INSERT INTO cognitive_sessions (user_id, game_name, score, latency_sec, accuracy_pct, hints_used, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertSession.run(1, 'Sriti Mel (Memory Match)', 78, 6.8, 85, 1, '2026-09-08 10:30:00');
  insertSession.run(1, 'Dhyan Bindu (Focus Point)', 82, 5.4, 90, 0, '2026-09-09 11:15:00');
  insertSession.run(1, 'Bihu Dhol Taal (Folk Rhythm)', 75, 7.2, 80, 2, '2026-09-10 16:45:00');
  insertSession.run(1, 'Bagicha Bheti (Cultural Sorting)', 85, 4.9, 95, 0, '2026-09-11 10:00:00');
  insertSession.run(1, 'Xadhu Kotha (Folktales & Legends)', 88, 5.1, 100, 0, '2026-09-12 17:30:00');
  insertSession.run(1, 'Sriti Mel (Memory Match)', 84, 6.0, 88, 1, '2026-09-13 11:00:00');

  // 5. Pre-seed Family Notes
  db.prepare(`
    INSERT INTO family_notes (patient_id, author_name, note_text, created_at)
    VALUES (?, ?, ?, ?)
  `).run(1, 'Anita (Daughter)', 'Bapuji enjoyed the Bihu Dhol game this morning and hummed along. Slept peacefully last night.', now);

  console.log('✅ SQLite Database successfully initialized and seeded with 4 roles & clinical records!');
}

// -------------------------------------------------------------
// Database Query Helpers
// -------------------------------------------------------------

// User Auth
function findUserByUsername(username) {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

function createUser(username, password, fullName, role, phone, extraData = {}) {
  const now = new Date().toISOString();
  const res = db.prepare(`
    INSERT INTO users (username, password, full_name, role, phone, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(username, password, fullName, role, phone || '', now);

  const newId = Number(res.lastInsertRowid);
  if (role === 'patient') {
    const age = Number(extraData.age) || 72;
    const location = extraData.location || 'Guwahati, Assam';
    const diagnosis = extraData.diagnosis || 'Mild Cognitive Impairment (MCI)';
    const preferredLang = extraData.preferredLanguage || extraData.preferred_language || 'as';
    const emergency = extraData.emergencyContact || extraData.emergency_contact || phone || '+91 94350 XXXXX';
    db.prepare(`
      INSERT INTO patient_profiles (user_id, age, location, diagnosis, preferred_language, emergency_contact)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(newId, age, location, diagnosis, preferredLang, emergency);
  } else if (role === 'doctor') {
    const license = extraData.medicalLicense || extraData.medical_license || `NER-MC-${Math.floor(10000 + Math.random() * 90000)}`;
    const specialty = extraData.specialty || 'General Neurology & Memory Care';
    const hospital = extraData.hospitalAffiliation || extraData.hospital || 'NER Memory Care Network, Guwahati';
    const exp = Number(extraData.yearsExperience) || 10;
    db.prepare(`
      INSERT INTO doctor_profiles (user_id, medical_license, specialty, hospital_affiliation, years_experience, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(newId, license, specialty, hospital, exp, now);
  }
  return { id: newId, username, full_name: fullName, role, phone };
}

// Offline Progress Persistence & Syncing
function saveOfflineProgress(userId, progressData) {
  const now = new Date().toISOString();
  const dataStr = typeof progressData === 'object' ? JSON.stringify(progressData) : String(progressData);
  db.prepare(`
    INSERT INTO patient_offline_progress (user_id, progress_data, last_synced)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      progress_data = excluded.progress_data,
      last_synced = excluded.last_synced
  `).run(userId, dataStr, now);
  return { success: true, userId, lastSynced: now };
}

function getOfflineProgress(userId) {
  const row = db.prepare('SELECT * FROM patient_offline_progress WHERE user_id = ?').get(userId);
  if (!row) return null;
  try {
    return {
      userId: row.user_id,
      lastSynced: row.last_synced,
      progress: JSON.parse(row.progress_data)
    };
  } catch (e) {
    return { userId: row.user_id, lastSynced: row.last_synced, progress: {} };
  }
}

// Clinical Reports (For Doctor)
function getClinicalReport(patientId = 1) {
  const sessions = db.prepare(`
    SELECT * FROM cognitive_sessions 
    WHERE user_id = ? 
    ORDER BY id DESC LIMIT 20
  `).all(patientId);

  const meds = db.prepare(`
    SELECT * FROM medications 
    WHERE patient_id = ? 
    ORDER BY id ASC
  `).all(patientId);

  const hydration = db.prepare(`
    SELECT * FROM hydration_logs 
    WHERE patient_id = ? 
    ORDER BY id DESC LIMIT 7
  `).all(patientId);

  const notes = db.prepare(`
    SELECT * FROM family_notes 
    WHERE patient_id = ? 
    ORDER BY id DESC LIMIT 10
  `).all(patientId);

  const patient = db.prepare(`
    SELECT u.full_name, u.phone, p.* 
    FROM users u 
    LEFT JOIN patient_profiles p ON u.id = p.user_id 
    WHERE u.id = ?
  `).get(patientId);

  // Compute MMSE simulated composite score
  let avgScore = 80;
  if (sessions.length > 0) {
    const sum = sessions.reduce((acc, s) => acc + s.score, 0);
    avgScore = Math.round(sum / sessions.length);
  }
  const mmseSimulated = Math.round((avgScore / 100) * 30);

  return {
    patient,
    summary: {
      mmseScore: mmseSimulated,
      cognitiveAgility: avgScore,
      totalGamesPlayed: sessions.length,
      compliancePct: 92
    },
    sessions,
    medications: meds,
    hydration,
    notes
  };
}

// Medication Management (For Family & Doctor)
function getMedications(patientId = 1) {
  return db.prepare('SELECT * FROM medications WHERE patient_id = ? ORDER BY id ASC').all(patientId);
}

function toggleMedication(id, isTaken) {
  const takenAt = isTaken ? new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : null;
  db.prepare(`
    UPDATE medications 
    SET is_taken = ?, taken_at = ? 
    WHERE id = ?
  `).run(isTaken ? 1 : 0, takenAt, id);
  return db.prepare('SELECT * FROM medications WHERE id = ?').get(id);
}

function addMedication(patientId, name, time, pillIcon, addedByRole) {
  const now = new Date().toISOString();
  const res = db.prepare(`
    INSERT INTO medications (patient_id, name, time, pill_icon, is_taken, added_by_role, created_at)
    VALUES (?, ?, ?, ?, 0, ?, ?)
  `).run(patientId || 1, name, time, pillIcon || '💊', addedByRole || 'family', now);
  return db.prepare('SELECT * FROM medications WHERE id = ?').get(Number(res.lastInsertRowid));
}

function deleteMedication(id) {
  db.prepare('DELETE FROM medications WHERE id = ?').run(id);
}

// Hydration Logs
function recordHydration(patientId = 1, glassesCount = 1) {
  const today = new Date().toISOString().split('T')[0];
  const existing = db.prepare('SELECT * FROM hydration_logs WHERE patient_id = ? AND log_date = ?').get(patientId, today);
  if (existing) {
    db.prepare('UPDATE hydration_logs SET glasses_count = ? WHERE id = ?').run(glassesCount, existing.id);
  } else {
    db.prepare('INSERT INTO hydration_logs (patient_id, glasses_count, daily_goal, log_date) VALUES (?, ?, 6, ?)').run(patientId, glassesCount, today);
  }
}

// Family Care Notes
function addFamilyNote(patientId, authorName, noteText) {
  const now = new Date().toISOString();
  const res = db.prepare(`
    INSERT INTO family_notes (patient_id, author_name, note_text, created_at)
    VALUES (?, ?, ?, ?)
  `).run(patientId || 1, authorName, noteText, now);
  return db.prepare('SELECT * FROM family_notes WHERE id = ?').get(Number(res.lastInsertRowid));
}

// Telemetry & Game Sync
function saveGameSession(userId, gameName, score, latencySec, accuracyPct, hintsUsed) {
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO cognitive_sessions (user_id, game_name, score, latency_sec, accuracy_pct, hints_used, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(userId || 1, gameName, score, latencySec, accuracyPct, hintsUsed || 0, now);
}

// Admin Helpers
function getAllUsers() {
  return db.prepare('SELECT id, username, full_name, role, phone, created_at FROM users ORDER BY id ASC').all();
}

function seedAdditionalRecords() {
  const now = new Date().toISOString();

  // Check if doctor 2 exists
  const doc2 = db.prepare("SELECT id FROM users WHERE username = 'dr_sunita'").get();
  if (!doc2) {
    db.prepare(`
      INSERT INTO users (username, password, full_name, role, phone, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('dr_sunita', 'doc123', 'Dr. Sunita Borah (MD Geriatric Medicine)', 'doctor', '+91 94350 44556', now);
  }

  // Check if patient 2 exists
  const pat2 = db.prepare("SELECT id FROM users WHERE username = 'nirmal_das'").get();
  if (!pat2) {
    const res = db.prepare(`
      INSERT INTO users (username, password, full_name, role, phone, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('nirmal_das', 'pass123', 'Nirmal Chandra Das (নিৰ্মল দাস)', 'patient', '+91 94352 11223', now);
    const pId = Number(res.lastInsertRowid);
    db.prepare(`
      INSERT INTO patient_profiles (user_id, age, location, diagnosis, preferred_language, emergency_contact)
      VALUES (?, 76, 'Jorhat, Upper Assam', 'Moderate Dementia (Stage 4)', 'as', '+91 94352 11223')
    `).run(pId);
  }

  // Check if patient 3 exists
  const pat3 = db.prepare("SELECT id FROM users WHERE username = 'kamala_devi'").get();
  if (!pat3) {
    const res = db.prepare(`
      INSERT INTO users (username, password, full_name, role, phone, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('kamala_devi', 'pass123', 'Kamala Devi (কমলা দেৱী)', 'patient', '+91 98641 99887', now);
    const pId = Number(res.lastInsertRowid);
    db.prepare(`
      INSERT INTO patient_profiles (user_id, age, location, diagnosis, preferred_language, emergency_contact)
      VALUES (?, 81, 'Silchar, Cachar (Assam)', 'Moderately Severe Cognitive Decline (Stage 5)', 'bn', '+91 98641 99887')
    `).run(pId);
  }
}

// Admin: Query Patients Database
function getRegisteredPatients() {
  return db.prepare(`
    SELECT 
      u.id, 
      u.username, 
      u.full_name, 
      u.phone, 
      u.created_at,
      p.age, 
      p.location, 
      p.diagnosis, 
      p.preferred_language, 
      p.emergency_contact,
      (SELECT COUNT(*) FROM cognitive_sessions WHERE user_id = u.id) AS total_sessions,
      (SELECT COUNT(*) FROM medications WHERE patient_id = u.id) AS total_medications
    FROM users u
    LEFT JOIN patient_profiles p ON u.id = p.user_id
    WHERE u.role = 'patient'
    ORDER BY u.id ASC
  `).all();
}

// Admin: Query Doctors Database
function getRegisteredDoctors() {
  return db.prepare(`
    SELECT 
      u.id, 
      u.username, 
      u.full_name, 
      u.phone, 
      u.created_at,
      'Active & Certified' AS clinical_status,
      COALESCE(dp.specialty, 
        CASE 
          WHEN u.username = 'dr_sharma' THEN 'Chief Clinical Neurologist (MD Neurology)'
          WHEN u.username = 'dr_sunita' THEN 'Geriatric Cognition & Memory Specialist'
          ELSE 'Medical Specialist / Clinician'
        END
      ) AS specialty,
      COALESCE(dp.medical_license, 'NER-MC-VERIFIED') AS medical_license,
      COALESCE(dp.hospital_affiliation, 'NER Memory Care Network, Guwahati') AS hospital_affiliation,
      COALESCE(dp.years_experience, 10) AS years_experience
    FROM users u
    LEFT JOIN doctor_profiles dp ON u.id = dp.user_id
    WHERE u.role = 'doctor'
    ORDER BY u.id ASC
  `).all();
}

// Admin: Query Caregivers Database
function getRegisteredCaregivers() {
  return db.prepare(`
    SELECT 
      u.id, 
      u.username, 
      u.full_name, 
      u.phone, 
      u.created_at,
      'Primary Family Caregiver' AS relationship,
      'Bapuji Goswami' AS linked_patient
    FROM users u
    WHERE u.role = 'family'
    ORDER BY u.id ASC
  `).all();
}

// AI Dementia Staging Reports
function saveDementiaAIReport(report) {
  const now = new Date().toISOString();
  const res = db.prepare(`
    INSERT INTO dementia_ai_reports (
      patient_id, doctor_id, predicted_stage, stage_name, confidence_pct,
      stage_description, clinical_summary, cognitive_domain_scores, risk_factors,
      recommended_medications, recommended_exercises, recommended_games, caregiver_guidance,
      raw_assessment, assessed_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    report.patientId || 1,
    report.doctorId || 2,
    report.predictedStage,
    report.stageName,
    report.confidencePct,
    report.stageDescription || '',
    report.clinicalSummary || '',
    typeof report.cognitiveDomainScores === 'object' ? JSON.stringify(report.cognitiveDomainScores) : (report.cognitiveDomainScores || ''),
    typeof report.riskFactors === 'object' ? JSON.stringify(report.riskFactors) : (report.riskFactors || ''),
    typeof report.recommendedMedications === 'object' ? JSON.stringify(report.recommendedMedications) : (report.recommendedMedications || ''),
    typeof report.recommendedExercises === 'object' ? JSON.stringify(report.recommendedExercises) : (report.recommendedExercises || ''),
    typeof report.recommendedGames === 'object' ? JSON.stringify(report.recommendedGames) : (report.recommendedGames || ''),
    typeof report.caregiverGuidance === 'object' ? JSON.stringify(report.caregiverGuidance) : (report.caregiverGuidance || ''),
    typeof report.rawAssessment === 'object' ? JSON.stringify(report.rawAssessment) : (report.rawAssessment || ''),
    now
  );
  return db.prepare('SELECT * FROM dementia_ai_reports WHERE id = ?').get(Number(res.lastInsertRowid));
}

function getDementiaAIReports(patientId = null) {
  if (patientId) {
    return db.prepare(`
      SELECT r.*, u.full_name as patient_name, doc.full_name as doctor_name
      FROM dementia_ai_reports r
      LEFT JOIN users u ON r.patient_id = u.id
      LEFT JOIN users doc ON r.doctor_id = doc.id
      WHERE r.patient_id = ?
      ORDER BY r.id DESC
    `).all(patientId);
  }
  return db.prepare(`
    SELECT r.*, u.full_name as patient_name, doc.full_name as doctor_name
    FROM dementia_ai_reports r
    LEFT JOIN users u ON r.patient_id = u.id
    LEFT JOIN users doc ON r.doctor_id = doc.id
    ORDER BY r.id DESC
  `).all();
}

function getDatabaseStats() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  const patientCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'patient'").get().count;
  const doctorCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'doctor'").get().count;
  const sessionCount = db.prepare('SELECT COUNT(*) as count FROM cognitive_sessions').get().count;
  const medCount = db.prepare('SELECT COUNT(*) as count FROM medications').get().count;
  const syncCount = db.prepare('SELECT COUNT(*) as count FROM sync_audit').get().count;
  const aiReportCount = db.prepare('SELECT COUNT(*) as count FROM dementia_ai_reports').get().count;
  return { userCount, patientCount, doctorCount, sessionCount, medCount, syncCount, aiReportCount };
}

function logSyncAudit(userId, syncType, itemsCount) {
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO sync_audit (user_id, sync_type, items_synced, synced_at)
    VALUES (?, ?, ?, ?)
  `).run(userId || 1, syncType, itemsCount || 1, now);
}

function getHeadAdminOverview() {
  return {
    users: db.prepare('SELECT id, username, full_name, role, phone, created_at FROM users ORDER BY id ASC').all(),
    patientProfiles: db.prepare('SELECT * FROM patient_profiles').all(),
    doctorProfiles: db.prepare('SELECT * FROM doctor_profiles').all(),
    registeredPatients: getRegisteredPatients(),
    registeredDoctors: getRegisteredDoctors(),
    cognitiveSessions: db.prepare('SELECT * FROM cognitive_sessions ORDER BY id DESC LIMIT 50').all(),
    medications: db.prepare('SELECT * FROM medications ORDER BY id ASC').all(),
    hydrationLogs: db.prepare('SELECT * FROM hydration_logs ORDER BY id DESC LIMIT 20').all(),
    familyNotes: db.prepare('SELECT * FROM family_notes ORDER BY id DESC LIMIT 20').all(),
    dementiaAIReports: getDementiaAIReports(),
    offlineProgress: db.prepare('SELECT * FROM patient_offline_progress').all(),
    syncAudit: db.prepare('SELECT * FROM sync_audit ORDER BY id DESC LIMIT 30').all(),
    stats: getDatabaseStats()
  };
}

// Initialize on module load
initSchema();

module.exports = {
  db,
  findUserByUsername,
  createUser,
  saveOfflineProgress,
  getOfflineProgress,
  getClinicalReport,
  getMedications,
  toggleMedication,
  addMedication,
  deleteMedication,
  recordHydration,
  addFamilyNote,
  saveGameSession,
  getAllUsers,
  getRegisteredPatients,
  getRegisteredDoctors,
  getRegisteredCaregivers,
  saveDementiaAIReport,
  getDementiaAIReports,
  getDatabaseStats,
  logSyncAudit,
  getHeadAdminOverview
};
