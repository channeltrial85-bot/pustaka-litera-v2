import React, { useState, useEffect } from "react";
import { ResearchQA, Bibliography } from "../types";
import LiteMarkdown from "./LiteMarkdown";
import { downloadAsWord, printAsPDF } from "../utils/exporter";
import { 
  LANGUAGES, 
  translateScientificTextOffline, 
  UI_TRANSLATIONS 
} from "../utils/translator";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Calendar, 
  Share2, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Compass, 
  Database,
  Globe,
  Printer,
  Download,
  Languages,
  Sparkles,
  RefreshCw
} from "lucide-react";

interface ResearchCardProps {
  key?: string;
  research: ResearchQA;
  onDelete?: (id: string) => void;
  activeLanguage?: string;
}

export default function ResearchCard({ research, onDelete, activeLanguage = "id" }: ResearchCardProps) {
  const [activeTab, setActiveTab] = useState<"answer" | "dimensions">("answer");
  const [hideReferences, setHideReferences] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // States for translating individual card content
  const [translatedQA, setTranslatedQA] = useState<ResearchQA | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [usedLanguageCode, setUsedLanguageCode] = useState<string>("id");

  // Re-trigger translation when system language updates
  useEffect(() => {
    if (activeLanguage === "id") {
      setTranslatedQA(null);
      setUsedLanguageCode("id");
    } else {
      handleTranslateCard(activeLanguage);
    }
  }, [activeLanguage, research]);

  const handleTranslateCard = async (targetLang: string) => {
    if (targetLang === "id") {
      setTranslatedQA(null);
      setUsedLanguageCode("id");
      return;
    }
    setIsTranslating(true);
    setUsedLanguageCode(targetLang);

    const targetLanguageName = LANGUAGES.find(l => l.code === targetLang)?.name || "English";

    try {
      const translateText = async (origText: string): Promise<string> => {
        try {
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: origText,
              targetLanguage: targetLanguageName
            })
          });
          if (res.ok) {
            const d = await res.json();
            return d.translatedText || origText;
          }
        } catch (e) {
          // Fallback to offline translator
        }
        return translateScientificTextOffline(origText, targetLang);
      };

      const [tQuestion, tSummary, tAnswer, tConclusion, tLimitations, tOpportunities, tCycles, tVision] = await Promise.all([
        translateText(research.question),
        translateText(research.summary),
        translateText(research.answer),
        translateText(research.analysis.conclusion),
        translateText(research.analysis.limitations),
        translateText(research.analysis.opportunities),
        translateText(research.analysis.cycles),
        translateText(research.analysis.visionMission),
      ]);

      setTranslatedQA({
        ...research,
        question: tQuestion,
        summary: tSummary,
        answer: tAnswer,
        analysis: {
          conclusion: tConclusion,
          limitations: tLimitations,
          opportunities: tOpportunities,
          cycles: tCycles,
          visionMission: tVision
        }
      });
    } catch (err) {
      console.warn("Card translation failed, using offline fallback:", err);
      // Fallback
    } finally {
      setIsTranslating(false);
    }
  };

  // Switch between original and translated structure
  const displayQA = translatedQA || research;

  // Custom styling rules for academic/science tags
  const getTagStyle = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("ekonomi") || t.includes("pasar") || t.includes("bisnis") || t.includes("usaha")) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (t.includes("sains") || t.includes("teknologi") || t.includes("fisika") || t.includes("kimia") || t.includes("biologi")) {
      return "bg-violet-50 text-violet-700 border-violet-200";
    }
    if (t.includes("kelautan") || t.includes("samudera") || t.includes("air")) {
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    }
    if (t.includes("api")) {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }
    if (t.includes("udara") || t.includes("cakrawala")) {
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
    if (t.includes("tanah") || t.includes("pertanian") || t.includes("perkebunan") || t.includes("peternakan") || t.includes("pertanahan")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-250";
    }
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  const formattedDate = new Date(research.createdAt).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const handleCopy = () => {
    const biblioText = research.bibliographies
      .map((b) => `${b.id} ${b.title}. ${b.author || "Anonim"} (${b.year || "N/A"}). ${b.source}.`)
      .join("\n");

    const fullText = `
PERTANYAAN RISET:
${research.question}

RINGKASAN:
${research.summary}

JAWABAN ANALISIS:
${research.answer}

KESIMPULAN:
${research.analysis.conclusion}

BATASAN:
${research.analysis.limitations}

PELUANG PERSPEKTIF BISNIS:
${research.analysis.opportunities}

SIKLUS DAN PEMBANGUNAN MASA DEPAN:
${research.analysis.cycles}

VISI MISI DUNIA:
${research.analysis.visionMission}

LITERATUR / DAFTAR PUSTAKA:
${biblioText}
    `.trim();

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id={`research-card-${research.id}`} className="research-ui-card transition-all duration-300 overflow-hidden flex flex-col mb-6">
      {/* Card Header & Metadata */}
      <div className="p-6 pb-4 border-b border-slate-100/50">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          {/* Category Tag */}
          <span className="px-3 py-1 text-[11px] font-bold font-mono tracking-wider text-slate-500 uppercase bg-slate-100/40 rounded-full border border-slate-200/25">
            {research.category}
          </span>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-mono">
            <Calendar size={12} />
            <span>{formattedDate}</span>
            {research.isOfflineDraft && (
              <span className="px-2 py-0.5 bg-amber-500/15 text-amber-700 font-bold rounded-lg text-[10px] font-mono border border-amber-500/30 uppercase animate-pulse">
                Draf Offline (Belum Sinkron)
              </span>
            )}
            {research.isCustom && !research.isOfflineDraft && (
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold rounded-lg text-[10px] font-mono border border-emerald-500/20 uppercase">
                Oleh: {research.author || "Peneliti Tamu"}
              </span>
            )}
          </div>
        </div>

        {/* The Question with translation status indicator */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold leading-snug transition-colors research-ui-title">
            {displayQA.question}
          </h3>
          
          {isTranslating && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50/80 border border-indigo-200 text-indigo-700 font-mono text-[9.5px] font-bold rounded-lg animate-pulse shrink-0">
              <RefreshCw size={10} className="animate-spin" />
              <span>Translating...</span>
            </div>
          )}
          
          {translatedQA && !isTranslating && (
            <button
              onClick={() => setTranslatedQA(null)}
              className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-rose-50 border border-emerald-250 hover:border-rose-200 text-emerald-700 hover:text-rose-700 font-mono text-[9.5px] font-bold rounded-lg shrink-0 transition"
              title="Klik untuk kembalikan ke Bahasa asli"
            >
              <Sparkles size={10} className="text-emerald-500" />
              <span>{usedLanguageCode.toUpperCase()} view (Reset)</span>
            </button>
          )}
        </div>

        {/* Specific tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {displayQA.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-mono border ${getTagStyle(tag)}`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Captured Lab Attachment */}
        {displayQA.imageAttachment && (
          <div className="mt-4 border border-slate-200/50 rounded-2xl overflow-hidden bg-slate-50/50 p-2 max-w-md">
            <div className="relative group overflow-hidden rounded-xl bg-slate-100">
              <img 
                src={displayQA.imageAttachment} 
                alt="Lampiran Riset Akademik" 
                className="w-full h-48 sm:h-54 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded-lg tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Lampiran Foto Lapangan / Lab
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Menu Navigation */}
      <div className="flex border-b border-slate-100/10 bg-slate-50/10 px-6">
        <button
          onClick={() => setActiveTab("answer")}
          className={`py-3 px-4 text-xs font-bold font-mono uppercase tracking-wider transition-colors border-b-2 -mb-px cursor-pointer research-ui-tab ${
            activeTab === "answer"
              ? "research-ui-tab-active border-emerald-600"
              : "border-transparent text-slate-500 hover:text-slate-400"
          }`}
        >
          {activeLanguage === "en" ? "Litera Answer" : activeLanguage === "es" ? "Respuesta Litera" : activeLanguage === "ja" ? "リテラの回答" : activeLanguage === "de" ? "Litera Antwort" : activeLanguage === "fr" ? "Réponse Litera" : activeLanguage === "zh" ? "系统回答" : "Jawaban Litera"}
        </button>
        <button
          onClick={() => setActiveTab("dimensions")}
          className={`py-3 px-4 text-xs font-bold font-mono uppercase tracking-wider transition-colors border-b-2 -mb-px cursor-pointer research-ui-tab ${
            activeTab === "dimensions"
              ? "research-ui-tab-active border-emerald-600"
              : "border-transparent text-slate-500 hover:text-slate-400"
          }`}
        >
          {activeLanguage === "en" ? "Research Dimensions" : activeLanguage === "es" ? "Dimensiones de Investigación" : activeLanguage === "ja" ? "研究の多角的詳細" : activeLanguage === "de" ? "Forschungsdimensionen" : activeLanguage === "fr" ? "Dimensions de Recherche" : activeLanguage === "zh" ? "研究维度" : "Dimensi Riset Peneliti"}
        </button>
      </div>

      {/* Card Body - Content View */}
      <div className="p-6 flex-grow">
        {activeTab === "answer" ? (
          <div className="space-y-4">
            {/* Rich Markdown Answer Wrapper */}
            <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold font-mono text-emerald-600 uppercase block mb-1">
                {activeLanguage === "en" ? "Conceptual Summary:" : activeLanguage === "es" ? "Resumen Conceptual:" : activeLanguage === "ja" ? "要約レビュー:" : activeLanguage === "de" ? "Konzeptuelle Zusammenfassung:" : activeLanguage === "fr" ? "Résumé Conceptuel:" : activeLanguage === "zh" ? "核心内容摘要:" : "Ringkasan Konseptual:"}
              </span>
              <p className="text-slate-750 text-sm font-sans italic">{displayQA.summary}</p>
            </div>
            <div className="mt-4 pt-1">
              <LiteMarkdown content={displayQA.answer} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Conclusion */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-emerald-50/20 hover:bg-emerald-50/30 transition-all">
              <div className="flex items-center gap-2 mb-2 text-emerald-700">
                <Compass size={16} />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  {UI_TRANSLATIONS.conclusion_label[activeLanguage] || "Kesimpulan Analisis"}
                </h4>
              </div>
              <p className="text-slate-650 text-xs leading-relaxed text-justify">{displayQA.analysis.conclusion}</p>
            </div>

            {/* Limitations & Policy Regs */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-rose-50/10 hover:bg-rose-50/20 transition-all">
              <div className="flex items-center gap-2 mb-2 text-rose-700">
                <AlertTriangle size={16} />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  {UI_TRANSLATIONS.limitations_label[activeLanguage] || "Batasan & Regulasi Pendukung"}
                </h4>
              </div>
              <p className="text-slate-650 text-xs leading-relaxed text-justify">{displayQA.analysis.limitations}</p>
            </div>

            {/* Opportunities & Business */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-amber-50/15 hover:bg-amber-50/35 transition-all">
              <div className="flex items-center gap-2 mb-2 text-amber-700">
                <Lightbulb size={16} />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  {UI_TRANSLATIONS.opportunities_label[activeLanguage] || "Peluang Usaha & Proyeksi Bisnis"}
                </h4>
              </div>
              <p className="text-slate-650 text-xs leading-relaxed text-justify">{displayQA.analysis.opportunities}</p>
            </div>

            {/* Cycles and Development */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-cyan-50/10 hover:bg-cyan-50/25 transition-all">
              <div className="flex items-center gap-2 mb-2 text-cyan-700">
                <TrendingUp size={16} />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  {UI_TRANSLATIONS.cycles_label[activeLanguage] || "Siklus Pemutakhiran Ekologis"}
                </h4>
              </div>
              <p className="text-slate-650 text-xs leading-relaxed text-justify">{displayQA.analysis.cycles}</p>
            </div>

            {/* World Vision / Global Mission */}
            <div className="md:col-span-2 border border-slate-100 rounded-2xl p-4 bg-indigo-50/10 hover:bg-indigo-50/20 transition-all">
              <div className="flex items-center gap-2 mb-2 text-indigo-700">
                <Globe size={16} />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  {UI_TRANSLATIONS.vision_label[activeLanguage] || "Visi Masa Depan Dunia"}
                </h4>
              </div>
              <p className="text-slate-650 text-xs leading-relaxed text-justify">{displayQA.analysis.visionMission}</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer - Dynamic Literatures Disclosing Section */}
      <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
        {/* Disclosed bibliography stats */}
        <div className="flex items-center gap-2.5">
          <BookOpen size={16} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-600 font-mono">
            {research.bibliographies.length} Rujukan Akademis Terpercaya {hideReferences ? "(Disembunyikan)" : "(Ditampilkan)"}
          </span>
          <button
            onClick={() => setHideReferences(!hideReferences)}
            className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors cursor-pointer"
            title={hideReferences ? "Tampilkan Rujukan Akademik" : "Sembunyikan Rujukan"}
          >
            {hideReferences ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto self-end md:self-auto justify-end">
          {/* Export to Word (.doc) */}
          <button
            id={`export-word-${research.id}`}
            onClick={() => downloadAsWord(research)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 text-xs font-bold font-mono rounded-xl transition duration-200 cursor-pointer"
            title="Download sebagai Dokumen MS Word (.doc)"
          >
            <Download size={13} />
            <span>Word</span>
          </button>

          {/* Export/Print to PDF */}
          <button
            id={`print-pdf-${research.id}`}
            onClick={() => printAsPDF(research)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-55 border border-emerald-200 hover:bg-emerald-100/60 text-emerald-800 text-xs font-bold font-mono rounded-xl transition duration-200 cursor-pointer"
            title="Cetak Laporan / Simpan PDF"
          >
            <Printer size={13} />
            <span>PDF</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-bold font-mono rounded-xl transition duration-200 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Salin Jawaban</span>
              </>
            )}
          </button>

          {onDelete && (
            <button
              onClick={() => {
                if(confirm("Apakah Anda yakin ingin menghapus arsip analisis ini?")) {
                  onDelete(research.id);
                }
              }}
              className="px-3 py-1.5 hover:bg-rose-50 border border-transparent hover:border-rose-100 text-rose-600 text-xs font-bold font-mono rounded-xl transition cursor-pointer"
            >
              Hapus
            </button>
          )}
        </div>
      </div>

      {/* Disclosed bibliographies shelf */}
      {!hideReferences && (
        <div className="px-6 py-5 bg-emerald-50/10 border-t border-slate-105 space-y-3.5 transition-all duration-350 animation-fade-in text-xs text-slate-650">
          <h5 className="font-bold text-[11px] font-mono uppercase text-emerald-700 tracking-wider">
            Sistem Literatur Rujukan Ilmiah & Jurnal Pendukung
          </h5>
          <div className="grid grid-cols-1 gap-3.5">
            {research.bibliographies.map((bib) => (
              <div 
                key={bib.id} 
                className="p-3.5 bg-white border border-slate-100 hover:border-emerald-200 rounded-xl flex flex-col md:flex-row gap-2 justify-between items-start md:items-center shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] font-mono shrink-0">
                      {bib.id}
                    </span>
                    <span className="font-semibold text-slate-800 font-sans leading-tight">
                      {bib.title}
                    </span>
                  </div>
                  <div className="pl-8 text-[11px] text-slate-500 font-sans">
                    Arsip rujukan: {bib.author || "Anonim Peneliti"} &middot; {bib.year || "Tidak Teridentifikasi"} &middot; {bib.source}
                  </div>
                </div>
                {bib.url && (
                  <a
                    href={bib.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="ml-8 md:ml-0 inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 hover:text-emerald-800 hover:underline"
                  >
                    <span>Terbuka Akademik</span> &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="pt-2 text-[10px] italic text-slate-400 font-mono text-center">
            * Seluruh rujukan di atas disaring berdasarkan tinjauan literatur global yang terpercaya dan divalidasi silang.
          </div>
        </div>
      )}
    </div>
  );
}
