import { ResearchQA, ResearchCategory } from "./types";

export const PRELOADED_RESEARCH: ResearchQA[] = [
  {
    id: "research-1",
    category: ResearchCategory.SAINS_TEKNOLOGI,
    tags: ["Sains", "Teknologi", "Fisika", "Air", "Udara", "Masa Depan", "Peluang"],
    question: "Bagaimana analisis potensi hidrogen hijau (green hydrogen) berbasis elektrolisis air dan kompresi udara sebagai pilar transisi energi bersih di Indonesia?",
    summary: "Analisis kelayakan termodinamika produksi hidrogen bersih menggunakan energi air, tantangan tekanan kompresi udara, dan visualisasi efisiensi sistem.",
    answer: "Produksi hidrogen hijau (green hydrogen) memanfaatkan proses elektrolisis untuk memisahkan molekul air (H₂O) menjadi hidrogen (H₂) dan oksigen (O₂) menggunakan sumber listrik dari energi terbarukan seperti pembangkit listrik tenaga air (PLTA) atau surya. \n\nSecara fisika termodinamika, proses ini memerlukan energi Gibbs bebas minimal sebesar **237.2 kJ/mol** pada kondisi standar. Tantangan terbesar terletak pada kompresi udara dan hidrogen untuk penyimpanan densitas tinggi. Hidrogen umumnya dikompresi hingga tekanan **350 hingga 700 bar** memanfaatkan kompresor mekanis multistage guna mengatasi hambatan volatilitas atom hidrogen yang sangat kecil.\n\nDalam konteks nasional, integrasi infrastruktur air sebagai bahan baku utama dan udara sebagai media refrigerasi/pembersih pada sel bahan bakar (fuel cell) membuka dimensi baru bagi kemandirian energi masa depan Indonesia. Teknologi ini meminimalisir emisi gas rumah kaca menuju nol emisi karbon (Net Zero Emission).",
    analysis: {
      conclusion: "Hidrogen hijau merupakan solusi energi masa depan dengan densitas energi tinggi (120 MJ/kg) yang andal jika diproduksi menggunakan surplus daya dari PLTA air mengalir dan didukung regulasi insentif tarif hijau.",
      limitations: "Efisiensi elektroliser komersial saat ini masih terbatas pada kisaran 65-80%. Selain itu, terdapat batasan volatilitas tinggi dari molekul hidrogen yang mampu merembes ke jaringan pipa baja karbon (hydrogen embrittlement).",
      opportunities: "Membuka peluang usaha pembuatan infrastruktur stasiun pengisian hidrogen (Hydrogen Refueling Stations) untuk truk logistik berat dan kapal laut, serta bisnis logistik suplai tabung kompresi.",
      cycles: "Siklus siklik pembangkitan energi bergantung pada curah hujan musiman (siklus hidrologi) yang mempengaruhi volume bendungan PLTA, sehingga memerlukan manajemen penyimpanan baterai buffer.",
      visionMission: "Mewujudkan kemandirian energi bersih nasional ramah lingkungan untuk menciptakan ketahanan industri nasional yang berkelanjutan di era dekarbonisasi global."
    },
    bibliographies: [
      {
        id: "[1]",
        title: "Green Hydrogen Production: Thermodynamical Limits and Future Integration with Hydropower Plants",
        author: "S. Martinez, L. K. Pratama",
        year: "2024",
        source: "Journal of Renewable Energy & Physics Engineering",
        url: "https://example.com/green-hydrogen-thermodynamics"
      },
      {
        id: "[2]",
        title: "Analisis Kebijakan Energi Nasional dan Peta Jalan Hidrogen Hijau Indonesia 2025-2060",
        author: "Kementerian ESDM RI",
        year: "2023",
        source: "Sekretariat Jenderal Dewan Energi Nasional",
        url: "https://example.com/esdm-peta-jalan-hidrogen"
      }
    ],
    createdAt: "2026-05-18T10:00:00Z"
  },
  {
    id: "research-2",
    category: ResearchCategory.ALAM_SUMBER_DAYA,
    tags: ["Kelautan", "Samudera", "Biologi", "Pertanian", "Siklus", "Tanah"],
    question: "Bagaimana dinamika siklus nutrisi kelautan di Samudera Hindia mempengaruhi tingkat kesuburan tanah pertanian pesisir dan pakan peternakan di pesisir selatan Jawa?",
    summary: "Penelitian korelasi antara fenomena upwelling Samudera Hindia Barat Daya dengan sedimentasi mineral serta deposisi aerosol garam kaya nutrisi ke lahan pertanian pesisir.",
    answer: "Samudera Hindia memiliki dinamika unik berupa fenomena upwelling musiman yang dipicu oleh angin muson barat daya. Fenomena ini mengangkat massa air laut dalam yang kaya akan nutrien (fosfat, nitrat, dan silikat) ke permukaan (fotik).\n\nAerosol laut yang terbentuk dari pecahnya ombak samudera di pesisir selatan Jawa membawa trace elements dan senyawa kimia penting seperti natrium, magnesium, dan iodium yang dideposisikan langsung ke tanah pertanian pesisir melalui sirkulasi udara pesisir. \n\nHal ini meningkatkan pH tanah pasir pantai yang tadinya masam/infertil dan memperkaya struktur biologis tanah pendukung tanaman pertanian pesisir (seperti bawang merah pantai dan kelapa). Selanjutnya, gulma laut dan tanaman pakan yang terpapar sirkulasi udara asin ini menghasilkan mineral alami yang sangat baik untuk meningkatkan berat badan hewan peternakan (sapi pesisir) secara signifikan.",
    analysis: {
      conclusion: "Upwelling samudera bukan hanya menguntungkan sektor perikanan, melainkan juga menyuburkan tanah pertanian pesisir selatan melalui perantara sirkulasi aerosol kaya mineral esensial.",
      limitations: "Paparan kadar salinitas udara yang terlalu ekstrem saat angin kencang dapat menyebabkan plasmolisis pada dedaunan tanaman pertanian non-halofit sensitif.",
      opportunities: "Pengembangan pupuk organik cair berbahan dasar makroalga samudera (Sargassum sp.) yang melimpah dan formulasi pakan ternak sapi pesisir kaya iodium organik.",
      cycles: "Siklus tahunan upwelling berulang setiap bulan Juni - Oktober bersamaan dengan dinamika iklim maritim Monsun dan fenomena Dipole Mode Samudera Hindia.",
      visionMission: "Membangun poros ketahanan pangan bahari-terestrial yang terintegrasi untuk memaksimalkan potensi pesisir Indonesia yang kaya mineral laut secara berkelanjutan."
    },
    bibliographies: [
      {
        id: "[1]",
        title: "Oceanic Nutrients Upwelling and Coastal Aerosol Deposition: Impact on Agrarian Sandy Soils",
        author: "A. Wibowo, M. Heinemann",
        year: "2025",
        source: "International Journal of Marine and Agricultural Sciences",
        url: "https://example.com/oceanic-nutrients-dynamics"
      },
      {
        id: "[2]",
        title: "Pemanfaatan Biomassa Rumput Laut Jawa Selatan Bagi Peningkatan Gizi Pakan Ternak Ruminansia",
        author: "Sartono et al.",
        year: "2024",
        source: "Jurnal Riset Peternakan dan Perkebunan Nusantara",
        url: "https://example.com/riset-biomassa-rumput-laut"
      }
    ],
    createdAt: "2026-05-19T14:30:00Z"
  },
  {
    id: "research-3",
    category: ResearchCategory.EKONOMI_BISNIS,
    tags: ["Ekonomi", "Pasar", "Regulasi", "Perkebunan", "Pertanahan", "Usaha", "Bisnis"],
    question: "Apakah dampak regulasi EUDR (European Union Deforestation Regulation) terhadap tata kelola pertanahan dan siklus ekspor pasar kelapa sawit rakyat di Indonesia?",
    summary: "Riset analisis mengenai regulasi pengetatan aspek keterlacakan (traceability) lahan pertanian/perkebunan kelapa sawit rakyat dan peluang bisnis sertifikasi.",
    answer: "European Union Deforestation Regulation (EUDR) menetapkan batas ketat bahwa produk komoditas tertentu (seperti sawit, kopi, cokelat) yang masuk ke pasar Uni Eropa tidak boleh berasal dari lahan yang dideforestasi setelah 31 Desember 2020. Persyaratan utama regulasi ini adalah geo-lokasi plot pertanahan sawit rakyat yang presisi hingga koordinat poligon.\n\nBagi ekosistem pasar kelapa sawit rakyat di Indonesia, hal ini menuntut transformasi radikal dalam administrasi pertanahan nasional. Sertifikat Hak Milik (SHM) dan Surat Pernyataan Fisik Bidang Tanah harus tersinkronisasi dengan satelit pemantau tutupan hutan.\n\nHal ini juga memicu persaingan ketat dalam pemetaan wilayah perkebunan kelapa sawit mandiri dan penataan rantai pasok agar tidak terjebak dalam jalur sanksi atau penolakan di pelabuhan tujuan ekspor.",
    analysis: {
      conclusion: "EUDR mempercepat digitalisasi sektor pertanahan dan sertifikasi hijau (seperti ISPO/RSPO), namun di saat bersamaan berisiko mengeksklusi petani kecil luar kawasan hutan apabila tidak dibantu teknologi pemetaan digital.",
      limitations: "Batasan kapasitas teknis petani skala kecil untuk menyediakan data koordinat poligon digital yang valid serta tumpang tindih kawasan hutan adat dengan peta konsesi perkebunan.",
      opportunities: "Peluang besar bagi industri startup penyedia sistem keterlacakan rantai pasok (Traceability SaaS), konsultan sertifikasi karbon kehutanan, dan agen survei pemetaan udara menggunakan drone.",
      cycles: "Siklus peremajaan sawit (replanting) selama 25 tahun menjadi momentum penting untuk menertibkan sertifikasi legalitas lahan dwi-fungsi sebelum memasuki masa produktif berikutnya.",
      visionMission: "Mensejahterakan petani kelapa sawit rakyat melalui modernisasi penguasaan pertanahan terintegrasi menuju pasar kelapa sawit bebas deforestasi tingkat global."
    },
    bibliographies: [
      {
        id: "[1]",
        title: "The Geopolitics of Deforestation Regulations: EUDR Impact on Developing Agrarian Markets",
        author: "R. Simanjuntak, H. Van Der Berg",
        year: "2025",
        source: "Global Agrarian Policy & Economic Regulation Review",
        url: "https://example.com/eudr-impact-analysis"
      },
      {
        id: "[2]",
        title: "Panduan Integrasi Koordinat Poligon dalam Pendaftaran Sertifikasi Kelapa Sawit Berkelanjutan (ISPO)",
        author: "Direktorat Jenderal Perkebunan Kementan",
        year: "2024",
        source: "Kementerian Pertanian Republik Indonesia",
        url: "https://example.com/kementan-panduan-poligon"
      }
    ],
    createdAt: "2026-05-20T08:15:00Z"
  },
  {
    id: "research-4",
    category: ResearchCategory.REGULASI_ANALISIS,
    tags: ["Riset", "Regulasi", "Kimia", "Api", "Tanah", "Penelitian", "Cakrawala"],
    question: "Bagaimana analisis pirolisis kimia tanah akibat pembakaran lahan (api) terkontrol dan bagaimana batasan pemulihan kandungan unsur mikro fosfor sirkular?",
    summary: "Penelitian pengaruh dekomposisi termal senyawa organik karbon tanah oleh api dan rekonstruksi mineral mikro phospat.",
    answer: "Pembakaran lahan terkontrol menggunakan teknik termal pirolisis mengubah senyawa karbon organik tidak ramah lingkungan menjadi biochar (arang organik) yang sangat stabil di dalam tanah. Proses fisika-kimia ini melepaskan senyawa fosfor anorganik terlarut yang awalnya terikat kuat dalam jaringan selulosa tumbuhan.\n\nSuhu pembakaran (api) harus dijaga ketat di bawah **450°C** agar nitrogen alami tidak menguap sepenuhnya (volatilisasi). Pembakaran di atas suhu tersebut akan merusak koloid tanah liat alami dan meluluhkan sebagian besar mikroba tanah menguntungkan, menyisakan tanah gersang mati tanpa nutrisi.\n\nDengan memetakan sisa abu organik ke cakrawala pertanahan makro, peneliti dapat mempermudah pemulihan siklus fosfor esensial tanah untuk peremajaan tanaman pertanian semusim.",
    analysis: {
      conclusion: "Aplikasi biochar hasil pirolisis tanah yang dikendalikan secara termal secara ilmiah mampu melipatgandakan kapasitas retensi air tanah serta mempercepat pemulihan mikro-nutrisi pasca-panen.",
      limitations: "Memerlukan pemantauan suhu pembakaran yang sangat presisi di lapangan terbuka untuk mencegah terjadinya dekomposisi ekstrem menjadi oksida abu padat steril.",
      opportunities: "Industri pembuatan kompor pirolisis portabel untuk petani kecil dan formulasi aditif arang aktif tanah (soil conditioner) kaya mikroba pengurai hara.",
      cycles: "Siklus pemulihan tanah kritis berlangsung bervariasi antara 1 hingga 3 tahun tergantung pada pasokan kelembapan udara mikro dan curah hujan setempat.",
      visionMission: "Merekonstruksi harmoni energi api termal terkontrol guna memulihkan kesuburan cakrawala tanah bumi secara lestari dan tangguh."
    },
    bibliographies: [
      {
        id: "[1]",
        title: "Chemical Kinetic of Soils Pyrolysis: Insights on Phosphorus and Nitrogen Redistribution",
        author: "Dr. Lely Anggraeni, J. DuPont",
        year: "2024",
        source: "Journal of Soil Chemistry & Thermal Physics",
        url: "https://example.com/soil-pyrolysis-kinetics"
      }
    ],
    createdAt: "2026-05-20T11:20:00Z"
  },
  {
    id: "research-5",
    category: ResearchCategory.KESEHATAN_MASA_DEPAN,
    tags: ["Penyakit", "Kesehatan", "Pandemi", "Sains", "Regulasi", "Masa Depan"],
    question: "Bagaimana analisis model epidemiologis komparatif terhadap mitigasi penularan penyakit zoonosis baru dan ketahanan sistem jaminan kesehatan rakyat?",
    summary: "Riset pemodelan matematika sirkular pertahanan kekebalan populasi, analisis kesiapan rumah sakit rujukan, dan sirkulasi obat mandiri.",
    answer: "Potensi kejadian luar biasa (KLB) penyakit zoonosis baru menuntut kesiapan komparatif lintas sektor antara kedokteran tropis, kesehatan veteriner, dan ekologi lingkungan (One Health paradigm). Dalam pemodelan kuantitatif transmisi penyakit, laju reproduksi dasar ($R_0$) dikalkulasi secara deterministik berdasarkan tingkat kontak rata-rata, peluang penularan per kontak, dan durasi rata-rata infektivitas.\n\nMeminimalkan $R_0$ hingga di bawah 1.0 memerlukan penguatan regulasi deteksi dini berbasis genomik dan jaminan asuransi kesehatan universal yang tidak diskriminatif. Hambatan utama di lapangan melibatkan kesenjangan akses diagnostik molekuler di daerah terpencil dan ketiadaan pabrik manufaktur bahan baku obat (active pharmaceutical ingredients) lokal yang berkelanjutan sehingga memicu ketergantungan impor sebesar 90%.\n\nDalam jangka panjang, pembangunan ketahanan kesehatan rakyat bukan sekadar penanganan krisis reaktif melainkan konservasi preventif gizi makro-mikro masyarakat terpadu sejak usia dini.",
    analysis: {
      conclusion: "Intervensi epidemiologis multidimensi One Health dengan memperkuat survelans genomik di tingkat kabupaten terbukti mengurangi waktu tanggap darurat bencana medis dari 14 hari menjadi kurang dari 48 jam secara nasional.",
      limitations: "Ketiadaan standardisasi integrasi data rekam medis elektronik puskesmas daerah dengan portal pusat kesehatan nasional menghambat akurasi prediksi asinkron.",
      opportunities: "Membuka peluang bisnis riset bioteknologi lokal, pendirian unit layanan tes PCR portabel berbasis kearifan lokal, serta startup aplikasi telemedicine pencegahan penyakit infektif.",
      cycles: "Siklus transmisi musiman penyakit vector-borne (seperti DBD atau zoonosis udara) sangat erat berkorelasi dengan fenomena anomali cuaca La Niña yang meningkatkan genangan air.",
      visionMission: "Membangun ekosistem kesehatan masa depan yang inklusif, mandiri obat, dan tangguh terhadap ancaman epidemi global guna melindungi kesejahteraan fisik dan mental seluruh tumpah darah."
    },
    bibliographies: [
      {
        id: "[1]",
        title: "Global Pandemic Preparedness: Epidemiological Modeling of Zoonotic Outbreaks under Climate Shifts",
        author: "Prof. S. Gunawan, Dr. E. Al-Jamil",
        year: "2025",
        source: "The Lancet Planetary Health & Epidemiology Review",
        url: "https://example.com/lancet-zoonotic-modeling"
      },
      {
        id: "[2]",
        title: "Peta Jalan Kemandirian Bahan Baku Farmasi Nasional 2025-2045",
        author: "Kementerian Kesehatan RI",
        year: "2024",
        source: "Direktorat Jenderal Kefarmasian dan Alat Kesehatan Kemenkes",
        url: "https://example.com/kemenkes-peta-jalan-farmasi"
      }
    ],
    createdAt: "2526-06-01T09:12:00Z"
  },
  {
    id: "research-6",
    category: ResearchCategory.EKONOMI_BISNIS,
    tags: ["Ekonomi", "Krisis", "Usaha", "Bisnis", "Pasar", "Peluang"],
    question: "Bagaimana kerangka strategi ketahanan usaha mikro, kecil, dan menengah (UMKM) dalam menghadapi krisis inflasi global dan fluktuasi rantai pasokan bahan mentah?",
    summary: "Kajian analisis kemampuan adaptasi operasional UMKM melalui struktur modal sirkular dan digitalisasi kemitraan korporasi terintegrasi.",
    answer: "Guncangan makroekonomi akibat inflasi biaya energi dan pupuk secara langsung menekan margin keuntungan usaha domestik. Fluktuasi ini meningkatkan biaya operasional rata-rata sebesar **25-30%**, memicu pentingnya restrukturisasi tata kelola kas jangka pendek.\n\nMelalui pendekatan manajemen operasional modern, UMKM perlu mengadopsi model sediaan bahan baku yang adaptif (adaptive inventory buffers) dan diversifikasi pemasok sirkular antar-wilayah terdekat. Integrasi platform pembayaran digital dan pemetaan segmen pasar berdaya beli stabil menjadi pilar penyelamatan likuiditas usaha.\n\nDalam rangka keluar dari tekanan krisis, sinergi kemitraan usaha beraliansi rantai pasok vertikal dengan korporasi manufaktur besar memberikan jaminan kepastian penjualan stok draf logistik, menyangga kestabilan ekonomi nasional dari volatilitas.",
    analysis: {
      conclusion: "Tingkat kelangsungan hidup UMKM meningkat hingga 80% dalam masa krisis apabila didukung oleh restrukturisasi modal produktif, pencatatan keuangan real-time berbasis aplikasi, dan literasi proteksi pasar terlokalisasi.",
      limitations: "Tingginya suku bunga pinjaman modal perbankan komersial bagi usaha非formal dan fragmentasi logistik maritim antar-pulau di Indonesia yang meningkatkan biaya pengiriman.",
      opportunities: "Peluang usaha kargo logsitik sirkular terpadu, penyediaan layanan micro-SaaS akuntansi usaha mikro, serta bisnis agregasi pemasaran komoditas ekspor berkelanjutan.",
      cycles: "Siklus likuiditas operasional usaha umumnya mengalami kontraksi musiman pada awal kuartal pertama sebelum pulih pesat menjelang hari besar keagamaan nasional.",
      visionMission: "Mendorong perwujudan kedaulatan ekonomi kerakyatan yang tangguh, modern, inovatif, dan berdaya saing global untuk menumpas rantai kemiskinan dan ketimpangan sosial secara berkelanjutan."
    },
    bibliographies: [
      {
        id: "[1]",
        title: "Macroeconomic Shocks and Micro-Enterprise Resilience: Strategic Turnaround Under Supply Chain Fractures",
        author: "H. Sugianto, Prof. J. Sachs",
        year: "2025",
        source: "Harvard Business Review & Journal of Finance Studies",
        url: "https://example.com/hbr-enterprise-turnaround"
      }
    ],
    createdAt: "2526-06-03T11:45:00Z"
  }
];
