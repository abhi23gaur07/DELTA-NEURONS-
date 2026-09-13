/**
 * DELTA NEURONS: Multilingual Voice & Procedural Folk Audio Engine
 * Specifically localized for India's North Eastern Region (NER)
 * Zero external audio files required - 100% offline Web Audio API synthesis.
 */

class VoiceNEREngine {
  constructor() {
    this.currentLang = 'as'; // Default to Assamese
    this.synth = window.speechSynthesis || null;
    this.audioCtx = null;
    this.ambientNodes = [];
    this.isAmbientPlaying = false;
    this.speechRate = 0.80; // Slow, comforting cadence for elderly comprehension

    // Comprehensive Northeast Regional Translations & Kinship Vocab
    this.translations = {
      as: { // Assamese
        kinshipHonorific: "আইতা / ককা (Aita / Koka)",
        welcomeGreeting: "প্ৰণাম আইতা-ককা, আপোনাৰ মন জুৰণি হওক!",
        welcomeSub: "আজিৰ দিনটো আনন্দৰে কটাওক। কোনো খৰখেদা নাই, আহক আমি মনৰ আনন্দদায়ক খেল খেলোঁ।",
        playGames: "মগজুৰ আনন্দ খেল (৬ বিধ খেল)",
        playGamesDesc: "কাজিৰঙাৰ গঁড়, বিহু ঢোলৰ তাল আৰু চাহ বাগিচাৰ স্মৃতিৰে ভৰা খেল।",
        medicinesTitle: "ঔষধ আৰু পানীৰ যত্ন",
        medicinesDesc: "সময়মতে পানী খোৱা আৰু দৰৱ লোৱাৰ সহজ তালিকা।",
        reminiscenceTitle: "পুৰণি স্মৃতি আৰু সুৰ",
        reminiscenceDesc: "ব্ৰহ্মপুত্ৰৰ জুৰ বতাহ, বাঁহীৰ সুৰ আৰু আমাৰ চিনাকি অসমৰ দৃশ্য।",
        caregiverPortal: "অভিভাৱক নিৰীক্ষণ কক্ষ",
        readScreen: "পঢ়ি শুনক",
        fontSize: "আখৰৰ আকাৰ",
        highContrast: "উচ্চ স্পষ্টতা",
        superEasyMode: "অতি সহজ মোড (Super Easy)",
        calmBreathing: "প্ৰশান্তি উশাহ-নিশাহ (Calm Breathing)",
        breatheIn: "দীঘলকৈ উশাহ লওক... (Breathe In)",
        breatheHold: "ধৰি ৰাখক... (Hold)",
        breatheOut: "লাহেকৈ উশাহ এৰি দিয়ক... (Breathe Out)",
        
        // Games
        gameMemoryTitle: "১. স্মৃতি মেল (যোৰ মিলোৱা)",
        gameMemoryDesc: "কাৰ্ডবোৰ লুটিয়াই একে ছবিৰ যোৰ বাছক। কোনো খৰখেদা নাই।",
        gameAttentionTitle: "২. ধ্যান বিন্দু (লক্ষ্য সন্ধান)",
        gameAttentionDesc: "ছবিবোৰৰ মাজৰ পৰা চিনাকি বস্তুটো স্পর্শ কৰক।",
        gameRecognitionTitle: "৩. চেনা মুখৰ (চিনাকি ঠাই আৰু মুখ)",
        gameRecognitionDesc: "এইখন আমাৰ ক’ৰ ছবি? সঠিক উত্তৰটো বাছক।",
        gameRhythmTitle: "৪. বিহু ঢোল-তাল (সুৰ আৰু তালৰ স্মৃতি)",
        gameRhythmDesc: "ঢোল, পেঁপা, টকা আৰু তালৰ সুৰ শুনি সেইদৰেই বজাওক।",
        gameSortingTitle: "৫. বাপতি-সাহোন (শ্ৰেণীবিভাজন)",
        gameSortingDesc: "খাদ্য আৰু সাজপাৰ/হস্তশিল্পবোৰ সঠিক ডলাত সজাওক।",
        gameFolktaleTitle: "৬. সাধুকথা আৰু বুৰঞ্জী (কাহিনী স্মৰণ)",
        gameFolktaleDesc: "তেজীমলা, লাচিত বৰফুকন আৰু আমাৰ গৌৰৱময় বুৰঞ্জীৰ স্মৃতি।",

        listenFirst: "প্ৰথমে মনোযোগেৰে সুৰটো শুনক...",
        yourTurnNow: "এতিয়া আপোনাৰ পাল, ঠিক একেদৰে বজাওক!",
        wellDone: "বৰ সুন্দৰ হৈছে! আপুনি বহুত ভাল কৰিলে।",
        gentleTryAgain: "একো চিন্তা নকৰিব আইতা/ককা, আহক আমি পুনৰ চেষ্টা কৰোঁ।",
        drinkWaterReminder: "আইতা / ককা, এঢোক পানী খাই লওক। আপোনাৰ শৰীৰ জুৰ পৰিব।",
        medReminder: "ঔষধ খোৱাৰ সময় হ’ল। অনুগ্ৰহ কৰি আপোনাৰ ঔষধ লওক।",
        hintPrompt: "সংকেত: এই কাৰ্ডখন চাওক!",
        calmMusic: "শান্তিময় বাঁহীৰ সুৰ",
        waterTracked: "বহুত ভাল! আপুনি পানী খালে।"
      },
      bn: { // Bengali
        kinshipHonorific: "দিদিমা / দাদু (Dida / Dadu)",
        welcomeGreeting: "প্রণাম দিদিমা-দাদু, আপনার দিনটি শান্তিময় হোক!",
        welcomeSub: "আজকের দিনটি আনন্দময় হোক। শান্তভাবে আসুন মনের ব্যায়াম ও স্মৃতি চর্চা করি।",
        playGames: "মস্তিষ্কের খেলা (৬টি খেলা)",
        playGamesDesc: "কাজিরাঙ্গার গণ্ডার, বিহু ঢোল ও চা বাগানের স্মৃতিতে সাজানো খেলা।",
        medicinesTitle: "ওষুধ ও জল",
        medicinesDesc: "নিয়মিত জল খাওয়া ও ওষুধ গ্রহণের সহজ স্মরণপত্র।",
        reminiscenceTitle: "মধুর স্মৃতি ও সুর",
        reminiscenceDesc: "নদীর কলতান, মৃদু বাঁশির সুর ও চেনা ফেলে আসা দৃশ্য।",
        caregiverPortal: "সেবক পর্যবেক্ষণ",
        readScreen: "পড়ে শোনান",
        fontSize: "অক্ষরের মাপ",
        highContrast: "উচ্চ বৈসাদৃশ্য",
        superEasyMode: "অতি সহজ মোড",
        calmBreathing: "শান্ত শ্বাস-প্রশ্বাস",
        breatheIn: "গভীর শ্বাস নিন...",
        breatheHold: "ধরে রাখুন...",
        breatheOut: "ধীরে ধীরে শ্বাস ছাড়ুন...",

        gameMemoryTitle: "১. স্মৃতি মিল (জোড়া মেলানো)",
        gameMemoryDesc: "কার্ড উল্টে জোড়া মেলাুন। কোনো তাড়াহুড়ো নেই, শান্তভাবে খেলুন।",
        gameAttentionTitle: "২. মনোযোগ লক্ষ্য",
        gameAttentionDesc: "চিত্রের মাঝখান থেকে নির্দিষ্ট জিনিসটি চিহ্নিত করুন।",
        gameRecognitionTitle: "৩. চেনা মুখ ও স্থান",
        gameRecognitionDesc: "এই ছবিটি কোথাকার? সঠিক উত্তর নির্বাচন করুন।",
        gameRhythmTitle: "৪. বাদ্য ও সুরের স্মৃতি (ঢোল-তাল)",
        gameRhythmDesc: "বাদ্যের সুর শুনে ঠিক একইভাবে বাজান।",
        gameSortingTitle: "৫. ঐতিহ্য সাজানো (শ্রেণিবিভাগ)",
        gameSortingDesc: "খাবার ও ঐতিহ্যবাহী পোশাক সঠিক ঝুড়িতে রাখুন।",
        gameFolktaleTitle: "৬. লোকগাথা ও বীরের গল্প",
        gameFolktaleDesc: "তেজিমলা ও আসামের ঐতিহাসিক কাহিনীর স্মৃতি।",

        listenFirst: "প্রথমে সুরটি মনোযোগ দিয়ে শুনুন...",
        yourTurnNow: "এবার আপনার পালা, একইভাবে বাজান!",
        wellDone: "দারুণ করেছেন! আপনি খুব ভালো খেলেছেন।",
        gentleTryAgain: "কোনো চিন্তা নেই, আসুন আমরা আবার চেষ্টা করি।",
        drinkWaterReminder: "দাদু / দিদিমা, এক গ্লাস জল খেয়ে নিন। শরীর ভালো থাকবে।",
        medReminder: "ওষুধ নেওয়ার সময় হয়েছে। দয়া করে ওষুধটি গ্রহণ করুন।",
        hintPrompt: "ইঙ্গিত: এই কার্ডটির দিকে লক্ষ্য করুন!",
        calmMusic: "শান্ত বাঁশির সুর",
        waterTracked: "চমৎকার! আপনি জল পান করেছেন।"
      },
      mni: { // Manipuri / Meitei
        kinshipHonorific: "ইবেম্মা / ইবুংঙো (Ibemma / Ibungo)",
        welcomeGreeting: "খুরুমজরি ইবেম্মা-ইবুংঙো, নুমিৎ অসিনা নুংঙাইবা ওইরসনু!",
        welcomeSub: "ৱাখলবু নুংঙাইহনবা পুন্সি মহাও লৌসি। তপথনা শান্নবীযু।",
        playGames: "ৱাখলগী শান্ন-খোৎনবা (৬ মখল)",
        playGamesDesc: "লোকতাক পাৎ, সাঙাই অমসুং থাং-তাগী নুংঙাইবা শান্নপোৎ।",
        medicinesTitle: "হিদাক অমসুং ঈশিং",
        medicinesDesc: "ঈশিং থকপা অমসুং মতম চানা হিদাক চাবা নিংশিংবা।",
        reminiscenceTitle: "অরিবা নিংশিং অমসুং ঈশৈ",
        reminiscenceDesc: "খোঙজুংগী ঈশৈ, মোইরাংগী ফজরবা নুমিৎ অমসুং ইমুংগী শাফু।",
        caregiverPortal: "শেন্নবীরিবা মীওইগী পোৰ্টেল",
        readScreen: "পাবীরম্মু",
        fontSize: "ময়েক্কী অচৌ-অপিক",
        highContrast: "ময়েক শেংনা উবা",
        superEasyMode: "য়াম্না লাইবা মোড",
        calmBreathing: "শান্তিদায়ী শ্বাশ লৌবা",
        breatheIn: "শ্বাশ লুনা লৌবীয়ু...",
        breatheHold: "থেংথবীরম্মু...",
        breatheOut: "তপথনা শ্বাশ থাদোকপীয়ু...",

        gameMemoryTitle: "১. নিংশিং মেলা (যোড়া থিবা)",
        gameMemoryDesc: "কার্ডশিং অনী-অনী মান্নবা থিবীযু।",
        gameAttentionTitle: "২. মিৎয়েং চনবা",
        gameAttentionDesc: "উরিবা পোৎলমশিংগী মরক্তগী মমি অদু খনবীয়ু।",
        gameRecognitionTitle: "৩. চিনবীবা মমি অমসুং মফম",
        gameRecognitionDesc: "মসি করিগী মফমনি? চুম্বা পাউখুম পীবীযু।",
        gameRhythmTitle: "৪. পুং অমসুং তানগী নিংশিং",
        gameRhythmDesc: "খোঙজুং অমসুং তানগী খোঞ্জেল তাবীয়ু অমসুং অনীশুবা ওইনা শান্নবীয়ু।",
        gameSortingTitle: "৫. পোৎলম খেন্নহনবা",
        gameSortingDesc: "চাক-ঈশিং অমসুং ফী-রোইশিং তোঙান্না খাইদোকপীয়ু।",
        gameFolktaleTitle: "৬. ফুংগা ৱারী অমসুং পুৱারী",
        gameFolktaleDesc: "মণিপুরগী অরিবা ৱারী অমসুং অথৌবশিংবু নিংশিংবা।",

        listenFirst: "অহানবদা খোঞ্জেল অসি তাবীয়ু...",
        yourTurnNow: "হৌজিক নহাক্কী পাল্নি, শান্নবীয়ু!",
        wellDone: "য়াম্না ফরে! নহাক্না য়াম্না নিন্থিনা শান্নরে।",
        gentleTryAgain: "ৱাখল ৱাবীগনু, অমুক হন্না হোৎনসি।",
        drinkWaterReminder: "ইবুংঙো / ইবেম্মা, ঈশিং খর থকবীয়ু।",
        medReminder: "হিদাক চাবগী মতম ওইরে।",
        hintPrompt: "খঙহনবা: মসিদা য়েংবীয়ু!",
        calmMusic: "শান্তিদায়ী বাঁহিগী সুৰ",
        waterTracked: "য়াম্না ফরে! ঈশিং থকপীরে।"
      },
      kha: { // Khasi (Meghalaya)
        kinshipHonorific: "Mei-ieid / Pa-ieid",
        welcomeGreeting: "Khublei Mei-ieid / Pa-ieid! Ban suk ka jingmut jingpyrkhat.",
        welcomeSub: "To ngin pynbyrngia ia ka jingmut da ki jingialehkai kiba jem bad ba sngewtynnat.",
        playGames: "Ki Jingialehkai Jingmut (6 tylli)",
        playGamesDesc: "Ki dur jong ka Jingkieng Jri, u Mawlynnong bad ki surok ba itynnat.",
        medicinesTitle: "Ki Dawai bad ka Um",
        medicinesDesc: "Ban kynmaw ban dih um bad dih dawai ha ka por kaba biang.",
        reminiscenceTitle: "Ki Jingkynmaw Kiba Bang",
        reminiscenceDesc: "Ki sur na ka Besli, ka jingriew ka um ha Sohra.",
        caregiverPortal: "Ka Dashboard Nongsumar",
        readScreen: "Pule Shaphang Kane",
        fontSize: "Ka Jingheh u Dak",
        highContrast: "Kiba Paw Bha",
        superEasyMode: "Kaba Jem Bha (Super Easy)",
        calmBreathing: "Pynhiar Mynsiem ba Jai-jai",
        breatheIn: "Ring mynsiem jur...",
        breatheHold: "Bat khyndiat...",
        breatheOut: "Pynhiar mynsiem suki suki...",

        gameMemoryTitle: "1. Pyniahap Dur (Memory Match)",
        gameMemoryDesc: "Phai ia ki dur bad pyniahap ia ki kiba syriem.",
        gameAttentionTitle: "2. Jingpynleit Jingmut",
        gameAttentionDesc: "Shem ia ka dur kaba dei na pdeng kine.",
        gameRecognitionTitle: "3. Ki Dur ba Ithuh Bha",
        gameRecognitionDesc: "Kaei kane ka jaka ne kane ka dur?",
        gameRhythmTitle: "4. Ka Sur bad ka Ksing (Rhythm Memory)",
        gameRhythmDesc: "Sngap ia ka sur ksing bad kynmaw ban tem biang kumjuh.",
        gameSortingTitle: "5. Pynbynta ia ki Mar Khasi",
        gameSortingDesc: "Buh ia ki bam bad ki riam tynrai ha ki shang ba dei.",
        gameFolktaleTitle: "6. Ki Puriskam ba Rim",
        gameFolktaleDesc: "Ki puriskam bad ki khana pateng kiba sngewtynnat.",

        listenFirst: "Sngap bha ia ka sur shuwa...",
        yourTurnNow: "La dei ka pali jong phi ban tem!",
        wellDone: "Kaba bha palat! Phi la leh bha shibun.",
        gentleTryAgain: "Wat khuslai, to ngin pyrshang biang.",
        drinkWaterReminder: "Mei-ieid / Pa-ieid, sngewbha dih um khyndiat.",
        medReminder: "La poi ka por ban dih dawai.",
        hintPrompt: "Dak Jingiarap: Peit ia kane!",
        calmMusic: "Ka Sur Besli",
        waterTracked: "Kaba bha! Phi la dih um."
      },
      brx: { // Bodo
        kinshipHonorific: "आबै / आबौ (Aabai / Aabou)",
        welcomeGreeting: "खुलुमबाय आबै-आबौ! नोंथांनि गोसोआ गोजोन जाना थाथों।",
        welcomeSub: "दिनैनि दिना रंजाबथा जाना थाथों। फै जों गोसो फोसाबनो गेलेनि।",
        playGames: "गोसोनि गेलेनाय (६ रोखोमनि)",
        playGamesDesc: "खाम, सिफुं आरो काजिरंगानि मैदेरनि अनजिमा जों रंजानाय।",
        medicinesTitle: "मुलि आरो दै",
        medicinesDesc: "मुलि लोंनाय आरो दै लोंनायनि गोसोखां होनाय।",
        reminiscenceTitle: "गोदोनि गोसोखां आरो सुर",
        reminiscenceDesc: "सिफुंनि सुर आरो बर' हारिमुनि गोजोन मेथाइ।",
        caregiverPortal: "सामलायगिरिनि ड्यासबर्ड",
        readScreen: "फरायना खोनासं",
        fontSize: "हांखोनि महर",
        highContrast: "रोजा रोखा",
        superEasyMode: "जोबोद गोरलै",
        calmBreathing: "गोजोन हांखो लानाय",
        breatheIn: "हांखो गोथौयै ला...",
        breatheHold: "थानो हो...",
        breatheOut: "लसायै हांखो गार...",

        gameMemoryTitle: "१. गोसोखां मिलायनाय",
        gameMemoryDesc: "खाडफोरखौ उल्थायना समान महर बासि।",
        gameAttentionTitle: "२. गोसो होनाय आनजाद",
        gameAttentionDesc: "गाहायनि महरफोरनि गेजेरनिफ्राय थार महरखौ बासि।",
        gameRecognitionTitle: "३. सिनायथि महर",
        gameRecognitionDesc: "बेयो बबे जायगानि महर? थार फिननायखौ बासि।",
        gameRhythmTitle: "४. खाम-सिफुंनि सुर",
        gameRhythmDesc: "दामनाय खोनासं आरो थारै फिन दाम।",
        gameSortingTitle: "५. हारिमुआरि सिनायथि साजायनाय",
        gameSortingDesc: "जाग्रा आरो गानग्रा-जोमग्राफोरखौ जुदा जुदा बासि।",
        gameFolktaleTitle: "६. सल' आरो जारिमिन",
        gameFolktaleDesc: "गोदोनि सल' आरो बर' जारिमिननि गोसोखां।",

        listenFirst: "सिगां सुरखौ खोनासं...",
        yourTurnNow: "दानिया नोंथांनि पालि, दाम!",
        wellDone: "जोबोद मोजां जादों! नोंथाङा मोजां गेलेबाय।",
        gentleTryAgain: "चिन्ता खालामनो नाङा, फै जों फिन नाजानि।",
        drinkWaterReminder: "आबै / आबौ, दै एसे लोंना ला।",
        medReminder: "मुलि लोंनायनि समा जाबाय।",
        hintPrompt: "संकेत: बे खाडखौ नाय!",
        calmMusic: "गोजोन सिफुं सुर",
        waterTracked: "जोबोद मोजां! नोंथाङा दै लोंबाय।"
      },
      hi: { // Hindi
        kinshipHonorific: "दादीजी / दादाजी (Dadiji / Dadaji)",
        welcomeGreeting: "प्रणाम दादीजी-दादाजी! आपका दिन सुखद और शांत रहे।",
        welcomeSub: "आइए मिलकर मन को ताजगी देने वाले सरल पारंपरिक खेल खेलें और आनंद लें।",
        playGames: "मस्तिष्क खेल (६ प्रकार)",
        playGamesDesc: "काजीरंगा, सुंदर चाय बागान और बीहू ढोल के साथ शांत मनभावन खेल।",
        medicinesTitle: "दवा और जल",
        medicinesDesc: "समय पर दवा लेने और पानी पीने की सरल दैनिक सूची।",
        reminiscenceTitle: "मधुर यादें और संगीत",
        reminiscenceDesc: "ब्रह्मपुत्र की शांत लहरें, बांसुरी की धुन और पूर्वोत्तर की धरोहर।",
        caregiverPortal: "देखभालकर्ता पोर्टल",
        readScreen: "सुनकर समझें",
        fontSize: "अक्षर आकार",
        highContrast: "स्पष्ट दृश्य",
        superEasyMode: "अति सरल मोड (Super Easy)",
        calmBreathing: "प्रशांत प्राणायाम (Calm Breathing)",
        breatheIn: "गहरी सांस अंदर लें...",
        breatheHold: "रोक कर रखें...",
        breatheOut: "धीरे-धीरे सांस छोड़ें...",

        gameMemoryTitle: "१. स्मृति मेल (जोड़ी मिलाएँ)",
        gameMemoryDesc: "कार्ड पलटकर सही जोड़ी मिलाएँ। कोई जल्दबाज़ी नहीं।",
        gameAttentionTitle: "२. एकाग्रता बिंदु",
        gameAttentionDesc: "दिखाए गए सांस्कृतिक प्रतीक को चित्रों में से पहचानें।",
        gameRecognitionTitle: "३. पहचाने हुए चेहरे व स्थल",
        gameRecognitionDesc: "यह कौन सा प्रसिद्ध स्थल या वस्तु है? सही उत्तर चुनें।",
        gameRhythmTitle: "४. बीहू ढोल-ताल (संगीत स्मृति)",
        gameRhythmDesc: "पारंपरिक वाद्यों की धुन सुनें और उसी ताल में बजाएँ।",
        gameSortingTitle: "५. सांस्कृतिक वर्गीकरण",
        gameSortingDesc: "व्यंजनों और पारंपरिक वस्त्रों को सही टोकरी में रखें।",
        gameFolktaleTitle: "६. लोककथा व इतिहास स्मरण",
        gameFolktaleDesc: "तेजिमोला और पूर्वोत्तर के गौरवशाली इतिहास की यादें।",

        listenFirst: "पहले धुन को ध्यान से सुनें...",
        yourTurnNow: "अब आपकी बारी है, उसी तरह बजाएँ!",
        wellDone: "बहुत सुंदर! आपने बहुत अच्छा किया।",
        gentleTryAgain: "कोई बात नहीं, आइए हम फिर से कोशिश करते हैं।",
        drinkWaterReminder: "दादाजी / दादीजी, थोड़ा पानी पी लीजिए।",
        medReminder: "दवा लेने का समय हो गया है।",
        hintPrompt: "संकेत: इस कार्ड को देखिए!",
        calmMusic: "मधुर बांसुरी का संगीत",
        waterTracked: "बहुत बढ़िया! आपने पानी पी लिया।"
      },
      en: { // English
        kinshipHonorific: "Grandma / Grandpa",
        welcomeGreeting: "Warm greetings Grandma & Grandpa! Wishing you peace.",
        welcomeSub: "Let's engage in pleasant memories, soothing sounds, and gentle brain exercises without rush.",
        playGames: "Brain Games Suite (6 Games)",
        playGamesDesc: "Relaxing games featuring Kaziranga, tea gardens, folk rhythm, and heritage.",
        medicinesTitle: "Medicines & Water",
        medicinesDesc: "Gentle reminders for hydration and daily scheduled medicines.",
        reminiscenceTitle: "Reminiscence & Melodies",
        reminiscenceDesc: "Brahmaputra breeze, bamboo flute melodies, and traditional memories.",
        caregiverPortal: "Caregiver Dashboard",
        readScreen: "Read Aloud",
        fontSize: "Font Size",
        highContrast: "High Contrast",
        superEasyMode: "Super Easy Mode",
        calmBreathing: "Calming Breathing (Pranayama)",
        breatheIn: "Breathe in deeply...",
        breatheHold: "Hold gently...",
        breatheOut: "Exhale slowly...",

        gameMemoryTitle: "1. Memory Meadow (Pair Match)",
        gameMemoryDesc: "Flip cards to find matching pairs of heritage symbols.",
        gameAttentionTitle: "2. Focus Point (Visual Spot)",
        gameAttentionDesc: "Spot the requested cultural item amongst the gentle collection.",
        gameRecognitionTitle: "3. Familiar Places & Faces",
        gameRecognitionDesc: "Recognize this famous heritage location or memory item.",
        gameRhythmTitle: "4. Bihu Dhol Taal (Folk Rhythm Memory)",
        gameRhythmDesc: "Listen to the traditional instrument pattern and play it back.",
        gameSortingTitle: "5. Heritage Baskets (Category Sorting)",
        gameSortingDesc: "Sort traditional delicacies vs crafts into their woven baskets.",
        gameFolktaleTitle: "6. Folktales & Legends",
        gameFolktaleDesc: "Recall classic folklore characters and historical Northeast legends.",

        listenFirst: "First, listen carefully to the rhythm...",
        yourTurnNow: "Now it is your turn, tap the instruments!",
        wellDone: "Wonderful job! You did so very well.",
        gentleTryAgain: "No worries at all, let's gently try together.",
        drinkWaterReminder: "Grandma / Grandpa, please take a comforting sip of water.",
        medReminder: "It is time for your scheduled medicine.",
        hintPrompt: "Hint: Look right here at this card!",
        calmMusic: "Serene Bamboo Flute",
        waterTracked: "Great! You have had a glass of water."
      }
    };
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  setLanguage(langCode) {
    if (this.translations[langCode]) {
      this.currentLang = langCode;
    }
  }

  t(key) {
    const langDict = this.translations[this.currentLang] || this.translations['en'];
    return langDict[key] || this.translations['en'][key] || key;
  }

  speak(text, lang = null) {
    if (!this.synth) return;
    this.synth.cancel();

    const speechText = text || this.t('welcomeGreeting');
    const utterance = new SpeechSynthesisUtterance(speechText);
    const targetLang = lang || this.currentLang;

    const langMap = {
      as: 'as-IN',
      bn: 'bn-IN',
      mni: 'mni-IN',
      kha: 'en-IN',
      brx: 'hi-IN',
      hi: 'hi-IN',
      en: 'en-IN'
    };

    utterance.lang = langMap[targetLang] || 'en-IN';
    utterance.rate = this.speechRate;
    utterance.pitch = 1.0;

    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang === utterance.lang || v.lang.includes('IN'));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    this.synth.speak(utterance);
  }

  // Speak a single phrase or button text on 1-click audio icon tap
  speakItem(itemText) {
    if (!itemText) return;
    this.speak(itemText);
  }

  // -------------------------------------------------------------
  // TRADITIONAL NORTH EAST FOLK INSTRUMENT PROCEDURAL SYNTHESIZERS
  // -------------------------------------------------------------

  // 1. BIHU DHOL (Traditional Double-Headed Bass & Slap Drum)
  playBihuDhol() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // Deep resonant drum body (Bass thump dropping from 160Hz to 45Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);

      // Slap noise component (skin impact)
      const slapOsc = ctx.createOscillator();
      const slapGain = ctx.createGain();
      slapOsc.type = 'triangle';
      slapOsc.frequency.setValueAtTime(320, now);
      slapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

      slapGain.gain.setValueAtTime(0.3, now);
      slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      slapOsc.connect(slapGain);
      slapGain.connect(ctx.destination);

      slapOsc.start(now);
      slapOsc.stop(now + 0.09);
    } catch (e) {
      console.warn("Dhol synth error:", e);
    }
  }

  // 2. PEPA (Buffalo Horn Reed Pipe - piercing melody note)
  playPepa() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now); // A4 note
      osc.frequency.exponentialRampToValueAtTime(466.16, now + 0.1); // subtle ornamentation slide
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.46);
    } catch (e) {
      console.warn("Pepa synth error:", e);
    }
  }

  // 3. TOKA (Assamese Bamboo Clapper)
  playToka() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // Resonant wood clack: 2 short resonant pulses
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.04);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      console.warn("Toka synth error:", e);
    }
  }

  // 4. TAAL (Bell Metal / Kanshi Cymbals)
  playTaal() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // Bright bell metal partials
      [1567.98, 2093.00, 3135.96].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.12 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.82);
      });
    } catch (e) {
      console.warn("Taal synth error:", e);
    }
  }

  // Standard Chime Success
  playChimeSuccess() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);

        gain.gain.setValueAtTime(0.001, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.3);
      });
    } catch (e) {
      console.warn("Audio Context sound error:", e);
    }
  }

  // Water Drop
  playWaterDrop() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn("Water audio error:", e);
    }
  }

  // Soft Tap
  playSoftTap() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      console.warn("Tap audio error:", e);
    }
  }

  // Serene Ambient Flute Drone
  toggleSereneSoundscape() {
    if (this.isAmbientPlaying) {
      this.stopSereneSoundscape();
      return false;
    } else {
      this.startSereneSoundscape();
      return true;
    }
  }

  startSereneSoundscape() {
    try {
      const ctx = this.getAudioContext();
      this.stopSereneSoundscape();

      const now = ctx.currentTime;
      const droneFreqs = [293.66, 440.00, 587.33];
      droneFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);

        gain.gain.setValueAtTime(0.02, now);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        this.ambientNodes.push({ osc, gain, filter });
      });

      this.isAmbientPlaying = true;
      return true;
    } catch (e) {
      console.warn("Ambient sound error:", e);
      return false;
    }
  }

  stopSereneSoundscape() {
    this.ambientNodes.forEach(node => {
      try {
        node.osc.stop();
        node.osc.disconnect();
      } catch (e) {}
    });
    this.ambientNodes = [];
    this.isAmbientPlaying = false;
  }
}

// Export singleton instance
window.VoiceNER = new VoiceNEREngine();
