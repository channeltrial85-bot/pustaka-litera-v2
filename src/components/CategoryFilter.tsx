import React from "react";
import { ResearchCategory } from "../types";
import { Search, SlidersHorizontal, BookOpen } from "lucide-react";
import { UI_TRANSLATIONS } from "../utils/translator";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  availableTags: string[];
  activeLanguage?: string;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
  availableTags,
  activeLanguage = "id"
}: CategoryFilterProps) {
  const categories = ["Semua Disiplin", ...Object.values(ResearchCategory)];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 p-6 shadow-sm mb-6 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        {/* Search Input */}
        <div id="search-input-container" className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            id="search-query-field"
            type="text"
            placeholder={UI_TRANSLATIONS.search_placeholder[activeLanguage] || UI_TRANSLATIONS.search_placeholder.id}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
          />
        </div>

        {/* Category Pill Navigation */}
        <div id="quick-tag-info" className="flex items-center gap-2 text-xs text-slate-500 mt-2 md:mt-0 font-mono">
          <BookOpen size={14} className="text-emerald-500" />
          <span>Arsip Litera Terpercaya</span>
        </div>
      </div>

      {/* Main Categories Row */}
      <div id="category-pills" className="mb-4">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
          {UI_TRANSLATIONS.title_categories[activeLanguage] || "Saring Berdasarkan Bidang Studi"}
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat || (cat === "Semua Disiplin" && selectedCategory === "");
            // Quick localized categories representation
            let displayName = cat;
            if (activeLanguage !== "id" && cat === "Semua Disiplin") {
              displayName = activeLanguage === "en" ? "All Disciplines" : activeLanguage === "es" ? "Todas las Disciplinas" : activeLanguage === "ja" ? "すべての分野" : activeLanguage === "de" ? "Alle Disziplinen" : activeLanguage === "fr" ? "Toutes les Disciplines" : activeLanguage === "zh" ? "全部领域" : "All Disciplines";
            }
            return (
              <button
                id={`cat-button-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                key={cat}
                onClick={() => onSelectCategory(cat === "Semua Disiplin" ? "" : cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 border-slate-950 text-white shadow-sm scale-102"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Scientific Tags Scroll */}
      {availableTags.length > 0 && (
        <div id="tags-sub-navigation">
          <div className="flex items-center gap-2 mb-2">
            <SlidersHorizontal size={12} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              {UI_TRANSLATIONS.title_tags[activeLanguage] || "Saringan Tag Spesifik:"}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-2 scrollbar-thin">
            <button
              id="tag-button-all"
              onClick={() => onSelectTag("")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                selectedTag === ""
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold"
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              #Semua_Tag
            </button>
            {availableTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  id={`tag-button-${tag.toLowerCase()}`}
                  key={tag}
                  onClick={() => onSelectTag(tag)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500 text-white border border-emerald-600 font-bold shadow-sm"
                      : "bg-white border border-slate-250 text-slate-600 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
