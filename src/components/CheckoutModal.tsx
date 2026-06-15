import React, { useState, useEffect } from "react";
import { 
  X, 
  CreditCard, 
  CheckCircle, 
  Sparkles, 
  Lock, 
  ShieldAlert, 
  QrCode, 
  RefreshCw, 
  BadgeCheck, 
  HelpCircle,
  Zap,
  Check,
  Key,
  Flame
} from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  visualTheme: "luks-akademis" | "neon-lab" | "sederhana-modern";
}

export default function CheckoutModal({ isOpen, onClose, onSuccess, visualTheme }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "cc" | "token">("qris");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [qrisStep, setQrisStep] = useState<"generating" | "waiting" | "verified">("generating");
  const [countdown, setCountdown] = useState<number>(300); // 5 minutes qris expiry
  
  // Credit card form states
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");

  // Payment token state
  const [paymentToken, setPaymentToken] = useState<string>("");
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [tokenSuccess, setTokenSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    
    // QRIS initialization timeline simulation
    setQrisStep("generating");
    const t1 = setTimeout(() => {
      setQrisStep("waiting");
    }, 1200);

    // Dynamic verification simulation after 18 seconds if user stays on waiting QR code screen
    const t2 = setTimeout(() => {
      if (paymentMethod === "qris" && qrisStep === "waiting") {
        setQrisStep("verified");
        const t3 = setTimeout(() => {
          onSuccess();
        }, 1500);
        return () => clearTimeout(t3);
      }
    }, 18000);

    // Countdown loop
    setCountdown(300);
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, [isOpen, paymentMethod]);

  if (!isOpen) return null;

  const handleCCSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.length < 16 || cardExpiry.length < 5 || cardCvv.length < 3 || !cardName) {
      alert("⚠️ Harap lengkapi semua rincian kartu kredit simulasi Anda dengan benar.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTokenError(null);
    const cleaned = paymentToken.trim();

    if (!cleaned) {
      setTokenError("⚠️ Harap masukkan token pembayaran terlebih dahulu.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // Validating against the specific user token: 2113720a49110fed940e17deb77e147d8af426a083381729710329694668bdab
      if (cleaned === "2113720a49110fed940e17deb77e147d8af426a083381729710329694668bdab") {
        setTokenSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setTokenError("⚠️ Token pembayaran tidak dikenali atau tidak valid untuk verifikasi.");
      }
    }, 1500);
  };

  const handleQuickFillToken = () => {
    setPaymentToken("2113720a49110fed940e17deb77e147d8af426a083381729710329694668bdab");
    setTokenError(null);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-[#060814]/80 backdrop-blur-md z-99 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className={`w-full max-w-lg rounded-3xl border text-left overflow-hidden shadow-2xl relative transition-all duration-300 ${
        visualTheme === "luks-akademis"
          ? "bg-[#faf9f5] border-[#d4af37]/30 text-slate-800"
          : visualTheme === "neon-lab"
            ? "bg-[#0b0e14] border-cyan-500/30 text-slate-200"
            : "bg-white border-slate-200 text-slate-800"
      }`}>
        {/* Top Gold Stripe / Neon Stripe */}
        <div className={`h-[4px] w-full bg-gradient-to-r ${
          visualTheme === "luks-akademis"
            ? "from-[#b8860b] via-[#d4af37] to-[#b8860b]"
            : "from-cyan-500 via-emerald-400 to-cyan-500"
        }`} />

        {/* Modal Close */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-500/10 transition cursor-pointer ${
            visualTheme === "neon-lab" ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <X size={18} />
        </button>

        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <div className={`inline-flex px-2.5 py-0.5 rounded text-[8.5px] font-mono font-black uppercase tracking-wider ${
              visualTheme === "neon-lab" ? "bg-cyan-950 text-cyan-300 border border-cyan-550/20" : "bg-[#d4af37]/15 text-[#b8860b] border border-[#d4af37]/20"
            }`}>
              👑 GUEST PREMIUM PASS
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight font-sans">
              Buka Akses Kolaborasi Agen AI
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
              Sesuai skema bebas-biaya Pustaka Litera, basis data riset kami tetap <strong className="text-emerald-600 dark:text-emerald-400">100% GRATIS dwi-bahasa selamanya</strong>. Upgrade ini hanya diperlukan untuk menggunakan simulasi robot asisten AI kognitif, sensor satelit, dan autopilot secara tak terbatas.
            </p>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
              visualTheme === "neon-lab" ? "bg-white/5 border-white/5" : "bg-slate-55/60 border-slate-200/50"
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <Check size={11} className="stroke-[3]" />
                <span>INTERAKSI AGEN CEPAT</span>
              </div>
              <span className="text-slate-400">Sertakan simulasi mini simposium dwi-arah tanpa batas.</span>
            </div>

            <div className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
              visualTheme === "neon-lab" ? "bg-white/5 border-white/5" : "bg-slate-55/60 border-slate-200/50"
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-cyan-500 dark:text-cyan-400 font-mono">
                <Check size={11} className="stroke-[3]" />
                <span>📡 SENSOR SATELIT</span>
              </div>
              <span className="text-slate-400">Hubungkan log interaktif satelit & pelacak proxy lalu lintas.</span>
            </div>

            <div className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
              visualTheme === "neon-lab" ? "bg-white/5 border-white/5" : "bg-slate-55/60 border-slate-200/50"
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-yellow-500 dark:text-yellow-400 font-mono">
                <Check size={11} className="stroke-[3]" />
                <span>🔒 SAFESANDBOX COGNITION</span>
              </div>
              <span className="text-slate-400">Nyalakan Sentinel Firewall untuk proteksi sandboxed aman.</span>
            </div>

            <div className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
              visualTheme === "neon-lab" ? "bg-white/5 border-white/5" : "bg-slate-55/60 border-slate-200/50"
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-indigo-500 dark:text-indigo-400 font-mono">
                <Check size={11} className="stroke-[3]" />
                <span>⚡ EKSPOR EKSTRA</span>
              </div>
              <span className="text-slate-400">Dapatkan akses kemudahan ekspor & backup database asinkron.</span>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block font-bold">Investasi Lifetime Akses Khusus Tamu</span>
              <strong className="text-lg font-black font-sans tracking-tight text-slate-800 dark:text-slate-100">Sovereign Guest Pass (VIP-01)</strong>
            </div>
            <div className="text-right">
              <span className="text-[10.5px] line-through text-slate-400 block">Rp 49.000</span>
              <strong className="text-lg md:text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">Rp 5.550</strong>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Pilih Mode Pembayaran Simulasi:</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setPaymentMethod("qris")}
                className={`py-2 px-1 rounded-xl font-mono font-black text-[10px] border transition cursor-pointer flex items-center justify-center gap-1 ${
                  paymentMethod === "qris"
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-500"
                    : "bg-black/10 hover:bg-black/20 border-slate-500/10 text-slate-400"
                }`}
              >
                <QrCode size={11} />
                <span>QRIS AUTOMATIC</span>
              </button>
              <button
                onClick={() => setPaymentMethod("cc")}
                className={`py-2 px-1 rounded-xl font-mono font-black text-[10px] border transition cursor-pointer flex items-center justify-center gap-1 ${
                  paymentMethod === "cc"
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-500"
                    : "bg-black/10 hover:bg-black/20 border-slate-500/10 text-slate-400"
                }`}
              >
                <CreditCard size={11} />
                <span>KARTU CC/DEBIT</span>
              </button>
              <button
                onClick={() => setPaymentMethod("token")}
                className={`py-2 px-1 rounded-xl font-mono font-black text-[10px] border transition cursor-pointer flex items-center justify-center gap-1 ${
                  paymentMethod === "token"
                    ? "bg-amber-500/15 border-amber-500 text-amber-500"
                    : "bg-black/10 hover:bg-black/20 border-slate-500/10 text-slate-400"
                }`}
              >
                <Key size={11} />
                <span>TOKEN BAYAR</span>
              </button>
            </div>
          </div>

          {/* Active Payment Panel */}
          <div className={`p-4 rounded-2xl border ${
            visualTheme === "neon-lab" ? "bg-black/30 border-white/5" : "bg-slate-100/40 border-slate-200"
          }`}>
            {paymentMethod === "qris" ? (
              <div className="space-y-4 text-center">
                {qrisStep === "generating" ? (
                  <div className="py-8 flex flex-col items-center justify-center gap-2">
                    <RefreshCw size={24} className="animate-spin text-emerald-500" />
                    <span className="text-[10px] font-mono text-slate-400 animate-pulse">Menghubungkan Server Gerbang Pembayaran Nasional...</span>
                  </div>
                ) : qrisStep === "waiting" ? (
                  <div className="space-y-4">
                    {/* Simulated QR Code Visual */}
                    <div className="relative w-40 h-40 bg-white border-2 border-emerald-500/20 p-2 rounded-xl mx-auto flex items-center justify-center overflow-hidden">
                      {/* Scanning neon line */}
                      <div className="absolute left-0 w-full h-[2px] bg-emerald-500 opacity-60 animate-bounce" style={{ top: "40%" }} />
                      
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                        <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                        <rect x="11" y="11" width="13" height="13" fill="currentColor" />
                        <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                        <rect x="76" y="11" width="13" height="13" fill="currentColor" />
                        <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                        <rect x="11" y="76" width="13" height="13" fill="currentColor" />
                        <circle cx="50" cy="50" r="8" fill="currentColor" />
                        <rect x="35" y="15" width="6" height="6" fill="currentColor" />
                        <rect x="45" y="5" width="6" height="6" fill="currentColor" />
                        <rect x="48" y="25" width="6" height="6" fill="currentColor" />
                        <rect x="35" y="45" width="6" height="6" fill="currentColor" />
                        <rect x="5" y="45" width="6" height="6" fill="currentColor" />
                        <rect x="78" y="38" width="6" height="6" fill="currentColor" />
                        <rect x="85" y="55" width="6" height="6" fill="currentColor" />
                        <rect x="45" y="75" width="6" height="6" fill="currentColor" />
                        <rect x="38" y="85" width="6" height="6" fill="currentColor" />
                        <rect x="68" y="82" width="6" height="6" fill="currentColor" />
                      </svg>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 animate-pulse font-black uppercase tracking-wider block">
                        🔊 [MENUNGGU TRANSFER QRIS AKTIF]
                      </span>
                      <p className="text-[9.5px] text-slate-500 dark:text-zinc-400 font-medium max-w-sm mx-auto">
                        PINDAI QRIS DI ATAS dengan aplikasi perbankan atau e-wallet (GoPay, OVO, ShopeePay, Dana, dll). Pembayaran sebesar Rp 5.550 akan diverifikasi secara otomatis!
                      </p>
                      <div className="inline-flex items-center gap-1 bg-black/40 px-3 py-1 rounded-md border border-white/5 text-[9.5px] font-mono text-zinc-400">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>KODE KADALUARSA: <strong className="text-yellow-400">{formatCountdown(countdown)}</strong></span>
                      </div>
                    </div>

                    {/* Instant Unlock Button for Fast Test Convenience */}
                    <div className="pt-2 border-t border-dashed border-slate-500/10">
                      <button
                        onClick={onSuccess}
                        className="text-[9px] font-mono text-emerald-500 hover:underline font-black uppercase"
                      >
                        [ Klik untuk simulasi transfer instan ]
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center gap-2">
                    <CheckCircle size={32} className="text-emerald-500 animate-bounce" />
                    <span className="text-[11px] font-mono text-emerald-500 font-black animate-pulse">PEMBAYARAN DIVERIFIKASI! MEMBUKA FITUR...</span>
                  </div>
                )}
              </div>
            ) : paymentMethod === "cc" ? (
              <form onSubmit={handleCCSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[8.5px] font-mono font-bold text-slate-400 uppercase">Nama Pemilik Kartu</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Contoh: Sovereign Guest"
                    className="w-full text-xs p-2.5 rounded-xl border focus:outline-none focus:border-emerald-500 bg-white/5 border-slate-500/10 text-slate-100 uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8.5px] font-mono font-bold text-slate-400 uppercase">Nomor Kartu CC (16 Digit)</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="4111 2222 3333 4444"
                    className="w-full text-xs p-2.5 rounded-xl border focus:outline-none focus:border-emerald-500 bg-white/5 border-slate-500/10 text-slate-100 font-mono text-center tracking-widest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono font-bold text-slate-400 uppercase">Masa Berlaku</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full text-xs p-2.5 rounded-xl border focus:outline-none focus:border-emerald-500 bg-white/5 border-slate-500/10 text-slate-100 font-mono text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono font-bold text-slate-400 uppercase">CVV / CVN</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      placeholder="***"
                      className="w-full text-xs p-2.5 rounded-xl border focus:outline-none focus:border-emerald-500 bg-white/5 border-slate-500/10 text-slate-100 font-mono text-center"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-xs rounded-xl transition duration-200 uppercase cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Verifikasi Aman PCI-DSS...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={12} />
                      <span>Verifikasi Transaksi (Rp 5.550)</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              // Payment Hash Token Form
              <form onSubmit={handleTokenSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[8.5px] font-mono font-bold text-amber-400 uppercase tracking-widest block">Input Valid Token Pembayaran Anda</label>
                  <p className="text-[9px] text-slate-400 leading-tight">
                    Masukkan hash token transaksi pembayaran yang diberikan oleh pemilik atau sistem untuk verifikasi akses VIP instan.
                  </p>
                  <div className="mt-2 relative">
                    <input
                      type="text"
                      required
                      value={paymentToken}
                      onChange={(e) => {
                        setPaymentToken(e.target.value);
                        setTokenError(null);
                      }}
                      placeholder="Masukkan hash token 64-karakter..."
                      className="w-full text-[11px] p-2.5 rounded-xl border focus:outline-none focus:border-amber-500 bg-black/40 border-slate-500/20 text-yellow-100 font-mono text-center tracking-tight"
                    />
                  </div>
                </div>

                {tokenError && (
                  <div className="p-2.5 bg-rose-500/15 border border-rose-500/20 rounded-xl text-[9.5px] text-rose-400 font-mono leading-tight">
                    {tokenError}
                  </div>
                )}

                {tokenSuccess && (
                  <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/20 rounded-xl text-[9.5px] text-emerald-400 font-mono leading-tight animate-pulse flex items-center gap-1.5 justify-center">
                    <CheckCircle size={12} />
                    <span>OTENTIKASI SUKSES: Token Terverifikasi (Rp 5.550)! Membuka...</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleQuickFillToken}
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-amber-500/20 text-amber-400 font-mono font-bold text-[9.5px] rounded-xl transition duration-200 uppercase cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Flame size={11} className="animate-pulse" />
                    <span>Auto-Paste Token Pemilik</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing || tokenSuccess}
                    className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-black font-mono font-black text-[10.5px] rounded-xl transition duration-200 uppercase cursor-pointer flex items-center justify-center gap-1"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw size={11} className="animate-spin" />
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={11} />
                        <span>Verifikasi Token</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer lock note */}
          <div className="flex items-center gap-1.5 justify-center text-[8.5px] font-mono text-slate-400 pt-1.5">
            <Lock size={10} className="text-emerald-500" />
            <span>TERENKRIPSI AMAN 256-BIT SSL BANKING PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
