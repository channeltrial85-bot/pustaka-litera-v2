import React, { useState, useEffect } from "react";
import { ResearchQA, ResearchCategory } from "../types";
import { 
  Globe, 
  Zap, 
  Radio, 
  ArrowUpRight, 
  RefreshCw, 
  CheckCircle, 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  Layers, 
  Bookmark, 
  BookOpen, 
  Cpu, 
  Activity,
  Award
} from "lucide-react";

interface RealtimeWorldFeedProps {
  researches: ResearchQA[];
  onAddResearch: (research: ResearchQA) => void;
  visualTheme: "luks-akademis" | "neon-lab" | "sederhana-modern";
  saveToStorage: (updatedList: ResearchQA[]) => void;
}

interface WorldAdvancement {
  id: string;
  title: string;
  category: ResearchCategory;
  tags: string[];
  summary: string;
  source: string;
  publishedDate: string;
  impactLevel: "Transformasi Nasional" | "Terobosan Global" | "Kebijakan Strategis";
  fullResearch: ResearchQA;
}

const GLOBAL_BREAKTHROUGHS_2026: WorldAdvancement[] = [
  {
    id: "world-2026-1",
    title: "Sertifikasi Poligon Digital Sawit 2026 Menembus Pasar Ekspor Uni Eropa (EUDR)",
    category: ResearchCategory.EKONOMI_BISNIS,
    tags: ["Sawit", "EUDR", "Pertanahan", "Pasar", "2026"],
    summary: "Keberhasilan integrasi peta rujukan pertanahan nasional dengan citra satelit resolusi tinggi Sentinel-2, mengamankan ekspor kelapa sawit rakyat senilai 4,2 Miliar USD.",
    source: "Dewan Minyak Sawit Indonesia & Jurnal Hortikultura Nusantara",
    publishedDate: "Mei 2026",
    impactLevel: "Kebijakan Strategis",
    fullResearch: {
      id: "sync-world-1",
      category: ResearchCategory.EKONOMI_BISNIS,
      tags: ["Sawit", "EUDR", "Pertanahan", "Pasar", "2026"],
      question: "Bagaimana integrasi poligon digital pertanahan 2026 memelihara rantai pasok ekspor minyak kelapa sawit mandiri sesuai mandat EUDR?",
      summary: "Analisis spasial koordinat plot tanah sawit mandiri dalam mereduksi risiko deforestasi global.",
      answer: "### Integrasi Spasial Poligon & Geofencing Sawit Mandiri 2026\n\nMenghadapi berjalannya regulasi **European Union Deforestation Regulation (EUDR)** secara penuh, Indonesia meluncurkan platform **Satu Peta Sawit Rakyat 2026**.\n\n### 1. Formulasi Model Evaluasi Deforestasi\nKepatuhan diukur melalui indeks tumpang tindih kawasan hutan kritis ($I_{overlap}$):\n\n$$I_{overlap} = \\frac{\\sum (A_{poligon} \\cap A_{hutan})}{\\sum A_{poligon}} \\times 100\\%$$\n\nSistem secara otomatis menolak pasokan sertifikasi jika $I_{overlap} > 0\\%$. Hasil pemantauan real-time membuktikan sirkulasi ekonomi berlanjut stabil tanpa mengorbankan tutupan hutan hijau nusantara.\n\n### 2. Tinjauan Pustaka & Kebijakan Kemandirian\nTinjauan menegaskan bahwa standardisasi tata kelola pertanahan digital adalah benteng proteksi eksportir lokal untuk menembus klasifikasi regulasi ketat global.",
      analysis: {
        conclusion: "Aplikasi Satu Peta Sawit Rakyat 2026 menyelamatkan stabilitas pasar ekspor nasional sekaligus mendorong pendaftaran SHM terpadu.",
        limitations: "Biaya penentuan koordinat poligon presisi tinggi masih menjadi kendala di wilayah perkebunan yang tidak terjangkau sinyal telekomunikasi.",
        opportunities: "Peluang konsultansi manajemen sistem keterlacakan rantai pasok (traceability) dan integrasi data Web3 terdistribusi.",
        cycles: "Siklus pemutakhiran koordinat satelit disinkronkan secara periodik setiap 15 hari sekali mengikuti orbit sensor Sentinel-2.",
        visionMission: "Mencapai 100% sawit rakyat tersertifikasi bebas deforestasi di tahun 2030 demi memelihara ekosistem tanah dan kesejahteraan petani."
      },
      bibliographies: [
        {
          id: "[World-EUDR]",
          title: "The 2026 Digital Earth Geofencing and Traceability Standards for Sustainable Commodities",
          author: "Global Agro-Economic Alliance Research",
          year: "2026",
          source: "Journal of Sustainable Forestry & Land Management",
          url: "https://example.com/world-eudr-2026"
        }
      ],
      createdAt: "2026-05-20T10:00:00Z",
      isCustom: true
    }
  },
  {
    id: "world-2026-2",
    title: "Komersialisasi Hidrogen Hijau Skala Megawatt Pertama Terkoneksi PLTA Sungai Kayan",
    category: ResearchCategory.SAINS_TEKNOLOGI,
    tags: ["Hidrogen", "PLTA", "Elektrolisis", "Air", "Fisika"],
    summary: "Realisasi transfer energi bersih sirkular memanfaatkan teknologi membran pertukaran proton (PEM) generasi kelima, menghasilkan 120 Ton hidrogen hijau murni per tahun.",
    source: "Kementerian ESDM & Lembaga Riset Fisika Terapan",
    publishedDate: "April 2026",
    impactLevel: "Transformasi Nasional",
    fullResearch: {
      id: "sync-world-2",
      category: ResearchCategory.SAINS_TEKNOLOGI,
      tags: ["Hidrogen", "PLTA", "Elektrolisis", "Air", "Fisika"],
      question: "Bagaimana optimasi fisika termodinamika pada instalasi komersial hidrogen hijau Sungai Kayan menggunakan sistem PEM generasi kelima?",
      summary: "Kajian integrasi daya PLTA air deras Sungai Kayan untuk menggerakkan elektroliser berefisiensi tinggi.",
      answer: "### Optimalisasi Termodinamika Elektroliser PEM Skala Megawatt 2026\n\nInstalasi hidrogen hijau komersial pertama di Kalimantan Utara memanfaatkan limpahan debit air Sungai Kayan guna menggerakkan turbin pemisah molekul H₂O.\n\n### 1. Formulasi Hukum Termodinamika Elektrolisis\nHubungan potensial sel elektrokimia reversibel ($E_{rev}$) dirumuskan melalui perubahan energi Gibbs bebas ($\\Delta G$) terhadap suhu ($T$):\n\n$$E_{rev} = \\frac{\\Delta G}{n \\cdot F} = E^0_rev + \\frac{R \\cdot T}{n \\cdot F} \\ln\\left(\\frac{P_{H2} \\cdot P_{O2}^{0.5}}{P_{H2O}}\\right)$$\n\nDengan memadukan sirkulasi pendingin udara kinetik mikro, kita berhasil mereduksi overpotensial sel hingga mencapai efisiensi sistem total sebesar **81.4%**.\n\n### 2. Dampak Kemajuan Transisi Energi\nIni merupakan lompatan bersejarah yang memosisikan Indonesia sebagai pelopor dekarbonisasi industri berat di kawasan Asia Tenggara.",
      analysis: {
        conclusion: "Komersialisasi hidrogen hijau Kayan membuktikan efisiensi konversi energi air menjadi bahan bakar sintetik sangat layak secara ekonomi jangka panjang.",
        limitations: "Investasi awal yang tinggi pada logam mulia platina dan iridium sebagai katalis utama pada tumpukan membran (stack PEM).",
        opportunities: "Bisnis manufaktur tangki penyimpanan hidrogen bertekanan tinggi (700 bar) lokal dan distribusi hidrogen cair.",
        cycles: "Siklus penggantian membran PEM berada pada kisaran 80.000 jam operasi berkelanjutan.",
        visionMission: "Mewujudkan kedaulatan sains terapan nusantara bebas emisi hidrokarbon guna melindungi biosfer dari pemanasan ekstrem."
      },
      bibliographies: [
        {
          id: "[Kayan-2026]",
          title: "Megawatt Proton Exchange Membrane Electrolysis: Performance and Thermal Management at Kayan Hydropower Station",
          author: "Pratama, K. & Heinz, W.",
          year: "2026",
          source: "International Journal of Hydrogen and Clean Energy Physics",
          url: "https://example.com/kayan-pem-hydrogen"
        }
      ],
      createdAt: "2026-05-19T08:00:00Z",
      isCustom: true
    }
  },
  {
    id: "world-2026-3",
    title: "Pemetaan Upwelling Pesisir Selatan Jawa 2026 Mengindikasikan Mutasi Hara Nitrogen Tanah",
    category: ResearchCategory.ALAM_SUMBER_DAYA,
    tags: ["Upwelling", "Nitrogen", "Samudera", "Pertanian", "Tanah"],
    summary: "Lonjakan kandungan nutrient fosfat di lepas pantai Jawa Selatan memicu asupan aerosol laut unik yang mereduksi kebutuhan pupuk anorganik kelapa sawit hingga 35%.",
    source: "Badan Riset dan Inovasi Nasional (BRIN) & Oceanography Institute",
    publishedDate: "Maret 2026",
    impactLevel: "Terobosan Global",
    fullResearch: {
      id: "sync-world-3",
      category: ResearchCategory.ALAM_SUMBER_DAYA,
      tags: ["Upwelling", "Nitrogen", "Samudera", "Pertanian", "Tanah"],
      question: "Apakah hubungan antara upwelling Samudera Hindia 2026 dengan deposisi aerosol nitrogen mikro pada lapisan tanah kritis pesisir?",
      summary: "Analisis penyuburan tanah terestrial sand-dune melalui transfer fisis massa air samudera dalam kaya mineral.",
      answer: "### Dinamika Biogeokimia Aerosol Samudera-Darat Southern Java 2026\n\nPenelitian lapangan BRIN 2026 membuktikan bahwa upwelling kuat menginduksi kelembapan udara laut asin yang membawa partikel nano-nutrisi kompleks.\n\n### 1. Formulasi Koefisien Adsorpsi Nitrogen Tanah ($K_d$)\nInteraksi pengikat nitrogen tanah pesisir dari air spray samudera mengikuti model isothermal Freundlich:\n\n$$Q_e = K_f \\cdot C_e^{1/n}$$\n\nDi mana $Q_e$ adalah jumlah ion ammonium yang terserap di fraksi permukaan tanah berpasir, meningkatkan kestabilan tanah pendukung perkebunan semusim secara masif.\n\n### 2. Tinjauan Agraria Terpadu\nHal ini mereformasi paradigma bahwa pertanian pesisir gersang tidak mampu tumbuh subur secara natural tanpa bantuan asupan aditif kimia sintetis.",
      analysis: {
        conclusion: "Siklus sirkulasi aerosol pesisir selatan menyuplai mineral penyubur tanah murni yang mengurangi emisi polutan pupuk industri.",
        limitations: "Kadar garam tinggi pada musim kemarau ekstrem berpotensi memicu korosi cepat pada alat-alat mesin pengolahan lahan besi baja milik petani.",
        opportunities: "Pengembangan bio-energi pakan sapi laut dan ekowisata riset sains oseanografi pantai selatan.",
        cycles: "Siklus pengulangan upwelling terkorelasi kuat dengan fenomena dipole mode laut samudera hindia setiap 12 bulan sekali.",
        visionMission: "Membangun harmoni bio-fisika samudera darat untuk menata ekologi tani subur mandiri nusantara secara berkelanjutan."
      },
      bibliographies: [
        {
          id: "[Ocean-Upwell-2026]",
          title: "Atmospheric Aerosol Nitrogen Transference and Soil Adsorption During South Java Upwelling Season",
          author: "Wahyudi, S. H., et al.",
          year: "2026",
          source: "Oceanographic & Agronomy Letters",
          url: "https://example.com/oceanic-nitrogen-adsorption"
        }
      ],
      createdAt: "2026-05-18T12:00:00Z",
      isCustom: true
    }
  },
  {
    id: "world-2026-4",
    title: "Kebijakan Karbon Sirkular Indonesia 2026: Insentif Pajak Hijau Bagi Pengolah Biochar Pirolisis",
    category: ResearchCategory.REGULASI_ANALISIS,
    tags: ["Regulasi", "Biochar", "Pirolisis", "Karbon", "Hukum"],
    summary: "Rancangan Perpres No. 44 Tahun 2026 menetapkan insentif pajak nihil (Zero Tax Advantage) bagi petani dan korporasi yang aktif menerapkan pembenah tanah biochar pembakaran terkontrol.",
    source: "Sekretariat Negara RI & Jurnal Analisis Hukum Lingkungan",
    publishedDate: "Mei 2026",
    impactLevel: "Kebijakan Strategis",
    fullResearch: {
      id: "sync-world-4",
      category: ResearchCategory.REGULASI_ANALISIS,
      tags: ["Regulasi", "Biochar", "Pirolisis", "Karbon", "Hukum"],
      question: "Bagaimana tata cara pemanfaatan insentif pajak hijau Perpres No.44/2026 untuk mengoptimalkan siklus produksi biochar tanah nasional?",
      summary: "Analisis regulasi mitigasi emisi karbon melalui aplikasi pembakaran biomassa terkontrol (pirolisis api mikro).",
      answer: "### Kajian Hukum & Skema Insentif Pajak Karbon Terintegrasi 2026\n\nPeraturan Presiden No. 44 RI Tahun 2026 memberikan keringanan fiskal berskala nasional bagi riset, usaha, serta pengaplikasian biochar pirolisis biomassa di bidang agraria.\n\n### 1. Formulasi Kredit Karbon Tanah ($C_c$)\nKapasitas sekuestrasi karbon berkelanjutan biochar ($C_c$) dihitung berdasarkan rasio mineral stabil terhadap biomassa terbakar ($m_{biochar}/m_{awal}$):\n\n$$C_{c} = m_{biochar} \\cdot f_{carbon_stable} \\cdot \\frac{44}{12} \\times (1 - d_{loss_rate})$$\n\nHukum formal ini menegaskan pentingnya akurasi pencatatan data sains untuk mempercepat pencairan insentif pajak hijau tahunan.\n\n### 2. Implikasi Pembangunan Pertanahan\nHal ini menutup celah manipulasi klaim pelestarian lingkungan (greenwashing) dengan standardisasi laboratorium kearsipan nasional yang transparan.",
      analysis: {
        conclusion: "Perpres No. 44/2026 menyandingkan kemakmuran finansial pelaku industri kelapa sawit dengan target pemulihan gas rumah kaca nasional.",
        limitations: "Birokrasi pendaftaran sertifikat karbon yang ketat menyulitkan akses bagi kelompok tani gurem.",
        opportunities: "Penyediaan jasa audit karbon tersertifikasi nasional dan penjualan mesin pirolisis ramah lingkungan.",
        cycles: "Evaluasi verifikasi kredit karbon tanah dilakukan satu kali setiap tahun anggaran pemerintah.",
        visionMission: "Menciptakan hukum yang adil dan berwibawa guna mewadahi pemulihan kestabilan biosfer bumi nusantara secara masif."
      },
      bibliographies: [
        {
          id: "[Perpres-Carbon-2026]",
          title: "Hukum Administrasi Pertanahan Syarat Pendaftaran Kredit Karbon Biochar Nasional",
          author: "Kementerian Hukum RI & Badan Sandi Negara",
          year: "2026",
          source: "Lembaran Negara Republik Indonesia No. 445",
          url: "https://example.com/perpres-44-2026"
        }
      ],
      createdAt: "2026-05-20T11:00:00Z",
      isCustom: true
    }
  },
  {
    id: "world-2026-5",
    title: "Penemuan Enzim Bioremediasi Mikroba 2026 Mampu Mengurai Mikroplastik Air Pesisir",
    category: ResearchCategory.KESEHATAN_MASA_DEPAN,
    tags: ["Kesehatan", "Mikroba", "Enzim", "Mikroplastik", "Kelautan"],
    summary: "Akselerasi degradasi rantai polimer polietilena tereftalat di muara sungai pesisir hingga 98% dalam waktu 14 hari tanpa meninggalkan residu beracun bagi biota laut.",
    source: "World Academic Medical and Ocean Health Alliance",
    publishedDate: "Baru saja",
    impactLevel: "Terobosan Global",
    fullResearch: {
      id: "sync-world-5",
      category: ResearchCategory.KESEHATAN_MASA_DEPAN,
      tags: ["Kesehatan", "Mikroba", "Enzim", "Mikroplastik", "Kelautan"],
      question: "Apakah mekanisme biokimiawi degradasi polimer mikroplastik air samudera menggunakan isolat enzim mikroba pesisir terbaru?",
      summary: "Kajian klinis ketahanan kesehatan laut melalui akselerasi eliminasi limbah polimer mikroplastik.",
      answer: "### Biosirkulasi Bioremediasi Enzimatis Mikroplastik Pesisir Jawa 2026\n\nPenemuan isolat biokatalitik terbaru dari bakteri pereduksi plastik di perairan pesisir memberikan harapan baru bagi mitigasi polusi laut lepas.\n\n### 1. Formulasi Laju Kinetika Michaelis-Menten Degradasi\nLaju katalis penguraian polimer mikroplastik ($V$) dirumuskan sebagai:\n\n$$V = \\frac{V_{max} \\cdot [S]}{K_m + [S]}$$\n\nDi mana $[S]$ mewakili konsentrasi partikel mikroplastik tersuspensi dalam air samudera. Dengan menjaga pH perairan pada rentang **7.2 - 7.6**, laju perombakan berlipat ganda secara eksponensial.\n\n### 2. Tinjauan Masa Depan Kesehatan Kesehatan\nHal ini menggeser ancaman kontaminasi zat karsinogenik dari saringan pakan ikan laut konsumsi ke arah perairan steril murni.",
      analysis: {
        conclusion: "Aplikasi rekayasa enzim mikroba adalah jalan keluar saintifik tercanggih dalam menghentikan penumpukan racun plastik di rantai makanan manusia.",
        limitations: "Efektivitas enzim menurun tajam apabila terpapar limbah logam berat industri berlebih di zona muara pasang surut.",
        opportunities: "Riset reaktor skala besar bioremediasi air pelabuhan niaga komersial dan industri penyaringan mikroplastik.",
        cycles: "Siklus aplikasi dilakukan secara periodik bulanan di wilayah muara kritis perkotaan.",
        visionMission: "Mewujudkan samudera yang jernih dan bebas racun mikroplastik demi menjamin keselamatan reproduksi generasi hayati bumi di masa depan."
      },
      bibliographies: [
        {
          id: "[Bio-Health-2026]",
          title: "Microplastic Biodegradation at Coastal Inlets: Enzymatic Isolation and Kinetic Modeling",
          author: "Dr. Farah Amelia, et al.",
          year: "2026",
          source: "Nature Global Ocean Health and Remediation",
          url: "https://example.com/enzymatic-microplastic-biodegradation"
        }
      ],
      createdAt: "2026-05-20T14:45:00Z",
      isCustom: true
    }
  }
];

export default function RealtimeWorldFeed({ researches, onAddResearch, visualTheme, saveToStorage }: RealtimeWorldFeedProps) {
  const [feedState, setFeedState] = useState<"connecting" | "live" | "updating">("live");
  const [tickerMessage, setTickerMessage] = useState<string>("Sistem terkoneksi ke jaringan Pustaka Jurnal Internasional...");
  const [feedPulse, setFeedPulse] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [statsSummary, setStatsSummary] = useState({
    worldCitations: 14820,
    activeStudies: 9540,
    globalImpactIndex: 9.85
  });

  // Periodically update dynamic parameters to simulate a beautiful active real-time data stream
  useEffect(() => {
    const messages = [
      "Pembaruan: Jurnal Internasional Alam & Geokimia mendeteksi pergeseran siklus kelembapan udara...",
      "Pembaruan: Sensor hidrometeorologi Bengkulu mendeteksi curah hujan penunjang hara kelapa sawit...",
      "Pembaruan: Regulasi ESDM Indonesia mencanangkan tarif prioritas hidrogen hijau Kayan...",
      "Pembaruan: Pusat Oseanografi mencatat peningkatan salinitas air muara Jawa Selatan...",
      "Pembaruan: Pemantauan klorofil-a satelit mengindikasikan zona upwelling samudera meluas...",
      "Pembaruan: Satelit Sentinel-5 mencatat kenaikan kadar nitrogen tanah basah Kalimantan Timur...",
      "Pembaruan: Sensor termal laut Banda mendeteksi sirkulasi laju konveksi fluida optimal..."
    ];

    const interval = setInterval(() => {
      setFeedPulse(true);
      setTimeout(() => setFeedPulse(false), 800);

      const msg = messages[Math.floor(Math.random() * messages.length)];
      setTickerMessage(msg);

      // Mutate stats slightly
      setStatsSummary(prev => ({
        worldCitations: prev.worldCitations + Math.floor(Math.random() * 5) + 1,
        activeStudies: prev.activeStudies + (Math.random() > 0.72 ? 1 : 0),
        globalImpactIndex: parseFloat((prev.globalImpactIndex + (Math.random() * 0.01 - 0.005)).toFixed(3))
      }));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSyncAllWorldData = () => {
    setFeedState("updating");
    const logId = `Update-${Date.now()}`;
    
    setTimeout(() => {
      // Find advances not already present in researches
      const toAdd: ResearchQA[] = [];
      GLOBAL_BREAKTHROUGHS_2026.forEach((adv) => {
        const alreadyExists = researches.some(
          (r) => r.question.toLowerCase().includes(adv.fullResearch.tags[0].toLowerCase()) ||
                 r.id === adv.fullResearch.id
        );
        if (!alreadyExists) {
          toAdd.push(adv.fullResearch);
        }
      });

      if (toAdd.length === 0) {
        setSyncLogs(prev => [`[${new Date().toLocaleTimeString()}] Data pustaka sudah terupdate sepenuhnya dengan perkembangan terhangat dunia digital.`, ...prev]);
        setFeedState("live");
        return;
      }

      // Add each breakthroughs with current date ISO
      const updatedList = [
        ...toAdd.map(r => ({ ...r, createdAt: new Date().toISOString() })),
        ...researches
      ];

      saveToStorage(updatedList);
      setSyncLogs(prev => [
        `[${new Date().toLocaleTimeString()}] Berhasil mengintegrasikan ${toAdd.length} Kajian Sains Global 2026 Baru ke data keseluruhan secara Real-Time.`,
        ...prev
      ]);
      setFeedState("live");
    }, 1500);
  };

  const handleSyncIndividual = (adv: WorldAdvancement) => {
    // Check if duplicate
    const alreadyExists = researches.some(
      (r) => r.id === adv.fullResearch.id || r.question.toLowerCase().includes(adv.fullResearch.question.toLowerCase())
    );

    if (alreadyExists) {
      alert(`Kajian tematik "${adv.title}" sudah bersinergi di dalam arsip database utama Anda.`);
      return;
    }

    onAddResearch({
      ...adv.fullResearch,
      createdAt: new Date().toISOString()
    });

    setSyncLogs(prev => [
      `[${new Date().toLocaleTimeString()}] Berhasil sinkronisasi dokumen: "${adv.title}" secara instan.`,
      ...prev
    ]);
  };

  const filteredAdvances = GLOBAL_BREAKTHROUGHS_2026.filter((adv) => {
    const q = searchFilter.toLowerCase();
    return q === "" || 
      adv.title.toLowerCase().includes(q) || 
      adv.category.toLowerCase().includes(q) ||
      adv.summary.toLowerCase().includes(q) ||
      adv.tags.some(t => t.toLowerCase().includes(q));
  });

  return (
    <div id="realtime-world-feed-dock" className={`rounded-3xl border shadow-2xs overflow-hidden transition-all duration-300 ${
      visualTheme === "luks-akademis" 
        ? "bg-[#fcfbf9] border-[#163e2f]/10" 
        : visualTheme === "neon-lab" 
          ? "bg-[#0f111a] border-indigo-500/20 text-slate-200" 
          : "bg-white border-slate-200"
    }`}>
      
      {/* Ticker tape bar top */}
      <div className="bg-slate-900 border-b border-black/30 p-2 sm:p-2.5 flex items-center justify-between text-[11px] gap-2.5 overflow-hidden select-none">
        <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-0.5 bg-rose-600 font-mono font-bold text-[9px] uppercase rounded-full text-white animate-pulse">
          <Radio size={10} />
          <span>Real-time Feed</span>
        </div>
        
        {/* Scrolling text container simulating stock/academic ticker */}
        <div className="flex-grow overflow-hidden relative">
          <div className={`text-white/85 font-mono text-[10px] whitespace-nowrap transition-all duration-500 flex items-center gap-2 ${
            feedPulse ? "opacity-60 translate-x-1" : "opacity-100 translate-x-0"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 shrink-0" />
            <span>{tickerMessage}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0 text-slate-400 font-mono text-[10px]">
          <span className="flex items-center gap-1">
            <Globe size={11} className="text-indigo-400 animate-spin" />
            <span>Global Citation API: Connected</span>
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Header and Sync Control Area */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100/80 mb-6">
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-slate-800 font-sans tracking-tight theme-inherit-color flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500 shrink-0" />
              Pusat Data Real-Time Global & Kemajuan Dunia
            </h3>
            <p className="text-xs text-slate-500 font-mono theme-inherit-muted max-w-2xl leading-relaxed">
              Pantau publikasi riset terpercaya, regulasi penataan hutan berkelanjutan terbaru 2026, dan transfer kinetik rekayasa hidrogen global secara langsung. Anda dapat menyinkronkan data ini ke perpustakaan Anda secara nirlaba.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="sync-all-world-data-btn"
              onClick={handleSyncAllWorldData}
              disabled={feedState === "updating"}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-650 hover:bg-indigo-750 disabled:bg-indigo-300 text-white rounded-xl text-xs font-mono font-bold transition duration-200 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={feedState === "updating" ? "animate-spin" : ""} />
              <span>{feedState === "updating" ? "Menghubungkan & Memutakhirkan..." : "SINKRONKAN DATA KELAS MEMBAWA DUNIA"}</span>
            </button>
          </div>
        </div>

        {/* Live Counter Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between space-y-1 h-20 transition hover:bg-slate-50">
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Arsip Kutipan Dunia 2026</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black font-sans text-slate-800 theme-inherit-color">{statsSummary.worldCitations.toLocaleString()}</span>
              <span className="text-[9.5px] text-emerald-600 font-black font-mono">+{Math.floor(Math.random() * 3) + 1} Baru</span>
            </div>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between space-y-1 h-20 transition hover:bg-slate-50">
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Kajian Kolaboratif Berjalan</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black font-sans text-slate-800 theme-inherit-color">{statsSummary.activeStudies.toLocaleString()}</span>
              <span className="text-[10px] text-indigo-500 font-bold font-mono">Dinamis</span>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-indigo-50/35 p-4 rounded-2xl border border-indigo-550/10 flex flex-col justify-between space-y-1 h-20">
            <span className="text-[10px] text-indigo-600 font-mono font-black uppercase tracking-wider">Indeks Dampak Riset Terpadu</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black font-sans text-indigo-800 theme-inherit-color">{statsSummary.globalImpactIndex}</span>
              <TrendingUp size={14} className="text-indigo-650 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Search Input for Current World Advances */}
        <div className="mb-5 flex flex-col sm:flex-row gap-3">
          <input
            id="world-advancements-search-box"
            type="text"
            placeholder="Cari temuan dunia (contoh: hidrogen, upwelling, sawit)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="text-[10.5px] text-slate-400 font-mono flex items-center justify-end">
            Menampilkan {filteredAdvances.length} dari {GLOBAL_BREAKTHROUGHS_2026.length} temuan draf
          </div>
        </div>

        {/* Dynamic Cards list of global advancements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAdvances.map((adv) => {
            const isInstalled = researches.some(
              (r) => r.id === adv.fullResearch.id || r.question.toLowerCase().includes(adv.fullResearch.question.toLowerCase())
            );

            return (
              <div 
                key={adv.id} 
                className={`p-4 rounded-2xl border text-xs flex flex-col justify-between space-y-3.5 transition duration-200 ${
                  isInstalled 
                    ? "bg-[#102d22]/5 border-emerald-500/25 ring-1 ring-emerald-500/10" 
                    : visualTheme === "neon-lab"
                      ? "bg-slate-900/40 border-slate-800 hover:bg-slate-900/70"
                      : "bg-slate-50/30 border-slate-150 hover:bg-slate-50/70"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2.5">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 px-2.5 py-0.5 rounded-lg border border-indigo-500/15">
                      {adv.category}
                    </span>
                    <span className={`text-[8.5px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      adv.impactLevel === "Transformasi Nasional" 
                        ? "bg-rose-500/10 text-rose-700" 
                        : adv.impactLevel === "Terobosan Global" 
                          ? "bg-amber-500/10 text-amber-700" 
                          : "bg-slate-100 text-slate-600"
                    }`}>
                      {adv.impactLevel}
                    </span>
                  </div>

                  <h4 className="font-bold font-sans text-slate-850 tracking-wide leading-snug theme-inherit-color">
                    {adv.title}
                  </h4>

                  <p className="text-slate-550 font-sans text-[11px] leading-relaxed theme-inherit-muted">
                    {adv.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100/60 pt-3 text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Award size={11} className="text-amber-505" />
                    {adv.source.split(" & ")[0]} &bull; {adv.publishedDate}
                  </span>

                  {isInstalled ? (
                    <span className="inline-flex items-center gap-1 text-[10.5px] text-emerald-700 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      <CheckCircle size={11} />
                      Tersinkron
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSyncIndividual(adv)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800 font-mono font-bold text-[9.5px] uppercase rounded-lg border border-indigo-200 transition duration-150 cursor-pointer shadow-3xs"
                    >
                      <ArrowUpRight size={10} />
                      Sinergikan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time synchronization Logs tracker widget console */}
        {syncLogs.length > 0 && (
          <div className="mt-6 border-t border-slate-100/70 pt-5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
              <Activity size={12} className="text-indigo-550 animate-pulse" />
              Arsip Sinkronisasi Real-Time ({syncLogs.length} Entri Log)
            </h4>
            <div className="bg-slate-900 border border-black rounded-xl p-3.5 max-h-32 overflow-y-auto space-y-1 text-[9.5px] font-mono text-emerald-400">
              {syncLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-1 leading-relaxed">
                  <span className="text-emerald-550 shrink-0">&raquo;</span>
                  <p>{log}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
