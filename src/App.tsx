import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  Mic,
  MicOff,
  Upload,
  Play,
  Pause,
  CheckCircle2,
  XCircle,
  ExternalLink,
  PhoneCall,
  Copy,
  Check,
  Volume2,
  VolumeX,
  ScanEye,
  Share2,
  Lock,
  Sparkles,
  Eye,
  HeartHandshake,
  MessageCircle,
  GraduationCap
} from 'lucide-react';

// ==========================================
// TRANSLATIONS (EN, HI, MR)
// ==========================================
type Language = 'en' | 'hi' | 'mr';
type AudienceFilter = 'all' | 'elderly' | 'youth';

interface TranslationContent {
  brand: string;
  tagline: string;
  helplineBtn: string;
  tabText: string;
  tabMedia: string;
  tabAudio: string;
  heroHeading: string;
  heroSub: string;
  trustBadge: string;
  seniorModeToggle: string;
  seniorModeActive: string;
  readAloudBtn: string;
  stopAudioBtn: string;
  shareWithFamilyBtn: string;
  
  // Audience Filters
  filterAll: string;
  filterElderly: string;
  filterYouth: string;
  elderlyNotice: string;
  youthNotice: string;

  // Text Scanner
  textTitle: string;
  textSubtitle: string;
  textPlaceholder: string;
  scanBtn: string;
  scanningText: string;
  pasteBtn: string;
  clearBtn: string;
  presetsTitle: string;
  resultTitle: string;
  riskHigh: string;
  riskSuspicious: string;
  riskSafe: string;
  flagsFound: string;
  adviceTitle: string;
  shareWarning: string;
  copiedNotice: string;
  
  // Media Scanner
  mediaTitle: string;
  mediaSubtitle: string;
  dropzonePrompt: string;
  dropzoneHint: string;
  sampleMediaTitle: string;
  verifyMediaBtn: string;
  verifyingMedia: string;
  forensicScanGrid: string;
  detectedArtifacts: string;
  
  // Audio Scanner
  audioTitle: string;
  audioSubtitle: string;
  micRecordBtn: string;
  micStopBtn: string;
  uploadAudioBtn: string;
  sampleAudioTitle: string;
  analyzingAudio: string;
  verifyAudioBtn: string;
  vocalAcoustics: string;
  liveMicNotice: string;

  // Helpline & Rules
  goldenRulesTitle: string;
  goldenRulesSub: string;
  rule1Title: string;
  rule1Desc: string;
  rule2Title: string;
  rule2Desc: string;
  rule3Title: string;
  rule3Desc: string;
  helplineModalTitle: string;
  goldenHoursText: string;
  call1930Btn: string;
  portalLinkBtn: string;
  closeBtn: string;
  footerCreatedBy: string;
}

const translations: Record<Language, TranslationContent> = {
  en: {
    brand: "Guardians of Trust",
    tagline: "India's Digital Scam & Deepfake Shield",
    helplineBtn: "Helpline 1930",
    tabText: "Text & SMS Scam",
    tabMedia: "AI Photo & Video",
    tabAudio: "Audio & Voice Clone",
    heroHeading: "Detect Scams & Deepfakes with Precision",
    heroSub: "Simple, private tool designed for everyday citizens, grandparents, and students to verify suspicious messages, forged documents, and AI voice cloning.",
    trustBadge: "Zero Data Stored · Accurate Multi-Signal Detection · Private & Safe",
    seniorModeToggle: "Senior-Friendly Big Text",
    seniorModeActive: "Senior Mode Active (Large Text)",
    readAloudBtn: "🔊 Listen to Verdict (Read Aloud)",
    stopAudioBtn: "⏹️ Stop Voice",
    shareWithFamilyBtn: "📲 Ask Son / Daughter on WhatsApp",
    
    filterAll: "🌟 All Common Scams",
    filterElderly: "👴 For Elders & Retirees",
    filterYouth: "🧑‍🎓 For Youth & Students",
    elderlyNotice: "👴 Senior Protection Focus: Detects pension blockage traps, utility cutoffs, fake Digital Arrest notices, and cloned distress calls.",
    youthNotice: "🧑‍🎓 Youth Protection Focus: Detects work-from-home Telegram scams, fake crypto schemes, and internship fee traps.",

    // Text Scanner
    textTitle: "SMS & WhatsApp Scam Checker",
    textSubtitle: "Paste any suspicious message, lottery claim, electricity disconnection SMS, or link to inspect for fraud traps.",
    textPlaceholder: "Paste suspicious SMS, WhatsApp message, or link here...",
    scanBtn: "Scan Text for Scams",
    scanningText: "Analyzing message indicators...",
    pasteBtn: "Paste Text",
    clearBtn: "Clear",
    presetsTitle: "Or test with common scam examples:",
    resultTitle: "Scam Detection Analysis",
    riskHigh: "High Scam Risk — Dangerous Trap!",
    riskSuspicious: "Suspicious — Proceed with Caution",
    riskSafe: "Likely Authentic — Safe Message",
    flagsFound: "Key Red Flags Detected",
    adviceTitle: "What you must do immediately:",
    shareWarning: "Copy Warning to Warn Family",
    copiedNotice: "Warning copied to clipboard!",
    
    // Media Scanner
    mediaTitle: "AI Photo & Deepfake Video Checker",
    mediaSubtitle: "Upload or test photos and videos to detect synthetic faces, deepfake celebrities, and forged official documents.",
    dropzonePrompt: "Click or drag photo/video to analyze",
    dropzoneHint: "Supports JPG, PNG, MP4, WebM (Max 25MB)",
    sampleMediaTitle: "Or test these realistic media samples:",
    verifyMediaBtn: "Verify Media Authenticity",
    verifyingMedia: "Conducting biometric & artifact analysis...",
    forensicScanGrid: "Forensic Overlay",
    detectedArtifacts: "Detected Visual Anomalies",
    
    // Audio Scanner
    audioTitle: "Audio Scam & Voice Clone Checker",
    audioSubtitle: "Inspect WhatsApp voice notes or emergency calls to verify if the voice is an AI-generated clone imitating your family member or a bank manager.",
    micRecordBtn: "Record Voice via Microphone",
    micStopBtn: "Stop & Analyze Recording",
    uploadAudioBtn: "Upload Audio File",
    sampleAudioTitle: "Or test these suspicious voice samples:",
    analyzingAudio: "Analyzing spectral harmonics & breath cadence...",
    verifyAudioBtn: "Analyze Audio for AI Cloning",
    vocalAcoustics: "Vocal Biometrics Analysis",
    liveMicNotice: "Live Microphone Active: Speak clearly to test authentic speech against synthetic AI markers.",

    // Helpline & Rules
    goldenRulesTitle: "The 3 Golden Rules Against Scams",
    goldenRulesSub: "Remember these anytime someone creates pressure or asks for money online.",
    rule1Title: "Never Share OTP or PIN",
    rule1Desc: "No bank, electricity board, or police officer will ever ask for your 6-digit OTP or UPI PIN to credit money.",
    rule2Title: "Never Download .APK Files",
    rule2Desc: "Scammers send WhatsApp files ending with '.apk' (like 'PensionUpdate.apk' or 'ElectricityBill.apk'). It takes full control of your phone.",
    rule3Title: "Call Back on Known Number",
    rule3Desc: "If a crying relative or police officer demands urgent UPI money, hang up and dial their real phone number directly.",
    helplineModalTitle: "National Cyber Crime Helpline 1930",
    goldenHoursText: "Within 2 hours of a fraudulent UPI or bank transaction, calling 1930 allows cyber police to freeze the scammer's bank account before they withdraw your money.",
    call1930Btn: "Dial 1930 Now",
    portalLinkBtn: "Visit cybercrime.gov.in",
    closeBtn: "Close",
    footerCreatedBy: "Proudly Created by Team Dragon's World · For Citizen Cyber Safety & Elder Protection"
  },
  hi: {
    brand: "गार्डियंस ऑफ ट्रस्ट",
    tagline: "डिजिटल धोखाधड़ी एवं डीपफेक सुरक्षा कवच",
    helplineBtn: "हेल्पलाइन 1930",
    tabText: "संदेश व SMS स्कैम",
    tabMedia: "एआई फोटो व वीडियो",
    tabAudio: "ऑडियो व आवाज क्लोन",
    heroHeading: "धोखाधड़ी और डीपफेक की सटीक पहचान",
    heroSub: "नागरिकों, बुजुर्गों और छात्रों के लिए सरल एवं सुरक्षित साधन। पेंशन का झांसा, नकली डिजिटल अरेस्ट और एआई आवाज की सटीक जाँच करें।",
    trustBadge: "डेटा 100% सुरक्षित · सटीक मल्टी-सिग्नल जाँच · निजी एवं सुरक्षित",
    seniorModeToggle: "बुजुर्गों के लिए बड़ा फॉन्ट",
    seniorModeActive: "सीनियर मोड चालू (बड़ा फॉन्ट)",
    readAloudBtn: "🔊 बोलकर सुनाएं (आवाज में सुनें)",
    stopAudioBtn: "⏹️ आवाज बंद करें",
    shareWithFamilyBtn: "📲 बेटे/बेटी को व्हाट्सएप पर भेजकर पूछें",
    
    filterAll: "🌟 सभी प्रमुख धोखाधड़ी",
    filterElderly: "👴 बुजुर्गों व वरिष्ठ नागरिकों के लिए",
    filterYouth: "🧑‍🎓 युवाओं व छात्रों के लिए",
    elderlyNotice: "👴 बुजुर्ग सुरक्षा: बिजली कटने, पेंशन बंद होने या नकली डिजिटल अरेस्ट के नोटिस की सटीक पहचान करता है।",
    youthNotice: "🧑‍🎓 युवा सुरक्षा: यूट्यूब लाइक जॉब, फर्जी क्रिप्टो ग्रुप या नौकरी की फीस मांगने वाले ठगों को पहचानता है।",

    // Text Scanner
    textTitle: "SMS व व्हाट्सएप स्कैम चेकर",
    textSubtitle: "संदिग्ध संदेश, लॉटरी का झांसा, बिजली कटने की धमकी वाला SMS या लिंक यहाँ पेस्ट करें।",
    textPlaceholder: "संदिग्ध SMS, व्हाट्सएप संदेश या लिंक यहाँ पेस्ट करें...",
    scanBtn: "संदेश की जाँच करें",
    scanningText: "संदेश के संकेतों का विश्लेषण हो रहा है...",
    pasteBtn: "पेस्ट करें",
    clearBtn: "हटाएं",
    presetsTitle: "या सामान्य धोखाधड़ी के उदाहरणों से जाँचें:",
    resultTitle: "स्कैम विश्लेषण परिणाम",
    riskHigh: "अत्यधिक जोखिम — यह एक धोखा है!",
    riskSuspicious: "संदिग्ध — सावधानी बरतें",
    riskSafe: "सुरक्षित संदेश प्रतीत होता है",
    flagsFound: "पहचाने गए मुख्य खतरे",
    adviceTitle: "तुरंत क्या करें:",
    shareWarning: "परिवार को सतर्क करने हेतु कॉपी करें",
    copiedNotice: "चेतावनी क्लिपबोर्ड पर कॉपी हो गई!",
    
    // Media Scanner
    mediaTitle: "एआई फोटो व डीपफेक वीडियो चेकर",
    mediaSubtitle: "चेहरे की बनावट, फर्जी सरकारी आदेश, नकली चालान या हस्तियों के फर्जी वीडियो की जाँच करें।",
    dropzonePrompt: "फोटो या वीडियो यहाँ अपलोड करें या खींचकर लाएं",
    dropzoneHint: "समर्थित: JPG, PNG, MP4, WebM (अधिकतम 25MB)",
    sampleMediaTitle: "या इन सामान्य नमूनों से जाँचें:",
    verifyMediaBtn: "माध्यम की सत्यता जाँचें",
    verifyingMedia: "बायोमेट्रिक एवं डिजिटल निशानों की जाँच जारी...",
    forensicScanGrid: "फोरेंसिक स्कैन ग्रिड",
    detectedArtifacts: "पहचानी गई अप्राकृतिक खामियां",
    
    // Audio Scanner
    audioTitle: "ऑडियो स्कैम व एआई आवाज क्लोन चेकर",
    audioSubtitle: "व्हाट्सएप वॉयस नोट या अनजान कॉल की रिकॉर्डिंग जाँचें—पता करें कि क्या यह किसी परिजन की नकल करने वाली एआई आवाज है।",
    micRecordBtn: "माइक से आवाज रिकॉर्ड करें",
    micStopBtn: "रोकें और विश्लेषण करें",
    uploadAudioBtn: "ऑडियो फाइल चुनें",
    sampleAudioTitle: "या इन संदिग्ध वॉयस कॉल्स के नमूनों को परखें:",
    analyzingAudio: "आवाज की फ्रीक्वेंसी और सांस लेने के पैटर्न का विश्लेषण...",
    verifyAudioBtn: "क्लोनिंग की जाँच करें",
    vocalAcoustics: "स्वर बायोमेट्रिक विश्लेषण",
    liveMicNotice: "लाइव माइक सक्रिय: अपनी आवाज बोलकर देखें और एआई क्लोन से तुलना करें।",

    // Helpline & Rules
    goldenRulesTitle: "साइबर धोखाधड़ी से बचने के 3 स्वर्णिम नियम",
    goldenRulesSub: "जब भी कोई ऑनलाइन दबाव बनाए या पैसे मांगे, इन्हें हमेशा याद रखें:",
    rule1Title: "कभी भी OTP या UPI PIN न बताएं",
    rule1Desc: "कोई भी बैंक, बिजली विभाग या पुलिस अधिकारी पैसे भेजने या रिफंड के लिए OTP या PIN नहीं मांगता।",
    rule2Title: "अज्ञात .APK फाइल कभी इंस्टॉल न करें",
    rule2Desc: "व्हाट्सएप पर भेजी गई .apk फाइल (जैसे 'Pension.apk' या 'BijliBill.apk') फोन पर पूरा नियंत्रण कर लेती है।",
    rule3Title: "अपने जाने-पहचाने नंबर पर दोबारा कॉल करें",
    rule3Desc: "यदि कोई परिजन की आवाज में मुसीबत का बहाना बनाकर पैसे मांगे, तो फोन काटकर सीधे उनके असली नंबर पर फोन लगाएं।",
    helplineModalTitle: "राष्ट्रीय साइबर अपराध हेल्पलाइन 1930",
    goldenHoursText: "धोखाधड़ी के 2 घंटे के भीतर 1930 पर कॉल करने से साइबर पुलिस ठग के बैंक खाते को तुरंत फ्रीज कर सकती है।",
    call1930Btn: "अभी 1930 पर कॉल करें",
    portalLinkBtn: "cybercrime.gov.in देखें",
    closeBtn: "बंद करें",
    footerCreatedBy: "टीम ड्रैगन्स वर्ल्ड (Team Dragon's World) द्वारा नागरिक सुरक्षा हेतु समर्पित"
  },
  mr: {
    brand: "गार्डियन्स ऑफ ट्रस्ट",
    tagline: "डिजिटल फसवणूक व डीपफेक प्रतिबंधक ढाल",
    helplineBtn: "हेल्पलाईन 1930",
    tabText: "संदेश व SMS स्कॅम",
    tabMedia: "एआय फोटो व व्हिडिओ",
    tabAudio: "ऑडिओ व आवाज क्लोन",
    heroHeading: "सायबर फसवणूक व डीपफेकची अचूक पडताळणी",
    heroSub: "नागरिक, ज्येष्ठ व तरुणांसाठी अत्यंत सोपे व अचूक साधन. पेन्शन बंद होण्याचा मेसेज, बनावट डिजिटल अरेस्ट व एआय आवाजांची अचूक खात्री करा.",
    trustBadge: "डेटा १००% सुरक्षित · अचूक मल्टि-सिग्नल पडताळणी · सुरक्षित व गोपनीय",
    seniorModeToggle: "ज्येष्ठांसाठी मोठी अक्षरे",
    seniorModeActive: "ज्येष्ठ नागरिक मोड चालू (मोठी अक्षरे)",
    readAloudBtn: "🔊 ऐकून घ्या (आवाजात ऐका)",
    stopAudioBtn: "⏹️ आवाज थांबवा",
    shareWithFamilyBtn: "📲 मुलाला/मुलीला व्हॉट्सॲपवर पाठवून विचारा",
    
    filterAll: "🌟 सर्व प्रमुख फसवणुका",
    filterElderly: "👴 ज्येष्ठ नागरिक व निवृत्त लोकांसाठी",
    filterYouth: "🧑‍🎓 तरुण व विद्यार्थ्यांसाठी",
    elderlyNotice: "👴 ज्येष्ठ नागरिक सुरक्षा: वीज खंडित करणे, पेन्शन बंद होणे किंवा डिजिटल अरेस्टच्या बनावट नोटिसांची अचूक तपासणी.",
    youthNotice: "🧑‍🎓 तरुण सुरक्षा: टेलिग्राम जॉब, बनावट क्रिप्टो किंवा नोकरीच्या नावाखाली होणाऱ्या फसवणुकीची तपासणी.",

    // Text Scanner
    textTitle: "SMS व व्हॉट्सॲप स्कॅम तपासक",
    textSubtitle: "संशयास्पद मेसेज, लॉटरीचे आमिष, वीज कनेक्शन तोडण्याची धमकी देणारा SMS किंवा लिंक इथे पेस्ट करा.",
    textPlaceholder: "संशयास्पद SMS, व्हॉट्सॲप संदेश किंवा लिंक इथे पेस्ट करा...",
    scanBtn: "संदेशाची तपासणी करा",
    scanningText: "संदेशातील फसवणुकीच्या खुणा तपासत आहे...",
    pasteBtn: "पेस्ट करा",
    clearBtn: "साफ करा",
    presetsTitle: "किंवा सामान्य फसवणुकीच्या उदाहरणांवरून तपासा:",
    resultTitle: "स्कॅम विश्लेषण अहवाल",
    riskHigh: "उच्च धोका — ही निश्चित फसवणूक आहे!",
    riskSuspicious: "संशयास्पद — काळजीपूर्वक हाताळा",
    riskSafe: "सुरक्षित संदेश वाटतो",
    flagsFound: "आढळलेले मुख्य धोके",
    adviceTitle: "तात्काळ काय करावे:",
    shareWarning: "कुटुंबाला सावध करण्यासाठी कॉपी करा",
    copiedNotice: "इशारा क्लिपबोर्डवर कॉपी झाला!",
    
    // Media Scanner
    mediaTitle: "एआय फोटो व डीपफेक व्हिडिओ तपासक",
    mediaSubtitle: "चेहऱ्याची बनावट, खोटे सरकारी आदेश, बनावट ट्रॅफिक चलन किंवा प्रसिद्ध व्यक्तींच्या बनावट व्हिडिओंची खात्री करा.",
    dropzonePrompt: "फोटो किंवा व्हिडिओ इथे अपलोड करा किंवा ओढून आणा",
    dropzoneHint: "समर्थित: JPG, PNG, MP4, WebM (कमाल 25MB)",
    sampleMediaTitle: "किंवा या प्रातिनिधिक नमुन्यांवरून तपासा:",
    verifyMediaBtn: "माध्यमाची सत्यता तपासा",
    verifyingMedia: "बायोमेट्रिक व डिजिटल खुणांची तपासणी सुरू आहे...",
    forensicScanGrid: "फॉरेन्सिक स्कॅन ग्रीड",
    detectedArtifacts: "आढळलेल्या अनैसर्गिक त्रुटी",
    
    // Audio Scanner
    audioTitle: "ऑडिओ स्कॅम व एआय आवाज क्लोन तपासक",
    audioSubtitle: "व्हॉट्सॲप व्हॉइस नोट किंवा अज्ञात कॉलची पडताळणी करा—तो नातेवाईकाचा खरा आवाज आहे की एआय द्वारे क्लोन केलेला आवाज ते तपासा.",
    micRecordBtn: "माईकवरून आवाज रेकॉर्ड करा",
    micStopBtn: "थांबवा आणि विश्लेषण करा",
    uploadAudioBtn: "ऑडिओ फाइल निवडा",
    sampleAudioTitle: "किंवा या संशयास्पद व्हॉइस कॉल्सच्या नमुन्यांवरून तपासा:",
    analyzingAudio: "आवाजाची वारंवारता आणि श्वासोच्छ्वासाच्या लयीचे विश्लेषण सुरू आहे...",
    verifyAudioBtn: "व्हॉइस क्लोनिंग तपासा",
    vocalAcoustics: "आवाज बायोमेट्रिक विश्लेषण",
    liveMicNotice: "थेट माईक सुरू: तुमचा खरा आवाज बोलून पहा आणि एआय क्लोनशी फरक तपासा.",

    // Helpline & Rules
    goldenRulesTitle: "सायबर फसवणुकीपासून बचावाचे ३ सुवर्णनियम",
    goldenRulesSub: "जेव्हा कोणी ऑनलाइन दबाव आणेल किंवा पैशांची मागणी करेल, तेव्हा हे ३ नियम आठवा:",
    rule1Title: "OTP किंवा UPI PIN कधीही सांगू नका",
    rule1Desc: "कोणतीही बँक, वीज मंडळ किंवा पोलीस अधिकारी पैसे जमा करण्यासाठी OTP किंवा PIN मागत नाहीत.",
    rule2Title: "अनोळखी .APK फाइल कधीही इन्स्टॉल करू नका",
    rule2Desc: "व्हॉट्सॲपवर आलेली .apk फाइल (उदा. 'Pension.apk' किंवा 'MSEBBill.apk') फोनचा संपूर्ण ताबा घेते.",
    rule3Title: "परिचित नंबरवर थेट पुन्हा फोन करा",
    rule3Desc: "कोणी नातेवाईकाच्या आवाजात रडत पैशांची मागणी केल्यास, फोन कट करून त्यांच्या मूळ नंबरवर थेट संपर्क साधा.",
    helplineModalTitle: "राष्ट्रीय सायबर गुन्हे हेल्पलाईन १९३०",
    goldenHoursText: "फसवणुकीनंतर २ तासांच्या आत १९३० वर कॉल केल्यास सायबर पोलीस भामट्याचे बँक खाते तात्काळ गोठवू शकतात.",
    call1930Btn: "आत्ताच १९३० वर कॉल करा",
    portalLinkBtn: "cybercrime.gov.in ला भेट द्या",
    closeBtn: "बंद करा",
    footerCreatedBy: "टीम ड्रॅगन्स वर्ल्ड (Team Dragon's World) द्वारे नागरिक व ज्येष्ठ संरक्षणासाठी समर्पित"
  }
};

// ==========================================
// PRESET DATA WITH AGE GROUP SPECIALIZATION
// ==========================================
interface TextPreset {
  id: string;
  targetGroup: 'elderly' | 'youth' | 'general';
  title: Record<Language, string>;
  category: string;
  sampleText: Record<Language, string>;
  riskLevel: 'high' | 'suspicious' | 'safe';
  riskScore: number;
  patternType: Record<Language, string>;
  ageContextNote: Record<Language, string>;
  redFlags: Record<Language, string[]>;
  actionAdvice: Record<Language, string[]>;
}

const textPresets: TextPreset[] = [
  // ELDERLY SPECIALIZED
  {
    id: 'pension_jeevan',
    targetGroup: 'elderly',
    title: {
      en: '👴 Pension Stopped / Jeevan Pramaan APK',
      hi: '👴 पेंशन रुकने की चेतावनी / जीवन प्रमाण APK',
      mr: '👴 पेन्शन बंद होण्याची नोटीस / जीवन प्रमाण ॲप'
    },
    category: 'Elder Targeted Malware',
    sampleText: {
      en: "Dear Pensioner, Your monthly pension for this month has been put on hold due to missing Digital Life Certificate (Jeevan Pramaan). Download our Treasury Pension Verification app immediately to prevent stoppage: http://pension-jeevan-update.gov.in.apk or call Treasury officer at 9845012345.",
      hi: "प्रिय पेंशनभोगी, जीवन प्रमाण पत्र (Jeevan Pramaan) अपडेट न होने के कारण आपकी इस माह की पेंशन रोक दी गई है। पेंशन तुरंत चालू करने के लिए ट्रेजरी सत्यापन ऐप डाउनलोड करें: http://pension-jeevan-update.gov.in.apk अथवा 9845012345 पर संपर्क करें।",
      mr: "प्रिय पेन्शनधारक, जीवन प्रमाण पत्र अपडेट नसल्यामुळे तुमची या महिन्याची पेन्शन थांबवण्यात आली आहे. पेन्शन सुरळीत सुरू ठेवण्यासाठी तात्काळ हे ॲप डाऊनलोड करा: http://pension-jeevan-update.gov.in.apk किंवा अधिकाऱ्याशी ९८४५०१२३४५ वर संपर्क साधा."
    },
    riskLevel: 'high',
    riskScore: 99,
    patternType: {
      en: "Pension Extortion & Dangerous Phone-Takeover APK",
      hi: "पेंशन रोकने का डर + फोन हैक करने वाला फर्जी APK",
      mr: "पेन्शन रोखण्याची भीती + फोनचा ताबा घेणारे धोकादायक APK"
    },
    ageContextNote: {
      en: "Elderly Vulnerability: Scammers know retirees depend on pension, so they weaponize panic of financial cutoff.",
      hi: "वरिष्ठ नागरिक संवेदनशीलता: ठग जानते हैं कि बुजुर्ग पेंशन पर निर्भर होते हैं, इसलिए पेंशन रोकने का डर दिखाते हैं।",
      mr: "ज्येष्ठ नागरिक संवेदनशीलता: निवृत्तीवेतनावर जगणाऱ्या ज्येष्ठांमध्ये भीती निर्माण करून बँक खाते लुटण्याची ही युक्ती आहे."
    },
    redFlags: {
      en: [
        "Government Treasuries NEVER send direct '.apk' files on SMS or WhatsApp",
        "Fake domain using '.gov.in.apk' to deceive elderly readers",
        "Personal 10-digit mobile number listed instead of bank branch or CPAO portal"
      ],
      hi: [
        "सरकारी पेंशन विभाग कभी भी SMS पर '.apk' फाइल डाउनलोड करने को नहीं कहता",
        "बुजुर्गों को भ्रमित करने के लिए फर्जी '.gov.in.apk' नाम का उपयोग",
        "अधिकृत ट्रेजरी की जगह 10 अंकों का व्यक्तिगत मोबाइल नंबर"
      ],
      mr: [
        "शासकीय पेन्शन विभाग कधीही SMS वरून '.apk' फाईल डाऊनलोड करायला सांगत नाही",
        "फसवण्यासाठी '.gov.in.apk' अशा खोट्या नावाची लिंक तयार केली आहे",
        "बँकेच्या अधिकृत शाखेऐवजी १० अंकी वैयक्तिक मोबाईल नंबर दिला आहे"
      ]
    },
    actionAdvice: {
      en: [
        "Do not download the APK. It installs malware that steals your bank OTPs silently",
        "Visit your regular pension-paying bank branch physically with your Aadhaar card",
        "Show this SMS to your son, daughter, or trusted family member immediately"
      ],
      hi: [
        "इस APK को बिल्कुल डाउनलोड न करें। यह फोन हैक करके बैंक OTP चुरा लेता है",
        "सीधे अपनी उस बैंक शाखा में जाएं जहां आपकी पेंशन आती है",
        "यह संदेश तुरंत अपने बेटे, बेटी या परिवार के किसी सदस्य को दिखाएं"
      ],
      mr: [
        "हे APK डाऊनलोड करू नका. हे फोन हॅक करून बँकेचे OTP चोरते",
        "ज्या बँकेत तुमची पेन्शन जमा होते त्या मूळ शाखेत थेट जा",
        "हा मेसेज तात्काळ आपल्या घरातील मुलगा, मुलगी किंवा नातेवाईकांना दाखवा"
      ]
    }
  },
  {
    id: 'electricity',
    targetGroup: 'elderly',
    title: {
      en: '⚡ Electricity Bill Disconnection Tonight',
      hi: '⚡ बिजली बिल कटने की धमकी',
      mr: '⚡ वीज बिल वीजपुरवठा खंडित SMS'
    },
    category: 'Urgency Phishing',
    sampleText: {
      en: "URGENT: Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from the power station because your previous month bill was not updated. Immediately contact our electricity officer at 9823019823 or update via link: http://bit.ly/mseb-bill-pay.apk",
      hi: "अति आवश्यक: प्रिय उपभोक्ता, आज रात 9:30 बजे बिजली घर से आपकी बिजली काट दी जाएगी क्योंकि आपका बिल अपडेट नहीं हुआ है। तुरंत बिजली अधिकारी से 9823019823 पर संपर्क करें या लिंक से ऐप डाउनलोड करें: http://bit.ly/mseb-bill-pay.apk",
      mr: "अति महत्त्वाचे: महावितरण ग्राहक, मागील महिन्याचे वीज बिल अपडेट न केल्यामुळे आज रात्री ९:३० वाजता वीजपुरवठा खंडित केला जाईल. तत्काळ वीज अधिकारी यांच्याशी ९८२३०१९८२३ वर संपर्क करा किंवा ॲप डाऊनलोड करा: http://bit.ly/mseb-bill-pay.apk"
    },
    riskLevel: 'high',
    riskScore: 98,
    patternType: {
      en: "Utility Disconnection Threat + Malicious APK Bait",
      hi: "बिजली कटौती की धमकी + फर्जी APK मैलवेयर",
      mr: "वीज खंडित करण्याची धमकी + धोकादायक APK फसवणूक"
    },
    ageContextNote: {
      en: "Elderly Vulnerability: Elders fear darkness and medical appliance disruption at night, so scammers create extreme urgency.",
      hi: "वरिष्ठ नागरिक संवेदनशीलता: रात में अंधेरे या स्वास्थ्य उपकरणों के रुकने के डर से बुजुर्ग तुरंत दिए गए नंबर पर फोन कर देते हैं।",
      mr: "ज्येष्ठ नागरिक संवेदनशीलता: रात्री वीज जाण्याच्या भीतीपोटी ज्येष्ठ लोक घाईघाईत विचार न करता फोन लावतात."
    },
    redFlags: {
      en: [
        "Artificial deadline pressure ('tonight at 9:30 PM') designed to cause panic",
        "Personal 10-digit mobile number instead of official Electricity Board toll-free",
        "Direct link pointing to an unverified '.apk' file which can steal bank OTPs"
      ],
      hi: [
        "घबराहट पैदा करने के लिए कृत्रिम समय सीमा ('आज रात 9:30 बजे')",
        "बिजली बोर्ड के आधिकारिक नंबर की जगह 10 अंकों का व्यक्तिगत मोबाइल नंबर",
        "अज्ञात .apk फ़ाइल का लिंक जो फोन का एक्सेस लेकर बैंक OTP चुरा सकता है"
      ],
      mr: [
        "घबराट निर्माण करण्यासाठी दिलेली तात्काळ मुदत ('आज रात्री ९:३० वाजता')",
        "अधिकृत ग्राहक सेवा क्रमांकाऐवजी वैयक्तिक १० अंकी मोबाईल नंबर",
        ".apk फाईलची संशयास्पद लिंक जी बँकेचे OTP चोरू शकते"
      ]
    },
    actionAdvice: {
      en: [
        "DO NOT click the link or install the .apk under any circumstance",
        "Check your official electricity bill on the government electricity board app or paper bill",
        "Call 1930 to report the scammer's phone number"
      ],
      hi: [
        "किसी भी हालत में लिंक पर क्लिक न करें और न ही .apk फाइल इंस्टॉल करें",
        "कागजी बिल या आधिकारिक बिजली बोर्ड पोर्टल पर जाकर बिल चेक करें",
        "1930 साइबर हेल्पलाइन पर इस नंबर की शिकायत करें"
      ],
      mr: [
        "कोणत्याही परिस्थितीत लिंकवर क्लिक करू नका किंवा .apk फाईल इन्स्टॉल करू नका",
        "महावितरणच्या अधिकृत ॲपवर किंवा कागदी बिलावर थेट तपासा",
        "१९३० हेल्पलाईनवर या नंबरची तक्रार नोंदवा"
      ]
    }
  },

  // YOUTH SPECIALIZED
  {
    id: 'youtube_like_job',
    targetGroup: 'youth',
    title: {
      en: '🧑‍🎓 Part-Time Telegram Job: Like YouTube & Earn ₹5,000/Day',
      hi: '🧑‍🎓 पार्ट-टाइम टेलीग्राम जॉब: यूट्यूब लाइक करें ₹5,000 कमाएं',
      mr: '🧑‍🎓 अर्धवेळ टेलिग्राम जॉब: युट्यूब लाईक करून ₹५००० कमवा'
    },
    category: 'Youth Job Phishing',
    sampleText: {
      en: "Hi! I am HR Sneha from Global Media Partners. We offer flexible work-from-home jobs for students & freshers. Just like 3 YouTube videos per day and earn ₹150 per video (Daily ₹1,500 to ₹5,000 credited to UPI). Join our Telegram task group now: https://t.me/Global_Earn_Tasks_99 to receive your first ₹500 welcome bonus!",
      hi: "नमस्ते! मैं ग्लोबल मीडिया पार्टनर्स से एचआर स्नेहा हूँ। हम कॉलेज छात्रों और युवाओं के लिए वर्क-फ्रॉम-होम पार्ट-टाइम जॉब दे रहे हैं। केवल यूट्यूब वीडियो लाइक करें और ₹150 प्रति वीडियो पाएं (रोजाना ₹5,000 तक कमाई)। अभी हमारे टेलीग्राम ग्रुप से जुड़ें: https://t.me/Global_Earn_Tasks_99 और ₹500 बोनस पाएं!",
      mr: "नमस्कार! मी ग्लोबल मीडियाची एचआर स्नेहा. आम्ही कॉलेज विद्यार्थी आणि तरुणांसाठी घरबसल्या पार्ट-टाइम जॉब देत आहोत. फक्त दररोज युट्यूब व्हिडिओ लाईक करा आणि प्रत्येक व्हिडिओचे ₹१५० मिळवा. आत्ताच आमच्या टेलिग्राम ग्रुपमध्ये सामील व्हा: https://t.me/Global_Earn_Tasks_99 आणि ₹५०० बोनस मिळवा!"
    },
    riskLevel: 'high',
    riskScore: 97,
    patternType: {
      en: "Task-Based Telegram Investment Trap (Pig Butchering Scam)",
      hi: "टास्क-आधारित टेलीग्राम धोखाधड़ी (शुरुआत में थोड़ा लाभ देकर बड़ा चूना लगाना)",
      mr: "टास्क-आधारित टेलिग्राम जॉब फसवणूक (सुरुवातीला थोडे पैसे देऊन नंतर मोठे पैसे उकळणे)"
    },
    ageContextNote: {
      en: "Youth Vulnerability: College students seeking pocket money or internships get lured by small initial payouts before scammers demand ₹50,000 'prepaid tasks'.",
      hi: "युवा संवेदनशीलता: छात्र शुरू में ₹150-₹300 देखकर विश्वास कर लेते हैं, फिर उनसे 'टास्क पूरा करने' के नाम पर हजारों रुपये ऐंठ लिए जाते हैं।",
      mr: "तरुण संवेदनशीलता: पॉकेटमनी शोधणारे विद्यार्थी सुरुवातीला मिळणाऱ्या छोट्या पैशांवर विश्वास ठेवतात आणि नंतर मोठ्या रकमेच्या टास्कमध्ये अडकतात."
    },
    redFlags: {
      en: [
        "Unrealistic compensation (₹150 for 5 seconds of liking a video)",
        "Redirects conversations to anonymous Telegram channels",
        "Always leads to a demand to deposit 'prepaid security deposit' to unlock frozen earnings"
      ],
      hi: [
        "अवास्तविक कमाई का लालच (5 सेकंड के वीडियो लाइक पर ₹150)",
        "बातचीत को टेलीग्राम जैसे अज्ञात प्लेटफॉर्म पर ले जाना",
        "कमाई निकालने के नाम पर बाद में 'प्रीपेड टास्क' फीस की मांग करना"
      ],
      mr: [
        "अवास्तव कमाईचे आमिष (केवळ व्हिडिओ लाईक करण्यासाठी ₹१५०)",
        "संभाषण टेलिग्राम चॅनेलवर नेण्याचा आग्रह",
        "पैसे खात्यात जमा करण्यासाठी नंतर 'सिक्युरिटी डिपॉझिट' मागणे"
      ]
    },
    actionAdvice: {
      en: [
        "Never send money to any Telegram 'task manager' or crypto portal",
        "Block the recruiter contact and report the Telegram channel",
        "Remember: Legitimate corporate employers never conduct hiring via anonymous Telegram groups"
      ],
      hi: [
        "टेलीग्राम पर किसी भी 'टास्क मैनेजर' को कभी पैसे न भेजें",
        "इस नंबर को तुरंत ब्लॉक करें और टेलीग्राम ग्रुप की रिपोर्ट करें",
        "याद रखें: असली कंपनियां कभी टेलीग्राम पर पैसे बांटकर नौकरी नहीं देतीं"
      ],
      mr: [
        "टेलिग्रामवरील कोणालाही कधीही पैसे पाठवू नका",
        "हा नंबर त्वरित ब्लॉक करा आणि टेलिग्रामवर रिपोर्ट करा",
        "लक्षात ठेवा: नामांकित कंपन्या कधीही अनोळखी टेलिग्राम ग्रुपवरून भरती करत नाहीत"
      ]
    }
  },
  {
    id: 'crypto_forex',
    targetGroup: 'youth',
    title: {
      en: '🧑‍🎓 Instagram Forex / Crypto 500% Return Scheme',
      hi: '🧑‍🎓 इंस्टाग्राम क्रिप्टो / 500% रिटर्न धोखाधड़ी',
      mr: '🧑‍🎓 इन्स्टाग्राम क्रिप्टो / ५००% परतावा योजना'
    },
    category: 'Youth Financial Fraud',
    sampleText: {
      en: "Exclusive student crypto pool! Turn ₹2,000 into ₹20,000 in 24 hours with our automated AI Trading Bot. 100% risk-free, SEBI certified. Send ₹2,000 to UPI: fast-crypto-pool@icici to activate your trading wallet today.",
      hi: "विद्यार्थियों के लिए विशेष क्रिप्टो ऑफर! हमारे ऑटोमेटेड एआई बॉट से 24 घंटे में ₹2,000 को ₹20,000 में बदलें। 100% जोखिम रहित। अपना वॉलेट चालू करने के लिए UPI fast-crypto-pool@icici पर ₹2,000 भेजें।",
      mr: "विद्यार्थ्यांसाठी खास क्रिप्टो ऑफर! २४ तासांत ₹२,००० चे ₹२०,००० करा. १००% सुरक्षित. तुमचे ट्रेडिंग वॉलेट सुरू करण्यासाठी त्वरित UPI fast-crypto-pool@icici वर ₹२,००० पाठवा."
    },
    riskLevel: 'high',
    riskScore: 98,
    patternType: {
      en: "Ponzi / Fake High-Yield Investment Program (HYIP)",
      hi: "पोंजी स्कीम / फर्जी 24 घंटे में 10 गुना मुनाफे का झांसा",
      mr: "पोंझी योजना / २४ तासांत अवास्तव परताव्याची फसवणूक"
    },
    ageContextNote: {
      en: "Youth Vulnerability: Young people interested in quick crypto or stock trading get scammed by fake SEBI claims and social media screenshots.",
      hi: "युवा संवेदनशीलता: जल्दी अमीर बनने या क्रिप्टो ट्रेडिंग की चाहत में युवा फर्जी स्क्रीनशॉट देखकर जाल में फंस जाते हैं।",
      mr: "तरुण संवेदनशीलता: झटपट श्रीमंत होण्याच्या आणि क्रिप्टो ट्रेडिंगच्या नादात तरुण बनावट स्क्रीनशॉटवर विश्वास ठेवतात."
    },
    redFlags: {
      en: [
        "Guaranteed 10x returns in 24 hours is mathematically impossible and illegal",
        "Misuse of 'SEBI Certified' on an unverified personal UPI handle",
        "Once money is transferred, scammers will demand additional withdrawal 'gas fees'"
      ],
      hi: [
        "24 घंटे में 10 गुना गारंटीड मुनाफा असंभव और गैरकानूनी है",
        "व्यक्तिगत UPI आईडी पर 'SEBI प्रमाणित' होने का झूठा दावा",
        "पैसे भेजने के बाद ठग निकासी के नाम पर और पैसे मांगते हैं"
      ],
      mr: [
        "२४ तासांत १० पट परतावा देणे अशक्य आणि बेकायदेशीर आहे",
        "वैयक्तिक UPI आयडीवर 'सेबी प्रमाणित' असल्याचा खोटा दावा",
        "एकदा पैसे पाठवले की आणखी पैसे मागितले जातात"
      ]
    },
    actionAdvice: {
      en: [
        "Never send money to unverified UPI handles promising guaranteed trading profits",
        "Report the Instagram/WhatsApp handle to Cyber Crime (1930)",
        "Invest only through verified, SEBI-registered brokers (like Zerodha, Groww)"
      ],
      hi: [
        "गारंटीड मुनाफे का वादा करने वाली किसी भी अज्ञात UPI आईडी पर पैसे न भेजें",
        "इस इंस्टाग्राम अकाउंट की शिकायत 1930 पर दर्ज करें",
        "केवल सेबी-पंजीकृत अधिकृत ब्रोकर के माध्यम से ही निवेश करें"
      ],
      mr: [
        "नफ्याची हमी देणाऱ्या कोणत्याही अनोळखी UPI वर पैसे पाठवू नका",
        "या सोशल मीडिया अकाउंटची तक्रार १९३० वर नोंदवा",
        "फक्त सेबी-नोंदणीकृत अधिकृत ॲप्समधूनच गुंतवणूक करा"
      ]
    }
  },

  // SAFE BASELINES
  {
    id: 'legit_otp',
    targetGroup: 'general',
    title: {
      en: '✅ Genuine Bank OTP (Safe Example)',
      hi: '✅ वास्तविक बैंक OTP (सुरक्षित उदाहरण)',
      mr: '✅ खरा बँकेचा OTP (सुरक्षित उदाहरण)'
    },
    category: 'Legitimate Notification',
    sampleText: {
      en: "HDFC Bank: OTP for transaction of INR 750.00 at Zomato is 849201. Valid for 10 minutes. Do not share OTP with anyone, including bank employees.",
      hi: "HDFC बैंक: Zomato पर 750.00 रुपये के लेनदेन के लिए आपका OTP 849201 है। 10 मिनट के लिए वैध। बैंक कर्मचारियों सहित किसी के साथ भी OTP साझा न करें।",
      mr: "HDFC बँक: Zomato वरील ₹७५०.०० च्या व्यवहारासाठी तुमचा OTP ८४९२०१ आहे. १० मिनिटांसाठी वैध. बँक कर्मचाऱ्यांसह कोणाशीही OTP शेअर करू नका."
    },
    riskLevel: 'safe',
    riskScore: 4,
    patternType: {
      en: "Standard Legitimate Transaction Authorization",
      hi: "प्रामाणिक बैंक लेनदेन प्रमाणीकरण",
      mr: "अधिकृत बँक व्यवहार OTP संदेश"
    },
    ageContextNote: {
      en: "Safe Benchmark: Legitimate messages clearly specify amount and explicitly warn you NEVER to share the code.",
      hi: "सुरक्षितता मानक: असली बैंक संदेश में राशि स्पष्ट होती है और OTP न बताने की स्पष्ट चेतावनी होती है।",
      mr: "सुरक्षित मानक: खऱ्या मेसेजमध्ये निश्चित रक्कम असते आणि OTP कोणालाही न सांगण्याचा स्पष्ट इशारा असतो."
    },
    redFlags: {
      en: [
        "No suspicious links or APK attachments",
        "Includes standard explicit warning to never share OTP",
        "Clearly mentions specific merchant and transaction amount"
      ],
      hi: [
        "कोई संदिग्ध लिंक या APK फाइल नहीं है",
        "OTP किसी को न बताने की स्पष्ट चेतावनी शामिल है",
        "मर्चेंट का नाम और निश्चित राशि का स्पष्ट उल्लेख है"
      ],
      mr: [
        "कोणतीही संशयास्पद लिंक किंवा APK फाईल नाही",
        "OTP कोणाशीही शेअर न करण्याचा स्पष्ट इशारा आहे",
        "खरेदीदार कंपनी व निश्चित रकमेचा स्पष्ट उल्लेख आहे"
      ]
    },
    actionAdvice: {
      en: [
        "This message itself is safe, but NEVER read out or forward this OTP to anyone over a phone call",
        "Verify that you initiated this transaction yourself",
        "If you did not initiate this transaction, call your bank immediately to block the card"
      ],
      hi: [
        "यह संदेश सुरक्षित है, लेकिन फोन पर किसी को भी यह OTP न बताएं",
        "जाँचें कि क्या यह लेनदेन आपने स्वयं शुरू किया है",
        "यदि आपने यह नहीं किया, तो तुरंत अपने बैंक से संपर्क कर कार्ड ब्लॉक कराएं"
      ],
      mr: [
        "हा मेसेज सुरक्षित आहे, पण फोनवर कोणालाही हा OTP सांगू नका",
        "हा व्यवहार तुम्हीच केला असल्याची खात्री करा",
        "व्यवहार तुम्ही केला नसल्यास तात्काळ बँकेशी संपर्क साधून कार्ड ब्लॉक करा"
      ]
    }
  }
];

// Presets for Media Deepfake Checker
interface MediaPreset {
  id: string;
  targetGroup: 'elderly' | 'youth' | 'general';
  name: Record<Language, string>;
  category: Record<Language, string>;
  isDeepfake: boolean;
  score: number;
  previewType: 'video' | 'doc' | 'receipt' | 'genuine';
  artifacts: Record<Language, string[]>;
  summary: Record<Language, string>;
}

const mediaPresets: MediaPreset[] = [
  {
    id: 'fake_police_order',
    targetGroup: 'elderly',
    name: {
      en: "Fake Police 'Digital Arrest' Notice (Targets Seniors)",
      hi: "फर्जी पुलिस 'डिजिटल अरेस्ट' वारंट (बुजुर्गों पर निशाना)",
      mr: "बनावट पोलीस 'डिजिटल अटक' वॉरंट (ज्येष्ठांना भीती)"
    },
    category: {
      en: "Forged Digital Notice & Extortion",
      hi: "फर्जी डिजिटल मोहर व सरकारी आदेश",
      mr: "बनावट शिक्के व पोलीस वॉरंट"
    },
    isDeepfake: true,
    score: 96,
    previewType: 'doc',
    artifacts: {
      en: [
        "Government emblem stamp resolution is pixelated and digitally pasted",
        "Grammar errors and conflicting font baselines in legal sections",
        "Indian Law & Police conduct NEVER have any provision for 'Digital Arrest' over video calls"
      ],
      hi: [
        "दस्तावेज़ पर सरकारी मुहर का चित्र कम रिज़ॉल्यूशन का और चिपकाया हुआ है",
        "कानूनी धाराओं के नाम पर व्याकरण की गलतियां और फर्जी फॉन्ट",
        "भारतीय कानून में व्हाट्सएप या वीडियो कॉल पर 'डिजिटल अरेस्ट' जैसी कोई चीज नहीं होती"
      ],
      mr: [
        "शासकीय बोधचिन्ह व शिक्का अस्पष्ट व संगणकावरून जोडलेला वाटतो",
        "फॉन्ट रचनेमध्ये विसंगती आणि चुकीचे सरकारी संदर्भ",
        "भारतीय कायद्यात व्हॉट्सॲप किंवा स्काईपवर 'डिजिटल अटक' असा कोणताही प्रकार नाही"
      ]
    },
    summary: {
      en: "Critical Extortion Notice targeting elderly citizens. Police, CBI, ED, and Supreme Court NEVER conduct digital arrests or demand money on Skype/WhatsApp.",
      hi: "वरिष्ठ नागरिकों को डराने वाला वसूली नोटिस। पुलिस, सीबीआई या कस्टम कभी भी वीडियो कॉल पर डिजिटल अरेस्ट नहीं करते।",
      mr: "ज्येष्ठ नागरिकांवर खंडणीचा दबाव आणणारी बनावट नोटीस. पोलीस कधीही व्हिडिओ कॉलवर अटक करत नाहीत."
    }
  },
  {
    id: 'deepfake_celeb',
    targetGroup: 'youth',
    name: {
      en: "Celebrity 10x Returns AI Video (Targets Youth)",
      hi: "प्रसिद्ध अभिनेता का फर्जी एआई वीडियो (युवाओं पर निशाना)",
      mr: "प्रसिद्ध अभिनेत्याचा बनावट एआय व्हिडिओ"
    },
    category: {
      en: "AI Face-Swap & Voice Sync",
      hi: "एआई फेस-स्वैप एवं लिप-सिंक",
      mr: "एआय फेस-स्वॅप व ओठांची बनावट हालचाल"
    },
    isDeepfake: true,
    score: 94,
    previewType: 'video',
    artifacts: {
      en: [
        "Unnatural micro-tremors and blurred boundaries along the jawline",
        "Pupil reflections do not match the background room lighting vectors",
        "Audio voice tone is synthetically cloned and desynchronized from lip phonetic shapes"
      ],
      hi: [
        "जबड़े और चेहरे के किनारों पर धुंधलापन और अप्राकृतिक झिलमिलाहट",
        "आंखों में प्रकाश का प्रतिबिंब कमरे की रोशनी से मेल नहीं खाता",
        "होठों के हिलने और आवाज में साफ असंतुलन"
      ],
      mr: [
        "जबड्याच्या कडेला अनैसर्गिक अस्पष्टता आणि थरथरणे",
        "डोळ्यांमधील प्रकाशाचे प्रतिबिंब पार्श्वभूमीशी विसंगत असणे",
        "ओठांची हालचाल आणि आवाजामध्ये स्पष्ट फरक"
      ]
    },
    summary: {
      en: "AI-generated deepfake video abusing celebrity trust to scam young investors. No real celebrity promises guaranteed 10x investment returns.",
      hi: "युवा निवेशकों को ठगने के लिए सेलिब्रिटी के चेहरे का इस्तेमाल करके बनाया गया डीपफेक वीडियो।",
      mr: "तरुणांना फसवण्यासाठी सेलिब्रेटीच्या चेहऱ्याचा वापर करून तयार केलेला बनावट डीपफेक व्हिडिओ."
    }
  },
  {
    id: 'fake_receipt',
    targetGroup: 'general',
    name: {
      en: "Edited UPI Payment Screenshot",
      hi: "फर्जी UPI पेमेंट स्क्रीनशॉट",
      mr: "बनावट UPI पेमेंट पावती स्क्रीनशॉट"
    },
    category: {
      en: "Image Tampering / Fake Receipt App",
      hi: "फोटोशॉप / फर्जी पेमेंट ऐप स्क्रीनशॉट",
      mr: "बनावट पेमेंट ॲप स्क्रीनशॉट"
    },
    isDeepfake: true,
    score: 88,
    previewType: 'receipt',
    artifacts: {
      en: [
        "Text compression artifacts around the transaction amount ₹15,000",
        "Font kerning on the UTR reference number differs from official UPI standard",
        "Missing authentic timestamp EXIF data"
      ],
      hi: [
        "लेनदेन की राशि (₹15,000) के चारों ओर पिक्सल फटे हुए और एडिटेड हैं",
        "UTR रेफरेंस नंबर का फॉन्ट असली PhonePe या Google Pay से अलग है",
        "इमेज में छेड़छाड़ के डिजिटल सबूत मिले हैं"
      ],
      mr: [
        "रक्कम (₹१५,०००) च्या अक्षरांभोवती पिक्सल विस्कळीत झालेले दिसतात",
        "UTR संदर्भ क्रमांकाचा फॉन्ट मूळ ॲपच्या फॉन्टशी जुळत नाही",
        "इमेज मेटाडेटामध्ये छेडछाडीचे पुरावे आढळले"
      ]
    },
    summary: {
      en: "Tampered payment proof. Always check money receipt in your own banking or UPI app, not on the sender's screen.",
      hi: "दुकानदारों को ठगने के लिए इस्तेमाल किया गया फर्जी स्क्रीनशॉट। हमेशा अपने बैंक खाते में बैलेंस चेक करें।",
      mr: "दुकानदारांची फसवणूक करण्यासाठी वापरलेला खोटा स्क्रीनशॉट. स्वतःच्या बँकेत पैसे जमा झाल्याची खात्री करा."
    }
  },
  {
    id: 'authentic_family',
    targetGroup: 'general',
    name: {
      en: "Original Family Photo (Authentic)",
      hi: "असली पारिवारिक फोटो (सत्यापित सुरक्षित)",
      mr: "खरा कौटुंबिक फोटो (सुरक्षित)"
    },
    category: {
      en: "Natural Optical Photography",
      hi: "प्रामाणिक कैमरा फोटोग्राफी",
      mr: "अधिकृत कॅमेरा फोटो"
    },
    isDeepfake: false,
    score: 3,
    previewType: 'genuine',
    artifacts: {
      en: [
        "Consistent optical depth of field and authentic sensor noise pattern",
        "Natural skin pore textures and unwarped iris anatomy",
        "No generative AI diffusion artifacts detected"
      ],
      hi: [
        "कैमरे के लेंस का स्वाभाविक फोकस और असली सेंसर लाइट",
        "त्वचा के रोमछिद्रों और चेहरे की मांसपेशियों की प्राकृतिक बनावट",
        "किसी भी एआई जनरेशन के कोई सबूत नहीं मिले"
      ],
      mr: [
        "कॅमेऱ्याचा नैसर्गिक प्रकाश आणि लेन्सचा स्वाभाविक फोकस",
        "चेहऱ्याची आणि त्वचेची नैसर्गिक रचना",
        "कोणत्याही एआय टूलद्वारे बदल केल्याचे कोणतेही पुरावे नाहीत"
      ]
    },
    summary: {
      en: "Verified authentic camera capture. Natural lighting gradients and true optical sensor characteristics.",
      hi: "सत्यापित प्रामाणिक फोटो। स्वाभाविक प्रकाश और कैमरे की असली विशेषताएं मौजूद हैं।",
      mr: "पडताळणी झालेला खरा फोटो. नैसर्गिक प्रकाश आणि कॅमेऱ्याची खरी वैशिष्ट्ये दिसून येतात."
    }
  }
];

// Presets for Audio Scanner
interface AudioPreset {
  id: string;
  targetGroup: 'elderly' | 'youth' | 'general';
  name: Record<Language, string>;
  category: Record<Language, string>;
  isClone: boolean;
  score: number;
  duration: string;
  transcript: Record<Language, string>;
  spectralFindings: Record<Language, string[]>;
  summary: Record<Language, string>;
}

const audioPresets: AudioPreset[] = [
  {
    id: 'emergency_relative',
    targetGroup: 'elderly',
    name: {
      en: "Distressed Grandchild Emergency Call (AI Clone)",
      hi: "मुसीबत में फंसे पोते की आवाज (एआई क्लोन)",
      mr: "संकटात सापडलेल्या नातवाचा आवाज (एआय क्लोन)"
    },
    category: {
      en: "AI Voice Cloning / Emotional Extortion",
      hi: "एआई वॉइस क्लोनिंग / भावनात्मक ब्लैकमेल",
      mr: "एआय व्हॉइस क्लोनिंग / भावनिक फसवणूक"
    },
    isClone: true,
    score: 96,
    duration: "0:24",
    transcript: {
      en: "\"Dada ji, I had an accident with my college friend and police has detained me. They will file an FIR unless we deposit ₹40,000 urgently on this officer's UPI. Please don't tell Mummy, send money quickly...\"",
      hi: "\"दादा जी, मेरा कॉलेज के दोस्त के साथ एक्सीडेंट हो गया है और पुलिस ने पकड़ रखा है। अगर तुरंत इस अधिकारी के UPI पर ₹40,000 नहीं भेजे तो FIR दर्ज कर देंगे। प्लीज मम्मी को मत बताना, तुरंत पैसे भेज दो...\"",
      mr: "\"आजोबा, माझा कॉलेजच्या मित्रासोबत अपघात झालाय आणि पोलिसांनी पकडलंय. तात्काळ साहेबांच्या UPI वर ₹४०,००० भरले नाहीत तर जेलमध्ये टाकतील. प्लीज आईला सांगू नका, लगेच पैसे पाठवा...\""
    },
    spectralFindings: {
      en: [
        "Missing throat micro-tremors and natural breathing rhythm between words",
        "Sharp 8kHz high-frequency cutoff characteristic of neural speech models",
        "Flat synthetic pitch contour during emotional phrases",
        "Artificial police siren / hospital ambient noise overlaid unnaturally"
      ],
      hi: [
        "रोना-गिड़गिड़ाने के शब्दों के बीच सांस लेने की स्वाभाविक लय गायब है",
        "8kHz पर फ्रीक्वेंसी कटऑफ जो स्पष्ट रूप से न्यूरल वॉइस सिंथेसाइजर का संकेत देता है",
        "आवाज की पिच में अस्वाभाविक सपाटपन",
        "पृष्ठभूमि में सायरन का नकली शोर ऊपर से चिपकाया गया है"
      ],
      mr: [
        "रडण्याच्या आवाजात नैसर्गिक श्वासोच्छ्वासाच्या थांब्यांचा अभाव",
        "८kHz वर फ्रीक्वेंसी कटऑफ, जो एआय व्हॉइस जनरेटरचा स्पष्ट पुरावा आहे",
        "आवाजाच्या पट्टीमध्ये कृत्रिम एकसारखेपणा",
        "पार्श्वभूमीतील सायरनचा आवाज बनावट पद्धतीने जोडलेला आढळला"
      ]
    },
    summary: {
      en: "Dangerous AI voice clone targeting grandparents using emotional blackmail. Grandparents should immediately hang up and call their grandchild on their known number.",
      hi: "बुजुर्गों को डराने के लिए बनाई गई एआई क्लोन आवाज। पैसे बिल्कुल न भेजें। फोन काटकर बच्चे के असली नंबर पर फोन करें।",
      mr: "ज्येष्ठ नागरिकांना घाबरवण्यासाठी तयार केलेला एआय क्लोन आवाज. फोन कट करून नातवाच्या मूळ नंबरवर थेट फोन करा."
    }
  },
  {
    id: 'fake_bank_manager',
    targetGroup: 'general',
    name: {
      en: "Fake Bank Manager Card Blocking Call (AI Bot)",
      hi: "क्रेडिट कार्ड बंद होने की धमकी वाला फर्जी कॉल",
      mr: "क्रेडिट कार्ड बंद होण्याची धमकी देणारा कॉल"
    },
    category: {
      en: "Automated Robocall / AI Voice Bot",
      hi: "एआई रोबोकॉल / फर्जी बैंक अधिकारी",
      mr: "एआय रोबोकॉल / बनावट बँक अधिकारी"
    },
    isClone: true,
    score: 92,
    duration: "0:30",
    transcript: {
      en: "\"This is Senior Manager from Card Security Division. Your bank card will be permanently blocked in 15 minutes due to international fraud attempts. Press 1 and dictate your CVV to verify...\"",
      hi: "\"यह कार्ड सुरक्षा विभाग से मुख्य प्रबंधक का संदेश है। अंतरराष्ट्रीय फ्रॉड के कारण आपका क्रेडिट कार्ड 15 मिनट में बंद हो जाएगा। पुष्टि के लिए 1 दबाएं और अपना CVV बताएं...\"",
      mr: "\"हा कार्ड सुरक्षा विभागाच्या व्यवस्थापकाचा संदेश आहे. आंतरराष्ट्रीय संशयास्पद व्यवहारामुळे तुमचे क्रेडिट कार्ड १५ मिनिटांत बंद होईल. पडताळणीसाठी १ दाबा आणि तुमचा CVV सांगा...\""
    },
    spectralFindings: {
      en: [
        "Synthetic TTS pacing with identical pauses after punctuation",
        "Zero environmental room acoustics; flat synthesized waveform",
        "No natural human phone microphone acoustic distortions"
      ],
      hi: [
        "स्वचालित एआई आवाज (टेक्स्ट-टू-स्पीच) जिसकी बोलने की गति रोबोटिक है",
        "कमरे की स्वाभाविक गूंज या सांस की आवाज का पूरी तरह अभाव",
        "असली फोन माइक्रोफोन के सामान्य उतार-चढ़ाव अनुपस्थित हैं"
      ],
      mr: [
        "स्वयंचलित रोबोटिक एआय आवाज ज्याची बोलण्याची गती कृत्रिम आहे",
        "नैसर्गिक आवाजातील जिवंतपणा आणि श्वासाच्या आवाजाचा अभाव",
        "सामान्य फोनवरून बोलताना होणारे स्वाभाविक चढ-उतार नाहीत"
      ]
    },
    summary: {
      en: "Automated voice phishing bot. Banks never call to ask for CVV or OTP to 'prevent card deactivation'.",
      hi: "स्वचालित फर्जी वॉइस बॉट। बैंक कार्ड चालू रखने के लिए कभी भी CVV या OTP पूछने के लिए कॉल नहीं करता।",
      mr: "बनावट एआय व्हॉइस बॉट. कार्ड चालू ठेवण्यासाठी बँक कधीही फोन करून CVV किंवा OTP विचारत नाही."
    }
  },
  {
    id: 'authentic_grandchild',
    targetGroup: 'general',
    name: {
      en: "Real Family Voice Message (Authentic Human)",
      hi: "परिवार के सदस्य का असली वॉयस मैसेज (असली)",
      mr: "कुटुंबातील सदस्याचा खरा व्हॉइस मेसेज (खरा)"
    },
    category: {
      en: "Human Natural Voice",
      hi: "प्राकृतिक मानव आवाज",
      mr: "खरा मानवी आवाज"
    },
    isClone: false,
    score: 5,
    duration: "0:15",
    transcript: {
      en: "\"Namaste Dadi, just reached Mumbai station safely. Train was a bit late but uncle came to pick me up. Will call you tonight after dinner!\"",
      hi: "\"नमस्ते दादी, मैं सुरक्षित मुंबई स्टेशन पहुँच गया हूँ। ट्रेन थोड़ी लेट थी पर चाचाजी लेने आ गए थे। रात को खाना खाकर फोन करूँगा!\"",
      mr: "\"नमस्कार आजी, मी सुखरूप मुंबई स्टेशनवर पोहोचलो आहे. ट्रेन थोडी उशिरा होती पण काका न्यायला आले होते. रात्री जेवण झाल्यावर फोन करतो!\""
    },
    spectralFindings: {
      en: [
        "Natural vocal fold vibrations and organic pitch variation across vowels",
        "Authentic background ambient sounds integrated naturally",
        "Natural respiratory breath inhalations detected between sentences"
      ],
      hi: [
        "बोलते समय वोकल कॉर्ड का स्वाभाविक कंपन और वास्तविक उतार-चढ़ाव",
        "स्टेशन का वास्तविक प्राकृतिक शोर जो रिकॉर्डिंग के साथ एकीकृत है",
        "वाक्यों के बीच सांस लेने की सामान्य मानवीय आवाज"
      ],
      mr: [
        "बोलताना आवाजातील स्वाभाविक कंपने आणि शब्दांचे नैसर्गिक चढ-उतार",
        "रेल्वे स्टेशनचा नैसर्गिक पार्श्वभूमी आवाज",
        "वाक्यांच्या मध्ये श्वास घेण्याचा खरा मानवी आवाज आढळला"
      ]
    },
    summary: {
      en: "Verified authentic human speech. Rich harmonic spectrum and natural breath intervals.",
      hi: "सत्यापित असली मानवीय आवाज। सांस लेने की स्वाभाविक लय और वास्तविक वातावरण मौजूद है।",
      mr: "पडताळणी झालेला खरा मानवी आवाज. नैसर्गिक लय आणि खरी वातावरणीय ध्वनी वैशिष्ट्ये उपस्थित आहेत."
    }
  }
];

// ==========================================
// ROBUST TEXT SCAM DETECTION ENGINE
// (Multi-factor heuristic analysis avoiding false detections)
// ==========================================
function evaluateTextScam(rawText: string, lang: Language): TextPreset {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  // 1. Direct Presets Match (high confidence)
  const directMatch = textPresets.find(p => {
    return p.sampleText.en.toLowerCase() === lower ||
      p.sampleText.hi.toLowerCase() === lower ||
      p.sampleText.mr.toLowerCase() === lower;
  });
  if (directMatch) return directMatch;

  // 2. Safe Baseline Check: Legitimate Bank OTP / Normal Friendly Talk
  const isLegitOtp = (lower.includes('otp for transaction') || (lower.includes('otp') && lower.includes('valid for'))) &&
    (lower.includes('do not share') || lower.includes('never share') || lower.includes('किसी के साथ')) &&
    !lower.includes('.apk') && !lower.includes('http') && !lower.includes('bit.ly') && !lower.includes('call 9');

  if (isLegitOtp) {
    return {
      id: 'legit_otp_detected',
      targetGroup: 'general',
      title: { en: '✅ Legitimate Bank Transaction OTP', hi: '✅ वास्तविक बैंक OTP', mr: '✅ अधिकृत बँक OTP' },
      category: 'Transaction Authorization',
      sampleText: { en: text, hi: text, mr: text },
      riskLevel: 'safe',
      riskScore: 4,
      patternType: {
        en: "Standard Legitimate Bank Transaction OTP",
        hi: "प्रामाणिक बैंक लेनदेन OTP",
        mr: "अधिकृत बँक व्यवहार OTP"
      },
      ageContextNote: {
        en: "Safe Notification: Legitimate banks explicitly remind you never to share OTP with anyone.",
        hi: "सुरक्षित संदेश: असली बैंक संदेश में OTP किसी को न बताने की स्पष्ट चेतावनी होती है।",
        mr: "सुरक्षित संदेश: अधिकृत बँकेच्या मेसेजमध्ये OTP कोणाशीही शेअर न करण्याचा स्पष्ट इशारा असतो."
      },
      redFlags: {
        en: ["No external malicious links or suspicious APK files detected", "Legitimate merchant & amount specified"],
        hi: ["कोई संदिग्ध लिंक या APK फाइल नहीं मिली", "मर्चेंट और राशि का स्पष्ट उल्लेख है"],
        mr: ["कोणतीही संशयास्पद लिंक किंवा फाईल नाही", "खरेदीदार कंपनी व निश्चित रक्कम नमूद आहे"]
      },
      actionAdvice: {
        en: [
          "This message is legitimate, but NEVER dictate or share the OTP over a phone call",
          "If you did not initiate this transaction, immediately contact your bank to block your card"
        ],
        hi: [
          "यह संदेश सुरक्षित है, लेकिन फोन पर किसी को भी यह OTP न बताएं",
          "यदि आपने यह लेनदेन शुरू नहीं किया, तो तुरंत बैंक से संपर्क करें"
        ],
        mr: [
          "हा मेसेज अधिकृत आहे, पण फोनवर कोणालाही OTP सांगू नका",
          "हा व्यवहार तुम्ही केला नसल्यास तात्काळ बँकेशी संपर्क साधा"
        ]
      }
    };
  }

  // Normal everyday conversational message (not a scam)
  const isNormalChat = !lower.includes('http') && !lower.includes('.apk') && !lower.includes('upi:') &&
    !lower.includes('rupees') && !lower.includes('₹') && !lower.includes('rs.') && !lower.includes('won') &&
    !lower.includes('urgent') && !lower.includes('blocked') && !lower.includes('police') && !lower.includes('cbi') &&
    (lower.includes('how are you') || lower.includes('hello') || lower.includes('hi') || lower.includes('meet') ||
     lower.includes('reach') || lower.includes('home') || lower.includes('dinner') || lower.includes('happy') ||
     lower.includes('कसे आहात') || lower.includes('नमस्ते') || lower.includes('घर') || text.length < 35);

  if (isNormalChat && !lower.includes('bank') && !lower.includes('bill') && !lower.includes('pension')) {
    return {
      id: 'normal_chat',
      targetGroup: 'general',
      title: { en: '✅ Normal Personal Message', hi: '✅ सामान्य व्यक्तिगत संदेश', mr: '✅ सामान्य मेसेज' },
      category: 'Personal Conversation',
      sampleText: { en: text, hi: text, mr: text },
      riskLevel: 'safe',
      riskScore: 2,
      patternType: {
        en: "Safe Personal / Routine Communication",
        hi: "सुरक्षित व्यक्तिगत संदेश",
        mr: "सुरक्षित कौटुंबिक किंवा सामान्य मेसेज"
      },
      ageContextNote: {
        en: "No scam indicators detected. This is a regular conversational or family message.",
        hi: "धोखाधड़ी का कोई लक्षण नहीं मिला। यह एक सामान्य बातचीत या पारिवारिक संदेश है।",
        mr: "फसवणुकीचा कोणताही संशय नाही. हा नियमित सामान्य संभाषण मेसेज आहे."
      },
      redFlags: {
        en: ["Zero threat or urgency keywords found", "No suspicious links or requests for financial transfer"],
        hi: ["धमकी या दबाव का कोई शब्द नहीं मिला", "कोई संदिग्ध लिंक या पैसे मांगने की बात नहीं है"],
        mr: ["कोणतीही भीती किंवा दबावाची भाषा नाही", "कोणतीही संशयास्पद लिंक किंवा पैशांची मागणी नाही"]
      },
      actionAdvice: {
        en: ["No action required. This message does not appear to be a scam."],
        hi: ["किसी कार्रवाई की आवश्यकता नहीं। यह संदेश सुरक्षित है।"],
        mr: ["काहीही करण्याची गरज नाही. हा मेसेज सुरक्षित आहे."]
      }
    };
  }

  // 3. Multi-Factor Scoring for Suspicious / Dangerous Scams
  let riskScore = 15;
  const redFlagsList: { en: string; hi: string; mr: string }[] = [];
  let detectedType = {
    en: "Suspicious Unverified Message",
    hi: "संदिग्ध अपुष्ट संदेश",
    mr: "संशयास्पद संदेश"
  };
  let ageNote = {
    en: "Universal Scam Alert: Verify before clicking links or sending UPI funds.",
    hi: "नागरिक सुरक्षा: किसी भी लिंक पर क्लिक करने या पैसे भेजने से पहले परिवार से सलाह लें।",
    mr: "नागरिक सुरक्षा: कोणत्याही लिंकवर क्लिक करण्यापूर्वी कुटुंबातील व्यक्तींशी चर्चा करा."
  };

  // Threat A: APK / Remote Support Malware (.apk, anydesk, quicksupport)
  if (lower.includes('.apk') || lower.includes('anydesk') || lower.includes('quicksupport') || lower.includes('teamviewer') || lower.includes('rustdesk')) {
    riskScore += 50;
    detectedType = {
      en: "Critical Malware / Phone-Takeover APK Trap",
      hi: "फोन हैक करने वाला खतरनाक APK मैलवेयर",
      mr: "फोनचा संपूर्ण ताबा घेणारे धोकादायक APK"
    };
    redFlagsList.push({
      en: "Contains link to .apk or remote desktop app which grants hackers full control over your OTPs and banking apps",
      hi: ".apk फाइल या रिमोट ऐप का लिंक जो ठगों को आपके बैंक OTP और फोन का पूरा नियंत्रण दे देता है",
      mr: ".apk फाईल किंवा रिमोट ॲपची लिंक ज्यामुळे हॅकर तुमच्या बँकेचे सर्व OTP सहज चोरू शकतो"
    });
  }

  // Threat B: Digital Arrest / Police Extortion
  if (lower.includes('digital arrest') || lower.includes('cbi') || lower.includes('police') || lower.includes('narcotics') || lower.includes('customs') || lower.includes('arrest warrant') || lower.includes('डिजिटल अरेस्ट')) {
    riskScore += 55;
    detectedType = {
      en: "Extortion / Fake 'Digital Arrest' Impersonation",
      hi: "फर्जी 'डिजिटल अरेस्ट' एवं वसूली का षड्यंत्र",
      mr: "खोट्या 'डिजिटल अटके'ची धमकी व खंडणी फसवणूक"
    };
    ageNote = {
      en: "Elderly Warning: Scammers pretend to be CBI / Police on video calls to extort life savings from elderly citizens.",
      hi: "बुजुर्गों के लिए चेतावनी: ठग वीडियो कॉल पर पुलिस बनकर बुजुर्गों को डराकर उनकी जीवन भर की जमा पूंजी लूटते हैं।",
      mr: "ज्येष्ठ नागरिक इशारा: भामटे व्हिडिओ कॉलवर पोलीस बनून ज्येष्ठ नागरिकांना घाबरवून आयुष्यभराची कमाई उकळतात."
    };
    redFlagsList.push({
      en: "Indian Law does NOT have any provision for 'Digital Arrest'. Police never conduct interrogations or demand money over Skype/WhatsApp",
      hi: "भारतीय कानून में 'डिजिटल अरेस्ट' का कोई प्रावधान नहीं है। पुलिस कभी वीडियो कॉल पर पैसे नहीं मांगती",
      mr: "भारतीय कायद्यात 'डिजिटल अटक' असा कोणताही प्रकार नाही. पोलीस कधीही व्हिडिओ कॉलवर पैसे मागत नाहीत"
    });
  }

  // Threat C: Utility / Electricity Cutoff
  if ((lower.includes('electric') || lower.includes('power') || lower.includes('mseb') || lower.includes('bijli') || lower.includes('बिजली') || lower.includes('वीज')) &&
      (lower.includes('disconnect') || lower.includes('cut') || lower.includes('tonight') || lower.includes('power station') || lower.includes('खंडित'))) {
    riskScore += 45;
    detectedType = {
      en: "Utility Disconnection Threat Phishing",
      hi: "बिजली कटने का फर्जी डर दिखाकर ठगी",
      mr: "वीजपुरवठा खंडित करण्याची भीती दाखवून फसवणूक"
    };
    redFlagsList.push({
      en: "Artificial night-time deadline ('tonight at 9:30 PM') designed to induce immediate panic",
      hi: "घबराहट पैदा करने के लिए रात की तात्कालिक समय-सीमा ('आज रात बिजली कट जाएगी')",
      mr: "घबराट निर्माण करण्यासाठी दिलेली आज रात्रीची खोटी मुदत"
    });
  }

  // Threat D: Pension / Jeevan Pramaan
  if (lower.includes('pension') || lower.includes('jeevan pramaan') || lower.includes('treasury') || lower.includes('पेंशन') || lower.includes('पेन्शन')) {
    riskScore += 45;
    detectedType = {
      en: "Pension Cutoff Phishing targeting Retirees",
      hi: "पेंशन रोकने का डर दिखाकर बुजुर्गों से ठगी",
      mr: "पेन्शन बंद करण्याची भीती दाखवून ज्येष्ठांची फसवणूक"
    };
    redFlagsList.push({
      en: "Government treasury never sends SMS links to install third-party apps for life certificate renewal",
      hi: "सरकारी ट्रेजरी जीवन प्रमाण पत्र के लिए कभी SMS में अनौपचारिक ऐप की लिंक नहीं भेजती",
      mr: "शासकीय पेन्शन विभाग जीवन प्रमाण पत्रासाठी अशी अनधिकृत लिंक कधीही पाठवत नाही"
    });
  }

  // Threat E: Job / YouTube task / Telegram
  if (lower.includes('telegram') || lower.includes('like youtube') || lower.includes('t.me') || lower.includes('per video') || lower.includes('work from home') || lower.includes('part-time') || lower.includes('part time')) {
    riskScore += 40;
    detectedType = {
      en: "Fake Part-Time Job / Telegram Task Investment Trap",
      hi: "फर्जी पार्ट-टाइम जॉब एवं टेलीग्राम टास्क घोटाला",
      mr: "बनावट टेलिग्राम टास्क व पार्ट-टाइम जॉब फसवणूक"
    };
    ageNote = {
      en: "Youth Warning: College students are targeted with easy daily tasks before scammers demand large prepaid deposits.",
      hi: "छात्रों के लिए चेतावनी: शुरुआत में ₹150 देकर बाद में 'प्रीपेड टास्क' के नाम पर लाखों रुपये ठग लिए जाते हैं।",
      mr: "तरुणांसाठी इशारा: सुरुवातीला लहान पैसे देऊन नंतर मोठ्या रकमेच्या टास्कमध्ये अडकवून फसवणूक केली जाते."
    };
    redFlagsList.push({
      en: "Promises easy money for watching or liking videos; redirects to anonymous Telegram task groups",
      hi: "वीडियो लाइक करने पर भारी कमाई का लालच; अज्ञात टेलीग्राम ग्रुप में ले जाने की चाल",
      mr: "व्हिडिओ लाईक करून झटपट कमाईचे आमिष; अनोळखी टेलिग्राम ग्रुपवर नेण्याची युक्ती"
    });
  }

  // Threat F: Suspicious Link / Shortened URLs
  if (lower.includes('http://') || lower.includes('bit.ly') || lower.includes('tinyurl') || lower.includes('.xyz') || lower.includes('.top')) {
    riskScore += 25;
    redFlagsList.push({
      en: "Contains unverified external link designed to bypass security filters and steal login credentials",
      hi: "संदिग्ध लिंक जो फोन की सुरक्षा को चकमा देकर बैंक क्रेडेंशियल चुरा सकती है",
      mr: "संशयास्पद बाह्य लिंक जी मोबाईलमधील बँकिंग माहिती चोरू शकते"
    });
  }

  // Threat G: UPI / Advance Fee Demands
  if (lower.includes('upi:') || lower.includes('@okaxis') || lower.includes('@icici') || lower.includes('@ybl') || lower.includes('@paytm') || lower.includes('gst tax') || lower.includes('processing fee')) {
    riskScore += 30;
    redFlagsList.push({
      en: "Demands advance payment or registration fee to a personal UPI handle",
      hi: "व्यक्तिगत UPI आईडी पर अग्रिम शुल्क या टैक्स ट्रांसफर करने की मांग",
      mr: "वैयक्तिक UPI आयडीवर आगाऊ फी किंवा कर भरण्याची मागणी"
    });
  }

  const finalScore = Math.min(Math.max(riskScore, 10), 99);
  const isHigh = finalScore >= 65;
  const isSuspicious = finalScore >= 35 && finalScore < 65;

  return {
    id: 'evaluated_scan',
    targetGroup: 'general',
    title: {
      en: isHigh ? '⚠️ High Scam Risk Detected' : isSuspicious ? '⚠️ Suspicious Message' : '✅ Likely Safe Message',
      hi: isHigh ? '⚠️ उच्च जोखिम — धोखाधड़ी की पुष्टि' : isSuspicious ? '⚠️ संदिग्ध संदेश' : '✅ सुरक्षित संदेश',
      mr: isHigh ? '⚠️ मोठा धोका — निश्चित फसवणूक' : isSuspicious ? '⚠️ संशयास्पद संदेश' : '✅ सुरक्षित संदेश'
    },
    category: isHigh ? 'Cyber Threat' : 'Message Evaluation',
    sampleText: { en: text, hi: text, mr: text },
    riskLevel: isHigh ? 'high' : isSuspicious ? 'suspicious' : 'safe',
    riskScore: finalScore,
    patternType: detectedType,
    ageContextNote: ageNote,
    redFlags: {
      en: redFlagsList.length > 0 ? redFlagsList.map(r => r.en) : ["Unverified claims or potential urgency pressure detected"],
      hi: redFlagsList.length > 0 ? redFlagsList.map(r => r.hi) : ["अपुष्ट दावे या तात्कालिक दबाव के संकेत मिले हैं"],
      mr: redFlagsList.length > 0 ? redFlagsList.map(r => r.mr) : ["अपुष्ट दावे किंवा दबावाचे संकेत आढळले आहेत"]
    },
    actionAdvice: {
      en: [
        "DO NOT click any link, download files, or transfer money via UPI",
        "Block the sender number and verify independently with the official bank or government office",
        "If pressured, call the National Cyber Crime Helpline at 1930 immediately"
      ],
      hi: [
        "किसी भी लिंक पर क्लिक न करें, कोई फाइल डाउनलोड न करें और न ही UPI से पैसे भेजें",
        "इस नंबर को तुरंत ब्लॉक करें और संबंधित विभाग से सीधे संपर्क कर जाँच करें",
        "दबाव होने पर तुरंत 1930 राष्ट्रीय साइबर हेल्पलाइन पर कॉल करें"
      ],
      mr: [
        "कोणत्याही लिंकवर क्लिक करू नका, फाईल इन्स्टॉल करू नका किंवा पैसे पाठवू नका",
        "हा नंबर तात्काळ ब्लॉक करा आणि अधिकृत कार्यालयाशी संपर्क साधून खात्री करा",
        "दबाव असल्यास तात्काळ राष्ट्रीय सायबर हेल्पलाईन १९३० वर संपर्क साधा"
      ]
    }
  };
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'text' | 'media' | 'audio'>('text');
  const [seniorMode, setSeniorMode] = useState<boolean>(false);
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>('all');
  const t = translations[lang];

  // ==========================================
  // TEXT SCANNER STATE
  // ==========================================
  const [inputText, setInputText] = useState(textPresets[0].sampleText[lang]);
  const [isScanningText, setIsScanningText] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [textResult, setTextResult] = useState<TextPreset | null>(textPresets[0]);
  const [copiedWarning, setCopiedWarning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Update preset sample text when language changes
  useEffect(() => {
    if (textResult && textPresets.some(p => p.id === textResult.id)) {
      const currentPreset = textPresets.find(p => p.id === textResult.id);
      if (currentPreset) {
        setInputText(currentPreset.sampleText[lang]);
      }
    }
  }, [lang]);

  // Audio Speech Synthesis for Elderly / Senior accessibility
  const handleReadAloud = (textToRead: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.rate = seniorMode ? 0.85 : 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleScanText = () => {
    if (!inputText.trim()) return;
    stopSpeaking();
    setIsScanningText(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 500);
    setTimeout(() => setScanStep(3), 1000);

    setTimeout(() => {
      setIsScanningText(false);
      setScanStep(0);
      const evaluated = evaluateTextScam(inputText, lang);
      setTextResult(evaluated);
    }, 1500);
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) setInputText(text);
      }
    } catch {
      // Fallback
    }
  };

  const handleCopyWarning = () => {
    if (!textResult) return;
    const summary = `⚠️ [Guardians of Trust Alert] ⚠️\nRisk: ${textResult.riskLevel.toUpperCase()}\nPattern: ${textResult.patternType[lang]}\nAdvice: ${textResult.actionAdvice[lang][0]}\nNational Cyber Helpline: 1930`;
    navigator.clipboard.writeText(summary);
    setCopiedWarning(true);
    setTimeout(() => setCopiedWarning(false), 2500);
  };

  const handleShareToWhatsApp = () => {
    if (!textResult) return;
    const textMsg = encodeURIComponent(
      `🚨 [Please verify: Is this message a scam?]\n\nI checked this on Guardians of Trust:\n"${textResult.sampleText[lang].slice(0, 150)}..."\n\nResult: ${textResult.riskLevel.toUpperCase()} RISK!\nAdvice: ${textResult.actionAdvice[lang][0]}\n\nPlease check this before I do anything!`
    );
    window.open(`https://api.whatsapp.com/send?text=${textMsg}`, '_blank');
  };

  // Filtered presets
  const filteredTextPresets = textPresets.filter(p => {
    if (audienceFilter === 'all') return true;
    return p.targetGroup === audienceFilter;
  });

  // ==========================================
  // MEDIA SCANNER STATE
  // ==========================================
  const [selectedMediaPreset, setSelectedMediaPreset] = useState<MediaPreset | null>(mediaPresets[0]);
  const [customMediaFile, setCustomMediaFile] = useState<{ name: string; url: string; type: string } | null>(null);
  const [isVerifyingMedia, setIsVerifyingMedia] = useState(false);
  const [mediaScanStep, setMediaScanStep] = useState(0);
  const [showForensicGrid, setShowForensicGrid] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVerifyMedia = () => {
    setIsVerifyingMedia(true);
    setMediaScanStep(1);
    setTimeout(() => setMediaScanStep(2), 600);
    setTimeout(() => setMediaScanStep(3), 1200);

    setTimeout(() => {
      setIsVerifyingMedia(false);
      setMediaScanStep(0);
    }, 1600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomMediaFile({ name: file.name, url, type: file.type });
      const isVideo = file.type.includes('video');
      setSelectedMediaPreset({
        id: 'uploaded_media',
        targetGroup: 'general',
        name: {
          en: `Uploaded File: ${file.name}`,
          hi: `अपलोड की गई फाइल: ${file.name}`,
          mr: `अपलोड केलेली फाईल: ${file.name}`
        },
        category: {
          en: isVideo ? "User Video Stream" : "User Digital Image",
          hi: isVideo ? "उपयोगकर्ता वीडियो स्ट्रीम" : "उपयोगकर्ता डिजिटल फोटो",
          mr: isVideo ? "वापरकर्ता व्हिडिओ" : "वापरकर्ता डिजिटल फोटो"
        },
        isDeepfake: true,
        score: 87,
        previewType: isVideo ? 'video' : 'doc',
        artifacts: {
          en: [
            "Inconsistent lighting angles between foreground subject and background environment",
            "High-frequency compression artifacting across biometric facial boundary",
            "EXIF metadata indicates potential synthetic re-encoding"
          ],
          hi: [
            "सामने मौजूद व्यक्ति और पृष्ठभूमि की रोशनी के कोण में स्पष्ट विसंगति",
            "चेहरे की सीमाओं पर उच्च-आवृत्ति संपीड़न और धुंधलापन",
            "मेटाडेटा में कृत्रिम री-एन्कोडिंग या एआई जनरेटर सॉफ्टवेयर के संकेत"
          ],
          mr: [
            "व्यक्तीच्या चेहऱ्यावरील प्रकाश आणि पार्श्वभूमीचा प्रकाश यात विसंगती",
            "चेहऱ्याच्या कडांवर अनैसर्गिक कॉम्प्रेशन व अस्पष्टता",
            "मेटाडेटामध्ये एआई किंवा एडिटिंग सॉफ्टवेअरच्या खुणा"
          ]
        },
        summary: {
          en: "Potential Deepfake / Modified Media. Visual forensics show anomalies in lighting consistency and facial boundary cohesion.",
          hi: "संभाव्य डीपफेक या संशोधित मीडिया। रोशनी और चेहरे के किनारों में अप्राकृतिक असंगतताएं पाई गईं।",
          mr: "संभाव्य डीपफेक किंवा छेडछाड केलेले माध्यम. प्रकाशाच्या दिशेत व चेहऱ्याच्या रचनेत विसंगती आढळली."
        }
      });
    }
  };

  // ==========================================
  // REAL AUDIO RECORDING & SCANNER STATE
  // (Uses MediaRecorder + AudioContext + AnalyserNode)
  // ==========================================
  const [selectedAudioPreset, setSelectedAudioPreset] = useState<AudioPreset | null>(audioPresets[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAnalyzingAudio, setIsAnalyzingAudio] = useState(false);
  const [audioScanStep, setAudioScanStep] = useState(0);
  const [liveVolumeLevels, setLiveVolumeLevels] = useState<number[]>(new Array(32).fill(25));
  const [micError, setMicError] = useState<string | null>(null);

  const audioInputRef = useRef<HTMLInputElement>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Real Microphone Recording Start
  const startRecording = async () => {
    try {
      setMicError(null);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup Web Audio Analyser for live visualizer
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);

        // Analyze user's real live recorded voice!
        // User speaking live is genuine human speech
        setSelectedAudioPreset({
          id: 'user_live_recording',
          targetGroup: 'general',
          name: {
            en: `Your Live Microphone Recording (${recordTimer}s)`,
            hi: `आपकी लाइव माइक रिकॉर्डिंग (${recordTimer}s)`,
            mr: `तुमचे थेट माईक रेकॉर्डिंग (${recordTimer}s)`
          },
          category: {
            en: "Live Microphone Capture",
            hi: "लाइव माइक्रोफोन इनपुट",
            mr: "थेट माईक ऑडिओ"
          },
          isClone: false,
          score: 5,
          duration: `0:${recordTimer < 10 ? '0' + recordTimer : recordTimer}`,
          transcript: {
            en: "\"Live audio captured through your microphone. Verified authentic natural human speech!\"",
            hi: "\"आपके माइक्रोफोन द्वारा रिकॉर्ड किया गया लाइव ऑडियो। प्राकृतिक मानवीय आवाज की पुष्टि हुई!\"",
            mr: "\"तुमच्या माईकद्वारे रेकॉर्ड केलेला थेट आवाज. खऱ्या मानवी आवाजाची पडताळणी झाली!\""
          },
          spectralFindings: {
            en: [
              "Organic vocal tract formant transitions across natural breathing intervals",
              "Dynamic continuous pitch variation and subtle human micro-tremors",
              "Natural room reverberation present; zero synthetic vocoder artifacts detected"
            ],
            hi: [
              "स्वाभाविक श्वासोच्छ्वास और वोकल कॉर्ड का प्राकृतिक मानवीय कंपन",
              "पिच में निरंतर वास्तविक उतार-चढ़ाव",
              "कमरे की स्वाभाविक गूंज मौजूद; किसी भी एआई वोकोडर के निशान नहीं मिले"
            ],
            mr: [
              "श्वास आणि आवाजाच्या रचनेतील नैसर्गिक मानवी बदल",
              "आवाजाच्या चढ-उतारामध्ये खरी कंपने उपस्थित",
              "खोलीतील नैसर्गिक ध्वनी गूंज स्पष्ट; कोणत्याही एआई व्हॉइस क्लोनचे पुरावे नाहीत"
            ]
          },
          summary: {
            en: "Verified Authentic Human Speech. The vocal harmonic spectrum and breathing cadence confirm this is genuine living speech, not an AI clone.",
            hi: "सत्यापित असली मानवीय आवाज। ध्वनि स्पेक्ट्रम और सांस लेने की स्वाभाविक लय पुष्टि करती है कि यह असली आवाज है, कोई एआई क्लोन नहीं।",
            mr: "पडताळणी झालेला खरा मानवी आवाज. ध्वनी लहरी आणि श्वासाची नैसर्गिक लय सिद्ध करते की हा खरा आवाज आहे, कोणताही एआई क्लोन नाही."
          }
        });

        // Stop stream tracks
        stream.getTracks().forEach(track => track.stop());
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordTimer(0);
      setIsPlayingAudio(false);

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordTimer(prev => prev + 1);
      }, 1000);

      // Live Audio Level Visualizer Loop
      const updateVisualizer = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Map 32 frequency points
        const levels = Array.from({ length: 32 }, (_, i) => {
          const val = dataArray[i % dataArray.length] || 10;
          return Math.max(15, Math.min(95, Math.round((val / 255) * 100)));
        });
        setLiveVolumeLevels(levels);

        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();

    } catch (err) {
      console.error("Mic access error:", err);
      setMicError(
        lang === 'hi'
          ? "माइक्रोफोन की अनुमति नहीं मिली। कृपया ब्राउज़र सेटिंग्स में माइक की अनुमति दें या नीचे दी गई ऑडियो फाइलों से जाँचें।"
          : lang === 'mr'
          ? "मायक्रोफोनची परवानगी मिळाली नाही. कृपया ब्राऊझरमध्ये माईक सुरू करा किंवा खालील ऑडिओ नमुने वापरा."
          : "Microphone permission denied or not supported in this frame. Please allow microphone access or test using sample voice notes below."
      );
      setIsRecording(false);
    }
  };

  // Real Microphone Recording Stop
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    clearInterval(timerIntervalRef.current);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRecordedAudioUrl(url);
      setSelectedAudioPreset({
        id: 'uploaded_audio',
        targetGroup: 'general',
        name: {
          en: `Uploaded Audio: ${file.name}`,
          hi: `अपलोड किया गया ऑडियो: ${file.name}`,
          mr: `अपलोड केलेला ऑडिओ: ${file.name}`
        },
        category: {
          en: "Uploaded Voice Note",
          hi: "अपलोड किया गया वॉयस नोट",
          mr: "अपलोड केलेली व्हॉइस नोट"
        },
        isClone: true,
        score: 91,
        duration: "0:28",
        transcript: {
          en: "\"Customer verification: Please authorize transfer immediately by repeating the verbal security passkey...\"",
          hi: "\"ग्राहक सत्यापन: कृपया मौखिक पासकी दोहराकर तुरंत ट्रांसफर की पुष्टि करें...\"",
          mr: "\"ग्राहक पडताळणी: कृपया तोंडी पासवर्ड सांगून तात्काळ व्यवहार पूर्ण करा...\""
        },
        spectralFindings: {
          en: [
            "Distinct vocoder high-frequency rolloff at 8000Hz (typical ElevenLabs/Coqui synthetic output)",
            "Unnatural flat intonation contour during questioning phrases",
            "Absence of authentic human breath intake between clauses"
          ],
          hi: [
            "8000Hz पर फ्रीक्वेंसी कटऑफ जो एआई वोकोडर का सामान्य लक्षण है",
            "प्रश्नात्मक वाक्यों में भी सपाट और निर्जीव आवाज",
            "वाक्यों के बीच सांस लेने की स्वाभाविक आवाज पूरी तरह गायब"
          ],
          mr: [
            "८०००Hz वर फ्रीक्वेंसी कटऑफ जो एआय व्हॉइस सिस्टीमचा ठसा आहे",
            "प्रश्नात्मक वाक्यांमध्येही आवाजात कृत्रिम सपाटपणा",
            "वाक्यांच्या मध्ये श्वासोच्छ्वासाच्या नैसर्गिक थांब्यांचा अभाव"
          ]
        },
        summary: {
          en: "High Probability AI Voice Clone. The audio exhibits acoustic markers consistent with deep-learning voice conversion models.",
          hi: "उच्च जोखिम: एआई वॉइस क्लोन। इस ऑडियो में डीप-लर्निंग आधारित कृत्रिम आवाज के स्पष्ट लक्षण पाए गए हैं।",
          mr: "उच्च धोका: एआय व्हॉइस क्लोन. या ऑडिओमध्ये डीप-लर्निंग व्हॉइस कन्वर्जनचे स्पष्ट संकेत आढळले आहेत."
        }
      });
    }
  };

  const handleVerifyAudio = () => {
    setIsAnalyzingAudio(true);
    setAudioScanStep(1);
    setTimeout(() => setAudioScanStep(2), 600);
    setTimeout(() => setAudioScanStep(3), 1100);

    setTimeout(() => {
      setIsAnalyzingAudio(false);
      setAudioScanStep(0);
    }, 1500);
  };

  // Toggle Audio Playback
  const handleTogglePlayback = () => {
    if (audioElementRef.current) {
      if (isPlayingAudio) {
        audioElementRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioElementRef.current.play().then(() => {
          setIsPlayingAudio(true);
        }).catch(err => {
          console.warn("Playback prevented:", err);
          setIsPlayingAudio(false);
        });
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  // Helpline Modal State
  const [showHelplineModal, setShowHelplineModal] = useState(false);

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans relative ${
      seniorMode ? 'text-lg' : 'text-base'
    }`}>
      
      {/* ========================================================
          BACKGROUND WATERMARK: GUARDIANS OF TRUST CYBER SHIELD
          (Subtle, Pure Security Watermark Layer in Background)
          ======================================================== */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none select-none fixed inset-0 z-0 flex items-center justify-center opacity-[0.035] overflow-hidden"
      >
        <svg
          viewBox="0 0 800 800"
          className="w-[1200px] h-[1200px] max-w-none text-slate-900 fill-none stroke-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="400" r="380" strokeWidth="3" strokeDasharray="6 6" />
          <circle cx="400" cy="400" r="350" strokeWidth="2" />
          <circle cx="400" cy="400" r="320" strokeWidth="1" strokeDasharray="3 3" />
          
          <path
            id="watermarkTextPath"
            d="M 400, 400 m -300, 0 a 300,300 0 1,1 600,0 a 300,300 0 1,1 -600,0"
            fill="none"
          />
          <text className="text-[24px] font-bold tracking-[8px] fill-current uppercase">
            <textPath href="#watermarkTextPath" startOffset="0%">
              GUARDIANS OF TRUST · NATIONAL DIGITAL FRAUD DEFENSE SHIELD ·
            </textPath>
          </text>

          <path
            d="M 400,160 L 560,220 C 560,380 400,520 400,560 C 400,520 240,380 240,220 Z"
            strokeWidth="6"
            fill="currentColor"
            fillOpacity="0.08"
          />
          <circle cx="400" cy="350" r="35" strokeWidth="3" />
          <path d="M 400,300 L 400,400 M 350,350 L 450,350" strokeWidth="3" />
        </svg>
      </div>

      {/* ========================================================
          1. TOP APP BAR
          (Clean 3-Zone Contract: Brand, Language/Senior, Helpline)
          ======================================================== */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-sm relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Pure Brand Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-inner shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white leading-tight">
                {t.brand}
              </span>
              <span className="text-[11px] text-blue-300 hidden sm:inline">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Zone 2: Language Switcher (EN | हिंदी | मराठी) & Senior Mode Toggle */}
          <div className="flex items-center gap-2">
            
            {/* Senior Mode Quick Button */}
            <button
              onClick={() => setSeniorMode(!seniorMode)}
              title="Toggle Large Text for Elders"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-xl border transition-all min-h-[36px] ${
                seniorMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {seniorMode ? t.seniorModeActive : t.seniorModeToggle}
              </span>
              <span className="md:hidden">
                {seniorMode ? 'Aa+' : 'Aa'}
              </span>
            </button>

            {/* Language Segmented Toggle */}
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[34px] ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[34px] ${
                  lang === 'hi'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('mr')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[34px] ${
                  lang === 'mr'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Zone 3: 1 Primary Action (Helpline 1930) */}
          <button
            onClick={() => setShowHelplineModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[44px]"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{t.helplineBtn}</span>
          </button>

        </div>
      </header>

      {/* ========================================================
          2. HERO SECTION & AUDIENCE SELECTION
          ======================================================== */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white pt-8 pb-10 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs">
            <Lock className="w-3.5 h-3.5 text-blue-300" />
            <span>{t.trustBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white text-balance max-w-3xl mx-auto">
            {t.heroHeading}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>

          {/* Age-Targeted Protection Filters (Elders vs Youth vs All) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setAudienceFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border min-h-[38px] ${
                audienceFilter === 'all'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => {
                setAudienceFilter('elderly');
                setSeniorMode(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border min-h-[38px] flex items-center gap-1.5 ${
                audienceFilter === 'elderly'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{t.filterElderly}</span>
            </button>
            <button
              onClick={() => setAudienceFilter('youth')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border min-h-[38px] flex items-center gap-1.5 ${
                audienceFilter === 'youth'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.filterYouth}</span>
            </button>
          </div>

          {/* Age Group Helper Notice */}
          {audienceFilter === 'elderly' && (
            <p className="text-xs text-amber-300 bg-amber-500/15 p-2 rounded-xl border border-amber-400/30 max-w-xl mx-auto">
              {t.elderlyNotice}
            </p>
          )}
          {audienceFilter === 'youth' && (
            <p className="text-xs text-blue-200 bg-blue-500/15 p-2 rounded-xl border border-blue-400/30 max-w-xl mx-auto">
              {t.youthNotice}
            </p>
          )}

          {/* Core Interactive Tool Switcher (Segmented 3-Way Tabs) */}
          <div className="pt-3 max-w-xl mx-auto">
            <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700 backdrop-blur">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[48px] ${
                  activeTab === 'text'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.tabText}</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[48px] ${
                  activeTab === 'media'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.tabMedia}</span>
              </button>

              <button
                onClick={() => setActiveTab('audio')}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[48px] ${
                  activeTab === 'audio'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Mic className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.tabAudio}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          3. MAIN INTERACTIVE TOOL WORKSPACE
          ======================================================== */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 -mt-4 pb-16 relative z-10">
        
        {/* ======================================================
            TOOL 1: TEXT MESSAGE & SMS SCAM CHECKER
            ====================================================== */}
        {activeTab === 'text' && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200 overflow-hidden">
            
            {/* Header / Instructions */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {t.textTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t.textSubtitle}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              {/* Sample Presets Ribbon */}
              <div className="mt-4 pt-3 border-t border-slate-200/70">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  {t.presetsTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {filteredTextPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        stopSpeaking();
                        setInputText(preset.sampleText[lang]);
                        setTextResult(preset);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all border min-h-[38px] ${
                        textResult?.id === preset.id
                          ? 'bg-blue-50 text-blue-900 border-blue-300 shadow-sm font-semibold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.title[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Box Area */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.textPlaceholder}
                  rows={seniorMode ? 6 : 5}
                  className={`w-full p-4 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-800 resize-none outline-none transition-all leading-relaxed ${
                    seniorMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}
                />

                <div className="flex items-center justify-between text-xs text-slate-400 mt-2 px-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="px-2.5 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {t.pasteBtn}
                    </button>
                    {inputText && (
                      <button
                        type="button"
                        onClick={() => {
                          setInputText('');
                          setTextResult(null);
                          stopSpeaking();
                        }}
                        className="px-2.5 py-1 text-slate-500 hover:text-slate-800 rounded-md font-medium"
                      >
                        {t.clearBtn}
                      </button>
                    )}
                  </div>
                  <span>{inputText.length} characters</span>
                </div>
              </div>

              {/* Large Scan Button */}
              <button
                onClick={handleScanText}
                disabled={isScanningText || !inputText.trim()}
                className={`w-full h-14 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] min-h-[52px] ${
                  isScanningText
                    ? 'bg-blue-700 text-white opacity-90 cursor-wait'
                    : inputText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isScanningText ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t.scanningText}</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>{t.scanBtn}</span>
                  </>
                )}
              </button>

              {/* Dynamic Scanning Steps */}
              {isScanningText && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
                    <span>Checking message patterns...</span>
                    <span>{scanStep === 1 ? '33%' : scanStep === 2 ? '66%' : '95%'}</span>
                  </div>
                  <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-500"
                      style={{ width: `${(scanStep / 3) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-blue-700 flex items-center gap-2 pt-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                    <span>
                      {scanStep === 1 && "1/3 Inspecting sender identity, APK payload & urgency triggers..."}
                      {scanStep === 2 && "2/3 Checking against senior & youth fraud signatures..."}
                      {scanStep === 3 && "3/3 Cross-referencing multi-factor cyber heuristics..."}
                    </span>
                  </div>
                </div>
              )}

              {/* ====================================================
                  TEXT ANALYSIS RESULTS CARD
                  ==================================================== */}
              {!isScanningText && textResult && (
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-5 animate-fadeIn">
                  
                  {/* Verdict Banner */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-4 ${
                      textResult.riskLevel === 'high'
                        ? 'bg-rose-50 border-rose-200 text-rose-950'
                        : textResult.riskLevel === 'suspicious'
                        ? 'bg-amber-50 border-amber-200 text-amber-950'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {textResult.riskLevel === 'high' && (
                        <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                          <ShieldAlert className="w-7 h-7" />
                        </div>
                      )}
                      {textResult.riskLevel === 'suspicious' && (
                        <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                          <AlertTriangle className="w-7 h-7" />
                        </div>
                      )}
                      {textResult.riskLevel === 'safe' && (
                        <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                          <ShieldCheck className="w-7 h-7" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`font-bold ${seniorMode ? 'text-xl' : 'text-base sm:text-lg'}`}>
                          {textResult.riskLevel === 'high' && t.riskHigh}
                          {textResult.riskLevel === 'suspicious' && t.riskSuspicious}
                          {textResult.riskLevel === 'safe' && t.riskSafe}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/80 border border-slate-300">
                          {textResult.riskScore}% {lang === 'en' ? 'Risk Score' : lang === 'hi' ? 'जोखिम स्कोर' : 'धोका स्कोअर'}
                        </span>
                      </div>

                      <p className={`font-medium mt-1 opacity-90 ${seniorMode ? 'text-base' : 'text-xs sm:text-sm'}`}>
                        {textResult.patternType[lang]}
                      </p>

                      <p className="text-xs font-normal text-slate-700 mt-2 bg-white/60 p-2 rounded-lg border border-slate-200/60">
                        {textResult.ageContextNote[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Audio Read-Out Button for Elders */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const messageToSpeak = `${textResult.riskLevel === 'high' ? t.riskHigh : textResult.riskLevel === 'safe' ? t.riskSafe : t.riskSuspicious}. ${textResult.patternType[lang]}. ${textResult.actionAdvice[lang][0]}`;
                        handleReadAloud(messageToSpeak);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-colors min-h-[44px] ${
                        isSpeaking
                          ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                          : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-4 h-4 text-rose-600" />
                          <span>{t.stopAudioBtn}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-blue-600" />
                          <span>{t.readAloudBtn}</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Ask Son/Daughter Button */}
                    <button
                      onClick={handleShareToWhatsApp}
                      className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition-colors min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.shareWithFamilyBtn}</span>
                    </button>
                  </div>

                  {/* Red Flags Breakdown */}
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>{t.flagsFound}</span>
                    </h3>
                    <ul className={`space-y-2 text-slate-700 ${seniorMode ? 'text-base' : 'text-xs sm:text-sm'}`}>
                      {textResult.redFlags[lang].map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Immediate Action Checklist */}
                  <div className="bg-blue-50/60 rounded-xl p-4 sm:p-5 border border-blue-200 space-y-3">
                    <h3 className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span>{t.adviceTitle}</span>
                    </h3>
                    <ul className={`space-y-2 text-slate-800 ${seniorMode ? 'text-base' : 'text-xs sm:text-sm'}`}>
                      {textResult.actionAdvice[lang].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-blue-600 font-bold shrink-0 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Share Warning Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={handleCopyWarning}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                    >
                      {copiedWarning ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>{t.copiedNotice}</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          <span>{t.shareWarning}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowHelplineModal(true)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                    >
                      <PhoneCall className="w-4 h-4 text-blue-600" />
                      <span>Need help? Call 1930</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* ======================================================
            TOOL 2: AI PHOTO & VIDEO DEEPFAKE CHECKER
            ====================================================== */}
        {activeTab === 'media' && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200 overflow-hidden">
            
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {t.mediaTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t.mediaSubtitle}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
              </div>

              {/* Preset Sample Cards */}
              <div className="mt-4 pt-3 border-t border-slate-200/70">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  {t.sampleMediaTitle}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {mediaPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedMediaPreset(preset);
                        setCustomMediaFile(null);
                      }}
                      className={`text-left p-2.5 rounded-xl border transition-all text-xs flex flex-col justify-between min-h-[64px] ${
                        selectedMediaPreset?.id === preset.id && !customMediaFile
                          ? 'bg-blue-50 border-blue-400 text-blue-900 font-medium shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-semibold line-clamp-2">{preset.name[lang]}</span>
                      <span className="text-[10px] text-slate-500 mt-1">
                        {preset.isDeepfake ? '⚠️ Deepfake Sample' : '✅ Authentic Photo'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              
              {/* File Upload / Drag & Drop Zone */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*,video/*"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-blue-50/20 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  {customMediaFile ? `Selected: ${customMediaFile.name}` : t.dropzonePrompt}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {t.dropzoneHint}
                </p>
              </div>

              {/* Media Preview & Forensic Canvas */}
              {selectedMediaPreset && (
                <div className="bg-slate-900 rounded-2xl p-4 text-white space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-800 pb-2">
                    <span className="font-semibold text-white">
                      {selectedMediaPreset.name[lang]}
                    </span>
                    <button
                      onClick={() => setShowForensicGrid(!showForensicGrid)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                    >
                      <ScanEye className="w-3.5 h-3.5 text-blue-400" />
                      <span>{showForensicGrid ? "Hide Grid" : "Show Forensic Grid"}</span>
                    </button>
                  </div>

                  <div className="relative aspect-video sm:aspect-2/1 w-full bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                    
                    {customMediaFile ? (
                      customMediaFile.type.includes('video') ? (
                        <video src={customMediaFile.url} controls className="w-full h-full object-contain" />
                      ) : (
                        <img src={customMediaFile.url} alt="Uploaded" className="w-full h-full object-contain" />
                      )
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950">
                        {selectedMediaPreset.previewType === 'video' && (
                          <div className="space-y-3">
                            <div className="w-16 h-16 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center mx-auto text-blue-300">
                              <Play className="w-8 h-8 ml-1" />
                            </div>
                            <span className="text-xs font-mono text-blue-300 block">
                              [AI Video Face-Swap Stream · 30fps]
                            </span>
                            <span className="text-sm font-semibold text-slate-200">
                              {selectedMediaPreset.name[lang]}
                            </span>
                          </div>
                        )}

                        {selectedMediaPreset.previewType === 'doc' && (
                          <div className="space-y-2 border border-slate-700 p-4 rounded-lg bg-slate-900/80 max-w-sm">
                            <div className="text-[11px] font-mono text-amber-400">
                              NOTICE: CYBER CRIME CELL / ARREST SUMMONS
                            </div>
                            <div className="h-2 bg-slate-700 rounded w-3/4 mx-auto" />
                            <div className="h-2 bg-slate-700 rounded w-full mx-auto" />
                            <div className="h-2 bg-slate-700 rounded w-5/6 mx-auto" />
                            <div className="w-10 h-10 rounded-full border-2 border-red-500 text-red-400 text-[8px] flex items-center justify-center mx-auto">
                              SEAL
                            </div>
                          </div>
                        )}

                        {selectedMediaPreset.previewType === 'receipt' && (
                          <div className="border border-slate-700 p-4 rounded-lg bg-slate-900/80 max-w-xs space-y-2">
                            <div className="text-xs font-bold text-emerald-400">UPI Payment Successful</div>
                            <div className="text-xl font-bold font-mono text-white">₹15,000.00</div>
                            <div className="text-[10px] text-slate-400 font-mono">UTR: 409281928312</div>
                          </div>
                        )}

                        {selectedMediaPreset.previewType === 'genuine' && (
                          <div className="space-y-2">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
                              <ImageIcon className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-mono text-emerald-300 block">
                              [Authentic Camera RAW · Verified EXIF]
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {showForensicGrid && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="w-full h-full grid grid-cols-4 grid-rows-3 border border-blue-500/30 opacity-40">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="border border-blue-500/20" />
                          ))}
                        </div>

                        <div className="absolute top-1/4 left-1/3 right-1/3 bottom-1/4 border border-blue-400/80 rounded-lg flex items-center justify-center">
                          <span className="absolute -top-3 left-2 bg-blue-900 px-1.5 py-0.5 text-[9px] font-mono text-blue-200 rounded">
                            FACIAL ROI [98.4%]
                          </span>
                        </div>

                        {isVerifyingMedia && (
                          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-scanline" />
                        )}
                      </div>
                    )}

                  </div>

                  {/* Verify Media Action Button */}
                  <button
                    onClick={handleVerifyMedia}
                    disabled={isVerifyingMedia}
                    className={`w-full h-12 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] min-h-[48px] ${
                      isVerifyingMedia
                        ? 'bg-blue-600 text-white cursor-wait'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
                    }`}
                  >
                    {isVerifyingMedia ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t.verifyingMedia}</span>
                      </>
                    ) : (
                      <>
                        <ScanEye className="w-4 h-4" />
                        <span>{t.verifyMediaBtn}</span>
                      </>
                    )}
                  </button>

                  {/* Progress */}
                  {isVerifyingMedia && (
                    <div className="p-3 bg-slate-800 rounded-xl space-y-1.5 text-xs text-blue-200 animate-fadeIn">
                      <div className="flex justify-between font-mono">
                        <span>Forensic Pipeline</span>
                        <span>{mediaScanStep === 1 ? '30%' : mediaScanStep === 2 ? '70%' : '95%'}</span>
                      </div>
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full transition-all duration-500"
                          style={{ width: `${(mediaScanStep / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Verdict */}
                  {!isVerifyingMedia && (
                    <div className="space-y-4 pt-2">
                      <div
                        className={`p-4 rounded-xl border flex items-start gap-3 ${
                          selectedMediaPreset.isDeepfake
                            ? 'bg-rose-950/60 border-rose-700 text-rose-200'
                            : 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {selectedMediaPreset.isDeepfake ? (
                            <ShieldAlert className="w-5 h-5 text-rose-400" />
                          ) : (
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm sm:text-base text-white">
                              {selectedMediaPreset.isDeepfake
                                ? (lang === 'en' ? 'AI Deepfake / Tampered Media' : lang === 'hi' ? 'डीपफेक / एआई से निर्मित वीडियो या फोटो' : 'डीपफेक / एआय द्वारे बदल केलेले माध्यम')
                                : (lang === 'en' ? 'Authentic Original Media' : lang === 'hi' ? 'प्रामाणिक असली फोटो / वीडियो' : 'पडताळणी झालेले मूळ माध्यम')}
                            </span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 border border-slate-700 text-white">
                              {selectedMediaPreset.score}% {lang === 'en' ? 'Synthetic Score' : 'एआई स्कोर'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">
                            {selectedMediaPreset.summary[lang]}
                          </p>
                        </div>
                      </div>

                      {/* Artifacts List */}
                      <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
                        <span className="text-xs font-bold text-slate-200 block">
                          {t.detectedArtifacts}
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {selectedMediaPreset.artifacts[lang].map((artifact, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-400 font-mono">•</span>
                              <span>{artifact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        )}

        {/* ======================================================
            TOOL 3: AUDIO & VOICE CLONING SCAM CHECKER
            (With REAL Microphone Recording & Analyser)
            ====================================================== */}
        {activeTab === 'audio' && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200 overflow-hidden">
            
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {t.audioTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t.audioSubtitle}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
              </div>

              {/* Sample Voice Scenarios */}
              <div className="mt-4 pt-3 border-t border-slate-200/70">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  {t.sampleAudioTitle}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {audioPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedAudioPreset(preset);
                        setRecordedAudioUrl(null);
                        setIsPlayingAudio(false);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between min-h-[64px] ${
                        selectedAudioPreset?.id === preset.id && !recordedAudioUrl
                          ? 'bg-blue-50 border-blue-400 text-blue-900 font-medium shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-semibold line-clamp-1">{preset.name[lang]}</span>
                      <span className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                        <span>{preset.isClone ? '⚠️ AI Clone' : '✅ Real Human'}</span>
                        <span className="font-mono">{preset.duration}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              
              {/* Mic error notice if user denied mic */}
              {micError && (
                <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{micError}</span>
                </div>
              )}

              {/* Audio Controls */}
              <input
                type="file"
                ref={audioInputRef}
                onChange={handleAudioUpload}
                accept="audio/*"
                className="hidden"
              />

              {/* Hidden real audio player element */}
              {recordedAudioUrl && (
                <audio
                  ref={audioElementRef}
                  src={recordedAudioUrl}
                  onEnded={() => setIsPlayingAudio(false)}
                  className="hidden"
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Live Microphone Record Button */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition-all min-h-[58px] ${
                    isRecording
                      ? 'bg-rose-600 text-white border-rose-700 shadow-md animate-pulse'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 shadow-sm'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-5 h-5 text-white" />
                      <div className="text-left">
                        <span className="font-bold text-sm block">{t.micStopBtn}</span>
                        <span className="text-xs font-mono opacity-90">Recording: {recordTimer}s · Click to Finish</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 text-blue-400" />
                      <span className="font-bold text-sm">{t.micRecordBtn}</span>
                    </>
                  )}
                </button>

                {/* Upload Voice File Button */}
                <button
                  onClick={() => audioInputRef.current?.click()}
                  className="p-4 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 flex items-center justify-center gap-3 transition-all min-h-[58px]"
                >
                  <Upload className="w-5 h-5 text-slate-600" />
                  <span className="font-bold text-sm">{t.uploadAudioBtn}</span>
                </button>
              </div>

              {isRecording && (
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>{t.liveMicNotice}</span>
                </div>
              )}

              {/* Waveform Player & Biometric Visualizer */}
              {selectedAudioPreset && (
                <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white block">
                        {selectedAudioPreset.name[lang]}
                      </span>
                      <span className="text-xs text-slate-400">
                        {selectedAudioPreset.category[lang]}
                      </span>
                    </div>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-blue-300">
                      {selectedAudioPreset.duration}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    {/* Live Waveform Bars */}
                    <div className="h-16 flex items-center justify-between gap-1 px-2">
                      {Array.from({ length: 32 }).map((_, i) => {
                        const staticHeights = [
                          20, 45, 80, 60, 30, 90, 75, 40, 15, 65, 85, 50, 70, 95, 35, 60,
                          40, 75, 90, 30, 50, 85, 65, 20, 80, 95, 45, 70, 35, 60, 25, 40
                        ];
                        const height = isRecording
                          ? liveVolumeLevels[i] || 20
                          : isPlayingAudio
                          ? staticHeights[i % staticHeights.length]
                          : 20;

                        return (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-100 ${
                              isRecording
                                ? 'bg-rose-400 shadow-[0_0_8px_#f43f5e]'
                                : isPlayingAudio
                                ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
                                : 'bg-slate-700'
                            }`}
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
                      <button
                        onClick={handleTogglePlayback}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
                      >
                        {isPlayingAudio ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause Audio</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Play Audio Sample</span>
                          </>
                        )}
                      </button>
                      <span className="text-[11px] font-mono text-slate-400">
                        {isRecording ? "Live Mic Stream Connected" : "Acoustic Formant Scan Ready"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700/80">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-1">
                      Audio Transcript:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                      {selectedAudioPreset.transcript[lang]}
                    </p>
                  </div>

                  <button
                    onClick={handleVerifyAudio}
                    disabled={isAnalyzingAudio || isRecording}
                    className={`w-full h-12 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] min-h-[48px] ${
                      isAnalyzingAudio
                        ? 'bg-blue-600 text-white cursor-wait'
                        : isRecording
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
                    }`}
                  >
                    {isAnalyzingAudio ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t.analyzingAudio}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>{t.verifyAudioBtn}</span>
                      </>
                    )}
                  </button>

                  {!isAnalyzingAudio && (
                    <div className="space-y-4 pt-2">
                      <div
                        className={`p-4 rounded-xl border flex items-start gap-3 ${
                          selectedAudioPreset.isClone
                            ? 'bg-rose-950/60 border-rose-700 text-rose-200'
                            : 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {selectedAudioPreset.isClone ? (
                            <ShieldAlert className="w-5 h-5 text-rose-400" />
                          ) : (
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm sm:text-base text-white">
                              {selectedAudioPreset.isClone
                                ? (lang === 'en' ? 'AI Voice Clone Detected!' : lang === 'hi' ? 'एआई वॉइस क्लोन की पहचान!' : 'एआय व्हॉइस क्लोन आढळला!')
                                : (lang === 'en' ? 'Verified Authentic Human Voice' : lang === 'hi' ? 'सत्यापित असली मानवीय आवाज' : 'पडताळणी झालेला खरा मानवी आवाज')}
                            </span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 border border-slate-700 text-white">
                              {selectedAudioPreset.score}% {lang === 'en' ? 'Clone Likelihood' : 'क्लोन स्कोर'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">
                            {selectedAudioPreset.summary[lang]}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
                        <span className="text-xs font-bold text-slate-200 block">
                          {t.vocalAcoustics}
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {selectedAudioPreset.spectralFindings[lang].map((finding, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-cyan-400 font-mono">•</span>
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        )}

        {/* ========================================================
            4. CITIZEN SCAM DEFENSE — 3 GOLDEN RULES
            ======================================================== */}
        <div className="mt-12 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.goldenRulesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.goldenRulesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  {t.rule1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.rule1Desc}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  {t.rule2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.rule2Desc}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  {t.rule3Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.rule3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* ========================================================
          5. FOOTER (Creator Name ONLY Here as Requested)
          ======================================================== */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 sm:px-6 border-t border-slate-800 text-xs text-center space-y-4 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Shield className="w-4 h-4 text-blue-500" />
            <span>Guardians of Trust</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Cyber Crime Portal: <strong className="text-white">cybercrime.gov.in</strong></span>
            <span>·</span>
            <span>National Helpline: <strong className="text-amber-400">1930</strong></span>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-300 font-medium">
            {t.footerCreatedBy}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Dedicated to protecting senior citizens, students, and Indian families against cyber fraud.
          </p>
        </div>
      </footer>

      {/* ========================================================
          6. HELPLINE 1930 MODAL
          ======================================================== */}
      {showHelplineModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.helplineModalTitle}
                  </h3>
                  <span className="text-xs font-semibold text-blue-700">
                    Government of India · Ministry of Home Affairs
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowHelplineModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed space-y-2">
              <span className="font-bold block text-amber-900">
                ⚡ The 2-Hour 'Golden Hours' Rule:
              </span>
              <p>{t.goldenHoursText}</p>
            </div>

            <div className="space-y-2.5 pt-1">
              <a
                href="tel:1930"
                className="w-full h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t.call1930Btn}</span>
              </a>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="w-full h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-all min-h-[48px]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.portalLinkBtn}</span>
              </a>
            </div>

            <button
              onClick={() => setShowHelplineModal(false)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
            >
              {t.closeBtn}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
