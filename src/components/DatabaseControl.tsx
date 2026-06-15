import React, { useState, useRef } from "react";
import { ResearchQA, User } from "../types";
import { 
  Database, 
  DownloadCloud, 
  UploadCloud, 
  Trash2, 
  CheckCircle, 
  AlertTriangle,
  HardDrive,
  Activity,
  FileJson,
  RefreshCw,
  Search,
  BookOpen
} from "lucide-react";

interface DatabaseControlProps {
  researches: ResearchQA[];
  onImportDatabase: (importedList: ResearchQA[]) => void;
  onClearDatabase: () => void;
  onRestoreDefaults: () => void;
}

export default function DatabaseControl({ 
  researches, 
  onImportDatabase, 
  onClearDatabase, 
  onRestoreDefaults 
}: DatabaseControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dbSearch, setDbSearch] = useState("");
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate storage usage in localStorage
  const calculateStorageSize = () => {
    let totals = 0;
    try {
      for (const x in localStorage) {
        if (localStorage.hasOwnProperty(x)) {
          totals += (localStorage[x].length + x.length) * 2; // approximation in bytes
        }
      }
    } catch {
      totals = 0;
    }
    return (totals / 1024).toFixed(2); // in KB
  };

  // Export entire DB to a JSON File
  const handleExportBackup = () => {
    try {
      // Package both research lists and user profiles
      const dbBackup = {
        app: "Litera Research Library",
        timestamp: new Date().toISOString(),
        version: "2.5",
        researches: researches,
        users: JSON.parse(localStorage.getItem("litera_users") || "[]")
      };

      const jsonStr = JSON.stringify(dbBackup, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `litera_database_backup_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Gagal melakukan ekspor data.");
    }
  };

  // Import JSON file with validator
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError("");
    setImportSuccess("");
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && Array.isArray(parsed.researches)) {
          // Import researches list
          onImportDatabase(parsed.researches);
          
          // Optionally import users if present
          if (Array.isArray(parsed.users) && parsed.users.length > 0) {
            const currentUsers: User[] = JSON.parse(localStorage.getItem("litera_users") || "[]");
            // Merge users avoiding duplicate usernames/emails
            const combined = [...currentUsers];
            parsed.users.forEach((u: User) => {
              if (!combined.some(exist => exist.username === u.username || exist.email === u.email)) {
                combined.push(u);
              }
            });
            localStorage.setItem("litera_users", JSON.stringify(combined));
          }

          setImportSuccess(`Sukses! Mengimpor ${parsed.researches.length} data riset kajian dan pengguna.`);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else if (Array.isArray(parsed)) {
          // Allow importing simple arrays of ResearchQA
          onImportDatabase(parsed);
          setImportSuccess(`Sukses mengimpor ${parsed.length} data rujukan dari cadangan array sederhana.`);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          setImportError("Format cadangan tidak didukung. Pastikan berkas cadangan Litera valid.");
        }
      } catch (err) {
        setImportError("Gagal membaca file JSON. Pastikan format penulisan file valid.");
      }
    };
    reader.readAsText(file);
  };

  // Filter researches inside the mini DB diagnostics search table
  const searchFiltered = researches.filter(r => 
    r.question.toLowerCase().includes(dbSearch.toLowerCase()) ||
    r.category.toLowerCase().includes(dbSearch.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-3xs overflow-hidden transition-all duration-300">
      {/* Interactive header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition select-none"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Database size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 font-sans">
              Manajemen Database & Penyimpanan Lokal
            </h3>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Pusat monitoring, ekspor-impor JSON, dan reset database terintegrasi ({researches.length} data tersimpan)
            </p>
          </div>
        </div>

        <button 
          id="toggle-db-control-btn"
          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono font-bold transition-all"
        >
          {isOpen ? "Sembunyikan Panel" : "Buka Panel Kontrol"}
        </button>
      </div>

      {isOpen && (
        <div id="db-control-body" className="border-t border-slate-100 p-6 space-y-6 bg-slate-50/40 animate-fade-in text-xs">
          
          {/* Diagnostic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-3xs">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <HardDrive size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">UKURAN STORAGE</span>
                <span className="text-sm font-extrabold text-slate-850 font-mono">
                  {calculateStorageSize()} KB
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-3xs">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Activity size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">STRUKTUR TABEL SCHEMA</span>
                <span className="text-xs font-bold text-slate-800 font-sans">
                  Relasional Relatif (2 Tabel)
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-3xs">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <FileJson size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">FORMAT ENCODING</span>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  JSON UTF-8 TEXT
                </span>
              </div>
            </div>
          </div>

          {/* Core backup / restore buttons */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
              <RefreshCw size={14} className="text-slate-500" />
              Tindakan Cadangan (Backup, Restore, & Reset)
            </h4>

            {importError && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>{importError}</span>
              </div>
            )}

            {importSuccess && (
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-r-xl flex items-center gap-2">
                <CheckCircle size={14} />
                <span>{importSuccess}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {/* Export Button */}
              <button
                id="db-btn-export-json"
                onClick={handleExportBackup}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-mono font-bold transition duration-200 cursor-pointer shadow-sm"
              >
                <DownloadCloud size={14} />
                <span>Unduh Cadangan Database (.json)</span>
              </button>

              {/* Import Button Trigger */}
              <button
                id="db-btn-trigger-import"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-emerald-400 hover:bg-slate-800 rounded-xl font-mono font-bold border border-slate-800 transition duration-200 cursor-pointer"
              >
                <UploadCloud size={14} />
                <span>Unggah Cadangan (.json)</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Reset to Defaults */}
              <button
                id="db-btn-restore-initial"
                onClick={onRestoreDefaults}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-650 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl font-mono font-bold transition cursor-pointer"
              >
                <span>Pulihkan Bawaan</span>
              </button>

              {/* Wipe all Database */}
              <button
                id="db-btn-wipe-all"
                onClick={() => {
                  if (confirm("PERINGATAN KRITIS: Apakah Anda yakin ingin mengosongkan seluruh database? Ini akan menghapus semua riset kustom Anda secara permanen.")) {
                    onClearDatabase();
                    setImportSuccess("Database berhasil dikosongkan.");
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 rounded-xl font-mono font-bold transition ml-auto cursor-pointer"
              >
                <Trash2 size={13} />
                <span>Kosongkan DB</span>
              </button>
            </div>
          </div>

          {/* Interactive Database Internal Query Browser */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h4 className="font-bold text-slate-850 flex items-center gap-1.5">
                <BookOpen size={14} className="text-emerald-600" />
                Browser Struktur Kueri Data
              </h4>
              <div className="relative">
                <Search className="absolute left-2.5 top-2 text-slate-400" size={13} />
                <input
                  id="db-query-search"
                  type="text"
                  placeholder="Kueri saring cepat..."
                  value={dbSearch}
                  onChange={(e) => setDbSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] w-full sm:w-48 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:bg-white font-mono"
                />
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl max-h-56 overflow-y-auto">
              <table className="w-full text-left border-collapse font-sans text-[11px]">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 uppercase font-mono text-[9px] border-b border-slate-200 sticky top-0">
                    <th className="px-3 py-2 font-bold">Kategori</th>
                    <th className="px-3 py-2 font-bold">Rumusan Masalah Utama</th>
                    <th className="px-3 py-2 font-bold">Dibuat Oleh</th>
                    <th className="px-3 py-2 font-bold text-center">Status Pustaka</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {searchFiltered.length > 0 ? (
                    searchFiltered.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-2 font-mono text-slate-600 whitespace-nowrap">
                          {row.category}
                        </td>
                        <td className="px-3 py-2 text-slate-800 max-w-xs truncate">
                          {row.question}
                        </td>
                        <td className="px-3 py-2 text-slate-500 font-mono whitespace-nowrap">
                          {row.author || "Peneliti Tamu"}
                        </td>
                        <td className="px-3 py-2 text-center whitespace-nowrap">
                          {row.isCustom ? (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] border border-emerald-100">
                              Kustom/User
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px]">
                              Bawaan Sistem
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-3 py-6 text-center text-slate-400 font-mono">
                        Tidak ada rekaman data kueri yang memenuhi kriteria pencarian
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
