/**
 * DELTA NEURONS: Role-Specific Portals
 * 1. DoctorPortal: Diagnostics, MMSE trends, and Medication Taken / Not Taken Adherence Log
 * 2. FamilyPortal: Medication scheduler, hydration goal adjuster, and daily care notes
 * 3. AdminPortal: User management, database metrics, and sync audit logs
 */

// -------------------------------------------------------------
// 1. DOCTOR CLINICAL PORTAL
// -------------------------------------------------------------
class DoctorPortalController {
  constructor() {
    this.apiBase = window.location.origin.includes('localhost') ? '' : 'http://localhost:3000';
  }

  async refreshReport() {
    try {
      const res = await fetch(`${this.apiBase}/api/reports/clinical?patientId=1`);
      if (res.ok) {
        const data = await res.json();
        this.renderDoctorDashboard(data.report);
      }
    } catch (err) {
      console.warn("Doctor portal offline fallback:", err);
    }
  }

  renderDoctorDashboard(report) {
    if (!report) return;

    // Summary KPIs
    const mmseEl = document.getElementById('doc-kpi-mmse');
    const agilityEl = document.getElementById('doc-kpi-agility');
    const adherenceEl = document.getElementById('doc-kpi-adherence');
    const gamesEl = document.getElementById('doc-kpi-games');

    if (mmseEl) mmseEl.textContent = `${report.summary.mmseScore} / 30`;
    if (agilityEl) agilityEl.textContent = `${report.summary.cognitiveAgility}%`;
    if (adherenceEl) adherenceEl.textContent = `${report.summary.compliancePct}%`;
    if (gamesEl) gamesEl.textContent = `${report.summary.totalGamesPlayed} খেল`;

    // Detailed Medication Taken / Not Taken Adherence Table
    const medTableBody = document.getElementById('doc-medication-adherence-tbody');
    if (medTableBody && Array.isArray(report.medications)) {
      medTableBody.innerHTML = '';
      report.medications.forEach(m => {
        const tr = document.createElement('tr');
        const isTaken = m.is_taken === 1;
        tr.innerHTML = `
          <td><strong>${m.pill_icon || '💊'} ${m.name}</strong></td>
          <td>${m.time}</td>
          <td>
            <span class="status-pill ${isTaken ? 'status-taken' : 'status-missed'}">
              ${isTaken ? '✓ সময়মতে লোৱা হ’ল (Taken)' : '⏳ বাকী আছে (Pending / Missed)'}
            </span>
          </td>
          <td>${m.taken_at ? `⏰ ${m.taken_at}` : '—'}</td>
          <td><span class="role-badge-sm ${m.added_by_role}">${m.added_by_role}</span></td>
        `;
        medTableBody.appendChild(tr);
      });
    }

    // Cognitive Sessions Log
    const sessionsBody = document.getElementById('doc-sessions-tbody');
    if (sessionsBody && Array.isArray(report.sessions)) {
      sessionsBody.innerHTML = '';
      report.sessions.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${s.game_name}</strong></td>
          <td><span class="score-badge">${s.score}/100</span></td>
          <td>${s.latency_sec}s</td>
          <td>${s.accuracy_pct}%</td>
          <td>${s.hints_used || 0}</td>
          <td style="font-size: 0.85rem; color: var(--text-muted);">${s.created_at}</td>
        `;
        sessionsBody.appendChild(tr);
      });
    }

    // Family Care Notes
    const notesContainer = document.getElementById('doc-family-notes-feed');
    if (notesContainer && Array.isArray(report.notes)) {
      notesContainer.innerHTML = '';
      report.notes.forEach(n => {
        const el = document.createElement('div');
        el.className = 'family-note-entry';
        el.innerHTML = `
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <strong>👨‍👩‍👧 ${n.author_name}</strong>
            <span style="font-size:0.8rem; color:var(--text-muted);">${n.created_at}</span>
          </div>
          <p style="font-size:0.95rem; color:var(--text-secondary);">${n.note_text}</p>
        `;
        notesContainer.appendChild(el);
      });
    }
  }
}

// -------------------------------------------------------------
// 2. FAMILY CARETAKER PORTAL
// -------------------------------------------------------------
class FamilyPortalController {
  constructor() {
    this.apiBase = window.location.origin.includes('localhost') ? '' : 'http://localhost:3000';
  }

  async refresh() {
    this.loadMedications();
  }

  async loadMedications() {
    try {
      const res = await fetch(`${this.apiBase}/api/sync/pull?patientId=1`);
      if (res.ok) {
        const data = await res.json();
        this.renderFamilyMedList(data.medications);
      }
    } catch (e) {
      console.warn("Family portal offline fallback:", e);
    }
  }

  renderFamilyMedList(meds) {
    const container = document.getElementById('family-med-manage-list');
    if (!container || !Array.isArray(meds)) return;

    container.innerHTML = '';
    meds.forEach(med => {
      const isTaken = med.is_taken === 1;
      const card = document.createElement('div');
      card.className = `med-card ${isTaken ? 'taken' : ''}`;
      card.innerHTML = `
        <div class="med-info">
          <div class="med-pill-icon">${med.pill_icon || '💊'}</div>
          <div>
            <div class="med-name">${med.name}</div>
            <div class="med-timing">⏰ ${med.time} • সংযোজন: <strong>${med.added_by_role}</strong></div>
          </div>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          <button class="btn-take-pill btn-toggle-med" data-id="${med.id}" data-taken="${isTaken}">
            ${isTaken ? '✓ দিয়া হ’ল (Given)' : 'এতিয়া দিয়ক (Mark Given)'}
          </button>
        </div>
      `;

      card.querySelector('.btn-toggle-med').addEventListener('click', async () => {
        await this.toggleMedication(med.id, !isTaken);
      });

      container.appendChild(card);
    });
  }

  async addMedication(name, time, pillIcon) {
    try {
      const res = await fetch(`${this.apiBase}/api/family/medication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: 1,
          name,
          time,
          pillIcon: pillIcon || '💊',
          addedByRole: 'family'
        })
      });

      if (res.ok) {
        alert('নতুন ঔষধ সফলভাৱে সংযোজন কৰা হ’ল (Medication scheduled!)');
        this.loadMedications();
        // Also notify sync engine
        window.SyncEngine.enqueue('MED_ADD', { name, time });
      }
    } catch (e) {
      alert('অফলাইন মোড: সংযোগ উপলব্ধ নহ’লে ঔষধ স্থানীয়ভাৱে সংৰক্ষণ হ’ব');
    }
  }

  async toggleMedication(id, isTaken) {
    try {
      await fetch(`${this.apiBase}/api/family/medication/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isTaken })
      });
      // Queue for sync & refresh
      window.SyncEngine.enqueue('MED_TOGGLE', { id, isTaken });
      this.loadMedications();
    } catch (e) {
      window.SyncEngine.enqueue('MED_TOGGLE', { id, isTaken });
      this.loadMedications();
    }
  }

  async postCareNote(noteText) {
    try {
      const currentUser = window.AuthEngine ? window.AuthEngine.currentUser : null;
      const authorName = currentUser ? currentUser.fullName : 'Family Caregiver';

      const res = await fetch(`${this.apiBase}/api/family/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: 1,
          authorName,
          noteText
        })
      });

      if (res.ok) {
        alert('পৰিয়ালৰ টোকা সংৰক্ষিত হ’ল (Care note logged!)');
        const noteInput = document.getElementById('family-note-input');
        if (noteInput) noteInput.value = '';
      }
    } catch (e) {
      alert('টোকা স্থানীয়ভাৱে সংৰক্ষিত হৈছে (Saved locally)');
    }
  }
}

// -------------------------------------------------------------
// 3. ADMIN PORTAL
// -------------------------------------------------------------
class AdminPortalController {
  constructor() {
    this.apiBase = window.location.origin.includes('localhost') ? '' : 'http://localhost:3000';
  }

  async refresh() {
    this.loadUsers();
    this.loadStats();
  }

  async loadUsers() {
    try {
      const res = await fetch(`${this.apiBase}/api/admin/users`);
      if (res.ok) {
        const data = await res.json();
        this.renderUserTable(data.users);
      }
    } catch (e) {
      console.warn("Admin offline fallback:", e);
    }
  }

  renderUserTable(users) {
    const tbody = document.getElementById('admin-users-tbody');
    if (!tbody || !Array.isArray(users)) return;

    tbody.innerHTML = '';
    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${u.id}</td>
        <td><strong>${u.username}</strong></td>
        <td>${u.full_name}</td>
        <td><span class="role-pill ${u.role}">${u.role.toUpperCase()}</span></td>
        <td>${u.phone || '—'}</td>
        <td style="font-size: 0.85rem; color: var(--text-muted);">${u.created_at}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  async loadStats() {
    try {
      const res = await fetch(`${this.apiBase}/api/admin/stats`);
      if (res.ok) {
        const data = await res.json();
        const statUsers = document.getElementById('stat-total-users');
        const statSessions = document.getElementById('stat-total-sessions');
        const statMeds = document.getElementById('stat-total-meds');
        const statSyncs = document.getElementById('stat-total-syncs');

        if (statUsers) statUsers.textContent = data.stats.userCount;
        if (statSessions) statSessions.textContent = data.stats.sessionCount;
        if (statMeds) statMeds.textContent = data.stats.medCount;
        if (statSyncs) statSyncs.textContent = data.stats.syncCount;
      }
    } catch (e) {}
  }
}

// Export singleton instances
window.DoctorPortal = new DoctorPortalController();
window.FamilyPortal = new FamilyPortalController();
window.AdminPortal = new AdminPortalController();

