import React, { useState, useRef, useEffect } from "react";
import { ResearchCategory, ResearchQA } from "../types";
import { Send, Sparkles, BookOpen, AlertCircle, RefreshCw, Layers, Camera, CameraOff, X, Image as ImageIcon, RotateCw } from "lucide-react";

interface ResearchFormProps {
  onAddResearch: (research: ResearchQA) => void;
  isOffline: boolean;
}

// Help suggestions representing our full list of topics requested by the user:
// air, udara, api, tanah, samudera, cakrawala, fisika, kimia, biologi, regulasi, dsb.
const SUGGESTIONS_BY_CATEGORY = {
  [ResearchCategory.EKONOMI_BISNIS]: [
    "Dampak fluktuasi pasar komoditas global terhadap siklus ekspor minyak sawit nasional.",
    "Bagaimana peluang bisnis agritech sirkular mengatasi krisis air perkebunan kopi?",
    "Pembangunan ekonomi berkelanjutan berbasis pemetaan pertanahan pesisir lokal."
  ],
  [ResearchCategory.SAINS_TEKNOLOGI]: [
    "Analisis fisika termokimia energi api komposit terhadap pemulihan silikat tanah.",
    "Potensi teknologi satelit radar sintetis untuk memetakan batas samudera dan cakrawala.",
    "Bagaimana struktur biokimia air tanah berpengaruh pada ketahanan perkebunan nusantara?"
  ],
  [ResearchCategory.ALAM_SUMBER_DAYA]: [
    "Integrasi pertanian pesisir terpadu dan peternakan kambing pantai memanfaatkan rumput laut.",
    "Siklus kadar hara tanah pasca-kebakaran hutan terkendali serta restorasi mikroba udara.",
    "Pengaruh dinamika arus samudera terhadap ketahanan pasokan ikan tangkap dan perkebunan."
  ],
  [ResearchCategory.REGULASI_ANALISIS]: [
    "Analisis peraturan pertanahan nasional terhadap batasan hak guna usaha perkebunan karet.",
    "Bagaimana kesimpulan riset nasional mengenai batasan baku mutu emisi industri udara?",
    "Visi misi regulasi kelautan terpadu demi menyeleraskan kedaulatan pariwisata bahari."
  ],
  [ResearchCategory.KESEHATAN_MASA_DEPAN]: [
    "Proyeksi kesehatan global terkait polusi mikroplastik air samudera dan dampaknya pada generasi biologi.",
    "Siklus pemulihan ekosistem tanah pasca-kontaminasi industri pertambangan masa depan.",
    "Analisis ancaman krisis oksigen makro dari penurunan fitoplankton samudera dunia keseluruhan."
  ]
};

export default function ResearchForm({ onAddResearch, isOffline }: ResearchFormProps) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<ResearchCategory>(ResearchCategory.SAINS_TEKNOLOGI);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<{ type: string; message: string } | null>(null);

  // Camera and Mobile attachment states
  const [showCameraConsole, setShowCameraConsole] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Monitor live streaming lifecycle in modal overlay
  useEffect(() => {
    let activeStream: MediaStream | null = null;
    
    if (showCameraConsole) {
      const startLiveStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: facingMode } },
            audio: false
          });
          activeStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Native browsers trigger autoplay, but play handles edge cases safely
            videoRef.current.play().catch(e => console.log("Stream play interrupted gracefully", e));
          }
        } catch (err) {
          console.error("Standard camera streaming failed/blocked:", err);
          alert("Aliran video perangkat langsung terblokir atau tidak didukung di peramban ini.\n\nTips: Silakan pakai opsi 'Kamera Mobile HP (Sistem)' atau 'Unggah Foto' di sebelah untuk akses kamera instan melalui dialog native.");
          setShowCameraConsole(false);
        }
      };

      startLiveStream();
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showCameraConsole, facingMode]);

  // Utility to resize and compress any input image to save precious LocalStorage quota
  const compressAndSetPhoto = (rawBase64Url: string) => {
    const img = new Image();
    img.src = rawBase64Url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_BOUND = 540; // Perfect balanced resolution for visual clarity vs quota size
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > MAX_BOUND) {
          height *= MAX_BOUND / width;
          width = MAX_BOUND;
        }
      } else {
        if (height > MAX_BOUND) {
          width *= MAX_BOUND / height;
          height = MAX_BOUND;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Save as compressed JPEG with 60% quality
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
        setCapturedPhoto(compressedBase64);
      }
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          compressAndSetPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    setErrorInfo(null);
  };

  const captureSnapshot = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 480;
      
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, w, h);
        compressAndSetPhoto(canvas.toDataURL("image/jpeg", 0.9));
      }
      setShowCameraConsole(false);
    }
  };

  const triggerOCRScan = () => {
    if (!capturedPhoto) return;
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      let ocrQuestion = "";
      
      switch (category) {
        case ResearchCategory.EKONOMI_BISNIS:
          ocrQuestion = "Hasil pemindaian catatan: Analisis kelayakan bisnis industri minyak kelapa sawit rakyat dengan sirkulasi hara tanah berkelanjutan.";
          break;
        case ResearchCategory.SAINS_TEKNOLOGI:
          ocrQuestion = "Hasil pemindaian laboratorium: Formulasi rumus fisika termodinamika energi api kinetik di bawah pengaruh tekanan hidraulik air tanah.";
          break;
        case ResearchCategory.ALAM_SUMBER_DAYA:
          ocrQuestion = "Hasil pemindaian lapangan: Pemetaan korelasi kandungan hara nitrogen tanah pasca-kebakaran hutan dan sirkulasi mikroba udara.";
          break;
        case ResearchCategory.REGULASI_ANALISIS:
          ocrQuestion = "Hasil pemindaian jurnal: Tinjauan sinkronisasi regulasi pertanahan nasional UU No.5 terhadap rencana tata ruang pesisir samudera terpadu.";
          break;
        case ResearchCategory.KESEHATAN_MASA_DEPAN:
          ocrQuestion = "Hasil pemindaian klinis: Analisis komparatif krisis oksigen biotik akibat polusi mikroplastik air samudera terhadap generasi biokimia bumi.";
          break;
        default:
          ocrQuestion = "Hasil pemindaian: Kajian komprehensif sains nusantara dan sirkulasi air tanah perkebunan nusantara rujukan akademik.";
      }
      
      setQuestion(ocrQuestion);
    }, 2000);
  };

  const activeSuggestions = SUGGESTIONS_BY_CATEGORY[category] || [];

  const handleSuggestionClick = (sug: string) => {
    setQuestion(sug);
    setErrorInfo(null);
  };

  const executeAnalysis = async (useAI: boolean) => {
    if (!question.trim()) return;

    setLoading(true);
    setErrorInfo(null);

    // 1. Strict Emergency Lockdown mode check
    if (localStorage.getItem("litera_lockdown_active") === "true") {
      setErrorInfo({
        type: "SERVER_ERROR",
        message: "❌ BLOKADE: Sistem saat ini berada dalam karantina LOCKDOWN darurat. Penulisan ke database dilarang sementara untuk menjamin keamanan siber."
      });
      setLoading(false);
      return;
    }

    // 2. Proactive anti-hacking XSS payload scanning
    const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|onclick|onload|onerror|javascript:/i;
    if (xssPattern.test(question)) {
      setQuestion(prev => prev.replace(/<[^>]*>/g, ""));
      
      const event = new CustomEvent("litera-security-threat", {
        detail: {
          type: "XSS",
          payload: "Dideteksi tag HTML/JS",
          message: "Proteksi WAF mendeteksi payload XSS berbahaya di kotak masukan riset. Input langsung dinonaktifkan.",
          severity: "HIGH"
        }
      });
      window.dispatchEvent(event);

      setErrorInfo({
        type: "SERVER_ERROR",
        message: "⚠️ SISTEM KEAMANAN: Terdeteksi muatan kode skrip mencurigakan (XSS). Operasi dicegah demi menjamin keamanan."
      });
      setLoading(false);
      return;
    }

    // 3. Proactive SQL injection detection
    const sqliPattern = /'|--|or\s+1\s*=\s*1|union\s+select/i;
    if (sqliPattern.test(question)) {
      const event = new CustomEvent("litera-security-threat", {
        detail: {
          type: "SQL_INJECTION",
          payload: question.substring(0, 40),
          message: "Firewall memblokir query SQL injection bypass pada parameter formulir pencatatan.",
          severity: "CRITICAL"
        }
      });
      window.dispatchEvent(event);

      setErrorInfo({
        type: "SERVER_ERROR",
        message: "⚠️ SISTEM KEAMANAN: Terdeteksi upaya bypass database (SQL injection). Sistem pertahanan mengunci instruksi ini."
      });
      setLoading(false);
      return;
    }

    // If offline mode is enabled, force local simulated assistant compilation
    const runAsAI = useAI && !isOffline;

    if (runAsAI) {
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, category })
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.error === "GEMINI_API_KEY_MISSING") {
            setErrorInfo({
              type: "API_KEY",
              message: data.message || "Kunci API Gemini terdeteksi tidak diisi."
            });
          } else {
            setErrorInfo({
              type: "SERVER_ERROR",
              message: data.message || "Gagal menghubungi modul analisis server."
            });
          }
          setLoading(false);
          return;
        }

        // Add ID and timestamp and trigger parent updating
        const newResearch: ResearchQA = {
          ...data,
          id: `custom-${Date.now()}`,
          category,
          createdAt: new Date().toISOString(),
          isCustom: true,
          imageAttachment: capturedPhoto || undefined
        };

        onAddResearch(newResearch);
        setQuestion("");
        setCapturedPhoto(null);
        setLoading(false);

      } catch (err: any) {
        setErrorInfo({
          type: "CONNECT_ERROR",
          message: "Koneksi terputus. Pastikan server dev berjalan dengan normal."
        });
        setLoading(false);
      }
    } else {
      // Simulate/Generate high-quality academic response locally/offline
      setTimeout(() => {
        const simulatedTags = ["Sains", "Ekonomi", "Analisis", "Offline_Draft"];
        if (question.toLowerCase().includes("air")) {
          simulatedTags.push("Air");
          simulatedTags.push("Matematika");
        }
        if (question.toLowerCase().includes("udara")) {
          simulatedTags.push("Udara");
          simulatedTags.push("Turbin");
        }
        if (question.toLowerCase().includes("api")) {
          simulatedTags.push("Api");
          simulatedTags.push("Termal");
        }
        if (question.toLowerCase().includes("tanah")) {
          simulatedTags.push("Tanah");
          simulatedTags.push("Statistika");
        }
        if (question.toLowerCase().includes("samudera") || question.toLowerCase().includes("laut")) simulatedTags.push("Kelautan");
        if (question.toLowerCase().includes("regulasi")) simulatedTags.push("Regulasi");

        const simulatedAnswerObj: ResearchQA = {
          id: `offline-${Date.now()}`,
          category,
          tags: Array.from(new Set(simulatedTags)).slice(0, 5),
          question: question,
          summary: `[Rekaman Offline] Kajian akademik teoretis mengenai: "${question.substring(0, 60)}..."`,
          answer: `### Kajian Teoretis Komprehensif & Formulasi Matematika\n\nAnalisis teoretis mendalam mengenai **${question}** telah berhasil direkam secara **Offline** dalam sistem pustaka terdistribusi Lokal.\n\n### 1. Formulasi & Model Matematika Terkait\nBerdasarkan parameter fisis dan statistika data, kami menyematkan kerangka rumus matematika lingkungan:\n\n* **Persamaan Distribusi Tekanan Hidraulik (Elemen Air)**:\n  $$P = \\eta \\cdot \\rho \\cdot g \\cdot Q \\cdot h$$\n\n* **Persamaan Kinetik Dinamika Udara**:\n  $$P_{teoretis} = 0.5 \\cdot C_p \\cdot \\rho \\cdot A \\cdot v^3$$\n\n* **Analisis Korelasi Hubungan Pengamatan (Statistika)**:\n  $$r = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sqrt{\\sum (X_i - \\bar{X})^2 \\sum (Y_i - \\bar{Y})^2}}$$\n\n### 2. Tinjauan Pustaka Terakreditasi\nTinjauan literatur terpercaya menegaskan perlunya sinergi sains fisika, reaksi kimia mikro, dan struktur kepatuhan hukum untuk menyokong keberhasilan peluang bisnis jangka panjang.\n\n### Parameter Pendukung Penelitian\n- **Parameter Fisika-Kimia**: Tingkat kejenuhan mineral dan pemantauan suhu termal mikro.\n- **Kepatuhan Regulasi**: Integrasi tata ruang pertanahan sesuai Perpres No. 24 RI.`,
          analysis: {
            conclusion: "Integrasi sistemis dalam kondisi offline membuktikan bahwa pencatatan data mandiri dapat tersinkronisasi sempurna setelah akses internet kembali pulih.",
            limitations: "Ketiadaan konektivitas internet membatasi pemanggilan langsung klaster API Gemini, tetapi asisten lokal memberikan model formula aproksimasi yang sangat akurat.",
            opportunities: "Mendorong pembentukan modul pencatatan sains di wilayah pelosok (off-grid tracking) untuk ketahanan hara kelapa sawit.",
            cycles: "Siklus pengulangan pengamatan mandiri direkomendasikan setiap 12 jam selama kondisi tanpa jaringan.",
            visionMission: "Mewujudkan stabilitas riset nirlaba tanpa hambatan geografis koordinat sinyal, menjaga akreditasi kearsipan nusantara."
          },
          bibliographies: [
            {
              id: "[Offline-Kaji]",
              title: "Pedoman Kearsipan Riset Mandiri di Lapangan Off-Grid",
              author: "Litera Pustaka Nasional",
              year: "2025",
              source: "Jurnal Metodologi & Riset Lapangan Terpencil",
              url: "https://example.com/pustaka-lapangan"
            }
          ],
          createdAt: new Date().toISOString(),
          isCustom: true,
          isOfflineDraft: true, // Flagged as offline draft
          imageAttachment: capturedPhoto || undefined
        };

        onAddResearch(simulatedAnswerObj);
        setQuestion("");
        setCapturedPhoto(null);
        setLoading(false);
      }, 900);
    }
  };

  return (
    <div className="research-ui-card p-6 mb-8">
      {/* Offline Alert Banner */}
      {isOffline && (
        <div id="offline-form-badge" className="mb-4 p-3 bg-amber-500/10 border border-amber-500/25 text-amber-800 rounded-2xl flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <div className="font-sans leading-normal">
            <strong>Mode Offline Aktif</strong> &bull; Riset akan direkam ke database lokal dan ditandai sebagai draft belum sinkron.
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
          <BookOpen size={20} />
        </div>
        <div>
          <h2 className="text-base font-bold tracking-tight research-ui-title">
            Meja Pengajuan Riset & Formulasi Pertanyaan
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Ketik pertanyaan mengenai ekonomi kelompok, masa depan, elemen alam (air, udara, api, tanah) atau sains
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Dropdown Category select */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
            Pilihlah Bidang / Disiplin Ilmu Utama
          </label>
          <div className="relative">
            <select
              id="category-selector-dropdown"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as ResearchCategory);
                setErrorInfo(null);
              }}
              className="w-full px-4 py-2.5 appearance-none text-sm font-medium cursor-pointer research-ui-input text-slate-705"
            >
              {Object.values(ResearchCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
              <Layers size={16} />
            </span>
          </div>
        </div>

        {/* Text Area for custom Question */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
            Tulis Pertanyaan Kajian Analitis Anda
          </label>
          <textarea
            id="question-input-textarea"
            rows={3}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setErrorInfo(null);
            }}
            placeholder="Bagaimana kaitan termodinamika energi api sirkular dan struktur kimia tanah perkebunan nusantara di masa depan?"
            className="w-full px-4 py-3 placeholder-slate-400 text-sm focus:outline-none transition-all research-ui-input"
          />
        </div>

        {/* Mobile & Desktop Camera Capture Desk */}
        <div className="bg-slate-50/40 rounded-2xl p-4 border border-slate-150">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 font-mono">
            Kamera Lapangan & Lampiran Foto Catatan
          </label>
          <div className="flex flex-wrap gap-2 mb-1.5">
            <button
              id="start-live-camera-btn"
              type="button"
              onClick={() => {
                setShowCameraConsole(true);
                setErrorInfo(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 font-mono font-bold text-[10.5px] rounded-xl transition duration-200 cursor-pointer border border-emerald-500/15"
            >
              <Camera size={13} />
              <span>Buka Kamera Live</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-[10.5px] rounded-xl transition duration-200 cursor-pointer border border-slate-250">
              <Camera size={13} className="text-indigo-650" />
              <span>Kamera HP (Native OS)</span>
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>

            <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-[10.5px] rounded-xl transition duration-200 cursor-pointer border border-slate-250">
              <ImageIcon size={13} className="text-slate-500" />
              <span>Unggah dari Galeri</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
          </div>

          {/* Captured photo preview drawer */}
          {capturedPhoto && (
            <div className="mt-3 border border-slate-200 bg-white rounded-2xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-300">
              <div className="relative w-full sm:w-28 h-40 sm:h-28 rounded-xl overflow-hidden shadow-xs bg-slate-100 shrink-0 border border-slate-200">
                <img 
                  src={capturedPhoto} 
                  alt="Catatan Lapangan" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Laser scan animation line */}
                {isScanning && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                    <div className="w-full h-0.5 bg-emerald-450 absolute left-0 animate-bounce" style={{ top: "45%" }} />
                    <span className="text-[9px] font-mono text-emerald-400 font-bold animate-pulse uppercase tracking-widest mt-2">Membaca...</span>
                  </div>
                )}
              </div>

              <div className="flex-grow flex flex-col justify-between py-1 space-y-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-800 font-sans tracking-wide flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-550 animate-pulse" />
                    Lampiran Foto Berhasil Direkam
                  </span>
                  <p className="text-slate-500 text-[10.5px] leading-relaxed">
                    Foto dari sensor peranti Anda berhasil disandikan ke dalam draf riset komprehensif ini.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    id="trigger-ocr-scan-btn"
                    type="button"
                    disabled={isScanning}
                    onClick={triggerOCRScan}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-[9.5px] uppercase rounded-lg transition duration-150 disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles size={11} />
                    <span>{isScanning ? "Memindai Teks..." : "Simulasi Ekstrak Teks OCR"}</span>
                  </button>
                  <button
                    id="delete-captured-photo-btn"
                    type="button"
                    onClick={() => {
                      setCapturedPhoto(null);
                      setErrorInfo(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 font-mono font-bold text-[9.5px] uppercase rounded-lg transition duration-150 cursor-pointer"
                  >
                    <X size={11} />
                    <span>Hapus Foto</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Prompts Row Based on Select Category */}
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            Saran Topik Rujukan Cepat:
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {activeSuggestions.map((sug, i) => (
              <button
                id={`suggestion-btn-${i}`}
                key={i}
                type="button"
                onClick={() => handleSuggestionClick(sug)}
                className="text-left py-1.5 px-3 bg-slate-50 hover:bg-emerald-50/50 rounded-xl text-xs text-slate-600 border border-slate-150 transition hover:text-emerald-800"
              >
                &rarr; {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Error Info Card block */}
        {errorInfo && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Informasi:</span> {errorInfo.message}
              </div>
            </div>
            {errorInfo.type === "API_KEY" && (
              <div className="pl-6 pt-1 flex gap-2">
                <button
                  id="offline-fallback-button"
                  type="button"
                  onClick={() => executeAnalysis(false)}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold font-mono text-[10px] uppercase cursor-pointer"
                >
                  Gunakan Asisten Offline (Cepat & Mandiri)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row gap-2 justify-end pt-2">
          {/* Simulated Offline Answer creation */}
          <button
            id="submit-offline-btn"
            type="button"
            disabled={loading || !question.trim()}
            onClick={() => executeAnalysis(false)}
            className="px-4 py-2.5 bg-slate-100/70 hover:bg-slate-200 disabled:opacity-50 text-slate-705 rounded-xl text-xs font-bold font-mono transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span>Kaji Cepat (Katalog Lokal)</span>
          </button>

          {/* AI Gemini core processing trigger */}
          <button
            id="submit-ai-analysis-btn"
            type="button"
            disabled={loading || !question.trim()}
            onClick={() => executeAnalysis(isOffline ? false : true)}
            className={`px-5 py-2.5 disabled:opacity-50 text-white rounded-xl text-xs font-bold font-mono transition duration-200 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
              isOffline 
                ? "bg-amber-650 hover:bg-amber-750" 
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Menganalisis Rujukan...</span>
              </>
            ) : isOffline ? (
              <>
                <Sparkles size={14} />
                <span>Simpan Draft Offline</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Analisis Akademis (Gemini AI)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live web camera streaming container console */}
      {showCameraConsole && (
        <div id="live-camera-modal-overlay" className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-md border border-slate-200 flex flex-col animate-fade-in">
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-emerald-400 animate-pulse" />
                <h3 className="text-xs font-bold font-mono tracking-wider uppercase">Pemindai Kamera Live</h3>
              </div>
              <button 
                id="close-live-camera-btn"
                type="button"
                onClick={() => setShowCameraConsole(false)}
                className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video stream box */}
            <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Framing target guide marker */}
              <div className="absolute inset-6 border-2 border-dashed border-white/30 rounded-2xl pointer-events-none flex items-center justify-center">
                <div className="text-[10px] text-white/60 font-mono uppercase bg-black/50 px-3 py-1 rounded-full">
                  Posisikan Catatan / Sampel Lapangan
                </div>
              </div>
            </div>

            {/* Camera controls action shelf */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                id="toggle-facing-mode-btn"
                type="button"
                onClick={() => setFacingMode(prev => prev === "user" ? "environment" : "user")}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-mono font-bold text-[10px] rounded-xl transition cursor-pointer shadow-2xs"
                title="Beralih Kamera Depan/Belakang"
              >
                <RotateCw size={12} className="text-slate-500" />
                <span>Kamera {facingMode === "environment" ? "Belakang" : "Depan"}</span>
              </button>

              {/* Solid snapshot capture shutter */}
              <button
                id="shutter-capture-snapshot-btn"
                type="button"
                onClick={captureSnapshot}
                className="w-12 h-12 rounded-full border-4 border-emerald-500/20 bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer shrink-0"
                title="Ambil Foto"
              >
                <Camera size={20} />
              </button>

              <button
                id="cancel-camera-btn"
                type="button"
                onClick={() => setShowCameraConsole(false)}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-600 font-mono font-bold text-[10px] rounded-xl transition cursor-pointer shadow-2xs"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
