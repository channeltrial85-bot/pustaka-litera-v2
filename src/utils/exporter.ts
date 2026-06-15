import { ResearchQA } from "../types";

/**
 * Utility helper to trigger client-side file downloads.
 */
function triggerDownload(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates an elegant Microsoft Word (.doc) compatible HTML string.
 */
export function downloadAsWord(research: ResearchQA) {
  const biblioText = research.bibliographies
    .map((b) => `<li><strong>${b.id}</strong> ${b.title} oleh <em>${b.author || "Anonim"}</em> (${b.year || "N/A"}). Terbitan: ${b.source}.</li>`)
    .join("");

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${research.question.substring(0, 50)}</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #1e293b; padding: 20px; }
        h1 { color: #047857; font-size: 22px; border-bottom: 2px solid #047857; padding-bottom: 8px; margin-bottom: 20px; }
        h2 { color: #0f172a; font-size: 16px; margin-top: 24px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
        .metadata { font-size: 11px; color: #64748b; font-family: 'Courier New', monospace; margin-bottom: 20px; }
        .summary { background-color: #f1f5f9; padding: 12px; border-left: 4px solid #047857; margin-bottom: 20px; font-style: italic; }
        .section-box { padding: 10px; border: 1px solid #e2e8f0; margin-bottom: 140px; }
        .footer { font-size: 10px; text-align: center; color: #94a3b8; margin-top: 50px; border-top: 1px dashed #cbd5e1; padding-top: 10px; }
      </style>
    </head>
    <body>
      <h1>LAPORAN ANALISIS AKADEMIS LITERA</h1>
      <div class="metadata">
        Kategori: ${research.category}<br/>
        Tanggal Arsip: ${new Date(research.createdAt).toLocaleString("id-ID")}<br/>
        Sistem: Pustaka Analisis & Riset Terintegrasi
      </div>

      <p><strong>Pertanyaan Kajian:</strong></p>
      <div style="font-size: 15px; font-weight: bold; color: #0f172a; margin-bottom: 15px;">
        "${research.question}"
      </div>

      <div class="summary">
        <strong>Ringkasan Eksekutif:</strong><br/>
        ${research.summary}
      </div>

      <h2>A. JAWABAN LITERA UTAMA</h2>
      <div style="text-align: justify;">
        ${research.answer.replace(/\n/g, "<br/>")}
      </div>

      <h2>B. DIMENSI SEKTOR PENELITIAN</h2>
      
      <h3>1. Kesimpulan Terpercaya</h3>
      <p style="text-align: justify;">${research.analysis.conclusion}</p>

      <h3>2. Regulasi & Batasan</h3>
      <p style="text-align: justify;">${research.analysis.limitations}</p>

      <h3>3. Peluang Usaha & Prospek Bisnis</h3>
      <p style="text-align: justify;">${research.analysis.opportunities}</p>

      <h3>4. Analisis Siklus Pembangunan</h3>
      <p style="text-align: justify;">${research.analysis.cycles}</p>

      <h3>5. Visi Misi Dunia Keseluruhan & Kesehatan Global</h3>
      <p style="text-align: justify;">${research.analysis.visionMission}</p>

      <h2>C. DAFTAR PUSTAKA & RUJUKAN ACUAN</h2>
      <ul>
        ${biblioText || "<li>Tidak ada rujukan pustaka yang diunggah.</li>"}
      </ul>

      <div class="footer">
        Laporan diunduh secara sah dari Pustaka Analisis dan Riset Ekonomi Sains &copy; ${new Date().getFullYear()}
      </div>
    </body>
    </html>
  `;

  triggerDownload(html, `Riset_Litera_${research.id}.doc`, "application/msword");
}

/**
 * Generates an elegant Microsoft Word (.doc) containing all researched entries.
 */
export function downloadAllAsWord(researches: ResearchQA[]) {
  if (researches.length === 0) return;

  const sections = researches.map((research, idx) => {
    const biblioText = research.bibliographies
      .map((b) => `<li><strong>${b.id}</strong> ${b.title} oleh <em>${b.author || "Anonim"}</em> (${b.year || "N/A"}).<sup>${b.source}</sup></li>`)
      .join("");

    return `
      <div style="page-break-after: always;">
        <h1 style="color: #047857; font-size: 20px; border-bottom: 2px solid #047857; padding-bottom: 6px;">
          LAPORAN #${idx + 1}: ${research.category}
        </h1>
        <div style="font-size: 11px; color: #64748b; font-family: monospace; margin-bottom: 12px;">
          ID Riset: ${research.id} | Dibuat: ${new Date(research.createdAt).toLocaleString("id-ID")}
        </div>

        <p style="font-size: 14px; font-weight: bold; color: #0f172a;">
          Q: "${research.question}"
        </p>

        <div style="background-color: #f8fafc; padding: 10px; border-left: 3px solid #047857; margin: 12px 0; font-style: italic; font-size: 12px;">
          <strong>Ringkasan Analisis:</strong> ${research.summary}
        </div>

        <h3 style="color: #334155; font-size: 14px; margin-top: 18px;">Penjelasan Ilmiah:</h3>
        <p style="text-align: justify; font-size: 12px; line-height: 1.5;">
          ${research.answer.replace(/\n/g, "<br/>")}
        </p>

        <h3 style="color: #334155; font-size: 14px; margin-top: 18px;">Kesimpulan Riset:</h3>
        <p style="text-align: justify; font-size: 12px;">${research.analysis.conclusion}</p>

        <h3 style="color: #334155; font-size: 14px; margin-top: 10px;">Regulasi & Batasan:</h3>
        <p style="text-align: justify; font-size: 12px;">${research.analysis.limitations}</p>

        <h3 style="color: #334155; font-size: 14px; margin-top: 10px;">Peluang Usaha & Prospek Bisnis:</h3>
        <p style="text-align: justify; font-size: 12px;">${research.analysis.opportunities}</p>

        <h3 style="color: #334155; font-size: 14px; margin-top: 10px;">Siklus & Pembangunan Proyeksi:</h3>
        <p style="text-align: justify; font-size: 12px;">${research.analysis.cycles}</p>

        <h3 style="color: #334155; font-size: 14px; margin-top: 10px;">Visi & Misi Global:</h3>
        <p style="text-align: justify; font-size: 12px;">${research.analysis.visionMission}</p>

        <h3 style="color: #334155; font-size: 13px; margin-top: 15px; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px;">Rujukan Pustaka:</h3>
        <ul style="font-size: 11px; padding-left: 20px;">
          ${biblioText || "<li>Referensi disembunyikan / tidak tersedia.</li>"}
        </ul>
      </div>
    `;
  }).join("<br/><hr style='border: 1px dashed #cbd5e1; margin: 40px 0; page-break-after: always;'/><br/>");

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Bundel_Laporan_Analisis_Riset</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.5; color: #334155; }
      </style>
    </head>
    <body style="padding: 20px;">
      <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px double #047857; padding-bottom: 15px;">
        <h1 style="color: #047857; margin: 0; font-size: 26px;">BUNDEL DOKUMEN PENELITIAN</h1>
        <p style="font-size: 12px; color: #64748b; font-family: monospace; margin: 5px 0 0 0;">
          Pustaka Analisis dan Riset Ekonomi Sains &bull; Total ${researches.length} Laporan Aktual
        </p>
      </div>
      ${sections}
    </body>
    </html>
  `;

  triggerDownload(html, `Koleksi_Laporan_Riset_${Date.now()}.doc`, "application/msword");
}

/**
 * Downloads a list of research elements as a Microsoft Excel compatible HTML calculation table.
 * Excel parses this beautifully with colors, borders, and spreadsheet rows.
 */
export function downloadAsExcel(researches: ResearchQA[]) {
  if (researches.length === 0) return;

  const rows = researches.map((r, i) => {
    const bibList = r.bibliographies
      .map(b => `${b.id} ${b.title} [${b.source}]`)
      .join("; ");

    return `
      <tr style="height: 24px;">
        <td style="border: 1px solid #cbd5e1; text-align: center; font-family: monospace;">${i + 1}</td>
        <td style="border: 1px solid #cbd5e1; font-weight: bold; background-color: #f8fafc;">${r.category}</td>
        <td style="border: 1px solid #cbd5e1;">${r.question}</td>
        <td style="border: 1px solid #cbd5e1; font-style: italic; color: #475569;">${r.summary}</td>
        <td style="border: 1px solid #cbd5e1;">${r.analysis.conclusion}</td>
        <td style="border: 1px solid #cbd5e1;">${r.analysis.limitations}</td>
        <td style="border: 1px solid #cbd5e1; background-color: #fef3c7;">${r.analysis.opportunities}</td>
        <td style="border: 1px solid #cbd5e1;">${r.analysis.cycles}</td>
        <td style="border: 1px solid #cbd5e1;">${r.analysis.visionMission}</td>
        <td style="border: 1px solid #cbd5e1; font-family: monospace; font-size: 10px;">${bibList}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; font-size: 11px;">${new Date(r.createdAt).toLocaleDateString("id-ID")}</td>
      </tr>
    `;
  }).join("");

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Database Arisip Riset</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        th { background-color: #047857; color: #ffffff; font-family: 'Segoe UI', sans-serif; font-size: 12px; font-weight: bold; }
        td { font-family: 'Segoe UI', sans-serif; font-size: 11px; vertical-align: top; }
      </style>
    </head>
    <body>
      <h2 style="font-family: 'Segoe UI', sans-serif; color: #047857; margin-bottom: 5px;">
        DATA AKUMULASI PENELITIAN MULTIDISIPLIN
      </h2>
      <p style="font-family: 'Segoe UI', sans-serif; font-size: 11px; color: #64748b; margin-top: 0; margin-bottom: 20px;">
        Ekspor Otomatis Pustaka Analisis dan Riset Ekonomi Sains &bull; Tanggal Penarikan Syah: ${new Date().toLocaleString("id-ID")}
      </p>

      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="height: 30px;">
            <th style="border: 1px solid #cbd5e1; width: 40px;">No</th>
            <th style="border: 1px solid #cbd5e1; width: 160px;">Disiplin Ilmu</th>
            <th style="border: 1px solid #cbd5e1; width: 280px;">Rumusan Masalah / Pertanyaan</th>
            <th style="border: 1px solid #cbd5e1; width: 220px;">Ringkasan</th>
            <th style="border: 1px solid #cbd5e1; width: 200px;">Kesimpulan Riset</th>
            <th style="border: 1px solid #cbd5e1; width: 200px;">Batasan / Regulasi</th>
            <th style="border: 1px solid #cbd5e1; width: 200px;">Peluang Usaha & Bisnis</th>
            <th style="border: 1px solid #cbd5e1; width: 200px;">Siklus Pembangunan</th>
            <th style="border: 1px solid #cbd5e1; width: 220px;">Visi Misi Global</th>
            <th style="border: 1px solid #cbd5e1; width: 180px;">Daftar Pustaka</th>
            <th style="border: 1px solid #cbd5e1; width: 100px;">Tanggal Dibuat</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </body>
    </html>
  `;

  triggerDownload(html, `Database_Kajian_EkonomiSains_${Date.now()}.xls`, "application/vnd.ms-excel");
}

/**
 * Open a customized, styled printable window to perform browser-native, vector-perfect PDF Export.
 * The standard 'window.print()' delivers perfectly razor-sharp, lightweight, beautiful PDF copies of the paper.
 */
export function printAsPDF(research: ResearchQA) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Popup diblokir! Izinkan popup untuk mencetak laporan akademis PDF.");
    return;
  }

  const bibLines = research.bibliographies
    .map(b => `<li class="bib-item"><strong>${b.id}</strong> ${b.title}. ditulis oleh <em>${b.author || "Anonim Peneliti"}</em> (${b.year || "N/A"}). <strong>${b.source}</strong></li>`)
    .join("");

  const pageHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Laporan_Riset_${research.id}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #0f172a;
          background-color: #ffffff;
          padding: 40px;
          margin: 0;
        }
        
        @media print {
          body { padding: 0px; font-size: 12px; }
          .no-print { display: none; }
          .page-break { page-break-after: always; }
        }

        .header-section {
          border-bottom: 3px solid #059669;
          padding-bottom: 20px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .title-main {
          font-size: 24px;
          font-weight: 800;
          color: #059669;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .subtitle-desc {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #64748b;
          margin: 4px 0 0 0;
        }

        .badge-kategori {
          display: inline-block;
          background-color: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 4px 10px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-bold: 600;
          font-size: 10px;
          color: #334155;
          text-transform: uppercase;
        }

        .question-box {
          background-color: #f8fafc;
          border-left: 4px solid #10b981;
          padding: 20px;
          border-radius: 0 12px 12px 0;
          margin-bottom: 30px;
        }

        .question-box h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
          color: #1e293b;
        }

        .summary-box {
          font-size: 12px;
          font-style: italic;
          color: #475569;
          border-bottom: 1px dashed #e2e8f0;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }

        .core-answer {
          text-align: justify;
          margin-bottom: 40px;
          font-size: 13px;
        }

        .core-answer h3, .core-answer h2 {
          font-size: 15px;
          color: #0f172a;
          margin-top: 24px;
          margin-bottom: 10px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 4px;
        }

        .dimension-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 35px;
        }

        .dimension-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 15px;
          background-color: #fafafa;
        }

        .dimension-card h4 {
          margin: 0 0 8px 0;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: 'JetBrains Mono', monospace;
          color: #059669;
        }

        .dimension-card p {
          margin: 0;
          font-size: 11.5px;
          color: #334155;
          text-align: justify;
        }

        .full-span {
          grid-column: span 2;
        }

        .bib-section {
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
          margin-top: 30px;
        }

        .bib-section h3 {
          font-size: 12px;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          color: #475569;
          margin-bottom: 15px;
        }

        .bib-list {
          padding-left: 20px;
          margin: 0;
        }

        .bib-item {
          font-size: 11px;
          color: #334155;
          margin-bottom: 8px;
        }

        .print-btn-bar {
          background-color: #f1f5f9;
          padding: 12px;
          text-align: center;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .btn-print {
          background-color: #059669;
          color: white;
          border: none;
          padding: 8px 18px;
          font-size: 12px;
          font-weight: bold;
          font-family: 'JetBrains Mono', monospace;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-print:hover {
          background-color: #047857;
        }

        .footer-watermark {
          text-align: center;
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          margin-top: 60px;
          border-top: 1px solid #f1f5f9;
          padding-top: 15px;
        }
      </style>
    </head>
    <body>
      <!-- Top floating controller barred from standard print -->
      <div class="print-btn-bar no-print">
        <p style="margin: 0 0 10px 0; font-size: 11px; color: #475569; font-weight: 500;">
          Tekan tombol di bawah untuk mencetak langsung atau menyimpannya sebagai berkas PDF murni:
        </p>
        <button class="btn-print" onclick="window.print()">
          Cetak Dokumen & Simpan PDF
        </button>
      </div>

      <div class="header-section">
        <div>
          <h1 class="title-main">LAPORAN PENELITIAN & RISET ACUAN</h1>
          <p class="subtitle-desc">Pustaka Analisis dan Riset Ekonomi Sains Terpadu</p>
        </div>
        <div>
          <span class="badge-kategori">${research.category}</span>
        </div>
      </div>

      <div style="font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #64748b; margin-bottom: 15px;">
        Asal Dokumen: Registrasi Litera Digital &bull; Kode Riset: ${research.id.toUpperCase()} &bull; Tanggal Arsip: ${new Date(research.createdAt).toLocaleString("id-ID")}
      </div>

      <div class="question-box">
        <span style="font-size: 10px; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; color: #10b981; display: block; margin-bottom: 6px; font-weight:700;">
          RUMUSAN MASALAH UTAMA:
        </span>
        <h2>"${research.question}"</h2>
      </div>

      <div class="summary-box">
        <strong>Ringkasan Eksekutif:</strong> ${research.summary}
      </div>

      <div class="core-answer">
        <h3 style="border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; color: #059669; font-family:'JetBrains Mono', monospace; text-transform:uppercase; font-size:11px;">
          I. Penjelasan Literatur Konseptual & Analisis Fisika-Kimia
        </h3>
        <div style="white-space: pre-wrap;">${research.answer}</div>
      </div>

      <div class="core-answer">
        <h3 style="border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; color: #059669; font-family:'JetBrains Mono', monospace; text-transform:uppercase; font-size:11px; margin-bottom: 15px;">
          II. Matriks Penilaian Sektor Kajian
        </h3>
        
        <div class="dimension-grid">
          <div class="dimension-card">
            <h4>Kesimpulan Terpercaya</h4>
            <p>${research.analysis.conclusion}</p>
          </div>
          
          <div class="dimension-card">
            <h4>Batasan & Peraturan</h4>
            <p>${research.analysis.limitations}</p>
          </div>
          
          <div class="dimension-card">
            <h4>Peluang Usaha & Bisnis</h4>
            <p>${research.analysis.opportunities}</p>
          </div>
          
          <div class="dimension-card">
            <h4>Siklus Ekosistem & Pembangunan</h4>
            <p>${research.analysis.cycles}</p>
          </div>
          
          <div class="dimension-card full-span">
            <h4>Visi Misi Dunia Keseluruhan & Kesehatan Global</h4>
            <p>${research.analysis.visionMission}</p>
          </div>
        </div>
      </div>

      <div class="bib-section">
        <h3>III. Daftar Literatur Terpercaya & Pustaka Pendukung</h3>
        <ul class="bib-list">
          ${bibLines || "<li class=\"bib-item\">Referensi disembunyikan atau rujukan daring yang terproteksi.</li>"}
        </ul>
      </div>

      <div class="footer-watermark">
        Dihasilkan secara resmi oleh Sistem Litera Riset &copy; ${new Date().getFullYear()} &bull; Terdaftar Akademik Global &bull; Seluruh hak cipta terlindungi hukum negara.
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(pageHtml);
  printWindow.document.close();
}
