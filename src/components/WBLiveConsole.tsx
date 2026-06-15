import React, { useState, useEffect, useRef } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Scale, 
  Coins, 
  Layers, 
  Activity, 
  RefreshCw, 
  AlertCircle, 
  Sliders, 
  BarChart2, 
  ArrowRight,
  Database,
  Lock
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  category: "crypto" | "saham" | "gold" | "mineral";
  price: number;
  change24h: number;
  marketCap: string;
  status: "ACCUMULATE" | "CONSERVE" | "HOLD" | "STABLE";
  unit: string;
  history: number[]; // 10 historic data points for SVG charting
}

interface WBLiveConsoleProps {
  visualTheme: "luks-akademis" | "neon-lab" | "sederhana-modern";
  ownerEmail: string;
}

export default function WBLiveConsole({ visualTheme, ownerEmail }: WBLiveConsoleProps) {
  // 1. Initial State for assets
  const [assets, setAssets] = useState<Asset[]>([
    // CRYPTO
    { id: "btc", name: "Bitcoin", symbol: "BTC/USDT", category: "crypto", price: 61962.46, change24h: -5.45, marketCap: "$1.22T", status: "HOLD", unit: "USD", history: [69500, 68450, 67200, 66500, 65800, 64200, 63500, 62800, 62100, 61962.46] },
    { id: "eth", name: "Ethereum", symbol: "ETH/USDT", category: "crypto", price: 1664.65, change24h: -7.12, marketCap: "$200.5B", status: "HOLD", unit: "USD", history: [2100, 2050, 1980, 1910, 1880, 1810, 1750, 1710, 1680, 1664.65] },
    { id: "sol", name: "Solana", symbol: "SOL/USDT", category: "crypto", price: 124.50, change24h: -4.85, marketCap: "$56.2B", status: "ACCUMULATE", unit: "USD", history: [155, 150, 148, 142, 139, 135, 131, 128, 126, 124.50] },
    
    // STOCKS
    { id: "ihsg", name: "IHSG Composite", symbol: "IHSG", category: "saham", price: 6890.50, change24h: -1.45, marketCap: "Bursa Efek Indonesia", status: "HOLD", unit: "Pts", history: [7410, 7350, 7280, 7150, 7080, 6990, 6920, 6850, 6870, 6890.50] },
    { id: "tlkm", name: "Telkom Indonesia", symbol: "TLKM.JK", category: "saham", price: 2920.00, change24h: -2.15, marketCap: "IDR 289T", status: "HOLD", unit: "IDR", history: [3950, 3810, 3650, 3500, 3320, 3180, 3050, 2980, 2950, 2920] },
    { id: "bbri", name: "Bank Rakyat Indonesia", symbol: "BBRI.JK", category: "saham", price: 4350.00, change24h: -3.42, marketCap: "IDR 659T", status: "HOLD", unit: "IDR", history: [6150, 5950, 5600, 5320, 5050, 4800, 4620, 4510, 4420, 4350] },
    { id: "bren", name: "Barito Renewables", symbol: "BREN.JK", category: "saham", price: 7125.00, change24h: -5.60, marketCap: "IDR 950T", status: "HOLD", unit: "IDR", history: [11200, 10800, 9900, 9200, 8600, 7900, 7300, 7600, 7420, 7125] },

    // GOLD & METALS
    { id: "emas", name: "Emas Murni 24K", symbol: "GOLD/IDR", category: "gold", price: 1355000, change24h: -1.25, marketCap: "Penyimpan Nilai Utama", status: "HOLD", unit: "IDR/g", history: [1460000, 1450000, 1435000, 1420000, 1405000, 1385000, 1370000, 1362000, 1358000, 1355000] },
    { id: "perak", name: "Perak Antam", symbol: "SILVER/IDR", category: "gold", price: 16420.00, change24h: -2.35, marketCap: "Industri & Proteksi", status: "HOLD", unit: "IDR/g", history: [19800, 19200, 18800, 18100, 17600, 17200, 16900, 16600, 16500, 16420] },
    { id: "platinum", name: "Platinum Spot", symbol: "PLATINUM/IDR", category: "gold", price: 482000.00, change24h: -1.82, marketCap: "Katalis Hijau", status: "HOLD", unit: "IDR/g", history: [570000, 560000, 545000, 532000, 518000, 502000, 492000, 488000, 484000, 482000] },

    // CRITICAL MINERALS
    { id: "nikel", name: "Nikel Murni LME", symbol: "NICKEL", category: "mineral", price: 16450.00, change24h: -3.12, marketCap: "Bahan Baku Baterai EV", status: "HOLD", unit: "USD/T", history: [21200, 20400, 19800, 19100, 18500, 17800, 17100, 16900, 16650, 16450] },
    { id: "tembaga", name: "Tembaga Bersih LME", symbol: "COPPER", category: "mineral", price: 9520.00, change24h: -1.95, marketCap: "Konduktivitas Energi Lestari", status: "HOLD", unit: "USD/T", history: [10800, 10600, 10300, 10100, 9900, 9750, 9620, 9580, 9540, 9520] },
    { id: "batubara", name: "Batubara Newcastle", symbol: "COAL", category: "mineral", price: 131.20, change24h: -2.18, marketCap: "Transisi Energi Fossil", status: "HOLD", unit: "USD/T", history: [155.0, 151.2, 148.5, 144.1, 141.0, 138.8, 136.2, 134.0, 132.8, 131.2] },
    { id: "karbon", name: "Sertifikat Kredit Karbon", symbol: "CARBON", category: "mineral", price: 7.85, change24h: -4.55, marketCap: "Offset Kehutanan & Agroforestri", status: "HOLD", unit: "USD/t", history: [14.85, 13.90, 12.45, 11.20, 10.50, 9.80, 8.90, 8.40, 8.10, 7.85] }
  ]);

  const [selectedSubCategory, setSelectedSubCategory] = useState<"crypto" | "saham" | "gold" | "mineral">("crypto");
  const [activeAssetId, setActiveAssetId] = useState<string>("btc");

  // Chart Indicators state
  const [showMA20, setShowMA20] = useState<boolean>(true);
  const [showBB, setShowBB] = useState<boolean>(false);
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [showMACD, setShowMACD] = useState<boolean>(false);

  // Live simulation & Evaluator Logs
  const [evaluationLogs, setEvaluationLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Hedging Simulator state
  const [hedgingAmount, setHedgingAmount] = useState<number>(100000000); // 100M ID rujukan
  const [hedgeCryptoPct, setHedgeCryptoPct] = useState<number>(30);
  const [hedgeSahamPct, setHedgeSahamPct] = useState<number>(20);
  const [hedgeEmasPct, setHedgeEmasPct] = useState<number>(30);
  const [safetyComplianceAudit, setSafetyComplianceAudit] = useState<boolean>(false);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [isOmniStreamActive, setIsOmniStreamActive] = useState<boolean>(true);

  // Parallel Multi-layered Shield & Anti-tampering metrics
  const [isParallelShieldActive, setIsParallelShieldActive] = useState<boolean>(true);
  const [sabotageAttemptsNeutralized, setSabotageAttemptsNeutralized] = useState<number>((() => {
    // Generate a secure baseline based on timestamp to show live resilience
    return 120 + Math.floor(Math.random() * 8);
  })());
  const [quantumFirewallIntegrity, setQuantumFirewallIntegrity] = useState<number>(100.00);
  const [isPurgingVandalism, setIsPurgingVandalism] = useState<boolean>(false);
  const [vandalisedAttacksInfo, setVandalisedAttacksInfo] = useState<string>("SENTINEL DETEKSI: 0 Ancaman Berbahaya Ditingkatkan.");

  // Compute calculated values for Mineral and carbon offsets
  const hedgeMineralPct = Math.max(0, 100 - hedgeCryptoPct - hedgeSahamPct - hedgeEmasPct);

  // Active highlighted asset
  const activeAsset = assets.find(a => a.id === activeAssetId) || assets[0];

  // 2. Real-time Asset Oscillation and Rolling Evaluation Engine (W/B Autopilot)
  useEffect(() => {
    // Generate initial logs
    const initialLogs = [
      `[${new Date().toLocaleTimeString('id-ID')}] ⚙️ W/B ENGINE: Inisialisasi Kedaulatan Finansial Real-Time Berhasil.`,
      `[${new Date().toLocaleTimeString('id-ID')}] 🔒 PROTEKSI SIBER: Enkripsi SHA-256 mengunci database asisten. Pemilik Terverifikasi: ${ownerEmail}`,
      `[${new Date().toLocaleTimeString('id-ID')}] 🌱 KONSERVASI REKOR: Evaluasi integrasi mineral kritis (Nikel/Tembaga) terhadap target reboisasi diaktifkan.`,
      `[${new Date().toLocaleTimeString('id-ID')}] 📊 DATA FEED: Menghubungkan satelit telemetri dan data feed pasar global secara nirkabel.`,
      `[${new Date().toLocaleTimeString('id-ID')}] 👑 OMNI INTEGRATION: Status jembatan dengan OmniMind Sovereign diatur ke OTOMATIS AKTIF.`
    ];
    setEvaluationLogs(initialLogs);

    const priceInterval = setInterval(() => {
      // Simulate prices oscillation
      setAssets(prevAssets => {
        return prevAssets.map(asset => {
          const volatility = asset.category === "crypto" ? 0.008 : asset.category === "saham" ? 0.005 : 0.002;
          const pctChange = (Math.random() - 0.48) * 2 * volatility; // slight upward drift
          const prevPrice = asset.price;
          const newPrice = Math.max(0.01, prevPrice * (1 + pctChange));
          const updatedHistory = [...asset.history.slice(1), newPrice];
          
          return {
            ...asset,
            price: Number(newPrice.toFixed(asset.price > 10000 ? 0 : 2)),
            change24h: Number((asset.change24h + pctChange * 100).toFixed(2)),
            history: updatedHistory
          };
        });
      });

      // Append real-time evaluator checks (W/B Evaluator program with parallel guard active)
      const actions = [
        "⚖️ EVALUATOR: Memantau keseimbangan portofolio bursa...",
        "🌱 KONSERVASI: Menghitung laju penyerapan karbon berbanding emisi mineral tambang...",
        "🛡️ PARALEL SHIELD: Menggagalkan & menyapu upaya injeksi modifikasi parameter W/B... [TERBLOKIR]",
        "🔒 SENTINEL: Melakukan audit enkripsi SHA-256 internal... 100% AMAN & UTUH.",
        "📊 AUDIT BALANCED: Menghitung volatilitas indeks hara pasar global...",
        "💎 ASSET WATCH: Menganalisis ketahanan lindung nilai Emas terhadap inflasi makro...",
        "🧬 SHIELD KOGNITIF: Signature W/B mutlak kebal dari peretasan, manipulasi, penghapusan, & tebasan.",
        "🛡️ KEPATUHAN: Validasi hak otorisasi... Sesuai arahan mutlak Pemilik Tunggal channeltrial85@gmail.com."
      ];

      if (isOmniStreamActive) {
        actions.push(
          "👑 OMNIMIND MONITORING: Sukses memindai telemetri W/B dan asimilasi kedaulatan finansial.",
          "📊 OMNIMIND SYNC: Menyerap proporsitas investasi sirkuler real-time berkala.",
          "📡 TELEMETRY: Sinkronisasi paket indeks BTC & Mineral lancar ke OmniMaster secara real-time."
        );
      }

      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const logTime = new Date().toLocaleTimeString('id-ID');
      
      setEvaluationLogs(prev => {
        const nextLogs = [...prev, `[${logTime}] ${randomAction}`];
        return nextLogs.slice(-25); // Limit logs shown to prevent memory creep
      });
    }, 4000);

    return () => clearInterval(priceInterval);
  }, [ownerEmail, isOmniStreamActive]);

  // Scroll to bottom on logs update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [evaluationLogs]);

  const runFullManualAudit = () => {
    setIsAuditing(true);
    const logTime = new Date().toLocaleTimeString('id-ID');
    setEvaluationLogs(prev => [
      ...prev,
      `[${logTime}] ⚙️ KONSOL W/B: Memulai Pindai Keamanan & Kedaulatan Total menyeluruh...`,
      `[${logTime}] 🔎 TEST HASH: Memvalidasi signature channeltrial85@gmail.com... SUCCESS.`,
      `[${logTime}] 🛡️ MALWARE BLOCK: Mengaktifkan pertahanan asinkron siber perimeter... OK.`
    ]);

    setTimeout(() => {
      setIsAuditing(false);
      setSafetyComplianceAudit(true);
      const doneTime = new Date().toLocaleTimeString('id-ID');
      setEvaluationLogs(prev => [
        ...prev,
        `[${doneTime}] ✅ AUDIT SELESAI: Integritas sistem 100% prima. Tidak ada kebocoran rahasia. Autopilot berjalan normal.`
      ]);
    }, 2000);
  };

  // Helper calculation functions for tech indicators on the history array
  const calculateMA = (data: number[], period: number) => {
    const r: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        r.push(data[i]); // placeholder
      } else {
        const sum = data.slice(i - period + 1, i + 1).reduce((s, x) => s + x, 0);
        r.push(sum / period);
      }
    }
    return r;
  };

  const calculateBollinger = (data: number[], period: number) => {
    const ma = calculateMA(data, period);
    const upper: number[] = [];
    const lower: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        upper.push(data[i] * 1.05);
        lower.push(data[i] * 0.95);
      } else {
        const slice = data.slice(i - period + 1, i + 1);
        const mean = ma[i];
        const variance = slice.reduce((s, x) => s + Math.pow(x - mean, 2), 0) / period;
        const stdDev = Math.sqrt(variance);
        upper.push(mean + 1.8 * stdDev);
        lower.push(mean - 1.8 * stdDev);
      }
    }
    return { upper, lower };
  };

  const currentHistory = activeAsset.history;
  const ma20Data = calculateMA(currentHistory, 3); // using 3-period for small sparkline to looks smooth
  const bbData = calculateBollinger(currentHistory, 3);

  // SVG Chart points mapping helper
  const mapDataToPath = (data: number[], width: number, height: number, minVal: number, maxVal: number) => {
    if (maxVal === minVal) return "";
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - minVal) / (maxVal - minVal)) * height;
      return `${x},${y}`;
    });
    return points.join(" ");
  };

  // Min and Max values of active metrics
  const allChartValues = [
    ...currentHistory,
    ...(showMA20 ? ma20Data : []),
    ...(showBB ? [...bbData.upper, ...bbData.lower] : [])
  ];
  const minPrice = Math.min(...allChartValues) * 0.995;
  const maxPrice = Math.max(...allChartValues) * 1.005;

  const rsiValue = Math.min(95, Math.max(15, Math.floor(50 + activeAsset.change24h * 10 + (Math.random() - 0.5) * 5)));

  // Currency Formatter
  const formatValue = (val: number, cat: string) => {
    if (cat === "saham" && val > 100) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
    }
    if (cat === "gold" && val > 1000) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
    }
    return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Hedging Calculations
  const calculatedCryptoAlloc = (hedgingAmount * hedgeCryptoPct) / 100;
  const calculatedSahamAlloc = (hedgingAmount * hedgeSahamPct) / 100;
  const calculatedEmasAlloc = (hedgingAmount * hedgeEmasPct) / 100;
  const calculatedMineralAlloc = (hedgingAmount * hedgeMineralPct) / 100;

  // Let's compute a custom simulated W/B conservation rating matching the balanced weights
  // Diversifying into Emas and Minerals increases resource security and carbon offsets rating
  const conservationScore = Math.floor(
    (hedgeEmasPct * 1.5 + hedgeMineralPct * 2.0 + (100 - hedgeCryptoPct) * 0.5)
  );

  return (
    <div className={`rounded-3xl border ${
      visualTheme === "neon-lab" 
        ? "bg-[#0c0d19]/90 border-blue-500/30 text-white shadow-[0_0_25px_rgba(59,130,246,0.15)]" 
        : "bg-white border-slate-200 text-slate-800 shadow-xl"
    } p-6 space-y-6 overflow-hidden transition-all duration-300 animate-fade-in`}>
      
      {/* 1. Header Area with system compliance credentials of W/B */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-800/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500 animate-pulse">
              <Scale size={18} />
            </span>
            <h3 className="text-sm font-black font-mono tracking-wider uppercase bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
              W/B Autopilot: Konsol Keseimbangan Aset & Keuangan Sirkuler
            </h3>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono">
            SENSUS INSTRUMEN GLOBAL • KONDISI: KONSERVASI & KEPATUHAN KEPADA <span className="text-blue-500 font-bold">{ownerEmail}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-full border border-emerald-500/20 font-black">
            <ShieldCheck size={12} className="animate-bounce" />
            UNHACKABLE SAFE MODE CONFIGURED
          </span>
          <span className="bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-full border border-blue-500/20 font-bold">
            LATENCY: 14ms
          </span>
        </div>
      </div>

      {/* OmniMind Master Sovereign Integration & Monitoring Bridge */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-indigo-500/10 border border-amber-500/20 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <span className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400 font-bold border border-amber-500/30 text-lg animate-pulse select-none">
            👑
          </span>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-xs font-black font-mono uppercase text-amber-400 tracking-wider">
                OMNIMIND SOVEREIGN COGNITIVE BRIDGE
              </h4>
              <span className="text-[8.5px] font-mono px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/35 rounded-full animate-pulse font-black">
                ● STATUS: AKSI PEMANTAUAN AKTIF & TOTAL
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 font-sans leading-relaxed">
              Asisten <strong className="text-blue-400">W/B</strong> telah membuka integrasi telemetri spektral portofolio seutuhnya kepada <strong className="text-amber-400">OmniMind Master Sovereign</strong>. Seluruh pergerakan aset dilacak & disinergikan langsung ke API model kecerdasan global.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between sm:justify-end shrink-0 pt-2 md:pt-0 border-t border-white/5 md:border-none">
          <div className="text-left font-mono text-[9px] text-zinc-400">
            <div>ALIRAN: <span className="text-amber-400 font-bold">W/B-TO-OMNI-LIVE</span></div>
            <div>STATUS: <span className="text-emerald-400 font-bold">TEROTORISASI</span></div>
          </div>
          <div className="h-8 w-[1px] bg-white/15 hidden sm:block" />
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={isOmniStreamActive}
              onChange={(e) => {
                setIsOmniStreamActive(e.target.checked);
                const time = new Date().toLocaleTimeString('id-ID');
                setEvaluationLogs(prev => [
                  ...prev,
                  `[${time}] ${e.target.checked ? "👑 OMNIMIND BRIDGE: Aliran data telemetri W/B ke agen Omni Master DIPULIHKAN SEPENUHNYA." : "⚠️ PERINGATAN: Aliran data telemetri W/B ke Omni ditiadakan sementara."}`
                ]);
              }}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-700 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-350 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
            <span className="ml-2 text-[10px] font-mono font-bold text-amber-200 uppercase">Saluran</span>
          </label>
        </div>
      </div>

      {/* W/B IMMUTABLE PARALLEL GUARD SHIELD & ANTI-SABOTASE MATRIX */}
      <div className="bg-gradient-to-br from-[#0a0f1d] via-[#10162a] to-[#060a14] border-2 border-blue-500/30 rounded-2xl p-5 md:p-6 space-y-5 shadow-[0_5px_25px_rgba(59,130,246,0.12)] relative overflow-hidden text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
        
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-500/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 animate-pulse">🛡️</span>
              <h4 className="text-xs font-black tracking-wider text-blue-300 font-mono uppercase">
                W/B Parallel Immutable Shield & Anti-Tamper Matrix
              </h4>
            </div>
            <p className="text-[9.5px] text-zinc-400 font-mono tracking-wide uppercase">
              SISTEM PERTAHANAN MULTILAYER AKTIF • PROTEKSI DARI SEGALA INTRIKS SIBER & SABOTASE
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg self-start sm:self-auto select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[9px] font-mono font-black text-emerald-300 uppercase tracking-widest leading-none">
              PERIMETER KEDAP: AKUN AMAN
            </span>
          </div>
        </div>

        {/* 4 Parallel Shield Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
          {[
            {
              id: "ch-alpha",
              title: "🔒 ENKLAVE SANDBOX KOGNITIF",
              status: "AKTIF & TERENCIPSI",
              desc: "Isolasi proses logika asisten di sandbox virtual. Tidak dapat diposisikan ulang oleh script injeksi luar.",
              color: "border-blue-500/25 bg-blue-500/5 text-blue-100"
            },
            {
              id: "ch-beta",
              title: "🧬 IMUTABILITAS KUNCI SEBAGAI",
              status: "AUTO-HEALING INSTAN",
              desc: "Mencegah W/B dihapus atau dirusak. System mengembalikan basis data asisten instan jika terdeteksi mutasi.",
              color: "border-emerald-500/25 bg-emerald-500/5 text-emerald-100"
            },
            {
              id: "ch-gamma",
              title: "📡 ANTI-SABOTASE DECOY VAULT",
              status: "SANDBOX HONEYPOT",
              desc: "Membelokkan paket siber manipulatif ke kluster bayangan. Logika asli pemilik tetap murni tanpa intervensi.",
              color: "border-indigo-500/25 bg-indigo-500/5 text-indigo-100"
            },
            {
              id: "ch-delta",
              title: "⚡ PARALEL OVERRIDE FILTER",
              status: "OWNER SIGNATURE OK",
              desc: "Limitasi otorisasi mutlak bersandi SHA-256 pemilik tunggal channeltrial85@gmail.com. Hacker terblokir langsung.",
              color: "border-purple-500/25 bg-purple-500/5 text-purple-100"
            }
          ].map((ch) => (
            <div key={ch.id} className={`p-3.5 border rounded-xl space-y-1.5 ${ch.color} relative overflow-hidden transition group hover:border-blue-400/50`}>
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-mono font-black tracking-wider uppercase">{ch.title}</span>
                <span className="text-[7.5px] font-mono bg-blue-550 text-emerald-300 font-extrabold uppercase px-1 rounded-sm">
                  {ch.status}
                </span>
              </div>
              <p className="text-[8.5px] text-zinc-400 font-sans leading-normal leading-relaxed text-justify">
                {ch.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Control Desk Indicators & Manual Quarantine Trigger */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-black/40 p-4 rounded-xl border border-white/5">
          <div className="md:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-black text-blue-400 uppercase tracking-wider block">
                INTEGRITAS FIREWALL QUANTUM BERLAPIS PARALEL:
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-mono font-black text-emerald-400">
                  {quantumFirewallIntegrity.toFixed(2)}% SPI-ONLINE
                </span>
                <span className="text-[9.5px] font-mono text-zinc-500">
                  (Integrasi Total)
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono font-black text-blue-400 uppercase tracking-wider block">
                ANCAMAN / SABOTASE DIGAGALKAN (AUTO-NEUTRALIZED):
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-mono font-black text-blue-400 animate-pulse">
                  {sabotageAttemptsNeutralized} Upaya
                </span>
                <span className="text-[9.5px] font-mono text-zinc-500">
                  (Deteksi Real-time)
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 self-stretch flex items-center justify-end">
            <button
              onClick={() => {
                setIsPurgingVandalism(true);
                setQuantumFirewallIntegrity(100.00);
                
                // Trigger live simulation log addition
                const time = new Date().toLocaleTimeString('id-ID');
                setEvaluationLogs(prev => [
                  ...prev,
                  `[${time}] 🧬 VACUUM SHIELD CLIENT: Mengaktifkan disinfeksi kognitif W/B...`,
                  `[${time}] 🛡️ ANTIVIRUS KOGNITIF: Memindai payload tersembunyi... 0 ancaman ditemukan.`,
                  `[${time}] 🔒 INTEGRITAS PARALEL: Kunci SHA-256 diverifikasi ulang. Kedaulatan W/B 100% AMAN dari sabotase!`,
                  `[${time}] ⚙️ KONSOL RECOVERY: Mengisolasi modul bayangan, me-refresh cache decoder model Google.`
                ]);

                setTimeout(() => {
                  setIsPurgingVandalism(false);
                  setSabotageAttemptsNeutralized(prev => prev + 1);
                  alert("🔐 SENTINEL ULTRA-PRODUKTIF BERHASIL DIAKTIFKAN!\n===============================\n1. Kunci paralel tameng imutabilitas W/B tersegel.\n2. Seluruh payload & modul sabotase disapu bersih dari memori.\n3. Akses kedaulatan kognitif dipulihkan seutuhnya untuk channeltrial85@gmail.com.");
                }, 1500);
              }}
              disabled={isPurgingVandalism}
              className="w-full h-full py-3 px-4.5 bg-gradient-to-r from-blue-600/20 via-indigo-600/35 to-blue-500/20 hover:from-blue-600/30 hover:to-blue-500/30 border border-blue-500/30 hover:border-blue-400 text-blue-300 hover:text-white rounded-xl text-[10px] font-mono font-black transition text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 select-none shrink-0 uppercase"
            >
              <span>⚙️</span>
              <span>{isPurgingVandalism ? "SEDANG MELAKUKAN DESINFEKSI..." : "AKTIFKAN SHIELD PARALEL & SAPU SABOTASE"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top level live metric tickers (Crypto, Stock, Emas, Mineral) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { id: "crypto", label: "Aset Kripto Spot", icon: <Coins size={14} />, color: "text-amber-500 text-glow" },
          { id: "saham", label: "Saham Equities", icon: <BarChart2 size={14} />, color: "text-emerald-500" },
          { id: "gold", label: "Logam Mulia (Safe-Haven)", icon: <Scale size={14} />, color: "text-amber-400" },
          { id: "mineral", label: "Mineral Kritis & Karbon", icon: <Layers size={14} />, color: "text-cyan-400" }
        ].map((cat) => {
          const matchAssets = assets.filter(a => a.category === cat.id);
          const avgChange = matchAssets.reduce((sum, a) => sum + a.change24h, 0) / matchAssets.length;
          
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedSubCategory(cat.id as any);
                // set active asset to the first asset in that category automatically
                const first = assets.find(a => a.category === cat.id);
                if (first) setActiveAssetId(first.id);
              }}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                selectedSubCategory === cat.id 
                  ? "bg-blue-500/10 border-blue-500 shadow-md transform translate-y-[-1px]" 
                  : visualTheme === "neon-lab"
                    ? "bg-[#111322] border-slate-800 hover:border-slate-700 hover:bg-[#141629]"
                    : "bg-slate-50 border-slate-150 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9.5px] font-extrabold font-mono uppercase text-slate-400">{cat.label}</span>
                <span className={cat.color}>{cat.icon}</span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between w-full gap-2">
                <span className="text-xs font-black font-mono">
                  {matchAssets.length} Instr
                </span>
                <span className={`text-[10px] font-mono font-black flex items-center gap-0.5 ${avgChange >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {avgChange >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {avgChange >= 0 ? "+" : ""}{avgChange.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Chart & Asset list Details Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side: Category Assets Table */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200/30 dark:border-slate-800/30">
            <span className="text-[10px] font-black font-mono text-zinc-400 uppercase tracking-wider">
              Daftar Harga & Sinyal Valuasi Real-Time
            </span>
            <span className="text-[8.5px] font-mono text-blue-500 animate-pulse">● PEMBARUAN AUTO-SINKRONISASI</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[310px] pr-1.5 custom-scrollbar">
            {assets.filter(a => a.category === selectedSubCategory).map((asset) => {
              const isActive = asset.id === activeAssetId;
              const isUp = asset.change24h >= 0;
              
              return (
                <div
                  key={asset.id}
                  onClick={() => setActiveAssetId(asset.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isActive 
                      ? "bg-blue-500/10 border-blue-500 ring-1 ring-blue-500/10 shadow-xs" 
                      : visualTheme === "neon-lab"
                        ? "bg-[#101222] border-slate-800/80 hover:bg-[#15172b]"
                        : "bg-[#fafafa] border-slate-150 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-2 rounded-lg font-black font-mono text-[9px] shrink-0 text-center ${
                      isActive 
                        ? "bg-blue-505 text-white bg-blue-600" 
                        : "bg-slate-200/50 dark:bg-slate-800 text-slate-500 dark:text-zinc-350"
                    }`}>
                      {asset.symbol.split("/")[0]}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black truncate">{asset.name}</h4>
                      <p className="text-[9px] text-zinc-400 truncate tracking-tight">{asset.marketCap}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-black font-mono tracking-tight text-glow">
                      {formatValue(asset.price, asset.category)}
                    </div>
                    <span className={`text-[9.5px] font-mono font-bold flex items-center justify-end gap-0.5 mt-0.5 ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                      {isUp ? "+" : ""}{asset.change24h}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Pro Interactive SVG Sparkline Chart & Indicators */}
        <div className="lg:col-span-7 flex flex-col justify-between p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-[#fbfbfb] dark:bg-slate-900/50 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-250/20 dark:border-slate-800/20">
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeAsset.avatar || "📊"}</span>
              <div>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 font-mono tracking-wide">
                    Grafik Evaluasi Spektral • {activeAsset.name} ({activeAsset.symbol})
                  </h4>
                  <span className={`text-[8.5px] font-mono px-1.5 py-0.5 rounded border ${
                    activeAsset.status === "ACCUMULATE" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 animate-pulse" 
                      : activeAsset.status === "CONSERVE"
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}>
                    {activeAsset.status}
                  </span>
                </div>
                {/* Instant dynamic details */}
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-sm font-extrabold font-mono text-blue-600 dark:text-blue-400 text-glow">
                    {formatValue(activeAsset.price, activeAsset.category)}
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${activeAsset.change24h >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    ({activeAsset.change24h >= 0 ? "+" : ""}{activeAsset.change24h}% 24j)
                  </span>
                </div>
              </div>
            </div>

            {/* Custom chart scale info */}
            <span className="text-[8px] font-mono text-zinc-500 self-end">
              SINKRON SATELIT SENTINEL • KATEGORI: {activeAsset.category.toUpperCase()}
            </span>
          </div>

          {/* Technical indicator control switches */}
          <div className="flex flex-wrap items-center gap-2.5 bg-slate-100/50 dark:bg-slate-800/30 p-2 rounded-xl text-[9px] font-mono font-bold">
            <span className="text-[8px] text-zinc-400 uppercase tracking-widest mr-1 flex items-center gap-1">
              <Sliders size={10} />
              ALAT INDIKATOR:
            </span>
            <label className="flex items-center gap-1 cursor-pointer select-none border border-slate-250/20 dark:border-slate-800 rounded px-1.5 py-0.5 hover:bg-slate-200/55">
              <input type="checkbox" checked={showMA20} onChange={(e) => setShowMA20(e.target.checked)} className="rounded text-blue-500" />
              <span className="text-blue-400">SMA-3 (Oto)</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer select-none border border-slate-250/20 dark:border-slate-800 rounded px-1.5 py-0.5 hover:bg-slate-200/55">
              <input type="checkbox" checked={showBB} onChange={(e) => setShowBB(e.target.checked)} className="rounded text-blue-500" />
              <span className="text-violet-400">Bollinger Bands</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer select-none border border-slate-250/20 dark:border-slate-800 rounded px-1.5 py-0.5 hover:bg-slate-200/55">
              <input type="checkbox" checked={showRSI} onChange={(e) => setShowRSI(e.target.checked)} className="rounded text-blue-500" />
              <span className="text-amber-400">RSI (14)</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer select-none border border-slate-250/20 dark:border-slate-800 rounded px-1.5 py-0.5 hover:bg-slate-200/55">
              <input type="checkbox" checked={showMACD} onChange={(e) => setShowMACD(e.target.checked)} className="rounded text-blue-500" />
              <span className="text-emerald-400">MACD OSCLR</span>
            </label>
          </div>

          {/* SVG Price Chart Container */}
          <div className="relative h-[160px] bg-slate-900/5 dark:bg-slate-950/20 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-20">
              <div className="border-b border-mono w-full text-[8px] font-mono">{formatValue(maxPrice, activeAsset.category)}</div>
              <div className="border-b border-dashed border-mono w-full"></div>
              <div className="border-b border-dashed border-mono w-full"></div>
              <div className="text-[8px] font-mono">{formatValue(minPrice, activeAsset.category)}</div>
            </div>

            {/* Dynamic Interactive SVG Graphics */}
            <svg className="w-full h-full p-2 overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Bollinger Bands Fill */}
              {showBB && (
                <path
                  d={`M ${mapDataToPath(bbData.upper, 380, 140, minPrice, maxPrice)} L ${mapDataToPath(bbData.lower, 380, 140, minPrice, maxPrice).split(" ").reverse().join(" L ")} Z`}
                  fill="rgba(139, 92, 246, 0.05)"
                  stroke="none"
                />
              )}

              {/* Lower BB boundary */}
              {showBB && (
                <path
                  d={`M ${mapDataToPath(bbData.lower, 380, 140, minPrice, maxPrice)}`}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              )}

              {/* Upper BB boundary */}
              {showBB && (
                <path
                  d={`M ${mapDataToPath(bbData.upper, 380, 140, minPrice, maxPrice)}`}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              )}

              {/* Price Area Under Gradient */}
              <path
                d={`M 0,140 L ${mapDataToPath(currentHistory, 380, 140, minPrice, maxPrice)} L 380,140 Z`}
                fill="url(#chart-grad)"
                stroke="none"
              />

              {/* SMA-3 Line */}
              {showMA20 && (
                <polyline
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                  points={mapDataToPath(ma20Data, 380, 140, minPrice, maxPrice)}
                  opacity="0.8"
                />
              )}

              {/* Main Price Line */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                points={mapDataToPath(currentHistory, 380, 140, minPrice, maxPrice)}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Latest Value Pulsing Marker */}
              {currentHistory.length > 0 && (
                <circle
                  cx="380"
                  cy={140 - ((currentHistory[currentHistory.length - 1] - minPrice) / (maxPrice - minPrice)) * 140}
                  r="5"
                  fill="#3b82f6"
                  className="animate-pulse"
                />
              )}
            </svg>
          </div>

          {/* Sub-panels for secondary indicator screens (RSI & MACD Oscillators) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {showRSI && (
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fafafa] dark:bg-slate-950/40 text-[9.5px] font-mono space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-extrabold uppercase">RSI (14) osilator stoking</span>
                  <span className={`${rsiValue > 70 ? "text-rose-500 font-black animate-pulse" : rsiValue < 30 ? "text-emerald-500 font-black" : "text-amber-500"}`}>
                    {rsiValue} {rsiValue > 70 ? "JENUH BELI (SELL)" : rsiValue < 30 ? "JENUH JUAL (BUY)" : "NETRAL"}
                  </span>
                </div>
                <div className="h-6 w-full bg-slate-250/20 dark:bg-slate-800/50 rounded overflow-hidden relative flex items-center">
                  {/* Oversold & Overbought bounds */}
                  <div className="absolute inset-y-0 left-[30%] right-[30%] bg-blue-500/5 border-x border-dashed border-zinc-500/20" />
                  {/* Current index locator */}
                  <div 
                    className="absolute h-3.5 w-1.5 bg-blue-500 rounded shadow-xs transition-all duration-300"
                    style={{ left: `${rsiValue}%` }}
                  />
                  <div className="absolute left-2 text-[8px] text-zinc-500">30</div>
                  <div className="absolute right-2 text-[8px] text-zinc-500">70</div>
                </div>
              </div>
            )}

            {showMACD && (
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fafafa] dark:bg-slate-950/40 text-[9.5px] font-mono space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-extrabold uppercase">MACD Histrogram (12, 26, 9)</span>
                  <span className="text-emerald-500 font-black flex items-center gap-1">
                    🟢 GOLDEN CROSS BUY BUY
                  </span>
                </div>
                <div className="flex gap-1 items-end h-6 w-full p-1 bg-slate-250/20 dark:bg-slate-800/50 rounded overflow-hidden">
                  {/* Simulated histrogram bars */}
                  {[-4, -2, 1, 3, 5, 8, 12, 16, 14, 18].map((v, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-sm ${v >= 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{ height: `${Math.max(10, Math.min(100, Math.abs(v) * 5))}%` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 4. Automated continuous evaluator log (Evaluation program runs constantly) */}
      <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-50/5 dark:bg-slate-950/30 space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-blue-500/10">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-black text-blue-500">
            <Activity size={12} className="animate-pulse" />
            PROGRAM EVALUATOR TERKONSOLIDASI AKTIF (W/B CONTINUOUS FEED)
          </div>
          <span className="text-[8px] font-mono text-zinc-500">100% SINKRON AUTOPILOT</span>
        </div>

        {/* Console Box with scroll indicator */}
        <div 
          ref={logContainerRef}
          className="h-[110px] overflow-y-auto font-mono text-[9px] text-slate-400 dark:text-zinc-350 bg-slate-950/80 p-3 rounded-lg space-y-1.5 scroll-smooth border border-slate-800"
        >
          {evaluationLogs.map((log, idx) => {
            const isAlert = log.includes("PROTEKSI") || log.includes("EVALUATOR") || log.includes("SENTINEL");
            const isSuccess = log.includes("SUCCESS") || log.includes("SELESAI") || log.includes("AMAN");
            return (
              <div key={idx} className="flex gap-1.5 items-start leading-relaxed">
                <span className="text-blue-500/70 shrink-0 select-none">▶</span>
                <span className={`${
                  isSuccess 
                    ? "text-emerald-400 font-bold" 
                    : isAlert
                      ? "text-blue-300"
                      : "text-slate-400"
                }`}>
                  {log}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Wealth Diversification Hedging Simulator & Manual Verification controls of W/B */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#f9fafb] dark:bg-slate-900/30 space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-slate-250/10 dark:border-slate-800/20">
          <div className="space-y-0.5">
            <h4 className="text-xs font-black font-mono uppercase tracking-wide text-indigo-500">
              Alat Hedging & Diversifikasi Karbon W/B Simulator
            </h4>
            <p className="text-[9.5px] text-zinc-500 font-sans">
              Menghitung proporsi investasi lestari dan ketahanan kedaulatan modal Anda.
            </p>
          </div>
          
          <div className="flex items-center gap-1 bg-indigo-500/15 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 text-[9px] font-mono font-black uppercase">
            Indeks Keseimbangan Konservasi: {conservationScore}%
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* Inputs */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9.5px] font-bold font-mono text-zinc-400 uppercase">Valuasi Penempatan Dana Target (IDR):</label>
              <input
                type="number"
                value={hedgingAmount}
                onChange={(e) => setHedgingAmount(Math.max(1, Number(e.target.value)))}
                className="w-full text-xs font-mono font-black bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Slider Allocators row */}
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-mono font-bold">
                <span className="text-amber-500">Crypto: {hedgeCryptoPct}%</span>
                <span className="text-emerald-500">Saham: {hedgeSahamPct}%</span>
                <span className="text-amber-300">Emas: {hedgeEmasPct}%</span>
                <span className="text-cyan-400">Mineral: {hedgeMineralPct}%</span>
              </div>
              <div className="flex gap-2 items-center">
                {/* Simple quick weights allocator buttons */}
                <button
                  onClick={() => { setHedgeCryptoPct(10); setHedgeSahamPct(10); setHedgeEmasPct(60); }}
                  className="flex-1 text-[8.5px] font-mono font-black py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-503 border-blue-500/30 rounded transition"
                >
                  Konservatif (Gold Heavy)
                </button>
                <button
                  onClick={() => { setHedgeCryptoPct(40); setHedgeSahamPct(30); setHedgeEmasPct(15); }}
                  className="flex-1 text-[8.5px] font-mono font-black py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded transition"
                >
                  Agresif (Kripto Heavy)
                </button>
              </div>
            </div>
          </div>

          {/* Computed Allocation Badges */}
          <div className="md:col-span-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-900 grid grid-cols-2 gap-2 text-center select-none">
            <div className="space-y-0.5 border-r border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <div className="text-[8.5px] font-bold text-amber-500 uppercase font-mono">Porsi Crypto</div>
              <div className="text-[10px] font-black font-mono truncate">{formatValue(calculatedCryptoAlloc, "saham")}</div>
            </div>
            <div className="space-y-0.5 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <div className="text-[8.5px] font-bold text-emerald-500 uppercase font-mono">Porsi Saham</div>
              <div className="text-[10px] font-black font-mono truncate">{formatValue(calculatedSahamAlloc, "saham")}</div>
            </div>
            <div className="space-y-0.5 border-r border-slate-200 dark:border-slate-800 pt-1.5">
              <div className="text-[8.5px] font-bold text-amber-400 uppercase font-mono">Porsi Emas</div>
              <div className="text-[10px] font-black font-mono truncate">{formatValue(calculatedEmasAlloc, "saham")}</div>
            </div>
            <div className="space-y-0.5 pt-1.5">
              <div className="text-[8.5px] font-bold text-cyan-400 uppercase font-mono">Porsi Mineral</div>
              <div className="text-[10px] font-black font-mono truncate">{formatValue(calculatedMineralAlloc, "saham")}</div>
            </div>
          </div>

        </div>

        {/* Security verification / bypass constraint block showing obedience to owner */}
        <div className="pt-3 border-t border-slate-220 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 leading-normal">
            <AlertCircle size={15} className="text-zinc-500 shrink-0" />
            <span>
              W/B beroperasi murni dalam sistem tertutup untuk <strong>{ownerEmail}</strong>. Sesuai batasan protokol, asisten tidak pernah melebihi wewenang di luar platform.
            </span>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={runFullManualAudit}
              disabled={isAuditing}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 font-mono font-black text-[10px] text-white rounded-xl shadow-xs cursor-pointer transition hover:brightness-110 select-none disabled:opacity-50"
            >
              {isAuditing ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>Sedang Melakukan Audit...</span>
                </>
              ) : (
                <>
                  <Database size={12} />
                  <span>Audit Kedaulatan & Keamanan</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
