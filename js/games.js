/**
 * DELTA NEURONS: Cognitive Gaming Suite (6 Northeast Indian Clinical Games)
 * Specifically tailored for elderly dementia patients.
 * 1. Sriti Mel (Memory Meadow - Pair Match)
 * 2. Dhyan Bindu (Visual Attention & Tracking)
 * 3. Chena Mukhor (Reminiscence Landmarks & Faces)
 * 4. Bihu Dhol Taal (Folk Rhythm & Musical Memory)
 * 5. Bagicha Bheti (Cultural Category Sorting)
 * 6. Xadhu Kotha (Folktales & Regional History Recall)
 */

class CognitiveGameSuite {
  constructor() {
    // Cultural Symbols of North East India
    this.culturalSymbols = [
      { id: 'rhino', icon: '🦏', nameAs: 'কাজিৰঙাৰ গঁড়', nameEn: 'Kaziranga Rhino', region: 'Assam' },
      { id: 'tea', icon: '🍃', nameAs: 'অসম চাহ পাত', nameEn: 'Assam Tea Leaf', region: 'Assam' },
      { id: 'hornbill', icon: '🦜', nameAs: 'ধনেশ পক্ষী', nameEn: 'Great Hornbill', region: 'Nagaland / Arunachal' },
      { id: 'bridge', icon: '🌉', nameAs: 'জীৱন্ত শিপাৰ দলং', nameEn: 'Living Root Bridge', region: 'Meghalaya' },
      { id: 'dhol', icon: '🥁', nameAs: 'বিহু ঢোল', nameEn: 'Bihu Dhol', region: 'Assam' },
      { id: 'silk', icon: '🧣', nameAs: 'মুগা ৰেচম চাদৰ', nameEn: 'Muga Golden Silk', region: 'Assam' },
      { id: 'deer', icon: '🦌', nameAs: 'চাংগাই হৰিণা', nameEn: 'Sangai Deer', region: 'Manipur' },
      { id: 'panda', icon: '🐾', nameAs: 'ৰঙা পাণ্ডা', nameEn: 'Red Panda', region: 'Sikkim' }
    ];

    // Reminiscence Landmarks
    this.reminiscenceItems = [
      {
        id: 'kaziranga',
        titleAs: 'কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান',
        titleEn: 'Kaziranga National Park',
        icon: '🦏🌿',
        descAs: 'এশিঙীয়া গঁড় আৰু সেউজীয়া বননিৰে ভৰা অসমৰ গৌৰৱ।',
        descEn: 'The sanctuary of the one-horned rhinoceros and lush green floodplains.',
        options: [
          { text: 'কাজিৰঙা (Kaziranga)', isCorrect: true },
          { text: 'দিল্লী চহৰ (Delhi City)', isCorrect: false },
          { text: 'গোৱা সমুদ্ৰ তীৰ (Goa Beach)', isCorrect: false }
        ]
      },
      {
        id: 'rootbridge',
        titleAs: 'মেঘালয়ৰ জীৱন্ত শিপাৰ দলং',
        titleEn: 'Living Root Bridges of Meghalaya',
        icon: '🌉🌳',
        descAs: 'খাচীয়া সম্প্ৰদায়ৰ প্ৰকৃতি আৰু মানুহৰ অপূৰ্ব মিলন।',
        descEn: 'Cherrapunji & Nongriat handcrafted bio-engineering across gushing rivers.',
        options: [
          { text: 'জীৱন্ত শিপাৰ দলং (Living Root Bridge)', isCorrect: true },
          { text: 'হাওৰা দলং (Howrah Bridge)', isCorrect: false },
          { text: 'ৰে’ল পথ (Train Tracks)', isCorrect: false }
        ]
      },
      {
        id: 'loktak',
        titleAs: 'মণিপুৰৰ লোকতাক হ্ৰদ আৰু ফুমদী',
        titleEn: 'Loktak Lake & Phumdis',
        icon: '🌊🚣',
        descAs: 'উটি থকা সেউজীয়া দ্বীপ আৰু প্ৰাকৃতিক ভাসমান হ্ৰদ।',
        descEn: 'The world’s only floating national park and serene waters.',
        options: [
          { text: 'মৰুভূমি (Desert Sand)', isCorrect: false },
          { text: 'লোকতাক হ্ৰদ (Loktak Lake)', isCorrect: true },
          { text: 'বৰফৰ পাহাৰ (Snow Peak)', isCorrect: false }
        ]
      },
      {
        id: 'bihu',
        titleAs: 'ৰঙালী বিহু আৰু ঢোল-পেঁপা',
        titleEn: 'Rongali Bihu Celebrations',
        icon: '🥁🎺',
        descAs: 'বসন্তৰ আগমন আৰু আনন্দময় বিহু নৃত্যৰ সুৰ।',
        descEn: 'Spring festivities, traditional dhol drums, and joyful dances.',
        options: [
          { text: 'ৰঙালী বিহু (Rongali Bihu)', isCorrect: true },
          { text: 'ক্ৰিস্মাছ উৎসৱ (Christmas)', isCorrect: false },
          { text: 'ৰথ যাত্ৰা (Rath Yatra)', isCorrect: false }
        ]
      }
    ];

    // Traditional NER Folk Instruments for Rhythm Memory
    this.instruments = [
      { id: 'dhol', nameAs: 'বিহু ঢোল', nameEn: 'Bihu Dhol', icon: '🥁', color: '#B85D43', play: () => window.VoiceNER.playBihuDhol() },
      { id: 'pepa', nameAs: 'মহৰ শিঙৰ পেঁপা', nameEn: 'Pepa Horn', icon: '🎺', color: '#C9751E', play: () => window.VoiceNER.playPepa() },
      { id: 'toka', nameAs: 'বাঁহৰ টকা', nameEn: 'Bamboo Toka', icon: '🪵', color: '#1E6B52', play: () => window.VoiceNER.playToka() },
      { id: 'taal', nameAs: 'কাঁহৰ তাল', nameEn: 'Taal Cymbals', icon: '🔔', color: '#1D6F8A', play: () => window.VoiceNER.playTaal() }
    ];

    // Cultural Category Sorting Items
    this.sortingItems = [
      { id: 'pitha', nameAs: 'ঘিলা আৰু তিল পিঠা', nameEn: 'Til Pitha', icon: '🥟', category: 'food' },
      { id: 'jaapi', nameAs: 'ফুলাম জাপি', nameEn: 'Assamese Jaapi', icon: '👒', category: 'attire' },
      { id: 'tenga', nameAs: 'মাছৰ টেঙা জোল', nameEn: 'Masor Tenga', icon: '🍲', category: 'food' },
      { id: 'mekhela', nameAs: 'মুগা মেখেলা চাদৰ', nameEn: 'Muga Silk Mekhela', icon: '🧣', category: 'attire' },
      { id: 'khorisa', nameAs: 'বাঁহৰ গাজ / খৰিচা', nameEn: 'Bamboo Shoot Khorisa', icon: '🎋', category: 'food' },
      { id: 'shawl', nameAs: 'নাগা পৰম্পৰাগত চাদৰ', nameEn: 'Naga Shawl', icon: '🥻', category: 'attire' }
    ];

    // Folktales and Legends
    this.folktales = [
      {
        id: 'tejimola',
        heroAs: 'তেজীমলা (Tejimola)',
        titleAs: 'মাহীআই আৰু তেজীমলাৰ সাধু',
        storyAs: 'মাহীআইৰ অত্যাচাৰত পদুম ফুল আৰু লাও হৈ ফুলি উঠা আৰু শেষত পিতৃৰ কোলাত মানুহৰ ৰূপ ঘূৰাই পোৱা মৰমৰ কন্যাজনী কোন?',
        icon: '🌸🪷',
        options: [
          { text: 'তেজীমলা (Tejimola)', isCorrect: true },
          { text: 'বেউলা (Beula)', isCorrect: false },
          { text: 'শকুন্তলা (Shakuntala)', isCorrect: false }
        ]
      },
      {
        id: 'lachit',
        heroAs: 'লাচিত বৰফুকন (Lachit Borphukan)',
        titleAs: 'শৰাইঘাটৰ ৰণ আৰু বীৰ লাচিত',
        storyAs: '“দেশতকৈ মোমাই ডাঙৰ নহয়”— বুলি শৰাইঘাটৰ ৰণত অসম মাতৃক শত্ৰুৰ পৰা ৰক্ষা কৰা মহান সেনাপতিজন কোন আছিল?',
        icon: '⚔️🛡️',
        options: [
          { text: 'লাচিত বৰফুকন (Lachit Borphukan)', isCorrect: true },
          { text: 'চিমিলাৰাজ (Chilarai)', isCorrect: false },
          { text: 'ৰুদ্ৰসিংহ (Rudra Singha)', isCorrect: false }
        ]
      },
      {
        id: 'gaidinliu',
        heroAs: 'ৰাণী গাইডিনলিউ (Rani Gaidinliu)',
        titleAs: 'পাহাৰৰ বীৰাংগনা ৰাণী গাইডিনলিউ',
        storyAs: 'স্বাধীনতাৰ বাবে ব্ৰিটিছৰ বিৰুদ্ধে পাহাৰৰ পৰা সংগ্ৰাম কৰা আৰু জৱাহৰলাল নেহৰুৱে ‘ৰাণী’ উপাধি দিয়া নাগা বীৰাংগনা কোন?',
        icon: '🏔️✊',
        options: [
          { text: 'ৰাণী গাইডিনলিউ (Rani Gaidinliu)', isCorrect: true },
          { text: 'ঝান্সীৰ ৰাণী (Rani Laxmibai)', isCorrect: false },
          { text: 'কনকলতা বৰুৱা (Kanaklata)', isCorrect: false }
        ]
      }
    ];

    // State Variables
    this.memoryCards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.totalPairs = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isLocked = false;
    this.currentAttentionTarget = null;
    this.currentReminiscenceIndex = 0;

    // Rhythm state
    this.rhythmSequence = [];
    this.playerRhythmStep = 0;
    this.isListeningToRhythm = false;

    // Sorting state
    this.currentSortingIndex = 0;
    this.currentFolktaleIndex = 0;
  }

  // -------------------------------------------------------------
  // GAME 1: SRITI MEL (স্মৃতি মেল - MEMORY MEADOW)
  // -------------------------------------------------------------
  startMemoryGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.stopTimer();
    this.timerSeconds = 0;
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.isLocked = false;

    const diff = window.AIEngine.session.currentDifficulty;
    const pairCountMap = { 1: 2, 2: 3, 3: 4, 4: 6 };
    this.totalPairs = pairCountMap[diff] || 3;

    const shuffledSymbols = [...this.culturalSymbols].sort(() => 0.5 - Math.random());
    const selectedSymbols = shuffledSymbols.slice(0, this.totalPairs);

    let cardDeck = [];
    selectedSymbols.forEach(sym => {
      cardDeck.push({ ...sym, cardKey: `${sym.id}-1` });
      cardDeck.push({ ...sym, cardKey: `${sym.id}-2` });
    });
    cardDeck.sort(() => 0.5 - Math.random());
    this.memoryCards = cardDeck;

    container.innerHTML = '';
    const gridEl = document.createElement('div');
    gridEl.className = 'memory-grid';
    gridEl.style.gridTemplateColumns = `repeat(${Math.min(4, Math.ceil(Math.sqrt(cardDeck.length * 1.5)))}, 1fr)`;

    cardDeck.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.dataset.index = index;
      cardEl.dataset.id = card.id;

      cardEl.innerHTML = `
        <div class="memory-card-face memory-card-back">
          <div class="memory-card-back-pattern">🌿</div>
        </div>
        <div class="memory-card-face memory-card-front">
          <div class="card-symbol-icon">${card.icon}</div>
          <div class="card-symbol-name">${card.nameAs}</div>
          <div class="card-symbol-sub">${card.nameEn}</div>
          <button class="mini-speaker-btn" title="Listen" onclick="event.stopPropagation(); window.VoiceNER.speak('${card.nameAs}')">🔊</button>
        </div>
      `;

      cardEl.addEventListener('click', () => this.handleCardClick(index, cardEl));
      gridEl.appendChild(cardEl);
    });

    container.appendChild(gridEl);
    this.startTimer();
    this.armAIHesitationHint();
    window.VoiceNER.speak(window.VoiceNER.t('gameMemoryDesc'));
  }

  armAIHesitationHint() {
    window.AIEngine.startHesitationWatchdog(() => {
      const unmatched = this.memoryCards
        .map((c, idx) => ({ ...c, idx }))
        .filter((c, idx) => {
          const el = document.querySelectorAll('.memory-card')[idx];
          return el && !el.classList.contains('matched');
        });

      if (unmatched.length > 0) {
        const targetId = unmatched[0].id;
        const matchingCards = document.querySelectorAll(`.memory-card[data-id="${targetId}"]`);
        matchingCards.forEach(card => card.classList.add('ai-hint'));
        window.VoiceNER.speak(window.VoiceNER.t('hintPrompt'));
      }
    });
  }

  handleCardClick(index, cardEl) {
    if (this.isLocked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    document.querySelectorAll('.memory-card.ai-hint').forEach(c => c.classList.remove('ai-hint'));
    window.VoiceNER.playSoftTap();

    cardEl.classList.add('flipped');
    this.flippedCards.push({ index, cardEl, data: this.memoryCards[index] });

    if (this.flippedCards.length === 2) {
      this.isLocked = true;
      const [first, second] = this.flippedCards;
      const isMatch = first.data.id === second.data.id;

      window.AIEngine.recordMove(isMatch);

      if (isMatch) {
        setTimeout(() => {
          first.cardEl.classList.add('matched');
          second.cardEl.classList.add('matched');
          window.VoiceNER.playChimeSuccess();
          this.matchedPairs++;
          this.flippedCards = [];
          this.isLocked = false;

          if (this.matchedPairs === this.totalPairs) {
            this.handleGameComplete('Sriti Mel (Memory Meadow)');
          } else {
            this.armAIHesitationHint();
          }
        }, 500);
      } else {
        setTimeout(() => {
          first.cardEl.classList.remove('flipped');
          second.cardEl.classList.remove('flipped');
          this.flippedCards = [];
          this.isLocked = false;
          this.armAIHesitationHint();
        }, 1100);
      }
    }
  }

  // -------------------------------------------------------------
  // GAME 2: DHYAN BINDU (ধ্যান বিন্দু - FOCUS & SPOT)
  // -------------------------------------------------------------
  startAttentionGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.stopTimer();
    this.timerSeconds = 0;
    this.isLocked = false;

    const target = this.culturalSymbols[Math.floor(Math.random() * this.culturalSymbols.length)];
    this.currentAttentionTarget = target;

    const diff = window.AIEngine.session.currentDifficulty;
    const totalItems = Math.min(12, 4 + diff * 2);

    const pool = [];
    pool.push(target);
    while (pool.length < totalItems) {
      const randomSymbol = this.culturalSymbols[Math.floor(Math.random() * this.culturalSymbols.length)];
      pool.push(randomSymbol);
    }
    pool.sort(() => 0.5 - Math.random());

    container.innerHTML = `
      <div class="target-prompt-banner">
        <div>${window.VoiceNER.t('gameAttentionTitle')}:</div>
        <div class="target-specimen">${target.icon} ${target.nameAs} (${target.nameEn})</div>
        <button class="mini-speaker-btn" onclick="window.VoiceNER.speak('${target.nameAs}')">🔊</button>
      </div>
      <div class="attention-canvas-area" id="attention-items-wrapper"></div>
    `;

    const itemsWrapper = document.getElementById('attention-items-wrapper');
    pool.forEach((item) => {
      const itemBtn = document.createElement('div');
      itemBtn.className = 'attention-item';
      itemBtn.innerHTML = `
        <div style="font-size: 2.4rem;">${item.icon}</div>
        <div style="font-size: 0.75rem; font-weight: 700; text-align: center;">${item.nameAs}</div>
      `;

      itemBtn.addEventListener('click', () => {
        const isCorrect = item.id === target.id;
        window.AIEngine.recordMove(isCorrect);

        if (isCorrect) {
          itemBtn.classList.add('correct-spot');
          window.VoiceNER.playChimeSuccess();
          setTimeout(() => {
            this.handleGameComplete('Dhyan Bindu (Focus Point)');
          }, 700);
        } else {
          window.VoiceNER.playSoftTap();
          window.VoiceNER.speak(window.VoiceNER.t('gentleTryAgain'));
        }
      });

      itemsWrapper.appendChild(itemBtn);
    });

    this.startTimer();
    window.VoiceNER.speak(`${window.VoiceNER.t('gameAttentionDesc')} - ${target.nameAs}`);
  }

  // -------------------------------------------------------------
  // GAME 3: CHENA MUKHOR (চেনা মুখৰ - FAMILIAR LANDMARKS)
  // -------------------------------------------------------------
  startReminiscenceGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.stopTimer();
    this.timerSeconds = 0;

    const item = this.reminiscenceItems[this.currentReminiscenceIndex % this.reminiscenceItems.length];

    container.innerHTML = `
      <div class="reminiscence-arena">
        <div class="reminiscence-image-card">
          <div class="reminiscence-illustration">${item.icon}</div>
          <div class="reminiscence-caption">
            <h3>${item.titleAs}</h3>
            <p style="font-size: 1rem; color: var(--text-secondary); margin-top: 4px;">${item.descAs}</p>
            <button class="mini-speaker-btn" style="margin-top: 8px;" onclick="window.VoiceNER.speak('${item.titleAs}. ${item.descAs}')">🔊 শুনক (Listen)</button>
          </div>
        </div>

        <div class="reminiscence-options-grid">
          ${item.options.map((opt) => `
            <button class="reminiscence-option-btn" data-correct="${opt.isCorrect}">
              <span style="font-size: 1.4rem;">📍</span>
              <span>${opt.text}</span>
              <span class="mini-speaker-btn" onclick="event.stopPropagation(); window.VoiceNER.speak('${opt.text}')">🔊</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.reminiscence-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        window.AIEngine.recordMove(isCorrect);

        if (isCorrect) {
          btn.style.background = 'var(--primary-light)';
          btn.style.borderColor = 'var(--primary)';
          window.VoiceNER.playChimeSuccess();
          setTimeout(() => {
            this.currentReminiscenceIndex++;
            this.handleGameComplete('Chena Mukhor (Reminiscence Recognition)');
          }, 800);
        } else {
          window.VoiceNER.playSoftTap();
          window.VoiceNER.speak(window.VoiceNER.t('gentleTryAgain'));
        }
      });
    });

    this.startTimer();
    window.VoiceNER.speak(`${window.VoiceNER.t('gameRecognitionTitle')}. ${item.titleAs}`);
  }

  // -------------------------------------------------------------
  // GAME 4: BIHU DHOL TAAL (বিহু ঢোল-তাল - FOLK RHYTHM & MUSICAL MEMORY)
  // -------------------------------------------------------------
  startRhythmGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.stopTimer();
    this.timerSeconds = 0;
    this.playerRhythmStep = 0;
    this.isListeningToRhythm = true;

    // Sequence length based on difficulty (2 to 4 notes)
    const diff = window.AIEngine.session.currentDifficulty;
    const seqLength = Math.min(4, 1 + diff);

    this.rhythmSequence = [];
    for (let i = 0; i < seqLength; i++) {
      const randInst = this.instruments[Math.floor(Math.random() * this.instruments.length)];
      this.rhythmSequence.push(randInst);
    }

    container.innerHTML = `
      <div class="rhythm-game-arena">
        <div class="rhythm-status-banner" id="rhythm-status-banner">
          <span>🎵 ${window.VoiceNER.t('listenFirst')}</span>
        </div>

        <div class="instrument-pads-grid">
          ${this.instruments.map(inst => `
            <button class="instrument-pad" id="pad-${inst.id}" data-id="${inst.id}">
              <div class="pad-icon">${inst.icon}</div>
              <div class="pad-name">${inst.nameAs}</div>
              <div class="pad-sub">${inst.nameEn}</div>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Attach pad click events
    this.instruments.forEach(inst => {
      const pad = document.getElementById(`pad-${inst.id}`);
      if (pad) {
        pad.addEventListener('click', () => this.handlePadTap(inst));
      }
    });

    this.startTimer();

    // Play the sequence for the patient to listen and memorize
    setTimeout(() => {
      this.playRhythmDemoSequence();
    }, 1000);
  }

  playRhythmDemoSequence() {
    this.isListeningToRhythm = true;
    const banner = document.getElementById('rhythm-status-banner');
    if (banner) {
      banner.innerHTML = `<span>👂 <strong>${window.VoiceNER.t('listenFirst')}</strong></span>`;
    }

    this.rhythmSequence.forEach((inst, index) => {
      setTimeout(() => {
        // Flash instrument pad
        const pad = document.getElementById(`pad-${inst.id}`);
        if (pad) {
          pad.classList.add('playing');
          inst.play();
          setTimeout(() => pad.classList.remove('playing'), 450);
        }

        // When demo completes, grant control to patient
        if (index === this.rhythmSequence.length - 1) {
          setTimeout(() => {
            this.isListeningToRhythm = false;
            this.playerRhythmStep = 0;
            if (banner) {
              banner.innerHTML = `<span style="color: var(--primary);">🥁 <strong>${window.VoiceNER.t('yourTurnNow')}</strong></span>`;
            }
            window.VoiceNER.speak(window.VoiceNER.t('yourTurnNow'));
          }, 800);
        }
      }, (index + 1) * 850);
    });
  }

  handlePadTap(inst) {
    if (this.isListeningToRhythm) return;

    // Play instrument audio immediately
    inst.play();
    const pad = document.getElementById(`pad-${inst.id}`);
    if (pad) {
      pad.classList.add('playing');
      setTimeout(() => pad.classList.remove('playing'), 300);
    }

    const expectedInst = this.rhythmSequence[this.playerRhythmStep];
    const isMatch = inst.id === expectedInst.id;

    window.AIEngine.recordMove(isMatch);

    if (isMatch) {
      this.playerRhythmStep++;
      if (this.playerRhythmStep === this.rhythmSequence.length) {
        // Successful sequence!
        setTimeout(() => {
          window.VoiceNER.playChimeSuccess();
          this.handleGameComplete('Bihu Dhol Taal (Folk Rhythm)');
        }, 500);
      }
    } else {
      // Gentle mismatch prompt without harsh punishment
      window.VoiceNER.speak(window.VoiceNER.t('gentleTryAgain'));
      setTimeout(() => {
        this.playRhythmDemoSequence();
      }, 1200);
    }
  }

  // -------------------------------------------------------------
  // GAME 5: BAGICHA BHETI (বাপতি-সাহোন - CULTURAL CATEGORY SORTING)
  // -------------------------------------------------------------
  startSortingGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.stopTimer();
    this.timerSeconds = 0;

    const item = this.sortingItems[this.currentSortingIndex % this.sortingItems.length];

    container.innerHTML = `
      <div class="sorting-arena">
        <div class="sorting-prompt-card">
          <div style="font-size: 4rem;">${item.icon}</div>
          <h3 style="font-size: var(--font-h3); margin-top: 8px;">${item.nameAs}</h3>
          <p style="color: var(--text-secondary); font-size: 1rem;">(${item.nameEn})</p>
          <button class="mini-speaker-btn" style="margin-top: 8px;" onclick="window.VoiceNER.speak('${item.nameAs}')">🔊 শুনক (Listen)</button>
        </div>

        <div style="text-align: center; margin: 16px 0; font-weight: 800; font-size: var(--font-body); color: var(--primary);">
          তলৰ কোনটো ডলাত বা ঝুড়িত থব? (Choose the right basket)
        </div>

        <div class="baskets-grid">
          <!-- Basket 1: Food -->
          <div class="woven-basket-card" id="basket-food" data-category="food">
            <div class="basket-icon">🧺🍲</div>
            <div class="basket-title">পৰম্পৰাগত খাদ্য সম্ভাৰ</div>
            <div class="basket-sub">Traditional Food Delicacies</div>
          </div>

          <!-- Basket 2: Attire & Crafts -->
          <div class="woven-basket-card" id="basket-attire" data-category="attire">
            <div class="basket-icon">🧺👘</div>
            <div class="basket-title">সাজপাৰ আৰু লোকশিল্প</div>
            <div class="basket-sub">Attire & Heritage Crafts</div>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('.woven-basket-card').forEach(basket => {
      basket.addEventListener('click', () => {
        const chosenCat = basket.dataset.category;
        const isCorrect = chosenCat === item.category;

        window.AIEngine.recordMove(isCorrect);

        if (isCorrect) {
          basket.classList.add('correct-basket');
          window.VoiceNER.playChimeSuccess();
          setTimeout(() => {
            this.currentSortingIndex++;
            this.handleGameComplete('Bagicha Bheti (Cultural Sorting)');
          }, 800);
        } else {
          window.VoiceNER.playSoftTap();
          window.VoiceNER.speak(window.VoiceNER.t('gentleTryAgain'));
        }
      });
    });

    this.startTimer();
    window.VoiceNER.speak(`${item.nameAs}. ${window.VoiceNER.t('gameSortingDesc')}`);
  }

  // -------------------------------------------------------------
  // GAME 6: XADHU KOTHA (সাধুকথা আৰু বুৰঞ্জী - FOLKTALES & LEGENDS)
  // -------------------------------------------------------------
  startFolktaleGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.stopTimer();
    this.timerSeconds = 0;

    const story = this.folktales[this.currentFolktaleIndex % this.folktales.length];

    container.innerHTML = `
      <div class="reminiscence-arena">
        <div class="folktale-parchment-card">
          <div style="font-size: 3.5rem; text-align: center; margin-bottom: 8px;">${story.icon}</div>
          <h3 style="font-size: var(--font-h3); color: var(--primary); text-align: center; margin-bottom: 12px;">
            ${story.titleAs}
          </h3>
          <p class="folktale-story-text">${story.storyAs}</p>
          <div style="text-align: center; margin-top: 14px;">
            <button class="audio-narrate-btn" onclick="window.VoiceNER.speak('${story.titleAs}. ${story.storyAs}')">
              <span>🔊</span>
              <span>সাধুটো পঢ়ি শুনক (Listen to Story)</span>
            </button>
          </div>
        </div>

        <div class="reminiscence-options-grid" style="margin-top: 20px;">
          ${story.options.map(opt => `
            <button class="reminiscence-option-btn" data-correct="${opt.isCorrect}">
              <span style="font-size: 1.5rem;">📜</span>
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.reminiscence-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        window.AIEngine.recordMove(isCorrect);

        if (isCorrect) {
          btn.style.background = 'var(--primary-light)';
          btn.style.borderColor = 'var(--primary)';
          window.VoiceNER.playChimeSuccess();
          setTimeout(() => {
            this.currentFolktaleIndex++;
            this.handleGameComplete('Xadhu Kotha (Folktales & Legends)');
          }, 800);
        } else {
          window.VoiceNER.playSoftTap();
          window.VoiceNER.speak(window.VoiceNER.t('gentleTryAgain'));
        }
      });
    });

    this.startTimer();
  }

  // -------------------------------------------------------------
  // TIMERS & COMPLETION
  // -------------------------------------------------------------
  startTimer() {
    this.stopTimer();
    const timerDisplay = document.getElementById('game-timer-display');
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      if (timerDisplay) {
        timerDisplay.textContent = `⏱️ ${this.timerSeconds}s`;
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handleGameComplete(gameName) {
    this.stopTimer();
    const summary = window.AIEngine.finalizeSession(gameName);

    // Auto-sync game telemetry to backend SQLite database
    if (window.SyncEngine) {
      window.SyncEngine.enqueue('GAME_SESSION', {
        gameName,
        score: summary.cognitiveScore,
        latencySec: parseFloat(summary.avgLatencySec) || 4.5,
        accuracyPct: summary.accuracy,
        hintsUsed: summary.hintsUsed || 0
      });
    }

    const modal = document.getElementById('calm-feedback-modal');
    if (modal) {
      document.getElementById('modal-feedback-title').textContent = window.VoiceNER.t('wellDone');
      document.getElementById('modal-feedback-body').innerHTML = `
        <p><strong>${gameName}</strong> সম্পূৰ্ণ হ’ল!</p>
        <p style="margin-top: 8px;">মগজুৰ সক্ৰিয়তা সূচক: <strong>${summary.cognitiveScore}/100</strong></p>
        <p style="color: var(--text-muted); font-size: 0.9rem;">সময়: ${this.timerSeconds} ছেকেণ্ড • নিখুঁততা: ${summary.accuracy}%</p>
      `;
      modal.classList.add('active');
    }

    window.VoiceNER.speak(window.VoiceNER.t('wellDone'));
  }
}

// Export singleton instance
window.GameSuite = new CognitiveGameSuite();
