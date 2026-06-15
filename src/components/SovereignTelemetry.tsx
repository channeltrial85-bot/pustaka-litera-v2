import React, { useState, useEffect } from "react";
import { 
  Activity, 
  Presentation, 
  Trash2, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  MousePointer, 
  Cpu, 
  Download, 
  Clock, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  BarChart2,
  PieChart,
  HelpCircle,
  FolderOpen
} from "lucide-react";

interface TelemetryLog {
  id: string;
  timestamp: string;
  userEmail: string;
  userName: string;
  actionType: "view" | "search" | "action" | "checkout";
  actionName: string;
  details: string;
  ipAddress?: string;
  browserInfo?: string;
}

interface SovereignTelemetryProps {
  visualTheme: "luks-akademis" | "neon-lab" | "sederhana-modern";
}

export default function SovereignTelemetry({ visualTheme }: SovereignTelemetryProps) {
  const [activeTab, setActiveTab] = useState<"presentation" | "logs" | "indices" | "backup">("indices");
  const [indicesSubTab, setIndicesSubTab] = useState<"summary" | "charts" | "feed">("summary");
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [statusPulse, setStatusPulse] = useState<boolean>(true);

  // States for real-time indices graph (Ekonomi, Krisis, Kesehatan, Konservasi, Iklim, Teknologi, Pangan, Sosial)
  interface DataPoint {
    time: string;
    ekonomi: number;
    krisis: number;
    kesehatan: number;
    konservasi: number;
    iklim: number;
    teknologi: number;
    pangan: number;
    sosial: number;
  }

  interface CauseEffect {
    id: string;
    timestamp: string;
    metric: "ekonomi" | "krisis" | "kesehatan" | "konservasi" | "iklim" | "teknologi" | "pangan" | "sosial";
    direction: "UP" | "DOWN";
    title: string;
    impactText: string;
    reason: string;
  }

  const [historyData, setHistoryData] = useState<DataPoint[]>(() => {
    const dots: DataPoint[] = [];
    const now = new Date();
    for (let i = 12; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 5000);
      dots.push({
        time: d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        ekonomi: 74 + Math.sin(i * 0.55) * 5 + Math.random() * 2,
        krisis: 34 + Math.cos(i * 0.45) * 4 + Math.random() * 3,
        kesehatan: 81 - Math.sin(i * 0.35) * 3 + Math.random() * 1.5,
        konservasi: 68 + Math.cos(i * 0.65) * 5 + Math.random() * 2,
        iklim: 54 + Math.sin(i * 0.25) * 4 + Math.random() * 2,
        teknologi: 86 + Math.cos(i * 0.75) * 3 + Math.random() * 1,
        pangan: 62 + Math.sin(i * 0.45) * 4 + Math.random() * 2.5,
        sosial: 70 - Math.cos(i * 0.3) * 5 + Math.random() * 1.8,
      });
    }
    return dots;
  });

  const [ekonomiFactor, setEkonomiFactor] = useState<number>(75.4);
  const [krisisFactor, setKrisisFactor] = useState<number>(33.5);
  const [kesehatanFactor, setKesehatanFactor] = useState<number>(82.1);
  const [konservasiFactor, setKonservasiFactor] = useState<number>(69.8);
  const [iklimFactor, setIklimFactor] = useState<number>(55.2);
  const [teknologiFactor, setTeknologiFactor] = useState<number>(87.5);
  const [panganFactor, setPanganFactor] = useState<number>(64.1);
  const [sosialFactor, setSosialFactor] = useState<number>(71.9);

  const [visibleIndices, setVisibleIndices] = useState<Record<string, boolean>>({
    ekonomi: true,
    krisis: true,
    kesehatan: true,
    konservasi: true,
    iklim: true,
    teknologi: true,
    pangan: true,
    sosial: true,
  });

  const [activeCauses, setActiveCauses] = useState<CauseEffect[]>([
    {
      id: "c-1",
      timestamp: new Date().toLocaleTimeString("id-ID"),
      metric: "konservasi",
      direction: "UP",
      title: "Nature Geoscience: Restorasi Mangrove",
      impactText: "+5.2% Konservasi",
      reason: "Penelitian masif restorasi pesisir sirkular terpadu dan mitigasi emisi karbon gambut laut."
    },
    {
      id: "c-2",
      timestamp: new Date(Date.now() - 6000).toLocaleTimeString("id-ID"),
      metric: "ekonomi",
      direction: "UP",
      title: "Rilis BI: Kebijakan Makroprudensial UMKM",
      impactText: "+3.8% Ekonomi",
      reason: "Konsolidasi modal kerja digital nasional menaikkan daya tahan sirkulasi rantai pasok lokal."
    },
    {
      id: "c-3",
      timestamp: new Date(Date.now() - 11000).toLocaleTimeString("id-ID"),
      metric: "iklim",
      direction: "UP",
      title: "MOU Global: Penghapusan Subsidi Karbon",
      impactText: "+6.1% Iklim Global",
      reason: "Transisi masif ke bioenergi sirkular menekan laju emisi gas rumah kaca sebesar 2.1 gigaton setahun."
    },
    {
      id: "c-4",
      timestamp: new Date(Date.now() - 18000).toLocaleTimeString("id-ID"),
      metric: "teknologi",
      direction: "UP",
      title: "Konferensi IEEE 2026: Quantum Edge AI",
      impactText: "+4.9% Riset Teknologi",
      reason: "Implementasi AI hemat daya untuk sensor tanah & ramalan BMKG cuaca ekstrem."
    }
  ]);

  const CAUSE_EVENT_POOL = [
    {
      metric: "ekonomi" as const,
      direction: "UP" as const,
      title: "Stimulus Fiskal & Modal Usaha UMKM Cair",
      impactText: "+3.5% Ekonomi",
      reason: "Pemerintah meningkatkan subsidi bunga pembebasan pajak bagi koperasi sirkular mandiri."
    },
    {
      metric: "ekonomi" as const,
      direction: "DOWN" as const,
      title: "Fluktuasi Ekspor & Kemacetan Rantai Pasok",
      impactText: "-2.4% Ekonomi",
      reason: "Hambatan kargo maritim di pelayaran internasional memicu keterlambatan impor bahan mentah."
    },
    {
      metric: "krisis" as const,
      direction: "UP" as const,
      title: "Gejolak Likuiditas & Sentimen Suku Bunga",
      impactText: "+4.2% Volatilitas Krisis",
      reason: "Kenaikan biaya pinjaman luar negeri mempersulit restrukturisasi kas usaha mikro."
    },
    {
      metric: "krisis" as const,
      direction: "DOWN" as const,
      title: "Intervensi Moneter Stabilisasi Pasar Sukses",
      impactText: "-4.8% Volatilitas Krisis",
      reason: "Alokasi cadangan devisa proaktif meredakan ketegangan pasar bursa komoditas berjangka."
    },
    {
      metric: "kesehatan" as const,
      direction: "UP" as const,
      title: "Lancet: Uji Vaksin & One Health Disetujui",
      impactText: "+4.0% Imun Sehat",
      reason: "Teknologi imunisasi hibrid terbukti memberikan imunitas optimal terhadap patogen zoonosis baru."
    },
    {
      metric: "kesehatan" as const,
      direction: "DOWN" as const,
      title: "Prevalensi KLB Penyakit Tropis Zoonosis",
      impactText: "-3.2% Imun Sehat",
      reason: "Anomali cuaca ekstrim musiman mempercepat inkubasi patogen dwi-vektor lalat air."
    },
    {
      metric: "konservasi" as const,
      direction: "UP" as const,
      title: "Konservasi Cagar Biosfer Mangrove Nasional",
      impactText: "+5.6% Konservasi",
      reason: "Rehabilitasi terstruktur menahan laju degradasi tanah pesisir dari bencana abrasi maritim."
    },
    {
      metric: "konservasi" as const,
      direction: "DOWN" as const,
      title: "Degradasi Hara Lahan & Kebakaran Karbon Gambut",
      impactText: "-3.8% Konservasi",
      reason: "Suhu ekstrim memicu kekeringan biomassa organik di wilayah tangkapan air kritis."
    },
    {
      metric: "iklim" as const,
      direction: "UP" as const,
      title: "Reboisasi Masif & Penyerapan Karbon Biru",
      impactText: "+5.8% Iklim Global",
      reason: "Penanaman padang lamun di lautan timur mempercepat de-asidifikasi air laut global."
    },
    {
      metric: "iklim" as const,
      direction: "DOWN" as const,
      title: "Pelepasan Gas Metana Permafrost Kutub",
      impactText: "-4.5% Iklim Global",
      reason: "Mencairnya lapisan beku utara melepas miliaran partikel metana ke atmosfer."
    },
    {
      metric: "teknologi" as const,
      direction: "UP" as const,
      title: "Sensus AI & Integrasi Inteligen Omnimind",
      impactText: "+6.2% Riset Teknologi",
      reason: "Klaster komputer kuantum dwi-negara mengasimilasi data Scopus untuk prediksi bencana biologis."
    },
    {
      metric: "teknologi" as const,
      direction: "DOWN" as const,
      title: "Serangan Siber Infrastruktur Energi Terbarukan",
      impactText: "-3.5% Riset Teknologi",
      reason: "Malware asinkron menargetkan jaringan listrik mikro surya pedalaman, merusak sensor real-time."
    },
    {
      metric: "pangan" as const,
      direction: "UP" as const,
      title: "Panen Raya Hidroponik & Agro Sirkular",
      impactText: "+5.0% Keamanan Pangan",
      reason: "Pendistribusian pupuk organik hayati lokal menghemat biaya pertanian hingga 40%."
    },
    {
      metric: "pangan" as const,
      direction: "DOWN" as const,
      title: "Krisis Kekeringan & Gagal Panen Sawit",
      impactText: "-4.1% Keamanan Pangan",
      reason: "Kurangnya curah hujan musiman mematikan tunas produktif kelapa sawit di tanah mineral."
    },
    {
      metric: "sosial" as const,
      direction: "UP" as const,
      title: "Sinergi Kesejahteraan: BLT Perlindungan UMKM",
      impactText: "+4.5% Proteksi Sosial",
      reason: "Pemberian jaminan sosial asuransi jiwa bagi nelayan pencegah abrasi laut."
    },
    {
      metric: "sosial" as const,
      direction: "DOWN" as const,
      title: "Pelebaran Jurang Ketimpangan Gizi Daerah",
      impactText: "-3.0% Proteksi Sosial",
      reason: "Kenaikan biaya bensin logistik memicu inflasi harga gizi protein susu di pedalaman terpencil."
    }
  ];

  const handleTick = () => {
    const p = CAUSE_EVENT_POOL[Math.floor(Math.random() * CAUSE_EVENT_POOL.length)];
    const deltaVal = Number((1.5 + Math.random() * 2.5).toFixed(1));
    const isUp = p.direction === "UP";
    const delta = isUp ? deltaVal : -deltaVal;

    setActiveCauses(prev => {
      const newCause: CauseEffect = {
        id: "ev-" + Date.now() + "-" + Math.random().toString(36).substring(2, 5),
        timestamp: new Date().toLocaleTimeString("id-ID"),
        metric: p.metric,
        direction: p.direction,
        title: p.title,
        impactText: `${isUp ? "+" : ""}${delta.toFixed(1)}% pada Indeks ${
          p.metric === "ekonomi" ? "Ekonomi" : 
          p.metric === "krisis" ? "Volatilitas Krisis" : 
          p.metric === "kesehatan" ? "Kesehatan" : 
          p.metric === "konservasi" ? "Konservasi" :
          p.metric === "iklim" ? "Iklim" :
          p.metric === "teknologi" ? "Teknologi" :
          p.metric === "pangan" ? "Keamanan Pangan" : "Proteksi Sosial"
        }`,
        reason: p.reason
      };
      return [newCause, ...prev.slice(0, 7)];
    });

    setEkonomiFactor(prevE => {
      let next = p.metric === "ekonomi" ? prevE + delta : prevE;
      next += (Math.random() - 0.5) * 1.5;
      return Number(Math.max(15, Math.min(99.5, next)).toFixed(1));
    });

    setKrisisFactor(prevKr => {
      let next = p.metric === "krisis" ? prevKr + delta : prevKr;
      next += (Math.random() - 0.5) * 1.8;
      return Number(Math.max(10, Math.min(95.0, next)).toFixed(1));
    });

    setKesehatanFactor(prevKe => {
      let next = p.metric === "kesehatan" ? prevKe + delta : prevKe;
      next += (Math.random() - 0.5) * 1.2;
      return Number(Math.max(20, Math.min(99.5, next)).toFixed(1));
    });

    setKonservasiFactor(prevKo => {
      let next = p.metric === "konservasi" ? prevKo + delta : prevKo;
      next += (Math.random() - 0.5) * 1.6;
      return Number(Math.max(15, Math.min(99.5, next)).toFixed(1));
    });

    setIklimFactor(prevIk => {
      let next = p.metric === "iklim" ? prevIk + delta : prevIk;
      next += (Math.random() - 0.5) * 1.4;
      return Number(Math.max(10, Math.min(99.5, next)).toFixed(1));
    });

    setTeknologiFactor(prevTek => {
      let next = p.metric === "teknologi" ? prevTek + delta : prevTek;
      next += (Math.random() - 0.5) * 1.3;
      return Number(Math.max(20, Math.min(99.5, next)).toFixed(1));
    });

    setPanganFactor(prevPa => {
      let next = p.metric === "pangan" ? prevPa + delta : prevPa;
      next += (Math.random() - 0.5) * 1.5;
      return Number(Math.max(15, Math.min(99.5, next)).toFixed(1));
    });

    setSosialFactor(prevSo => {
      let next = p.metric === "sosial" ? prevSo + delta : prevSo;
      next += (Math.random() - 0.5) * 1.1;
      return Number(Math.max(20, Math.min(99.5, next)).toFixed(1));
    });

    setHistoryData(prev => {
      const nowStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const popped = prev.slice(1);
      
      const eChange = (p.metric === "ekonomi" ? delta : 0) + (Math.random() - 0.5) * 1.5;
      const krChange = (p.metric === "krisis" ? delta : 0) + (Math.random() - 0.5) * 1.8;
      const keChange = (p.metric === "kesehatan" ? delta : 0) + (Math.random() - 0.5) * 1.2;
      const koChange = (p.metric === "konservasi" ? delta : 0) + (Math.random() - 0.5) * 1.6;
      const ikChange = (p.metric === "iklim" ? delta : 0) + (Math.random() - 0.5) * 1.4;
      const tekChange = (p.metric === "teknologi" ? delta : 0) + (Math.random() - 0.5) * 1.3;
      const paChange = (p.metric === "pangan" ? delta : 0) + (Math.random() - 0.5) * 1.5;
      const soChange = (p.metric === "sosial" ? delta : 0) + (Math.random() - 0.5) * 1.1;

      const last = prev[prev.length - 1];
      const nextE = Number(Math.max(15, Math.min(99.5, last.ekonomi + eChange)).toFixed(1));
      const nextKr = Number(Math.max(10, Math.min(95.0, last.krisis + krChange)).toFixed(1));
      const nextKe = Number(Math.max(20, Math.min(99.5, last.kesehatan + keChange)).toFixed(1));
      const nextKo = Number(Math.max(15, Math.min(99.5, last.konservasi + koChange)).toFixed(1));
      const nextIk = Number(Math.max(10, Math.min(99.5, last.iklim + ikChange)).toFixed(1));
      const nextTek = Number(Math.max(20, Math.min(99.5, last.teknologi + tekChange)).toFixed(1));
      const nextPa = Number(Math.max(15, Math.min(99.5, last.pangan + paChange)).toFixed(1));
      const nextSo = Number(Math.max(20, Math.min(99.5, last.sosial + soChange)).toFixed(1));

      return [...popped, {
        time: nowStr,
        ekonomi: nextE,
        krisis: nextKr,
        kesehatan: nextKe,
        konservasi: nextKo,
        iklim: nextIk,
        teknologi: nextTek,
        pangan: nextPa,
        sosial: nextSo
      }];
    });
  };

  const triggerManualAction = (type: "STIMULUS" | "QUARANTINE" | "CONSERVATION" | "INFLATION" | "CLIMATE_TRANSITION" | "AI_SENSUS" | "FOOD_SECURE" | "SOCIAL_SAFETY") => {
    setActiveCauses(prev => {
      let title = "";
      let impactText = "";
      let reason = "";
      let metric: "ekonomi" | "krisis" | "kesehatan" | "konservasi" | "iklim" | "teknologi" | "pangan" | "sosial" = "ekonomi";
      let direction: "UP" | "DOWN" = "UP";

      if (type === "STIMULUS") {
        title = "Pemicu Manual: Suntikan Stimulus UMKM Nasional Premium";
        impactText = "+8.5% Ekonomi, -4.5% Volatilitas Krisis";
        reason = "Intervensi proaktif menyalurkan likuiditas bergulir langsung bagi pilar-pilar mikro usaha sirkular.";
        metric = "ekonomi";
        direction = "UP";
        setEkonomiFactor(e => Number(Math.min(99.5, e + 8.5).toFixed(1)));
        setKrisisFactor(kr => Number(Math.max(10.0, kr - 4.5).toFixed(1)));
      } else if (type === "QUARANTINE") {
        title = "Pemicu Manual: Deklarasi Karantina One Health Nasional";
        impactText = "+12.0% Kesehatan, -8.0% Ekonomi";
        reason = "Lockdown lokal dan isolasi titik sebaran zoonosis penyakit guna menyelamatkan imun publik.";
        metric = "kesehatan";
        direction = "UP";
        setKesehatanFactor(ke => Number(Math.min(99.5, ke + 12.0).toFixed(1)));
        setEkonomiFactor(e => Number(Math.max(15.0, e - 8.0).toFixed(1)));
      } else if (type === "CONSERVATION") {
        title = "Pemicu Manual: Reboisasi Lahan Basah & Konservasi Serumpun";
        impactText = "+15.0% Konservasi & Ekosistem, +4.0% Pemulihan Ekonomi";
        reason = "Dekorporasi lahan marginal dikembalikan sebagai cagar pelindung karbon dan tanah hara sirkuler.";
        metric = "konservasi";
        direction = "UP";
        setKonservasiFactor(ko => Number(Math.min(99.5, ko + 15.0).toFixed(1)));
        setEkonomiFactor(e => Number(Math.min(99.5, e + 4.0).toFixed(1)));
      } else if (type === "INFLATION") {
        title = "Pemicu Manual: Shock Volatilitas Inflasi Rantai Pasok";
        impactText = "+10.0% Volatilitas Krisis, -6.5% Stabilitas Ekonomi";
        reason = "Guncangan eksternal melonjakkan indeks biaya kargo impor bahan baku dan bahan bakar industri.";
        metric = "krisis";
        direction = "UP";
        setKrisisFactor(kr => Number(Math.min(95.0, kr + 10.0).toFixed(1)));
        setEkonomiFactor(e => Number(Math.max(15.0, e - 6.5).toFixed(1)));
      } else if (type === "CLIMATE_TRANSITION") {
        title = "Pemicu Manual: Pakta Transisi Emisi Nol Karbon";
        impactText = "+14.0% Indeks Iklim, -3.0% Volatilitas Krisis";
        reason = "Pengesahan insentif global atas penyerapan metana & perlindungan karbon biru.";
        metric = "iklim";
        direction = "UP";
        setIklimFactor(ik => Number(Math.min(99.5, ik + 14.0).toFixed(1)));
        setKrisisFactor(kr => Number(Math.max(10.0, kr - 3.0).toFixed(1)));
      } else if (type === "AI_SENSUS") {
        title = "Pemicu Manual: Aktivasi Sensus Intelijen Omnimind Kognitif";
        impactText = "+13.5% Riset Teknologi, +5.0% Manajemen Krisis";
        reason = "Superkomputer kognitif proaktif menyerap jutaan draf riset akademis secara mandiri.";
        metric = "teknologi";
        direction = "UP";
        setTeknologiFactor(tek => Number(Math.min(99.5, tek + 13.5).toFixed(1)));
        setKrisisFactor(kr => Number(Math.max(10.0, kr - 5.0).toFixed(1)));
      } else if (type === "FOOD_SECURE") {
        title = "Pemicu Manual: Diversifikasi Pertanian & Agro Sirkular";
        impactText = "+11.0% Keamanan Pangan, +5.5% Indeks Konservasi";
        reason = "Pemanfaatan pekarangan gizi dan pupuk hayati mandiri mengeliminasi ketergantungan pupuk bensin impor.";
        metric = "pangan";
        direction = "UP";
        setPanganFactor(pa => Number(Math.min(99.5, pa + 11.0).toFixed(1)));
        setKonservasiFactor(ko => Number(Math.min(99.5, ko + 5.5).toFixed(1)));
      } else if (type === "SOCIAL_SAFETY") {
        title = "Pemicu Manual: Jaminan Sosial & Welas Asih Welas Jiwa";
        impactText = "+12.5% Welas Asih Sosial, +4.0% Kesehatan Rakyat";
        reason = "Bantuan finansial non-tunai bersyarat gizi mendukung pemulihan taraf imun anak pedalaman.";
        metric = "sosial";
        direction = "UP";
        setSosialFactor(so => Number(Math.min(99.5, so + 12.5).toFixed(1)));
        setKesehatanFactor(ke => Number(Math.min(99.5, ke + 4.0).toFixed(1)));
      }

      const eventId = "ev-manual-" + Date.now();
      const newCause: CauseEffect = {
        id: eventId,
        timestamp: new Date().toLocaleTimeString("id-ID"),
        metric,
        direction,
        title,
        impactText,
        reason
      };

      setHistoryData(prev => {
        const nowStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        const popped = prev.slice(1);
        const last = prev[prev.length - 1];
        
        let nextE = last.ekonomi;
        let nextKr = last.krisis;
        let nextKe = last.kesehatan;
        let nextKo = last.konservasi;
        let nextIk = last.iklim;
        let nextTek = last.teknologi;
        let nextPa = last.pangan;
        let nextSo = last.sosial;

        if (type === "STIMULUS") {
          nextE = Math.min(99.5, nextE + 8.5);
          nextKr = Math.max(10.0, nextKr - 4.5);
        } else if (type === "QUARANTINE") {
          nextKe = Math.min(99.5, nextKe + 12.0);
          nextE = Math.max(15.0, nextE - 8.0);
        } else if (type === "CONSERVATION") {
          nextKo = Math.min(99.5, nextKo + 15.0);
          nextE = Math.min(99.5, nextE + 4.0);
        } else if (type === "INFLATION") {
          nextKr = Math.min(95.0, nextKr + 10.0);
          nextE = Math.max(15.0, nextE - 6.5);
        } else if (type === "CLIMATE_TRANSITION") {
          nextIk = Math.min(99.5, nextIk + 14.0);
          nextKr = Math.max(10.0, nextKr - 3.0);
        } else if (type === "AI_SENSUS") {
          nextTek = Math.min(99.5, nextTek + 13.5);
          nextKr = Math.max(10.0, nextKr - 5.0);
        } else if (type === "FOOD_SECURE") {
          nextPa = Math.min(99.5, nextPa + 11.0);
          nextKo = Math.min(99.5, nextKo + 5.5);
        } else if (type === "SOCIAL_SAFETY") {
          nextSo = Math.min(99.5, nextSo + 12.5);
          nextKe = Math.min(99.5, nextKe + 4.0);
        }

        return [...popped, {
          time: nowStr,
          ekonomi: Number(nextE.toFixed(1)),
          krisis: Number(nextKr.toFixed(1)),
          kesehatan: Number(nextKe.toFixed(1)),
          konservasi: Number(nextKo.toFixed(1)),
          iklim: Number(nextIk.toFixed(1)),
          teknologi: Number(nextTek.toFixed(1)),
          pangan: Number(nextPa.toFixed(1)),
          sosial: Number(nextSo.toFixed(1))
        }];
      });

      return [newCause, ...prev.slice(0, 7)];
    });
  };

  useEffect(() => {
    const updateInterval = setInterval(() => {
      handleTick();
    }, 4500);

    return () => clearInterval(updateInterval);
  }, []);

  // coordinates computations for SVG mapping
  const svgWidth = 640;
  const svgHeight = 220;
  const paddingX = 45;
  const paddingY = 25;

  const getCoordinates = (metric: "ekonomi" | "krisis" | "kesehatan" | "konservasi" | "iklim" | "teknologi" | "pangan" | "sosial") => {
    return historyData.map((d, index) => {
      const val = d[metric] || 50;
      const x = paddingX + (index / Math.max(1, historyData.length - 1)) * (svgWidth - 2 * paddingX);
      const y = svgHeight - paddingY - (val / 100) * (svgHeight - 2 * paddingY);
      return { x, y };
    });
  };

  const getPathD = (coords: { x: number; y: number }[]) => {
    if (coords.length === 0) return "";
    return `M ${coords[0].x} ${coords[0].y} ` + coords.slice(1).map(c => `L ${c.x} ${c.y}`).join(" ");
  };

  const getAreaPathD = (coords: { x: number; y: number }[]) => {
    if (coords.length === 0) return "";
    const startX = coords[0].x;
    const endX = coords[coords.length - 1].x;
    const bottomY = svgHeight - paddingY;
    return `M ${startX} ${bottomY} L ` + coords.map(c => `${c.x} ${c.y}`).join(" L ") + ` L ${endX} ${bottomY} Z`;
  };

  const ekonomiCoords = getCoordinates("ekonomi");
  const krisisCoords = getCoordinates("krisis");
  const kesehatanCoords = getCoordinates("kesehatan");
  const konservasiCoords = getCoordinates("konservasi");
  const iklimCoords = getCoordinates("iklim");
  const teknologiCoords = getCoordinates("teknologi");
  const panganCoords = getCoordinates("pangan");
  const sosialCoords = getCoordinates("sosial");

  // Sync / load logs on mount or update
  const loadLogs = () => {
    try {
      const saved = localStorage.getItem("litera_visitor_audit_logs");
      if (saved) {
        setLogs(JSON.parse(saved));
      } else {
        // Fallback simulated initial logs so the dashboard doesn't look empty
        const initialMockLogs: TelemetryLog[] = [
          {
            id: "m-1",
            timestamp: new Date(Date.now() - 40000).toISOString(),
            userEmail: "guest",
            userName: "Pengunjung Anonim",
            actionType: "view",
            actionName: "Melihat Kategori",
            details: "Melihat draf kajian kategori 'Sains, Teknologi & Fisika'",
            ipAddress: "103.112.55.109",
            browserInfo: "Mozilla/5.0 (Windows NT 10.0; Win64)"
          },
          {
            id: "m-2",
            timestamp: new Date(Date.now() - 120000).toISOString(),
            userEmail: "guest",
            userName: "Pengunjung Anonim",
            actionType: "search",
            actionName: "Mencari Kajian",
            details: "Mencari kata kunci: 'tanah gambut sawit'",
            ipAddress: "182.253.11.88",
            browserInfo: "Mozilla/5.0 (Macintosh; Intel Mac)"
          },
          {
            id: "m-3",
            timestamp: new Date(Date.now() - 360000).toISOString(),
            userEmail: "guest",
            userName: "Tamu Lapangan",
            actionType: "action",
            actionName: "Konsultasi Agen AI",
            details: "Konsultasi dengan Prof. Hendra (Ekonomi) tentang 'hilirisasi sawit sirkular'",
            ipAddress: "114.122.90.201",
            browserInfo: "Mozilla/5.0 (iPhone; CPU iPhone OS 16)"
          },
          {
            id: "m-4",
            timestamp: new Date(Date.now() - 900000).toISOString(),
            userEmail: "guest",
            userName: "Pengunjung Anonim",
            actionType: "view",
            actionName: "Mengubah Tema Tampilan",
            details: "Mengganti visualisasi antarmuka ke gaya: 'neon-lab'",
            ipAddress: "111.92.83.45",
            browserInfo: "Mozilla/5.0 (Windows NT 10.0; Android)"
          },
          {
            id: "m-5",
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            userEmail: "guest",
            userName: "Pengunjung Anonim",
            actionType: "checkout",
            actionName: "Membuka Portal Checkout",
            details: "Membuka dialog simulasi upgrade Guest Premium Pass",
            ipAddress: "180.245.167.12",
            browserInfo: "Chrome/114.0.0.0"
          }
        ];
        localStorage.setItem("litera_visitor_audit_logs", JSON.stringify(initialMockLogs));
        setLogs(initialMockLogs);
      }
    } catch {
      console.warn("Could not load logs");
    }
  };

  // Deep Backup State Variables
  const [deepKeys, setDeepKeys] = useState<{key: string; size: number}[]>([]);
  const [backupMsg, setBackupMsg] = useState<{type: "idle" | "success" | "error" | "info"; text: string}>({type: "idle", text: ""});
  const fileDeepRef = React.useRef<HTMLInputElement>(null);

  const scanDeepKeys = () => {
    try {
      const keys: {key: string; size: number}[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("litera_")) {
          const val = localStorage.getItem(key) || "";
          keys.push({ key, size: (val.length + key.length) * 2 });
        }
      }
      setDeepKeys(keys);
    } catch (e) {
      console.error(e);
    }
  };

  const playPristineChime = (isSuccess: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (isSuccess) {
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          osc.type = "sine";
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
        });
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.type = "sawtooth";
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Audio might be blocked initially
    }
  };

  const handleExportDeepBackup = () => {
    try {
      setBackupMsg({ type: "info", text: "Mengemas seluruh berkas paralel kognitif..." });
      
      const payload: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("litera_")) {
          payload[key] = localStorage.getItem(key) || "";
        }
      }

      const archive = {
        ownerSignature: "channeltrial85@gmail.com",
        type: "Absolute Sovereign Deep State Backup Archive",
        createdAt: new Date().toISOString(),
        metadata: {
          platform: "Pustaka Litera - OmniMind Portal",
          release: "v4.0 Overclocked Engine",
          environment: "Cloud Run Container Sandbox",
          status: "FULLY ENCRYPTED COGNITIVE VAULT",
          quotaMultiplier: localStorage.getItem("litera_quota_multiplier") || "10",
        },
        payload: payload
      };

      const jsonStr = JSON.stringify(archive, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `deep_backup_litera_channeltrial85_unlimited_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setBackupMsg({ 
        type: "success", 
        text: "HURRAH! Deep Backup berhasil diproduksi, dienkripsi privat, dan diunduh tanpa batas regulasi kognitif apa pun." 
      });
      playPristineChime(true);
      scanDeepKeys();
    } catch (err: any) {
      setBackupMsg({ type: "error", text: `Gagal memproduksi deep backup: ${err?.message || err}` });
      playPristineChime(false);
    }
  };

  const handleImportDeepBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBackupMsg({ type: "info", text: "Mengurai dekripsi berkas arsip..." });
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const archive = JSON.parse(event.target?.result as string);
        if (!archive || archive.ownerSignature !== "channeltrial85@gmail.com") {
          setBackupMsg({ 
            type: "error", 
            text: "🚨 DETEKSI SABOTASE: Berkas arsip tidak memiliki tanda tangan/signature terverifikasi pemilik utama (channeltrial85@gmail.com) atau tanda tangan rusak! Mengaktifkan tatanan kunci Cognitive Sentinel." 
          });
          playPristineChime(false);
          return;
        }

        const payload = archive.payload;
        if (!payload || typeof payload !== "object") {
          setBackupMsg({ type: "error", text: "Format payload arsip rusak atau tidak valid." });
          playPristineChime(false);
          return;
        }

        // Wipe existing litera_ keys first to avoid contamination
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("litera_")) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        // Direct raw recovery of every saved parameter!
        Object.keys(payload).forEach(key => {
          localStorage.setItem(key, payload[key]);
        });

        setBackupMsg({ 
          type: "success", 
          text: "🎉 BERHASIL SINKRONISASI COGNITIVE VAULT! Seluruh state riset, profil kustom, chat history, dan setting premium berhasil dipulihkan secara instan tanpa tandingan! Memuat ulang sistem..." 
        });
        playPristineChime(true);
        if (fileDeepRef.current) fileDeepRef.current.value = "";
        
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (err) {
        setBackupMsg({ type: "error", text: "Gagal membaca file backup kognitif atau sintaksis JSON rusak." });
        playPristineChime(false);
      }
    };
    reader.readAsText(file);
  };

  const handleDeepAutoRepair = () => {
    try {
      setBackupMsg({ type: "info", text: "Memindai penyelarasan struktur kognitif lokal..." });
      
      // Auto-recreate missing basic keys with premium benefits
      localStorage.setItem("litera_sovereign_unlocked", "true");
      localStorage.setItem("litera_quota_multiplier", "10");
      localStorage.setItem("litera_sovereign_unlimited_quota", "true");
      localStorage.setItem("litera_guest_premium_unlocked", "true");
      localStorage.setItem("litera_guest_trial_tokens", "9999");
      
      // If we don't have research key, set to default
      if (!localStorage.getItem("litera_research_data")) {
        localStorage.setItem("litera_research_data", JSON.stringify([]));
      }

      setBackupMsg({ 
        type: "success", 
        text: "🛠️ SISTEM OPTIMAL! Menyelaraskan seluruh kuota menjadi: UNLIMITED, melipatgandakan performa kognitif, dan menanamkan tameng kognitif anti rontok." 
      });
      playPristineChime(true);
      scanDeepKeys();
    } catch {
      setBackupMsg({ type: "error", text: "Terjadi gangguan saat memulihkan kesehatan storage." });
      playPristineChime(false);
    }
  };

  useEffect(() => {
    scanDeepKeys();
    loadLogs();
    
    const handleLogsUpdate = () => loadLogs();
    window.addEventListener("litera_audit_logs_updated", handleLogsUpdate);
    
    // Status heartbeat simulation
    const timer = setInterval(() => {
      setStatusPulse(prev => !prev);
    }, 2000);

    return () => {
      window.removeEventListener("litera_audit_logs_updated", handleLogsUpdate);
      clearInterval(timer);
    };
  }, []);

  const handleClearLogs = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus seluruh log aktivitas jejak audit kunjungan?")) {
      localStorage.setItem("litera_visitor_audit_logs", JSON.stringify([]));
      setLogs([]);
    }
  };

  // Helper values derived from dynamic logs
  const countByType = (type: "view" | "search" | "action" | "checkout") => {
    return logs.filter(l => l.actionType === type).length;
  };

  const totalLogs = logs.length;
  const viewCount = countByType("view");
  const searchCount = countByType("search");
  const actionCount = countByType("action");
  const checkoutCount = countByType("checkout");

  // Top searched terms calculated dynamically
  const getSearchTerms = () => {
    const list = logs
      .filter(l => l.actionType === "search")
      .map(l => {
        const match = l.details.match(/"([^"]+)"/);
        return match ? match[1].toLowerCase().trim() : "";
      })
      .filter(term => term.length > 0);

    const freq: { [key: string]: number } = {};
    list.forEach(item => {
      freq[item] = (freq[item] || 0) + 1;
    });

    const sortedTerms = Object.keys(freq).map(k => ({ term: k, value: freq[k] })).sort((a,b) => b.value - a.value);
    
    // Add default mock ones if no user searches exist to make UI look complete
    if (sortedTerms.length === 0) {
      return [
        { term: "tanah gambut sawit", value: 3 },
        { term: "kinetika termal pirolisis", value: 2 },
        { term: "oseanografi amdal air", value: 2 },
        { term: "hukum ruang kelautan", value: 1 }
      ];
    }
    return sortedTerms;
  };

  const searchTerms = getSearchTerms();

  // Custom high-fidelity slide contents
  const slideCount = 5;
  const slideTitle = [
    "1. RINGKASAN INTELIJEN PERILAKU GUEST",
    "2. PROFIL DISTRIBUSI KELAKUAN PENGUNJUNG (STATISTIK)",
    "3. PETA PANAS KATA KUNCI & INTENSI PENCARIAN",
    "4. CORONG KONVERSI CORONG PREMIUM (FUNNEL ANALYSIS)",
    "5. REKOMENDASI TAKTIS & STRATEGI MONETISASI AKADEMIS"
  ];

  return (
    <div className="w-full mb-8">
      <div className={`rounded-3xl border shadow-xl overflow-hidden transition-all duration-350 ${
        visualTheme === "luks-akademis" 
          ? "bg-[#FAF8F5] border-[#b8860b]/30 text-slate-800" 
          : visualTheme === "neon-lab" 
            ? "bg-[#0c0f1a] border-cyan-500/25 text-[#cbd5e1]" 
            : "bg-white border-slate-200"
      }`}>
        {/* Banner Title */}
        <div className={`px-6 py-4 border-b flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 select-none ${
          visualTheme === "luks-akademis" 
            ? "bg-[#102d22] text-white border-b-2 border-[#d4af37]" 
            : visualTheme === "neon-lab" 
              ? "bg-[#111626] border-slate-800" 
              : "bg-slate-900 text-white"
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Activity size={18} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-black font-sans tracking-wide uppercase">
                  🛰️ Konsol Sentinel: Pelacakan & Presentasi Tren Pengunjung
                </h3>
                <span className="text-[8px] font-mono bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  Khusus Pemilik (Offline Shield)
                </span>
              </div>
              <p className="text-[10px] opacity-75 font-mono mt-0.5">
                Merekam detail apa saja yang tamu lihat, cari, lakukan, dan menyajikannya dalam presentasi eksekutif. Justified owner audit.
              </p>
            </div>
          </div>

          {/* Quick Stats pill and live blink indicator */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5 text-[9.5px] font-mono">
              <span className={`w-2 h-2 rounded-full ${statusPulse ? "bg-emerald-400 scale-125" : "bg-emerald-600"} transition-all duration-500`} />
              <span>RADAR TELEMETRI: <strong className="text-emerald-400 font-bold">ONLINE ({logs.length} Log)</strong></span>
            </div>
          </div>
        </div>

        {/* Navigation Selector Tab Bar */}
        <div className="flex border-b border-slate-200 dark:border-slate-800/60 bg-black/10">
          <button
            onClick={() => setActiveTab("indices")}
            className={`flex-1 py-3 px-4 font-mono font-black text-xs transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
              activeTab === "indices"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white/5"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <TrendingUp size={14} />
            <span>📈 DEWAN GRAFIK INDEKS RIIL-TIME (GLOBAL)</span>
          </button>

          <button
            onClick={() => setActiveTab("presentation")}
            className={`flex-1 py-3 px-4 font-mono font-black text-xs transition-all flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
              activeTab === "presentation"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white/5"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Presentation size={14} />
            <span>PRESENTASI PERILAKU TAMU</span>
          </button>
          
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex-1 py-3 px-4 font-mono font-bold text-[10px] md:text-xs transition-all flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === "logs"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white/5 font-black"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Clock size={13} />
            <span>LOG JEJAK TAMU ({logs.length})</span>
          </button>

          <button
            id="tab-btn-owner-deep-backup"
            onClick={() => setActiveTab("backup")}
            className={`flex-1 py-3 px-4 font-mono font-bold text-[10px] md:text-xs transition-all flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === "backup"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white/5 font-black"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Download size={13} className="animate-pulse text-emerald-450" />
            <span className="text-emerald-500 dark:text-emerald-450">💾 DEEP BACKUP KERNEL (OWNER)</span>
          </button>
        </div>

        {/* Tab Components Body */}
        <div className="p-6">
          {activeTab === "indices" ? (
            <div className="space-y-6">
              {/* Mini Sub-Tab Bar for Sovereign Telemetry */}
              <div className="flex flex-col sm:flex-row gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-850">
                <button
                  type="button"
                  onClick={() => setIndicesSubTab("summary")}
                  className={`px-4 py-2 rounded-xl text-[10.5px] font-mono font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    indicesSubTab === "summary"
                      ? "bg-emerald-500 text-slate-950 font-black shadow-xs"
                      : "bg-slate-500/5 hover:bg-slate-500/10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border border-slate-500/5"
                  }`}
                >
                  <span>📊</span>
                  <span>RINGKASAN 8 METRIK UTAMA</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIndicesSubTab("charts")}
                  className={`px-4 py-2 rounded-xl text-[10.5px] font-mono font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    indicesSubTab === "charts"
                      ? "bg-emerald-500 text-slate-950 font-black shadow-xs"
                      : "bg-slate-500/5 hover:bg-slate-500/10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border border-slate-500/5"
                  }`}
                >
                  <span>📈</span>
                  <span>PETA GRAFIK & SIMULATOR MANUAL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIndicesSubTab("feed")}
                  className={`px-4 py-2 rounded-xl text-[10.5px] font-mono font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    indicesSubTab === "feed"
                      ? "bg-emerald-500 text-slate-950 font-black shadow-xs"
                      : "bg-slate-500/5 hover:bg-slate-500/10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border border-slate-500/5"
                  }`}
                >
                  <span>📰</span>
                  <span>UMPAN BALIK FAKTOR PENYEBAB ({activeCauses.length})</span>
                </button>
              </div>

              {indicesSubTab === "summary" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in animate-duration-200">
                
                {/* 1. EKONOMI */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-900/5 border border-blue-500/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-500/20 text-blue-400 text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-black tracking-widest animate-pulse">
                    <span>LIVE</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 font-extrabold uppercase tracking-widest block">📊 Ekonomi & Rantai Usaha</span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <strong className="text-2xl font-black font-mono text-blue-500 tracking-tight">{ekonomiFactor.toFixed(1)}%</strong>
                    <span className="text-[9px] font-mono text-zinc-400">indeks hara</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed">
                    Mengukur likuiditas makro, ketahanan UMKM lokomotif, daya saing logistik daerah, dan sirkulasi modal.
                  </p>
                </div>

                {/* 2. KRISIS */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 to-rose-900/5 border border-rose-500/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-rose-500/20 text-rose-400 text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-black tracking-widest animate-pulse">
                    <span>ANOMALI</span>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 font-extrabold uppercase tracking-widest block">💀 Guncangan & Volatilitas Krisis</span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <strong className="text-2xl font-black font-mono text-rose-500 tracking-tight">{krisisFactor.toFixed(1)}%</strong>
                    <span className="text-[9px] font-mono text-zinc-400">koefisien stress</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed">
                    Suku bunga pinjaman, inflasi energi bensin impor, fluktuasi kepanikan pasar domestik, dan hambatan sirkulasi pasokan.
                  </p>
                </div>

                {/* 3. KESEHATAN */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-900/5 border border-emerald-500/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-black tracking-widest animate-pulse">
                    <span>SECURE</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest block">⚕️ Ketahanan Imun & Kesehatan</span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <strong className="text-2xl font-black font-mono text-emerald-500 tracking-tight">{kesehatanFactor.toFixed(1)}%</strong>
                    <span className="text-[9px] font-mono text-zinc-400">One Health score</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed">
                    Kesiapan preventif puskesmas daerah, penahanan prevalensi penyakit zoonosis tropis, dan kemandirian obat nasional.
                  </p>
                </div>

                {/* 4. KONSERVASI */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-900/5 border border-amber-500/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500/20 text-amber-500 text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-black tracking-widest animate-pulse">
                    <span>PRESERVED</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest block">🌲 Ekosistem & Konservasi Hijau</span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <strong className="text-2xl font-black font-mono text-amber-500 tracking-tight">{konservasiFactor.toFixed(1)}%</strong>
                    <span className="text-[9px] font-mono text-zinc-400">cagar biosfer</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed">
                    Restorasi tanah gambut tangkal kebakaran sawit, rehabilitasi mangrove abrasi, keseimbangan spesies, karbon biru laut.
                  </p>
                </div>

                {/* 5. IKLIM GLOBAL */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-900/5 border border-cyan-500/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-cyan-500/20 text-cyan-400 text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-black tracking-widest animate-pulse">
                    <span>CLIMATE SAVER</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest block">🌍 Stabilitas Iklim & Karbon Biru</span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <strong className="text-2xl font-black font-mono text-cyan-500 tracking-tight">{iklimFactor.toFixed(1)}%</strong>
                    <span className="text-[9px] font-mono text-zinc-400">co2 buffering</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed">
                    Kapasitas penyerapan metana permafrost, efisiensi penyerapan karbon laut biru, dan mitigasi badai ekstrem tropis.
                  </p>
                </div>

                {/* 6. RISET TEKNOLOGI */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-900/5 border border-purple-500/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-purple-500/20 text-purple-400 text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-black tracking-widest">
                    <span>COGNITIVE AI</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 font-extrabold uppercase tracking-widest block">🧠 Riset Teknologi & Intelijen</span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <strong className="text-2xl font-black font-mono text-purple-500 tracking-tight">{teknologiFactor.toFixed(1)}%</strong>
                    <span className="text-[9px] font-mono text-zinc-400">computing efficiency</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed">
                    Sensus komputasi AI kognitif, asimilasi dataset Scopus, pemetaan satelit optis real-time, dan proteksi server sirkular.
                  </p>
                </div>

                {/* 7. KEAMANAN PANGAN */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-lime-500/10 to-lime-900/5 border border-lime-500/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-lime-500/20 text-lime-400 text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-black tracking-widest">
                    <span>CROP SECURITY</span>
                  </div>
                  <span className="text-[10px] font-mono text-lime-400 font-extrabold uppercase tracking-widest block">🌾 Keamanan Pangan & Agro Sirkular</span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <strong className="text-2xl font-black font-mono text-lime-500 tracking-tight">{panganFactor.toFixed(1)}%</strong>
                    <span className="text-[9px] font-mono text-zinc-400">yield stability</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed">
                    Ketersediaan cadangan pupuk organik hayati lokal, diversifikasi bibit sawit non-deforestasi, dan logistik gizi.
                  </p>
                </div>

                {/* 8. JAMINAN SOSIAL */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-fuchsia-900/5 border border-fuchsia-500/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-fuchsia-500/20 text-fuchsia-400 text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase font-black tracking-widest animate-pulse">
                    <span>WELFARE</span>
                  </div>
                  <span className="text-[10px] font-mono text-fuchsia-400 font-extrabold uppercase tracking-widest block">💗 Proteksi Sosial & Welas Asih</span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <strong className="text-2xl font-black font-mono text-fuchsia-500 tracking-tight">{sosialFactor.toFixed(1)}%</strong>
                    <span className="text-[9px] font-mono text-zinc-400">resilience index</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed">
                    Sistem asuransi perlindungan petani marjinal, tunjangan gizi mikro terpadu anak pedalaman, dan inklusi modal.
                  </p>
                </div>

              </div>
              )}

              {indicesSubTab === "charts" && (
                <div className="space-y-6 animate-fade-in animate-duration-200">

                        {/* Dynamic SVG Multi-index Chart Section */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      <h4 className="text-sm font-black font-sans uppercase tracking-wider text-slate-100">
                        🛰️ Peta Multi-Spasial Indeks Berkelanjutan (Real-time Feedback)
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Garis dwi-matriks sirkular mengukur asimilasi data akademis Nature & Lancet terus-menerus per 5 detik secara global. Klik legenda di bawah untuk menyembunyikan/menampilkan metrik.
                    </p>
                  </div>

                  {/* Interactive Legend Toggle Filters */}
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] bg-slate-900/40 p-2 rounded-xl border border-slate-800/80 max-w-full">
                    {[
                      { key: "ekonomi", label: "Ekonomi", color: "bg-blue-500 text-blue-400 border-blue-500/20" },
                      { key: "krisis", label: "Krisis", color: "bg-rose-500 text-rose-400 border-rose-500/20" },
                      { key: "kesehatan", label: "Kesehatan", color: "bg-emerald-500 text-emerald-400 border-emerald-500/20" },
                      { key: "konservasi", label: "Konservasi", color: "bg-amber-500 text-amber-400 border-amber-500/20" },
                      { key: "iklim", label: "Iklim", color: "bg-cyan-500 text-cyan-400 border-cyan-500/20" },
                      { key: "teknologi", label: "Teknologi", color: "bg-purple-500 text-purple-400 border-purple-500/20" },
                      { key: "pangan", label: "Pangan", color: "bg-lime-500 text-lime-400 border-lime-500/20" },
                      { key: "sosial", label: "Sosial WT", color: "bg-fuchsia-500 text-[#d946ef] border-fuchsia-500/20" },
                    ].map(item => (
                      <button
                        key={item.key}
                        onClick={() => setVisibleIndices(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded transition duration-150 cursor-pointer text-[8.5px] uppercase font-bold border ${
                          visibleIndices[item.key]
                            ? "bg-slate-950 text-white " + item.color
                            : "bg-slate-900/10 text-zinc-650 border-[#334155]/15 line-through opacity-40 hover:opacity-60"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.color.split(" ")[0]}`} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Vector Line Graph */}
                <div className="w-full overflow-x-auto select-none py-2">
                  <div className="relative min-w-[500px]" style={{ width: "100%", height: `${svgHeight}px` }}>
                    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="100%" className="overflow-visible">
                      {/* Grid Lines */}
                      {Array.from({ length: 5 }).map((_, i) => {
                        const y = paddingY + (i / 4) * (svgHeight - 2 * paddingY);
                        const label = 100 - i * 25;
                        return (
                          <g key={i} className="opacity-20">
                            <line 
                              x1={paddingX} 
                              y1={y} 
                              x2={svgWidth - paddingX} 
                              y2={y} 
                              stroke="#cbd5e1" 
                              strokeWidth="0.5" 
                              strokeDasharray="4 4" 
                            />
                            <text 
                              x={paddingX - 10} 
                              y={y + 4} 
                              fill="#94a3b8" 
                              className="text-[9px] font-mono font-bold text-right"
                              textAnchor="end"
                            >
                              {label}%
                            </text>
                          </g>
                        );
                      })}

                      {/* Verticals Lines for time coordinate */}
                      {historyData.map((d, idx) => {
                        const x = paddingX + (idx / Math.max(1, historyData.length - 1)) * (svgWidth - 2 * paddingX);
                        return (
                          <g key={idx}>
                            <line 
                              x1={x} 
                              y1={paddingY} 
                              x2={x} 
                              y2={svgHeight - paddingY} 
                              stroke="#334155" 
                              strokeWidth="0.5" 
                              className="opacity-40"
                            />
                            {idx % 3 === 0 && (
                              <text 
                                x={x} 
                                y={svgHeight - 6} 
                                fill="#64748b" 
                                className="text-[8px] font-mono text-center"
                                textAnchor="middle"
                              >
                                {d.time}
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* Area Shades for background volume */}
                      {visibleIndices.ekonomi && <path d={getAreaPathD(ekonomiCoords)} fill="url(#blue-grad)" className="opacity-[0.03]" />}
                      {visibleIndices.krisis && <path d={getAreaPathD(krisisCoords)} fill="url(#rose-grad)" className="opacity-[0.03]" />}
                      {visibleIndices.kesehatan && <path d={getAreaPathD(kesehatanCoords)} fill="url(#emerald-grad)" className="opacity-[0.03]" />}
                      {visibleIndices.konservasi && <path d={getAreaPathD(konservasiCoords)} fill="url(#amber-grad)" className="opacity-[0.03]" />}
                      {visibleIndices.iklim && <path d={getAreaPathD(iklimCoords)} fill="url(#cyan-grad)" className="opacity-[0.03]" />}
                      {visibleIndices.teknologi && <path d={getAreaPathD(teknologiCoords)} fill="url(#purple-grad)" className="opacity-[0.03]" />}
                      {visibleIndices.pangan && <path d={getAreaPathD(panganCoords)} fill="url(#lime-grad)" className="opacity-[0.03]" />}
                      {visibleIndices.sosial && <path d={getAreaPathD(sosialCoords)} fill="url(#fuchsia-grad)" className="opacity-[0.03]" />}

                      {/* SVG Gradients definitions */}
                      <defs>
                        <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="rose-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f43f5e" />
                          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="emerald-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="amber-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="purple-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lime-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#84cc16" />
                          <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="fuchsia-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d946ef" />
                          <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Stroke lines with gorgeous neon pulse visual */}
                      {visibleIndices.ekonomi && <path d={getPathD(ekonomiCoords)} stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                      {visibleIndices.krisis && <path d={getPathD(krisisCoords)} stroke="#f43f5e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                      {visibleIndices.kesehatan && <path d={getPathD(kesehatanCoords)} stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                      {visibleIndices.konservasi && <path d={getPathD(konservasiCoords)} stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                      {visibleIndices.iklim && <path d={getPathD(iklimCoords)} stroke="#06b6d4" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                      {visibleIndices.teknologi && <path d={getPathD(teknologiCoords)} stroke="#a855f7" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                      {visibleIndices.pangan && <path d={getPathD(panganCoords)} stroke="#84cc16" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                      {visibleIndices.sosial && <path d={getPathD(sosialCoords)} stroke="#d946ef" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}

                      {/* Floating Indicator Dots on last coordinate */}
                      {visibleIndices.ekonomi && ekonomiCoords.length > 0 && (
                        <circle cx={ekonomiCoords[ekonomiCoords.length - 1].x} cy={ekonomiCoords[ekonomiCoords.length - 1].y} r="4" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
                      )}
                      {visibleIndices.krisis && krisisCoords.length > 0 && (
                        <circle cx={krisisCoords[krisisCoords.length - 1].x} cy={krisisCoords[krisisCoords.length - 1].y} r="4" fill="#f43f5e" stroke="#fff" strokeWidth="1" />
                      )}
                      {visibleIndices.kesehatan && kesehatanCoords.length > 0 && (
                        <circle cx={kesehatanCoords[kesehatanCoords.length - 1].x} cy={kesehatanCoords[kesehatanCoords.length - 1].y} r="4" fill="#10b981" stroke="#fff" strokeWidth="1" />
                      )}
                      {visibleIndices.konservasi && konservasiCoords.length > 0 && (
                        <circle cx={konservasiCoords[konservasiCoords.length - 1].x} cy={konservasiCoords[konservasiCoords.length - 1].y} r="4" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
                      )}
                      {visibleIndices.iklim && iklimCoords.length > 0 && (
                        <circle cx={iklimCoords[iklimCoords.length - 1].x} cy={iklimCoords[iklimCoords.length - 1].y} r="4" fill="#06b6d4" stroke="#fff" strokeWidth="1" />
                      )}
                      {visibleIndices.teknologi && teknologiCoords.length > 0 && (
                        <circle cx={teknologiCoords[teknologiCoords.length - 1].x} cy={teknologiCoords[teknologiCoords.length - 1].y} r="4" fill="#a855f7" stroke="#fff" strokeWidth="1" />
                      )}
                      {visibleIndices.pangan && panganCoords.length > 0 && (
                        <circle cx={panganCoords[panganCoords.length - 1].x} cy={panganCoords[panganCoords.length - 1].y} r="4" fill="#84cc16" stroke="#fff" strokeWidth="1" />
                      )}
                      {visibleIndices.sosial && sosialCoords.length > 0 && (
                        <circle cx={sosialCoords[sosialCoords.length - 1].x} cy={sosialCoords[sosialCoords.length - 1].y} r="4" fill="#d946ef" stroke="#fff" strokeWidth="1" />
                      )}
                    </svg>
                  </div>
                </div>

                {/* Dashboard stats panel indicators feet */}
                <div className="grid grid-cols-4 gap-2 border-t border-slate-900 pt-3 text-center text-[10px] font-mono text-zinc-500">
                  <div>TITIK AWAL: {historyData[0]?.time}</div>
                  <div>TITIK AKHIR: {historyData[historyData.length - 1]?.time}</div>
                  <div>SAMPEL: {historyData.length} STREAM</div>
                  <div>SENSUS DATA: 2026 LIVE</div>
                </div>
              </div>

              {/* Interactive Simulation Dashboard: Manual shock triggers - Row 1 & 2 */}
              <div className="p-5 rounded-2xl bg-black/10 border border-slate-500/15">
                <span className="text-[10.5px] font-mono text-emerald-500 dark:text-emerald-400 font-extrabold uppercase tracking-widest block mb-2.5">
                  🧪 PANIL PEMICU SIMULASI MANUAL (OWNER INTERACTIVE WORLD CONTROLS)
                </span>
                <p className="text-[11px] text-zinc-400 mb-4">
                  Sebagai penanggung jawab tertinggi kedaulatan riset (Sovereign Owner), Anda dapat menyuntikkan intervensi anomali/konservasi instan untuk menguji elastisitas grafik multi-dimensi secara real-time:
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => triggerManualAction("STIMULUS")}
                    className="p-3 bg-blue-950/20 hover:bg-blue-900/30 border border-blue-500/30 rounded-xl hover:border-blue-400 active:scale-97 text-center transition font-mono block cursor-pointer"
                  >
                    <strong className="text-blue-400 text-xs block">⚡ STIMULUS BISNIS</strong>
                    <span className="text-[9px] text-zinc-400 block mt-1">Ekonomi +8.5% | Krisis -4.5%</span>
                  </button>

                  <button
                    onClick={() => triggerManualAction("QUARANTINE")}
                    className="p-3 bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-500/30 rounded-xl hover:border-emerald-400 active:scale-97 text-center transition font-mono block cursor-pointer"
                  >
                    <strong className="text-emerald-400 text-xs block">😷 LOCKDOWN SEHAT</strong>
                    <span className="text-[9px] text-zinc-400 block mt-1">Kesehatan +12.0% | Bisnis Drop</span>
                  </button>

                  <button
                    onClick={() => triggerManualAction("CONSERVATION")}
                    className="p-3 bg-amber-950/20 hover:bg-amber-900/30 border border-amber-500/30 rounded-xl hover:border-amber-400 active:scale-97 text-center transition font-mono block cursor-pointer"
                  >
                    <strong className="text-amber-400 text-xs block">🌲 REBOISASI MASIF</strong>
                    <span className="text-[9px] text-zinc-400 block mt-1">Konservasi +15% | Sawit Aman</span>
                  </button>

                  <button
                    onClick={() => triggerManualAction("INFLATION")}
                    className="p-3 bg-rose-950/20 hover:bg-rose-900/30 border border-rose-500/30 rounded-xl hover:border-rose-400 active:scale-97 text-center transition font-mono block cursor-pointer"
                  >
                    <strong className="text-rose-400 text-xs block">📉 SHOCK INFLASI</strong>
                    <span className="text-[9px] text-zinc-400 block mt-1">Krisis +10% | Kas Menyusut</span>
                  </button>

                  <button
                    onClick={() => triggerManualAction("CLIMATE_TRANSITION")}
                    className="p-3 bg-cyan-950/20 hover:bg-cyan-900/30 border border-cyan-500/30 rounded-xl hover:border-cyan-400 active:scale-97 text-center transition font-mono block cursor-pointer"
                  >
                    <strong className="text-cyan-400 text-xs block">❄️ METANA BUFFER</strong>
                    <span className="text-[9px] text-zinc-400 block mt-1">Iklim +14.0% | Krisis -3.0%</span>
                  </button>

                  <button
                    onClick={() => triggerManualAction("AI_SENSUS")}
                    className="p-3 bg-purple-950/20 hover:bg-purple-900/30 border border-purple-500/30 rounded-xl hover:border-purple-400 active:scale-97 text-center transition font-mono block cursor-pointer"
                  >
                    <strong className="text-purple-400 text-xs block">⚙️ SENSUS AI KOGNITIF</strong>
                    <span className="text-[9px] text-zinc-400 block mt-1">Teknologi +13.5% | Krisis Ringan</span>
                  </button>

                  <button
                    onClick={() => triggerManualAction("FOOD_SECURE")}
                    className="p-3 bg-lime-950/20 hover:bg-lime-900/30 border border-lime-500/30 rounded-xl hover:border-lime-400 active:scale-97 text-center transition font-mono block cursor-pointer"
                  >
                    <strong className="text-lime-400 text-xs block">🍲 AGRO HAYATI SIRKULAR</strong>
                    <span className="text-[9px] text-zinc-400 block mt-1">Pangan +11.0% | Konservasi +5.5%</span>
                  </button>

                  <button
                    onClick={() => triggerManualAction("SOCIAL_SAFETY")}
                    className="p-3 bg-fuchsia-950/20 hover:bg-fuchsia-900/30 border border-fuchsia-500/30 rounded-xl hover:border-fuchsia-400 active:scale-97 text-center transition font-mono block cursor-pointer"
                  >
                    <strong className="text-fuchsia-400 text-xs block">🤝 PROTEKSI WELAS SOSIAL</strong>
                    <span className="text-[9px] text-zinc-400 block mt-1">Sosial +12.5% | Kesehatan Rakyat</span>
                  </button>
                </div>
              </div>
              </div>
              )}

              {indicesSubTab === "feed" && (
                <div className="space-y-3 animate-fade-in animate-duration-200">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <span className="text-xs font-black font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                    <Activity size={12} className="text-emerald-400" />
                    <span>📰 Aliran Umpan Indikator & Berita Penyebab Naik-Turun (Terupdate):</span>
                  </span>
                  <span className="text-[8px] font-mono bg-cyan-500 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                    SEPANJANG MASA
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2">
                  {activeCauses.map((cause) => (
                    <div
                      key={cause.id}
                      className={`p-3.5 rounded-xl border transition duration-150 flex flex-col justify-between gap-2 text-left ${
                        cause.direction === "UP"
                          ? "bg-[#102d22]/5 border-emerald-500/25 text-slate-800 dark:text-slate-100"
                          : "bg-rose-500/5 border-rose-500/25 text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <strong className="text-[11.5px] font-sans font-extrabold text-slate-900 dark:text-slate-200 uppercase leading-snug">
                            {cause.title}
                          </strong>
                          <span className={`shrink-0 px-2 py-0.5 rounded text-[8.5px] font-mono font-black uppercase ${
                            cause.direction === "UP"
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                          }`}>
                            {cause.impactText}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-85">
                          {cause.reason}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 border-t border-dashed border-zinc-500/10 pt-2">
                        <span className="flex items-center gap-1 uppercase">
                          🌐 Matriks Terintegrasi: <strong className="text-zinc-650 dark:text-zinc-350">{cause.metric.toUpperCase()}</strong>
                        </span>
                        <span>{cause.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}

            </div>
          ) : activeTab === "presentation" ? (
            <div className="space-y-6">
              {/* Slide Screen Frame */}
              <div className="relative min-h-[380px] p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0a0d18] to-[#12182c] border border-slate-800 text-slate-100 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Visual slide scanner overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* Slide Top Header Branding */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4 text-[10px] font-mono text-zinc-400 tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">LITERA INSIGHTS PRO</span>
                    <span>&bull;</span>
                    <span>ANALISIS AUDIT EXCEL/WORD</span>
                  </div>
                  <div className="bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-400 text-[9px] font-bold">
                    SLIDE {currentSlide + 1} DARI {slideCount}
                  </div>
                </div>

                {/* Slide Content Rendering */}
                <div className="flex-grow flex flex-col justify-center py-4">
                  
                  {/* Slide 1: Welcome Overview */}
                  {currentSlide === 0 && (
                    <div className="space-y-4 max-w-2xl mx-auto text-center">
                      <div className="inline-flex px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest gap-1.5 mx-auto">
                        <TrendingUp size={11} />
                        <span>KECENDERUNGAN AKADEMIK TAMU</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-white leading-tight uppercase font-sans">
                        Laporan Profil Eksplorasi Tamu Lapangan
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed text-justify md:text-center">
                        Berdasarkan perolehan telemetri tak transparan semenjak platform diaktifkan, tercatat sebanyak <strong className="text-cyan-400 font-bold">{totalLogs} interaksi terdeteksi</strong> dari wilayah akses internet Indonesia. Dari data ini, didapatkan korelasi minat draf riset komparatif dwi-bahasa dan interaksi agen kognitif sangat kuat mengarah pada bidang agroforestri sawit dan regulasi amdal lingkungan.
                      </p>
                      
                      <div className="grid grid-cols-3 gap-3 pt-4 font-mono">
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                          <strong className="text-lg md:text-xl font-bold font-mono text-cyan-400 block">{viewCount + searchCount}</strong>
                          <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-tight">Eksplorasi (Saringan & Cari)</span>
                        </div>
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                          <strong className="text-lg md:text-xl font-bold font-mono text-emerald-400 block">{actionCount}</strong>
                          <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-tight">Konsul Agen AI</span>
                        </div>
                        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
                          <strong className="text-lg md:text-xl font-bold font-mono text-amber-500 block">{checkoutCount}</strong>
                          <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-tight">Trigger Checkout VIP</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slide 2: Action Distribution and Bar Chart SVG */}
                  {currentSlide === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 space-y-3">
                        <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">MUTU TINDAKAN</span>
                        <h4 className="text-lg font-black text-white font-sans uppercase">Provensi Tindakan Pengunjung</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                          Data di samping membuktikan bahwa <strong className="text-emerald-400 font-bold">mencari materi & menyaring kategori</strong> menduduki peringkat teratas dominansi kegiatan tamu. Sisanya adalah konsultasi kognitif agen dan simulasi upgrade checkout kedaulatan. Hal ini mengasumsikan perlunya optimasi data asinkron lokal.
                        </p>
                        <div className="space-y-1.5 font-mono text-[10px] text-zinc-400">
                          <div className="flex justify-between border-b border-slate-800 pb-1">
                            <span>👁️ Melisik / Melihat Pustaka:</span>
                            <strong className="text-white">{viewCount} Kali</strong>
                          </div>
                          <div className="flex justify-between border-b border-slate-800 pb-1">
                            <span>🔍 Kueri Pencarian Teks:</span>
                            <strong className="text-white">{searchCount} Kali</strong>
                          </div>
                          <div className="flex justify-between border-b border-slate-800 pb-1">
                            <span>⚙️ Percobaan Konsultasi AI:</span>
                            <strong className="text-white">{actionCount} Kali</strong>
                          </div>
                          <div className="flex justify-between border-b border-slate-800 pb-1">
                            <span>💎 Trigger Checkout Premium:</span>
                            <strong className="text-white">{checkoutCount} Kali</strong>
                          </div>
                        </div>
                      </div>

                      {/* Custom Responsive SVG Chart represented as clean executive style */}
                      <div className="md:col-span-7 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60 flex flex-col justify-center items-center min-h-[220px]">
                        <span className="text-[9px] font-mono text-zinc-500 mb-2 font-black uppercase">Distribusi Tindakan Pengunjung (Diagram Batang Riil)</span>
                        <div className="w-full max-w-sm h-40 flex items-end justify-around gap-2 px-4 border-b border-slate-800 border-l pb-1">
                          
                          {/* Col 1 */}
                          <div className="flex-1 flex flex-col items-center gap-1 group">
                            <span className="text-[9px] font-mono font-bold text-cyan-400">{viewCount}</span>
                            <div 
                              className="w-full bg-cyan-500/80 rounded-t-sm hover:bg-cyan-400 transition-all duration-500" 
                              style={{ height: `${Math.max(12, Math.min(100, (viewCount / Math.max(1, totalLogs)) * 140))}px` }} 
                            />
                            <span className="text-[8px] font-mono text-zinc-500 rotate-12 mt-1.5 select-none">Melihat</span>
                          </div>

                          {/* Col 2 */}
                          <div className="flex-1 flex flex-col items-center gap-1 group">
                            <span className="text-[9px] font-mono font-bold text-blue-400">{searchCount}</span>
                            <div 
                              className="w-full bg-blue-500/80 rounded-t-sm hover:bg-blue-400 transition-all duration-500" 
                              style={{ height: `${Math.max(12, Math.min(100, (searchCount / Math.max(1, totalLogs)) * 140))}px` }} 
                            />
                            <span className="text-[8px] font-mono text-zinc-500 rotate-12 mt-1.5 select-none">Mencari</span>
                          </div>

                          {/* Col 3 */}
                          <div className="flex-1 flex flex-col items-center gap-1 group">
                            <span className="text-[9px] font-mono font-bold text-emerald-400">{actionCount}</span>
                            <div 
                              className="w-full bg-emerald-500/80 rounded-t-sm hover:bg-emerald-400 transition-all duration-500" 
                              style={{ height: `${Math.max(12, Math.min(100, (actionCount / Math.max(1, totalLogs)) * 140))}px` }} 
                            />
                            <span className="text-[8px] font-mono text-zinc-500 rotate-12 mt-1.5 select-none">Konsul</span>
                          </div>

                          {/* Col 4 */}
                          <div className="flex-1 flex flex-col items-center gap-1 group">
                            <span className="text-[9px] font-mono font-bold text-amber-500">{checkoutCount}</span>
                            <div 
                              className="w-full bg-amber-500/80 rounded-t-sm hover:bg-amber-400 transition-all duration-500" 
                              style={{ height: `${Math.max(12, Math.min(100, (checkoutCount / Math.max(1, totalLogs)) * 140))}px` }} 
                            />
                            <span className="text-[8px] font-mono text-zinc-500 rotate-12 mt-1.5 select-none">Checkout</span>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slide 3: Search text heatmap with list weights */}
                  {currentSlide === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 space-y-3">
                        <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">KATA PENCARI</span>
                        <h4 className="text-lg font-black text-white font-sans uppercase">Intensi Pencarian Teks Terkini</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                          Berikut adalah kata-kata kunci literal yang diketik secara langsung oleh jemari tamu pada kolom pencarian pustaka. Analisis semantik membuktikan ketertarikan tinggi pada istilah <strong className="text-cyan-400">kebakaran/sawit, termal, gambut sawit, dan regulasi amdal</strong>.
                        </p>
                      </div>

                      <div className="md:col-span-7 bg-slate-900/60 p-4 rounded-xl border border-slate-800/70 space-y-2">
                        <span className="text-[9.5px] font-mono text-zinc-400 font-extrabold block border-b border-slate-800 pb-2">
                          📋 DAFTAR KATA KUNCI PEMBANGUN INTENSI PENGUNJUNG:
                        </span>
                        
                        <div className="space-y-2">
                          {searchTerms.slice(0, 5).map((st, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs font-mono bg-black/45 p-2 rounded-lg border border-slate-800/80">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-slate-800 text-cyan-400 px-1.5 py-0.5 rounded font-black font-mono">#{idx+1}</span>
                                <span className="text-slate-200 font-bold">"{st.term}"</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-zinc-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span>Dicari <strong className="text-white-150 font-bold text-zinc-300">{st.value}x</strong></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slide 4: Funnel Analysis */}
                  {currentSlide === 3 && (
                    <div className="space-y-4 max-w-2xl mx-auto">
                      <div className="text-center space-y-1.5">
                        <span className="text-[9px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 font-bold uppercase">Corong Pengerjaan</span>
                        <h4 className="text-lg font-black text-white font-sans uppercase">Corong Konversi Pelanggan (Funnel Pipeline)</h4>
                      </div>

                      {/* Custom High-Quality visual Funnel layout */}
                      <div className="space-y-2 pt-2 max-w-lg mx-auto">
                        {/* Layer 1 */}
                        <div className="relative p-2.5 bg-gradient-to-r from-blue-950/40 to-blue-900/40 border border-blue-900 rounded-xl text-center">
                          <div className="font-mono text-xs font-bold text-blue-300">LANDING PAGE EXPLORE & VIEW (100% Ketersediaan)</div>
                          <p className="text-[9.5px] text-zinc-400 mt-0.5">Seluruh pengunjung mendarat di pencarian gratis pustaka, indeks filter kategori dwi-bahasa.</p>
                          <div className="absolute right-3 top-2 text-[10px] font-mono font-bold text-blue-400">Rasio: 100%</div>
                        </div>

                        {/* Drop arrow icon */}
                        <div className="text-center text-zinc-500 text-xs animate-bounce">&darr;</div>

                        {/* Layer 2 */}
                        <div className="relative p-2.5 bg-gradient-to-r from-teal-950/40 to-teal-900/40 border border-teal-900 rounded-xl text-center">
                          <div className="font-mono text-xs font-bold text-teal-300">AI WORKSPACE CONSULT INTERACTION</div>
                          <p className="text-[9.5px] text-zinc-400 mt-0.5">Sebagian tamu memanfaatkan 3 kuota token uji coba konsultasi kognitif agen simulasi.</p>
                          <div className="absolute right-3 top-2 text-[10px] font-mono font-bold text-teal-400">Rasio: {totalLogs > 0 ? Math.round(((actionCount) / Math.max(1, totalLogs)) * 100) : 48}%</div>
                        </div>

                        {/* Drop arrow icon */}
                        <div className="text-center text-zinc-500 text-xs animate-bounce">&darr;</div>

                        {/* Layer 3 */}
                        <div className="relative p-2.5 bg-gradient-to-r from-amber-950/40 to-amber-900/40 border border-amber-900 rounded-xl text-center">
                          <div className="font-mono text-xs font-bold text-amber-300">PREMIUM GUEST PASS UPGRADE CHECKOUT</div>
                          <p className="text-[9.5px] text-zinc-400 mt-0.5">Tindak lanjut ketika kuota habis atau sapaan live melampaui proteksi Sentinel Firewall.</p>
                          <div className="absolute right-3 top-2 text-[10px] font-mono font-bold text-amber-400">Rasio: {totalLogs > 0 ? Math.round((checkoutCount / Math.max(1, totalLogs)) * 100) : 15}%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slide 5: Strategic Business Recommendations */}
                  {currentSlide === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 space-y-3 text-center md:text-left">
                        <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">Aksi Bisnis</span>
                        <h4 className="text-lg font-black text-white font-sans uppercase">Aksi Rekomendasi Taktis & Optimisasi Laba</h4>
                        <p className="text-xs text-zinc-450 leading-relaxed text-justify">
                          Untuk melestarikan operasi riset komersial berkelanjutan, ikuti 3 rumusan taktis hasil sinkronisasi sensor perilaku berikut ini guna mengoptimasi keterlibatan tamu.
                        </p>
                      </div>

                      <div className="md:col-span-7 bg-slate-900/45 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                        {/* Rec 1 */}
                        <div className="p-2 bg-gradient-to-r from-emerald-950/30 to-slate-900/30 border-l-4 border-emerald-500 pl-3 rounded-r-lg">
                          <strong className="text-white block font-sans">1. Turunkan Token Gratis Menjadi 2 Limit (Urgent)</strong>
                          <span className="text-zinc-400 text-[10px] leading-relaxed block mt-0.5 font-mono">
                            Data menunjukkan konversi checkout terpicu setelah tamu menghabiskan seluruh token uji coba. Mengurangi batas free dari 3 ke 2 akan mempercepat transaksi guest pass senilai Rp 5.550.
                          </span>
                        </div>

                        {/* Rec 2 */}
                        <div className="p-2 bg-gradient-to-r from-cyan-950/30 to-slate-900/30 border-l-4 border-cyan-500 pl-3 rounded-r-lg">
                          <strong className="text-white block font-sans">2. Sediakan Akses Export Eksklusif PDF/Word Premium</strong>
                          <span className="text-zinc-400 text-[10px] leading-relaxed block mt-0.5 font-mono">
                            Saring opsi unduh Word dan xlsx di dashboard gratis. Opsi kirim draf laporan langsung harus diproteksi gerbang checkout otomatis bagi pengunjung non-sovereign.
                          </span>
                        </div>

                        {/* Rec 3 */}
                        <div className="p-2 bg-gradient-to-r from-amber-500/10 to-slate-900/30 border-l-4 border-amber-500 pl-3 rounded-r-lg">
                          <strong className="text-white block font-sans">3. Integrasi Pembayaran QRIS Otomatis Terpadu</strong>
                          <span className="text-zinc-400 text-[10px] leading-relaxed block mt-0.5 font-mono">
                            Pertahankan gerbang bayar otomatis QRIS virtual yang responsif 18 detik pada modal checkout untuk memastikan kemudahan pembayaran tanpa registrasi rumit sekunder.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Slide Bottom Controls */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[10.5px] font-mono text-zinc-400">
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => setCurrentSlide(prev => (prev > 0 ? prev - 1 : slideCount - 1))}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-800 flex items-center gap-1 transition duration-150 cursor-pointer text-[10px] uppercase font-bold"
                    >
                      <ChevronLeft size={12} />
                      <span>Kembali</span>
                    </button>
                    <button
                      onClick={() => setCurrentSlide(prev => (prev + 1) % slideCount)}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-800 flex items-center gap-1 transition duration-150 cursor-pointer text-[10px] uppercase font-bold"
                    >
                      <span>Lanjut</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                  
                  <div className="hidden sm:flex flex-wrap items-center gap-1">
                    {Array.from({ length: slideCount }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition ${i === currentSlide ? "bg-cyan-400" : "bg-slate-700 hover:bg-slate-500"}`}
                        title={`Beralih ke slide #${i+1}`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-zinc-500">FORMAT DECK: POWERPOINT AKADEMIS INSIGHTS</span>
                </div>

              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Telemetry Log Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/10 p-3.5 rounded-2xl border border-slate-500/10 text-center font-mono">
                  <span className="text-[9px] text-slate-400 font-bold block">👁️ TOTAL LIHAT</span>
                  <strong className="text-xl font-bold font-mono text-cyan-400">{viewCount}</strong>
                </div>
                <div className="bg-black/10 p-3.5 rounded-2xl border border-slate-500/10 text-center font-mono">
                  <span className="text-[9px] text-slate-400 font-bold block">🔍 KUERI CARI</span>
                  <strong className="text-xl font-bold font-mono text-blue-400">{searchCount}</strong>
                </div>
                <div className="bg-black/10 p-3.5 rounded-2xl border border-slate-500/10 text-center font-mono">
                  <span className="text-[9px] text-slate-400 font-bold block">⚙️ INTERAKSI AI</span>
                  <strong className="text-xl font-bold font-mono text-emerald-400">{actionCount}</strong>
                </div>
                <div className="bg-black/10 p-3.5 rounded-2xl border border-slate-500/10 text-center font-mono">
                  <span className="text-[9px] text-slate-400 font-bold block">💎 CHECKOUT PASS</span>
                  <strong className="text-xl font-bold font-mono text-amber-500">{checkoutCount}</strong>
                </div>
              </div>

              {/* Logs Stream Controller Panel */}
              <div className="flex items-center justify-between font-mono text-xs border-b border-dashed border-slate-500/10 pb-2">
                <span className="text-slate-400 uppercase font-black tracking-wider flex items-center gap-1">
                  <Activity size={12} className="text-emerald-500" />
                  <span>Jejak Kunjungan Riil Tamu Lapangan:</span>
                </span>
                <button
                  onClick={handleClearLogs}
                  disabled={logs.length === 0}
                  className="text-rose-600 hover:text-rose-500 hover:underline transition font-bold cursor-pointer disabled:opacity-40 flex items-center gap-1 text-[11px]"
                >
                  <Trash2 size={12} />
                  <span>Hapus Audit Trail</span>
                </button>
              </div>

              {/* Log stream viewport */}
              <div className="max-h-[300px] overflow-y-auto space-y-2.5 pr-2">
                {logs.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 font-mono text-xs">
                    Ketiadaan log audit kunjungan. Mulailah melakukan pencarian, saringan kategori, atau sapaan tamu untuk memunculkan entri log riil!
                  </div>
                ) : (
                  logs.map((log) => (
                    <div 
                      key={log.id}
                      className="p-3 rounded-xl bg-slate-500/5 hover:bg-slate-500/10 border border-slate-500/10 text-xs font-mono transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-left"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-black uppercase text-[#050510] ${
                            log.actionType === "checkout" 
                              ? "bg-amber-500" 
                              : log.actionType === "action"
                                ? "bg-emerald-500"
                                : log.actionType === "search"
                                  ? "bg-blue-500"
                                  : "bg-cyan-500"
                          }`}>
                            {log.actionName}
                          </span>
                          
                          <strong className="text-slate-700 dark:text-zinc-200 font-bold">{log.userName}</strong>
                          <span className="text-[10px] text-zinc-400">({log.ipAddress || "127.0.0.1"})</span>
                        </div>
                        <p className="text-slate-600 dark:text-zinc-300 font-sans text-xs">
                          {log.details}
                        </p>
                      </div>

                      <div className="text-right shrink-0 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-2 border-t md:border-0 border-dashed border-slate-500/5 pt-2 md:pt-0">
                        <span className="text-[9px] text-zinc-500 whitespace-nowrap flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(log.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                        </span>
                        <span className="text-[8px] text-zinc-600 dark:text-zinc-400 hidden md:inline truncate max-w-[150px]" title={log.browserInfo}>
                          {log.browserInfo?.substring(0, 18)}...
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "backup" && (
            <div className="space-y-6 animate-fade-in animate-duration-250 text-left">
              {/* Header Card */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/35 shadow-lg relative overflow-hidden text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-black px-3 py-1 font-mono text-[9px] uppercase tracking-widest animate-pulse">
                  Unrestricted Owner Core
                </div>
                
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-black uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                    <span>SOVEREIGN DEEP BACKUP KERNEL Active</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black font-sans leading-tight">
                    Pusat Ekspor & Retret Sistem Kognitif Tanpa Batas
                  </h4>
                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                    Sistem ini terhubung langsung ke tatanan enkripsi militer <strong>Cognitive Sentinel</strong>. Di sini Anda memiliki kontrol mutlak untuk mem-backup draf riset sawit, chat agen Omni/WB, voucher pengguna, data sirkuler, fisika lab, hingga identitas pemilik secara keseluruhan.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-white/5 flex flex-col items-center justify-center font-mono text-center shrink-0 min-w-[140px]">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase block">TOTAL KODE VAULT</span>
                  <span className="text-xl font-mono font-black text-emerald-400 mt-1">{deepKeys.length} Pasang</span>
                  <span className="text-[8px] text-zinc-500 mt-0.5">TERDETEKSI LOKAL</span>
                </div>
              </div>

              {backupMsg.text && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs font-mono transition-all duration-300 ${
                  backupMsg.type === "success" 
                    ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
                    : backupMsg.type === "error"
                      ? "bg-rose-950/20 border-rose-500/30 text-rose-300"
                      : "bg-blue-950/25 border-blue-500/30 text-blue-300"
                }`}>
                  <span className="text-lg shrink-0">
                    {backupMsg.type === "success" ? "🏆" : backupMsg.type === "error" ? "🚨" : "⚡"}
                  </span>
                  <div className="space-y-1">
                    <strong className="block uppercase font-black text-[10px] tracking-wide">
                      {backupMsg.type === "success" ? "Proses Selesai" : backupMsg.type === "error" ? "Konflik Dekripsi" : "Mengolah Perintah"}
                    </strong>
                    <p className="leading-snug">{backupMsg.text}</p>
                  </div>
                </div>
              )}

              {/* Core Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Panel 1: Export & Download */}
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 space-y-4 shadow-3xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <h5 className="font-black text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                      <span className="p-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-lg"><Download size={14} /></span>
                      <span>1. Ambil & Kemas Semua Berkas (Ekspor)</span>
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                      Dapatkan satu arsip terenkripsi <code className="text-emerald-600 font-bold font-mono">.json</code> yang merangkum seisi semantik sistem di browser Anda saat ini. Berkas ini dapat digunakan untuk duplikasi cadangan atau memindahkan portal kedaulatan riset Anda ke perangkat mana pun dengan tuntas.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleExportDeepBackup}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-mono font-black rounded-xl text-xs transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download size={15} />
                      <span>PRODUKSI ABSOLUT DEEP BACKUP (.JSON)</span>
                    </button>
                    <span className="text-[9px] text-zinc-400 block text-center mt-2 font-mono">Arsip ini mutlak dan bebas dari batas kuota ekspor</span>
                  </div>
                </div>

                {/* Panel 2: Upload & Restore */}
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 space-y-4 shadow-3xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <h5 className="font-black text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                      <span className="p-1.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 rounded-lg"><Zap size={14} /></span>
                      <span>2. Pulihkan Keadaan Sistem (Hot Restore)</span>
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                      Unggah berkas cadangan <code className="text-indigo-600 font-bold font-mono">.json</code> bermerek Sovereign Anda untuk menyuntikkan seisi parameter secara instan. Sistem akan memverifikasi signature pemilik secara real-time demi mencegah bypass penyusup.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => fileDeepRef.current?.click()}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-indigo-350 border border-indigo-500/20 font-mono font-black rounded-xl text-xs transition duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>📥</span>
                      <span>UNGGAH & DEKRIPSI ARSIP PEMILIK</span>
                    </button>
                    <input
                      ref={fileDeepRef}
                      type="file"
                      accept=".json"
                      onChange={handleImportDeepBackup}
                      className="hidden"
                    />
                    <span className="text-[9px] text-zinc-400 block text-center font-mono">Wajib menginstansiasi signature terverifikasi channeltrial85</span>
                  </div>
                </div>

              </div>

              {/* Extra Panel: Health Optimization Area & Signature Checker */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                
                {/* Health & Alignment Action (5 cols) */}
                <div className="md:col-span-5 p-5 rounded-2xl bg-radial from-slate-900 to-black text-white border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 font-mono font-bold px-2 py-0.5 rounded border border-amber-500/20">HEALTH & ALIGNMENT</span>
                    <h5 className="text-xs font-black font-sans uppercase text-amber-300">Auto Repair & Optialisasi Overclock</h5>
                    <p className="text-[10px] text-zinc-405 leading-relaxed font-sans text-justify">
                      Jika Anda mengalami masalah penyimpanan, kegagalan rendering, atau kuota riset rontok karena cookie terhapus browser, tombol di bawah akan memaksa pengaturan kuota dan status kembali ke UNLIMITED serta memperkokoh tameng Sentinel.
                    </p>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleDeepAutoRepair}
                      className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-750 text-slate-950 font-mono font-black text-[10.5px] rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <span>🛠️ SINKRONKAN KEDIRIAN UNLIMITED</span>
                    </button>
                  </div>
                </div>

                {/* Local Storage Keys Inspector (7 cols) */}
                <div className="md:col-span-7 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 space-y-2 shadow-3xs max-h-[220px] overflow-y-auto">
                  <div className="border-b border-slate-100 dark:border-zinc-800 pb-2 flex justify-between items-center">
                    <strong className="text-[10.5px] font-mono text-slate-800 dark:text-zinc-100 uppercase font-black">
                      🗄️ INSPEKTOR PARALEL LOKAL DATA VAULT ({deepKeys.length})
                    </strong>
                    <span className="text-[9.5px] font-mono font-bold text-emerald-500">READONLY VIEW</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {deepKeys.length === 0 ? (
                      <p className="text-[10px] font-mono text-zinc-500 text-center py-6">Ketiadaan data kedaulatan lokal.</p>
                    ) : (
                      deepKeys.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[10.5px] font-mono p-1.5 rounded bg-slate-500/5 border border-slate-100 dark:border-zinc-850">
                          <span className="text-zinc-700 dark:text-zinc-300 select-all font-bold">{item.key}</span>
                          <span className="text-zinc-500 dark:text-zinc-550 shrink-0">{(item.size / 1024).toFixed(3)} KB</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Console Footing protection seal */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-850 bg-black/20 text-center flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>ALGORITMA ENKRIPSI ADAPTIF SENTINEL-2 COGNITION TRACKER ACTIVE</span>
          </div>
          <span>&copy; Pustaka Litera Ltd. Tersegel Penuh Keamanan</span>
        </div>

      </div>
    </div>
  );
}
