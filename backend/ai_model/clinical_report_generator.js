/**
 * DELTA NEURONS - AI Clinical Dementia Diagnostic Report Generator
 * Generates comprehensive clinical staging assessments for the 7 Stages of Dementia
 */

const { classifyDementiaStage, STAGE_METADATA } = require('./model_classifier.js');

// Clinical Guideline Recommendations tailored by Dementia Stage (1 to 7)
const STAGE_CLINICAL_RECOMMENDATIONS = {
  1: {
    medical: [
      "Routine annual cognitive wellness screening.",
      "Cardiovascular risk management (blood pressure, lipid profile, glucose control).",
      "Nutritional guidance: Mediterranean-DASH Intervention for Neurodegenerative Delay (MIND diet) rich in antioxidants."
    ],
    games: [
      "Sriti Mel (স্মৃতি মেল - Memory Meadow) - Advanced pair matching",
      "Dhyan Bindu (ধ্যান বিন্দু - Focus Point) - Speed & selective attention",
      "Bihu Dhol Taal (বিহু ঢোল-তাল) - Complex multi-beat rhythmic recall"
    ],
    exercises: [
      "প্ৰশান্তি পদুম উশাহ (Calm Lotus Breathing - 4-4-4 Box pacing)",
      "আসন ২: পদ্ম হস্ত মুদ্ৰা আৰু উশাহ সম্প্ৰসাৰণ (Lotus Hands & Arm Expansion)",
      "আসন ৩: সুৰক্ষিত মেৰুদণ্ড মোচৰণ (Gentle Seated Chair Twist)"
    ],
    caregiverGuidance: [
      "Encourage active physical and social activities in the community.",
      "Support lifelong cognitive learning, reading, and musical engagement.",
      "No specialized daily living supervision needed at this stage."
    ],
    riskMonitoring: "Minimal risk. Maintain baseline cognitive scores."
  },
  2: {
    medical: [
      "Semi-annual cognitive baseline tracking (MMSE / MoCA).",
      "Evaluate vitamin B12, thyroid function (TSH), and sleep hygiene.",
      "Address subjective anxiety regarding memory slips with reassurance."
    ],
    games: [
      "Sriti Mel (Memory Meadow) - Moderate pair matching",
      "Chena Mukhor (চেনা মুখৰ - Familiar Landmarks Recognition)",
      "Bagicha Bheti (Cultural Sorting) - Categorization drills"
    ],
    exercises: [
      "ভ্ৰামৰী গুঞ্জন ধ্যান (Humming Bee Acoustic Resonance)",
      "আসন ১: শান্ত স্কন্ধ আৰু ডিঙি চালন (Chair Neck & Shoulder Mobility)",
      "প্ৰশান্তি পদুম উশাহ (Calm Lotus Breathing)"
    ],
    caregiverGuidance: [
      "Provide gentle organizational tools (calendars, reminder lists, medication organizers).",
      "Avoid drawing stressful attention to benign word-finding pauses.",
      "Encourage consistent hydration and restful sleep routines."
    ],
    riskMonitoring: "Low risk. Monitor for progression to mild cognitive impairment (MCI)."
  },
  3: {
    medical: [
      "Neurological evaluation for Mild Cognitive Impairment (MCI).",
      "Neuroimaging review (MRI/CT) and metabolic screening.",
      "Consider clinical trial eligibility or neuroprotective supplements (Omega-3 DHA, Vitamin E under guidance).",
      "Review prescription medications for anticholinergic cognitive burden."
    ],
    games: [
      "Dhyan Bindu (Focus Point) - Target recognition with gentle guidance",
      "Xadhu Kotha (সাধুকথা আৰু বুৰঞ্জী - Northeast Folktale Recall)",
      "Sriti Mel (Memory Meadow) - Assisted cultural pair matching"
    ],
    exercises: [
      "ভ্ৰামৰী গুঞ্জন ধ্যান (Humming Bee Breath - Vagus stimulation)",
      "নাড়ী শোধন শান্ত শ্বাস (Alternate Flow Balance)",
      "আসন ৪: গোড়ালি আৰু পদ চালন (Ankle Circles & Fall Prevention Flow)"
    ],
    caregiverGuidance: [
      "Assist subtly with complex financial decisions and appointment scheduling.",
      "Use Delta Neurons automated audio medication reminders.",
      "Maintain a predictable daily schedule to minimize stress and confusion."
    ],
    riskMonitoring: "Moderate risk of progression. Screen quarterly for instrumental task difficulties."
  },
  4: {
    medical: [
      "Clinical diagnosis of Early-Stage Dementia (Mild Alzheimer's / Vascular Dementia).",
      "Consider initiation of Acetylcholinesterase Inhibitors (Donepezil 5mg/day, Rivastigmine, or Galantamine).",
      "Driving assessment and legal/financial power of attorney planning.",
      "Management of concurrent depressive symptoms or apathy."
    ],
    games: [
      "Chena Mukhor (Reminiscence Places) - High visual familiarity",
      "Bihu Dhol Taal (Folk Rhythm) - 2-beat procedural memory reinforcement",
      "Bagicha Bheti (Cultural Sorting) - Super Easy category recognition"
    ],
    exercises: [
      "প্ৰশান্তি পদুম উশাহ (Guided Breathing Pacer - 60 seconds)",
      "আসন ১: শান্ত স্কন্ধ আৰু ডিঙি চালন (Seated Shoulder Release)",
      "আসন ৫: শান্ত অৱস্থা ধ্যানাসন (Mindful Rest Meditation)"
    ],
    caregiverGuidance: [
      "Direct supervision for medication adherence and financial affairs.",
      "Label kitchen cupboards and clothing drawers with clear visual icons.",
      "Support dignity and autonomy by offering simple choices between two options."
    ],
    riskMonitoring: "High risk for missed medications and getting lost outside familiar areas."
  },
  5: {
    medical: [
      "Evaluate dosage optimization of Acetylcholinesterase Inhibitors (e.g. Donepezil 10mg).",
      "Consider adding NMDA receptor antagonist (Memantine 5-10mg) if progressing.",
      "Regular assessment for nutritional intake, weight changes, and hydration.",
      "Manage sleep disturbances; consider gentle melatonin support."
    ],
    games: [
      "Xadhu Kotha (Folktales) - Passive listening and familiar Northeast audio stories",
      "Sriti Mel - 2-pair Super Easy Mode with unlimited visual hints",
      "Bihu Dhol Taal - Audio sensory tactile feedback"
    ],
    exercises: [
      "শীতলী প্ৰশান্ত শ্বাস (Cooling River Breeze - agitation reduction)",
      "আসন ৪: গোড়ালি আৰু পদ চালন (Lower Extremity Circulation)",
      "আসন ৫: শান্ত অৱস্থা ধ্যানাসন (Mindful Rest with Calming Flute)"
    ],
    caregiverGuidance: [
      "Assist with clothing selection appropriate for weather and season.",
      "Install door safety locks / wander monitors and identification bracelet.",
      "Establish evening calming routines to counter 'Sundowning' agitation.",
      "Ensure family caregivers receive respite support."
    ],
    riskMonitoring: "Severe disorientation risk; wandering danger; vulnerability to exploitation."
  },
  6: {
    medical: [
      "Memantine 10-20mg/day maintenance therapy.",
      "Careful evaluation of behavioral and psychological symptoms of dementia (BPSD).",
      "Non-pharmacological soothing protocols prioritized for agitation before any low-dose intervention.",
      "Fall risk assessment and physical therapy consultation."
    ],
    games: [
      "Folk Audio Melodies & Ambient Brahmaputra Flute (Passive Reminiscence)",
      "Tactile sensory stimulation with gentle rhythmic sounds",
      "Visual reminiscence photo browsing with family caregiver"
    ],
    exercises: [
      "মৃদু স্পৰ্শ আৰু স্নিগ্ধ উশাহ (Assisted Gentle Breathing Pacing)",
      "আসন ১: মৃদু হস্ত চালন (Assisted Seated Arm & Hand Mobilization)",
      "শীতল নদীৰ বতাহ উশাহ (Calming Cooling Breath)"
    ],
    caregiverGuidance: [
      "Full assistance required for bathing, toileting, and proper dress sequencing.",
      "Communicate with simple, reassuring 3-word phrases and warm eye contact.",
      "Prevent falls: clear walkways, non-slip mats, night lights.",
      "Monitor food intake and provide easy-to-chew finger foods."
    ],
    riskMonitoring: "Extreme fall risk, aspiration risk, sundowning agitation, incontinence management."
  },
  7: {
    medical: [
      "Palliative and comfort-focused dementia care plan.",
      "Swallowing evaluation (dysphagia screening); modified soft/pureed diet.",
      "Skin integrity management (pressure ulcer prevention, frequent repositioning).",
      "Pain assessment using observational scales (PAINAD)."
    ],
    games: [
      "Passive Soothing Music Therapy: Procedural Bihu Flute and Water Ambience",
      "Sensory touch therapy and familiar family voice recordings"
    ],
    exercises: [
      "প্ৰশান্ত শুশ্ৰূষা উশাহ (Passive Comfort Breathing with Aromatherapy)",
      "মৃদু সন্ধি মালিচ (Gentle assisted limb massage and passive range of motion)"
    ],
    caregiverGuidance: [
      "Continuous 24/7 compassionate physical care and skin maintenance.",
      "Speak in soothing, familiar tones even if verbal response is absent.",
      "Provide gentle mouth care and head elevation during assisted feeding.",
      "Prioritize comfort, warmth, and peaceful environment."
    ],
    riskMonitoring: "Critical care needs: aspiration pneumonia, infections, immobility complications."
  }
};

/**
 * Generate Full Clinical AI Report
 */
function generateClinicalDementiaReport(patientData, assessmentData, doctorInfo = null) {
  const classification = classifyDementiaStage(assessmentData);
  const stage = classification.predictedStage;
  const guidelines = STAGE_CLINICAL_RECOMMENDATIONS[stage] || STAGE_CLINICAL_RECOMMENDATIONS[1];
  const now = new Date();

  // Compute cognitive domain indices (0 - 100)
  const domains = {
    memory: Math.round(assessmentData.memory_recall || 65),
    executiveFunction: Math.round(((assessmentData.iadl_score || 7) / 10) * 100),
    attentionOrientation: Math.round(((assessmentData.orientation || 8) / 10) * 50 + ((assessmentData.attention_focus || 60) * 0.5)),
    languageFluency: Math.round(assessmentData.verbal_fluency || 70),
    functionalIndependence: Math.round((((assessmentData.badl_score || 9) * 0.6 + (assessmentData.iadl_score || 8) * 0.4) / 10) * 100),
    reactionSpeed: Math.max(10, Math.round(100 - ((assessmentData.game_reaction_time || 6.0) * 3.5)))
  };

  const riskFactors = [];
  if (assessmentData.mmse_score < 24) riskFactors.push("MMSE score indicates clinically significant cognitive impairment.");
  if (assessmentData.iadl_score < 6) riskFactors.push("Impaired Instrumental Activities of Daily Living (medication/finance management).");
  if (assessmentData.badl_score < 7) riskFactors.push("Deficits in Basic Activities of Daily Living requiring personal care assistance.");
  if (assessmentData.behavioral_symptoms > 4) riskFactors.push("Elevated behavioral/psychological symptoms (sundowning, agitation, or sleep disruption).");
  if (assessmentData.game_reaction_time > 8.0) riskFactors.push("Substantial psychomotor and neural processing latency observed in gameplay.");
  if (riskFactors.length === 0) riskFactors.push("No acute cognitive risk flags identified. Functioning within age-expected parameters.");

  const reportId = `DN-REP-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${Math.floor(1000 + Math.random()*9000)}`;

  return {
    reportId,
    generatedAt: now.toISOString(),
    formattedDate: now.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    patient: {
      id: patientData.id || 1,
      fullName: patientData.fullName || 'Bapuji Goswami',
      age: patientData.age || 72,
      location: patientData.location || 'Dispur, Guwahati (Assam)',
      gender: patientData.gender || 'Male',
      emergencyContact: patientData.emergencyContact || '+91 94350 98765'
    },
    evaluator: {
      name: doctorInfo ? doctorInfo.fullName : 'Dr. Hirendra Sharma (MD Neurology)',
      role: 'Clinical Neurologist & Geriatric Specialist',
      institution: 'Delta Neurons Clinical Neuropsychology Unit'
    },
    staging: {
      stageNumber: stage,
      stageName: classification.stageName,
      stageDescription: classification.stageDescription,
      clinicalCategory: classification.clinicalCategory,
      gdsEquivalent: classification.gdsEquivalent,
      confidencePct: classification.confidencePct,
      badgeColor: classification.badgeColor,
      allProbabilities: classification.stageProbabilities
    },
    clinicalScores: {
      mmse: assessmentData.mmse_score,
      iadl: assessmentData.iadl_score,
      badl: assessmentData.badl_score,
      memoryRecall: assessmentData.memory_recall,
      attentionFocus: assessmentData.attention_focus,
      verbalFluency: assessmentData.verbal_fluency,
      orientation: assessmentData.orientation,
      behavioralSymptoms: assessmentData.behavioral_symptoms,
      gameAccuracy: assessmentData.game_accuracy,
      gameReactionTimeSec: assessmentData.game_reaction_time
    },
    domainAnalysis: domains,
    riskFactors,
    carePlan: {
      pharmacologicalRecommendations: guidelines.medical,
      prescribedCognitiveGames: guidelines.games,
      prescribedChairYogaBreathing: guidelines.exercises,
      caregiverGuidance: guidelines.caregiverGuidance,
      riskMonitoringProtocol: guidelines.riskMonitoring
    }
  };
}

module.exports = {
  generateClinicalDementiaReport,
  STAGE_CLINICAL_RECOMMENDATIONS
};
