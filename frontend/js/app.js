/**
 * DELTA NEURONS: Master Application Controller
 * Handles routing, view transitions, accessibility controls,
 * 6-game suite dispatching, and guided breathing exercises.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-item-btn');
  const viewSections = document.querySelectorAll('.view-section');

  // Switch Views
  function showView(viewId) {
    viewSections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(viewId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    navButtons.forEach(btn => {
      if (btn.dataset.view === viewId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Lifecycle events
    if (viewId === 'view-games') {
      const activeGameBtn = document.querySelector('.game-type-selector-btn.active');
      const gameType = activeGameBtn ? activeGameBtn.dataset.game : 'weaving';
      launchGameByType(gameType);
    } else if (viewId === 'view-exercise') {
      if (window.ExerciseSuite) window.ExerciseSuite.renderExerciseGrid('all');
    } else if (viewId === 'view-reminders') {
      window.Reminders.initUI();
    } else if (viewId === 'view-caregiver' || viewId === 'view-doctor') {
      if (window.DoctorPortal) window.DoctorPortal.refreshReport();
      if (window.Caregiver) window.Caregiver.init();
    } else if (viewId === 'view-family') {
      if (window.FamilyPortal) window.FamilyPortal.refresh();
    } else if (viewId === 'view-admin') {
      if (window.AdminPortal) window.AdminPortal.refresh();
    } else if (viewId === 'view-head-admin') {
      if (window.HeadAdminPortal) window.HeadAdminPortal.refresh();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.showAppView = showView;

  function launchGameByType(gameType) {
    if (gameType === 'weaving') {
      window.GameSuite.startWeavingGame('game-arena-content');
    } else if (gameType === 'rhythm') {
      window.GameSuite.startRhythmGame('game-arena-content');
    } else if (gameType === 'melody-detective') {
      window.GameSuite.startMelodyDetectiveGame('game-arena-content');
    } else if (gameType === 'toka-pacer') {
      window.GameSuite.startTokaBeatKeeperGame('game-arena-content');
    } else if (gameType === 'level1') {
      window.GameSuite.startLevelOneGame('game-arena-content');
    } else if (gameType === 'level2') {
      window.GameSuite.startLevelTwoGame('game-arena-content');
    } else if (gameType === 'level3') {
      window.GameSuite.startLevelThreeGame('game-arena-content');
    } else if (gameType === 'memory') {
      window.GameSuite.startMemoryGame('game-arena-content');
    } else if (gameType === 'attention') {
      window.GameSuite.startAttentionGame('game-arena-content');
    } else if (gameType === 'recognition') {
      window.GameSuite.startReminiscenceGame('game-arena-content');
    } else if (gameType === 'sorting') {
      window.GameSuite.startSortingGame('game-arena-content');
    } else if (gameType === 'folktale') {
      window.GameSuite.startFolktaleGame('game-arena-content');
    }
  }

  // Bind nav clicks
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  // Action cards on Home Dashboard
  document.querySelectorAll('[data-goto-view]').forEach(card => {
    card.addEventListener('click', () => {
      const targetView = card.getAttribute('data-goto-view');
      showView(targetView);
    });
  });

  // Game Selector Tabs (6 Games)
  document.querySelectorAll('.game-type-selector-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.game-type-selector-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      launchGameByType(btn.dataset.game);
    });
  });

  // Hint Button in Game Arena
  const manualHintBtn = document.getElementById('btn-request-hint');
  if (manualHintBtn) {
    manualHintBtn.addEventListener('click', () => {
      window.VoiceNER.speak(window.VoiceNER.t('hintPrompt'));
      const cards = document.querySelectorAll('.memory-card');
      const unmatched = Array.from(cards).filter(c => !c.classList.contains('matched'));
      if (unmatched.length > 0) {
        unmatched[0].classList.add('ai-hint');
      }
    });
  }

  // Global Escape key listener to exit fullscreen theater mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const fsTheater = document.getElementById('fullscreen-game-theater');
      if (fsTheater) {
        window.GameSuite.exitFullscreenTheater();
      }
    }
  });

  // -------------------------------------------------------------
  // ACCESSIBILITY & ELDERLY-FRIENDLY CONTROLS
  // -------------------------------------------------------------
  
  // Font Size Buttons
  const fontSizes = ['font-small', 'font-normal', 'font-large', 'font-xlarge'];
  let currentFontIdx = 1;

  const fontDecBtn = document.getElementById('btn-font-decrease');
  const fontIncBtn = document.getElementById('btn-font-increase');

  function applyFontSize() {
    fontSizes.forEach(cls => document.body.classList.remove(cls));
    document.body.classList.add(fontSizes[currentFontIdx]);
  }

  if (fontDecBtn) {
    fontDecBtn.addEventListener('click', () => {
      if (currentFontIdx > 0) {
        currentFontIdx--;
        applyFontSize();
      }
    });
  }

  if (fontIncBtn) {
    fontIncBtn.addEventListener('click', () => {
      if (currentFontIdx < fontSizes.length - 1) {
        currentFontIdx++;
        applyFontSize();
      }
    });
  }

  // Super-Easy Mode Toggle
  const superEasyBtn = document.getElementById('btn-toggle-super-easy');
  if (superEasyBtn) {
    superEasyBtn.addEventListener('click', () => {
      document.body.classList.toggle('super-easy-mode');
      const isSuper = document.body.classList.contains('super-easy-mode');
      superEasyBtn.classList.toggle('active', isSuper);
      if (isSuper) {
        window.VoiceNER.speak("অতি সহজ মোড সক্ৰিয় কৰা হৈছে (Super Easy Mode enabled)");
      }
    });
  }

  // High-Contrast Mode Toggle
  const contrastToggleBtn = document.getElementById('btn-toggle-contrast');
  if (contrastToggleBtn) {
    contrastToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHigh = document.body.classList.contains('high-contrast');
      contrastToggleBtn.classList.toggle('active', isHigh);
      if (isHigh) {
        window.VoiceNER.speak("উচ্চ স্পষ্টতা সক্ৰিয় কৰা হৈছে (High contrast mode enabled)");
      }
      if (document.getElementById('view-caregiver').classList.contains('active')) {
        window.Caregiver.renderCanvasChart();
      }
    });
  }

  // Cultural Animations Toggle (সাংস্কৃতিক গতি নিয়ন্ত্ৰণ)
  const culturalMotionBtn = document.getElementById('btn-toggle-cultural-motion');
  if (culturalMotionBtn) {
    let motionActive = true;
    culturalMotionBtn.addEventListener('click', () => {
      motionActive = !motionActive;
      document.body.classList.toggle('cultural-animations-paused', !motionActive);
      culturalMotionBtn.classList.toggle('active', motionActive);
      culturalMotionBtn.innerHTML = motionActive
        ? '🎭 সাংস্কৃতিক দৃশ্য (Motion: ON)'
        : '⏸️ স্নিগ্ধ গতি (Motion: PAUSED)';
      if (window.VoiceNER) {
        window.VoiceNER.speak(motionActive ? 'সাংস্কৃতিক দৃশ্য সক্ৰিয় কৰা হৈছে' : 'সাংস্কৃতিক দৃশ্য বিৰাম দিয়া হৈছে');
      }
    });
  }

  // Language Selector
  const langSelect = document.getElementById('language-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      window.VoiceNER.setLanguage(selected);
      updateUILocalizations();
      window.VoiceNER.speak(window.VoiceNER.t('welcomeGreeting'));
    });
  }

  // Read Screen Aloud
  const narrateScreenBtn = document.getElementById('btn-narrate-screen');
  if (narrateScreenBtn) {
    narrateScreenBtn.addEventListener('click', () => {
      const greeting = `${window.VoiceNER.t('welcomeGreeting')}. ${window.VoiceNER.t('welcomeSub')}`;
      window.VoiceNER.speak(greeting);
    });
  }

  // -------------------------------------------------------------
  // GUIDED CALMING BREATHING PACER MODAL
  // -------------------------------------------------------------
  const openBreathingBtns = document.querySelectorAll('.btn-open-breathing');
  const breathingModal = document.getElementById('calm-breathing-modal');
  const closeBreathingBtn = document.getElementById('btn-close-breathing');
  let breathingInterval = null;

  function startBreathingGuide() {
    if (!breathingModal) return;
    breathingModal.classList.add('active');

    const instructionEl = document.getElementById('breathing-live-text');
    let phase = 0; // 0: Inhale (4s), 1: Hold (2s), 2: Exhale (4s)

    function stepBreathing() {
      if (phase === 0) {
        if (instructionEl) instructionEl.textContent = window.VoiceNER.t('breatheIn');
        window.VoiceNER.speak(window.VoiceNER.t('breatheIn'));
        phase = 1;
      } else if (phase === 1) {
        if (instructionEl) instructionEl.textContent = window.VoiceNER.t('breatheHold');
        phase = 2;
      } else {
        if (instructionEl) instructionEl.textContent = window.VoiceNER.t('breatheOut');
        window.VoiceNER.speak(window.VoiceNER.t('breatheOut'));
        phase = 0;
      }
    }

    stepBreathing();
    breathingInterval = setInterval(stepBreathing, 3800);
  }

  function stopBreathingGuide() {
    if (breathingInterval) {
      clearInterval(breathingInterval);
      breathingInterval = null;
    }
    if (breathingModal) {
      breathingModal.classList.remove('active');
    }
  }

  openBreathingBtns.forEach(btn => {
    btn.addEventListener('click', startBreathingGuide);
  });

  if (closeBreathingBtn) {
    closeBreathingBtn.addEventListener('click', stopBreathingGuide);
  }

  // Soundscape Toggle
  const soundscapeBtn = document.getElementById('btn-toggle-soundscape');
  if (soundscapeBtn) {
    soundscapeBtn.addEventListener('click', () => {
      const isPlaying = window.VoiceNER.toggleSereneSoundscape();
      soundscapeBtn.classList.toggle('active', isPlaying);
      soundscapeBtn.innerHTML = isPlaying ? '🎵 সুৰ চলি আছে (Music Playing)' : '🎵 বাঁহীৰ শান্তিময় সুৰ (Play Flute)';
    });
  }

  // Feedback Modal Dismiss
  const modalDismissBtn = document.getElementById('btn-dismiss-modal');
  if (modalDismissBtn) {
    modalDismissBtn.addEventListener('click', () => {
      const modal = document.getElementById('calm-feedback-modal');
      if (modal) modal.classList.remove('active');
    });
  }

  // Update Dynamic Localizations
  function updateUILocalizations() {
    const t = (k) => window.VoiceNER.t(k);
    
    const welcomeTitle = document.getElementById('txt-welcome-title');
    const welcomeSub = document.getElementById('txt-welcome-sub');
    if (welcomeTitle) welcomeTitle.textContent = t('welcomeGreeting');
    if (welcomeSub) welcomeSub.textContent = t('welcomeSub');

    const cardGamesTitle = document.getElementById('card-games-title');
    const cardGamesDesc = document.getElementById('card-games-desc');
    if (cardGamesTitle) cardGamesTitle.textContent = t('playGames');
    if (cardGamesDesc) cardGamesDesc.textContent = t('playGamesDesc');

    const cardMedsTitle = document.getElementById('card-meds-title');
    const cardMedsDesc = document.getElementById('card-meds-desc');
    if (cardMedsTitle) cardMedsTitle.textContent = t('medicinesTitle');
    if (cardMedsDesc) cardMedsDesc.textContent = t('medicinesDesc');

    const cardRemTitle = document.getElementById('card-rem-title');
    const cardRemDesc = document.getElementById('card-rem-desc');
    if (cardRemTitle) cardRemTitle.textContent = t('reminiscenceTitle');
    if (cardRemDesc) cardRemDesc.textContent = t('reminiscenceDesc');
  }

  // AI Telemetry Listener
  window.AIEngine.subscribe((event, data) => {
    const aiBadge = document.getElementById('ai-telemetry-badge');
    if (aiBadge) {
      if (event === 'DIFFICULTY_CHANGED') {
        aiBadge.innerHTML = `🤖 AI স্তৰ: ${data.newDifficulty} (${data.reason})`;
      } else if (event === 'HESITATION_DETECTED') {
        aiBadge.innerHTML = `💡 AI সংকেত প্ৰস্তুত (${(data.durationMs/1000)}s)`;
      } else if (event === 'FATIGUE_WARNING') {
        aiBadge.innerHTML = `🌿 AI: ক্লান্তি অনুভৱ হৈছে। জিৰণি লওক।`;
      }
    }
  });

  applyFontSize();
  updateUILocalizations();
});
