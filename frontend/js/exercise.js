/**
 * DELTA NEURONS: Dementia-Friendly Exercise, Breathing & Chair Yoga Suite
 * Tailored specifically for elderly individuals and individuals with cognitive impairment.
 * Focuses on seated chair yoga, gentle joint mobility, soothing pranayama, and 4-4-4 breathing pacing.
 */

class ExerciseSuite {
  constructor() {
    this.activeSession = null;
    this.sessionTimer = null;
    this.secondsRemaining = 0;
    this.breathCycleInterval = null;

    // 1. Guided Breathing Sessions
    this.breathingSessions = [
      {
        id: 'lotus_calm',
        nameAs: 'প্ৰশান্তি পদুম উশাহ (Calm Lotus Breathing)',
        nameEn: '4-4-4 Rhythmic Lotus Pacer',
        icon: '🪷',
        category: 'breathing',
        durationSec: 60,
        badge: '৪-৪-৪ আৰামদায়ক ছন্দ',
        descAs: 'পদুম ফুলটি মেল খোৱাৰ লগে লগে লাহেকৈ উশাহ লওক আৰু সংকুচিত হওঁতে এৰি দিয়ক। ই মনৰ অস্থিৰতা আৰু উৎকণ্ঠা দূৰ কৰে।',
        descEn: 'Box-breathing pacing with expanding lotus visual. Proven to reduce sundowning agitation.',
        steps: [
          'আৰামেৰে চকীত পোনে পোনে বহক।',
          'পদুম ফুলটি মেল খাওঁতে ৪ ছেকেণ্ড উশাহ লওক।',
          '৪ ছেকেণ্ড শান্তভাৱে উশাহ ধৰি ৰাখক।',
          'পদুম ফুলটি মুদ খাই যাওঁতে ৪ ছেকেণ্ড লাহে লাহে উশাহ এৰি দিয়ক।'
        ]
      },
      {
        id: 'bhramari',
        nameAs: 'ভ্ৰামৰী গুঞ্জন ধ্যান (Humming Bee Breath)',
        nameEn: 'Bhramari Calming Acoustic Resonance',
        icon: '🐝',
        category: 'breathing',
        durationSec: 60,
        badge: 'মৌমাখিৰ স্নিগ্ধ গুঞ্জন',
        descAs: 'উশাহ এৰি দিওঁতে মৃদু "উঁউঁউঁ" ধ্বনিৰে মৌমাখিৰ দৰে গুঞ্জন কৰক। ই মগজুৰ স্নায়ুবোৰ শান্ত আৰু স্নিগ্ধ কৰে।',
        descEn: 'Gentle humming acoustic resonance that stimulates vagus nerve and soothes memory fatigue.',
        steps: [
          'চকুহাল শান্তভাৱে জপাই বা মুকলিকৈ ৰাখক।',
          'নাকৰে গভীৰকৈ উশাহ লওক।',
          'উশাহ এৰি দিওঁতে ওঁঠ বন্ধ কৰি গুণগুণাই "উঁউঁউঁ..." শব্দ কৰক।'
        ]
      },
      {
        id: 'cooling_river',
        nameAs: 'শীতলী প্ৰশান্ত শ্বাস (Cooling River Breeze)',
        nameEn: 'Sitali Mind Refreshment Breath',
        icon: '🍃',
        category: 'breathing',
        durationSec: 60,
        badge: 'মন জুৰোৱা শীতল বতাহ',
        descAs: 'ব্ৰহ্মপুত্ৰৰ শীতল বতাহৰ দৰে মন শীতল আৰু শান্ত কৰিবলৈ লাহে লাহে উশাহ গ্ৰহণ আৰু ত্যাগ কৰক।',
        descEn: 'Cooling breath for relaxation and regulating core body heat during late afternoon.',
        steps: [
          'মুখখন লাহেকৈ খুলি শীতল বতাহ ভিতৰলৈ টানি নিয়ক।',
          'লাহেকৈ ওঁঠ বন্ধ কৰি নাকৰে উশাহ এৰি দিয়ক।',
          'মনত শান্তি আৰু শীতলতা অনুভৱ কৰক।'
        ]
      },
      {
        id: 'nadi_shodhan',
        nameAs: 'নাড়ী শোধন শান্ত শ্বাস (Alternate Flow Balance)',
        nameEn: 'Gentle Hemispheric Balancing',
        icon: '☯️',
        category: 'breathing',
        durationSec: 60,
        badge: 'মানসিক ভাৰসাম্য',
        descAs: 'সহজ আৰু স্বাভাৱিক গতিৰে বাওঁ আৰু সোঁ নাকৰ উশাহৰ সমতা ৰক্ষা কৰক।',
        descEn: 'Gentle cognitive centering and rhythmic relaxation for elderly balance.',
        steps: [
          'চকীত আৰামেৰে মূৰ পোন কৰি বহক।',
          'লাহে লাহে বাওঁ নাকেৰে উশাহ লওক আৰু সোঁ নাকেৰে এৰি দিয়ক।',
          'মনৰ একাগ্ৰতা বৃদ্ধি পাব।'
        ]
      }
    ];

    // 2. Chair Yoga Sessions for Dementia & Senior Mobility
    this.yogaSessions = [
      {
        id: 'neck_shoulder',
        nameAs: 'আসন ১: শান্ত স্কন্ধ আৰু ডিঙি চালন',
        nameEn: 'Gentle Chair Neck & Shoulder Mobility',
        icon: '🪑',
        category: 'yoga',
        durationSec: 75,
        badge: 'চকীত বহি কৰা সহজ আসন',
        descAs: 'ডিঙি আৰু কান্ধৰ আড়ষ্টতা আৰু বিষ দূৰ কৰিবলৈ চকীৰ ওপৰত বহি লাহে লাহে বৃত্তাকাৰে কান্ধ আৰু মূৰ ঘূৰাওক।',
        descEn: 'Seated upper-body mobility that relieves cervical stiffness and tension headaches.',
        steps: [
          'চকীত ভৰি দুখন মাটিত সমতলকৈ ৰাখি বহক।',
          'লাহে লাহে কান্ধ দুটা ওপৰলৈ তুলি ঘূৰাই তললৈ নমাই আনক (৩ বাৰ)।',
          'মূৰটো সোঁফালে আৰু তাৰ পিছত বাওঁফালে মৃদুভাৱে হেলনীয়াকৈ নিয়ক।'
        ]
      },
      {
        id: 'lotus_arms',
        nameAs: 'আসন ২: পদ্ম হস্ত মুদ্ৰা আৰু উশাহ সম্প্ৰসাৰণ',
        nameEn: 'Seated Lotus Hands & Arm Expansion',
        icon: '🤲',
        category: 'yoga',
        durationSec: 75,
        badge: 'বুকুৰ হাওঁফাওঁ সম্প্ৰসাৰণ',
        descAs: 'হাত দুখন বুকুৰ ওচৰত পদুম ফুলৰ দৰে যোৰ কৰি ওপৰলৈ তোলক। ই বুকু আৰু হাঁওফাঁও মুকলি কৰি তেজ চলাচল বঢ়ায়।',
        descEn: 'Chest opener with lotus mudra hand gesture, improving seated posture and oxygen flow.',
        steps: [
          'হাতৰ তলুৱা দুখন বুকুৰ ওচৰত নমস্কাৰ মুদ্ৰাত ৰাখক।',
          'উশাহ লৈ হাত দুখন ওপৰলৈ তোলক আৰু ফুলটি মেল খোৱাৰ দৰে আঙুলি মেলক।',
          'উশাহ এৰি হাত দুখন পুনৰ বুকুলৈ নমাই আনক।'
        ]
      },
      {
        id: 'chair_twist',
        nameAs: 'আসন ৩: সুৰক্ষিত মেৰুদণ্ড মোচৰণ (Chair Twist)',
        nameEn: 'Gentle Seated Spinal Twist',
        icon: '🔄',
        category: 'yoga',
        durationSec: 75,
        badge: 'হজমি শক্তি আৰু মেৰুদণ্ডৰ সুস্থতা',
        descAs: 'চকীৰ হেলানিত ধৰি লাহেকৈ শৰীৰটো এফাললৈ ঘূৰাওক। ই হজম শক্তি উন্নত কৰে আৰু কঁকালৰ শিথিলতা আনে।',
        descEn: 'Assisted seated chair twist improving gentle core rotation and digestive comfort.',
        steps: [
          'বাওঁ হাতখন সোঁ আঁঠুত ৰাখক আৰু সোঁ হাতখন চকীৰ পিচফালে থওক।',
          'উশাহ এৰি লাহেকৈ সোঁফাললৈ পিচফালে চাওক (কোনো জোৰ নিদিব)।',
          '৫ ছেকেণ্ড ৰৈ আনফালে একেদৰে কৰক।'
        ]
      },
      {
        id: 'ankle_feet',
        nameAs: 'আসন ৪: গোড়ালি আৰু পদ চালন (Foot Vitality)',
        nameEn: 'Ankle Circles & Lower Extremity Flow',
        icon: '🦶',
        category: 'yoga',
        durationSec: 60,
        badge: 'ভৰিৰ শিথিলতা আৰু খোজৰ ভাৰসাম্য',
        descAs: 'ভৰিৰ গোড়ালি দুটা লাহে লাহে ওপৰ-তল আৰু গোলকৈ ঘূৰাওক। ই ভৰিৰ বিষ কমায় আৰু পৰি যোৱাৰ আশংকা হ্ৰাস কৰে।',
        descEn: 'Ankle flexes and circles promoting blood circulation to feet and fall prevention.',
        steps: [
          'এখন ভৰি অলপ ওপৰলৈ ডাঙি গোড়ালিটো ঘড়ীৰ কাঁটাৰ দৰে ঘূৰাওক।',
          'তাৰ পিছত আঙুলিবোৰ তললৈ আৰু ওপৰলৈ নিয়ক।',
          'আনখন ভৰিৰেও একেদৰে কৰক।'
        ]
      },
      {
        id: 'peace_rest',
        nameAs: 'আসন ৫: শান্ত অৱস্থা ধ্যানাসন (Mindful Rest)',
        nameEn: 'Seated Peace & Grounding Meditation',
        icon: '🧘‍♂️',
        category: 'yoga',
        durationSec: 90,
        badge: 'গভীৰ প্ৰশান্তি আৰু নিদ্ৰা সহায়',
        descAs: 'চকীত সম্পূৰ্ণ আৰামেৰে বহি হাত দুখন কোলাত থৈ মনটো ব্ৰহ্মপুত্ৰৰ শান্ত পানীত এৰি দিয়ক। ৰাতিৰ সহজ নিদ্ৰাত সহায় কৰে।',
        descEn: 'Seated grounding relaxation posture, relieving sundowning restlessness before sleep.',
        steps: [
          'হাত দুখন কোলাত ওপৰলৈ মুখ কৰি মেলক।',
          'চকুহাল লাহেকৈ বন্ধ কৰক।',
          'ব্ৰহ্মপুত্ৰৰ নদী আৰু বাঁহীৰ সুৰ মনত কল্পনা কৰি শান্ত হৈ থাকক।'
        ]
      }
    ];
  }

  // Render Exercise Grid into View
  renderExerciseGrid(filter = 'all') {
    const container = document.getElementById('exercise-cards-container');
    if (!container) return;

    let items = [];
    if (filter === 'breathing') {
      items = this.breathingSessions;
    } else if (filter === 'yoga') {
      items = this.yogaSessions;
    } else {
      items = [...this.breathingSessions, ...this.yogaSessions];
    }

    container.innerHTML = items.map(item => `
      <article class="elder-action-card exercise-item-card" data-session-id="${item.id}" style="border-left: 6px solid ${item.category === 'breathing' ? '#2E7D32' : '#C9751E'};">
        <div>
          <div class="card-top">
            <div class="card-icon-bubble ${item.category === 'breathing' ? 'bubble-green' : 'bubble-amber'}" style="font-size: 2.2rem;">
              ${item.icon}
            </div>
            <div style="flex: 1;">
              <span class="role-pill ${item.category === 'breathing' ? 'patient' : 'family'}" style="font-size: 0.75rem; margin-bottom: 4px; display: inline-block;">
                ${item.badge}
              </span>
              <h3 class="card-title" style="font-size: 1.15rem; margin-top: 2px;">${item.nameAs}</h3>
              <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">${item.nameEn}</span>
            </div>
            <button class="mini-speaker-btn" title="Read Aloud" onclick="event.stopPropagation(); window.VoiceNER.speak('${item.nameAs}. ${item.descAs}')">
              🔊
            </button>
          </div>
          <p class="card-desc" style="margin-top: 10px; font-size: 0.95rem; line-height: 1.5;">
            ${item.descAs}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            <span style="background: var(--bg-app); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 999px; font-size: 0.8rem; font-weight: 700;">
              ⏱️ সময়: ${item.durationSec} ছেকেণ্ড
            </span>
            <span style="background: var(--bg-app); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 999px; font-size: 0.8rem; font-weight: 700;">
              🌿 স্মৃতিভ্ৰংশ অনুকূল (Senior Safe)
            </span>
          </div>
        </div>

        <div class="card-action-cue" style="color: ${item.category === 'breathing' ? 'var(--primary)' : 'var(--accent-amber)'}; margin-top: 14px;">
          <span>অনুশীলন আৰম্ভ কৰক (Start Session)</span>
          <span style="font-size: 1.4rem;">➔</span>
        </div>
      </article>
    `).join('');

    // Attach click listeners to cards
    container.querySelectorAll('.exercise-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.sessionId;
        this.startSession(id);
      });
    });
  }

  // Launch Active Exercise / Breathing Session Modal
  startSession(sessionId) {
    const session = [...this.breathingSessions, ...this.yogaSessions].find(s => s.id === sessionId);
    if (!session) return;

    this.activeSession = session;
    this.secondsRemaining = session.durationSec;

    const modal = document.getElementById('exercise-runner-modal');
    if (!modal) return;

    document.getElementById('runner-modal-title').textContent = session.nameAs;
    document.getElementById('runner-modal-sub').textContent = session.nameEn;
    document.getElementById('runner-modal-icon').textContent = session.icon;
    document.getElementById('runner-modal-desc').textContent = session.descAs;
    document.getElementById('runner-timer-text').textContent = `⏱️ ${this.secondsRemaining}s`;

    // Render Steps
    const stepsList = document.getElementById('runner-steps-list');
    if (stepsList) {
      stepsList.innerHTML = session.steps.map((st, i) => `
        <li style="margin-bottom: 8px;"><strong>${i + 1}.</strong> ${st}</li>
      `).join('');
    }

    // Play Om Chime and announce session start
    if (window.VoiceNER) {
      window.VoiceNER.playOmChime();
      window.VoiceNER.speak(`${session.nameAs} আৰম্ভ কৰা হৈছে। ${session.steps[0]}`);
    }

    // Set Up Visual Breathing / Movement Pacer
    const visualPacer = document.getElementById('runner-visual-pacer');
    const pacerText = document.getElementById('runner-pacer-text');
    if (visualPacer && pacerText) {
      visualPacer.className = 'exercise-visual-pacer ' + (session.category === 'breathing' ? 'pacer-lotus' : 'pacer-yoga');
      pacerText.textContent = session.category === 'breathing' ? 'দীঘলকৈ উশাহ লওক... (Breathe In)' : 'আৰামেৰে ভঙ্গীমাটো পালন কৰক (Hold Pose)';
    }

    modal.classList.add('active');

    // Start Rhythmic Breathing Cue Cycle (4s in, 4s hold, 4s out)
    if (session.category === 'breathing') {
      this.startBreathingPacerCycle(pacerText, visualPacer);
    }

    // Start Session Countdown Timer
    clearInterval(this.sessionTimer);
    this.sessionTimer = setInterval(() => {
      this.secondsRemaining--;
      const timerEl = document.getElementById('runner-timer-text');
      if (timerEl) {
        timerEl.textContent = `⏱️ ${this.secondsRemaining}s`;
      }

      if (this.secondsRemaining <= 0) {
        this.completeSession();
      }
    }, 1000);
  }

  // 4-4-4 Breathing Cycle
  startBreathingPacerCycle(pacerText, visualPacer) {
    clearInterval(this.breathCycleInterval);
    let step = 0; // 0 = In (4s), 1 = Hold (4s), 2 = Out (4s)

    const updateCycle = () => {
      if (step === 0) {
        if (pacerText) pacerText.textContent = '🌸 দীঘলকৈ উশাহ লওক... (Breathe In 4s)';
        if (visualPacer) visualPacer.style.transform = 'scale(1.35)';
        step = 1;
      } else if (step === 1) {
        if (pacerText) pacerText.textContent = '⏸️ শান্তভাৱে উশাহ ধৰি ৰাখক (Hold 4s)';
        step = 2;
      } else {
        if (pacerText) pacerText.textContent = '🍃 লাহে লাহে উশাহ এৰি দিয়ক... (Breathe Out 4s)';
        if (visualPacer) visualPacer.style.transform = 'scale(0.85)';
        step = 0;
      }
    };

    updateCycle();
    this.breathCycleInterval = setInterval(updateCycle, 4000);
  }

  // Complete and Log Session
  completeSession() {
    clearInterval(this.sessionTimer);
    clearInterval(this.breathCycleInterval);

    const session = this.activeSession;
    if (!session) return;

    // Play Chime
    if (window.VoiceNER) {
      window.VoiceNER.playChimeSuccess();
      window.VoiceNER.speak('বৰ সুন্দৰ! আপুনি এই অনুশীলনটি সফলতাৰে সম্পন্ন কৰিলে।');
    }

    // Auto-sync session to SQLite Backend
    if (window.SyncEngine) {
      window.SyncEngine.enqueue('GAME_SESSION', {
        gameName: `Wellness: ${session.nameEn}`,
        score: 100,
        latencySec: 4.0,
        accuracyPct: 100,
        hintsUsed: 0
      });
    }

    // Close Runner Modal
    const runnerModal = document.getElementById('exercise-runner-modal');
    if (runnerModal) {
      runnerModal.classList.remove('active');
    }

    // Show Encouragement Modal
    const feedbackModal = document.getElementById('calm-feedback-modal');
    if (feedbackModal) {
      document.getElementById('modal-feedback-title').textContent = 'প্ৰশান্তি আৰু সুস্থতা!';
      document.getElementById('modal-feedback-body').innerHTML = `
        <div style="font-size: 3rem; text-align: center; margin-bottom: 8px;">🌸🧘</div>
        <p><strong>${session.nameAs}</strong> সফলতাৰে সম্পন্ন কৰা হ’ল।</p>
        <p style="color: var(--primary); font-weight: 700; margin-top: 8px;">
          এই স্বাস্থ্য তথ্য স্বয়ংক্ৰিয়ভাৱে চিকিৎসকৰ প্ৰতিবেদনত লিপিবদ্ধ কৰা হৈছে।
        </p>
      `;
      feedbackModal.classList.add('active');
    }

    this.activeSession = null;
  }

  // Close Session Early
  closeSession() {
    clearInterval(this.sessionTimer);
    clearInterval(this.breathCycleInterval);
    const modal = document.getElementById('exercise-runner-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    this.activeSession = null;
  }
}

// Export singleton instance
window.ExerciseSuite = new ExerciseSuite();

