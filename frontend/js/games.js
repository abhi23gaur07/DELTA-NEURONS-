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

    // Traditional NER Folk Instruments for Rhythm & Music Games
    this.instruments = [
      { id: 'dhol', nameAs: 'বিহু ঢোল', nameEn: 'Bihu Dhol Drum', icon: '🥁', color: '#B85D43', play: () => window.VoiceNER.playBihuDhol() },
      { id: 'pepa', nameAs: 'মহৰ শিঙৰ পেঁপা', nameEn: 'Buffalo Horn Pepa', icon: '🎺', color: '#C9751E', play: () => window.VoiceNER.playPepa() },
      { id: 'toka', nameAs: 'বাঁহৰ টকা', nameEn: 'Bamboo Toka Clapper', icon: '🪵', color: '#1E6B52', play: () => window.VoiceNER.playToka() },
      { id: 'taal', nameAs: 'কাঁহৰ তাল', nameEn: 'Bell-Metal Taal Cymbals', icon: '🔔', color: '#1D6F8A', play: () => window.VoiceNER.playTaal() },
      { id: 'gogona', nameAs: 'বাঁহৰ গগনা', nameEn: 'Bamboo Gogona Harp', icon: '🎋', color: '#8E44AD', play: () => window.VoiceNER.playGogona() },
      { id: 'tokari', nameAs: 'টোকোৰী বীণা', nameEn: 'Tokari Folk Lute', icon: '🪕', color: '#D35400', play: () => window.VoiceNER.playTokari() },
      { id: 'khol', nameAs: 'নামঘৰৰ খোল', nameEn: 'Devotional Clay Khol', icon: '🪘', color: '#27AE60', play: () => window.VoiceNER.playKhol() },
      { id: 'bahi', nameAs: 'অসমীয়া বাঁহী', nameEn: 'Assamese Bamboo Bahi', icon: '🎵', color: '#2980B9', play: () => window.VoiceNER.playBahi() }
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
  // CINEMATIC GAME ZOOM-IN TRANSITION
  // -------------------------------------------------------------
  triggerGameZoomTransition(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.classList.remove('game-arena-zooming');
    void el.offsetWidth; // Trigger reflow
    el.classList.add('game-arena-zooming');

    if (window.VoiceNER && typeof window.VoiceNER.playZoomChime === 'function') {
      window.VoiceNER.playZoomChime();
    }

    setTimeout(() => {
      if (el) el.classList.remove('game-arena-zooming');
    }, 750);
  }

  // -------------------------------------------------------------
  // 1. PANORAMIC LIVING BACKGROUND SCENERY (BEHIND EVERYTHING)
  // -------------------------------------------------------------
  renderBackgroundScenery() {
    return `
      <div class="panoramic-scenery-layer" aria-hidden="true">
        <!-- Sunset Gradient Sky over Brahmaputra Valley -->
        <div class="scenery-sky-gradient"></div>

        <!-- Rolling Blue Hills & Rainforest Canopy Silhouette -->
        <div class="scenery-mountain-silhouette"></div>

        <!-- Flowing Brahmaputra River Water Waves -->
        <div class="scenery-river-waves"></div>

        <!-- Great Hornbill Bird 1 Flying Across Horizon (ধনেশ পক্ষী) -->
        <svg class="hornbill-bird-fs" viewBox="0 0 100 60">
          <path d="M 10,32 L 2,28 L 2,36 Z" fill="#FFFFFF" />
          <path d="M 6,30 L 2,30" stroke="#111111" stroke-width="2" />
          <ellipse cx="36" cy="30" rx="26" ry="12" fill="#1C1B1A" />
          <path d="M 54,24 Q 64,22 68,16 Q 66,32 54,34 Z" fill="#FFF8E7" />
          <circle cx="70" cy="18" r="8" fill="#1C1B1A" />
          <path d="M 66,12 Q 82,4 98,16 Q 84,20 74,20 Z" fill="#FFD54F" stroke="#E65100" stroke-width="0.8" />
          <path d="M 78,10 Q 86,9 88,14 Q 80,14 78,10 Z" fill="#212121" />
          <path class="hornbill-wing" d="M 32,28 Q 20,4 6,18 Q 22,24 38,30 Z" fill="#263238" stroke="#ECEFF1" stroke-width="1.2" />
          <circle cx="72" cy="17" r="1.5" fill="#D32F2F" />
        </svg>

        <!-- Great Hornbill Bird 2 Flying High in Background -->
        <svg class="hornbill-bird-fs hornbill-bird-fs-2" viewBox="0 0 100 60">
          <ellipse cx="36" cy="30" rx="26" ry="12" fill="#1C1B1A" />
          <path d="M 54,24 Q 64,22 68,16 Q 66,32 54,34 Z" fill="#FFF8E7" />
          <circle cx="70" cy="18" r="8" fill="#1C1B1A" />
          <path d="M 66,12 Q 82,4 98,16 Q 84,20 74,20 Z" fill="#FFD54F" stroke="#E65100" stroke-width="0.8" />
          <path class="hornbill-wing" d="M 32,28 Q 20,4 6,18 Q 22,24 38,30 Z" fill="#263238" stroke="#ECEFF1" stroke-width="1.2" />
        </svg>

        <!-- Traditional Assamese Country Boat (Naaw) with Boatman Rowing on River -->
        <svg class="boatman-silhouette" viewBox="0 0 120 60">
          <!-- Wooden Boat Hull -->
          <path d="M 6,42 Q 60,56 114,42 Q 100,52 60,54 Q 20,52 6,42 Z" fill="#2A1608" stroke="#5D4037" stroke-width="1" />
          <!-- Bamboo Roof Canopy (Chhai) -->
          <path d="M 34,42 Q 60,24 86,42 Z" fill="#8D6E63" stroke="#4E342E" stroke-width="1" />
          <!-- Rowing Boatman Head & Torso -->
          <circle cx="24" cy="28" r="5" fill="#3E2723" />
          <!-- Conical Jaapi Hat on Boatman -->
          <polygon points="24,18 16,28 32,28" fill="#D7CCC8" stroke="#8D6E63" stroke-width="0.8" />
          <!-- Oar (Boitha) dipping in water -->
          <line x1="24" y1="36" x2="10" y2="58" stroke="#4E342E" stroke-width="2.5" stroke-linecap="round" />
          <ellipse cx="8" cy="58" rx="4" ry="2" fill="#6D4C41" />
        </svg>

        <!-- Floating Assamese Gamusa Ribbon in Sky Breeze -->
        <div class="floating-gamusa-fs" title="বতাহত উৰি থকা অসমীয়া গামোচা (Flowing Gamusa)"></div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 2. LEFT CULTURAL PAVILION (FLANKING THE LOOM ON LEFT)
  // -------------------------------------------------------------
  renderLeftPavilion() {
    return `
      <aside class="cultural-pavilion" role="region" aria-label="Northeast Indian Cultural Pavilion - Left Flank">
        <div class="pavilion-header">
          🌿 অসমৰ লোক-সংস্কৃতি (Assam Heritage)
        </div>

        <!-- 1. Assamese Bihu Dancer (অসমীয়া বিহু নাচনী) -->
        <div class="cultural-figure-card">
          <div class="figure-svg-container">
            <svg viewBox="0 0 84 124" style="width: 78px; height: 118px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
              <!-- Kopou Phul (Pink Orchid in hair bun) -->
              <circle cx="52" cy="16" r="4.5" fill="#E91E63" />
              <circle cx="56" cy="20" r="3.5" fill="#F48FB1" />
              <circle cx="48" cy="13" r="2.5" fill="#FFFFFF" />
              <!-- Hair Bun (Khupa) -->
              <circle cx="48" cy="20" r="9.5" fill="#1A1A1A" />
              <!-- Head & Face with Red Bindi (Kopalo Tika) -->
              <circle cx="40" cy="23" r="8.5" fill="#F5D0A9" />
              <circle cx="40" cy="21" r="1.3" fill="#D32F2F" /> <!-- Bindi -->
              <!-- Red Gamusa Headband -->
              <path d="M 33,17 Q 40,14 47,17" stroke="#D32F2F" stroke-width="2.6" fill="none" />

              <!-- Traditional Neck Jewelry (Junbiri) -->
              <path d="M 36,29 Q 40,33 44,29" stroke="#FFD54F" stroke-width="1.8" fill="none" />

              <!-- Torso & Muga Silk Blouse (Animated Sway) -->
              <g class="bihu-dancer-body">
                <!-- Red/Gold Blouse -->
                <path d="M 33,31 L 47,31 L 49,50 L 31,50 Z" fill="#C9751E" stroke="#B83A2E" stroke-width="1" />
                <!-- Red Waist Belt (Kotora) -->
                <rect x="30" y="48" width="20" height="5" fill="#D32F2F" rx="2" />
                <!-- Flowing Red Sash End -->
                <path d="M 46,53 Q 54,68 49,80" stroke="#D32F2F" stroke-width="3" fill="none" />
                <!-- Golden Muga Silk Mekhela (Skirt) with Kingkhap Red Motifs -->
                <path d="M 31,53 L 49,53 L 56,102 L 24,102 Z" fill="#E6B15C" stroke="#8D5B18" stroke-width="1.2" />
                <path d="M 26,94 L 54,94" stroke="#D32F2F" stroke-width="3" />
                <path d="M 28,86 L 52,86" stroke="#D32F2F" stroke-width="1.5" stroke-dasharray="3,3" />
                <!-- Diamond Kingkhap motifs -->
                <polygon points="40,68 43,72 40,76 37,72" fill="#D32F2F" />
                <polygon points="32,78 34,81 32,84 30,81" fill="#D32F2F" />
                <polygon points="48,78 50,81 48,84 46,81" fill="#D32F2F" />
                <!-- Feet with Red Aalta -->
                <ellipse cx="32" cy="104" rx="5" ry="3" fill="#F5D0A9" stroke="#D32F2F" stroke-width="1.5" />
                <ellipse cx="48" cy="104" rx="5" ry="3" fill="#F5D0A9" stroke="#D32F2F" stroke-width="1.5" />
              </g>

              <!-- Left Arm with Bihu Mudra (Animated) -->
              <g class="bihu-arms-left">
                <path d="M 33,33 Q 16,38 20,54 Q 22,58 28,52" fill="none" stroke="#F5D0A9" stroke-width="3.5" stroke-linecap="round" />
                <circle cx="28" cy="52" r="2.5" fill="#D32F2F" /> <!-- Aalta hand -->
              </g>

              <!-- Right Arm with Bihu Mudra (Animated) -->
              <g class="bihu-arms-right">
                <path d="M 47,33 Q 64,26 60,12 Q 56,10 49,15" fill="none" stroke="#F5D0A9" stroke-width="3.5" stroke-linecap="round" />
                <circle cx="49" cy="15" r="2.5" fill="#D32F2F" /> <!-- Aalta hand -->
              </g>
            </svg>
          </div>
          <div class="figure-name">বিহু নাচনী (Bihu Dancer)</div>
          <div class="figure-desc">মুগা ৰেচম, কপৌ ফুল আৰু বিহু মুদ্ৰা</div>
        </div>

        <!-- 2. Assamese Bihu Dholiya / Drummer (বিহু ঢুলীয়া) -->
        <div class="cultural-figure-card">
          <div class="figure-svg-container">
            <svg viewBox="0 0 84 124" style="width: 78px; height: 118px;">
              <!-- Red/White Paguri Turban -->
              <ellipse cx="40" cy="16" rx="12" ry="7" fill="#D32F2F" stroke="#FFF" stroke-width="1" />
              <circle cx="40" cy="22" r="8" fill="#F5D0A9" />
              <!-- White Kurta Body -->
              <path d="M 30,30 L 50,30 L 53,68 L 27,68 Z" fill="#F5F5F5" stroke="#E0E0E0" stroke-width="1" />
              <!-- Red Waist Gamusa (Tangali) -->
              <rect x="28" y="48" width="24" height="5" fill="#D32F2F" />
              <!-- Dhoti Legs -->
              <path d="M 30,68 L 36,102 L 44,102 L 50,68 Z" fill="#ECEFF1" stroke="#CFD8DC" stroke-width="1" />
              
              <!-- Two-Headed Wooden Bihu Dhol Drum -->
              <g class="dholiya-arms-beat">
                <ellipse cx="40" cy="54" rx="20" ry="11" fill="#795548" stroke="#3E2723" stroke-width="1.8" />
                <!-- Left drum head -->
                <ellipse cx="21" cy="54" rx="3.5" ry="9" fill="#FFF8E7" stroke="#3E2723" stroke-width="1" />
                <!-- Right drum head -->
                <ellipse cx="59" cy="54" rx="3.5" ry="9" fill="#FFF8E7" stroke="#3E2723" stroke-width="1" />
                <!-- Leather tension cords (Khoroni) -->
                <line x1="21" y1="46" x2="59" y2="60" stroke="#FFD54F" stroke-width="1" />
                <line x1="21" y1="60" x2="59" y2="46" stroke="#FFD54F" stroke-width="1" />
                <!-- Drumming arms with cane stick (Doluwa Mari) -->
                <path d="M 28,34 Q 16,42 20,52" stroke="#F5D0A9" stroke-width="3" fill="none" stroke-linecap="round" />
                <line x1="20" y1="52" x2="22" y2="54" stroke="#8D6E63" stroke-width="2.5" />
                <path d="M 52,34 Q 66,42 60,52" stroke="#F5D0A9" stroke-width="3" fill="none" stroke-linecap="round" />
              </g>
            </svg>
          </div>
          <div class="figure-name">বিহু ঢুলীয়া (Dhol Drummer)</div>
          <div class="figure-desc">পাগুৰী আৰু খৰমকীয়া ঢোলৰ চাপৰ</div>
        </div>

        <!-- 3. Assamese Pepa Horn Player (মহৰ শিঙৰ পেঁপা) -->
        <div class="cultural-figure-card">
          <div class="figure-svg-container">
            <svg viewBox="0 0 84 124" style="width: 78px; height: 118px;">
              <!-- Head & Gamusa -->
              <circle cx="36" cy="22" r="8" fill="#F5D0A9" />
              <path d="M 28,16 Q 36,12 44,16" stroke="#D32F2F" stroke-width="2.5" fill="none" />
              <!-- White Kurta -->
              <path d="M 28,30 L 46,30 L 48,72 L 26,72 Z" fill="#FDFEFE" stroke="#B0BEC5" stroke-width="1" />
              <rect x="27" y="52" width="20" height="5" fill="#D32F2F" />

              <!-- Authentic Buffalo Horn Pepa (ম’হৰ শিঙৰ পেঁপা) with Red Tassels -->
              <g class="pepa-blow-tilt">
                <!-- Bamboo mouthpiece (Thuka) -->
                <line x1="36" y1="26" x2="48" y2="34" stroke="#D7CCC8" stroke-width="3" />
                <!-- Curved Horn body -->
                <path d="M 48,34 Q 64,44 68,60 Q 64,56 50,40 Z" fill="#212121" stroke="#37474F" stroke-width="1.2" />
                <!-- Horn Bell Opening with brass rings -->
                <ellipse cx="68" cy="60" rx="6" ry="3.5" fill="#FFE082" stroke="#212121" stroke-width="1" />
                <!-- Red fringe tassels dangling -->
                <line x1="68" y1="63" x2="68" y2="76" stroke="#D32F2F" stroke-width="1.8" />
                <line x1="71" y1="62" x2="73" y2="74" stroke="#D32F2F" stroke-width="1.5" />
                <!-- Player hands holding pepa -->
                <circle cx="44" cy="32" r="2.5" fill="#F5D0A9" />
                <circle cx="52" cy="38" r="2.5" fill="#F5D0A9" />
              </g>
              <!-- Lower body -->
              <path d="M 28,72 L 32,104 L 42,104 L 46,72 Z" fill="#ECEFF1" />
            </svg>
          </div>
          <div class="figure-name">পেঁপা বাদক (Pepa Player)</div>
          <div class="figure-desc">ম’হৰ শিঙৰ সুৰীয়া পেঁপা আৰু সুৰ</div>
        </div>

        <!-- 4. Bodo Bagurumba Butterfly Dancer (বড়ো বাগৰুম্বা) -->
        <div class="cultural-figure-card">
          <div class="figure-svg-container">
            <svg viewBox="0 0 84 124" style="width: 78px; height: 118px;">
              <!-- Head -->
              <circle cx="42" cy="22" r="8" fill="#F5D0A9" />
              <circle cx="42" cy="14" r="7.5" fill="#1A1A1A" />
              
              <!-- Bodo Dokhna Skirt & Torso -->
              <g class="bodo-dancer-body">
                <!-- Yellow Dokhna with tribal motifs -->
                <path d="M 32,30 L 52,30 L 57,100 L 27,100 Z" fill="#FBC02D" stroke="#F57F17" stroke-width="1.2" />
                <!-- Green Decorative Stripes (Agor) -->
                <line x1="28" y1="86" x2="56" y2="86" stroke="#2E7D32" stroke-width="3" />
                <line x1="30" y1="92" x2="54" y2="92" stroke="#D32F2F" stroke-width="2" />
                <!-- Feet -->
                <ellipse cx="35" cy="103" rx="4.5" ry="2.5" fill="#F5D0A9" />
                <ellipse cx="49" cy="103" rx="4.5" ry="2.5" fill="#F5D0A9" />
              </g>

              <!-- Fluttering Green Jwmgra Scarf / Butterfly Arms -->
              <g class="bodo-wing-arms">
                <path d="M 10,38 Q 42,22 74,38 Q 80,58 70,52 Q 42,40 14,52 Z" fill="#2E7D32" stroke="#81C784" stroke-width="1.2" />
                <!-- Hand Tips -->
                <circle cx="10" cy="38" r="3" fill="#F5D0A9" />
                <circle cx="74" cy="38" r="3" fill="#F5D0A9" />
              </g>
            </svg>
          </div>
          <div class="figure-name">বাগৰুম্বা (Bodo Dance)</div>
          <div class="figure-desc">পখিলা নৃত্য আৰু হালধীয়া দখনা</div>
        </div>

      </aside>
    `;
  }

  // -------------------------------------------------------------
  // 3. RIGHT CULTURAL PAVILION (FLANKING THE LOOM ON RIGHT)
  // -------------------------------------------------------------
  renderRightPavilion() {
    return `
      <aside class="cultural-pavilion" role="region" aria-label="Northeast Indian Cultural Pavilion - Right Flank">
        <div class="pavilion-header">
          🌸 উত্তৰ-পূবৰ লোকশিল্প (NER Traditions)
        </div>

        <!-- 1. Manipuri Classical Raas Dancer (মণিপুৰী ৰাস নৃত্য) -->
        <div class="cultural-figure-card">
          <div class="figure-svg-container">
            <svg viewBox="0 0 84 124" style="width: 78px; height: 118px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
              <!-- Translucent Innaphi Veil covering head -->
              <path d="M 28,14 Q 42,4 56,14 L 60,40 Q 42,32 24,40 Z" fill="rgba(255,255,255,0.65)" stroke="#FFF" stroke-width="0.8" />
              <circle cx="42" cy="22" r="8" fill="#F5D0A9" />
              <circle cx="42" cy="14" r="5" fill="#FFD54F" /> <!-- Mukut Crown -->

              <!-- Cylindrical Embroidered Potloi Skirt -->
              <g class="manipuri-dancer-body">
                <path d="M 34,30 L 50,30 L 48,46 L 36,46 Z" fill="#1565C0" />
                <!-- Wavy White Poswan Peplum -->
                <path d="M 30,46 Q 42,54 54,46 L 58,58 Q 42,64 26,58 Z" fill="#FFFFFF" stroke="#FFD54F" stroke-width="1.2" />
                <!-- Stiff Cylindrical Potloi Skirt with Mirrors -->
                <path d="M 26,58 L 58,58 L 58,102 L 26,102 Z" fill="#2E7D32" stroke="#FFD54F" stroke-width="2" />
                <!-- Gold embroidery rings & mirror sequins (Aina) -->
                <line x1="26" y1="92" x2="58" y2="92" stroke="#FFD54F" stroke-width="3" />
                <circle cx="34" cy="74" r="2.5" fill="#FFFFFF" stroke="#FFD54F" stroke-width="1" />
                <circle cx="42" cy="74" r="2.5" fill="#FFFFFF" stroke="#FFD54F" stroke-width="1" />
                <circle cx="50" cy="74" r="2.5" fill="#FFFFFF" stroke="#FFD54F" stroke-width="1" />
                <circle cx="38" cy="84" r="2.5" fill="#FFFFFF" stroke="#FFD54F" stroke-width="1" />
                <circle cx="46" cy="84" r="2.5" fill="#FFFFFF" stroke="#FFD54F" stroke-width="1" />
              </g>

              <!-- Gentle Classical Lyrical Arms -->
              <path d="M 36,32 Q 22,42 26,52" fill="none" stroke="#F5D0A9" stroke-width="3.2" stroke-linecap="round" />
              <path d="M 48,32 Q 62,42 58,52" fill="none" stroke="#F5D0A9" stroke-width="3.2" stroke-linecap="round" />
            </svg>
          </div>
          <div class="figure-name">মণিপুৰী ৰাস (Manipuri Raas)</div>
          <div class="figure-desc">পটলৈ সাজ, ইনফি ওৰণি আৰু শান্ত সুৰ</div>
        </div>

        <!-- 2. Naga Cultural Warrior Dancer (নাগা নৃত্য) -->
        <div class="cultural-figure-card">
          <div class="figure-svg-container">
            <svg viewBox="0 0 84 124" style="width: 78px; height: 118px;">
              <!-- Hornbill Feather Headband -->
              <path d="M 40,16 L 38,2 L 42,2 Z" fill="#FFFFFF" stroke="#111" stroke-width="0.8" />
              <rect x="38" y="6" width="4" height="4" fill="#111" />
              <!-- Head & Warrior Mask -->
              <circle cx="42" cy="24" r="8" fill="#E0BB95" />
              <rect x="34" y="18" width="16" height="4" fill="#C62828" />

              <!-- Naga Warrior Body with Striped Shawl (Tsungkotepsu) -->
              <g class="naga-dancer-body">
                <path d="M 30,32 L 54,32 L 56,92 L 28,92 Z" fill="#C62828" stroke="#111" stroke-width="1.2" />
                <!-- Black & White Tribal Bands -->
                <rect x="29" y="44" width="26" height="6" fill="#111" />
                <rect x="29" y="50" width="26" height="4" fill="#FFF" />
                <rect x="29" y="74" width="26" height="6" fill="#111" />
                <!-- Carnelian Bead Necklace -->
                <path d="M 36,33 Q 42,40 48,33" stroke="#FF8F00" stroke-width="2.5" fill="none" />
                <!-- Cane Leggings (Khaps) -->
                <rect x="32" y="93" width="7" height="12" fill="#E0BB95" stroke="#C62828" stroke-width="1" />
                <rect x="45" y="93" width="7" height="12" fill="#E0BB95" stroke="#C62828" stroke-width="1" />
              </g>

              <!-- Ceremonial Spear (Animated Tilt) -->
              <g class="naga-spear-staff">
                <line x1="64" y1="12" x2="64" y2="108" stroke="#5D4037" stroke-width="2.5" />
                <polygon points="64,4 60,14 68,14" fill="#ECEFF1" stroke="#37474F" stroke-width="1" />
                <!-- Red Hair Tuft on Spear -->
                <circle cx="64" cy="18" r="3.5" fill="#D32F2F" />
              </g>
            </svg>
          </div>
          <div class="figure-name">নাগা নৃত্য (Naga Warrior)</div>
          <div class="figure-desc">ঐতিহ্যবাহী চাং চাদৰ আৰু সুন্দৰ সাজ</div>
        </div>

        <!-- 3. Assam Tea Garden Plucker (চাহ বাগিচাৰ শ্ৰমিক) -->
        <div class="cultural-figure-card">
          <div class="figure-svg-container">
            <svg viewBox="0 0 84 124" style="width: 78px; height: 118px;">
              <!-- Conical Bamboo Jaapi Sun Hat -->
              <polygon points="42,10 20,24 64,24" fill="#D7CCC8" stroke="#8D6E63" stroke-width="1.2" />
              <polygon points="42,12 36,20 48,20" fill="#D32F2F" /> <!-- Red Jaapi motif -->
              <!-- Head -->
              <circle cx="42" cy="28" r="7.5" fill="#F5D0A9" />

              <!-- Cotton Saree / Mekhela -->
              <path d="M 32,36 L 52,36 L 55,100 L 29,100 Z" fill="#00897B" stroke="#004D40" stroke-width="1.2" />
              <line x1="30" y1="88" x2="54" y2="88" stroke="#FFE082" stroke-width="2.5" />

              <!-- Woven Cane Back Basket (Japa / থোপা) -->
              <path d="M 52,38 L 68,44 L 64,82 L 48,74 Z" fill="#8D6E63" stroke="#4E342E" stroke-width="1.5" />
              <line x1="52" y1="38" x2="64" y2="82" stroke="#4E342E" stroke-width="1" stroke-dasharray="2,2" />
              <!-- Green Tea Leaves poking out of basket -->
              <circle cx="60" cy="42" r="4" fill="#4CAF50" />
              <circle cx="66" cy="45" r="3.5" fill="#81C784" />

              <!-- Animated Plucking Hands -->
              <g class="tea-plucker-hands">
                <path d="M 34,40 Q 22,50 26,62" fill="none" stroke="#F5D0A9" stroke-width="3" stroke-linecap="round" />
                <path d="M 50,40 Q 38,52 34,64" fill="none" stroke="#F5D0A9" stroke-width="3" stroke-linecap="round" />
                <!-- Tender 2 leaves and a bud (দুটি পাত এটি কুঁহি) -->
                <path d="M 26,62 Q 22,60 20,64" stroke="#4CAF50" stroke-width="2.5" fill="none" />
                <path d="M 34,64 Q 30,62 28,66" stroke="#81C784" stroke-width="2.5" fill="none" />
              </g>
            </svg>
          </div>
          <div class="figure-name">চাহ শ্ৰমিক (Tea Plucker)</div>
          <div class="figure-desc">জাপি, পিঠিৰ জপা আৰু দুটি পাত এটি কুঁহি</div>
        </div>

        <!-- 4. Living Root Bridge & Kaziranga Rhino Emblem -->
        <div class="cultural-figure-card">
          <div class="figure-svg-container">
            <svg viewBox="0 0 84 124" style="width: 78px; height: 118px;">
              <!-- Khasi Hills Living Root Bridge across stream -->
              <path d="M 4,68 Q 42,48 80,68" stroke="#5D4037" stroke-width="6" fill="none" stroke-linecap="round" />
              <path d="M 12,66 Q 42,54 72,66" stroke="#33691E" stroke-width="3" fill="none" />
              <!-- Hanging Aerial Root tendrils -->
              <line x1="28" y1="62" x2="28" y2="82" stroke="#5D4037" stroke-width="1.8" />
              <line x1="42" y1="58" x2="42" y2="84" stroke="#5D4037" stroke-width="1.8" />
              <line x1="56" y1="62" x2="56" y2="82" stroke="#5D4037" stroke-width="1.8" />
              <!-- Stream Water underneath -->
              <rect x="4" y="86" width="76" height="18" fill="#00838F" rx="4" />
              <!-- Kaziranga Rhino Silhouette grazing -->
              <g transform="translate(18, 20) scale(0.65)">
                <!-- Rhino Body -->
                <ellipse cx="44" cy="40" rx="26" ry="16" fill="#78909C" stroke="#37474F" stroke-width="1.5" />
                <!-- Armor plate fold lines -->
                <path d="M 34,26 Q 36,40 34,54" stroke="#37474F" stroke-width="2" fill="none" />
                <path d="M 52,26 Q 54,40 52,54" stroke="#37474F" stroke-width="2" fill="none" />
                <!-- Head & Snout -->
                <ellipse cx="18" cy="38" rx="12" ry="9" fill="#78909C" stroke="#37474F" stroke-width="1.5" />
                <!-- Single Horn on Snout -->
                <polygon points="10,32 6,20 14,30" fill="#ECEFF1" stroke="#37474F" stroke-width="1.2" />
                <!-- Ears -->
                <polygon points="24,30 26,22 28,30" fill="#78909C" />
                <!-- Legs -->
                <rect x="26" y="52" width="7" height="14" fill="#607D8B" rx="2" />
                <rect x="52" y="52" width="7" height="14" fill="#607D8B" rx="2" />
              </g>
            </svg>
          </div>
          <div class="figure-name">শিপাৰ দলং আৰু গঁড়</div>
          <div class="figure-desc">মেঘালয়ৰ জীৱন্ত দলং আৰু কাজিৰঙা</div>
        </div>

      </aside>
    `;
  }

  // -------------------------------------------------------------
  // 4. HANDCRAFTED WOODEN WEAVING LOOM (CENTER STAGE)
  // -------------------------------------------------------------
  renderCenterLoomStage(innerHtml, title = 'DELTA NEURONS • হস্ততাঁতৰ পাট', subtitle = 'Traditional Northeast Weaving & Handloom Heritage') {
    return `
      <section class="wooden-loom-center-stage" role="region" aria-label="Handcrafted Wooden Weaving Loom Stage">
        <!-- 4 Authentic Brass Corner Brackets (*পিতলৰ চুক*) -->
        <div class="brass-corner brass-corner-tl" aria-hidden="true"></div>
        <div class="brass-corner brass-corner-tr" aria-hidden="true"></div>
        <div class="brass-corner brass-corner-bl" aria-hidden="true"></div>
        <div class="brass-corner brass-corner-br" aria-hidden="true"></div>

        <!-- Vertical Silk Warp Threads with Semi-Transparency (দীঘ সূতা) -->
        <div class="loom-warp-canvas-backdrop" aria-hidden="true"></div>

        <!-- Top Wooden Loom Beam (তুলা / Tula) -->
        <div class="loom-beam-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.5rem;">🪷</span>
            <span style="color: #FFE6B0; font-weight: 800; font-size: 0.88rem; letter-spacing: 0.1em; text-transform: uppercase;">
              ${title}
            </span>
          </div>
          <span style="color: rgba(255,255,255,0.85); font-size: 0.8rem; font-weight: 700;">
            ${subtitle}
          </span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.5rem;">👒</span>
          </div>
        </div>

        <!-- Center Interactive Game Board inside Loom -->
        <div style="position: relative; z-index: 4;">
          ${innerHtml}
        </div>

        <!-- Bottom Wooden Cloth Roller Beam (গোৰা-মোৰা / Gura-mora) -->
        <div class="loom-beam-bar loom-beam-bottom">
          <span style="color: rgba(255,235,190,0.88); font-size: 0.78rem; font-weight: 700;">
            🧶 100% পৰম্পৰাগত হস্ততাঁত পদ্ধতি (Northeast Handloom Heritage)
          </span>
          <span style="color: rgba(255,255,255,0.75); font-size: 0.78rem; font-weight: 600;">
            তাঁতৰ শাল • মাকু • মহুৰা • ফুল তোলা
          </span>
        </div>
      </section>
    `;
  }

  // -------------------------------------------------------------
  // 5. FULL-SCREEN THEATER MOUNT (100% SCREEN TAKEOVER)
  // -------------------------------------------------------------
  renderFullscreenTheater({
    innerHtml,
    title = 'মনৰ শক্তি আৰু স্মৃতিৰ অনুশীলন',
    subtitle = 'Northeast Indian Handloom & Cognitive Therapy',
    containerId = 'game-arena-content'
  }) {
    // 1. Play Zoom Chime Audio Feedback
    if (window.VoiceNER && typeof window.VoiceNER.playZoomChime === 'function') {
      window.VoiceNER.playZoomChime();
    }

    // 2. Build or obtain Fullscreen Theater Overlay
    let theaterEl = document.getElementById('fullscreen-game-theater');
    if (!theaterEl) {
      theaterEl = document.createElement('div');
      theaterEl.id = 'fullscreen-game-theater';
      theaterEl.className = 'fullscreen-game-theater';
      document.body.appendChild(theaterEl);
    }

    theaterEl.innerHTML = `
      <!-- Sticky Top Theater Navigation Bar -->
      <header class="theater-top-bar" role="banner">
        <button class="theater-btn-back" id="btn-theater-exit" title="Return to Dashboard (প্ৰস্থান কৰক)">
          <span>←</span>
          <span>উভতি যাওক (Back to Menu)</span>
        </button>

        <div class="theater-title-block">
          <div class="theater-main-title">${title}</div>
          <div class="theater-sub-title">${subtitle}</div>
        </div>

        <div class="theater-actions-group">
          <div class="gentle-timer" id="game-timer-display-fs" style="font-size: 0.95rem; padding: 6px 16px;">
            ⏱️ ${this.timerSeconds}s
          </div>
          <button class="theater-action-btn" id="btn-theater-hint">
            <span>💡</span>
            <span>সহায় সংকেত (Hint)</span>
          </button>
          <button class="theater-action-btn" id="btn-theater-speak">
            <span>🔊</span>
            <span>শুনি শুনক (Speak)</span>
          </button>
          <button class="theater-action-btn" id="btn-theater-motion">
            <span>🎭</span>
            <span>সাংস্কৃতিক দৃশ্য (Motion)</span>
          </button>
        </div>
      </header>

      <!-- Panoramic Theater Stage with Living Scenery & 3-Column Flanks -->
      <main class="theater-stage-panoramic" role="main">
        ${this.renderBackgroundScenery()}

        <div class="theater-stage-grid">
          <!-- Left Flank: Assamese Cultural Pavilion -->
          ${this.renderLeftPavilion()}

          <!-- Center Flank: Handcrafted Teakwood Loom -->
          ${this.renderCenterLoomStage(innerHtml, title, subtitle)}

          <!-- Right Flank: Northeast Heritage Pavilion -->
          ${this.renderRightPavilion()}
        </div>
      </main>
    `;

    // Also populate standard container as fallback
    const inlineContainer = document.getElementById(containerId);
    if (inlineContainer) {
      inlineContainer.innerHTML = `
        <div style="text-align: center; padding: 24px;">
          <button class="pill-btn active" style="font-size: 1.1rem; padding: 14px 28px;" onclick="window.GameSuite.reopenFullscreenTheater()">
            🔍 পূৰ্ণ স্ক্ৰীণ খেল খোলোঁক (Open Fullscreen Game Theater)
          </button>
        </div>
      `;
    }

    // Attach Top Bar Controls
    const exitBtn = theaterEl.querySelector('#btn-theater-exit');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        this.exitFullscreenTheater();
      });
    }

    const hintBtn = theaterEl.querySelector('#btn-theater-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        if (window.VoiceNER) {
          window.VoiceNER.speak(window.VoiceNER.t('hintPrompt'));
        }
      });
    }

    const speakBtn = theaterEl.querySelector('#btn-theater-speak');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        if (window.VoiceNER) {
          window.VoiceNER.speak(`${title}. ${subtitle}`);
        }
      });
    }

    const motionBtn = theaterEl.querySelector('#btn-theater-motion');
    if (motionBtn) {
      let isMotionActive = !document.body.classList.contains('cultural-animations-paused');
      motionBtn.addEventListener('click', () => {
        isMotionActive = !isMotionActive;
        document.body.classList.toggle('cultural-animations-paused', !isMotionActive);
        motionBtn.classList.toggle('active', isMotionActive);
        motionBtn.innerHTML = isMotionActive
          ? '<span>🎭</span><span>সাংস্কৃতিক দৃশ্য (Motion: ON)</span>'
          : '<span>⏸️</span><span>স্নিগ্ধ গতি (Motion: PAUSED)</span>';
        if (window.VoiceNER) {
          window.VoiceNER.speak(isMotionActive ? 'সাংস্কৃতিক দৃশ্য সক্ৰিয় কৰা হৈছে' : 'সাংস্কৃতিক দৃশ্য বিৰাম দিয়া হৈছে');
        }
      });
    }

    return theaterEl;
  }

  // -------------------------------------------------------------
  // 6. EXIT FULLSCREEN THEATER
  // -------------------------------------------------------------
  exitFullscreenTheater() {
    const theaterEl = document.getElementById('fullscreen-game-theater');
    if (theaterEl) {
      theaterEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      theaterEl.style.opacity = '0';
      theaterEl.style.transform = 'scale(0.96)';
      setTimeout(() => {
        if (theaterEl && theaterEl.parentNode) {
          theaterEl.parentNode.removeChild(theaterEl);
        }
      }, 300);
    }
    this.stopTimer();
    if (typeof window.showAppView === 'function') {
      window.showAppView('view-dashboard');
    }
  }

  // -------------------------------------------------------------
  // AUTHENTIC WEAVING BOAT SHUTTLE SVG (তাঁতৰ মাকু - Maku)
  // -------------------------------------------------------------
  getShuttleSvg(threadColor = '#d94337') {
    return `
      <svg viewBox="0 0 160 56" class="weaving-shuttle-svg" style="width: 100%; height: 100%; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.45));">
        <defs>
          <linearGradient id="shuttleWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#C68A4C" />
            <stop offset="30%" stop-color="#915B28" />
            <stop offset="70%" stop-color="#673C14" />
            <stop offset="100%" stop-color="#462409" />
          </linearGradient>
          <linearGradient id="brassTipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FFE57F" />
            <stop offset="50%" stop-color="#FFC107" />
            <stop offset="100%" stop-color="#B78103" />
          </linearGradient>
        </defs>
        <!-- Wooden Boat Shuttle Hull (তাঁতৰ মাকু) -->
        <path d="M 4,28 Q 28,6 80,6 Q 132,6 156,28 Q 132,50 80,50 Q 28,50 4,28 Z" fill="url(#shuttleWoodGrad)" stroke="#2B1506" stroke-width="2.5" />
        <!-- Left Brass Pointed Tip -->
        <polygon points="4,28 18,18 18,38" fill="url(#brassTipGrad)" stroke="#7F5500" stroke-width="1.2" />
        <!-- Right Brass Pointed Tip -->
        <polygon points="156,28 142,18 142,38" fill="url(#brassTipGrad)" stroke="#7F5500" stroke-width="1.2" />
        <!-- Center Spindle Cavity / Bobbin Well -->
        <ellipse cx="80" cy="28" rx="42" ry="12" fill="#201105" stroke="#48270F" stroke-width="1.5" />
        <!-- Wooden Spindle Spool Pin -->
        <line x1="36" y1="28" x2="124" y2="28" stroke="#D7CCC8" stroke-width="3" stroke-linecap="round" />
        <!-- Silk Thread Bobbin / Pirn -->
        <rect class="shuttle-bobbin-spool" x="48" y="20" width="64" height="16" rx="8" fill="${threadColor}" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" />
        <!-- Thread Eyelet on Side of Shuttle -->
        <circle cx="80" cy="46" r="3.5" fill="#FFE082" stroke="#5D4037" stroke-width="1" />
        <!-- Silk Thread escaping through eyelet -->
        <path d="M 80,28 Q 80,42 80,46 Q 92,54 122,52" fill="none" stroke="${threadColor}" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    `;
  }

  // -------------------------------------------------------------
  // DEMENTIA GAME LEVELS (IN FULLSCREEN THEATER)
  // -------------------------------------------------------------
  startLevelOneGame(containerId) {
    const levelTitle = 'Early Stage Dementia Games';
    const cards = [
      { name: 'Gamusa Weave Match', subtitle: 'Colour recognition through Assamese and Northeast textile patterns', icon: '🧵' },
      { name: 'Memory Grid Challenge', subtitle: 'Recall native animals and plants on a grid', icon: '🧠' },
      { name: 'Pinball Recall', subtitle: 'Solve tribal folktale-based rule tasks', icon: '🧩' },
      { name: 'NeuroRacer', subtitle: 'Drive through hilly Northeast roads', icon: '🚗' },
      { name: 'Smart Ageing', subtitle: 'Complete daily life tasks in a cultural home scene', icon: '🏡' }
    ];

    const innerHtml = `
      <div class="reminiscence-arena">
        <div class="folktale-parchment-card">
          <div style="font-size: 3rem; text-align: center; margin-bottom: 8px;">🧠</div>
          <h3 style="font-size: var(--font-h3); color: #FFE082; text-align: center; margin-bottom: 12px;">${levelTitle}</h3>
          <p class="folktale-story-text">This level focuses on mild cognitive screening and enhancement through reaction, short-term memory, attention, and daily-life activity tasks tailored to the Northeast cultural context.</p>
        </div>
        <div class="reminiscence-options-grid" style="margin-top: 18px;">
          ${cards.map((card) => `
            <button class="reminiscence-option-btn level-game-card-btn" data-card="${card.name}" style="justify-content: flex-start; gap: 12px;">
              <span style="font-size: 1.8rem;">${card.icon}</span>
              <span style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px;">
                <strong>${card.name}</strong>
                <small style="opacity: 0.8;">${card.subtitle}</small>
              </span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'Level 1 • Early Stage Dementia',
      subtitle: 'Mild Cognitive Screening & Handloom Tasks',
      containerId
    });

    theater.querySelectorAll('.level-game-card-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.card;
        window.VoiceNER.speak(title);
        if (title === 'Gamusa Weave Match') {
          this.startWeavingGame(containerId);
        } else {
          this.startMemoryGame(containerId);
        }
      });
    });

    this.startTimer();
    window.VoiceNER.speak(levelTitle);
  }

  startLevelTwoGame(containerId) {
    const levelTitle = 'Middle Stage Dementia Games';
    const cards = [
      { name: 'Executive Timed Target Game', subtitle: 'Tap regional harvest items before they fall', icon: '🎯' },
      { name: 'Point-Click Cooking Game', subtitle: 'Prepare Assam tea or bamboo rice in sequence', icon: '🍲' },
      { name: 'Planting Game', subtitle: 'Adjust monsoon weather for indigenous crops', icon: '🌱' },
      { name: 'Pet-type Robot', subtitle: 'Interact with a Hoolock Gibbon-style companion', icon: '🤖' },
      { name: 'Socially Assistive Robot', subtitle: 'Practice memory and conversation in Assamese / Mizo', icon: '🗣️' },
      { name: 'WiiFit Balance', subtitle: 'Cross a virtual root bridge with balance control', icon: '⚖️' }
    ];

    const innerHtml = `
      <div class="reminiscence-arena">
        <div class="folktale-parchment-card">
          <div style="font-size: 3rem; text-align: center; margin-bottom: 8px;">🎯</div>
          <h3 style="font-size: var(--font-h3); color: #FFE082; text-align: center; margin-bottom: 12px;">${levelTitle}</h3>
          <p class="folktale-story-text">This stage emphasizes structured, guided cognitive and physical rehabilitation with repetition, assistive technology, and culturally familiar tasks for patients with moderate dementia.</p>
        </div>
        <div class="reminiscence-options-grid" style="margin-top: 18px;">
          ${cards.map((card) => `
            <button class="reminiscence-option-btn level-game-card-btn" data-card="${card.name}" style="justify-content: flex-start; gap: 12px;">
              <span style="font-size: 1.8rem;">${card.icon}</span>
              <span style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px;">
                <strong>${card.name}</strong>
                <small style="opacity: 0.8;">${card.subtitle}</small>
              </span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'Level 2 • Middle Stage Dementia',
      subtitle: 'Guided Rehabilitation & Cultural Interaction',
      containerId
    });

    theater.querySelectorAll('.level-game-card-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.card;
        window.VoiceNER.speak(title);
        this.startSortingGame(containerId);
      });
    });

    this.startTimer();
    window.VoiceNER.speak(levelTitle);
  }

  startLevelThreeGame(containerId) {
    const levelTitle = 'Late Stage Dementia Games';
    const cards = [
      { name: 'Passive Sensory Comfort', subtitle: 'Monsoon sounds, folk music, and familiar visual scenes', icon: '🎶' },
      { name: 'Cultural Memory Stimulation', subtitle: 'Non-interactive reminiscence with local images and rituals', icon: '🖼️' },
      { name: 'Ambient Therapy Room', subtitle: 'Low-stimulation environment for relaxation and comfort', icon: '🌿' },
      { name: 'Soft Reminiscence Screensaver', subtitle: 'Familiar mountains, tea gardens, festivals and family scenes', icon: '🏞️' }
    ];

    const innerHtml = `
      <div class="reminiscence-arena">
        <div class="folktale-parchment-card">
          <div style="font-size: 3rem; text-align: center; margin-bottom: 8px;">🌙</div>
          <h3 style="font-size: var(--font-h3); color: #FFE082; text-align: center; margin-bottom: 12px;">${levelTitle}</h3>
          <p class="folktale-story-text">At this stage, interactive gameplay is replaced by passive sensory therapy, comforting soundscapes, and culturally familiar visual stimulation to reduce agitation and provide emotional steadiness.</p>
        </div>
        <div class="reminiscence-options-grid" style="margin-top: 18px;">
          ${cards.map((card) => `
            <button class="reminiscence-option-btn level-game-card-btn" data-card="${card.name}" style="justify-content: flex-start; gap: 12px;">
              <span style="font-size: 1.8rem;">${card.icon}</span>
              <span style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px;">
                <strong>${card.name}</strong>
                <small style="opacity: 0.8;">${card.subtitle}</small>
              </span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'Level 3 • Late Stage Dementia',
      subtitle: 'Passive Sensory Comfort & Calming Therapy',
      containerId
    });

    theater.querySelectorAll('.level-game-card-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.card;
        window.VoiceNER.speak(title);
        this.handleGameComplete(`${levelTitle} • ${title}`);
      });
    });

    this.startTimer();
    window.VoiceNER.speak(levelTitle);
  }

  // -------------------------------------------------------------
  // GAME 1: WEAVING MATCH (REALISTIC MOTEUR & SHUTTLE DYNAMICS)
  // -------------------------------------------------------------
  startWeavingGame(containerId = 'game-arena-content') {
    const patterns = {
      gamusa: {
        label: 'অসমীয়া গামোচা (Assamese Gamusa)',
        subtitle: 'বগা কাপোৰত ৰঙা ফুলাম ফুল আৰু পাৰি',
        accent: '#d94a3d',
        sequence: ['RED', 'WHITE', 'RED', 'WHITE', 'RED'],
        reference: ['RED', 'WHITE', 'RED', 'WHITE', 'RED']
      },
      puan: {
        label: 'মিজো পুৱান (Mizo Puan)',
        subtitle: 'সেউজীয়া আৰু ৰঙা পৰম্পৰাগত আঁঁচ',
        accent: '#1d7f65',
        sequence: ['GREEN', 'RED', 'GREEN', 'RED', 'GREEN'],
        reference: ['GREEN', 'RED', 'GREEN', 'RED', 'GREEN']
      },
      phanek: {
        label: 'মণিপুৰী ফানেক (Manipuri Phanek)',
        subtitle: 'গোলাপী আৰু ক’লা সূতাৰ মনোমোহা পাৰি',
        accent: '#d870b7',
        sequence: ['PINK', 'BLACK', 'PINK', 'BLACK', 'PINK'],
        reference: ['PINK', 'BLACK', 'PINK', 'BLACK', 'PINK']
      },
      aronai: {
        label: 'বড়ো আৰ’নাই (Bodo Aronai)',
        subtitle: 'হালধীয়া আৰু ৰঙা সূতাৰ বৰ্ণিল ফুল',
        accent: '#E6A15C',
        sequence: ['YELLOW', 'RED', 'YELLOW', 'RED', 'YELLOW'],
        reference: ['YELLOW', 'RED', 'YELLOW', 'RED', 'YELLOW']
      }
    };

    const colorMap = {
      RED: { value: '#d94337', labelAs: 'ৰঙা (Red)' },
      WHITE: { value: '#f3f2ef', labelAs: 'বগা (White)' },
      GREEN: { value: '#219c5a', labelAs: 'সেউজীয়া (Green)' },
      PINK: { value: '#e77ab7', labelAs: 'গোলাপী (Pink)' },
      BLACK: { value: '#1f1f1f', labelAs: 'ক’লা (Black)' },
      YELLOW: { value: '#fbc02d', labelAs: 'হালধীয়া (Yellow)' }
    };

    const state = {
      activePattern: 'gamusa',
      sequenceIndex: 0,
      wovenColors: [],
      isShooting: false
    };

    const renderLoomCloth = () => {
      const pattern = patterns[state.activePattern];
      const rows = Array.from({ length: 8 }, (_, rowIndex) => {
        const isWoven = rowIndex < state.wovenColors.length;
        const colorKey = isWoven ? state.wovenColors[rowIndex] : null;
        const baseColor = colorKey ? colorMap[colorKey].value : '#2a1a0e';
        const isLatest = rowIndex === state.wovenColors.length - 1;

        return `
          <div class="${isLatest ? 'loom-row-pressed' : ''}" style="
            height: 36px; border-radius: 8px; margin-bottom: 6px; background: ${baseColor};
            border: ${isWoven ? '2px solid rgba(255,255,255,0.45)' : '1px dashed rgba(255,255,255,0.12)'};
            box-shadow: ${isWoven ? 'inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.3)' : 'none'};
            display: flex; align-items: center; justify-content: center; color: ${colorKey === 'WHITE' ? '#222' : '#FFF'};
            font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em;
          ">
            ${isWoven ? `🧵 ${colorKey} THREAD WOVEN` : `<span style="opacity: 0.35;">তাঁতৰ দীঘ সূতা (Warp Thread #${rowIndex + 1})</span>`}
          </div>
        `;
      }).join('');

      const referenceStrip = pattern.reference.map((item) => `
        <div style="display:inline-flex; align-items:center; justify-content:center; width: 44px; height: 26px; background: ${colorMap[item].value}; border-radius: 6px; border: 2px solid #FFF; margin: 0 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.35); color: ${item === 'WHITE' ? '#111' : '#FFF'}; font-size: 0.65rem; font-weight: 800;">
          ${item}
        </div>
      `).join('');

      const nextExpected = pattern.sequence[state.sequenceIndex];
      const statusText = state.sequenceIndex >= pattern.sequence.length
        ? '🎉 কাপোৰ বৈ সম্পূৰ্ণ হ’ল (PATTERN COMPLETED!)'
        : `👉 পৰৱৰ্তী মহুৰা সূতা: ${nextExpected} (${colorMap[nextExpected]?.labelAs || nextExpected})`;

      return `
        <!-- Reference Target Banner -->
        <div style="
          background: rgba(0, 0, 0, 0.45); border-radius: 16px; padding: 14px 18px; margin-bottom: 16px;
          border: 2px solid rgba(255, 215, 140, 0.3); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        ">
          <div>
            <div style="font-size: 0.85rem; letter-spacing: 0.12em; color: #FFE082; font-weight: 800; text-transform: uppercase;">
              ${pattern.label}
            </div>
            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.85); margin-top: 2px;">
              ${pattern.subtitle}
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 999px;">
            <span style="font-size: 0.75rem; color: #FFE6B0; font-weight: 800; margin-right: 4px;">ফুলৰ আৰ্হি:</span>
            ${referenceStrip}
          </div>
        </div>

        <!-- Interactive Animated Weaving Shuttle Track (তাঁতৰ মাকুৰ বাট) -->
        <div style="background: rgba(25, 12, 5, 0.75); border-radius: 20px; padding: 14px 16px; border: 3px solid rgba(255, 215, 140, 0.35); box-shadow: inset 0 0 20px rgba(0,0,0,0.6); margin-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div style="font-size: 0.8rem; font-weight: 800; color: #FFE6B0; letter-spacing: 0.08em; text-transform: uppercase;">
              🛶 তাঁতৰ মাকু (Weaving Shuttle - Maku Motion)
            </div>
            <div style="font-size: 0.75rem; color: #FFF; background: #B83A2E; padding: 4px 12px; border-radius: 999px; font-weight: 800;">
              ${statusText}
            </div>
          </div>

          <div class="shuttle-track-arena" id="shuttle-track">
            <!-- Trailing Silk Weft Line -->
            <div class="weft-thread-line"></div>

            <!-- The Authentic Boat Shuttle (Maku) -->
            <div class="weaving-shuttle-maku" id="interactive-maku" title="তাঁতৰ মাকু (Weaving Shuttle)">
              ${this.getShuttleSvg(nextExpected ? colorMap[nextExpected].value : '#d94337')}
            </div>
          </div>
        </div>

        <!-- Loom Woven Cloth Area (বৈ থকা কাপোৰ) -->
        <div style="
          background: linear-gradient(180deg, rgba(60,35,18,0.95), rgba(95,55,28,0.9));
          border-radius: 18px; border: 4px solid #2B1609; padding: 16px;
          box-shadow: inset 0 0 0 2px rgba(255,215,140,0.2), 0 14px 24px rgba(0,0,0,0.3);
        ">
          <div style="font-size: 0.75rem; letter-spacing: 0.1em; color: #FFE6B0; font-weight: 800; text-transform: uppercase; margin-bottom: 10px; text-align: center;">
            🧵 শালৰ কাপোৰ (Woven Cloth on Handloom Reed)
          </div>
          ${rows}
        </div>
      `;
    };

    const buildFullViewHtml = () => {
      return `
        <div style="max-width: 900px; margin: 0 auto; color: white;">
          
          <!-- Instructions Header -->
          <div style="
            background: linear-gradient(135deg, rgba(138, 70, 24, 0.9), rgba(74, 38, 14, 0.95));
            border: 2px solid rgba(255, 215, 140, 0.3); border-radius: 18px; padding: 16px 20px; margin-bottom: 18px; text-align: center;
          ">
            <div class="weaving-header-text" style="font-size: 1.15rem; font-weight: 800; color: #FFE082; margin-bottom: 4px;">
              🌸 তাঁত-শালত কাপোৰ বৈ মনৰ আনন্দ লওক (Assamese Handloom Weaving)
            </div>
            <p style="font-size: 0.92rem; color: #FFF; margin: 0; opacity: 0.95;">
              প্ৰথমে আৰ্হিৰ ফুলটো চাওক, তাৰ পিছত তলৰ মহুৰাৰ সূতাৰ ৰং স্পর্শ কৰি মাকু চলাই কাপোৰ বৈ যাওক।
            </p>
          </div>

          <!-- Color Thread Spool Selector Buttons (মহুৰা সূতা বাছক) -->
          <div style="display: flex; justify-content: center; gap: 14px; margin-bottom: 20px; flex-wrap: wrap;">
            ${Object.entries(colorMap).map(([key, color]) => `
              <button class="weaving-color-btn" data-color="${key}" style="
                width: 105px; height: 115px; border: 3px solid rgba(255, 215, 140, 0.3); border-radius: 20px;
                background: linear-gradient(180deg, rgba(50, 30, 15, 0.85), rgba(25, 12, 5, 0.95));
                cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
                box-shadow: 0 8px 18px rgba(0,0,0,0.35); transition: transform 0.2s ease, box-shadow 0.2s ease;
              ">
                <!-- Silk Spool Icon -->
                <div style="
                  width: 50px; height: 50px; border-radius: 50%; background: ${color.value};
                  border: 3px solid #FFF; box-shadow: 0 4px 10px rgba(0,0,0,0.4), inset 0 0 8px rgba(255,255,255,0.4);
                "></div>
                <div style="color: #FFE6B0; font-weight: 800; font-size: 0.82rem; text-align: center; line-height: 1.2;">
                  ${color.labelAs}
                </div>
              </button>
            `).join('')}
          </div>

          <!-- Main Loom Cloth & Shuttle Area -->
          <div class="weaving-loom-panel">${renderLoomCloth()}</div>

          <!-- Pattern Switcher Shelf -->
          <div style="background: rgba(30, 18, 8, 0.7); border-radius: 18px; margin-top: 20px; padding: 16px; border: 2px solid rgba(255, 215, 140, 0.25);">
            <div style="font-size: 0.82rem; letter-spacing: 0.08em; color: #FFE082; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; text-align: center;">
              🎨 কাপোৰৰ আৰ্হি সলনি কৰক (Choose Traditional Pattern)
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
              ${Object.entries(patterns).map(([patternKey, pattern]) => `
                <button class="weaving-pattern-btn" data-pattern="${patternKey}" style="
                  background: linear-gradient(180deg, rgba(60, 36, 18, 0.8), rgba(35, 20, 10, 0.9));
                  border: ${patternKey === state.activePattern ? '3px solid #FFE082' : '2px solid rgba(255,255,255,0.15)'};
                  border-radius: 16px; color: white; padding: 12px 10px; cursor: pointer;
                  box-shadow: ${patternKey === state.activePattern ? '0 8px 20px rgba(255, 224, 130, 0.35)' : 'none'};
                  display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 8px;
                ">
                  <div style="font-weight: 800; font-size: 0.85rem; text-align: center; color: #FFE6B0;">${pattern.label}</div>
                  <div style="font-size: 0.72rem; color: rgba(255,255,255,0.75); text-align: center;">${pattern.subtitle}</div>
                  <div style="width: 100%; padding: 6px; border-radius: 8px; font-weight: 800; font-size: 0.72rem; background: ${patternKey === state.activePattern ? '#C9751E' : 'rgba(255,255,255,0.15)'}; color: white; text-transform: uppercase; text-align: center;">
                    ${patternKey === state.activePattern ? '✓ বৈ থকা হৈছে (Selected)' : 'বাছক (Select)'}
                  </div>
                </button>
              `).join('')}
            </div>
          </div>

        </div>
      `;
    };

    const mountAndBind = () => {
      const theater = this.renderFullscreenTheater({
        innerHtml: buildFullViewHtml(),
        title: 'হস্ততাঁত আৰু মাকুৰ খেল • Weaving Match',
        subtitle: 'Traditional Northeast Handloom & Interactive Shuttle',
        containerId
      });

      // Pattern Selection
      theater.querySelectorAll('.weaving-pattern-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.pattern;
          state.activePattern = key;
          state.sequenceIndex = 0;
          state.wovenColors = [];
          mountAndBind();
          window.VoiceNER.speak(`Selected ${patterns[key].label}`);
        });
      });

      // Color Thread Clicks -> Trigger Authentic Shuttle Shoot Pass
      theater.querySelectorAll('.weaving-color-btn').forEach((btn) => {
        const colorName = btn.dataset.color;
        btn.addEventListener('click', () => {
          if (state.isShooting) return;
          const pattern = patterns[state.activePattern];
          const expected = pattern.sequence[state.sequenceIndex];
          const isCorrect = colorName === expected;

          const shuttleEl = theater.querySelector('#interactive-maku');

          if (isCorrect) {
            state.isShooting = true;

            // 1. Play procedural shuttle swoosh
            if (window.VoiceNER && typeof window.VoiceNER.playLoomSwoosh === 'function') {
              window.VoiceNER.playLoomSwoosh();
            }

            // 2. Animate Shuttle Shoot Across
            if (shuttleEl) {
              shuttleEl.classList.add('shuttle-shooting-active');
              const spool = shuttleEl.querySelector('.shuttle-bobbin-spool');
              if (spool) spool.classList.add('shuttle-bobbin-spinning');
            }

            btn.style.boxShadow = '0 0 0 4px #82FFAA, 0 16px 28px rgba(0,0,0,0.4)';
            btn.style.transform = 'scale(1.08)';

            // 3. Play loom batten clack sound
            setTimeout(() => {
              if (window.VoiceNER && typeof window.VoiceNER.playLoomClack === 'function') {
                window.VoiceNER.playLoomClack();
              }
            }, 300);

            // 4. Update woven cloth & reset shuttle state
            setTimeout(() => {
              state.wovenColors.push(colorName);
              state.sequenceIndex += 1;
              state.isShooting = false;

              const loomPanel = theater.querySelector('.weaving-loom-panel');
              if (loomPanel) {
                loomPanel.innerHTML = renderLoomCloth();
              }

              if (state.sequenceIndex >= pattern.sequence.length) {
                if (window.VoiceNER && typeof window.VoiceNER.playChimeSuccess === 'function') {
                  window.VoiceNER.playChimeSuccess();
                }
                window.VoiceNER.speak(`বৰ সুন্দৰ! আপুনি ${pattern.label} কাপোৰখন সম্পূৰ্ণ কৰিলে।`);
                setTimeout(() => {
                  this.handleGameComplete(pattern.label);
                }, 1200);
              } else {
                window.VoiceNER.speak(`সঠিক! ${colorMap[colorName].labelAs} সূতা বোৱা হ’ল।`);
              }
            }, 550);

          } else {
            // Gentle encouragement
            btn.style.boxShadow = '0 0 0 4px #FF6E6E, 0 16px 28px rgba(0,0,0,0.4)';
            btn.style.transform = 'scale(0.95)';
            if (window.VoiceNER) {
              window.VoiceNER.playSoftTap();
              window.VoiceNER.speak(`একো কথা নাই আইতা/ককা। পৰৱৰ্তী সূতা হ’ব লাগে ${colorMap[expected]?.labelAs || expected}।`);
            }
          }

          setTimeout(() => {
            btn.style.boxShadow = '0 8px 18px rgba(0,0,0,0.35)';
            btn.style.transform = 'none';
          }, 420);
        });
      });
    };

    mountAndBind();
    this.startTimer();
    window.VoiceNER.speak('তাঁতৰ মাকু আৰু কাপোৰ বোৱা খেললৈ স্বাগতম। সূতাৰ ৰং বাছক।');
  }

  // -------------------------------------------------------------
  // GAME 1: SRITI MEL (স্মৃতি মেল - MEMORY MEADOW)
  // -------------------------------------------------------------
  startMemoryGame(containerId = 'game-arena-content') {
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

    const colCount = Math.min(4, Math.ceil(Math.sqrt(cardDeck.length * 1.5)));
    const innerHtml = `
      <div style="max-width: 860px; margin: 0 auto; color: white;">
        <div style="background: rgba(0,0,0,0.4); border-radius: 14px; padding: 12px 18px; margin-bottom: 16px; border: 1.5px solid rgba(255,215,140,0.3); text-align: center;">
          <h3 style="font-size: 1.15rem; color: #FFE082; margin-bottom: 4px;">🌸 স্মৃতি মেল • এযোৰ-এযোৰ চিনাকি প্ৰতীক মিলোৱা খেল</h3>
          <p style="font-size: 0.88rem; color: rgba(255,255,255,0.9); margin: 0;">দুটা কাৰ্ড স্পর্শ কৰি একে ধৰণৰ প্ৰতীকৰ যোৰ বাছক। কোনো খৰখেদা নাই।</p>
        </div>

        <div class="memory-grid" style="grid-template-columns: repeat(${colCount}, 1fr); margin-top: 14px;">
          ${cardDeck.map((card, index) => `
            <div class="memory-card" data-index="${index}" data-id="${card.id}" role="button" tabindex="0" aria-label="${card.nameAs}">
              <div class="memory-card-face memory-card-back">
                <div class="memory-card-back-pattern">🌿</div>
              </div>
              <div class="memory-card-face memory-card-front">
                <div class="card-symbol-icon">${card.icon}</div>
                <div class="card-symbol-name">${card.nameAs}</div>
                <div class="card-symbol-sub">${card.nameEn}</div>
                <button class="mini-speaker-btn" title="Listen" onclick="event.stopPropagation(); window.VoiceNER.speak('${card.nameAs}')">🔊</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'স্মৃতি মেল • Sriti Mel (Memory Meadow)',
      subtitle: 'Northeast Cultural Pair Matching & Memory Recall',
      containerId
    });

    theater.querySelectorAll('.memory-card').forEach((cardEl) => {
      const idx = parseInt(cardEl.dataset.index, 10);
      cardEl.addEventListener('click', () => this.handleCardClick(idx, cardEl));
    });

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
  startAttentionGame(containerId = 'game-arena-content') {
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

    const innerHtml = `
      <div style="max-width: 860px; margin: 0 auto; color: white;">
        <div class="target-prompt-banner">
          <div>${window.VoiceNER.t('gameAttentionTitle')}:</div>
          <div class="target-specimen">${target.icon} ${target.nameAs} (${target.nameEn})</div>
          <button class="mini-speaker-btn" onclick="window.VoiceNER.speak('${target.nameAs}')">🔊</button>
        </div>
        <div class="attention-canvas-area" id="attention-items-wrapper">
          ${pool.map((item) => `
            <div class="attention-item" data-id="${item.id}" role="button" tabindex="0">
              <div style="font-size: 2.4rem;">${item.icon}</div>
              <div style="font-size: 0.78rem; font-weight: 700; text-align: center;">${item.nameAs}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'ধ্যান বিন্দু • Dhyan Bindu (Visual Attention)',
      subtitle: 'Spotting & Tracking Cultural Symbols',
      containerId
    });

    theater.querySelectorAll('.attention-item').forEach((itemBtn) => {
      itemBtn.addEventListener('click', () => {
        const isCorrect = itemBtn.dataset.id === target.id;
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
    });

    this.startTimer();
    window.VoiceNER.speak(`${window.VoiceNER.t('gameAttentionDesc')} - ${target.nameAs}`);
  }

  // -------------------------------------------------------------
  // GAME 3: CHENA MUKHOR (চেনা মুখৰ - FAMILIAR LANDMARKS)
  // -------------------------------------------------------------
  startReminiscenceGame(containerId = 'game-arena-content') {
    this.stopTimer();
    this.timerSeconds = 0;

    const item = this.reminiscenceItems[this.currentReminiscenceIndex % this.reminiscenceItems.length];

    const innerHtml = `
      <div class="reminiscence-arena" style="max-width: 860px; margin: 0 auto; color: white;">
        <div class="reminiscence-image-card">
          <div class="reminiscence-illustration">${item.icon}</div>
          <div class="reminiscence-caption">
            <h3 style="color: #FFE082;">${item.titleAs}</h3>
            <p style="font-size: 1rem; color: rgba(255,255,255,0.85); margin-top: 4px;">${item.descAs}</p>
            <button class="mini-speaker-btn" style="margin-top: 8px;" onclick="window.VoiceNER.speak('${item.titleAs}. ${item.descAs}')">🔊 শুনক (Listen)</button>
          </div>
        </div>

        <div class="reminiscence-options-grid">
          ${item.options.map((opt) => `
            <button class="reminiscence-option-btn" data-correct="${opt.isCorrect}">
              <span style="font-size: 1.4rem;">📍</span>
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'চেনা মুখৰ • Chena Mukhor (Reminiscence)',
      subtitle: 'Familiar Landmarks & Heritage Recognition',
      containerId
    });

    theater.querySelectorAll('.reminiscence-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        window.AIEngine.recordMove(isCorrect);

        if (isCorrect) {
          btn.style.background = '#2E7D32';
          btn.style.borderColor = '#81C784';
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
  startRhythmGame(containerId = 'game-arena-content') {
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

    const innerHtml = `
      <div class="rhythm-game-arena" style="max-width: 860px; margin: 0 auto; color: white;">
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

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'বিহু ঢোল-তাল • Bihu Dhol Taal (Folk Rhythm)',
      subtitle: 'Traditional Northeast Musical Memory',
      containerId
    });

    // Attach pad click events
    this.instruments.forEach(inst => {
      const pad = theater.querySelector(`#pad-${inst.id}`);
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
              banner.innerHTML = `<span style="color: #FFE082;">🥁 <strong>${window.VoiceNER.t('yourTurnNow')}</strong></span>`;
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
  // TRADITIONAL MUSIC GAME 2: SUROR SONDHAN (সুৰৰ সন্ধান - MELODY DETECTIVE)
  // -------------------------------------------------------------
  startMelodyDetectiveGame(containerId = 'game-arena-content') {
    this.stopTimer();
    this.timerSeconds = 0;
    this.melodyRound = this.melodyRound || 0;

    // Pick target instrument
    const instPool = [...this.instruments];
    instPool.sort(() => 0.5 - Math.random());
    const targetInst = instPool[0];
    const distractor1 = instPool[1];
    const distractor2 = instPool[2];

    const options = [targetInst, distractor1, distractor2].sort(() => 0.5 - Math.random());

    const innerHtml = `
      <div style="max-width: 860px; margin: 0 auto; color: white; text-align: center;">
        <div style="background: rgba(0,0,0,0.45); border-radius: 20px; padding: 22px 20px; margin-bottom: 22px; border: 2px solid rgba(255, 215, 140, 0.35);">
          <div style="font-size: 3.5rem; margin-bottom: 8px;">🎶👂</div>
          <h3 style="font-size: 1.4rem; color: #FFE082; margin-bottom: 6px;">
            সুৰৰ সন্ধান • পৰম্পৰাগত বাদ্য চিনাক্তকৰণ (Traditional Melody Detective)
          </h3>
          <p style="font-size: 0.95rem; color: rgba(255,255,255,0.9); margin-bottom: 16px;">
            সুৰটো শুনি কওকচোন, তলৰ কোনটো পৰম্পৰাগত বাদ্যৰ ধ্বনি এয়া?
          </p>

          <button id="btn-replay-mystery-sound" class="pill-btn active" style="min-height: 56px; padding: 12px 28px; font-size: 1.05rem; background: #C9751E; border-color: #FFE082;">
            🔊 সুৰটো পুনৰ শুনক (Replay Sound)
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          ${options.map(opt => `
            <button class="melody-option-card" data-id="${opt.id}" style="
              background: linear-gradient(180deg, rgba(60, 35, 15, 0.85), rgba(25, 12, 5, 0.95));
              border: 3px solid rgba(255, 215, 140, 0.35); border-radius: 20px; padding: 24px 16px;
              cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
              box-shadow: 0 8px 18px rgba(0,0,0,0.4); transition: transform 0.2s ease, border-color 0.2s ease;
            ">
              <div style="font-size: 3.5rem;">${opt.icon}</div>
              <div style="font-size: 1.2rem; font-weight: 800; color: #FFE082;">${opt.nameAs}</div>
              <div style="font-size: 0.85rem; color: rgba(255,255,255,0.75);">${opt.nameEn}</div>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'সুৰৰ সন্ধান • Melody Detective',
      subtitle: 'Identify Traditional Northeast Indian Instruments by Sound',
      containerId
    });

    const playSound = () => {
      targetInst.play();
    };

    // Auto play sound after theater renders
    setTimeout(playSound, 800);

    const replayBtn = theater.querySelector('#btn-replay-mystery-sound');
    if (replayBtn) {
      replayBtn.addEventListener('click', playSound);
    }

    theater.querySelectorAll('.melody-option-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedId = btn.dataset.id;
        const isCorrect = selectedId === targetInst.id;

        window.AIEngine.recordMove(isCorrect);

        if (isCorrect) {
          btn.style.background = '#2E7D32';
          btn.style.borderColor = '#81C784';
          btn.style.transform = 'scale(1.05)';
          window.VoiceNER.playChimeSuccess();
          window.VoiceNER.speak(`বৰ সুন্দৰ! এইটো ${targetInst.nameAs}ৰ সুৰ।`);

          setTimeout(() => {
            this.melodyRound++;
            if (this.melodyRound >= 3) {
              this.melodyRound = 0;
              this.handleGameComplete('Suror Sondhan (Melody Detective)');
            } else {
              this.startMelodyDetectiveGame(containerId);
            }
          }, 1400);
        } else {
          btn.style.borderColor = '#E57373';
          window.VoiceNER.playSoftTap();
          window.VoiceNER.speak(window.VoiceNER.t('gentleTryAgain'));
        }
      });
    });

    this.startTimer();
  }

  // -------------------------------------------------------------
  // TRADITIONAL MUSIC GAME 3: TOKA BEAT KEEPER (বাঁহৰ টকা তাল সংগতি)
  // -------------------------------------------------------------
  startTokaBeatKeeperGame(containerId = 'game-arena-content') {
    this.stopTimer();
    this.timerSeconds = 0;
    let beatsHit = 0;
    const targetBeats = 8;

    const innerHtml = `
      <div style="max-width: 860px; margin: 0 auto; color: white; text-align: center;">
        <div style="background: rgba(0,0,0,0.45); border-radius: 20px; padding: 20px; margin-bottom: 20px; border: 2px solid rgba(255, 215, 140, 0.35);">
          <div style="font-size: 3.5rem; margin-bottom: 6px;">🪵🥁</div>
          <h3 style="font-size: 1.35rem; color: #FFE082; margin-bottom: 4px;">
            বাঁহৰ টকা তাল সংগতি • Bamboo Toka Beat Pacer
          </h3>
          <p style="font-size: 0.95rem; color: rgba(255,255,255,0.9); margin: 0;">
            বিহুৰ তালে তালে টকা বজাওক। তলৰ টকা বুটামত লাহে লাহে চাপৰ মাৰক।
          </p>
        </div>

        <!-- Rhythmic Progress Indicator -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 1.1rem; font-weight: 800; color: #FFE082; margin-bottom: 8px;">
            তাল সংগতি: <span id="toka-counter-text">০ / ৮</span>
          </div>
          <div style="width: 100%; max-width: 480px; height: 16px; background: rgba(255,255,255,0.15); border-radius: 999px; margin: 0 auto; overflow: hidden; border: 2px solid rgba(255,215,140,0.3);">
            <div id="toka-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #E6A15C, #2E7D32); transition: width 0.3s ease;"></div>
          </div>
        </div>

        <!-- Big Tactile Toka Clapper Pad -->
        <div style="display: flex; justify-content: center; margin-bottom: 24px;">
          <button id="btn-tap-toka" style="
            width: 260px; height: 260px; border-radius: 50%;
            background: radial-gradient(circle, #8D5B18 0%, #4E270A 100%);
            border: 8px solid #FFE082; box-shadow: 0 12px 30px rgba(0,0,0,0.5), inset 0 0 25px rgba(255,224,130,0.4);
            cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
            transition: transform 0.12s ease, box-shadow 0.12s ease;
          ">
            <span style="font-size: 4.5rem; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">🪵</span>
            <span style="font-size: 1.3rem; font-weight: 800; color: #FFE082; letter-spacing: 0.05em;">টকা বজাওক</span>
            <span style="font-size: 0.85rem; color: rgba(255,255,255,0.85);">চাপৰ মাৰক (Tap Beat)</span>
          </button>
        </div>

        <p style="color: rgba(255,255,255,0.75); font-size: 0.9rem;">
          💡 কোনো খৰখেদা নাই, আপোনাৰ সুবিধা অনুযায়ী আৰামেৰে চাপৰ মাৰক।
        </p>
      </div>
    `;

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'বাঁহৰ টকা তাল সংগতি • Toka Beat Keeper',
      subtitle: 'Gentle Auditory-Motor Rhythm Pacer for Hand-Eye Coordination',
      containerId
    });

    const tokaBtn = theater.querySelector('#btn-tap-toka');
    const counterText = theater.querySelector('#toka-counter-text');
    const progressBar = theater.querySelector('#toka-progress-bar');

    if (tokaBtn) {
      tokaBtn.addEventListener('click', () => {
        window.VoiceNER.playToka();
        tokaBtn.style.transform = 'scale(0.92)';
        setTimeout(() => tokaBtn.style.transform = 'scale(1)', 120);

        beatsHit++;
        window.AIEngine.recordMove(true);

        if (counterText) counterText.textContent = `${beatsHit} / ${targetBeats}`;
        if (progressBar) progressBar.style.width = `${(beatsHit / targetBeats) * 100}%`;

        if (beatsHit >= targetBeats) {
          setTimeout(() => {
            window.VoiceNER.playChimeSuccess();
            this.handleGameComplete('Bihu Toka Taal (Toka Beat Pacer)');
          }, 400);
        }
      });
    }

    this.startTimer();
    window.VoiceNER.speak('বিহুৰ তালে তালে টকা বুটামত লাহে লাহে চাপৰ মাৰক।');
  }

  // -------------------------------------------------------------
  // GAME 5: BAGICHA BHETI (বাপতি-সাহোন - CULTURAL CATEGORY SORTING)
  // -------------------------------------------------------------
  startSortingGame(containerId = 'game-arena-content') {
    this.stopTimer();
    this.timerSeconds = 0;

    const item = this.sortingItems[this.currentSortingIndex % this.sortingItems.length];

    const innerHtml = `
      <div class="sorting-arena" style="max-width: 860px; margin: 0 auto; color: white;">
        <div class="sorting-prompt-card">
          <div style="font-size: 4rem;">${item.icon}</div>
          <h3 style="font-size: var(--font-h3); margin-top: 8px; color: #FFE082;">${item.nameAs}</h3>
          <p style="color: rgba(255,255,255,0.85); font-size: 1rem;">(${item.nameEn})</p>
          <button class="mini-speaker-btn" style="margin-top: 8px;" onclick="window.VoiceNER.speak('${item.nameAs}')">🔊 শুনক (Listen)</button>
        </div>

        <div style="text-align: center; margin: 16px 0; font-weight: 800; font-size: 1.1rem; color: #FFE082;">
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

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'বাপতি-সাহোন • Bagicha Bheti (Cultural Sorting)',
      subtitle: 'Category Sorting of Northeast Heritage Items',
      containerId
    });

    theater.querySelectorAll('.woven-basket-card').forEach(basket => {
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
  startFolktaleGame(containerId = 'game-arena-content') {
    this.stopTimer();
    this.timerSeconds = 0;

    const story = this.folktales[this.currentFolktaleIndex % this.folktales.length];

    const innerHtml = `
      <div class="reminiscence-arena" style="max-width: 860px; margin: 0 auto; color: white;">
        <div class="folktale-parchment-card">
          <div style="font-size: 3.5rem; text-align: center; margin-bottom: 8px;">${story.icon}</div>
          <h3 style="font-size: var(--font-h3); color: #FFE082; text-align: center; margin-bottom: 12px;">
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

    const theater = this.renderFullscreenTheater({
      innerHtml,
      title: 'সাধুকথা আৰু বুৰঞ্জী • Xadhu Kotha (Folktales)',
      subtitle: 'Legends, Wisdom & Regional Folktale Recall',
      containerId
    });

    theater.querySelectorAll('.reminiscence-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        window.AIEngine.recordMove(isCorrect);

        if (isCorrect) {
          btn.style.background = '#2E7D32';
          btn.style.borderColor = '#81C784';
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
    const timerDisplayInline = document.getElementById('game-timer-display');
    const timerDisplayFs = document.getElementById('game-timer-display-fs');
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      if (timerDisplayInline) {
        timerDisplayInline.textContent = `⏱️ ${this.timerSeconds}s`;
      }
      const liveFs = document.getElementById('game-timer-display-fs');
      if (liveFs) {
        liveFs.textContent = `⏱️ ${this.timerSeconds}s`;
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
