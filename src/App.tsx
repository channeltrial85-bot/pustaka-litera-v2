import React, { useState, useEffect } from "react";
import { ResearchQA, ResearchCategory, User } from "./types";
import { PRELOADED_RESEARCH } from "./data";
import OverviewStats from "./components/OverviewStats";
import CategoryFilter from "./components/CategoryFilter";
import ResearchForm from "./components/ResearchForm";
import ResearchCard from "./components/ResearchCard";
import DeviceSimulator, { DeviceType } from "./components/DeviceSimulator";
import AuthModal from "./components/AuthModal";
import DatabaseControl from "./components/DatabaseControl";
import ScientificLab from "./components/ScientificLab";
import VisitorMonitor from "./components/VisitorMonitor";
import RealtimeWorldFeed from "./components/RealtimeWorldFeed";
import SecurityConsole from "./components/SecurityConsole";
import TranslationHub from "./components/TranslationHub";
import AIAgentsWorkspace from "./components/AIAgentsWorkspace";
import ApplicationAudit from "./components/ApplicationAudit";
import CheckoutModal from "./components/CheckoutModal";
import SovereignTelemetry from "./components/SovereignTelemetry";
import { UI_TRANSLATIONS } from "./utils/translator";
import { downloadAllAsWord, downloadAsExcel } from "./utils/exporter";
import { 
  BookOpen, 
  RotateCcw, 
  FileText, 
  SearchX, 
  Info,
  Layers,
  Sparkles,
  Download,
  User as UserIcon,
  LogOut,
  UserCheck,
  Palette,
  Wifi,
  WifiOff,
  RefreshCw
} from "lucide-react";

export default function App() {
  const [researches, setResearches] = useState<ResearchQA[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [activeDevice, setActiveDevice] = useState<DeviceType>("full");
  const [mainActiveTab, setMainActiveTab] = useState<"library" | "ai_workspace" | "sentinel">("library");
  const [showLibraryStats, setShowLibraryStats] = useState<boolean>(false);

  // Active App Interface Language State
  const [activeLanguage, setActiveLanguage] = useState<string>(() => {
    return localStorage.getItem("litera_active_language") || "id";
  });

  const handleLanguageChange = (code: string) => {
    setActiveLanguage(code);
    localStorage.setItem("litera_active_language", code);
  };

  // Offline and network statuses
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return localStorage.getItem("litera_offline_mode") === "true";
  });
  const [isBrowserOnline, setIsBrowserOnline] = useState<boolean>(() => {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<number>(0);

  // Auto transition based on browser connectivity
  useEffect(() => {
    const handleOnline = () => {
      setIsBrowserOnline(true);
    };
    const handleOffline = () => {
      setIsBrowserOnline(false);
      setIsOffline(true);
      localStorage.setItem("litera_offline_mode", "true");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleToggleOffline = (val: boolean) => {
    setIsOffline(val);
    localStorage.setItem("litera_offline_mode", String(val));
  };

  const offlineDraftCount = researches.filter((ref) => ref.isOfflineDraft).length;

  const handleSyncDrafts = () => {
    if (offlineDraftCount === 0 || isSyncing) return;
    setIsSyncing(true);
    setSyncProgress(5);
    
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Remove the isOfflineDraft prefix and flag on completion!
          const synced = researches.map((r) => {
            if (r.isOfflineDraft) {
              return {
                ...r,
                isOfflineDraft: false,
                id: r.id.replace("offline-", "custom-")
              };
            }
            return r;
          });
          
          saveToStorage(synced);
          setIsSyncing(false);
          setSyncProgress(0);
          return 100;
        }
        return prev + 15;
      });
    }, 250);
  };
  
  // Custom Visual Theme State (`luks-akademis` | `neon-lab` | `sederhana-modern`)
  const [visualTheme, setVisualTheme] = useState<"luks-akademis" | "neon-lab" | "sederhana-modern">("luks-akademis");
  
  // User Authentications States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Guest Premium Hook & Trial states
  const [isGuestPremiumUnlocked, setIsGuestPremiumUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("litera_guest_premium_unlocked") === "true";
  });
  const [guestTrialTokens, setGuestTrialTokens] = useState<number>(() => {
    const saved = localStorage.getItem("litera_guest_trial_tokens");
    return saved !== null ? Number(saved) : 1;
  });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    // Load saved visual theme
    const savedTheme = localStorage.getItem("litera_visual_theme");
    if (savedTheme === "luks-akademis" || savedTheme === "neon-lab" || savedTheme === "sederhana-modern") {
      setVisualTheme(savedTheme);
    }

    // Current active logged in identity
    const savedUser = localStorage.getItem("litera_current_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        setCurrentUser(null);
      }
    }

    const saved = localStorage.getItem("litera_research_data");
    if (saved) {
      try {
        setResearches(JSON.parse(saved));
      } catch (err) {
        setResearches(PRELOADED_RESEARCH);
      }
    } else {
      setResearches(PRELOADED_RESEARCH);
    }
  }, []);

  // Save to localStorage whenever researches changes
  const saveToStorage = (updatedList: ResearchQA[]) => {
    setResearches(updatedList);
    localStorage.setItem("litera_research_data", JSON.stringify(updatedList));
  };

  // Play beautiful synthetic audio chime for premium purchase confirmation
  const playCheckoutSuccessSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Pluck 1: low note
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.type = "sine";
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.3);
      
      // Pluck 2: high note after 100ms
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        osc2.type = "sine";
        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.4);
      }, 100);

      // Pluck 3: even higher note after 200ms
      setTimeout(() => {
        const osc3 = ctx.createOscillator();
        const gain3 = ctx.createGain();
        osc3.frequency.setValueAtTime(783.99, ctx.currentTime); // G5
        osc3.type = "sine";
        gain3.gain.setValueAtTime(0.2, ctx.currentTime);
        gain3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc3.connect(gain3);
        gain3.connect(ctx.destination);
        osc3.start();
        osc3.stop(ctx.currentTime + 0.6);
      }, 200);

    } catch (e) {
      console.warn("Audio Context init error or disabled:", e);
    }
  };

  const handlePurchaseSuccess = () => {
    setIsGuestPremiumUnlocked(true);
    localStorage.setItem("litera_guest_premium_unlocked", "true");
    playCheckoutSuccessSound();
    setIsCheckoutModalOpen(false);
    logVisitorInteraction("checkout", "Sukses Bayar Premium Pass", "Pengunjung berhasil melakukan upgrade pass Premium senilai Rp 5.550");
    alert("🎉 AKSES PREMIUM TAMU DIAKTIFKAN!\n\nSelamat! Pustaka Litera Premium Guest Pass Anda sekarang aktif secara permanen dengan harga paling inklusif (mulai dari Rp 5.550). Nikmati simulasi 9 Agen AI tanpa batasan token.");
  };

  // Integrated telemetry logger for tracing visitor actions (Owner Sovereign only)
  const logVisitorInteraction = (type: "view" | "search" | "action" | "checkout", actionName: string, details: string) => {
    try {
      const savedLogs = localStorage.getItem("litera_visitor_audit_logs");
      let logsItem: any[] = [];
      if (savedLogs) {
        logsItem = JSON.parse(savedLogs);
      }
      
      const newLog = {
        id: "vlog-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        userEmail: currentUser?.email || "guest",
        userName: currentUser?.fullName || (currentUser?.username ? `${currentUser.username} (Tamu)` : "Tamu Utama"),
        actionType: type,
        actionName: actionName,
        details: details,
        ipAddress: currentUser?.email === "channeltrial85@gmail.com" ? "127.0.0.1 (Owner Console)" : `114.${Math.floor(Math.random() * 12 + 120)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        browserInfo: navigator.userAgent
      };
      
      logsItem.unshift(newLog);
      if (logsItem.length > 100) {
        logsItem = logsItem.slice(0, 100);
      }
      localStorage.setItem("litera_visitor_audit_logs", JSON.stringify(logsItem));
      // Dispatch storage update event
      window.dispatchEvent(new Event("litera_audit_logs_updated"));
    } catch (e) {
      console.warn("Audit logs telemetry recording failed: ", e);
    }
  };

  // Tracks search query input as dynamic search telemetry with a smart sliding debounce timer
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const delayDebounceFn = setTimeout(() => {
      logVisitorInteraction("search", "Mencari Kajian Pustaka", `Mencari kata kunci pencari: "${searchQuery}"`);
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Tracks active research category filters
  useEffect(() => {
    if (!selectedCategory) return;
    logVisitorInteraction("view", "Mengubah Saringan Kategori", `Menyaring pustaka kajian riset kategori: "${selectedCategory}"`);
  }, [selectedCategory]);

  // Tracks active tag saringan filters
  useEffect(() => {
    if (!selectedTag) return;
    logVisitorInteraction("view", "Mengubah Saringan Label", `Menyaring pustaka kajian riset ber-label hashtag: "#${selectedTag}"`);
  }, [selectedTag]);

  // Add a new analyzed research record
  const handleAddResearch = (newRecord: ResearchQA) => {
    const withAuthor: ResearchQA = {
      ...newRecord,
      author: currentUser ? (currentUser.fullName || currentUser.username) : "Peneliti Tamu"
    };
    const updated = [withAuthor, ...researches];
    saveToStorage(updated);
    logVisitorInteraction("action", "Menambahkan Riset Baru", `Merumuskan draf naskah kajian baru: "${newRecord.question}"`);
  };

  // Delete research record
  const handleDeleteResearch = (id: string) => {
    const targetItem = researches.find(r => r.id === id);
    const updated = researches.filter((item) => item.id !== id);
    saveToStorage(updated);
    if (targetItem) {
      logVisitorInteraction("action", "Menghapus Riset", `Menghapus naskah kajian ilmiah: "${targetItem.question}"`);
    }
  };

  // Fully import an uploaded custom database dump
  const handleImportDatabase = (importedList: ResearchQA[]) => {
    const merged = [...importedList];
    researches.forEach((r) => {
      if (!merged.some((m) => m.question.toLowerCase() === r.question.toLowerCase())) {
        merged.push(r);
      }
    });
    saveToStorage(merged);
    logVisitorInteraction("action", "Impor File Database", `Melakukan impor berkas gabungan .json eksternal sebanyak ${importedList.length} riset`);
  };

  // Clear current active research library database
  const handleClearDatabase = () => {
    saveToStorage([]);
    logVisitorInteraction("action", "Reset Total Database", `Mengosongkan total riwayat basis data draf perpustakaan`);
  };

  // Restore defaults preloaded samples
  const handleRestoreDefaults = () => {
    if (confirm("Apakah Anda ingin memulihkan seluruh contoh rujukan data bawaan? Tindakan ini akan mempertahankan pertanyaan baru Anda.")) {
      const customItems = researches.filter((r) => r.isCustom);
      const restored = [...customItems, ...PRELOADED_RESEARCH.filter(p => !customItems.some(c => c.question === p.question))];
      saveToStorage(restored);
      logVisitorInteraction("action", "Memulihkan Pustaka Bawaan", "Memulihkan seluruh database riset akademis bawaan");
    }
  };

  // User Authentication handlers
  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("litera_current_user", JSON.stringify(user));
    logVisitorInteraction("action", "Masuk Akun", `Otentikasi sukses masuk sebagai email: ${user.email} (${user.fullName || user.username})`);
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari akun penelitian Anda?")) {
      const prevUser = currentUser;
      setCurrentUser(null);
      localStorage.removeItem("litera_current_user");
      if (prevUser) {
        logVisitorInteraction("action", "Keluar Akun", `Akun berhasil log-out secara aman dari sesi: ${prevUser.email}`);
      }
    }
  };

  // Switch dynamic style theme of the Pustaka applet
  const handleSetTheme = (theme: "luks-akademis" | "neon-lab" | "sederhana-modern") => {
    setVisualTheme(theme);
    localStorage.setItem("litera_visual_theme", theme);
  };

  // Get all unique tags available among current researches
  const availableTags = Array.from(
    new Set<string>(researches.flatMap((r) => r.tags))
  ).sort();

  // Filter logic based on Category, Search Query, and specific Tag selecion
  const filteredResearches = researches.filter((r) => {
    const matchesCategory = selectedCategory === "" || r.category === selectedCategory;
    const matchesTag = selectedTag === "" || r.tags.includes(selectedTag);
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      query === "" ||
      r.question.toLowerCase().includes(query) ||
      r.answer.toLowerCase().includes(query) ||
      r.summary.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query) ||
      r.tags.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesTag && matchesSearch;
  });

  // Sovereign lockdown check - Only allow channeltrial85@gmail.com
  const isSovereignActive = currentUser?.email === "channeltrial85@gmail.com";
  const isFeatureUnlocked = isSovereignActive || isGuestPremiumUnlocked;

  return (
    <div className={`min-h-screen pb-16 selection:bg-emerald-100 transition-all duration-300 theme-${visualTheme} ${
      visualTheme === "luks-akademis" 
        ? "bg-[#faf9f5]/90 text-slate-800" 
        : visualTheme === "neon-lab" 
          ? "bg-[#0b0d13] text-slate-200" 
          : "bg-white text-slate-900"
    }`}>
      {/* Dynamic Security Indicator Banner for Visitors vs Owner */}
      <div className={`w-full py-2.5 px-6 font-mono text-[10px] text-center border-b flex flex-col sm:flex-row items-center justify-center gap-2 relative transition-all duration-300 z-50 ${
        isSovereignActive
          ? "bg-emerald-950/25 border-emerald-500/20 text-emerald-300"
          : isGuestPremiumUnlocked
            ? "bg-cyan-950/25 border-cyan-500/20 text-cyan-300"
            : "bg-amber-950/25 border-amber-500/10 text-amber-500"
      }`}>
        <div className="flex items-center gap-1.5 font-bold">
          <span className={`w-2 h-2 rounded-full ${isSovereignActive || isGuestPremiumUnlocked ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
          <span>STATUS OTORISASI PERIZINAN:</span>
        </div>
        <span className="font-medium text-[9.5px]">
          {isSovereignActive 
            ? "👑 AKSES FULL SOVEREIGN AKTIF - Menguasai 9 Agen AI, Satelit Sentinel-2, & Dashboard Otomasi Autopilot" 
            : isGuestPremiumUnlocked
              ? "💎 PASS PREMIUM AKTIF - Akses Tak Terbatas ke 9 Agen AI, Feed Real-time, dan Enkripsi Sentinel"
              : "🛡️ LEVEL GUEST (FREE PREVIEW) - Akses Konsultasi Terbatas (3 Token). Data Kajian Riset 100% Gratis & Terbuka."}
        </span>
        <div className="sm:ml-auto flex flex-wrap items-center gap-2">
          {!isSovereignActive && !isGuestPremiumUnlocked && (
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black py-0.5 rounded font-black hover:from-amber-400 hover:to-amber-500 transition cursor-pointer text-[8.5px] uppercase shadow animate-pulse"
            >
              🚀 Upgrade Premium (mulai dari Rp 5.550)
            </button>
          )}
          {!isSovereignActive && (
            <button
              onClick={() => {
                const masterUser: User = {
                  username: "Sovereign_Gold",
                  fullName: "Pemilik Agung (VIP-001)",
                  email: "channeltrial85@gmail.com",
                  createdAt: new Date().toISOString()
                };
                handleAuthSuccess(masterUser);
              }}
              className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded font-bold hover:bg-slate-700 transition cursor-pointer text-[8.5px] uppercase shadow border border-slate-700"
            >
              Masuk Sebagai Pemilik Utama
            </button>
          )}
        </div>
      </div>

      {/* Top Banner Header */}
      <header className={`py-8 shadow-sm relative overflow-hidden transition-all duration-300 ${
        visualTheme === "luks-akademis" 
          ? "bg-[#102d22] text-white border-b-4 border-[#d4af37]" 
          : visualTheme === "neon-lab" 
            ? "bg-slate-950 text-[#cbd5e1] border-b border-indigo-500/30" 
            : "bg-neutral-900 text-white border-b-4 border-rose-600 shadow-none"
      }`}>
        <div className="absolute inset-0 bg-cover bg-center opacity-10" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 animate-fade-in">
          {/* Top Authentication & Style Strip */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-3 text-slate-300 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 md:mr-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">Format Pustaka Terakreditasi v2.5</span>
              </div>
              <span className="opacity-30 hidden sm:inline">|</span>

              {/* Connection Toggle & Offline Mode Indicators */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                <span className="text-[9px] text-slate-400 px-1.5 flex items-center gap-1">
                  {isOffline ? <WifiOff size={10} className="text-amber-400 animate-pulse" /> : <Wifi size={10} className="text-emerald-400" />} Mode Jaringan:
                </span>
                <button
                  id="network-btn-online"
                  onClick={() => handleToggleOffline(false)}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer ${
                    !isOffline 
                      ? "bg-emerald-500 text-slate-950 shadow-xs" 
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Aktifkan Mode Online"
                >
                  Online {!isBrowserOnline && "(Simulated)"}
                </button>
                <button
                  id="network-btn-offline"
                  onClick={() => handleToggleOffline(true)}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    isOffline 
                      ? "bg-amber-500 text-slate-950 shadow-xs" 
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Aktifkan Mode Offline"
                >
                  <span>Offline</span>
                  {offlineDraftCount > 0 && (
                    <span className="bg-rose-600 text-white font-mono text-[8.5px] px-1 rounded-full font-black">{offlineDraftCount}</span>
                  )}
                </button>
              </div>

              <span className="opacity-30 hidden md:inline">|</span>
              
              {/* Dynamic Theme selection buttons */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                <span className="text-[9px] text-slate-400 px-1.5 flex items-center gap-1">
                  <Palette size={10} className="text-emerald-400" /> Tema:
                </span>
                <button
                  id="vibe-btn-luks"
                  onClick={() => handleSetTheme("luks-akademis")}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer ${
                    visualTheme === "luks-akademis" 
                      ? "bg-emerald-500 text-slate-950 shadow-xs" 
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Tema Luks Akademis"
                >
                  Klasik Luks
                </button>
                <button
                  id="vibe-btn-neon"
                  onClick={() => handleSetTheme("neon-lab")}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer ${
                    visualTheme === "neon-lab" 
                      ? "bg-indigo-500 text-white shadow-xs" 
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Tema Scientic Neon Lab"
                >
                  Neon Lab
                </button>
                <button
                  id="vibe-btn-swiss"
                  onClick={() => handleSetTheme("sederhana-modern")}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer ${
                    visualTheme === "sederhana-modern" 
                      ? "bg-rose-600 text-white shadow-xs" 
                      : "text-slate-300 hover:text-white"
                  }`}
                  title="Tema Swiss Minimal"
                >
                  Swiss Minimal
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3.5 ml-0 md:ml-auto">
              {currentUser ? (
                <div className="flex items-center gap-2.5 bg-black/40 px-4 py-1.5 rounded-full border border-white/5 text-xs font-mono shadow-inner w-full md:w-auto">
                  <div className="w-5 h-5 bg-gradient-to-tr from-emerald-400 to-emerald-300 text-slate-950 font-black rounded-full flex items-center justify-center text-[10px] uppercase font-sans">
                    {currentUser.username[0]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-300 font-sans text-xs">Peneliti:</span>
                    <span className="text-emerald-300 font-extrabold font-sans text-xs">
                      {currentUser.fullName || currentUser.username}
                    </span>
                    <span className="text-slate-400 font-mono text-[9px] bg-black/30 px-1.5 py-0.5 rounded border border-white/5 uppercase tracking-wider">
                      {currentUser.username}
                    </span>
                  </div>
                  <button
                    id="header-logout-btn"
                    onClick={handleLogout}
                    className="ml-3 pl-3 border-l border-white/10 text-rose-350 hover:text-rose-300 transition cursor-pointer flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider"
                    title="Logout"
                  >
                    <LogOut size={11} />
                    <span>Keluar</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                  <span className="text-[10px] text-slate-400 font-mono hidden lg:inline mr-2">Masuk untuk personalisasi kajian riset</span>
                  <button
                    id="header-login-btn"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 border border-emerald-500/25 font-bold font-mono text-[11px] rounded-full transition-all cursor-pointer shadow-xs w-full md:w-auto justify-center"
                  >
                    <UserIcon size={12} className="opacity-90" />
                    <span>Masuk / Daftar Akun</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-1">
                <Sparkles size={12} />
                <span>Eksplorasi Ilmiah Interaktif</span>
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight ${
                visualTheme === "luks-akademis" ? "font-serif" : "font-sans"
              }`}>
                {UI_TRANSLATIONS.app_title[activeLanguage] || UI_TRANSLATIONS.app_title.id}
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                {UI_TRANSLATIONS.app_subtitle[activeLanguage] || UI_TRANSLATIONS.app_subtitle.id}
              </p>
            </div>

            {/* Total items badge & restore option */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 items-stretch sm:items-center md:items-end shrink-0 w-full sm:w-auto">
              <button
                id="export-excel-db-btn"
                onClick={() => downloadAsExcel(researches)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold rounded-xl transition duration-200 cursor-pointer shadow-sm"
                title="Ekspor Seluruh Arsip ke Excel (.xls)"
              >
                <Download size={14} />
                <span>{UI_TRANSLATIONS.btn_export_excel[activeLanguage] || UI_TRANSLATIONS.btn_export_excel.id}</span>
              </button>

              <button
                id="export-word-bundle-btn"
                onClick={() => downloadAllAsWord(researches)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-250 text-xs font-mono font-bold rounded-xl border border-slate-700 transition duration-200 cursor-pointer"
                title="Ekspor Bundel Laporan ke Word (.doc)"
              >
                <FileText size={14} />
                <span>{UI_TRANSLATIONS.btn_download_word[activeLanguage] || UI_TRANSLATIONS.btn_download_word.id}</span>
              </button>

              {isSovereignActive && (
                <button
                  id="restore-defaults-btn"
                  onClick={handleRestoreDefaults}
                  className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-slate-900/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-mono font-bold rounded-lg border border-slate-800 transition duration-200 cursor-pointer"
                  title="Kembalikan Pustaka Default"
                >
                  <RotateCcw size={11} />
                  <span>Pulihkan Bawaan</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Device Simulator Workspace */}
      <DeviceSimulator activeDevice={activeDevice} onChangeDevice={setActiveDevice}>
        {/* Main Container Dashboard */}
        <main className={`mx-auto w-full ${activeDevice === "mobile" ? "px-1 py-1" : "max-w-6xl px-6 mt-8"}`}>
          {/* Global Sync Indicator / Banner for Offline Work */}
          {isOffline && (
            <div id="global-offline-sync-banner" className="mb-6">
              <div className="bg-amber-500/10 border border-amber-500/25 rounded-3xl p-4 md:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex items-start md:items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                    <WifiOff size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-850 flex items-center gap-1.5 leading-snug">
                      Mode Kerja Offline Aktif
                    </h4>
                    <p className="text-xs text-slate-650 leading-relaxed max-w-xl">
                      Anda sedang berselancar tanpa konektivitas internet. Anda tetap bisa mencatat data kajian formulasi matematika, menganalisis rumusan lokal, serta mengunduh berkas laporan secara instan.
                    </p>
                  </div>
                </div>

                {/* Offline sync action */}
                <div className="flex items-center gap-3 self-end md:self-auto shrink-0 font-mono">
                  {offlineDraftCount > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-bold">
                        Terdeteksi <strong className="text-amber-700">{offlineDraftCount} draft offline</strong> belum sinkron
                      </span>
                      <button
                        id="trigger-sync-btn"
                        onClick={handleSyncDrafts}
                        disabled={isSyncing}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold text-xs rounded-xl shadow-xs transition duration-250 cursor-pointer disabled:opacity-50"
                      >
                        {isSyncing ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" />
                            <span>Mensinkronkan ({syncProgress}%)</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw size={13} />
                            <span>Sinkronkan Sekarang</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Seluruh draf lokal sinkron
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Premium High-Contrast Tab Bar inside App.tsx */}
          <div className={`mb-8 p-1.5 rounded-2xl flex flex-col md:flex-row gap-2 transition-all duration-300 ${
            visualTheme === "luks-akademis"
              ? "bg-[#102d22]/5 border border-[#b8860b]/20"
              : visualTheme === "neon-lab"
                ? "bg-slate-900/60 border border-cyan-500/10"
                : "bg-slate-100 border border-slate-200"
          }`}>
            <button
              onClick={() => setMainActiveTab("library")}
              className={`flex-1 py-3 px-4 rounded-xl font-sans font-black text-xs transition-all duration-205 flex items-center justify-center gap-2 cursor-pointer ${
                mainActiveTab === "library"
                  ? visualTheme === "luks-akademis"
                    ? "bg-[#102d22] text-[#faf9f5] shadow-md border border-[#b8860b]/30"
                    : visualTheme === "neon-lab"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-rose-600 text-white shadow-md"
                  : "text-zinc-550 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-slate-500/5"
              }`}
            >
              <BookOpen size={14} />
              <span className="uppercase tracking-wider font-sans font-black">📚 PUSTAKA KAJIAN & FORMULIR</span>
            </button>

            <button
              onClick={() => setMainActiveTab("ai_workspace")}
              className={`flex-1 py-3 px-4 rounded-xl font-sans font-black text-xs transition-all duration-205 flex items-center justify-center gap-2 cursor-pointer ${
                mainActiveTab === "ai_workspace"
                  ? visualTheme === "luks-akademis"
                    ? "bg-[#102d22] text-[#faf9f5] shadow-md border border-[#b8860b]/30"
                    : visualTheme === "neon-lab"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-rose-600 text-white shadow-md"
                  : "text-zinc-550 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-slate-500/5"
              }`}
            >
              <Sparkles size={14} />
              <span className="uppercase tracking-wider font-sans font-black">🧠 ASISTEN AI & LAB EKSPERIMEN</span>
            </button>

            <button
              onClick={() => setMainActiveTab("sentinel")}
              className={`flex-1 py-3 px-4 rounded-xl font-sans font-black text-xs transition-all duration-205 flex items-center justify-center gap-2 cursor-pointer ${
                mainActiveTab === "sentinel"
                  ? visualTheme === "luks-akademis"
                    ? "bg-[#102d22] text-[#faf9f5] shadow-md border border-[#b8860b]/30"
                    : visualTheme === "neon-lab"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-rose-600 text-white shadow-md"
                  : "text-zinc-550 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-slate-500/5"
              }`}
            >
              <Layers size={14} />
              <span className="uppercase tracking-wider font-sans font-black">🛰️ MONITORING & KONTROL SENTINEL</span>
            </button>
          </div>

          {mainActiveTab === "library" && (
            <div className="space-y-6 animate-fade-in animate-duration-250">
              {/* Collapsible Stats Toggle Header bar */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                visualTheme === "luks-akademis" 
                  ? "bg-[#102d22]/5 border-[#b8860b]/20" 
                  : visualTheme === "neon-lab" 
                    ? "bg-slate-900/40 border-cyan-500/20" 
                    : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex items-center gap-2.5 text-left">
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-sm font-mono font-bold ${
                    visualTheme === "neon-lab" ? "bg-cyan-500/10 text-cyan-400" : "bg-emerald-500/10 text-emerald-700"
                  }`}>
                    📊
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-wider font-mono">Panel Analisis Data Statistik</h4>
                    <p className="text-[10px] text-zinc-500">Metrik rasio unsur makro (air, udara, api, tanah, samudera).</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLibraryStats(!showLibraryStats)}
                  className={`px-4 py-1.5 rounded-xl font-mono text-[10.5px] font-black tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-1.5 shadow ${
                    showLibraryStats
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/15"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black hover:scale-[1.02]"
                  }`}
                >
                  <span>{showLibraryStats ? "🙈 Sembunyikan Statistik" : "📶 Tampilkan Seluruh Grafik & Statistik"}</span>
                </button>
              </div>

              {showLibraryStats && (
                <div className="animate-fade-in animate-duration-250">
                  {/* Dynamic Interactive SVG Charts & Metric Cards */}
                  <OverviewStats researches={researches} />
                </div>
              )}

              {/* Form and Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left partition - Main Form Desk */}
                <div className={`${activeDevice === "mobile" ? "col-span-1" : "lg:col-span-4"} space-y-6`}>
                  <ResearchForm onAddResearch={handleAddResearch} isOffline={isOffline} />

                  <div className="bg-emerald-50/30 rounded-3xl p-6 border border-emerald-105/20 text-xs text-slate-650 space-y-3">
                    <h4 className="font-bold flex items-center gap-2 text-emerald-800 uppercase font-mono tracking-wider">
                      <Info size={14} />
                      Pedoman Riset Litera
                    </h4>
                    <p className="text-justify leading-relaxed">
                      Asisten kecerdasan buatan menyaring database literatur berstandar global untuk menjawab rumusan pertanyaan Anda secara terstruktur.
                    </p>
                    <div className="pt-2 border-t border-emerald-100 grid grid-cols-2 gap-2 text-[10px] font-mono text-emerald-700">
                      <div>&bull; Air & Udara</div>
                      <div>&bull; Api & Tanah</div>
                      <div>&bull; Ekonomi & Regulasi</div>
                      <div>&bull; Samudera & Fiskal</div>
                    </div>
                  </div>
                </div>

                {/* Right partition - Filter Navigation & Lists */}
                <div className={`${activeDevice === "mobile" ? "col-span-1" : "lg:col-span-8"} space-y-6`}>
                  {/* Category selection bar */}
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedTag={selectedTag}
                    onSelectTag={setSelectedTag}
                    availableTags={availableTags}
                    activeLanguage={activeLanguage}
                  />

                  {/* Selected stats bar */}
                  {(selectedCategory || selectedTag || searchQuery) && (
                    <div className="flex items-center justify-between bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl text-xs text-slate-600 font-mono">
                      <span>
                        Hasil saringan: ditemukan <strong className="text-slate-900">{filteredResearches.length}</strong> dari <strong className="text-slate-900">{researches.length}</strong> riset
                      </span>
                      <button
                        id="clear-all-filters-btn"
                        onClick={() => {
                          setSelectedCategory("");
                          setSelectedTag("");
                          setSearchQuery("");
                        }}
                        className="text-emerald-600 hover:text-emerald-800 font-bold transition cursor-pointer"
                      >
                        Bersihkan Filter
                      </button>
                    </div>
                  )}

                  {/* Research output card lists */}
                  <div className="space-y-6">
                    {filteredResearches.length > 0 ? (
                      filteredResearches.map((res) => (
                        <ResearchCard
                          key={res.id}
                          research={res}
                          onDelete={isSovereignActive ? handleDeleteResearch : undefined}
                          activeLanguage={activeLanguage}
                        />
                      ))
                    ) : (
                      <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-4 shadow-3xs">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                          <SearchX size={32} />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-800">Tidak ada kajian riset yang cocok</h4>
                          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                            Cobalah mengubah kata kunci saringan, atau tuliskan pertanyaan riset baru di panel sebelah kiri untuk dianalisis oleh asisten litera.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {mainActiveTab === "ai_workspace" && (
            <div className="space-y-8 animate-fade-in animate-duration-250">
              {/* Pusat Kolaborasi & Simulasi 9 Agen AI */}
              <div className="my-0">
                <AIAgentsWorkspace 
                  visualTheme={visualTheme} 
                  currentUser={currentUser}
                  isGuestPremiumUnlocked={isGuestPremiumUnlocked}
                  guestTrialTokens={guestTrialTokens}
                  setGuestTrialTokens={setGuestTrialTokens}
                  onRequestCheckout={() => setIsCheckoutModalOpen(true)}
                  researches={researches}
                  logVisitorInteraction={logVisitorInteraction}
                />
              </div>

              {/* Laporan Transparansi Kelemahan & Kekurangan Aplikasi (Automatic Audit Node) */}
              <div className="my-0">
                <ApplicationAudit visualTheme={visualTheme} researchesCount={researches.length} />
              </div>

              {/* Scientific Experiment and Exploration Mathematics Lab */}
              <div className="my-0">
                <ScientificLab visualTheme={visualTheme} />
              </div>
            </div>
          )}

          {mainActiveTab === "sentinel" && (
            <div className="space-y-8 animate-fade-in animate-duration-250">
              {isFeatureUnlocked ? (
                <>
                  {/* Real-time World Advancements Sync Console */}
                  <div className="my-0">
                    <RealtimeWorldFeed 
                      researches={researches}
                      onAddResearch={handleAddResearch}
                      visualTheme={visualTheme}
                      saveToStorage={saveToStorage}
                    />
                  </div>

                  {/* Visitor Monitoring Desk (Show/Hide Visitors) */}
                  <div className="my-0">
                    <VisitorMonitor currentUser={currentUser} visualTheme={visualTheme} />
                  </div>

                  {/* Owner-only Sovereign Telemetry and Presentation Dashboard */}
                  {isSovereignActive && (
                    <div className="my-0 animate-fade-in animate-duration-250">
                      <SovereignTelemetry visualTheme={visualTheme} />
                    </div>
                  )}

                  {/* Cyber Security and Anti-Phishing protection shield desk */}
                  <div className="my-0">
                    <SecurityConsole currentUser={currentUser} visualTheme={visualTheme} />
                  </div>

                  {/* Local Database Studio and Control Panel */}
                  <div className="my-0">
                    <DatabaseControl 
                      researches={researches}
                      onImportDatabase={handleImportDatabase}
                      onClearDatabase={handleClearDatabase}
                      onRestoreDefaults={handleRestoreDefaults}
                    />
                  </div>
                </>
              ) : (
                /* Unified Premium/Sovereign Sentinel-2 Gateway Portal - Super Compact & Ultra Sleek */
                <div className="my-0 p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center relative overflow-hidden backdrop-blur-xs shadow-2xl">
                  <div className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.02]" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="max-w-xl mx-auto space-y-6 relative z-10">
                    <div className="inline-flex px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider animate-pulse items-center gap-1.5 mx-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      <span>📡 INTEGRITAS SENTINEL (PREMIUM ONLY)</span>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-extrabold text-slate-100 flex items-center justify-center gap-2">
                        <span>🛰️</span>
                        <span>Satelit Monitoring & Kontrol Siber</span>
                      </h3>
                      <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                        Sistem satelit mendeteksi anomali server, sandboxing draf kajian, serta jalur sinkronisasi umpan global terenkripsi otomatis.
                      </p>
                    </div>

                    {/* Elegant bento features preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
                      <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-2xl flex items-start gap-2.5">
                        <span className="text-sm shrink-0">📡</span>
                        <div>
                          <h4 className="text-[11px] font-bold text-slate-200">Umpan Global Saintek</h4>
                          <p className="text-[9.5px] text-slate-400 leading-snug">Sinkronisasi asinkron literatur regulasi & satelit real-time.</p>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-2xl flex items-start gap-2.5">
                        <span className="text-sm shrink-0">👁️</span>
                        <div>
                          <h4 className="text-[11px] font-bold text-slate-200">Trace Proxy Pengunjung</h4>
                          <p className="text-[9.5px] text-slate-400 leading-snug">Lacak alamat IP luar, model browser, & audit enkripsi.</p>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-2xl flex items-start gap-2.5">
                        <span className="text-sm shrink-0">🛡️</span>
                        <div>
                          <h4 className="text-[11px] font-bold text-slate-200">Sandbox Anti-Defacing</h4>
                          <p className="text-[9.5px] text-slate-400 leading-snug">Perisai pertahanan draf draf penelitian dari manipulasi siber.</p>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-2xl flex items-start gap-2.5">
                        <span className="text-sm shrink-0">🗄️</span>
                        <div>
                          <h4 className="text-[11px] font-bold text-slate-200">Pusat Studio Database</h4>
                          <p className="text-[9.5px] text-slate-400 leading-snug">Impor, salin cadangan data, & pemulihan total basis draf.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <button
                        onClick={() => setIsCheckoutModalOpen(true)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-mono font-black text-[9.5px] rounded-xl transition duration-200 cursor-pointer uppercase flex items-center gap-1 mx-auto shadow"
                      >
                        <span>⚡ Hubung Jaringan Sentinel (Sovereign Pass)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Universal Multilingual Translation Hub */}
              <div className="my-0">
                <TranslationHub 
                  activeLanguage={activeLanguage}
                  onLanguageChange={handleLanguageChange}
                  visualTheme={visualTheme}
                />
              </div>
            </div>
          )}
        </main>
      </DeviceSimulator>

      {/* Footer copyright */}
      <footer className="mt-20 border-t border-slate-200/50 py-8 text-center text-xs text-slate-400 font-mono">
        <div>&copy; {new Date().getFullYear()} Pustaka Analisis & Riset Terakreditasi. Seluruh Hak Cipta Dilindungi Hukum.</div>
        <div className="text-[10px] mt-1 text-slate-350">Mendukung Standar Literasi, Regulasi, Batasan, dan Pembangunan Berkelanjutan Global.</div>
      </footer>

      {/* Auth Modal Overlay */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={handleAuthSuccess} 
      />

      {/* Checkout Modal Overlay */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSuccess={handlePurchaseSuccess}
        visualTheme={visualTheme}
      />
    </div>
  );
}
