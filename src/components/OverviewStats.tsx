import React from "react";
import { ResearchQA, ResearchCategory } from "../types";
import { 
  Award, 
  Flame, 
  Droplet, 
  Wind, 
  Compass, 
  Dna, 
  FileText 
} from "lucide-react";

interface OverviewStatsProps {
  researches: ResearchQA[];
}

export default function OverviewStats({ researches }: OverviewStatsProps) {
  // Count by categories
  const categoryCounts = researches.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count elemental traces in questions ("Air", "Udara", "Api", "Tanah", "Samudera" / "Kelautan")
  const getTraceCount = (keyword: string) => {
    return researches.filter(r => 
      r.question.toLowerCase().includes(keyword.toLowerCase()) || 
      r.answer.toLowerCase().includes(keyword.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(keyword.toLowerCase()))
    ).length;
  };

  const elements = [
    { name: "Air (Hidro)", count: getTraceCount("air"), icon: <Droplet size={14} />, color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
    { name: "Udara (Aero)", count: getTraceCount("udara"), icon: <Wind size={14} />, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { name: "Api (Termal)", count: getTraceCount("api") || getTraceCount("kebakaran") || getTraceCount("panas"), icon: <Flame size={14} />, color: "text-rose-600 bg-rose-50 border-rose-100" },
    { name: "Tanah (Geo / Tani)", count: getTraceCount("tanah") || getTraceCount("pertanian") || getTraceCount("perkebunan"), icon: <Compass size={14} />, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { name: "Samudera (Laut)", count: getTraceCount("samudera") || getTraceCount("kelautan") || getTraceCount("laut"), icon: <Compass size={14} className="rotate-45" />, color: "text-sky-600 bg-sky-50 border-sky-100" }
  ];

  const totalResearch = researches.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Metric Cards total count */}
      <div id="stat-total-card" className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold block mb-1">
            Total Arsip Litera
          </span>
          <h3 className="text-4xl font-extrabold font-sans tracking-tight">
            {totalResearch}
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Jumlah analisis komprehensif dari jajaran disiplin ekonomi, sains, alam, dan regulasi yang dicatat secara sah.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-800 mt-4 flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <Award size={14} className="text-emerald-400" />
          <span>Status Pustaka: Tersertifikasi</span>
        </div>
      </div>

      {/* Dynamic Element Tracing Stats */}
      <div id="stat-elements-card" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider font-mono text-slate-400 font-bold block mb-3">
            Pelacakan Unsur Alam
          </span>
          <div className="space-y-2.5">
            {elements.map((el, i) => {
              const percentage = totalResearch > 0 ? (el.count / totalResearch) * 100 : 0;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <span className={`p-1 rounded-md ${el.color.split(" ")[1]} ${el.color.split(" ")[0]}`}>
                        {el.icon}
                      </span>
                      {el.name}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 font-bold">
                      {el.count} riset ({Math.round(percentage)}%)
                    </span>
                  </div>
                  {/* Visual mini bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${el.color.split(" ")[0].replace("text", "bg")}`}
                      style={{ width: `${Math.max(5, percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SVG Category Bar chart */}
      <div id="stat-distribution-card" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider font-mono text-slate-400 font-bold block mb-4">
            Distribusi Disiplin Utama
          </span>
          <div className="space-y-4">
            {Object.values(ResearchCategory).map((cat, i) => {
              const count = categoryCounts[cat] || 0;
              const percentage = totalResearch > 0 ? (count / totalResearch) * 105 : 0;
              const barColors = [
                "bg-violet-500",
                "bg-amber-500",
                "bg-emerald-500",
                "bg-cyan-500",
                "bg-indigo-500"
              ];
              const colorClass = barColors[i % barColors.length];

              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-24 text-[10px] font-semibold text-slate-500 truncate" title={cat}>
                    {cat}
                  </div>
                  <div className="flex-grow flex items-center gap-2">
                    <div className="flex-grow h-3.5 bg-slate-50 border border-slate-200/40 rounded-lg overflow-hidden relative">
                      <div 
                        className={`h-full ${colorClass} rounded-l-md transition-all duration-500`}
                        style={{ width: `${Math.max(4, percentage)}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-700 min-w-4 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
