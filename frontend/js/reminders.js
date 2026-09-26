/**
 * DELTA NEURONS: Routine, Medication & Hydration Station
 * High-contrast, gentle reminders with local storage persistence,
 * active scheduler, and Multilingual Voice AI Medicine Reminder System.
 */

const VOICE_REMINDER_TEMPLATES = {
  as: (name, time) => `প্ৰণাম আইতা-ককা! এতিয়া আপোনাৰ ঔষধ "${name}" খোৱাৰ সময় হৈছে। অনুগ্ৰহ কৰি এঢোক বিশুদ্ধ পানীৰ সৈতে ঔষধখিনি লওক। আপোনাৰ মন আৰু স্বাস্থ্য জুৰণি হওক।`,
  en: (name, time) => `Warm greetings Grandma and Grandpa! It is time for your scheduled medicine: "${name}". Please take it gently with a glass of fresh water. Wishing you peaceful health.`,
  hi: (name, time) => `प्रणाम बापूजी! अब आपकी निर्धारित दवाई "${name}" लेने का समय हो गया है। कृपया एक घूंट ताजे पानी के साथ दवाई ले लें। आपका स्वास्थ्य उत्तम रहे।`,
  bn: (name, time) => `প্রণাম! এখন আপনার নির্ধারিত ওষুধ "${name}" নেওয়ার সময় হয়েছে। অনুগ্রহ করে এক ঢোক জলের সাথে ওষুধটি খেয়ে নিন। ভালো থাকুন।`,
  mni: (name, time) => `খুরুমজরি! হৌজিক অদোমগী হিদাক "${name}" চাবগী মতম ওইরে। ঈশিং খরা থক্লগা হিদাক অসি চারসি।`,
  kha: (name, time) => `Khublei shibun! Ka por ban dih ia ka dawai "${name}" ka la poi. Sngewbha dih lang bad ka um ba khuid.`,
  brx: (name, time) => `खुलुमबाय! दा नोंथांनि मुलु "${name}" लानायनि सम जाबाय। अननानै दैजों लोगोसे मुलुखौ जा।`,
  es: (name, time) => `¡Saludos afectuosos! Es hora de su medicina programada: "${name}". Por favor tómela con un vaso de agua fresca. Le deseamos salud y tranquilidad.`,
  fr: (name, time) => `Bonjour affectueux! C'est l'heure de votre médicament programmé: "${name}". Veuillez le prendre doucement avec un verre d'eau.`,
  de: (name, time) => `Herzliche Grüße! Es ist Zeit für Ihre geplante Medizin: "${name}". Bitte nehmen Sie diese mit einem Glas frischem Wasser ein.`
};

class RemindersManager {
  constructor() {
    this.storageKey = 'delta_neurons_reminders';
    this.hydrationGoal = 6; // 6 glasses of water daily
    this.state = this.loadState();
    this.activeReminderMed = null;
    this.schedulerTimer = null;
    this.snoozedUntil = {};

    this.startScheduler();
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
        { id: 'med-3', name: 'স্মৃতি শক্তিবৰ্ধক ঔষধি (Donepezil 5mg)', time: 'সন্ধিয়া ৭:৩০ (7:30 PM)', pill: '🔵', taken: false },
        { id: 'med-4', name: 'ৰাতিৰ সহজ নিদ্ৰা (Melatonin Support)', time: 'ৰাতি ৯:৩০ (9:30 PM)', pill: '⚪', taken: false }
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

  // Active Background Scheduler (Runs every 30s)
  startScheduler() {
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);
    this.schedulerTimer = setInterval(() => {
      this.checkScheduledReminders();
    }, 30000);
  }

  checkScheduledReminders() {
    const now = Date.now();
    const untakenMeds = this.state.medicines.filter(m => !m.taken);
    if (untakenMeds.length === 0) return;

    for (const med of untakenMeds) {
      // Check if snoozed
      if (this.snoozedUntil[med.id] && now < this.snoozedUntil[med.id]) {
        continue;
      }
      // If modal is not currently open, trigger gentle reminder for first pending
      const modal = document.getElementById('medicine-alarm-modal');
      if (!modal || modal.style.display !== 'flex') {
        this.triggerVoiceReminder(med, false);
        break;
      }
    }
  }

  // Trigger Voice & Visual Medicine Reminder
  triggerVoiceReminder(med, isManualTest = false) {
    if (!med) {
      const pending = this.state.medicines.find(m => !m.taken) || this.state.medicines[0];
      med = pending;
    }
    if (!med) return;

    this.activeReminderMed = med;
    const lang = window.I18nEngine ? window.I18nEngine.currentLang : 'as';
    const templateFn = VOICE_REMINDER_TEMPLATES[lang] || VOICE_REMINDER_TEMPLATES['as'];
    const speechText = templateFn(med.name, med.time);

    // Play gentle chime bell
    if (window.VoiceNER) {
      window.VoiceNER.playChimeSuccess();
      setTimeout(() => {
        window.VoiceNER.speak(speechText);
      }, 500);
    }

    this.showReminderModal(med, speechText, isManualTest);
  }

  showReminderModal(med, speechText, isManualTest = false) {
    const modal = document.getElementById('medicine-alarm-modal');
    if (!modal) return;

    const iconEl = document.getElementById('med-alarm-pill-icon');
    const nameEl = document.getElementById('med-alarm-name');
    const timeEl = document.getElementById('med-alarm-time');
    const speechBoxEl = document.getElementById('med-alarm-speech-text');

    if (iconEl) iconEl.textContent = med.pill || '💊';
    if (nameEl) nameEl.textContent = med.name;
    if (timeEl) timeEl.textContent = `⏰ ${med.time}`;
    if (speechBoxEl) speechBoxEl.textContent = speechText;

    modal.style.display = 'flex';
  }

  closeReminderModal() {
    const modal = document.getElementById('medicine-alarm-modal');
    if (modal) modal.style.display = 'none';
  }

  snoozeReminder(minutes = 5) {
    if (this.activeReminderMed) {
      this.snoozedUntil[this.activeReminderMed.id] = Date.now() + (minutes * 60 * 1000);
      if (window.VoiceNER) {
        window.VoiceNER.speak(`ঠিক আছে, ${minutes} মিনিট পিছত আকৌ সোঁৱৰাই দিয়া হ’ব। (Snoozed for ${minutes} minutes)`);
      }
    }
    this.closeReminderModal();
  }

  takeMedicineFromModal() {
    if (this.activeReminderMed) {
      this.toggleMedicine(this.activeReminderMed.id, true);
      this.closeReminderModal();
    }
  }

  replayActiveVoice() {
    if (this.activeReminderMed) {
      const lang = window.I18nEngine ? window.I18nEngine.currentLang : 'as';
      const templateFn = VOICE_REMINDER_TEMPLATES[lang] || VOICE_REMINDER_TEMPLATES['as'];
      const speechText = templateFn(this.activeReminderMed.name, this.activeReminderMed.time);
      if (window.VoiceNER) window.VoiceNER.speak(speechText);
    }
  }

  // Hydration interaction
  addWaterGlass() {
    if (this.state.waterGlasses < this.hydrationGoal) {
      this.state.waterGlasses++;
      this.saveState();
      if (window.VoiceNER) {
        window.VoiceNER.playWaterDrop();
        window.VoiceNER.speak(window.VoiceNER.t('waterTracked'));
      }
      this.renderHydrationUI();

      if (window.SyncEngine) {
        window.SyncEngine.enqueue('HYDRATION', { glassesCount: this.state.waterGlasses });
      }
    } else {
      if (window.VoiceNER) {
        window.VoiceNER.playChimeSuccess();
        window.VoiceNER.speak("বৰ সুন্দৰ! আজিৰ পানী খোৱাৰ লক্ষ্য সম্পূৰ্ণ হ’ল।");
      }
    }
  }

  toggleMedicine(id, forceTaken = null) {
    const med = this.state.medicines.find(m => m.id === id);
    if (med) {
      med.taken = (forceTaken !== null) ? forceTaken : !med.taken;
      this.saveState();
      if (window.VoiceNER) {
        window.VoiceNER.playSoftTap();
        if (med.taken) {
          window.VoiceNER.playChimeSuccess();
          window.VoiceNER.speak(`বহুত ভাল! ${med.name} গ্ৰহণ কৰা সম্পূৰ্ণ হ’ল।`);
        }
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
      if (window.VoiceNER) window.VoiceNER.playSoftTap();
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
        <div style="display:flex; gap:8px; align-items:center;">
          <button class="pill-btn-sm" title="Listen to Voice AI Reminder" onclick="window.Reminders.triggerVoiceReminder(window.Reminders.state.medicines.find(m => m.id === '${med.id}'), true)">
            🔊 শুনাওক (Voice)
          </button>
          <button class="btn-take-pill" data-id="${med.id}">
            ${med.taken ? '✓ লোৱা হ’ল (Taken)' : 'এতিয়া লওক (Take)'}
          </button>
        </div>
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

    const testReminderBtn = document.getElementById('btn-test-voice-reminder');
    if (testReminderBtn) {
      testReminderBtn.addEventListener('click', () => {
        const nextPending = this.state.medicines.find(m => !m.taken) || this.state.medicines[0];
        this.triggerVoiceReminder(nextPending, true);
      });
    }
  }
}

// Export singleton instance
window.Reminders = new RemindersManager();
