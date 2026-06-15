export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "id", name: "Indonesian", flag: "🇮🇩", nativeName: "Bahasa Indonesia" },
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "es", name: "Spanish", flag: "🇪🇸", nativeName: "Español" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", nativeName: "日本語" },
  { code: "de", name: "German", flag: "🇩🇪", nativeName: "Deutsch" },
  { code: "fr", name: "French", flag: "🇫🇷", nativeName: "Français" },
  { code: "zh", name: "Mandarin Chinese", flag: "🇨🇳", nativeName: "中文 (简体)" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", nativeName: "العربية" },
  { code: "ru", name: "Russian", flag: "🇷🇺", nativeName: "Русский" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", nativeName: "हिन्दी" }
];

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  app_title: {
    id: "Litera Cipta: Perpustakaan Riset Sains, Regulasi & Hidraulik",
    en: "Litera Cipta: Science, Regulation & Hydraulic Research Library",
    es: "Litera Cipta: Biblioteca de Investigación de Ciencias, Regulación e Hidráulica",
    ja: "リテラ・チプタ：科学、規制、水力学研究統合ライブラリ",
    de: "Litera Cipta: Wissenschafts-, Regulierungs- und Hydraulik-Forschungsdatenbank",
    fr: "Litera Cipta : Bibliothèque de Recherche Scientifique, Réglementaire et Hydraulique",
    zh: "Litera Cipta：科学、法规与水力学研究综合图书馆",
    ar: "ليتيرا جيبتا: مكتبة أبحاث العلوم والأنظمة والهيدروليكا",
    ru: "Litera Cipta: Библиотека научных, регуляторных и гидравлических исследований",
    hi: "लिटेरा चिप्ता: विज्ञान, विनियमन और हाइड्रोलिक अनुसंधान पुस्तकालय"
  },
  app_subtitle: {
    id: "Kombinasi analisis teoretis bidang ekonomi, sains tanah, penataan wilayah air, udara, dan api.",
    en: "A combined theoretical analysis of economics, soil science, spatial water distribution, air, and fire.",
    es: "Un análisis teórico combinado de economía, ciencia del suelo, distribución espacial del agua, aire y fuego.",
    ja: "経済学、土壌科学、空間的水分布、大気、および熱力学火の総合的な理論的分析を提供します。",
    de: "Eine kombinierte theoretische Analyse von Wirtschaftswissenschaften, Bodenkunde, räumlicher Wasserverteilung, Luft und Thermo-Feuer.",
    fr: "Une analyse théorique combinée de l'économie, de la science du sol, de la distribution spatiale de l'eau, de l'air et du feu.",
    zh: "经济、土壤学、水空间分布、空气和热力火的综合理论分析体系。",
    ar: "تحليل نظري مشترك للاقتصاد وعلم التربة والتوزيع المكاني للمياه والهواء والنار.",
    ru: "Объединенный теоретический анализ экономики, почвоведения, пространственного распределения воды, воздуха и огня.",
    hi: "अर्थशास्त्र, मृदा विज्ञान, स्थानिक जल वितरण, वायु और अग्नि का संयुक्त सैद्धांतिक विश्लेषण।"
  },
  search_placeholder: {
    id: "Cari rujukan sains terintegrasi (contoh: hidrogen, sawit, air, upwelling, pirolisis)...",
    en: "Search integrated science database (e.g., hydrogen, palm oil, water, upwelling, pyrolysis)...",
    es: "Buscar en la base de datos de ciencias integradas (ej. hidrógeno, palma, agua, afloramiento, pirólisis)...",
    ja: "統合科学データベースを検索 (例：水素、パーム油、水利、湧昇流、熱分解)...",
    de: "Integrierte Wissenschaftsdatenbank durchsuchen (z. B. Wasserstoff, Palmöl, Wasser, Upwelling, Pyrolyse)...",
    fr: "Rechercher dans la base de données scientifique intégrée (ex. hydrogène, palmier, eau, upwelling, pyrolyse)...",
    zh: "搜索综合科学数据库（例如：氢能、棕榈、水利学、涌升流、生物炭热解）...",
    ar: "البحث في قاعدة بيانات العلوم المتكاملة (مثال: الهيدروجين، النخيل، المياه، صعود المياه، الانحلال الحراري)...",
    ru: "Поиск в интегрированной научной базе данных (например: водород, пальмовое масло, вода, апвеллинг, пиролиз)...",
    hi: "एकीकृत विज्ञान डेटाबेस में खोजें (उदा: हाइड्रोजन, ताड़ का तेल, पानी, अपवेलिंग, पायरोलिसिस)..."
  },
  btn_new_question: {
    id: "Tulis Pertanyaan Riset Baru",
    en: "Write New Research Question",
    es: "Escribir Nueva Pregunta de Investigación",
    ja: "新しい研究質問を記述",
    de: "Neue Forschungsfrage schreiben",
    fr: "Rédiger une Nouvelle Question de Recherche",
    zh: "撰写新研究课题",
    ar: "كتابة سؤال بحثي جديد",
    ru: "Написать новый исследовательский вопрос",
    hi: "नया शोध प्रश्न लिखें"
  },
  offline_mode_label: {
    id: "Simulasi Laboratorium Offline",
    en: "Offline Laboratory Simulator",
    es: "Simulador de Laboratorio Offline",
    ja: "オフラインラボシミュレーター",
    de: "Offline-Labor-Simulator",
    fr: "Simulateur de Laboratoire Hors Ligne",
    zh: "离线实验室模拟中心",
    ar: "محاكي المختبر دون اتصال بالإنترنت",
    ru: "Симулятор автономной лаборатории",
    hi: "ऑफ़लाइन प्रयोगशाला सिम्युलेटर"
  },
  btn_auth: {
    id: "Autentikasi & Akun",
    en: "Authentication & Account",
    es: "Autenticación y Cuenta",
    ja: "認証とアカウント",
    de: "Authentifizierung & Konto",
    fr: "Authentification & Compte",
    zh: "用户认证与账户",
    ar: "المصادقة والحساب",
    ru: "Аутентификация и учетная запись",
    hi: "प्रमाणीकरण और खाता"
  },
  btn_download_word: {
    id: "Unduh Semua (.doc)",
    en: "Download All (.doc)",
    es: "Descargar Todo (.doc)",
    ja: "全ドキュメントをダウンロード",
    de: "Alle herunterladen (.doc)",
    fr: "Tout Télécharger (.doc)",
    zh: "下载全套文档 (.doc)",
    ar: "تحميل الكل (.doc)",
    ru: "Скачать все (.doc)",
    hi: "सभी डाउनलोड करें (.doc)"
  },
  btn_export_excel: {
    id: "Ekspor Database (.xlsx)",
    en: "Export Database (.xlsx)",
    es: "Exportar Base de Datos (.xlsx)",
    ja: "データベースのエクスポート (.xlsx)",
    de: "Datenbank exportieren (.xlsx)",
    fr: "Exporter la Base de Données (.xlsx)",
    zh: "导出数据库 (.xlsx)",
    ar: "تصدير قاعدة البيانات (.xlsx)",
    ru: "Экспорт базы данных (.xlsx)",
    hi: "डेटाबेस निर्यात करें (.xlsx)"
  },
  title_statistics: {
    id: "Indikator Visual & Statistik Utama",
    en: "Visual Indicators & Key Statistics",
    es: "Indicadores Visuales y Estadísticas Clave",
    ja: "視覚的指標と主要統計情報",
    de: "Visuelle Indikatoren & Schlüsselstatistiken",
    fr: "Indicateurs Visuels & Statistiques Clés",
    zh: "可视化指标与核心统计学图表",
    ar: "المؤشرات المرئية والإحصاءات الرئيسية",
    ru: "Визуальные индикаторы и ключевая статистика",
    hi: "दृश्य संकेतक और प्रमुख सांख्यिकी"
  },
  title_categories: {
    id: "Saringan Kategori Keilmuan",
    en: "Scientific Categories Filter",
    es: "Filtro de Categorías Científicas",
    ja: "科学分野カテゴリーフィルター",
    de: "Filter für wissenschaftliche Kategorien",
    fr: "Filtre de Catégories Scientifiques",
    zh: "科学领域类别筛选器",
    ar: "تصفية الفئات العلمية",
    ru: "Фильтр научных категорий",
    hi: "वैज्ञानिक श्रेणियों का फ़िल्टर"
  },
  title_tags: {
    id: "Saringan Tag Spesifik:",
    en: "Specific Tags Filter:",
    es: "Filtro de Etiquetas Específicas:",
    ja: "特定タグで絞り込み:",
    de: "Spezifischer Tag-Filter:",
    fr: "Filtre par Motsclés :",
    zh: "特定标签筛选：",
    ar: "تصفية وسوم محددة:",
    ru: "Фильтр конкретных тегов:",
    hi: "विशिष्ट टैग फ़िल्टर:"
  },
  no_results: {
    id: "Ketiadaan hasil rujukan riset yang sesuai pencarian Anda.",
    en: "No research references matched your search.",
    es: "No se encontraron referencias de investigación que coicidan con su búsqueda.",
    ja: "検索条件に一致する研究成果が見つかりません。",
    de: "Keine Forschungsreferenzen entsprechen Ihrer Suche.",
    fr: "Aucune référence de recherche ne correspond à votre recherche.",
    zh: "未发现符合您检索条件的研究文献。",
    ar: "لا توجد مراجع بحثية تطابق بحثك.",
    ru: "Не найдено результатов исследований, соответствующих вашему поиску.",
    hi: "आपकी खोज से मेल खाने वाले कोई शोध संदर्भ नहीं मिले।"
  },
  author_label: {
    id: "Penulis",
    en: "Author",
    es: "Autor",
    ja: "著者",
    de: "Autor",
    fr: "Auteur",
    zh: "撰写人",
    ar: "الكاتب",
    ru: "Автор",
    hi: "लेखक"
  },
  conclusion_label: {
    id: "Kesimpulan Analisis:",
    en: "Analysis Conclusion:",
    es: "Conclusión de Análisis:",
    ja: "分析の結論:",
    de: "Analyse-Schlussfolgerung:",
    fr: "Conclusion de l'Analyse :",
    zh: "分析结论：",
    ar: "خلاصة التحليل:",
    ru: "Заключение анализа:",
    hi: "विश्लेषण का निष्कर्ष:"
  },
  limitations_label: {
    id: "Batasan & Hambatan Regulasi:",
    en: "Limitations & Regulatory Barriers:",
    es: "Limitaciones y Barreras Regulatorias:",
    ja: "規制障壁と限定条件:",
    de: "Einschränkungen & regulatorische Hürden:",
    fr: "Limites et Barrières Réglementaires :",
    zh: "局限性与法规限制：",
    ar: "القيود والعوائق التنظيمية:",
    ru: "Ограничения и регуляторные барьеры:",
    hi: "सीमाएं और विनियामक बाधाएं:"
  },
  opportunities_label: {
    id: "Peluang Bisnis & Solusi Industri:",
    en: "Business Opportunities & Industry Solutions:",
    es: "Oportunidades de Negocio y Soluciones Industriales:",
    ja: "ビジネス展開と産業解決策:",
    de: "Geschäftsmöglichkeiten & Branchenlösungen:",
    fr: "Opportunités Commerciales & Solutions Industrielles :",
    zh: "商业机会与产业实务应用：",
    ar: "فرص العمل والحلول الصناعية:",
    ru: "Бизнес-возможности и отраслевые решения:",
    hi: "व्यावसायिक अवसर और उद्योग समाधान:"
  },
  cycles_label: {
    id: "Siklus Pemutakhiran Ekologis:",
    en: "Ecological Renewal Cycles:",
    es: "Ciclos de Renovación Ecológica:",
    ja: "生態系および環境更新サイクル:",
    de: "Ökologische Erneuerungszyklen:",
    fr: "Cycles de Renouvellement ÉCOLOGIQUE :",
    zh: "生态规律与更新周期：",
    ar: "دورات التجديد البيئي:",
    ru: "Экологические циклы обновления:",
    hi: "पारिस्थितिकी नवीकरण चक्र:"
  },
  vision_label: {
    id: "Visi Masa Depan Dunia:",
    en: "Global Future Vision:",
    es: "Visión del Futuro Global:",
    ja: "グローバルな未来像とビジョン:",
    de: "Globale Zukunftsvision:",
    fr: "Vision du Futur Global :",
    zh: "全球未来发展愿景：",
    ar: "رؤية المستقبل العالمي:",
    ru: "Глобальное видение будущего:",
    hi: "वैश्विक भविष्य का दृष्टिकोण:"
  }
};

/**
 * Offline rule-based translation helper. Maps common Indonesian scientific keywords to target languages 
 * when API is unreachable or has no key. Keeps LaTeX formatting perfectly intact.
 */
export function translateScientificTextOffline(text: string, targetCode: string): string {
  if (targetCode === "id" || !text) return text;

  // Dictionary for regex replacement of scientific/common Indonesian words
  // key: Indonesian phrase, values ordered as [en, es, ja, de, fr, zh, ar, ru, hi]
  const wordMaps: Record<string, string[]> = {
    "Satu Peta Sawit Rakyat": ["One Map Smallholder Palm Oil", "Mapa de Palma de Aceite", "パーム油ワンマッププラットフォーム制", "Eine Map für Kleinbauern-Palmöl", "Une Carte du Palmier à Huile", "小农户棕榈油一张图平台", "خريطة زيت النخيل لصغار المزارعين", "Единая карта мелких производителей пальмового масла", "छोटे किसानों के लिए ताड़ का तेल वन मैप"],
    "Sains, Teknologi & Fisika": ["Science, Technology & Physics", "Ciencia, Tecnología y Física", "科学・技術・物理学", "Wissenschaft, Technologie & Physik", "Science, Technologie & Physique", "科学、技术与物理", "العلوم والتكنولوجيا والفيزياء", "Наука, технологии и физика", "विज्ञान, प्रौद्योगिकी और भौतिकी"],
    "Ekonomi, Bisnis & Pasar": ["Economics, Business & Markets", "Economía, Negocios y Mercados", "経済・ビジネス・市場学", "Wirtschaft, Business & Märkte", "Économie, Affaires & Marchés", "经济、商业与市场", "الاقتصاد والأعمال والأسواق", "Экономика, бизнес и рынки", "अर्थशास्त्र, व्यवसाय और बाजार"],
    "Alam, Kelautan & Pertanian": ["Nature, Oceans & Agriculture", "Naturaleza, Oceanografía y Agricultura", "自然環境・海洋・農業学", "Natur, Ozeane & Landwirtschaft", "Nature, Océans & Agriculture", "自然、海洋与农业", "الطبيعة والمحيطات والزراعة", "Природа, океаны и сельское хозяйство", "प्रकृति, महासागर और कृषि"],
    "Regulasi, Batasan & Jurnal": ["Regulation, Limitations & Journals", "Regulación, Límites y Revistas", "規制・限定条件・ジャーナル", "Regulierung, Einschränkungen & Journale", "Réglementation, Limites & Revues", "法规、限制与期刊等", "اللوائح والحدود والمجلات", "Регулирование, ограничения и журналы", "विनियमन, सीमाएँ और पत्रिकाएँ"],
    "Kesehatan & Masa Depan Dunia": ["Future Global Health", "Salud Global y Futuro", "地球の健康と未来社会", "Globale Gesundheit & Zukunft", "Santé Globale & Futur du Monde", "全球健康与人类未来", "الصحة العالمية ومستقبل العالم", "Глобальное здравоохранение и будущее мира", "वैश्विक स्वास्थ्य और दुनिया का भविष्य"],
    "air": ["water", "agua", "水", "Wasser", "eau", "水", "المياه", "вода", "पानी"],
    "tanah": ["soil", "suelo", "土壌", "Boden", "sol", "土壤", "التربة", "почва", "मिट्टी"],
    "udara": ["air", "aire", "空気", "Luft", "air", "空气", "الهواء", "воздух", "हवा"],
    "api": ["fire", "fuego", "熱量/燃焼", "Feuer", "feu", "热量/火焰", "النار", "огонь", "आग"],
    "hukum": ["law", "ley", "法律", "Gesetz", "loi", "法律", "القانون", "закон", "कानून"],
    "regulasi": ["regulation", "regulación", "規制", "Regulierung", "réglementation", "法规", "التنظيم", "регулирование", "विनियमन"],
    "pirolisis": ["pyrolysis", "pirólisis", "熱分解", "Pyrolyse", "pyrolyse", "热解", "الانحلال الحراري", "пиролиз", "पायरोलिसिस"],
    "sawit": ["palm oil", "palma", "パーム油", "Palmöl", "palme", "棕榈树", "النخيل", "пальма", "ताड़"],
    "samudera": ["ocean", "océano", "海洋", "Ozean", "océan", "海洋", "المحيط", "океан", "महासागर"],
    "riset": ["research", "investigación", "研究", "Forschung", "recherche", "研究", "أبحاث", "исследование", "शोध"],
    "Apakah": ["Is/What", "Es/Qué", "何ですか", "Ist/Was", "Est-ce que", "是否/什么是", "هل", "Что/Является ли", "क्या"],
    "Bagaimana": ["How", "Cómo", "どのように", "Wie", "Comment", "如何", "كيف", "Как", "कैसे"],
    "pustaka": ["bibliography", "bibliografía", "参考文献", "Literaturverzeichnis", "bibliographie", "文献", "مراجع", "библиография", "संदर्भ सूची"],
    "Tinjauan": ["Overview", "Revisión", "概要レビュー", "Übersicht", "Aperçu", "概述与回顾", "مراجعة", "Обзор", "समीक्षा"],
    "Analisis": ["Analysis", "Análisis", "分析", "Analyse", "Analyse", "分析", "تحليل", "Анализ", "विश्लेषण"]
  };

  const langIdxMap: Record<string, number> = {
    en: 0, es: 1, ja: 2, de: 3, fr: 4, zh: 5, ar: 6, ru: 7, hi: 8
  };

  const idx = langIdxMap[targetCode];
  if (idx === undefined) return text;

  let translated = text;
  // Replace terms securely (with word boundaries or simple replaces)
  Object.entries(wordMaps).forEach(([indoKey, translations]) => {
    // Escape regex characters just in case
    const escapedKey = indoKey.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(escapedKey, "gi");
    translated = translated.replace(regex, translations[idx]);
  });

  // Make structural markdown tags translate to natural sounding text
  if (targetCode === "en") {
    translated = translated
      .replace(/### 1. Formulasi Model/g, "### 1. Model Formulation")
      .replace(/### 2. Tinjauan Pustaka/g, "### 2. Literature Review")
      .replace(/Hasil pemantauan/g, "Monitoring results")
      .replace(/Penting/g, "Important")
      .replace(/Kesimpulan/g, "Conclusion")
      .replace(/Peluang/g, "Opportunities")
      .replace(/Batasan/g, "Limitations")
      .replace(/Siklus/g, "Cycles")
      .replace(/Visi/g, "Vision");
  } else if (targetCode === "es") {
    translated = translated
      .replace(/### 1. Formulasi Model/g, "### 1. Formulación del Modelo")
      .replace(/### 2. Tinjauan Pustaka/g, "### 2. Revisión de la Literatura")
      .replace(/Penting/g, "Importante")
      .replace(/Kesimpulan/g, "Conclusión");
  } else if (targetCode === "ja") {
    translated = translated
      .replace(/### 1. Formulasi Model/g, "### 1. 数理モデル定式化")
      .replace(/### 2. Tinjauan Pustaka/g, "### 2. 文献レヴューと背景")
      .replace(/Penting/g, "重要")
      .replace(/Kesimpulan/g, "分析の総括");
  }

  return translated;
}
