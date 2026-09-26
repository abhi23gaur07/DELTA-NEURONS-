/**
 * DELTA NEURONS: Trained Dementia Care AI Companion Engine
 * Specialized Conversational & Validation Therapy Agent for Elderly Dementia Patients
 * 
 * Clinical Features:
 *   1. Validation Therapy (Validates emotional reality without confrontation)
 *   2. Calming De-escalation & Sundowning Relief (Anxiety reduction & guided breath)
 *   3. Reminiscence Therapy (Cultural North-East memories, tea gardens, folk melodies)
 *   4. Temporal & Spatial Gentle Orientation (Reassures safety, home, and love)
 *   5. Routine & Medication Inquiries (Direct check of today's schedule)
 *   6. Multilingual Speech Synthesis & Speech-to-Text Voice Interaction
 */

class DementiaCareAICompanion {
  constructor() {
    this.isOpen = false;
    this.isListening = false;
    this.conversationHistory = [];
    this.recognition = null;
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.handleUserInput(transcript);
          this.setMicListeningUI(false);
        };

        this.recognition.onerror = () => {
          this.setMicListeningUI(false);
        };

        this.recognition.onend = () => {
          this.setMicListeningUI(false);
        };
      } catch (e) {
        console.warn("Speech recognition not supported:", e);
      }
    }
  }

  toggleMic() {
    if (!this.recognition) {
      alert("Voice input is supported in Google Chrome, Edge, and modern browsers.");
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.setMicListeningUI(false);
    } else {
      const currentLang = window.I18nEngine ? window.I18nEngine.currentLang : 'as';
      const langCodes = {
        as: 'as-IN',
        en: 'en-IN',
        hi: 'hi-IN',
        bn: 'bn-IN',
        mni: 'mni-IN',
        kha: 'en-IN',
        brx: 'hi-IN',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE'
      };
      this.recognition.lang = langCodes[currentLang] || 'en-US';
      try {
        this.recognition.start();
        this.setMicListeningUI(true);
        if (window.VoiceNER) window.VoiceNER.speak("শুনি আছোঁ, কওক (Listening...)");
      } catch (e) {
        this.setMicListeningUI(false);
      }
    }
  }

  setMicListeningUI(listening) {
    this.isListening = listening;
    const micBtn = document.getElementById('companion-mic-btn');
    if (micBtn) {
      micBtn.classList.toggle('active-listening', listening);
      micBtn.innerHTML = listening ? '🎙️ শুনি আছোঁ... (Listening)' : '🎤 মুখেৰে কওক (Speak)';
    }
  }

  // Clinical Intent Classification Engine for Dementia Care
  classifyIntent(text) {
    const lower = text.toLowerCase();

    // 1. Looking for parents / deceased family / childhood (Validation Therapy)
    if (lower.match(/\b(মা|দেউতা|মাক|দেউতাক|দেউতাৰ|আই|माँ|पिताजी|mother|father|mom|dad|parents|childhood)\b/) || lower.includes('মা কʼত') || lower.includes('মাক') || lower.includes('দেউতা')) {
      return 'VALIDATION_PARENTS';
    }

    // 2. Where am I / Disorientation to Place or Time
    if (lower.match(/ক'ত আছোঁ|কʼত আছোঁ|কোথায় আছি|कहाँ हूँ|where am i|who are you|who am i|what place|ঘৰলৈ যাম|घर जाना/)) {
      return 'ORIENTATION_SAFETY';
    }

    // 3. Anxiety, fear, agitation, sundowning
    if (lower.match(/ভয়|উদ্বেগ|অস্থিৰ|डर|घबराहट|scared|afraid|anxious|nervous|worry|alone|help me|আঁতৰাই নিয়া/)) {
      return 'CALMING_ANXIETY';
    }

    // 4. Medicine & Routine Inquiries
    if (lower.match(/ঔষধ|দৰব|পানী|दवाई|medicine|tablet|pill|water|hydrat|খালোঁনে|ললোঁনে/)) {
      return 'MEDICINE_ROUTINE';
    }

    // 5. Cultural Reminiscence (Brahmaputra, tea garden, Bihu, songs)
    if (lower.match(/চাহ|বাগিচা|ব্ৰহ্মপুত্ৰ|বিহু|ঢোল|গান|গীত|नदी|चाय|त्योहार|river|tea|music|song|bihu/)) {
      return 'REMINISCENCE_CULTURE';
    }

    // 6. Request for story or folktale
    if (lower.match(/সাধু|কাহিনী|গল্প|कहानी|story|tale|folktale|কথা কোৱা/)) {
      return 'FOLKTALE';
    }

    // 7. Guided Breathing or Yoga
    if (lower.match(/উশাহ|ধ্যান|যোগ|ব্যায়াম|साँस|breathe|breathing|yoga|relax/)) {
      return 'BREATHING_INVITATION';
    }

    // 8. General greetings & affection
    if (lower.match(/নমস্কাৰ|প্ৰণাম|কেমন|ভালনে|नमस्ते|hello|hi|good morning|how are you/)) {
      return 'GREETING_WARMTH';
    }

    return 'GENERAL_COMPANION';
  }

  // Generate empathetic response tailored to patient language and clinical intent
  generateResponse(intent, userText) {
    const lang = window.I18nEngine ? window.I18nEngine.currentLang : 'as';
    const patientName = (window.AuthEngine && window.AuthEngine.currentUser) ? window.AuthEngine.currentUser.fullName : 'আইতা-ককা';

    const responses = {
      ORIENTATION_SAFETY: {
        as: `প্ৰণাম ${patientName}! আপুনি আপোনাৰ নিজৰ মৰমৰ ঘৰত সম্পূর্ণ সুৰক্ষিত হৈ আছে। আপোনাৰ পৰিয়াল আপোনাৰ ওচৰতেই আছে আৰু সকলো ব্যৱস্থা কৰা আছে। কোনো চিন্তা নকৰিব, আহক আমি শান্তিপূৰ্ণভাৱে বহোঁ।`,
        hi: `प्रणाम! आप अपने सुरक्षित और प्यार भरे घर में हैं। आपका परिवार आपके साथ है और सब कुछ कुशल-मंगल है। आप निश्चिंत होकर आराम करें, हम आपके साथ हैं।`,
        bn: `প্রণাম! আপনি আপনার নিজের সুরক্ষিত ও সুন্দর বাড়িতেই আছেন। আপনার পরিবার সবসময় আপনার পাশেই আছে। কোনো চিন্তা করবেন না, শান্ত হয়ে বসুন।`,
        en: `Warm greetings! You are completely safe, comfortable, and warm in your own home. Your loving family is right here caring for you. Everything is taken care of peacefully.`
      },
      VALIDATION_PARENTS: {
        as: `আপোনাৰ মা-দেউতাই আপোনাক অন্তৰেৰে অতি মৰম কৰিছিল। তেওঁলোকৰ আশীৰ্বাদ সদায় আপোনাৰ লগত আছে। কওকচোন, মাৰ হাতৰ কোনটো জুতি আপোনাৰ আটাইতকৈ প্রিয় আছিল? নাৰিকলৰ লাডু নে তিলৰ পিঠা?`,
        hi: `माता-पिता का प्यार और आशीर्वाद सदैव हमारे हृदय में रहता है। वे हमेशा चाहते हैं कि आप खुश और शांत रहें। मुझे बताइए, बचपन में माँ आपके लिए कौन सी मीठी चीज़ सबसे प्यार से बनाती थीं?`,
        bn: `মা-বাবার স্নেহ ও আশীর্বাদ সবসময় আমাদের হৃদয়ে জড়িয়ে থাকে। তারা সবসময় আপনার মঙ্গল চান। বলুন তো, মায়ের হাতের কোন রান্নাটি আপনার সবথেকে বেশি প্রিয় ছিল?`,
        en: `Your parents loved you dearly and their blessings are always with you in your heart. Tell me, what was your favorite sweet memory or meal they used to prepare for you on festive mornings?`
      },
      CALMING_ANXIETY: {
        as: `একেবাৰে ভয় নকৰিব, মই আপোনাৰ লগতে আছোঁ। আপুনি সম্পূৰ্ণ নিৰাপদ। আহক আমি একেলগে এটা গভীৰ, শীতল উশাহ লওঁ— পদুম ফুলৰ সুবাসৰ দৰে লাহে লাহে উশাহ লওক... ১, ২, ৩... আৰু লাহেকৈ এৰি দিয়ক। মন জুৰণি হওক।`,
        hi: `घबराइए बिल्कुल नहीं, आप बिल्कुल सुरक्षित हैं। सब कुछ ठीक है। आइए हम साथ में एक गहरी, शांत साँस लेते हैं... धीरे से साँस अंदर लें... और धीरे से बाहर छोड़ें। अपने मन को शांत रखें।`,
        bn: `ভয় পাবেন না, আমি আপনার কাছেই আছি। আপনি পুরোপুরি নিরাপদ। আসুন আমরা একসাথে একটি গভীর ও স্নিগ্ধ শ্বাস নিই... ধীরে ধীরে শ্বাস নিন... এবং শান্তভাবে ছেড়ে দিন।`,
        en: `Do not worry at all, you are completely safe and loved right here. Let us take a slow, gentle calming breath together. Smell the sweet lotus flower... breathe in 1, 2, 3... and gently breathe out. Peace fills your heart.`
      },
      MEDICINE_ROUTINE: {
        as: () => {
          let medsMsg = "আজিৰ ঔষধৰ খবৰ চাওঁ আহক: ";
          if (window.Reminders && window.Reminders.state) {
            const pending = window.Reminders.state.medicines.filter(m => !m.taken);
            if (pending.length === 0) {
              return "বৰ সুন্দৰ কথা! আজিৰ সকলো ঔষধ আপোনাৰ সময়মতে লোৱা সম্পূৰ্ণ হৈছে। লগতে এঢোক পানী খাই নিজক সতেজ কৰি ৰাখক।";
            } else {
              return `আপোনাৰ ৰুটিন অতি সুন্দৰকৈ চলিছে! পৰৱৰ্তী সময়ত আপোনাৰ "${pending[0].name}" ঔষধখিনি এঢোক পানীৰে লোৱাৰ ব্যৱস্থা আছে। কোনো খৰখেদা নাই।`;
            }
          }
          return medsMsg + "আপোনাৰ ঔষধৰ তালিকা সুৰক্ষিতভাৱে চলি আছে।";
        },
        hi: () => {
          if (window.Reminders && window.Reminders.state) {
            const pending = window.Reminders.state.medicines.filter(m => !m.taken);
            if (pending.length === 0) return "बहुत बढ़िया! आज की सभी दवाइयाँ समय पर ले ली गई हैं। थोड़ा ताजा पानी पीकर आराम करें।";
            return `आपकी दिनचर्या बहुत अच्छी चल रही है। अगली दवाई "${pending[0].name}" निर्धारित समय पर एक घूंट पानी के साथ लेनी है।`;
          }
          return "आपकी दवाइयों का समय सही ढंग से व्यवस्थित है।";
        },
        bn: () => {
          if (window.Reminders && window.Reminders.state) {
            const pending = window.Reminders.state.medicines.filter(m => !m.taken);
            if (pending.length === 0) return "খুব সুন্দর! আজকের সব ওষুধ নিয়মমতো নেওয়া সম্পন্ন হয়েছে। এক ঢোক জল খেয়ে বিশ্রাম নিন।";
            return `আপনার দৈনন্দিন রুটিন ভালো চলছে। পরবর্তী ওষুধ "${pending[0].name}" জলের সাথে নেওয়ার কথা রয়েছে।`;
          }
          return "ওষুধের তালিকা সুরক্ষিতভাবে চলছে।";
        },
        en: () => {
          if (window.Reminders && window.Reminders.state) {
            const pending = window.Reminders.state.medicines.filter(m => !m.taken);
            if (pending.length === 0) return "Wonderful! All your scheduled medicines for today have been taken on time. Please enjoy a soothing sip of fresh water.";
            return `Your health routine is right on track! Your upcoming medicine is "${pending[0].name}". It will be ready with a glass of water when scheduled.`;
          }
          return "Your medication schedule is safely tracked in your chart.";
        }
      },
      REMINISCENCE_CULTURE: {
        as: `ব্ৰহ্মপুত্ৰৰ শীতল বতাহ আৰু চাহ বাগিচাৰ সেউজীয়া দৃশ্যই মন কিমান জুৰাই তোলে নহয় জানো? মনত আছেনে বিহুৰ সময়ত ঢোল আৰু পেঁপাৰ সেই আনন্দময় মাত? আহক আমি সেই সুন্দৰ সুৰবোৰ মনতে গুণগুণাওঁ।`,
        hi: `असम के हरे-भरे चाय के बागान और ब्रह्मपुत्र नदी की मंद हवा कितनी शांति देती है। बिहू के ढोल और पेपा की धुन हमेशा मन में उमंग भर देती है। वो पुरानी यादें कितनी प्यारी हैं!`,
        bn: `চা বাগানের সবুজ পাতা আর নদীর মিষ্টি হাওয়া মনকে কত শান্ত করে তোলে। বিহু উৎসবের ঢোলের তাল ও লোকগীতির সুর মনে পড়ে? মনটা আনন্দে ভরে ওঠে।`,
        en: `The gentle breeze across the Brahmaputra and the green beauty of the tea gardens bring such deep serenity. Do you remember the joyful rhythm of the festive folk drums? Let us cherish those peaceful memories.`
      },
      FOLKTALE: {
        as: `আহক এটা চুটি পুৰণি সাধু শুনোঁ: এদিন এখন ধুনীয়া সেউজীয়া হাবিত এটা বুধিয়ক শিয়াল আৰু এটা ককা আছিল। ককায়ে শিয়ালটোক ক’লে— 'মন শান্ত ৰাখি যিয়ে চলে, তেওঁৰ কোনো বিপদ নহয়।' সদায় হাঁহিমুখে থকাটোৱেই আমাৰ আটাইতকৈ ডাঙৰ শক্তি।`,
        hi: `आइए एक प्यारी पुरानी कहानी सुनते हैं: एक सुंदर गाँव में एक बरगद के पेड़ की छाया में सब बैठते थे। बुजुर्ग कहते थे कि जिसका मन शांत और निर्मल है, उसे हमेशा सुख मिलता है। शांति ही हमारा सबसे बड़ा गहना है।`,
        bn: `আসুন একটি সুন্দর ছোট গল্প শুনি: নদীর তীরে এক শান্ত কুটিরে দাদু-ঠাকুমা মিষ্টি সুরে গান গাইতেন। যে মানুষ মনে শান্তি রাখে, তার চারপাশ আলোকময় হয়ে ওঠে। আপনিও হাসিখুশি থাকুন।`,
        en: `Here is a gentle folktale: Under the great banyan tree by the river, the wise elder used to say, 'He who carries peace in his breath carries sunshine in every step.' Your gentle smile is a true blessing to everyone around you.`
      },
      BREATHING_INVITATION: {
        as: `আহক মনটো জুৰ পেলাবলৈ আমি পদ্ম-উশাহৰ অনুশীলন কৰোঁ। চকু দুটা স্নিগ্ধভাৱে মুদি লওক। ১, ২, ৩, ৪ উশাহ লওক... আৰু লাহে লাহে এৰি দিয়ক। আপোনাৰ মন আৰু দেহ পাতল অনুভৱ হৈছে।`,
        hi: `आइए मन को शांत करने के लिए प्राणायाम का अभ्यास करते हैं। आँखें सहजता से बंद करें। धीरे से गहरी साँस भीतर लें... और धीरे से बाहर छोड़ें। असीम शांति का अनुभव करें।`,
        bn: `আসুন মন শান্ত করতে পদ্ম-শ্বাসের মৃদু অনুশীলন করি। চোখ দুটি আলতো করে বন্ধ করুন। ধীরে ধীরে শ্বাস গ্রহণ করুন... এবং ধীরে ধীরে ছেড়ে দিন। প্রশান্তি অনুভব করুন।`,
        en: `Let us enjoy a calming lotus breathing exercise together. Gently close your eyes. Breathe in slowly... 1, 2, 3, 4... hold for a moment... and gently exhale. Feel total lightness and peace.`
      },
      GREETING_WARMTH: {
        as: `প্ৰণাম! আপোনাক দেখি বৰ ভাল লাগিল। আজি আপোনাৰ দিনটো অতি সুন্দৰ আৰু শান্তিময় হওক। মই আপোনাৰ সেৱাৰ বাবে সদায় ইয়াতেই আছোঁ।`,
        hi: `नमस्ते और सादर प्रणाम! आपसे बात करके मन प्रसन्न हो गया। आपका आज का दिन अत्यंत सुखद और शांतिपूर्ण रहे।`,
        bn: `প্রণাম ও আন্তরিক শুভেচ্ছা! আপনার সাথে কথা বলতে পেরে খুব ভালো লাগছে। আপনার আজকের দিনটি সুন্দর ও প্রশান্তিময় হোক।`,
        en: `Warm and respectful greetings! It is wonderful to spend time with you. May your day be filled with gentle peace, melodies, and comfort.`
      },
      GENERAL_COMPANION: {
        as: `আপোনাৰ কথা শুনি বৰ আনন্দ পালোঁ। আপুনি অতি মৰমীয়াল ব্যক্তি। কোনো ধৰণৰ খৰখেদা নাই, আপোনাৰ যেতিয়াই মন যায় মোক যিকোনো কথা ক’ব পাৰে। আমি একেলগে আছোঁ।`,
        hi: `आपकी मीठी बातें सुनकर मन को बहुत सुकून मिला। बिना किसी चिंता के आप जब चाहें मुझसे बात कर सकते हैं। हम सब आपके साथ हैं।`,
        bn: `আপনার আন্তরিক কথা শুনে মন জুড়িয়ে গেল। কোনো তাড়াহুড়ো নেই, আপনার যখনই ইচ্ছা হবে আমার সাথে কথা বলবেন। আমরা সবসময় আপনার পাশে আছি।`,
        en: `It is an honor to listen to you. You are deeply cherished and cared for. There is no rush at all; whenever you wish to talk or listen to a soothing melody, I am always right here by your side.`
      }
    };

    const intentGroup = responses[intent] || responses['GENERAL_COMPANION'];
    let resp = intentGroup[lang] || intentGroup['en'] || intentGroup['as'];
    if (typeof resp === 'function') {
      resp = resp();
    }
    return resp;
  }

  // Handle incoming user input (Voice or Text)
  handleUserInput(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    this.addMessageToUI('user', cleanText);
    const intent = this.classifyIntent(cleanText);
    const responseText = this.generateResponse(intent, cleanText);

    setTimeout(() => {
      this.addMessageToUI('ai', responseText);
      // Speak aloud in patient's selected regional language
      if (window.VoiceNER && typeof window.VoiceNER.speak === 'function') {
        window.VoiceNER.speak(responseText);
      }
    }, 400);
  }

  addMessageToUI(sender, text) {
    const chatFeed = document.getElementById('companion-chat-feed');
    if (!chatFeed) return;

    const msgEl = document.createElement('div');
    msgEl.className = `companion-bubble companion-${sender}`;
    msgEl.innerHTML = `
      <div class="bubble-sender">${sender === 'user' ? '🧓 আপুনি (You)' : '🌿 আইতা-ককা সহায়িকা (AI Companion)'}</div>
      <div class="bubble-text">${text}</div>
    `;
    chatFeed.appendChild(msgEl);
    chatFeed.scrollTop = chatFeed.scrollHeight;
  }

  openCompanionModal() {
    this.isOpen = true;
    const modal = document.getElementById('dementia-companion-modal');
    if (modal) {
      modal.style.display = 'flex';
      const chatFeed = document.getElementById('companion-chat-feed');
      if (chatFeed && chatFeed.children.length === 0) {
        // Greet upon first open
        const greeting = this.generateResponse('GREETING_WARMTH', '');
        this.addMessageToUI('ai', greeting);
        if (window.VoiceNER) window.VoiceNER.speak(greeting);
      }
    }
  }

  closeCompanionModal() {
    this.isOpen = false;
    const modal = document.getElementById('dementia-companion-modal');
    if (modal) modal.style.display = 'none';
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.setMicListeningUI(false);
    }
  }
}

// Export singleton instance
window.DementiaAICompanion = new DementiaCareAICompanion();
