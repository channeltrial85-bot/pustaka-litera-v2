import React from "react";
import { Smartphone, Laptop, Monitor, Maximize2, Wifi, Battery, ShieldAlert } from "lucide-react";

export type DeviceType = "mobile" | "laptop" | "desktop" | "full";

interface DeviceSimulatorProps {
  children: React.ReactNode;
  activeDevice: DeviceType;
  onChangeDevice: (device: DeviceType) => void;
}

export default function DeviceSimulator({ children, activeDevice, onChangeDevice }: DeviceSimulatorProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Simulation Selector Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-8 mt-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs font-mono">
              SIMULATOR
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-800 font-sans">
                Pengujian Responsivitas Realistis
              </h4>
              <p className="text-[11px] text-slate-500 font-mono">
                Pilih bingkai arsitektur perangkat fisik di bawah untuk melihat adaptasi tata letak
              </p>
            </div>
          </div>

          {/* Quick simulation pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl">
            <button
              id="sim-device-full"
              onClick={() => onChangeDevice("full")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                activeDevice === "full"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Maximize2 size={14} />
              <span>Sesuai Layar (Responsif)</span>
            </button>

            <button
              id="sim-device-mobile"
              onClick={() => onChangeDevice("mobile")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                activeDevice === "mobile"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Smartphone size={14} />
              <span>HP (Mobile)</span>
            </button>

            <button
              id="sim-device-laptop"
              onClick={() => onChangeDevice("laptop")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                activeDevice === "laptop"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Laptop size={14} />
              <span>Laptop</span>
            </button>

            <button
              id="sim-device-desktop"
              onClick={() => onChangeDevice("desktop")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                activeDevice === "desktop"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Monitor size={14} />
              <span>Desktop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Frame Renderer Container */}
      <div className="w-full px-4 flex justify-center items-start">
        {activeDevice === "full" && (
          <div className="w-full max-w-6xl transition-all duration-300">
            {children}
          </div>
        )}

        {/* HP / SMARTPHONE MOCKUP FRAME */}
        {activeDevice === "mobile" && (
          <div className="w-full max-w-[390px] mx-auto transition-all duration-300">
            {/* Phone Chassis */}
            <div className="w-full bg-slate-900 text-slate-800 rounded-[50px] border-[12px] border-slate-950 shadow-2xl relative overflow-hidden flex flex-col" style={{ height: "780px" }}>
              {/* Speaker and Camera notch pill */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6.5 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center gap-3">
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800" />
              </div>

              {/* Status Bar simulation overlay */}
              <div className="w-full h-10 px-6 pt-2 bg-slate-900 text-white flex items-center justify-between z-40 text-[10px] font-mono select-none">
                <span>13:40</span>
                <div className="flex items-center gap-1.5">
                  <Wifi size={10} className="text-emerald-400" />
                  <span className="text-[9px] uppercase tracking-wider">5G</span>
                  <Battery size={12} className="text-emerald-400" />
                  <span>98%</span>
                </div>
              </div>

              {/* Inner screen content */}
              <div className="flex-grow w-full overflow-y-auto bg-slate-50/90 rounded-b-[38px] relative scrollbar-thin">
                {/* Note for mobile simulation scope */}
                <div className="bg-slate-900 text-emerald-300 px-4 py-2 text-[10px] font-mono text-center flex items-center justify-center gap-1.5">
                  <span>📱 Mode Layar Handphone Aktif</span>
                </div>
                <div className="p-3">
                  {children}
                </div>
              </div>

              {/* Bottom Home bar line */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-500 rounded-full z-45" />
            </div>
            <div className="text-center text-xs text-slate-400 font-mono mt-4">
              * Simulated Smartphone Screen Bezel (390px Viewport)
            </div>
          </div>
        )}

        {/* LAPTOP COMPUTER FRAME */}
        {activeDevice === "laptop" && (
          <div className="w-full max-w-[960px] mx-auto transition-all duration-300">
            {/* Screen Bezel and Display Glass */}
            <div className="w-full bg-slate-900 text-slate-800 rounded-t-2xl border-[14px] border-slate-950 shadow-2xl relative overflow-hidden flex flex-col" style={{ height: "540px" }}>
              {/* Webcam dot */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Inner screen */}
              <div className="flex-grow w-full overflow-y-auto bg-slate-50/90 relative scrollbar-default">
                <div className="bg-slate-950 text-slate-300 px-4 py-1.5 text-[10px] font-mono text-center">
                  💻 Mode Layar Laptop Terkompresi &middot; 960px Viewport
                </div>
                <div className="p-4">
                  {children}
                </div>
              </div>
            </div>

            {/* Laptop Base Keyboard */}
            <div className="w-[102%] -ml-[1%] h-4 bg-slate-200 border-t border-slate-350 rounded-b-2xl relative shadow-lg">
              {/* Keyboard indent slot and trackpad */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-slate-300 rounded-b-md border border-t-0 border-slate-400/60" />
            </div>
            <div className="text-center text-xs text-slate-400 font-mono mt-4">
              * Simulated Laptop Aluminum Chassis & Keyboard Base (960px Viewport)
            </div>
          </div>
        )}

        {/* DESKTOP STUDIO MULTI-GRID MONITOR */}
        {activeDevice === "desktop" && (
          <div className="w-full max-w-[1240px] mx-auto transition-all duration-300 mb-8">
            {/* Outer Monitor Bezel Frame */}
            <div className="w-full bg-slate-900 text-slate-800 rounded-2xl border-[16px] border-slate-950 shadow-2xl relative overflow-hidden flex flex-col" style={{ height: "660px" }}>
              {/* Inner screen */}
              <div className="flex-grow w-full overflow-y-auto bg-slate-50/90 relative scrollbar-default">
                <div className="bg-slate-950 text-slate-400 px-6 py-2 text-[10px] font-mono text-center flex items-center justify-between">
                  <span>🖥️ PRO STUDIO DISPLAY (1240px VIEWPORT)</span>
                  <span>HDR CALIBRATED</span>
                </div>
                <div className="p-6">
                  {children}
                </div>
              </div>
            </div>

            {/* Aluminum Pedestal Stand */}
            <div className="w-40 h-20 bg-slate-300 mx-auto relative shadow-lg rounded-b-xl border-t border-slate-400 flex items-center justify-center">
              <div className="w-32 h-1 bg-slate-400/20" />
            </div>
            <div className="w-56 h-3 bg-slate-400 rounded-lg mx-auto shadow-md -mt-1.5" />

            <div className="text-center text-xs text-slate-400 font-mono mt-4">
              * Simulated Studio Monitor and Pedestal Stand Frame (1240px Desktop Viewport)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
