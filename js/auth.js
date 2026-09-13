/**
 * DELTA NEURONS: Role-Based Authentication & Portal Router
 * Roles: 'patient' | 'doctor' | 'family' | 'admin' | 'head_admin'
 */

class AuthEngine {
  constructor() {
    this.storageKey = 'delta_neurons_current_user';
    this.currentUser = this.loadUser();
    this.apiBase = window.location.origin.includes('localhost') ? '' : 'http://localhost:3000';
  }

  loadUser() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    // Default to Patient mode
    return {
      id: 1,
      username: 'bapuji',
      fullName: 'Bapuji Goswami (বাপুজী)',
      role: 'patient'
    };
  }

  saveUser(user) {
    this.currentUser = user;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } catch (e) {}
    this.updateUserUI();
    this.routeUserByRole(user.role);
  }

  // 1-Click Demo Shortcut Login
  async quickDemoLogin(role) {
    const demoCreds = {
      patient: { username: 'bapuji', password: 'pass123' },
      doctor: { username: 'dr_sharma', password: 'doc123' },
      family: { username: 'anita_family', password: 'family123' },
      admin: { username: 'admin', password: 'admin123' },
      head_admin: { username: 'head_admin', password: 'head123' }
    };

    const cred = demoCreds[role] || demoCreds.patient;
    return this.login(cred.username, cred.password);
  }

  // Standard Login
  async login(username, password) {
    try {
      const res = await fetch(`${this.apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.success && data.user) {
        this.saveUser(data.user);
        window.VoiceNER.speak(`স্বাগতম ${data.user.fullName}, আপোনাৰ ড্যাশবৰ্ড খোলা হৈছে।`);
        return { success: true, user: data.user };
      } else {
        alert(data.message || 'ভুল ব্যৱহাৰকাৰী নাম বা পাছৱৰ্ড');
        return { success: false, message: data.message };
      }
    } catch (err) {
      // Offline fallback login for default pre-seeded credentials
      const offlineUsers = {
        bapuji: { id: 1, username: 'bapuji', fullName: 'Bapuji Goswami (বাপুজী)', role: 'patient' },
        dr_sharma: { id: 2, username: 'dr_sharma', fullName: 'Dr. Hirendra Sharma', role: 'doctor' },
        anita_family: { id: 3, username: 'anita_family', fullName: 'Anita Goswami', role: 'family' },
        admin: { id: 4, username: 'admin', fullName: 'System Admin', role: 'admin' },
        head_admin: { id: 5, username: 'head_admin', fullName: 'Dr. A. K. Baruah (Head Admin)', role: 'head_admin' }
      };

      if (offlineUsers[username]) {
        this.saveUser(offlineUsers[username]);
        return { success: true, user: offlineUsers[username] };
      }
      alert('অফলাইন মোড: চাৰ্ভাৰৰ সৈতে সংযোগ স্থাপন কৰিব পৰা নগ’ল।');
      return { success: false };
    }
  }

  // User Registration
  async register(username, password, fullName, role, phone) {
    try {
      const res = await fetch(`${this.apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, fullName, role, phone })
      });

      const data = await res.json();
      if (data.success && data.user) {
        this.saveUser(data.user);
        alert('পঞ্জীয়ন সফল হৈছে! (Registration successful)');
        return { success: true, user: data.user };
      } else {
        alert(data.message || 'পঞ্জীয়ন বিফল হ’ল');
        return { success: false, message: data.message };
      }
    } catch (err) {
      alert('চাৰ্ভাৰৰ সৈতে যোগাযোগ বিফল হ’ল (Server communication error)');
      return { success: false };
    }
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    window.location.href = 'login.html';
  }

  // Route user automatically to their dedicated portal based on Role
  routeUserByRole(role) {
    if (role === 'head_admin') {
      if (typeof window.showAppView === 'function') {
        window.showAppView('view-head-admin');
      }
      if (window.HeadAdminPortal && typeof window.HeadAdminPortal.refresh === 'function') {
        window.HeadAdminPortal.refresh();
      }
    } else if (role === 'doctor') {
      if (typeof window.showAppView === 'function') {
        window.showAppView('view-doctor');
      }
      if (window.DoctorPortal && typeof window.DoctorPortal.refreshReport === 'function') {
        window.DoctorPortal.refreshReport();
      }
    } else if (role === 'family') {
      if (typeof window.showAppView === 'function') {
        window.showAppView('view-family');
      }
      if (window.FamilyPortal && typeof window.FamilyPortal.refresh === 'function') {
        window.FamilyPortal.refresh();
      }
    } else if (role === 'admin') {
      if (typeof window.showAppView === 'function') {
        window.showAppView('view-admin');
      }
      if (window.AdminPortal && typeof window.AdminPortal.refresh === 'function') {
        window.AdminPortal.refresh();
      }
    } else {
      // Patient role: lands directly on elderly gaming & routine dashboard
      if (typeof window.showAppView === 'function') {
        window.showAppView('view-dashboard');
      }
    }
  }

  // Update User Profile Indicator in Top Navigation Bar
  updateUserUI() {
    const userPill = document.getElementById('top-user-pill');
    if (!userPill) return;

    const u = this.currentUser;
    const roleBadges = {
      patient: '🧓 ৰোগী (Patient)',
      doctor: '🩺 চিকিৎসক (Doctor)',
      family: '👨‍👩‍👧 পৰিয়াল (Family)',
      admin: '🛡️ প্ৰশাসক (Admin)',
      head_admin: '👑 মুখ্য প্ৰশাসক (Head Admin)'
    };

    userPill.innerHTML = `
      <span style="font-weight: 800;">${u.fullName}</span>
      <span class="role-pill ${u.role}">${roleBadges[u.role] || u.role}</span>
    `;
  }
}

// Export singleton instance
window.AuthEngine = new AuthEngine();
