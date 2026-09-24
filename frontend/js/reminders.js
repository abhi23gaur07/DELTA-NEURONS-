/**
 * DELTA NEURONS: Routine, Medication & Hydration Station
 * High-contrast, gentle reminders with local storage persistence.
 */

class RemindersManager {
  constructor() {
    this.storageKey = 'delta_neurons_reminders';
    this.hydrationGoal = 6; // 6 glasses of water daily
    this.state = this.loadState();
  }

  loadState() {
    const todayStr = new Date().toDateString();
    const saved = localStorage.getItem(this.storageKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === todayStr) {
          return parsed;
        }
      } catch (e) {
        console.warn("Error parsing reminder state:", e);
      }
    }

    // Default daily schedule
    return {
      date: todayStr,
      waterGlasses: 3,
      medicines: [
        { id: 'med-1', name: 'ৰক্তচাপৰ টেবলেট (Blood Pressure)', time: 'ৰাতিপুৱা ৮:০০ (8:00 AM)', pill: '🔴', taken: true },
        { id: 'med-2', name: 'ভিটামিন আৰু কেলচিয়াম (Calcium)', time: 'দুপৰীয়া ১:০০ (1:00 PM)', pill: '🟡', taken: true },
        { id: 'med-3', name: 'স্মৃতি শক্তিবৰ্ধক ঔষধি (Memory Support)', time: 'সন্ধিয়া ৭:৩০ (7:30 PM)', pill: '🔵', taken: false },
        { id: 'med-4', name: 'ৰাতিৰ সহজ নিদ্ৰা (Night Relax)', time: 'ৰাতি ৯:৩০ (9:30 PM)', pill: '⚪', taken: false }
      ],
      routines: [
        { id: 'rt-1', task: 'বাৰীত মৃদু খোজ কঢ়া (Morning Garden Walk)', completed: true },
        { id: 'rt-2', task: 'গৰম চাহ আৰু পৰিয়ালৰ সৈতে কথা (Morning Tea)', completed: true },
        { id: 'rt-3', task: 'নামঘৰ বা প্ৰাৰ্থনা (Evening Prayer)', completed: false }
      ]
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save reminder state:", e);
    }
  }

  // Hydration interaction
  addWaterGlass() {
    if (this.state.waterGlasses < this.hydrationGoal) {
      this.state.waterGlasses++;
      this.saveState();
      window.VoiceNER.playWaterDrop();
      window.VoiceNER.speak(window.VoiceNER.t('waterTracked'));
      this.renderHydrationUI();

      if (window.SyncEngine) {
        window.SyncEngine.enqueue('HYDRATION', { glassesCount: this.state.waterGlasses });
      }
    } else {
      window.VoiceNER.playChimeSuccess();
      window.VoiceNER.speak("বৰ সুন্দৰ! আজিৰ পানী খোৱাৰ লক্ষ্য সম্পূৰ্ণ হ’ল।");
    }
  }

  toggleMedicine(id) {
    const med = this.state.medicines.find(m => m.id === id);
    if (med) {
      med.taken = !med.taken;
      this.saveState();
      window.VoiceNER.playSoftTap();
      if (med.taken) {
        window.VoiceNER.playChimeSuccess();
        window.VoiceNER.speak(`বহুত ভাল, ${med.name} গ্ৰহণ কৰা হ’ল।`);
      }
      this.renderMedicinesUI();

      if (window.SyncEngine) {
        window.SyncEngine.enqueue('MED_TOGGLE', { id: med.id, isTaken: med.taken });
      }
    }
  }

  toggleRoutine(id) {
    const r = this.state.routines.find(item => item.id === id);
    if (r) {
      r.completed = !r.completed;
      this.saveState();
      window.VoiceNER.playSoftTap();
      this.renderRoutinesUI();
    }
  }

  renderHydrationUI() {
    const container = document.getElementById('water-cups-row');
    const counterText = document.getElementById('water-counter-text');
    if (!container || !counterText) return;

    counterText.textContent = `${this.state.waterGlasses} / ${this.hydrationGoal} গিলাচ (Glasses)`;

    container.innerHTML = '';
    for (let i = 0; i < this.hydrationGoal; i++) {
      const isDrank = i < this.state.waterGlasses;
      const cup = document.createElement('button');
      cup.className = `water-cup-btn ${isDrank ? 'drank' : ''}`;
      cup.setAttribute('aria-label', `Water glass ${i + 1}`);
      cup.innerHTML = isDrank ? '💧' : '🥛';
      cup.addEventListener('click', () => {
        if (!isDrank) {
          this.addWaterGlass();
        }
      });
      container.appendChild(cup);
    }
  }

  renderMedicinesUI() {
    const list = document.getElementById('medicines-list');
    if (!list) return;

    list.innerHTML = '';
    this.state.medicines.forEach(med => {
      const card = document.createElement('div');
      card.className = `med-card ${med.taken ? 'taken' : ''}`;
      card.innerHTML = `
        <div class="med-info">
          <div class="med-pill-icon">${med.pill}</div>
          <div>
            <div class="med-name">${med.name}</div>
            <div class="med-timing">⏰ ${med.time}</div>
          </div>
        </div>
        <button class="btn-take-pill" data-id="${med.id}">
          ${med.taken ? '✓ লোৱা হ’ল (Taken)' : 'এতিয়া লওক (Take)'}
        </button>
      `;

      card.querySelector('.btn-take-pill').addEventListener('click', () => {
        this.toggleMedicine(med.id);
      });

      list.appendChild(card);
    });
  }

  renderRoutinesUI() {
    const list = document.getElementById('routines-list');
    if (!list) return;

    list.innerHTML = '';
    this.state.routines.forEach(rt => {
      const item = document.createElement('div');
      item.className = `med-card ${rt.completed ? 'taken' : ''}`;
      item.innerHTML = `
        <div class="med-info">
          <span style="font-size: 1.6rem;">${rt.completed ? '🌿' : '⏳'}</span>
          <span class="med-name">${rt.task}</span>
        </div>
        <button class="btn-take-pill" style="min-width: 130px;">
          ${rt.completed ? '✓ সম্পূৰ্ণ' : 'বাকী আছে'}
        </button>
      `;

      item.querySelector('button').addEventListener('click', () => {
        this.toggleRoutine(rt.id);
      });

      list.appendChild(item);
    });
  }

  initUI() {
    this.renderHydrationUI();
    this.renderMedicinesUI();
    this.renderRoutinesUI();

    const addWaterBtn = document.getElementById('btn-add-water');
    if (addWaterBtn) {
      addWaterBtn.addEventListener('click', () => this.addWaterGlass());
    }
  }
}

// Export singleton instance
window.Reminders = new RemindersManager();

