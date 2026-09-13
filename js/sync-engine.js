/**
 * DELTA NEURONS: Automatic Offline-to-Online Synchronization Engine
 * Detects network connectivity, locally queues game telemetry, hydration,
 * and medication logs, and auto-syncs with backend SQLite server on restore.
 */

class OfflineSyncEngine {
  constructor() {
    this.queueKey = 'delta_neurons_sync_queue';
    this.apiBase = window.location.origin.includes('localhost') ? '' : 'http://localhost:3000';
    this.isOnline = navigator.onLine;
    this.isSyncing = false;
    this.listeners = [];

    this.init();
  }

  init() {
    // 1. Listen for browser network events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.updateStatusBadge('online');
      this.flushQueue();
      window.VoiceNER.speak("ইন্টাৰনেট সংযোগ সক্ৰিয় হ’ল। তথ্য সংৰক্ষণ কৰা হৈছে। (Online, syncing data)");
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.updateStatusBadge('offline');
    });

    // 2. Periodic background connectivity check (every 10s)
    setInterval(() => this.checkServerConnection(), 10000);

    // Initial check
    this.checkServerConnection();
  }

  // Subscribe to sync completion events
  onSync(callback) {
    this.listeners.push(callback);
  }

  notifySync(result) {
    this.listeners.forEach(fn => fn(result));
  }

  // Retrieve buffered queue
  getQueue() {
    try {
      const q = localStorage.getItem(this.queueKey);
      return q ? JSON.parse(q) : [];
    } catch (e) {
      return [];
    }
  }

  saveQueue(queue) {
    try {
      localStorage.setItem(this.queueKey, JSON.stringify(queue));
    } catch (e) {}
  }

  // Add event to queue
  enqueue(type, payload) {
    const queue = this.getQueue();
    const eventItem = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type, // 'GAME_SESSION' | 'MED_TOGGLE' | 'HYDRATION'
      payload,
      timestamp: new Date().toISOString()
    };
    queue.push(eventItem);
    this.saveQueue(queue);

    this.updateStatusBadge(this.isOnline ? 'syncing' : 'queued');

    // Attempt instant flush if online
    if (this.isOnline) {
      this.flushQueue();
    }
  }

  // Flush queued items to backend server
  async flushQueue() {
    if (this.isSyncing) return;
    const queue = this.getQueue();
    if (queue.length === 0) {
      this.updateStatusBadge('online');
      return;
    }

    this.isSyncing = true;
    this.updateStatusBadge('syncing');

    try {
      const currentUser = window.AuthEngine ? window.AuthEngine.currentUser : null;
      const res = await fetch(`${this.apiBase}/api/sync/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queue,
          userId: currentUser ? currentUser.id : 1
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Clear queue upon successful server receipt
        this.saveQueue([]);
        this.updateStatusBadge('online');
        this.notifySync(data);

        // Refresh clinical reports if Doctor or Caregiver view is open
        if (window.DoctorPortal && typeof window.DoctorPortal.refreshReport === 'function') {
          window.DoctorPortal.refreshReport();
        }
      } else {
        this.updateStatusBadge('queued');
      }
    } catch (err) {
      // Server unreachable - keep in offline queue
      this.isOnline = false;
      this.updateStatusBadge('queued');
    } finally {
      this.isSyncing = false;
    }
  }

  // Ping backend server to verify active SQLite connection
  async checkServerConnection() {
    try {
      const res = await fetch(`${this.apiBase}/api/sync/status`, { cache: 'no-store' });
      if (res.ok) {
        const prevOnline = this.isOnline;
        this.isOnline = true;
        const queue = this.getQueue();
        if (queue.length > 0) {
          this.flushQueue();
        } else {
          this.updateStatusBadge('online');
        }
      } else {
        this.isOnline = false;
        this.updateStatusBadge('queued');
      }
    } catch (e) {
      this.isOnline = false;
      this.updateStatusBadge('offline');
    }
  }

  // Update Top Navigation Bar Status Badge
  updateStatusBadge(status) {
    const badge = document.getElementById('sync-status-badge');
    if (!badge) return;

    const queueCount = this.getQueue().length;

    if (status === 'online') {
      badge.className = 'header-status-badge status-online';
      badge.innerHTML = `<span class="pulse-dot"></span> <span>🟢 অনলাইন (ডাটা সংৰক্ষিত / Synced)</span>`;
    } else if (status === 'syncing') {
      badge.className = 'header-status-badge status-syncing';
      badge.innerHTML = `<span class="pulse-dot" style="background:#F1C40F;"></span> <span>🔄 সংমিশ্ৰণ চলি আছে (${queueCount} items)...</span>`;
    } else if (status === 'queued') {
      badge.className = 'header-status-badge status-queued';
      badge.innerHTML = `<span class="pulse-dot" style="background:#E67E22;"></span> <span>🟡 অফলাইন (${queueCount} টা তথ্য সংৰক্ষণৰ বাবে প্ৰস্তুত)</span>`;
    } else {
      badge.className = 'header-status-badge status-offline';
      badge.innerHTML = `<span class="pulse-dot" style="background:#95A5A6;"></span> <span>⚪ অফলাইন মোড (Offline Local)</span>`;
    }
  }
}

// Export singleton instance
window.SyncEngine = new OfflineSyncEngine();

