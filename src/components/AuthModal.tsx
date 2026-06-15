import React, { useState } from "react";
import { User } from "../types";
import { X, Mail, Lock, User as UserIcon, UserPlus, LogIn, ShieldCheck, RefreshCw } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLoginTab, setIsLoginTab] = useState<boolean>(true);
  
  // Login Form States
  const [loginEmailOrUser, setLoginEmailOrUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register Form States
  const [regUsername, setRegUsername] = useState("");
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  
  // Feedback Messages
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  // Retrieve user lists from localStorage
  const getStoredUsers = (): User[] => {
    const raw = localStorage.getItem("litera_users");
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // 1. Lockdown check
    if (localStorage.getItem("litera_lockdown_active") === "true") {
      setErrorMsg("❌ BLOKADE: Akses otentikasi login dikunci sementara demi deinfeksi pasca serangan siber.");
      return;
    }

    if (!loginEmailOrUser || !loginPassword) {
      setErrorMsg("Harap isi semua kolom formulir.");
      return;
    }

    // 2. SQL injection detection / XSS threat detector
    const sqliPattern = /'|--|or\s+1\s*=\s*1|union\s+select/i;
    const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|onclick|onload|onerror|javascript:/i;
    
    if (sqliPattern.test(loginEmailOrUser) || sqliPattern.test(loginPassword)) {
      const event = new CustomEvent("litera-security-threat", {
        detail: {
          type: "SQL_INJECTION",
          payload: "Email/User input: " + loginEmailOrUser.substring(0, 30),
          message: "Upaya pembajakan login SQL Injection terdeteksi di form Autentikasi. Akses ditolak dan direkam.",
          severity: "CRITICAL"
        }
      });
      window.dispatchEvent(event);
      setErrorMsg("⚠️ DETEKSI ANCAMAN SIBER: Percobaan injeksi karakter SQL diblokir oleh sistem.");
      return;
    }

    if (xssPattern.test(loginEmailOrUser)) {
      const event = new CustomEvent("litera-security-threat", {
        detail: {
          type: "XSS",
          payload: "HTML/Script tags detected",
          message: "Tag script di parameter Email Login dilumpuhkan instan.",
          severity: "HIGH"
        }
      });
      window.dispatchEvent(event);
      setErrorMsg("⚠️ DETEKSI ANCAMAN SIBER: Input skrip asing (XSS) dibersihkan.");
      return;
    }

    const users = getStoredUsers();
    // Seek user with matching username or email
    const match = users.find(
      (u) => 
        (u.email.toLowerCase() === loginEmailOrUser.toLowerCase() || 
         u.username.toLowerCase() === loginEmailOrUser.toLowerCase()) && 
        u.password === loginPassword
    );

    if (match) {
      setSuccessMsg(`Selamat datang kembali, ${match.fullName || match.username}!`);
      setTimeout(() => {
        onAuthSuccess(match);
        onClose();
        // Reset state
        setLoginEmailOrUser("");
        setLoginPassword("");
        setSuccessMsg("");
      }, 1000);
    } else {
      setErrorMsg("Email/Username atau Kata Sandi yang dimasukkan salah!");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // 1. Lockdown check
    if (localStorage.getItem("litera_lockdown_active") === "true") {
      setErrorMsg("❌ BLOKADE: Pendaftaran akun baru ditutup sementara selama status Lockdown aktif.");
      return;
    }

    if (!regUsername || !regEmail || !regPassword || !regFullName) {
      setErrorMsg("Semua kolom registrasi wajib diisi.");
      return;
    }

    // 2. Query/XSS sanitization in registration forms
    const sqliPattern = /'|--|or\s+1\s*=\s*1|union\s+select/i;
    const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|onclick|onload|onerror|javascript:/i;

    if (sqliPattern.test(regUsername) || sqliPattern.test(regFullName) || sqliPattern.test(regEmail)) {
      const event = new CustomEvent("litera-security-threat", {
        detail: {
          type: "SQL_INJECTION",
          payload: "RegUser: " + regUsername,
          message: "Upaya pembajakan registrasi SQL Injection digagalkan otomatis di form input pendaftaran.",
          severity: "CRITICAL"
        }
      });
      window.dispatchEvent(event);
      setErrorMsg("⚠️ SISTEM KEAMANAN: Terdeteksi karakter query berbahaya. Registrasi ditolak.");
      return;
    }

    if (xssPattern.test(regUsername) || xssPattern.test(regFullName)) {
      const event = new CustomEvent("litera-security-threat", {
        detail: {
          type: "XSS",
          payload: "RegUsername/FullName",
          message: "Script tag berbahaya pada parameter pendaftaran nama dihilangkan.",
          severity: "HIGH"
        }
      });
      window.dispatchEvent(event);
      setErrorMsg("⚠️ SISTEM KEAMANAN: Tag HTML/JS tidak diperbolehkan pada nama pendaftaran.");
      return;
    }

    if (regUsername.length < 3) {
      setErrorMsg("Username minimal harus terdiri dari 3 karakter.");
      return;
    }

    if (!regEmail.includes("@") || !regEmail.includes(".")) {
      setErrorMsg("Format alamat email tidak valid.");
      return;
    }

    if (regPassword.length < 5) {
      setErrorMsg("Kata sandi minimal harus terdiri dari 5 karakter demi keamanan.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak sesuai dengan sandi utama.");
      return;
    }

    const users = getStoredUsers();
    const isEmailTaken = users.some((u) => u.email.toLowerCase() === regEmail.toLowerCase());
    const isUserTaken = users.some((u) => u.username.toLowerCase() === regUsername.toLowerCase());

    if (isEmailTaken) {
      setErrorMsg("Email ini sudah terdaftar. Silakan gunakan email lain.");
      return;
    }

    if (isUserTaken) {
      setErrorMsg("Username ini sudah digunakan pihak lain.");
      return;
    }

    // Register user
    const newUser: User = {
      username: regUsername.trim(),
      fullName: regFullName.trim(),
      email: regEmail.trim().toLowerCase(),
      password: regPassword, // In a local mockup app, we store plain/secured string in localStorage
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("litera_users", JSON.stringify(updatedUsers));
    
    setSuccessMsg("Pendaftaran berhasil! Mengalihkan ke halaman masuk...");
    setTimeout(() => {
      // Automatic login after successful creation or switch to login tab
      setIsLoginTab(true);
      setLoginEmailOrUser(regEmail);
      setLoginPassword(regPassword);
      setSuccessMsg("");
      
      // Clear registration inputs
      setRegUsername("");
      setRegFullName("");
      setRegEmail("");
      setRegPassword("");
      setRegConfirmPassword("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      {/* Modal Frame */}
      <div 
        id="auth-modal-container"
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden border border-slate-100 shadow-2xl flex flex-col relative animate-fade-in"
      >
        {/* Header Tab panel */}
        <div className="bg-slate-950 px-6 pt-6 pb-4 text-white relative">
          <button 
            id="close-auth-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
            title="Tutup dialog"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center gap-2.5 mb-2">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <ShieldCheck size={16} />
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              Gerbang Otentikasi
            </span>
          </div>
          
          <h3 className="text-lg font-bold font-sans">
            Sistem Profil Riset Litera
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Daftar & Masuk untuk menyimpan dan mengorganisir riwayat rujukan riset Anda.
          </p>

          {/* Tab Selector Buttons */}
          <div className="flex gap-2 mt-4 bg-slate-900/95 p-1 rounded-2xl border border-slate-800/80">
            <button
              onClick={() => {
                setIsLoginTab(true);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                isLoginTab 
                  ? "bg-slate-800 text-emerald-400 shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Sign In (Masuk)
            </button>
            <button
              onClick={() => {
                setIsLoginTab(false);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                !isLoginTab 
                  ? "bg-slate-800 text-emerald-400 shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Register (Daftar)
            </button>
          </div>
        </div>

        {/* Form area */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-rose-700 text-xs font-mono rounded-r-xl">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-xs font-mono rounded-r-xl flex items-center gap-2">
              <RefreshCw size={12} className="animate-spin" />
              <span>{successMsg}</span>
            </div>
          )}

          {isLoginTab ? (
            /* LOGIN FORM VIEW */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 font-mono mb-1.5 uppercase tracking-wider">
                  Email atau Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input
                    id="login-credential-input"
                    type="text"
                    required
                    placeholder="Masukkan email atau nama akun..."
                    value={loginEmailOrUser}
                    onChange={(e) => setLoginEmailOrUser(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 font-mono mb-1.5 uppercase tracking-wider">
                  Kata Sandi (Password)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input
                    id="login-password-input"
                    type="password"
                    required
                    placeholder="Masukkan sandi..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans transition-all"
                  />
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] text-slate-400 font-mono leading-relaxed">
                * Kredensial disimpan secara aman di peramban lokal (LocalStorage) komputer Anda
              </div>

              <button
                id="submit-auth-login-btn"
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <LogIn size={14} />
                <span>MASUK SEKARANG</span>
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM VIEW */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 font-mono mb-1 uppercase tracking-wider">
                  Nama Lengkap (Full Name)
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 text-slate-400" size={15} />
                  <input
                    id="register-fullname-input"
                    type="text"
                    required
                    placeholder="Contoh: Dr. Irwan Hidayat"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 font-mono mb-1 uppercase tracking-wider">
                  Nama Akun (Username)
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-2.5 text-slate-400" size={15} />
                  <input
                    id="register-username-input"
                    type="text"
                    required
                    placeholder="Contoh: irwan123"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 font-mono mb-1 uppercase tracking-wider">
                  Alamat Email (Email Address)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-slate-400" size={15} />
                  <input
                    id="register-email-input"
                    type="email"
                    required
                    placeholder="Contoh: irwan@kampus.id"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 font-mono mb-1 uppercase tracking-wider">
                    Sandi (Password)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2 text-slate-400" size={14} />
                    <input
                      id="register-password-input"
                      type="password"
                      required
                      placeholder="Sandi..."
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 font-mono mb-1 uppercase tracking-wider">
                    Sandi Konfirmasi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2 text-slate-400" size={14} />
                    <input
                      id="register-confirm-password-input"
                      type="password"
                      required
                      placeholder="Konfirmasi..."
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                id="submit-auth-register-btn"
                type="submit"
                className="w-full py-2.5 mt-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-xl text-xs font-bold font-mono transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <UserCheckIcon size={14} />
                <span>DAFTARKAN PENGGUNA BARU</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function UserCheckIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}
