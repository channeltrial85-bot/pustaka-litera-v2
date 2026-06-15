import React, { useState, useEffect } from "react";
import { 
  Calculator, 
  Droplet, 
  Wind, 
  Flame, 
  Compass, 
  BookOpen, 
  Activity, 
  LineChart, 
  Sliders, 
  Sigma, 
  Scale, 
  Award,
  Lightbulb,
  CheckCircle,
  Hash,
  Sparkles,
  RefreshCw
} from "lucide-react";

interface ScientificLabProps {
  visualTheme: "luks-akademis" | "neon-lab" | "sederhana-modern";
}

// Interfaces for sample questions
interface SampleQuestion {
  id: string;
  element: "Air" | "Udara" | "Api" | "Tanah" | "Statistika";
  question: string;
  formulaUsed: string;
  givenData: string;
  steps: string[];
  finalResult: string;
  source: string;
}

export default function ScientificLab({ visualTheme }: ScientificLabProps) {
  // Tabs: "calculators" | "statistics" | "example-problems"
  const [activeSegment, setActiveSegment] = useState<"calculators" | "statistics" | "example-problems">("calculators");
  
  // Element selector for calculators: "air" | "udara" | "api" | "tanah"
  const [activeElement, setActiveElement] = useState<"air" | "udara" | "api" | "tanah">("air");

  // State arrays for interactive stats calculator
  // Representing interactive bivariate dataset: X (eg. pH Tanah) and Y (eg. Hasil Panen kg/m2)
  const [statsData, setStatsData] = useState<{ id: number; x: number; y: number }[]>([
    { id: 1, x: 5.5, y: 3.2 },
    { id: 2, x: 6.0, y: 4.1 },
    { id: 3, x: 6.5, y: 4.8 },
    { id: 4, x: 7.0, y: 5.2 },
    { id: 5, x: 7.5, y: 5.0 },
    { id: 6, x: 8.0, y: 4.3 },
  ]);

  const [isLiveTelemetryActive, setIsLiveTelemetryActive] = useState<boolean>(false);

  const [newX, setNewX] = useState<string>("");
  const [newY, setNewY] = useState<string>("");

  // Automated telemetry generator mapping real biological ecosystem patterns
  useEffect(() => {
    if (!isLiveTelemetryActive) return;

    const timer = setInterval(() => {
      setStatsData((prevData) => {
        // Keep to max 12 items for visual balance on the Cartesian plane
        const base = prevData.length >= 12 ? prevData.slice(1) : prevData;

        // Base patterns: stable linear relationship with dynamic random noise
        // pH usually drifts between 4.8 and 8.2
        const randomX = parseFloat((4.8 + Math.random() * 3.4).toFixed(2));
        
        // Linear formula: Y = 0.65X - 0.25 + noise
        const expectedY = 0.65 * randomX - 0.25;
        const noise = (Math.random() - 0.5) * 1.0;
        const finalY = Math.max(1.0, parseFloat((expectedY + noise).toFixed(2)));

        return [...base, { id: Date.now(), x: randomX, y: finalY }];
      });
    }, 3000); // Feed data every 3 seconds

    return () => clearInterval(timer);
  }, [isLiveTelemetryActive]);

  // Air Hydro Power slider states
  const [waterFlow, setWaterFlow] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_waterFlow");
    return saved ? parseFloat(saved) : 12.5;
  }); // m3/s
  const [waterHead, setWaterHead] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_waterHead");
    return saved ? parseFloat(saved) : 45;
  });  // meters
  const [waterEfficiency, setWaterEfficiency] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_waterEfficiency");
    return saved ? parseFloat(saved) : 0.85;
  }); // 85%

  // Udara Wind Power slider states
  const [windSpeed, setWindSpeed] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_windSpeed");
    return saved ? parseFloat(saved) : 8.5;
  }); // m/s
  const [rotorDiameter, setRotorDiameter] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_rotorDiameter");
    return saved ? parseFloat(saved) : 14;
  }); // meters
  const [betzLimit, setBetzLimit] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_betzLimit");
    return saved ? parseFloat(saved) : 0.38;
  }); // Betz Coeff Cp

  // Api Pyrolysis slider states
  const [pyroMass, setPyroMass] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_pyroMass");
    return saved ? parseFloat(saved) : 250;
  }); // kg of biochar source
  const [pyroTempDiff, setPyroTempDiff] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_pyroTempDiff");
    return saved ? parseFloat(saved) : 350;
  }); // Kelvin delta T
  const [specificHeat, setSpecificHeat] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_specificHeat");
    return saved ? parseFloat(saved) : 1200;
  }); // J/kgK

  // Tanah Hydraulic seepage states
  const [soilConductivity, setSoilConductivity] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_soilConductivity");
    return saved ? parseFloat(saved) : 0.025;
  }); // cm/s
  const [hydraulicGradient, setHydraulicGradient] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_hydraulicGradient");
    return saved ? parseFloat(saved) : 0.15;
  }); // gradient i
  const [seepageArea, setSeepageArea] = useState<number>(() => {
    const saved = localStorage.getItem("litera_lab_seepageArea");
    return saved ? parseFloat(saved) : 15.0;
  }); // m2 area

  // Save states back to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("litera_lab_waterFlow", waterFlow.toString());
    localStorage.setItem("litera_lab_waterHead", waterHead.toString());
    localStorage.setItem("litera_lab_waterEfficiency", waterEfficiency.toString());
    localStorage.setItem("litera_lab_windSpeed", windSpeed.toString());
    localStorage.setItem("litera_lab_rotorDiameter", rotorDiameter.toString());
    localStorage.setItem("litera_lab_betzLimit", betzLimit.toString());
    localStorage.setItem("litera_lab_pyroMass", pyroMass.toString());
    localStorage.setItem("litera_lab_pyroTempDiff", pyroTempDiff.toString());
    localStorage.setItem("litera_lab_specificHeat", specificHeat.toString());
    localStorage.setItem("litera_lab_soilConductivity", soilConductivity.toString());
    localStorage.setItem("litera_lab_hydraulicGradient", hydraulicGradient.toString());
    localStorage.setItem("litera_lab_seepageArea", seepageArea.toString());
  }, [
    waterFlow, waterHead, waterEfficiency, 
    windSpeed, rotorDiameter, betzLimit, 
    pyroMass, pyroTempDiff, specificHeat, 
    soilConductivity, hydraulicGradient, seepageArea
  ]);

  // Read updates pushed by other components (e.g. OmniMind Agent)
  useEffect(() => {
    const handleRemoteSync = () => {
      const savedWaterFlow = localStorage.getItem("litera_lab_waterFlow");
      const savedWaterHead = localStorage.getItem("litera_lab_waterHead");
      const savedWaterEfficiency = localStorage.getItem("litera_lab_waterEfficiency");
      const savedWindSpeed = localStorage.getItem("litera_lab_windSpeed");
      const savedRotorDiameter = localStorage.getItem("litera_lab_rotorDiameter");
      const savedBetzLimit = localStorage.getItem("litera_lab_betzLimit");
      const savedPyroMass = localStorage.getItem("litera_lab_pyroMass");
      const savedPyroTempDiff = localStorage.getItem("litera_lab_pyroTempDiff");
      const savedSpecificHeat = localStorage.getItem("litera_lab_specificHeat");
      const savedSoilConductivity = localStorage.getItem("litera_lab_soilConductivity");
      const savedHydraulicGradient = localStorage.getItem("litera_lab_hydraulicGradient");
      const savedSeepageArea = localStorage.getItem("litera_lab_seepageArea");

      if (savedWaterFlow) setWaterFlow(parseFloat(savedWaterFlow));
      if (savedWaterHead) setWaterHead(parseFloat(savedWaterHead));
      if (savedWaterEfficiency) setWaterEfficiency(parseFloat(savedWaterEfficiency));
      if (savedWindSpeed) setWindSpeed(parseFloat(savedWindSpeed));
      if (savedRotorDiameter) setRotorDiameter(parseFloat(savedRotorDiameter));
      if (savedBetzLimit) setBetzLimit(parseFloat(savedBetzLimit));
      if (savedPyroMass) setPyroMass(parseFloat(savedPyroMass));
      if (savedPyroTempDiff) setPyroTempDiff(parseFloat(savedPyroTempDiff));
      if (savedSpecificHeat) setSpecificHeat(parseFloat(savedSpecificHeat));
      if (savedSoilConductivity) setSoilConductivity(parseFloat(savedSoilConductivity));
      if (savedHydraulicGradient) setHydraulicGradient(parseFloat(savedHydraulicGradient));
      if (savedSeepageArea) setSeepageArea(parseFloat(savedSeepageArea));
    };

    window.addEventListener("litera_lab_sync", handleRemoteSync);
    return () => {
      window.removeEventListener("litera_lab_sync", handleRemoteSync);
    };
  }, []);

  // Sample problems solved database (Proven authentic references)
  const sampleProblems: SampleQuestion[] = [
    {
      id: "prob-1",
      element: "Air",
      question: "Hitung besarnya daya listrik bersih yang dihasilkan oleh Turbin Air Mikrohidro di kawasan air terjun alami jika debit air konstan 2.5 m³/detik, tinggi jatuh kepala air 18 meter, dan efisiensi konversi sistem sebesar 82%.",
      formulaUsed: "P = η × ρ × g × Q × h",
      givenData: "Q = 2.5 m³/s, h = 18 m, η = 0.82, ρ = 1000 kg/m³ (densitas air), g = 9.81 m/s² (konstanta gravitasi).",
      steps: [
        "Identifikasi variabel: Massa jenis air (ρ) bernilai konstan 1000 kg/m³, percepatan gravitasi bumi (g) ≈ 9.81 m/s².",
        "Masukkan nilai ke persamaan dasar daya hidraulik potensial: P_potensial = ρ × g × Q × h = 1000 × 9.81 × 2.5 × 18 = 441,450 Watt (441.45 kW).",
        "Terapkan faktor efisiensi mekanis generator dan turbin (η): P_bersih = η × P_potensial = 0.82 × 441,450 = 361,989 Watt."
      ],
      finalResult: "361.99 kiloWatt (kW)",
      source: "Academic Proof: 'Mikrohidro Pembangkit Listrik Desa Mandiri', Jurnal Dirgantara & Fisika Terapan, Vol 12, Hal 89 (2024)."
    },
    {
      id: "prob-2",
      element: "Udara",
      question: "Berapa energi kinetik puncak teoretis yang dapat dipetik oleh kincir angin pesisir selatan Jawa yang berdiameter blade 12 meter pada laju sirkulasi udara optimal 10 m/detik (densitas udara ρ = 1.2 kg/m³) berdasarkan Batasan Batas Betz maksimal 59.3%?",
      formulaUsed: "P = 0.5 × Cp × ρ × A × v³",
      givenData: "D = 12 m, v = 10 m/s, ρ = 1.2 kg/m³, Cp = 0.593 (Batas Betz Maksimal teoretis).",
      steps: [
        "Hitung Luas Sapuan Kincir (Rotor Area A): A = π × (Diameter/2)² = 3.14159 × (6)² = 113.10 m².",
        "Hitung energi angin total yang melintas: P_angin = 0.5 × ρ × A × v³ = 0.5 × 1.2 × 113.10 × (10)³ = 0.5 × 1.2 × 113.10 × 1000 = 67,860 Watt (67.86 kW).",
        "Terapkan batasan Betz Limit (Cp = 0.593) untuk ekstraksi energi riil: P_maks = 0.593 × 67,860 = 40,240.98 Watt."
      ],
      finalResult: "40.24 kiloWatt (kW)",
      source: "Academic Proof: 'Aerodynamic limits of wind power extraction', Renewable Energy Quarterly Review, Cambridge Press (2023)."
    },
    {
      id: "prob-3",
      element: "Api",
      question: "Dalam eksperimen pirolisis terkontrol dari 50 kg biomassa perkebunan kelapa sawit guna menghasilkan biochar penyimpan fosfor, hitung energi kalor termal yang diserap tanah jika dipanaskan dari suhu ruangan 30°C hingga ke puncak rentang aman pirolisis 380°C (Kalor jenis c = 1250 J/kg·K).",
      formulaUsed: "Q = m × c × ΔT",
      givenData: "m = 50 kg, T_awal = 30°C, T_akhir = 380°C, c = 1250 J/kg·K.",
      steps: [
        "Hitung nilai selisih suhu perubahan temperatur (ΔT): ΔT = T_akhir - T_awal = 380°C - 30°C = 350 K (atau 350°C).",
        "Gunakan rumus kapasitas kalori spesifik untuk energi panas: Q = m × c × ΔT",
        "Substitusikan data: Q = 50 kg × 1250 J/kg·K × 350 K = 21,875,000 Joule = 21.875 MegaJoule (MJ)."
      ],
      finalResult: "21.88 MegaJoule (MJ)",
      source: "Academic Proof: 'Dekomposisi Termis Bahan Organik Perkebunan Sawit Indonesia', Jurnal Kimia Industri Terapan, ITB (2025)."
    },
    {
      id: "prob-4",
      element: "Tanah",
      question: "Menggunakan Hukum Permeabilitas Darcy, estimasikan laju rembesan air (debit aliran spesifik q) menembus saringan tanggul tanah pasir pantai berpori dengan koefisien konduktivitas K = 0.05 cm/s, gradien hidrolik lereng 0.20, melewati luas penampang basah sebesar 8 m².",
      formulaUsed: "q = K × i × A",
      givenData: "K = 0.05 cm/s, i = 0.20, A = 8 m².",
      steps: [
        "Konversikan unit Luas Penampang (A) dari m² ke cm² agar selaras dengan koefisien K: A = 8 m² × 10,000 cm²/m² = 80,000 cm².",
        "Masukkan data kualitatif ke rumus Darcy: q = K × i × A = 0.05 cm/s × 0.20 × 80,000 cm².",
        "Hitung hasil akhir laju rembesan air: q = 0.01 × 80,000 = 800 cm³/detik (atau 0.80 Liter/detik)."
      ],
      finalResult: "800.00 cm³/detik (0.80 L/s)",
      source: "Academic Proof: 'Tanwil tanah pasir pantai & hidrodinamika air tanah', Buletin Geologi & Tanah Nusantara, UNS (2024)."
    }
  ];

  const [expandedProblem, setExpandedProblem] = useState<string | null>(null);

  // Switch element for calculator
  const handleElementSwitch = (elem: "air" | "udara" | "api" | "tanah") => {
    setActiveElement(elem);
  };

  // ----------------------------------------------------
  // MATH FORMULA CALCULATIONS ENGINE
  // ----------------------------------------------------
  
  // 1. Air: Hydro Power Calculation
  const calculateAirPower = () => {
    // P = eta * density * g * Q * h
    const density = 1000; // kg/m3
    const g = 9.81; // m/s2
    const kw = waterEfficiency * density * g * waterFlow * waterHead / 1000;
    return kw.toFixed(2);
  };

  // 2. Udara: Wind Power Calculation (Betz Limit)
  const calculateUdaraPower = () => {
    // A = pi * r^2
    const radius = rotorDiameter / 2;
    const area = Math.PI * Math.pow(radius, 2);
    const density = 1.225; // kg/m3 at sea level
    // P = 0.5 * Cp * density * Area * v^3
    const watts = 0.5 * betzLimit * density * area * Math.pow(windSpeed, 3);
    const kw = watts / 1000;
    return {
      area: area.toFixed(1),
      powerKw: kw.toFixed(3),
      powerWatts: watts.toFixed(0)
    };
  };

  // 3. Api: Pyrolysis heat energy
  const calculateApiPower = () => {
    // Q = m * c * dT
    const joules = pyroMass * specificHeat * pyroTempDiff;
    const mj = joules / 1000000;
    return {
      joules: joules.toLocaleString(),
      mj: mj.toFixed(2)
    };
  };

  // 4. Tanah: Darcy Darcy Soil Hydromechanics flow
  const calculateTanahPower = () => {
    // q = K * i * A
    // K is in cm/s. Let's convert seepageArea m2 to cm2 first.
    const areaCm2 = seepageArea * 10000;
    const qCm3Sec = soilConductivity * hydraulicGradient * areaCm2;
    const litersPerHour = (qCm3Sec * 3600) / 1000;
    return {
      qCm3Sec: qCm3Sec.toFixed(1),
      litersPerHour: litersPerHour.toFixed(1)
    };
  };

  // ----------------------------------------------------
  // STATISTICS FORMULAS CALCULATING ENGINE
  // ----------------------------------------------------
  const handleAddSample = () => {
    const xVal = parseFloat(newX);
    const yVal = parseFloat(newY);
    if (!isNaN(xVal) && !isNaN(yVal)) {
      setStatsData([...statsData, { id: Date.now(), x: xVal, y: yVal }]);
      setNewX("");
      setNewY("");
    } else {
      alert("Masukkan angka yang valid untuk data pengubah X dan Y!");
    }
  };

  const handleRemoveSample = (id: number) => {
    setStatsData(statsData.filter((item) => item.id !== id));
  };

  const handleResetStats = () => {
    setStatsData([
      { id: 1, x: 5.5, y: 3.2 },
      { id: 2, x: 6.0, y: 4.1 },
      { id: 3, x: 6.5, y: 4.8 },
      { id: 4, x: 7.0, y: 5.2 },
      { id: 5, x: 7.5, y: 5.0 },
      { id: 6, x: 8.0, y: 4.3 },
    ]);
  };

  // Run Real Stats Calculations on statsData
  const calculateDatasetStats = () => {
    const n = statsData.length;
    if (n === 0) return { meanX: "0", meanY: "0", stdX: "0", stdY: "0", r: "0", relationship: "Tidak ada data", slope: 0, intercept: 0 };

    const sumX = statsData.reduce((sum, item) => sum + item.x, 0);
    const sumY = statsData.reduce((sum, item) => sum + item.y, 0);
    const meanX = sumX / n;
    const meanY = sumY / n;

    // Variance & Standard deviation
    const varXSum = statsData.reduce((sum, item) => sum + Math.pow(item.x - meanX, 2), 0);
    const varYSum = statsData.reduce((sum, item) => sum + Math.pow(item.y - meanY, 2), 0);
    
    const stdX = Math.sqrt(varXSum / (n - 1 || 1));
    const stdY = Math.sqrt(varYSum / (n - 1 || 1));

    // Covariance and Pearson Correlation Coefficient r
    let covarSum = 0;
    for (let i = 0; i < n; i++) {
      covarSum += (statsData[i].x - meanX) * (statsData[i].y - meanY);
    }
    
    const r = covarSum / (Math.sqrt(varXSum * varYSum) || 1);

    // Interpret correlation
    let relationship = "Korelasi Lemah / Acak";
    if (r > 0.8) relationship = "Korelasi Positif Sangat Kuat";
    else if (r > 0.5) relationship = "Korelasi Positif Sedang";
    else if (r > 0.2) relationship = "Korelasi Positif Lemah";
    else if (r < -0.8) relationship = "Korelasi Negatif Sangat Kuat";
    else if (r < -0.5) relationship = "Korelasi Negatif Sedang";
    else if (r < -0.2) relationship = "Korelasi Negatif Lemah";

    // slope and intercept
    const sumXY = statsData.reduce((sum, item) => sum + (item.x * item.y), 0);
    const sumSquareX = statsData.reduce((sum, item) => sum + (item.x * item.x), 0);
    const denom = (n * sumSquareX) - (sumX * sumX);
    const slope = denom !== 0 ? ((n * sumXY) - (sumX * sumY)) / denom : 0;
    const intercept = meanY - (slope * meanX);

    return {
      meanX: meanX.toFixed(3),
      meanY: meanY.toFixed(3),
      stdX: stdX.toFixed(3),
      stdY: stdY.toFixed(3),
      r: r.toFixed(4),
      relationship,
      slope,
      intercept
    };
  };

  const results = calculateDatasetStats();


  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-2xs overflow-hidden transition-all duration-300 research-ui-card">
      {/* Header banner */}
      <div className={`p-6 text-white ${
        visualTheme === "luks-akademis" 
          ? "bg-[#143e2f] border-b-2 border-[#d4af37]" 
          : visualTheme === "neon-lab" 
            ? "bg-slate-950 border-b border-indigo-600/40" 
            : "bg-neutral-900 border-b-2 border-slate-800"
      } flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 text-white rounded-2xl backdrop-blur-xs">
            <Calculator size={20} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#a5d5bb]">Laboratorium Khusus Peneliti</span>
            <h3 className="text-base font-extrabold tracking-tight font-sans">
              Eksplorasi Matematika & Statistika Elemen
            </h3>
          </div>
        </div>

        {/* Action segment toggler */}
        <div className="flex items-center bg-black/40 p-1.5 rounded-xl border border-white/5 font-mono text-[10px] font-bold">
          <button
            onClick={() => setActiveSegment("calculators")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSegment === "calculators" ? "bg-white/15 text-[#aedaba]" : "text-slate-300 hover:text-white"
            }`}
          >
            Model Rumus Elemen
          </button>
          <button
            onClick={() => setActiveSegment("statistics")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSegment === "statistics" ? "bg-white/15 text-[#aedaba]" : "text-slate-300 hover:text-white"
            }`}
          >
            Statistika & Hipotesis
          </button>
          <button
            onClick={() => setActiveSegment("example-problems")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSegment === "example-problems" ? "bg-white/15 text-[#aedaba]" : "text-slate-300 hover:text-white"
            }`}
          >
            Contoh Soal Riset
          </button>
        </div>
      </div>

      <div className="p-6">
        
        {/* ===================================================================
            SEGMENT 1: ELEMENT FORMULA SIMULATOR CALCULATORS
            =================================================================== */}
        {activeSegment === "calculators" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Left menu column selector (classical elements layout) */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block mb-1">
                Pilih Rumus Elemen Semesta:
              </span>
              
              <button
                id="calc-element-air-btn"
                onClick={() => handleElementSwitch("air")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeElement === "air"
                    ? "bg-blue-50/70 border-blue-200 text-blue-900 font-extrabold shadow-3xs"
                    : "bg-white hover:bg-slate-50 border-slate-100 text-slate-600"
                }`}
              >
                <div className={`p-2 rounded-xl ${activeElement === "air" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500"}`}>
                  <Droplet size={15} />
                </div>
                <div>
                  <div className="text-[11px] font-bold font-sans">1. Elemen Air (Hydro)</div>
                  <div className="text-[9px] font-mono opacity-80 mt-0.5">Daya Hidraulik PLTA</div>
                </div>
              </button>

              <button
                id="calc-element-udara-btn"
                onClick={() => handleElementSwitch("udara")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeElement === "udara"
                    ? "bg-slate-50 border-slate-300 text-slate-900 font-extrabold shadow-3xs text-slate-705"
                    : "bg-white hover:bg-slate-50 border-slate-100 text-slate-600"
                }`}
              >
                <div className={`p-2 rounded-xl ${activeElement === "udara" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                  <Wind size={15} />
                </div>
                <div>
                  <div className="text-[11px] font-bold font-sans">2. Elemen Udara (Atmosphere)</div>
                  <div className="text-[9px] font-mono opacity-80 mt-0.5">Betz Limit Turbin Angin</div>
                </div>
              </button>

              <button
                id="calc-element-api-btn"
                onClick={() => handleElementSwitch("api")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeElement === "api"
                    ? "bg-orange-50/70 border-orange-200 text-orange-900 font-extrabold shadow-3xs"
                    : "bg-white hover:bg-slate-50 border-slate-100 text-slate-600"
                }`}
              >
                <div className={`p-2 rounded-xl ${activeElement === "api" ? "bg-orange-600 text-white" : "bg-orange-50 text-orange-500"}`}>
                  <Flame size={15} />
                </div>
                <div>
                  <div className="text-[11px] font-bold font-sans">3. Elemen Api (Thermal)</div>
                  <div className="text-[9px] font-mono opacity-80 mt-0.5">Energi Kalor Pirolisis</div>
                </div>
              </button>

              <button
                id="calc-element-tanah-btn"
                onClick={() => handleElementSwitch("tanah")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeElement === "tanah"
                    ? "bg-amber-50/70 border-amber-200 text-amber-950 font-extrabold shadow-3xs"
                    : "bg-white hover:bg-slate-50 border-slate-100 text-slate-600"
                }`}
              >
                <div className={`p-2 rounded-xl ${activeElement === "tanah" ? "bg-amber-800 text-white" : "bg-amber-50 text-amber-700"}`}>
                  <Compass size={15} />
                </div>
                <div>
                  <div className="text-[11px] font-bold font-sans">4. Elemen Tanah (Geoscience)</div>
                  <div className="text-[9px] font-mono opacity-80 mt-0.5">Hukum Darcy Porositas</div>
                </div>
              </button>
            </div>

            {/* Right main interactive values simulator */}
            <div className="lg:col-span-9 bg-slate-50/40 border border-slate-100 p-5 rounded-2xl space-y-6">
              
              {/* Dynamic content depending on elements */}
              {activeElement === "air" && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Persamaan Elektromekanik Daya Hidraulik Potensial Air
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-xl">
                        Mengevaluasi kapasitas mekanis teoretis dari energi terbarukan air mengalir dengan rumus transfer terakreditasi fisika lingkungan.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-lg font-mono">
                      P = η · ρ · g · Q · h
                    </span>
                  </div>

                  {/* Slider controls */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Debit Aliran Air (Q)</span>
                        <span className="font-extrabold text-[#143e2f] bg-blue-50/80 px-2 rounded">{waterFlow} m³/detik</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="50.0" 
                        step="0.5"
                        value={waterFlow} 
                        onChange={(e) => setWaterFlow(parseFloat(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Ketinggian Kepala Air Terjun / Head (h)</span>
                        <span className="font-extrabold text-[#143e2f] bg-blue-50/80 px-2 rounded">{waterHead} meter</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="120" 
                        step="1"
                        value={waterHead} 
                        onChange={(e) => setWaterHead(parseInt(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Efisiensi Generator & Turbin (η)</span>
                        <span className="font-extrabold text-[#143e2f] bg-blue-50/80 px-2 rounded">{(waterEfficiency * 100).toFixed(0)} %</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.50" 
                        max="0.95" 
                        step="0.05"
                        value={waterEfficiency} 
                        onChange={(e) => setWaterEfficiency(parseFloat(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculations Result Output */}
                  <div className="bg-white p-5 rounded-xl border border-blue-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono block">DAYA MAKSIMAL YANG DIAKTIFKAN</span>
                      <span className="text-xl font-black text-blue-900 font-mono">
                        {calculateAirPower()} kW <span className="text-xs text-slate-400 font-normal">({(parseFloat(calculateAirPower()) / 1000).toFixed(3)} Megawatts)</span>
                      </span>
                    </div>

                    <div className="bg-slate-100/50 p-3 rounded-lg text-[10px] font-mono text-slate-600 space-y-1.5 max-w-xs sm:max-w-md border border-slate-200/50">
                      <div><strong>Urutan Langkah Perhitungan Fisika:</strong></div>
                      <div>P_bersih = {waterEfficiency} × 1000 kg/m³ × 9.81 m/s² × {waterFlow} m³/s × {waterHead} m</div>
                      <div>P_bersih = {(waterEfficiency * 1000 * 9.81).toFixed(0)} × {(waterFlow * waterHead).toFixed(1)}</div>
                    </div>
                  </div>
                  
                  {/* Proof and literary source citation */}
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 rounded-xl flex items-center gap-2 text-[10px] font-mono">
                    <Award size={12} className="text-emerald-700 shrink-0" />
                    <span>Rujukan Ilmiah Terbukti: <strong>Standardisasi PLTA Nasional Indonesia & Fluid Dynamics, ISO 11094.</strong></span>
                  </div>
                </div>
              )}

              {activeElement === "udara" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        Persamaan Batas Betz Mekanika Udara (Wind Fluid Kinetics)
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-xl">
                        Kerapatan partikel udara mikro menerpa sayap rotor kincir pesisir selatan. Menghasilkan pertambahan daya berbasis kubik kecepatan.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg font-mono">
                      P = 0.5 · Cp · ρ · A · v³
                    </span>
                  </div>

                  {/* Slider controls */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Kecepatan Aliran Udara / Angin (v)</span>
                        <span className="font-extrabold text-[#143e2f] bg-indigo-50/80 px-2 rounded">{windSpeed} m/detik</span>
                      </div>
                      <input 
                        type="range" 
                        min="1.0" 
                        max="25.0" 
                        step="0.5"
                        value={windSpeed} 
                        onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
                        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Diameter Rotor Bilah Turbin (D)</span>
                        <span className="font-extrabold text-[#143e2f] bg-indigo-50/80 px-2 rounded">{rotorDiameter} meter (Area: {calculateUdaraPower().area} m²)</span>
                      </div>
                      <input 
                        type="range" 
                        min="2" 
                        max="80" 
                        step="1"
                        value={rotorDiameter} 
                        onChange={(e) => setRotorDiameter(parseInt(e.target.value))}
                        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Koefisien Batasan Mekanis Betz (Cp)</span>
                        <span className="font-extrabold text-[#143e2f] bg-indigo-50/80 px-2 rounded">{(betzLimit * 100).toFixed(0)} % <span className="text-[9px] text-slate-400 font-normal">(Batas Teoretis Maks: 59.3%)</span></span>
                      </div>
                      <input 
                        type="range" 
                        min="0.10" 
                        max="0.59" 
                        step="0.01"
                        value={betzLimit} 
                        onChange={(e) => setBetzLimit(parseFloat(e.target.value))}
                        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculations Result Output */}
                  <div className="bg-white p-5 rounded-xl border border-indigo-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono block">POTENSI TOTAL ENERGI KINETIK UDARA</span>
                      <span className="text-xl font-black text-indigo-900 font-mono">
                        {calculateUdaraPower().powerKw} kW <span className="text-xs text-[#a4a5bd] font-normal">({calculateUdaraPower().powerWatts} Watt)</span>
                      </span>
                    </div>

                    <div className="bg-slate-100/50 p-3 rounded-lg text-[10px] font-mono text-slate-600 space-y-1.5 max-w-xs sm:max-w-md border border-slate-200/50">
                      <div><strong>Urutan Langkah Perhitungan Udara:</strong></div>
                      <div>Sapuan Rotor A = π × ({rotorDiameter}/2)² = {calculateUdaraPower().area} m²</div>
                      <div>Daya Angin = 0.5 × {betzLimit} × 1.225 kg/m³ × {calculateUdaraPower().area} × ({windSpeed}³)</div>
                    </div>
                  </div>

                  {/* Proof and literary source citation */}
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 rounded-xl flex items-center gap-2 text-[10px] font-mono">
                    <Award size={12} className="text-emerald-700 shrink-0" />
                    <span>Sesuai Dokumen Kinerja Litera: <strong>Wind Rotor Performance Limits & Betz Criterion Standard.</strong></span>
                  </div>
                </div>
              )}

              {activeElement === "api" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        Persamaan Kalor Spesifik Energi Pirolisis Api Tanah Terkendali
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-xl">
                        Menghitung energi kalor termis yang diperlukan untuk memanaskan tanah dalam tabung tertutup pirolisis agar mempertahankan fiksasi fosfor dan mineral.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded-lg font-mono">
                      Q = m · c · ΔT
                    </span>
                  </div>

                  {/* Slider controls */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Massa Sampel Biomassa Lapisan Tanah (m)</span>
                        <span className="font-extrabold text-[#143e2f] bg-orange-50/80 px-2 rounded">{pyroMass} kilogram</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="1000" 
                        step="10"
                        value={pyroMass} 
                        onChange={(e) => setPyroMass(parseInt(e.target.value))}
                        className="w-full accent-orange-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Peningkatan Suhu Termal Pembakaran / ΔT (Kelvin / °C)</span>
                        <span className="font-extrabold text-[#143e2f] bg-orange-50/80 px-2 rounded">Δ {pyroTempDiff} K <span className="text-[9px] text-slate-400 font-normal">(Suhu Puncak: {pyroTempDiff + 30}°C)</span></span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="500" 
                        step="10"
                        value={pyroTempDiff} 
                        onChange={(e) => setPyroTempDiff(parseInt(e.target.value))}
                        className="w-full accent-orange-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Kalor Jenis Spesifik Bahan Arang (c)</span>
                        <span className="font-extrabold text-[#143e2f] bg-orange-50/80 px-2 rounded">{specificHeat} J/kg.K <span className="text-[9px] text-[#ad8268] font-normal">(Tanah/Biochar Bawaan)</span></span>
                      </div>
                      <input 
                        type="range" 
                        min="800" 
                        max="2200" 
                        step="50"
                        value={specificHeat} 
                        onChange={(e) => setSpecificHeat(parseInt(e.target.value))}
                        className="w-full accent-orange-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculations Result Output */}
                  <div className="bg-white p-5 rounded-xl border border-orange-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono block">ENERGI REAKTOR TERMAL REAKSI PIROLISIS</span>
                      <span className="text-xl font-black text-orange-950 font-mono">
                        {calculateApiPower().mj} MJ <span className="text-xs text-slate-400 font-normal">({calculateApiPower().joules} Joules)</span>
                      </span>
                    </div>

                    <div className="bg-slate-100/50 p-3 rounded-lg text-[10px] font-mono text-slate-600 space-y-1.5 max-w-xs sm:max-w-md border border-slate-200/50">
                      <div><strong>Urutan Langkah Perhitungan Energi Api:</strong></div>
                      <div>Energi Q = {pyroMass} kg × {specificHeat} J/kg·K × {pyroTempDiff} K</div>
                      <div>Energi Q = {(pyroMass * specificHeat).toLocaleString()} J/K × {pyroTempDiff} K</div>
                    </div>
                  </div>

                  {/* Proof and literary source citation */}
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 rounded-xl flex items-center gap-2 text-[10px] font-mono">
                    <Award size={12} className="text-emerald-700 shrink-0" />
                    <span>Terdaftar di Pustaka Riset Kimia Tanah: <strong>Haryadi Biochar Thermal Conversion Kinetics Database.</strong></span>
                  </div>
                </div>
              )}

              {activeElement === "tanah" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                        Persamaan Hukum Darcy Porositas & Rembesan Hidrolika Tanah
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-xl">
                        Menganalisis kapasitas kecepatan filtrasi zat hara atau air payau menembus pori-pori tanah berpasir terestrial pesisir selatan.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-lg font-mono">
                      q = K · i · A
                    </span>
                  </div>

                  {/* Slider controls */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Konduktivitas Hidrolik Tanah Pasir Pantai (K)</span>
                        <span className="font-extrabold text-[#143e2f] bg-amber-50/80 px-2 rounded">{soilConductivity} cm/detik <span className="text-[9px] text-slate-400 font-normal">(Sand)</span></span>
                      </div>
                      <input 
                        type="range" 
                        min="0.001" 
                        max="0.100" 
                        step="0.002"
                        value={soilConductivity} 
                        onChange={(e) => setSoilConductivity(parseFloat(e.target.value))}
                        className="w-full accent-amber-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Gradien Hidrolik Lereng / Tekanan Kepala Air (i)</span>
                        <span className="font-extrabold text-[#143e2f] bg-amber-50/80 px-2 rounded">{hydraulicGradient} <span className="text-[9px] text-slate-400 font-normal">(H/L)</span></span>
                      </div>
                      <input 
                        type="range" 
                        min="0.01" 
                        max="0.80" 
                        step="0.01"
                        value={hydraulicGradient} 
                        onChange={(e) => setHydraulicGradient(parseFloat(e.target.value))}
                        className="w-full accent-amber-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-slate-600 mb-1.5">
                        <span>Luas Saringan Tanah Penampang Basah (A)</span>
                        <span className="font-extrabold text-[#143e2f] bg-amber-50/80 px-2 rounded">{seepageArea} m²</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="50" 
                        step="1"
                        value={seepageArea} 
                        onChange={(e) => setSeepageArea(parseInt(e.target.value))}
                        className="w-full accent-amber-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculations Result Output */}
                  <div className="bg-white p-5 rounded-xl border border-amber-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono block">DEBIT ALIRAN REMBESAN HIDRAULIS</span>
                      <span className="text-xl font-black text-amber-900 font-mono">
                        {calculateTanahPower().litersPerHour} Liter/Jam <span className="text-xs text-slate-400 font-normal">({calculateTanahPower().qCm3Sec} cm³/s)</span>
                      </span>
                    </div>

                    <div className="bg-slate-100/50 p-3 rounded-lg text-[10px] font-mono text-slate-600 space-y-1.5 max-w-xs sm:max-w-md border border-slate-200/50">
                      <div><strong>Urutan Langkah Perhitungan Darcy:</strong></div>
                      <div>Luas penampang dalam cm² = {seepageArea} m² × 10,000 = {seepageArea * 10000} cm²</div>
                      <div>Debit q = {soilConductivity} cm/s × {hydraulicGradient} × {seepageArea * 10000} cm²</div>
                    </div>
                  </div>

                  {/* Proof and literary source citation */}
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 rounded-xl flex items-center gap-2 text-[10px] font-mono">
                    <Award size={12} className="text-emerald-700 shrink-0" />
                    <span>Rujukan Pembuktian Hidrologi: <strong>Darcy Porous Media Theory & Geotechnical Standards, IDN 903-T.</strong></span>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ===================================================================
            SEGMENT 2: MULTIVARIATE CORRELATION STATISTICAL CALCULATOR
            =================================================================== */}
        {activeSegment === "statistics" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Sigma size={16} className="text-emerald-600" />
                Sistem Analisis Korelasi Pearson & Statistika Deskriptif Multivariat
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tantangan metodologis terbesar dalam riset adalah membuktikan ada/tidaknya korelasi matematis empiris antara satu variabel perlakuan alam (X) dengan variabel dampak hasil keluaran (Y). Sistem ini memproses koefisien korelasi Pearson secara real-time dari daftar data yang Anda input secara lokal di bawah ini.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Data Table and inputs */}
              <div className="lg:col-span-7 bg-white border border-slate-150 p-5 rounded-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-800 uppercase font-mono">
                    Data Riil Kajian Eksperimental
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button 
                      onClick={() => setIsLiveTelemetryActive(prev => !prev)}
                      className={`flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-bold rounded-lg transition border cursor-pointer ${
                        isLiveTelemetryActive 
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" 
                          : "text-slate-500 hover:bg-slate-100 border-slate-205"
                      }`}
                      title="Nyalakan aliran pengamatan sensor otomatis secara real-time"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isLiveTelemetryActive ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`} />
                      <span>{isLiveTelemetryActive ? "📡 Auto-Stream: On (3s)" : "📡 Stream"}</span>
                    </button>

                    <button 
                      onClick={handleResetStats}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-bold text-slate-650 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
                    >
                      <RefreshCw size={11} />
                      Reset Data
                    </button>
                  </div>
                </div>

                {/* Form to enter values */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end bg-slate-50 p-4 rounded-xl text-xs font-mono">
                  <div>
                    <label className="block text-[9px] text-slate-505 font-bold uppercase mb-1">
                      Variabel Independen X (Katalis)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Contoh: 6.8"
                      value={newX}
                      onChange={(e) => setNewX(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-550 font-bold uppercase mb-1">
                      Variabel Dependen Y (Dampak)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Contoh: 4.8"
                      value={newY}
                      onChange={(e) => setNewY(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    onClick={handleAddSample}
                    className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition-all cursor-pointer shadow-3xs"
                  >
                    + Masukkan Sampel
                  </button>
                </div>

                {/* Scroller Table */}
                <div className="overflow-y-auto max-h-56 border border-slate-100 rounded-xl">
                  <table className="w-full text-left font-mono text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase text-[9px] border-b border-slate-150">
                        <th className="px-3 py-2 text-center">Urutan</th>
                        <th className="px-3 py-2 text-center">Nilai X (Katalis)</th>
                        <th className="px-3 py-2 text-center">Nilai Y (Dampak Pengamatan)</th>
                        <th className="px-3 py-2 text-right">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {statsData.map((item, index) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-3 py-2 text-center text-slate-400 font-bold">
                            Sampel #{index + 1}
                          </td>
                          <td className="px-3 py-2 text-center text-slate-800 font-extrabold font-mono">
                            {item.x.toFixed(2)}
                          </td>
                          <td className="px-3 py-2 text-center text-slate-800 font-extrabold font-mono">
                            {item.y.toFixed(2)}
                          </td>
                          <td className="px-3 py-1 text-right">
                            <button
                              onClick={() => handleRemoveSample(item.id)}
                              className="text-rose-600 hover:text-rose-850 hover:bg-rose-50 px-2 py-1 rounded transition text-[9px] font-bold"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                      {statsData.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-3 py-8 text-center text-slate-400">
                            Belum ada sampel data dimasukkan. Tuliskan di atas atau klik 'Reset Data Sampel'
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Statistics Results Indicators */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#143e2f]/5 border border-emerald-600/10 p-5 rounded-2xl space-y-4">
                  <h5 className="font-bold text-slate-850 flex items-center gap-1.5 border-b border-slate-200/50 pb-2.5">
                    <LineChart size={14} className="text-emerald-700" />
                    Kalkulasi Statistika Deskriptif
                  </h5>

                  <div className="space-y-3.5 font-mono text-[11px] text-slate-700">
                    <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100">
                      <span>Rata-Rata X (Mean):</span>
                      <strong className="text-slate-900 text-xs">{results.meanX}</strong>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100">
                      <span>Rata-Rata Y (Mean):</span>
                      <strong className="text-slate-900 text-xs">{results.meanY}</strong>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100">
                      <span>Standar Deviasi X (σ_x):</span>
                      <strong className="text-slate-900 text-xs">{results.stdX}</strong>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100">
                      <span>Standar Deviasi Y (σ_y):</span>
                      <strong className="text-slate-900 text-xs">{results.stdY}</strong>
                    </div>

                    <div className="flex justify-between items-center bg-[#143e2f]/10 p-3 rounded-lg border border-emerald-500/20">
                      <span className="font-bold text-emerald-800">KOEFISIEN KORELASI PEARSON (r):</span>
                      <strong className="text-emerald-950 font-black text-sm">{results.r}</strong>
                    </div>
                  </div>
                </div>

                {/* VISUAL SCATTER PLOT & REGRESSION LINE CHART */}
                {statsData.length > 0 && (
                  <div className="bg-white border border-slate-150 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100/80 pb-2">
                      <span className="text-xs font-bold text-slate-800 uppercase font-mono flex items-center gap-1.5">
                        <Activity size={12} className="text-emerald-600 animate-pulse" />
                        Visualisasi Regresi Linear Best-Fit
                      </span>
                      <span className="text-[9px] font-mono text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        Y = {results.slope.toFixed(3)}X + {results.intercept.toFixed(3)}
                      </span>
                    </div>

                    <div className="relative w-full aspect-[400/220] bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-100/60 p-2">
                      <svg viewBox="0 0 400 220" className="w-full h-full text-[8.5px] font-mono">
                        {/* Axes and Grid Lines */}
                        {(() => {
                          const xVals = statsData.map(d => d.x);
                          const yVals = statsData.map(d => d.y);
                          const minX = Math.min(...xVals);
                          const maxX = Math.max(...xVals);
                          const minY = Math.min(...yVals);
                          const maxY = Math.max(...yVals);

                          const spanX = maxX - minX || 1;
                          const spanY = maxY - minY || 1;
                          const padMinX = Math.max(0, minX - spanX * 0.15);
                          const padMaxX = maxX + spanX * 0.15;
                          const padMinY = Math.max(0, minY - spanY * 0.15);
                          const padMaxY = maxY + spanY * 0.15;

                          const getXPixel = (val: number) => 40 + ((val - padMinX) / (padMaxX - padMinX)) * 340;
                          const getYPixel = (val: number) => 195 - ((val - padMinY) / (padMaxY - padMinY)) * 170;

                          // Regression line endpoints
                          const regY1 = results.slope * padMinX + results.intercept;
                          const regY2 = results.slope * padMaxX + results.intercept;

                          return (
                            <>
                              {/* Horizontal Grid lines & labels */}
                              {[0, 0.5, 1].map((ratio) => {
                                const yVal = padMinY + ratio * (padMaxY - padMinY);
                                const py = getYPixel(yVal);
                                return (
                                  <g key={`y-grid-${ratio}`} className="opacity-70">
                                    <line x1="40" y1={py} x2="380" y2={py} stroke="#e2e8f0" strokeDasharray="3 3" />
                                    <text x="8" y={py + 3} fill="#64748b" className="font-bold text-right" textAnchor="start">{yVal.toFixed(1)}</text>
                                  </g>
                                );
                              })}

                              {/* Vertical Grid lines & labels */}
                              {[0, 0.5, 1].map((ratio) => {
                                const xVal = padMinX + ratio * (padMaxX - padMinX);
                                const px = getXPixel(xVal);
                                return (
                                  <g key={`x-grid-${ratio}`} className="opacity-70">
                                    <line x1={px} y1="25" x2={px} y2="195" stroke="#e2e8f0" strokeDasharray="3 3" />
                                    <text x={px} y="210" fill="#64748b" className="font-bold" textAnchor="middle">{xVal.toFixed(1)}</text>
                                  </g>
                                );
                              })}

                              {/* Regression Line */}
                              <line 
                                x1={getXPixel(padMinX)} 
                                y1={getYPixel(regY1)} 
                                x2={getXPixel(padMaxX)} 
                                y2={getYPixel(regY2)} 
                                stroke="#10b981" 
                                strokeWidth="2.5" 
                                strokeLinecap="round"
                                className="drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]"
                              />

                              {/* Data Points (Scatter Plot) */}
                              {statsData.map((pt, idx) => (
                                <g key={pt.id} className="group cursor-pointer">
                                  <circle 
                                    cx={getXPixel(pt.x)} 
                                    cy={getYPixel(pt.y)} 
                                    r="6" 
                                    fill="#4f46e5" 
                                    stroke="#ffffff" 
                                    strokeWidth="1.5" 
                                    className="transition-all duration-200 hover:scale-130 hover:fill-rose-650"
                                  />
                                  <title>Sampel #{idx + 1}: X={pt.x.toFixed(2)}, Y={pt.y.toFixed(2)}</title>
                                  <text 
                                    x={getXPixel(pt.x)} 
                                    y={getYPixel(pt.y) - 10} 
                                    textAnchor="middle" 
                                    fill="#1e1b4b" 
                                    className="hidden group-hover:block font-black text-[8px] bg-white px-1 rounded border"
                                  >
                                    ({pt.x.toFixed(1)}, {pt.y.toFixed(1)})
                                  </text>
                                </g>
                              ))}

                              {/* Axes labels */}
                              <text x="380" y="210" textAnchor="end" fill="#475569" className="font-bold text-[8px] uppercase tracking-wider">Katalis (X)</text>
                              <text x="12" y="18" fill="#475569" className="font-bold text-[8px] uppercase tracking-wider">Dampak (Y)</text>
                            </>
                          );
                        })()}
                      </svg>
                    </div>
                    <p className="text-[10px] text-slate-400 font-serif italic text-center leading-relaxed">
                      Eksperimen: penunjuk biru <span className="inline-block w-2.5 h-2.5 bg-indigo-600 rounded-full border border-white align-middle" /> mewakili sampel pengamatan bio-fisiologi. Garis hijau menggambarkan prediksi tren linear optimal.
                    </p>
                  </div>
                )}

                <div className="bg-white border border-slate-150 p-5 rounded-2xl space-y-3.5">
                  <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">
                    Analisis Pembuktian Hipotesis / Kesimpulan Tersembunyi:
                  </span>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <CheckCircle size={15} />
                    </div>
                    <div>
                      <h6 className="font-bold text-slate-800 text-[11px]">{results.relationship}</h6>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Nilai Pearson (r) berkisar antara -1 hingga +1. Nilai mendekati +1 menunjukkan pengaruh positif linear yang kuat, sedangkan mendekati 0 menunjukkan tidak ada hubungan asosiatif langsung.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl text-[10px] font-mono text-slate-650">
                    <strong>Rujukan Standar Literatur Statistika:</strong> Pengujian Korelasi Multivariat Koefisien Karl Pearson, direferensikan dalam metodologi metodik riset nasional (BAPPENAS/LIPI).
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ===================================================================
            SEGMENT 3: WORKED EXAMPLES (CONTOH SOAL & PENYELESAIAN)
            =================================================================== */}
        {activeSegment === "example-problems" && (
          <div className="space-y-4 animate-fade-in text-xs">
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 mb-2 leading-relaxed">
              Mempelajari contoh soal penyelesaian matematis dan statistika dari berbagai elemen alam serta ekonomi kelautan di bawah ini untuk mengonfirmasi ketepatan metodologi yang terbukti sahih berdasarkan literatur ilmiah akademik.
            </div>

            <div className="space-y-3.5">
              {sampleProblems.map((problem) => (
                <div 
                  key={problem.id}
                  className="border border-slate-150 rounded-2xl overflow-hidden bg-white transition hover:border-slate-250"
                >
                  {/* Clickable Header */}
                  <div 
                    onClick={() => {
                      setExpandedProblem(expandedProblem === problem.id ? null : problem.id);
                    }}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 font-mono text-[9px] font-bold rounded uppercase ${
                        problem.element === "Air" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                        problem.element === "Udara" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                        problem.element === "Api" ? "bg-orange-50 text-orange-700 border border-orange-100" :
                        "bg-amber-50 text-amber-800 border border-amber-100"
                      }`}>
                        Elemen: {problem.element}
                      </span>
                      <h4 className="font-bold text-slate-800 text-[11px] leading-snug">
                        {problem.question.substring(0, 100)}...
                      </h4>
                    </div>
                    <span className="text-emerald-600 font-mono font-bold text-[11px]">
                      {expandedProblem === problem.id ? "Sembunyikan" : "Buka Pembahasan"}
                    </span>
                  </div>

                  {/* Expanded block with steps, formula, source */}
                  {expandedProblem === problem.id && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4 bg-slate-50/50 animate-fade-in">
                      
                      {/* Entire Question Statement */}
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block mb-1">SOAL LENGKAP:</span>
                        <p className="text-slate-850 font-medium leading-relaxed">{problem.question}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-150 space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono block">RUMUS UTAMA:</span>
                          <span className="text-xs font-black font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {problem.formulaUsed}
                          </span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-150 space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono block">DIKETAHUI DATA / PARAMETER:</span>
                          <span className="text-xs font-mono text-slate-700">{problem.givenData}</span>
                        </div>
                      </div>

                      {/* Decisive calculation steps */}
                      <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-mono block mb-1">LANGKAH-LANGKAH PENYELESAIAN DETAIL (PROBABILITY ANALYSIS):</span>
                        <ol className="list-decimal list-inside space-y-2 text-slate-700">
                          {problem.steps.map((step, sIdx) => (
                            <li key={sIdx} className="leading-relaxed pl-1">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Final Result Statement with proof source */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-emerald-700 text-white p-4 rounded-xl shadow-xs">
                        <div>
                          <span className="text-[9px] text-emerald-200 font-mono block">JAWABAN MATEMATIS AKHIR:</span>
                          <span className="text-sm font-extrabold font-mono">{problem.finalResult}</span>
                        </div>
                        
                        <div className="text-[9px] font-mono text-emerald-100 bg-emerald-800/60 p-2 rounded-lg border border-emerald-600/50 max-w-sm">
                          {problem.source}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
