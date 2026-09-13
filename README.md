# DELTA NEURONS 🧠 (Full-Stack Multi-Role Healthcare Platform)

**AI-Powered Cognitive Gaming, Reminiscence, and Memory Assistance Platform for Elderly Dementia Patients in India's North Eastern Region (NER)**

Built with native **Node.js, SQLite (`node:sqlite`), HTML5, CSS3, and Vanilla JavaScript**.

---

## 🌟 Full-Stack Architecture & Features

### 1. 🔄 Automatic Offline-to-Online Synchronization Engine
- **Local Buffer Queue**: When internet is unavailable, all cognitive gameplay results, hydration water logs, and medication marks buffer locally in `localStorage`.
- **Automatic Connectivity Flush**: As soon as network connectivity is restored (`window.addEventListener('online')` or background ping check), the engine automatically pushes queued batches to `/api/sync/push` on the SQLite backend.
- **Live Status Badge**:
  - 🟢 **অনলাইন (ডাটা সংৰক্ষিত / Synced)**
  - 🟡 **অফলাইন (স্থানীয় সংৰক্ষণ / Queued)**
  - 🔄 **তথ্য সংমিশ্ৰণ চলি আছে (Syncing...)**

### 2. 👥 Multi-Role Registration & Login Portal
Secure role-based access control (RBAC) with dedicated workspaces:

| Role | Default Demo Account | Dedicated Portal & Permissions |
| :--- | :--- | :--- |
| 🧓 **Patient** | `bapuji` / `pass123` | Lands directly on the accessible elderly gaming suite (6 games), guided calming breathing pacer, and simple medication routine. |
| 🩺 **Doctor** | `dr_sharma` / `doc123` | Lands on the **Clinical Reports & Diagnostics Center**: MMSE/MoCA trajectory trends, cognitive domain analytics, and **Detailed Medication Taken / Missed Adherence Table** with exact timestamps. |
| 👨‍👩‍👧 **Family** | `anita_family` / `family123` | Dedicated access to **add new medications**, schedule dosages, mark medicines as administered, log daily patient observations, and configure emergency SOS contacts. |
| 🛡️ **Admin** | `admin` / `admin123` | Central management console: user registry, role management, database metrics, and auto-sync audit logs. |

*1-Click Demo Shortcut buttons are available on the login screen for instant evaluation.*

---

### 3. 🗄️ Native SQLite Backend (`delta_neurons.db`)
- Zero external npm dependencies — built on Node.js's native `node:sqlite.DatabaseSync`.
- Tables:
  - `users`: User credentials and role assignments.
  - `patient_profiles`: Patient clinical profile, diagnosis, and emergency contacts.
  - `cognitive_sessions`: Game telemetry, reaction latency (ms), score, accuracy, and auto-hints.
  - `medications`: Prescription schedules, taken status, timestamp, and role audit.
  - `hydration_logs`: Daily water intake vs. 6-glass goal.
  - `family_notes`: Daily observational notes recorded by family caregivers for visiting physicians.
  - `sync_audit`: Audit trail of all offline batch synchronization events.

---

### 4. 🦏 Expanded 6-Game Cognitive Suite for Northeast India
1. **🦏 Sriti Mel (স্মৃতি মেল - Memory Meadow)**: Card pair matching with NER cultural symbols.
2. **🎯 Dhyan Bindu (ধ্যান বিন্দু - Focus Point)**: Selective visual attention and search.
3. **🏛️ Chena Mukhor (চেনা মুখৰ - Reminiscence Places)**: Landmark and familiar scene recognition.
4. **🥁 Bihu Dhol Taal (বিহু ঢোল-তাল - Folk Rhythm Memory)**: Sequence memory with authentic procedural Web Audio folk instruments (Bihu Dhol 🥁, Pepa 🎺, Toka 🪵, Taal 🔔).
5. **🧺 Bagicha Bheti (বাপতি-সাহোন - Cultural Category Sorting)**: Sorting regional delicacies vs traditional attire into woven baskets.
6. **📜 Xadhu Kotha (সাধুকথা আৰু বুৰঞ্জী - Northeast Folktales)**: Reminiscence storytelling recall (Tejimola, Lachit Borphukan, Rani Gaidinliu).

---

## 🚀 How to Run the Platform

- **1-Click Launch**: Double-click `run_delta_neurons.bat` (Starts server on `http://localhost:3000` and opens browser).
- **Manual Command**:
  ```bash
  node server.js
  ```
  Open `http://localhost:3000` in any web browser.
