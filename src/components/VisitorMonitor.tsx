import React, { useState, useEffect } from "react";
import { User } from "../types";
import { 
  Users, 
  UserCheck, 
  Radio, 
  MessageSquare, 
  Plus, 
  UserPlus, 
  Eye, 
  EyeOff, 
  HelpCircle,
  X,
  Volume2,
  Sparkles,
  Zap,
  Clock
} from "lucide-react";

interface Visitor {
  id: string;
  name: string;
  role: "Tamu" | "Peneliti Akreditasi" | "Staf Lab" | "Analisis Pemerintah";
  activity: string;
  status: "Online" | "Idle" | "Sedang Menulis" | "Analisis";
  lastActive: string;
  avatarSeed: string;
  interestTheme: string;
}

interface VisitorMonitorProps {
  currentUser: User | null;
  visualTheme: "luks-akademis" | "neon-lab" | "sederhana-modern";
}

const PRESET_VISITORS: Visitor[] = [
  {
    id: "v-1",
    name: "Prof. Dr. Ir. Budi Hartono",
    role: "Peneliti Akreditasi",
    activity: "Mengkaji pola distribusi tekanan air tanah sawit",
    status: "Online",
    lastActive: "Baru saja",
    avatarSeed: "Budi",
    interestTheme: "Fisika Hidraulik"
  },
  {
    id: "v-2",
    name: "Amalia Siregar, M.Sc.",
    role: "Staf Lab",
    activity: "Pemetaan kelembaban udara & sirkulasi termal",
    status: "Sedang Menulis",
    lastActive: "1 mnt lalu",
    avatarSeed: "Amalia",
    interestTheme: "Meteorologi"
  },
  {
    id: "v-3",
    name: "Dr. Ahmad Dahlan",
    role: "Peneliti Akreditasi",
    activity: "Analisis regulasi Perpres hukum kelautan samudera",
    status: "Idle",
    lastActive: "5 mnt lalu",
    avatarSeed: "Ahmad",
    interestTheme: "Hukum Tata Ruang"
  },
  {
    id: "v-4",
    name: "Megawati Kusuma",
    role: "Tamu",
    activity: "Eksplorasi rumus regresi ekonomi mikro pertanian",
    status: "Online",
    lastActive: "2 mnt lalu",
    avatarSeed: "Mega",
    interestTheme: "Ekonometrika"
  },
  {
    id: "v-5",
    name: "Hendrik Prasetyo",
    role: "Analisis Pemerintah",
    activity: "Membaca kajian draf dampak emisi api termal",
    status: "Analisis",
    lastActive: "Baru saja",
    avatarSeed: "Hendrik",
    interestTheme: "Ekologi"
  }
];

const NEW_VISITORS_POOL = [
  { name: "Siti Rahmawati, Ph.D.", role: "Peneliti Akreditasi", activity: "Menganalisis korelasi hara nitrogen tanah gambut", interestTheme: "Agronomi" },
  { name: "Kevin Sanjaya", role: "Tamu", activity: "Membaca contoh rujukan riset sirkulasi samudera lepas", interestTheme: "Oseanografi" },
  { name: "Dewi Lestari, M.Si.", role: "Staf Lab", activity: "Mempersiapkan rujukan regulasi tata kelola air bersih", interestTheme: "Sanitasi" },
  { name: "Rian Hidayat", role: "Analisis Pemerintah", activity: "Pengujian simulasi model matematika kinetika turbin angin", interestTheme: "Energi Baru" },
  { name: "Grace Natalie", role: "Tamu", activity: "Mempelajari stabilitas struktur hara tanah lempung", interestTheme: "Geoteknik" }
];

export default function VisitorMonitor({ currentUser, visualTheme }: VisitorMonitorProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [visitors, setVisitors] = useState<Visitor[]>(() => {
    const saved = localStorage.getItem("litera_simulated_visitors");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return PRESET_VISITORS;
      }
    }
    return PRESET_VISITORS;
  });

  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "info" }[]>([]);

  // Keep simulated visitor synchronized with registered user if logged in!
  useEffect(() => {
    if (currentUser) {
      setVisitors((prev) => {
        // If current user already in visitor stream, skip or update
        if (prev.some((v) => v.id === "user-active")) {
          return prev.map((v) => 
            v.id === "user-active" 
              ? { ...v, name: currentUser.fullName || currentUser.username, activity: "Sedang mengelola perpustakaan riset utama" } 
              : v
          );
        } else {
          const userObj: Visitor = {
            id: "user-active",
            name: `${currentUser.fullName || currentUser.username} (Anda)`,
            role: "Peneliti Akreditasi",
            activity: "Sedang mengelola perpustakaan riset utama",
            status: "Online",
            lastActive: "Baru saja",
            avatarSeed: currentUser.username,
            interestTheme: "Log Utama"
          };
          const updated = [userObj, ...prev];
          localStorage.setItem("litera_simulated_visitors", JSON.stringify(updated));
          return updated;
        }
      });
    } else {
      setVisitors((prev) => {
        const filtered = prev.filter((v) => v.id !== "user-active");
        localStorage.setItem("litera_simulated_visitors", JSON.stringify(filtered));
        return filtered;
      });
    }
  }, [currentUser]);

  // Periodic random activity update to simulate a truly active scientific workspace
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((prev) => {
        if (prev.length === 0) return prev;
        
        let updated = [...prev];

        // 20% chance of simulating a researcher entering or leaving the space
        const rollChance = Math.random();
        if (rollChance < 0.15 && updated.length < 8) {
          // Add a new guest
          const poolIndex = Math.floor(Math.random() * NEW_VISITORS_POOL.length);
          const chosen = NEW_VISITORS_POOL[poolIndex];
          if (!updated.some(v => v.name === chosen.name)) {
            const newGuest: Visitor = {
              id: `sim-v-${Date.now()}`,
              name: chosen.name,
              role: chosen.role as any,
              activity: chosen.activity,
              status: "Online",
              lastActive: "Baru saja",
              avatarSeed: chosen.name.split(" ")[0],
              interestTheme: chosen.interestTheme
            };
            updated.push(newGuest);
            triggerNotification(`Sejawat baru ${chosen.name} memasuki laboratorium sirkulasi.`, "success");
          }
        } else if (rollChance > 0.85 && updated.length > 3) {
          // Remove a random guest (excluding active user)
          const eligibleToRemove = updated.filter(v => v.id !== "user-active");
          if (eligibleToRemove.length > 0) {
            const victim = eligibleToRemove[Math.floor(Math.random() * eligibleToRemove.length)];
            updated = updated.filter(v => v.id !== victim.id);
            triggerNotification(`Peneliti ${victim.name} berpindah ke forum luar jaringan.`, "info");
          }
        }

        // Pick one random visitor (except current user) and update activity
        const eligibleIndices = updated
          .map((v, idx) => (v.id !== "user-active" ? idx : -1))
          .filter((idx) => idx !== -1);
          
        if (eligibleIndices.length > 0) {
          const randIdx = eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];
          const activities = [
            "Mengkaji kestabilan mekanika fluida air",
            "Mengevaluasi hukum tata ruang wilayah adat",
            "Mempelajari draf sains kinetik pembakaran api",
            "Menganalisis matriks pasar ekonomi regional",
            "Mencari contoh rujukan pemetaan oseanografi",
            "Menghitung densitas kandungan oksigen udara",
            "Mengunduh berkas laporan format statistik XLS",
            "Membaca hasil sirkulasi regresi linear hara tanah"
          ];
          const statuses: ("Online" | "Idle" | "Sedang Menulis" | "Analisis")[] = [
            "Online", "Idle", "Sedang Menulis", "Analisis"
          ];
          
          updated[randIdx] = {
            ...updated[randIdx],
            activity: activities[Math.floor(Math.random() * activities.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            lastActive: "Baru saja"
          };
          
          // Occasionally show a toast about active researchers
          if (Math.random() > 0.5) {
            triggerNotification(
              `Peneliti ${updated[randIdx].name} sedang ${updated[randIdx].status.toLowerCase()}: ${updated[randIdx].activity.toLowerCase()}.`,
              "info"
            );
          }
        }
        
        localStorage.setItem("litera_simulated_visitors", JSON.stringify(updated));
        return updated;
      });
    }, 5000); // highly responsive 5 seconds

    return () => clearInterval(interval);
  }, []);

  const triggerNotification = (message: string, type: "success" | "info" = "success") => {
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    const id = `toast-${Date.now()}-${randomSuffix}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleCreateSimulatedGuest = () => {
    const poolIndex = Math.floor(Math.random() * NEW_VISITORS_POOL.length);
    const chosen = NEW_VISITORS_POOL[poolIndex];
    
    // Check if copy already exists in current visitors
    if (visitors.some((v) => v.name === chosen.name)) {
      triggerNotification("Tamu ini sedang berada di dalam ruang sirkulasi laboratorium.", "info");
      return;
    }

    const newGuest: Visitor = {
      id: `sim-v-${Date.now()}`,
      name: chosen.name,
      role: chosen.role as any,
      activity: chosen.activity,
      status: "Online",
      lastActive: "Baru saja",
      avatarSeed: chosen.name.split(" ")[0],
      interestTheme: chosen.interestTheme
    };

    const updated = [...visitors, newGuest];
    setVisitors(updated);
    localStorage.setItem("litera_simulated_visitors", JSON.stringify(updated));
    triggerNotification(`Selamat datang! Peneliti Simulasi "${chosen.name}" telah masuk ke aplikasi.`, "success");
  };

  const handleGreetVisitor = (visName: string) => {
    triggerNotification(`Sapaan berhasil dikirim kepada ${visName}. Menunggu tanggapan...`, "success");
    
    setTimeout(() => {
      const replies = [
        `"Terima kasih atas sapaannya! Saya sedang mengkaji materi air dan struktur ekosistem."`,
        `"Selamat siang sejawat akademisi, riset Anda sangat detail dan terstruktur!"`,
        `"Salam kolaborasi ilmiah! Semoga jurnal referensi kualitatif ini bisa segera bersinergi."`,
        `"Halo! Desain visual laboratorium dan visualisasi data sains Anda di sini sangat interaktif."`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      triggerNotification(`[Pesan Balasan ${visName}]: ${randomReply}`, "info");
    }, 1500);
  };

  const handleRemoveVisitor = (id: string, name: string) => {
    if (id === "user-active") return;
    const updated = visitors.filter((v) => v.id !== id);
    setVisitors(updated);
    localStorage.setItem("litera_simulated_visitors", JSON.stringify(updated));
    triggerNotification(`Simulasi kepergian peneliti "${name}" berhasil dicatat.`, "info");
  };

  const handleResetVisitors = () => {
    localStorage.removeItem("litera_simulated_visitors");
    setVisitors(PRESET_VISITORS);
    triggerNotification("Daftar pengunjung dan tamu berhasil dipulihkan ke pengaturan awal.", "success");
  };

  // Status color pill map
  const getStatusStyle = (status: "Online" | "Idle" | "Sedang Menulis" | "Analisis") => {
    switch (status) {
      case "Online":
        return "bg-emerald-500 text-slate-950 border-emerald-400";
      case "Sedang Menulis":
        return "bg-amber-500 text-slate-950 border-amber-400 animate-pulse";
      case "Analisis":
        return "bg-indigo-500 text-white border-indigo-400";
      case "Idle":
      default:
        return "bg-slate-400 text-slate-950 border-slate-350";
    }
  };

  return (
    <div className="w-full mb-8">
      {/* Toast Overlay notifications */}
      <div className="fixed bottom-5 right-5 z-[200] max-w-sm flex flex-col gap-2.5">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`p-3.5 rounded-2xl shadow-xl border text-xs font-sans transition-all duration-300 transform translate-y-0 flex items-start gap-2.5 ${
              t.type === "success" 
                ? "bg-[#102d22] text-emerald-200 border-emerald-500/30" 
                : "bg-slate-900 text-slate-100 border-indigo-500/30"
            }`}
          >
            <Zap size={14} className="text-amber-400 shrink-0 mt-0.5 animate-bounce" />
            <div className="flex-grow">
              <span className="font-bold block text-[10px] uppercase font-mono tracking-wider opacity-75">
                Pemberitahuan Sistem (Simulasi)
              </span>
              <p className="mt-0.5 leading-relaxed">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-3xl border shadow-3xs overflow-hidden transition-all duration-300 ${
        visualTheme === "luks-akademis" 
          ? "bg-[#faf9f5] border-emerald-800/10" 
          : visualTheme === "neon-lab" 
            ? "bg-[#0f121d] border-indigo-500/20 text-[#cbd5e1]" 
            : "bg-white border-neutral-200"
      }`}>
        
        {/* Toggleable Desk Header */}
        <div className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${
          visualTheme === "luks-akademis" 
            ? "bg-[#163e2f]/5" 
            : visualTheme === "neon-lab" 
              ? "bg-[#141a29]" 
              : "bg-slate-50"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              visualTheme === "luks-akademis" 
                ? "bg-emerald-500/10 text-emerald-700" 
                : visualTheme === "neon-lab" 
                  ? "bg-indigo-500/15 text-indigo-400" 
                  : "bg-rose-50 text-rose-600"
            }`}>
              <Users size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800 font-sans theme-inherit-color">
                  Monitoring Pengunjung & Tamu Lapangan
                </h3>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {visitors.length} Aktif
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5 theme-inherit-muted">
                Ruang sirkulasi riset kolaboratif yang merekam tamu aktif dan peneliti terakreditasi saat ini.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Show/Hide Main Toggle Switch Button */}
            <button
              id="toggle-visitor-visibility-btn"
              onClick={() => setIsVisible(!isVisible)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isVisible
                  ? "bg-slate-200/85 hover:bg-slate-300 text-slate-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              }`}
              title={isVisible ? "Sembunyikan Daftar Pengunjung" : "Tampilkan Daftar Pengunjung"}
            >
              {isVisible ? (
                <>
                  <EyeOff size={13} />
                  <span>Sembunyikan Daftar</span>
                </>
              ) : (
                <>
                  <Eye size={13} />
                  <span>Tampilkan Pengunjung ({visitors.length})</span>
                </>
              )}
            </button>

            {isVisible && (
              <button
                id="add-simulated-guest-btn"
                onClick={handleCreateSimulatedGuest}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-505 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Masukkan Tamu Riset Simulasi Baru ke Lapangan"
              >
                <Plus size={13} />
                <span className="hidden sm:inline">Simulasi Tamu</span>
              </button>
            )}
          </div>
        </div>

        {/* Visitor Content Stream Panel */}
        {isVisible ? (
          <div id="visitor-monitor-list-panel" className="p-6 animate-fade-in">
            {visitors.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-slate-400 font-mono text-xs">Ketiadaan pengunjung yang aktif dalam radar sirkulasi lokal.</p>
                <button
                  onClick={handleResetVisitors}
                  className="mt-2.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-205 text-slate-700 font-mono text-[10.5px] rounded-lg cursor-pointer"
                >
                  Pulihkan Pengunjung Bawaan
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visitors.map((v) => (
                  <div 
                    key={v.id} 
                    className={`p-4 rounded-2xl border text-xs flex flex-col justify-between transition-all duration-200 hover:shadow-xs group ${
                      v.id === "user-active" 
                        ? "bg-emerald-500/5 border-emerald-500/25 ring-2 ring-emerald-500/5" 
                        : visualTheme === "neon-lab"
                          ? "bg-slate-900/40 border-slate-800 hover:bg-slate-900/70"
                          : "bg-slate-50/50 border-slate-100 hover:bg-white"
                    }`}
                  >
                    <div>
                      {/* Avatar & Badges Header */}
                      <div className="flex items-start justify-between gap-2.5 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-xl font-bold font-sans text-xs flex items-center justify-center shrink-0 border uppercase ${
                            v.id === "user-active"
                              ? "bg-emerald-600 text-white border-emerald-500"
                              : visualTheme === "neon-lab"
                                ? "bg-slate-800 text-indigo-400 border-slate-750"
                                : "bg-indigo-50 text-indigo-700 border-indigo-100"
                          }`}>
                            {v.avatarSeed.substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 font-sans tracking-wide theme-inherit-color flex items-center gap-1">
                              {v.name}
                              {v.id === "user-active" && (
                                <span className="bg-emerald-500 text-slate-950 font-black text-[8px] px-1.5 py-0.2 rounded uppercase">
                                  Anda
                                </span>
                              )}
                            </h4>
                            <span className="text-[9.5px] font-mono text-slate-400 font-semibold block uppercase">
                              {v.role}
                            </span>
                          </div>
                        </div>

                        {/* Status Label Dot */}
                        <div className="flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            {v.status !== "Idle" && (
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                v.status === "Sedang Menulis" ? "bg-amber-400" : "bg-emerald-400"
                              }`} />
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${
                              v.status === "Sedang Menulis" ? "bg-amber-500" : v.status === "Idle" ? "bg-slate-400" : "bg-emerald-500"
                            }`} />
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 font-black">{v.status}</span>
                        </div>
                      </div>

                      {/* Active Activity description */}
                      <div className="p-2.5 bg-slate-100/40 rounded-xl border border-slate-100 mb-3.5 space-y-1">
                        <span className="text-[9.5px] font-mono text-slate-400 font-extrabold uppercase">
                          Aktivitas Kajian:
                        </span>
                        <p className="text-slate-650 font-sans text-[11px] leading-snug theme-inherit-muted">
                          {v.activity}
                        </p>
                      </div>
                    </div>

                    {/* Operational controls shelf */}
                    <div className="flex items-center justify-between border-t border-slate-100/60 pt-3 mt-1.5">
                      <span className="text-[9.5px] font-mono text-slate-450 flex items-center gap-1">
                        <Clock size={10} />
                        {v.lastActive}
                      </span>

                      <div className="flex gap-1.5">
                        {v.id !== "user-active" && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleGreetVisitor(v.name)}
                              className="px-2 py-1 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-700 hover:text-white rounded-lg text-[9.5px] font-mono font-bold transition duration-150 flex items-center gap-1 cursor-pointer border border-indigo-500/10"
                              title="Kirim pesan sapaan teoretis"
                            >
                              <MessageSquare size={9} />
                              <span>Sapa</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveVisitor(v.id, v.name)}
                              className="px-1.5 py-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg text-xs transition duration-150 cursor-pointer"
                              title="Putuskan sambungan simulasi tamu ini"
                            >
                              <X size={10} />
                            </button>
                          </>
                        )}
                        {v.id === "user-active" && (
                          <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/15">
                            Meneliti
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick reset option for testing simplicity */}
            <div className="mt-5 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100/70 pt-4">
              <span>Membantu integrasi kearsipan multiriset terdistribusi.</span>
              <button
                onClick={handleResetVisitors}
                className="hover:text-slate-600 underline font-black cursor-pointer"
              >
                Pulihkan Radars bawaan
              </button>
            </div>
          </div>
        ) : (
          <div id="visitor-monitor-collapsed-banner" className="p-4 flex items-center justify-center bg-slate-500/5 text-xs text-slate-500 font-mono">
            <EyeOff size={12} className="mr-2 animate-pulse" />
            <span>Daftar pengunjung dan tamu disembunyikan. Klik <strong>Tampilkan Pengunjung ({visitors.length})</strong> untuk membuka monitor.</span>
          </div>
        )}
      </div>
    </div>
  );
}
