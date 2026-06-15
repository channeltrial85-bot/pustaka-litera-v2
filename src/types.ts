export enum ResearchCategory {
  EKONOMI_BISNIS = "Ekonomi, Bisnis & Pasar",
  SAINS_TEKNOLOGI = "Sains, Teknologi & Fisika",
  ALAM_SUMBER_DAYA = "Alam, Kelautan & Pertanian",
  REGULASI_ANALISIS = "Regulasi, Batasan & Jurnal Riset",
  KESEHATAN_MASA_DEPAN = "Kesehatan & Masa Depan Dunia"
}

export interface Bibliography {
  id: string; // Reference symbol like [1], [2]
  title: string;
  author?: string;
  year?: string;
  edition?: string;
  source: string; // Journal name, regulation document number, book title
  url?: string;
}

export interface ResearchQA {
  id: string;
  category: ResearchCategory;
  tags: string[]; // e.g. ["Ekonomi", "Sains", "Kelautan", "Fisika", "Api"]
  question: string;
  summary: string;
  answer: string; // Markdown formatted main answer
  analysis: {
    conclusion: string; // Kesimpulan tepercaya
    limitations: string; // Batasan / ketiadaan batasan
    opportunities: string; // Peluang usaha dan bisnis
    cycles: string; // Siklus pembangunan dan masa depan
    visionMission: string; // Visi / Misi dunia keseluruhan terkait hal ini
  };
  bibliographies: Bibliography[];
  createdAt: string;
  isCustom?: boolean; // User created
  isOfflineDraft?: boolean; // Created while offline, pending sync status
  author?: string; // Author's name or username
  imageAttachment?: string; // Captured photo Base64 string associated with this research
}

export interface User {
  username: string;
  email: string;
  password?: string; // Store optional local mock hashed password
  fullName?: string;
  createdAt: string;
}
