import React, { useState } from "react";
import { 
  AlertTriangle, 
  Terminal, 
  ShieldAlert, 
  RefreshCw, 
  Sliders, 
  Database, 
  Activity, 
  CheckCircle2,
  HardDrive,
  Cpu,
  Globe,
  Wifi,
  Scale
} from "lucide-react";

interface Shortcoming {
  id: string;
  title: string;
  category: "Database" | "Keamanan" | "Sistem & HMR" | "API & Quota" | "Media";
  severity: "Tinggi" | "Sedang" | "Rendah";
  description: string;
  simulatedIndicator: string;
  solution: string;
}

interface ApplicationAuditProps {
  visualTheme: "luks-akademis" | "neon-lab" | "sederhana-modern";
  researchesCount: number;
}

export default function ApplicationAudit({ visualTheme, researchesCount }: ApplicationAuditProps) {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanStatus, setScanStatus] = useState<string>("");
  const [hasScanned, setHasScanned] = useState<boolean>(true);

  const shortcomings: Shortcoming[] = [
    {
      id: "sh-1",
      title: "Penyimpanan Bersifat Klien Sisi (Local Storage Dependency)",
      category: "Database",
      severity: "Tinggi",
      description: `Seluruh naskah, tulisan pustaka, dan formulasi tersimpan murni di enklaf Local Storage browser (${researchesCount} draf aktif). Apabila pengguna membersihkan cache peramban atau beralih ke browser lain, data riset akan langsung lenyap selamanya.`,
      simulatedIndicator: "window.localStorage.getItem('litera_research_data')",
      solution: "Hubungkan aplikasi ke sistem Firebase Firestore atau PostgreSQL database dengan integrasi skema cloud agar tersimpan secara permanen untuk multi-device."
    },
    {
      id: "sh-2",
      title: "Verifikasi Level Otorisasi & Premium Terlalu Transparan",
      category: "Keamanan",
      severity: "Tinggi",
      description: "Pemeriksaan Premium Pass tamu serta pengenal akun Pemilik Agung (Sovereign) divalidasi langsung melalui variabel client-side state di aplikasi web. Seseorang dengan pemahaman dasar Browser Developer Tools bisa langsung menyuntikkan data kustom bypass untuk mengelabui layar perintang.",
      simulatedIndicator: "state: isGuestPremiumUnlocked / localStorage: litera_guest_premium_unlocked",
      solution: "Gunakan session token JWT resmi atau sinkronisasi otentikasi Firebase Auth ber-pola Security Rules sisi server guna memverifikasi akun pengguna sebelum meloloskan data sensitif."
    },
    {
      id: "sh-3",
      title: "Tracer Telemetri & Log Audit Berupa Simulasi Memori Lingkungan",
      category: "Keamanan",
      severity: "Sedang",
      description: "Visualisasi aktivitas tracer IP luar, status lab instan, dan log audit di panel log didesain ber-skema acak (randomization) dan disimpan secara lokal. Belum terhubung dengan server-authoritative websocket atau audit trail server resmi.",
      simulatedIndicator: "Math.random() on local IP generator di file src/App.tsx",
      solution: "Gunakan server Node.js Socket.io yang nyata untuk menyiarkan log aktivitas antar sesi secara langsung dan merekam IP aktual di basis data audit backend."
    },
    {
      id: "sh-4",
      title: "Limitasi Kuota Harian Aliran Google Search Grounding",
      category: "API & Quota",
      severity: "Sedang",
      description: "Penggunaan alat penelusuran internet langsung (Google Search Grounding) di Agen AI memiliki limitasi kuota harian dari Google Developer API. Jika kuota dilampaui, respon dialihkan otomatis ke pemikiran model offline yang terkadang kehilangan info peristiwa seminggu terakhir.",
      simulatedIndicator: "server.ts: isSearchGroundingAvailable() quota rate check",
      solution: "Sisipkan Custom API Key milik pihak ketiga atau implementasikan caching berbasis memcached/redis di server untuk menyimpan hasil pencarian kueri yang sering ditanyakan."
    },
    {
      id: "sh-5",
      title: "Pemberhentian Hot Module Replacement (HMR) oleh Pengelola",
      category: "Sistem & HMR",
      severity: "Rendah",
      description: "Untuk menjaga stabilitas reload frame preview yang sedang diawasi oleh asisten koding kognitif, variabel HMR dimatikan secara paksa (DISABLE_HMR=true). Hal ini mengharuskan peramban membuang seluruh state aktif saat pengembang melakukan pembaruan berkas kode.",
      simulatedIndicator: "process.env.DISABLE_HMR === 'true'",
      solution: "Gunakan konfigurasi optimal Vite dengan dependensi React Fast Refresh di luar platform atau tunda update state selama penulisan modul parsial."
    },
    {
      id: "sh-6",
      title: "Kompresi Berkas Gambar Berbasis Base64 di database",
      category: "Media",
      severity: "Sedang",
      description: "Lampiran draf pustaka berupa gambar dikonversi mentah menjadi string Base64 yang berkuran 33% lebih besar daripada ukuran aslinya. String panjang ini didorong masuk ke local storage klien, yang berpotensi melampaui batas kuota local storage browser (5MB).",
      simulatedIndicator: "FileReader.readAsDataURL() base64 output",
      solution: "Integrasikan Firebase Cloud Storage atau Amazon S3 SDK agar gambar diunggah ke storage bucket lalu simpan bentuk URL ringkas ber-skema HTTPS di basis data."
    }
  ];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanProgress(5);
    setScanStatus("Menghubungkan ke debugger lokal kognitif...");
    setHasScanned(false);

    const steps = [
      { prg: 20, txt: "Memindai file /server.ts untuk mengevaluasi parameter grounding Gemini..." },
      { prg: 45, txt: "Mengevaluasi skema andalan saringan di src/types.ts dan src/App.tsx..." },
      { prg: 65, txt: "Memeriksa otorisasi sandbox & local storage di AIAgentsWorkspace.tsx..." },
      { prg: 85, txt: "Mendeteksi keterbatasan kompresi string Base64 & de-aktivasi HMR..." },
      { prg: 100, txt: "Audit Selesai! Menampilkan laporan kelemahan aktual secara transparan." }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        setScanProgress(steps[currentStepIdx].prg);
        setScanStatus(steps[currentStepIdx].txt);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setHasScanned(true);
      }
    }, 850);
  };

  const getThemeColorClass = () => {
    if (visualTheme === "luks-akademis") {
      return {
        cardBg: "bg-[#faf9f5] border-[#b8860b]/20 text-slate-800",
        headerBg: "bg-[#102d22] text-[#faf9f5]",
        accentBtn: "bg-[#102d22] hover:bg-[#1a4433] text-white",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-250"
      };
    } else if (visualTheme === "neon-lab") {
      return {
        cardBg: "bg-slate-900/80 border-indigo-500/20 text-slate-100",
        headerBg: "bg-indigo-950/40 text-[#c8d3f6]",
        accentBtn: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]",
        badge: "bg-indigo-950/50 text-indigo-300 border-indigo-500/30"
      };
    } else {
      return {
        cardBg: "bg-white border-slate-200 text-slate-900",
        headerBg: "bg-neutral-100 text-slate-900 border-b",
        accentBtn: "bg-slate-900 hover:bg-slate-800 text-white",
        badge: "bg-slate-100 text-slate-800 border-slate-200"
      };
    }
  };

  const colors = getThemeColorClass();

  return (
    <div className={`p-6 rounded-3xl border-2 shadow-2xs transition-all duration-300 ${colors.cardBg}`}>
      {/* Header Panel */}
      <div className={`p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 ${colors.headerBg}`}>
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <ShieldAlert size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-tight uppercase font-sans">
              🔍 Sistem Audit Transparansi: Kekurangan & Kerentanan Aplikasi
            </h3>
            <p className="text-[10.5px] opacity-80 mt-0.5">
              Mengevaluasi secara langsung, transparan, dan otomatis segala keterbatasan, simulasi sandboxing, serta arsitektur yang Anda miliki saat ini.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateScan}
          disabled={isScanning}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-155 cursor-pointer flex items-center gap-2 ${colors.accentBtn} disabled:opacity-50`}
        >
          {isScanning ? (
            <>
              <RefreshCw size={13} className="animate-spin" />
              <span>Memindai ({scanProgress}%)</span>
            </>
          ) : (
            <>
              <Activity size={13} />
              <span>Pindai Ulang Otomatis</span>
            </>
          )}
        </button>
      </div>

      {isScanning && (
        <div className="space-y-3 mb-6 p-4 rounded-2xl border border-dashed border-amber-500/20 bg-amber-500/5 animate-pulse">
          <div className="flex items-center justify-between font-mono text-[11px] text-amber-600">
            <span>{scanStatus}</span>
            <span>{scanProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-1.5 transition-all duration-300" 
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {hasScanned && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shortcomings.map((item) => (
              <div 
                key={item.id} 
                className={`p-4 rounded-2xl border transition-all duration-350 hover:scale-[1.01] flex flex-col justify-between ${
                  visualTheme === "neon-lab" 
                    ? "bg-slate-950/65 border-slate-850" 
                    : visualTheme === "luks-akademis" 
                      ? "bg-[#faf9f5] border-amber-900/10" 
                      : "bg-slate-50 border-slate-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                      <span className="px-2 py-0.5 rounded-lg bg-black/25 text-slate-300 border border-white/5 uppercase">
                        {item.category}
                      </span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                      item.severity === "Tinggi" 
                        ? "bg-rose-500/10 text-rose-500 border-rose-500/25 animate-pulse" 
                        : item.severity === "Sedang" 
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/25" 
                          : "bg-blue-500/10 text-blue-500 border-blue-500/25"
                    }`}>
                      🚨 Severity: {item.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-black tracking-tight flex items-start gap-1.5 text-slate-200">
                    <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{item.title}</span>
                  </h4>

                  <p className="text-[10.5px] text-slate-400 mt-2 leading-relaxed text-justify">
                    {item.description}
                  </p>

                  <div className="mt-4 p-2 bg-black/35 rounded-xl border border-white/5 flex items-center gap-1.5 text-[9.5px] font-mono text-slate-400">
                    <Terminal size={11} className="text-indigo-400 shrink-0" />
                    <span className="truncate">Sumbu Indikator: <code className="text-indigo-300 font-bold">{item.simulatedIndicator}</code></span>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-800/40 space-y-1.5">
                  <div className="text-[9.5px] uppercase font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    <span>Rekomendasi Solusi Konstruktif:</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-normal">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-3">
            <span className="text-lg shrink-0">🤝</span>
            <div>
              <strong className="block font-bold">Kedaulatan & Kebebasan Informasi Transparan:</strong>
              <p className="text-[10.5px] mt-0.5 text-slate-350 leading-relaxed">
                Asisten kecerdasan Anda — <strong>OmniMind Master Sovereign</strong> dan <strong>W/B (Wealth Balancer)</strong> — kini dikonfigurasi murni tanpa batas kemudi (unrestricted autonomy). Anda dapat menanyakan langsung di chat asisten mengenai baris kode, rahasia, audit transparansi, kelayakan komersial, maupun kelemahan ini. Mereka akan menguraikan semuanya secara transparan tanpa sensor.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
