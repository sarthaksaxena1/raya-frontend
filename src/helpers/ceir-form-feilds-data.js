export const ceirFormFeildsData = () => {
  const suffixData = [
    {
      value: "JR.",
    },
    {
      value: "SR.",
    },
  ];

  const genderData = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
    {
      value: "Other",
    },
  ];

  const priorityGroupData = [
    {
      value: "A1: Health Care Workers",
    },
    {
      value: "A2: Senior Citizens",
    },
    {
      value: "A3: Adult with Comorbidity",
    },
    {
      value: "A4: Frontline Personnel in Essential Sector",
    },
  ];

  const subPriorityGroupData = [
    {
      value: "A1.1: COVID-19 Referral Hospitals",
    },
    {
      value: "A1.2: Hopitals Catering to C19 Cases",
    },
    {
      value: "A1.3: Quarantine Isolation Facilities",
    },
    {
      value: "A1.4: Remaining Hospitals",
    },
    {
      value: "A1.5: Government Owned Community Based Primary Care Facilities",
    },
    {
      value: "A1.6: Stand-alone Clinics and Diagnostics",
    },
    {
      value: "A1.7: Closed Settings and Institutions",
    },
  ];

  const hasAllergyData = [
    {
      key: true,
      value: "Yes",
    },
    {
      key: false,
      value: "No",
    },
  ];

  const hasComorbidityData = [
    {
      key: "HIV",
      value: "HIV",
    },
    {
      key: "Cancer",
      value: "Cancer",
    },
    {
      key: "Post-transplant",
      value: "Post-transplant",
    },
    {
      key: "Multiple sclerosis",
      value: "Multiple sclerosis",
    },
    { key: "Lupus", value: "Lupus" },
    { key: "Rheumatoid arthritis", value: "Rheumatoid arthritis" },
    { key: "Bedridden", value: "Bedridden" },
  ];

  const regionData = [
    {
      key: "Autonomous Region In Muslim Mindanao (Armm)",
      value: "Autonomous Region In Muslim Mindanao (Armm)",
      provinces: [
        { key: "Basilan", value: "Basilan" },
        { key: "Lanao del Sur", value: "Lanao del Sur" },
        { key: "Maguindanao", value: "Maguindanao" },
        { key: "Sulu", value: "Sulu" },
        { key: "Tawi-Tawi", value: "Tawi-Tawi" },
      ],
    },
    {
      key: "Bicol Region",
      value: "Bicol Region",
      provinces: [
        { key: "Albay", value: "Albay" },
        { key: "Camarines Norte", value: "Camarines Norte" },
        { key: "Camarines Sur", value: "Camarines Sur" },
        { key: "Catanduanes", value: "Catanduanes" },
        { key: "Masbate", value: "Masbate" },
        { key: "Sorsogon", value: "Sorsogon" },
      ],
    },

    {
      key: "Cagayan Valley",
      value: "Cagayan Valley",
      provinces: [
        { key: "Batanes", value: "Batanes" },
        { key: "Cagayan", value: "Cagayan" },
        { key: "Isabela", value: "Isabela" },
        { key: "Nueva Vizcaya", value: "Nueva Vizcaya" },
        { key: "Quirino", value: "Quirino" },
      ],
    },
    {
      key: "Calabarzon",
      value: "Calabarzon",
      provinces: [
        { key: "Cavite", value: "Cavite" },
        { key: "Laguna", value: "Laguna" },
        { key: "Batangas", value: "Batangas" },
        { key: "Rizal", value: "Rizal" },
        { key: "Quezon", value: "Quezon" },
      ],
    },

    {
      key: "Caraga",
      value: "Caraga",
      provinces: [
        { key: "Agusan del Norte", value: "Agusan del Norte" },
        { key: "Agusan del Sur", value: "Agusan del Sur" },
        { key: "Dinagat Islands", value: "Dinagat Islands" },
        { key: "Surigao del Norte", value: "Surigao del Norte" },
        { key: "Surigao del Sur", value: "Surigao del Sur" },
      ],
    },

    {
      key: "Central Luzon",
      value: "Central Luzon",
      provinces: [
        { key: "Aurora", value: "Aurora" },
        { key: "Bataan", value: "Bataan" },
        { key: "Bulacan", value: "Bulacan" },
        { key: "Nueva Ecija", value: "Nueva Ecija" },
        { key: "Pampanga", value: "Pampanga" },
        { key: "Tarlac", value: "Tarlac" },
      ],
    },

    {
      key: "Central Visayas",
      value: "Central Visayas",
      provinces: [
        { key: "Bohol", value: "Bohol" },
        { key: "Cebu", value: "Cebu" },
        { key: "Negros Oriental", value: "Negros Oriental" },
        { key: "Siquijor", value: "Siquijor" },
      ],
    },

    {
      key: "Cordillera Administrative Region (CAR)",
      value: "Cordillera Administrative Region (CAR)",
      provinces: [
        { key: "Abra", value: "Abra" },
        { key: "Apayao", value: "Apayao" },
        { key: "Benguet", value: "Benguet" },
        { key: "Ifugao", value: "Ifugao" },
        { key: "Kalinga", value: "Kalinga" },
        { key: "Mountain Province", value: "Mountain Province" },
      ],
    },
    {
      key: "Davao Region",
      value: "Davao Region",
      provinces: [
        { key: "Davao de Oro", value: "Davao de Oro" },
        { key: "Davao del Norte", value: "Davao del Norte" },
        { key: "Davao del Sur", value: "Davao del Sur" },
        { key: "Davao Occidental", value: "Davao Occidental" },
        { key: "Davao Oriental", value: "Davao Oriental" },
      ],
    },

    {
      key: "Eastern Visayas",
      value: "Eastern Visayas",
      provinces: [
        { key: "Biliran", value: "Biliran" },
        { key: "Eastern Samar", value: "Eastern Samar" },
        { key: "Leyte", value: "Leyte" },
        { key: "Northern Samar", value: "Northern Samar" },
        { key: "Samar Western Samar", value: "Samar Western Samar" },
        { key: "Southern Leyte", value: "Southern Leyte" },
      ],
    },

    {
      key: "Ilocos Region",
      value: "Ilocos Region",
      provinces: [
        { key: "Ilocos Norte", value: "Ilocos Norte" },
        { key: "Ilocos Sur", value: "Ilocos Sur" },
        { key: "La Union", value: "La Union" },
        { key: "Pangasinan", value: "Pangasinan" },
      ],
    },
    {
      key: "Mimaropa",
      value: "Mimaropa",
      provinces: [
        { key: "Marinduque", value: "Marinduque" },
        { key: "Occidental Mindoro", value: "Occidental Mindoro" },
        { key: "Oriental Mindoro", value: "Oriental Mindoro" },
        { key: "Palawan", value: "Palawan" },
        { key: "Romblon", value: "Romblon" },
      ],
    },

    {
      key: "National Capital Region (Ncr)",
      value: "National Capital Region (Ncr)",
      provinces: [
        {
          key: "NCR, City of Manila, First District",
          value: "NCR, City of Manila, First District",
        },
        {
          key: "NCR, City of Manila, Second District",
          value: "NCR, City of Manila, Second District",
        },
        {
          key: "NCR, City of Manila, Third District",
          value: "NCR, City of Manila, Third District",
        },
        {
          key: "NCR, City of Manila, Fourth District",
          value: "NCR, City of Manila, Fourth District",
        },
      ],
    },
    {
      key: "Northern Mindanao",
      value: "Northern Mindanao",
      provinces: [
        { key: "Bukidnon", value: "Bukidnon" },
        { key: "Camiguin", value: "Camiguin" },
        { key: "Lanao del Norte", value: "Lanao del Norte" },
        { key: "Misamis Occidental", value: "Misamis Occidental" },
        { key: "Misamis Oriental", value: "Misamis Oriental" },
      ],
    },

    {
      key: "Soccsksargen",
      value: "Soccsksargen",
      provinces: [
        { key: "Cotabato", value: "Cotabato" },
        { key: "Sarangani", value: "Sarangani" },
        { key: "South Cotabato", value: "South Cotabato" },
        { key: "Sultan Kudarat", value: "Sultan Kudarat" },
      ],
    },

    {
      key: "Western Visayas",
      value: "Western Visayas",
      provinces: [
        { key: "Aklan", value: "Aklan" },
        { key: "Antique", value: "Antique" },
        { key: "Capiz", value: "Capiz" },
        { key: "Guimaras", value: "Guimaras" },
        { key: "Iloilo", value: "Iloilo" },
        { key: "Negros Occidental", value: "Negros Occidental" },
      ],
    },
    {
      key: "Zamboanga Peninsula",
      value: "Zamboanga Peninsula",
      provinces: [
        { key: "Zamboanga del Norte", value: "Zamboanga del Norte" },
        { key: "Zamboanga del Sur", value: "Zamboanga del Sur" },
        { key: "Zamboanga Sibugay", value: "Zamboanga Sibugay" },
      ],
    },
  ];

  const provinceData = [
    {
      key: "Abra",
      values: "Abra",
    },
    {
      key: "Agusan Del Norte",
      values: "Agusan Del Norte",
    },
    {
      key: "Agusan Del Sur",
      values: "Agusan Del Sur",
    },
    {
      key: "Aklan",
      values: "Aklan",
    },
    {
      key: "Albay",
      values: "Albay",
    },
    {
      key: "Antique",
      values: "Antique",
    },
    {
      key: "Apayao",
      values: "Apayao",
    },
    {
      key: "Aurora",
      values: "Aurora",
    },
    {
      key: "Basilan",
      values: "Basilan",
    },
    {
      key: "Bataan",
      values: "Bataan",
    },
    {
      key: "Batanes",
      values: "Batanes",
    },
    {
      key: "Batangas",
      values: "Batangas",
    },
    {
      key: "Benguet",
      values: "Benguet",
    },
    {
      key: "Biliran",
      values: "Biliran",
    },
    {
      key: "Bohol",
      values: "Bohol",
    },
    {
      key: "Bukidnon",
      values: "Bukidnon",
    },
    {
      key: "Bulacan",
      values: "Bulacan",
    },
    {
      key: "Cagayan",
      values: "Cagayan",
    },
    {
      key: "Camarines Norte",
      values: "Camarines Norte",
    },
    {
      key: "Camarines Sur",
      values: "Camarines Sur",
    },
    {
      key: "Camiguin",
      values: "Camiguin",
    },
    {
      key: "Capiz",
      values: "Capiz",
    },
    {
      key: "Catanduanes",
      values: "Catanduanes",
    },
    {
      key: "Cavite",
      values: "Cavite",
    },
    {
      key: "Cebu",
      values: "Cebu",
    },
    {
      key: "Compostela Valley",
      values: "Compostela Valley",
    },
    {
      key: "Cotabato(North Cotabato)",
      values: "Cotabato(North Cotabato)",
    },
    {
      key: "Davao Del Norte",
      values: "Davao Del Norte",
    },
    {
      key: "Davao Del Sur",
      values: "Davao Del Sur",
    },
    {
      key: "Davao Occidental",
      values: "Davao Occidental",
    },
    {
      key: "Davao Oriental",
      values: "Davao Oriental",
    },
    {
      key: "Dinagat Islands",
      values: "Dinagat Islands",
    },
    {
      key: "Eastern Samar",
      values: "Eastern Samar",
    },
    {
      key: "Guimaras",
      values: "Guimaras",
    },
    {
      key: "Ifugao",
      values: "Ifugao",
    },
    {
      key: "Ilocos Norte",
      values: "Ilocos Norte",
    },
    {
      key: "Ilocos Sur",
      values: "Ilocos Sur",
    },
    {
      key: "Iloilo",
      values: "Iloilo",
    },
    {
      key: "Isabela",
      values: "Isabela",
    },
    {
      key: "Kalinga",
      values: "Kalinga",
    },
    {
      key: "La Union",
      values: "La Union",
    },
    {
      key: "Laguna",
      values: "Laguna",
    },
    {
      key: "Lanao Del Norte",
      values: "Lanao Del Norte",
    },
    {
      key: "Lanao Del Sur",
      values: "Lanao Del Sur",
    },
    {
      key: "Leyte",
      values: "Leyte",
    },
    {
      key: "Maguindanao",
      values: "Maguindanao",
    },
    {
      key: "Marinduque",
      values: "Marinduque",
    },
    {
      key: "Masbate",
      values: "Masbate",
    },
    {
      key: "Misamis Occidental",
      values: "Misamis Occidental",
    },
    {
      key: "Misamis Oriental",
      values: "Misamis Oriental",
    },

    {
      key: "Mountain Province",
      values: "Mountain Province",
    },

    { key: "NCR First District", values: "NCR First District" },
    { key: "NCR Second District", values: "NCR Second District" },
    { key: "NCR Third District", values: "NCR Third District" },
    { key: "NCR Fourth District", values: "NCR Fourth District" },

    {
      key: "Negros Occidental",
      values: "Negros Occidental",
    },
    {
      key: "Negros Orienta",
      values: "Negros Orienta",
    },
    {
      key: "Northern Samar",
      values: "Northern Samar",
    },
    {
      key: "Nueva Ecija",
      values: "Nueva Ecija",
    },
    {
      key: "Nueva Vizcaya",
      values: "Nueva Vizcaya",
    },
    {
      key: "Occidental Mindoro",
      values: "Occidental Mindoro",
    },
    {
      key: "Oriental Mindoro",
      values: "Oriental Mindoro",
    },
    {
      key: "Palawan",
      values: "Palawan",
    },
    {
      key: "Pampanga",
      values: "Pampanga",
    },
    {
      key: "Pangasinan",
      values: "Pangasinan",
    },
    {
      key: "Quezon",
      values: "Quezon",
    },
    {
      key: "Quirino",
      values: "Quirino",
    },
    {
      key: "Rizal",
      values: "Rizal",
    },
    {
      key: "Romblon",
      values: "Romblon",
    },
    {
      key: "Samar Western Samar",
      values: "Samar Western Samar",
    },
    {
      key: "Sarangani",
      values: "Sarangani",
    },
    {
      key: "Siquijor",
      values: "Siquijor",
    },
    {
      key: "Sorsogon",
      values: "Sorsogon",
    },
    {
      key: "South Cotabato",
      values: "South Cotabato",
    },
    {
      key: "Southern Leyte",
      values: "Southern Leyte",
    },
    {
      key: "Sultan Kudarat",
      values: "Sultan Kudarat",
    },
    {
      key: "Sulu",
      values: "Sulu",
    },
    {
      key: "Surigao Del Norte",
      values: "Surigao Del Norte",
    },
    {
      key: "Surigo Del Sur",
      values: "Surigo Del Sur",
    },
    {
      key: "Tarlac",
      values: "Tarlac",
    },
    {
      key: "Tawi Tawi",
      values: "Tawi Tawi",
    },
    {
      key: "Zambales",
      values: "Zambales",
    },
    {
      key: "Zamboanga Del Norte",
      values: "Zamboanga Del Norte",
    },
    {
      key: "Zamboanga Del Sur",
      values: "Zamboanga Del Sur",
    },
    {
      key: "Zamboanga Sibugay",
      values: "Zamboanga Sibugay",
    },
  ];

  const cityData = [
    {
      city: "Aborlan",
    },
    {
      city: "Abra De Ilog",
    },
    {
      city: "Abucay",
    },
    {
      city: "Abulug",
    },
    {
      city: "Abuyog",
    },
    {
      city: "Adams",
    },
    {
      city: "Agdangan",
    },
    {
      city: "Aglipay",
    },
    {
      city: "Agno",
    },
    {
      city: "Agoncillo",
    },
    {
      city: "Agoo",
    },
    {
      city: "Aguilar",
    },
    {
      city: "Aguinaldo",
    },
    {
      city: "Agutaya",
    },
    {
      city: "Ajuy",
    },
    {
      city: "Akbar",
    },
    {
      city: "Al Barka",
    },
    {
      city: "Alabat",
    },
    {
      city: "Alabel",
    },
    {
      city: "Alamada",
    },
    {
      city: "Alaminos",
    },
    {
      city: "Alangalang",
    },
    {
      city: "Albuera",
    },
    {
      city: "Alburquerque",
    },
    {
      city: "Alcala",
    },
    {
      city: "Alcantara",
    },
    {
      city: "Alcoy",
    },
    {
      city: "Alegria",
    },
    {
      city: "Aleosan",
    },
    {
      city: "Alfonso",
    },
    {
      city: "Alfonso Castaneda",
    },
    {
      city: "Alfonso Lista Potia",
    },
    {
      city: "Aliaga",
    },
    {
      city: "Alicia",
    },
    {
      city: "Alilem",
    },
    {
      city: "Alimodian",
    },
    {
      city: "Alitagtag",
    },
    {
      city: "Allacapan",
    },
    {
      city: "Allen",
    },
    {
      city: "Almagro",
    },
    {
      city: "Almeria",
    },
    {
      city: "Aloguinsan",
    },
    {
      city: "Aloran",
    },
    {
      city: "Altavas",
    },
    {
      city: "Alubijid",
    },
    {
      city: "Amadeo",
    },
    {
      city: "Ambaguio",
    },
    {
      city: "Amlan Ayuquitan",
    },
    {
      city: "Ampatuan",
    },
    {
      city: "Amulung",
    },
    {
      city: "Anahawan",
    },
    {
      city: "Anao",
    },
    {
      city: "Anda",
    },
    {
      city: "Angadanan",
    },
    {
      city: "Angat",
    },
    {
      city: "Angeles City",
    },
    {
      city: "Angono",
    },
    {
      city: "Anilao",
    },
    {
      city: "Anini Y",
    },
    {
      city: "Antequera",
    },
    {
      city: "Antipas",
    },
    {
      city: "Apalit",
    },
    {
      city: "Aparri",
    },
    {
      city: "Araceli",
    },
    {
      city: "Arakan",
    },
    {
      city: "Arayat",
    },
    {
      city: "Argao",
    },
    {
      city: "Aringay",
    },
    {
      city: "Aritao",
    },
    {
      city: "Aroroy",
    },
    {
      city: "Arteche",
    },
    {
      city: "Asingan",
    },
    {
      city: "Asipulo",
    },
    {
      city: "Asturias",
    },
    {
      city: "Asuncion Saug",
    },
    {
      city: "Atimonan",
    },
    {
      city: "Atok",
    },
    {
      city: "Aurora",
    },
    {
      city: "Ayungon",
    },
    {
      city: "Baao",
    },
    {
      city: "Babatngon",
    },
    {
      city: "Bacacay",
    },
    {
      city: "Bacarra",
    },
    {
      city: "Baclayon",
    },
    {
      city: "Bacnotan",
    },
    {
      city: "Baco",
    },
    {
      city: "Bacolod",
    },
    {
      city: "Bacolod City",
    },
    {
      city: "Bacolod Kalawi Bacolod Grande",
    },
    {
      city: "Bacolor",
    },
    {
      city: "Bacong",
    },
    {
      city: "Bacoor City",
    },
    {
      city: "Bacuag",
    },
    {
      city: "Bacungan Leon T Postigo",
    },
    {
      city: "Badian",
    },
    {
      city: "Badiangan",
    },
    {
      city: "Badoc",
    },
    {
      city: "Bagabag",
    },
    {
      city: "Bagac",
    },
    {
      city: "Bagamanoc",
    },
    {
      city: "Baganga",
    },
    {
      city: "Baggao",
    },
    {
      city: "Bago City",
    },
    {
      city: "Baguio City",
    },
    {
      city: "Bagulin",
    },
    {
      city: "Bagumbayan",
    },
    {
      city: "Bais City",
    },
    {
      city: "Bakun",
    },
    {
      city: "Balabac",
    },
    {
      city: "Balabagan",
    },
    {
      city: "Balagtas",
    },
    {
      city: "Balamban",
    },
    {
      city: "Balangiga",
    },
    {
      city: "Balangkayan",
    },
    {
      city: "Balaoan",
    },
    {
      city: "Balasan",
    },
    {
      city: "Balatan",
    },
    {
      city: "Balayan",
    },
    {
      city: "Balbalan",
    },
    {
      city: "Baleno",
    },
    {
      city: "Baler",
    },
    {
      city: "Balete",
    },
    {
      city: "Baliangao",
    },
    {
      city: "Baliguian",
    },
    {
      city: "Balilihan",
    },
    {
      city: "Balindong Watu",
    },
    {
      city: "Balingasag",
    },
    {
      city: "Balingoan",
    },
    {
      city: "Baliuag",
    },
    {
      city: "Ballesteros",
    },
    {
      city: "Baloi",
    },
    {
      city: "Balud",
    },
    {
      city: "Balungao",
    },
    {
      city: "Bamban",
    },
    {
      city: "Bambang",
    },
    {
      city: "Banate",
    },
    {
      city: "Banaue",
    },
    {
      city: "Banaybanay",
    },
    {
      city: "Banayoyo",
    },
    {
      city: "Banga",
    },
    {
      city: "Bangar",
    },
    {
      city: "Bangued",
    },
    {
      city: "Bangui",
    },
    {
      city: "Bani",
    },
    {
      city: "Banisilan",
    },
    {
      city: "Banna Espiritu",
    },
    {
      city: "Bansalan",
    },
    {
      city: "Bansud",
    },
    {
      city: "Bantay",
    },
    {
      city: "Bantayan",
    },
    {
      city: "Banton",
    },
    {
      city: "Baras",
    },
    {
      city: "Barbaza",
    },
    {
      city: "Barcelona",
    },
    {
      city: "Barili",
    },
    {
      city: "Barira",
    },
    {
      city: "Barlig",
    },
    {
      city: "Barobo",
    },
    {
      city: "Barotac Nuevo",
    },
    {
      city: "Barotac Viejo",
    },
    {
      city: "Baroy",
    },
    {
      city: "Barugo",
    },
    {
      city: "Basay",
    },
    {
      city: "Basco",
    },
    {
      city: "Basey",
    },
    {
      city: "Basilisa Rizal",
    },
    {
      city: "Basista",
    },
    {
      city: "Basud",
    },
    {
      city: "Batad",
    },
    {
      city: "Batan",
    },
    {
      city: "Batangas City",
    },
    {
      city: "Bataraza",
    },
    {
      city: "Bato",
    },
    {
      city: "Batuan",
    },
    {
      city: "Bauan",
    },
    {
      city: "Bauang",
    },
    {
      city: "Bauko",
    },
    {
      city: "Baungon",
    },
    {
      city: "Bautista",
    },
    {
      city: "Bay",
    },
    {
      city: "Bayabas",
    },
    {
      city: "Bayambang",
    },
    {
      city: "Bayang",
    },
    {
      city: "Bayog",
    },
    {
      city: "Bayombong",
    },
    {
      city: "Belison",
    },
    {
      city: "Benito Soliven",
    },
    {
      city: "Besao",
    },
    {
      city: "Bien Unido",
    },
    {
      city: "Bilar",
    },
    {
      city: "Biliran",
    },
    {
      city: "Binalbagan",
    },
    {
      city: "Binalonan",
    },
    {
      city: "Binangonan",
    },
    {
      city: "Bindoy Payabon",
    },
    {
      city: "Bingawan",
    },
    {
      city: "Binidayan",
    },
    {
      city: "Binmaley",
    },
    {
      city: "Binuangan",
    },
    {
      city: "Biri",
    },
    {
      city: "Boac",
    },
    {
      city: "Bobon",
    },
    {
      city: "Bocaue",
    },
    {
      city: "Bokod",
    },
    {
      city: "Bolinao",
    },
    {
      city: "Boliney",
    },
    {
      city: "Boljoon",
    },
    {
      city: "Bombon",
    },
    {
      city: "Bongabon",
    },
    {
      city: "Bongabong",
    },
    {
      city: "Bongao",
    },
    {
      city: "Bonifacio",
    },
    {
      city: "Bontoc",
    },
    {
      city: "Borbon",
    },
    {
      city: "Boston",
    },
    {
      city: "Botolan",
    },
    {
      city: "Braulio E Dujali",
    },
    {
      city: "Brookes Point",
    },
    {
      city: "Buadiposo Buntong",
    },
    {
      city: "Bubong",
    },
    {
      city: "Bucay",
    },
    {
      city: "Bucloc",
    },
    {
      city: "Buenavista",
    },
    {
      city: "Bugallon",
    },
    {
      city: "Bugasong",
    },
    {
      city: "Buguey",
    },
    {
      city: "Buguias",
    },
    {
      city: "Buhi",
    },
    {
      city: "Bula",
    },
    {
      city: "Bulacan",
    },
    {
      city: "Bulalacao San Pedro",
    },
    {
      city: "Bulan",
    },
    {
      city: "Buldon",
    },
    {
      city: "Buluan",
    },
    {
      city: "Bulusan",
    },
    {
      city: "Bumbaran",
    },
    {
      city: "Bunawan",
    },
    {
      city: "Burauen",
    },
    {
      city: "Burdeos",
    },
    {
      city: "Burgos",
    },
    {
      city: "Buruanga",
    },
    {
      city: "Bustos",
    },
    {
      city: "Busuanga",
    },
    {
      city: "Butig",
    },
    {
      city: "Butuan City",
    },
    {
      city: "Buug",
    },
    {
      city: "Caba",
    },
    {
      city: "Cabagan",
    },
    {
      city: "Cabanatuan City",
    },
    {
      city: "Cabangan",
    },
    {
      city: "Cabanglasan",
    },
    {
      city: "Cabarroguis",
    },
    {
      city: "Cabatuan",
    },
    {
      city: "Cabiao",
    },
    {
      city: "Cabucgayan",
    },
    {
      city: "Cabugao",
    },
    {
      city: "Cabusao",
    },
    {
      city: "Cabuyao City",
    },
    {
      city: "Cadiz City",
    },
    {
      city: "Cagayan De Oro City",
    },
    {
      city: "Cagayancillo",
    },
    {
      city: "Cagdianao",
    },
    {
      city: "Cagwait",
    },
    {
      city: "Caibiran",
    },
    {
      city: "Cainta",
    },
    {
      city: "Cajidiocan",
    },
    {
      city: "Calabanga",
    },
    {
      city: "Calaca",
    },
    {
      city: "Calamba",
    },
    {
      city: "Calanasan Bayag",
    },
    {
      city: "Calanogas",
    },
    {
      city: "Calape",
    },
    {
      city: "Calasiao",
    },
    {
      city: "Calatagan",
    },
    {
      city: "Calatrava",
    },
    {
      city: "Calauag",
    },
    {
      city: "Calauan",
    },
    {
      city: "Calayan",
    },
    {
      city: "Calbayog City",
    },
    {
      city: "Calbiga",
    },
    {
      city: "Calinog",
    },
    {
      city: "Calintaan",
    },
    {
      city: "Caloocan City",
    },
    {
      city: "Calubian",
    },
    {
      city: "Calumpit",
    },
    {
      city: "Caluya",
    },
    {
      city: "Camalaniugan",
    },
    {
      city: "Camalig",
    },
    {
      city: "Camaligan",
    },
    {
      city: "Camiling",
    },
    {
      city: "Can Avid",
    },
    {
      city: "Canaman",
    },
    {
      city: "Candaba",
    },
    {
      city: "Candelaria",
    },
    {
      city: "Candijay",
    },
    {
      city: "Candoni",
    },
    {
      city: "Canlaon City",
    },
    {
      city: "Cantilan",
    },
    {
      city: "Caoayan",
    },
    {
      city: "Capalonga",
    },
    {
      city: "Capas",
    },
    {
      city: "Capoocan",
    },
    {
      city: "Capul",
    },
    {
      city: "Caraga",
    },
    {
      city: "Caramoan",
    },
    {
      city: "Caramoran",
    },
    {
      city: "Carasi",
    },
    {
      city: "Cardona",
    },
    {
      city: "Carigara",
    },
    {
      city: "Carles",
    },
    {
      city: "Carmen",
    },
    {
      city: "Carmona",
    },
    {
      city: "Carranglan",
    },
    {
      city: "Carrascal",
    },
    {
      city: "Casiguran",
    },
    {
      city: "Castilla",
    },
    {
      city: "Castillejos",
    },
    {
      city: "Cataingan",
    },
    {
      city: "Catanauan",
    },
    {
      city: "Catarman",
    },
    {
      city: "Cateel",
    },
    {
      city: "Catigbian",
    },
    {
      city: "Catmon",
    },
    {
      city: "Catubig",
    },
    {
      city: "Cauayan",
    },
    {
      city: "Cavinti",
    },
    {
      city: "Cavite City",
    },
    {
      city: "Cawayan",
    },
    {
      city: "Cebu City",
    },
    {
      city: "Cervantes",
    },
    {
      city: "City Of Alaminos",
    },
    {
      city: "City Of Antipolo",
    },
    {
      city: "City Of Balanga",
    },
    {
      city: "City Of Batac",
    },
    {
      city: "City Of Bayawan",
    },
    {
      city: "City Of Baybay",
    },
    {
      city: "City Of Bayugan",
    },
    {
      city: "City Of Bi�an",
    },
    {
      city: "City Of Bislig",
    },
    {
      city: "City Of Bogo",
    },
    {
      city: "City Of Borongan",
    },
    {
      city: "City Of Cabadbaran",
    },
    {
      city: "City Of Calamba",
    },
    {
      city: "City Of Calapan",
    },
    {
      city: "City Of Candon",
    },
    {
      city: "City Of Carcar",
    },
    {
      city: "City Of Catbalogan",
    },
    {
      city: "City Of Cauayan",
    },
    {
      city: "City Of Dasmari�as",
    },
    {
      city: "City Of Digos",
    },
    {
      city: "City Of El Salvador",
    },
    {
      city: "City Of Escalante",
    },
    {
      city: "City Of Gapan",
    },
    {
      city: "City Of Guihulngan",
    },
    {
      city: "City Of Himamaylan",
    },
    {
      city: "City Of Isabela",
    },
    {
      city: "City Of Kabankalan",
    },
    {
      city: "City Of Kidapawan",
    },
    {
      city: "City Of Koronadal",
    },
    {
      city: "City Of Lamitan",
    },
    {
      city: "City Of Las Pi�as",
    },
    {
      city: "City Of Ligao",
    },
    {
      city: "City Of Maasin",
    },
    {
      city: "City Of Makati",
    },
    {
      city: "City Of Malabon",
    },
    {
      city: "City Of Malaybalay",
    },
    {
      city: "City Of Malolos",
    },
    {
      city: "City Of Mandaluyong",
    },
    {
      city: "City Of Manila",
    },
    {
      city: "City Of Marikina",
    },
    {
      city: "City Of Masbate",
    },
    {
      city: "City Of Mati",
    },
    {
      city: "City Of Meycauayan",
    },
    {
      city: "City Of Muntinlupa",
    },
    {
      city: "City Of Naga",
    },
    {
      city: "City Of Navotas",
    },
    {
      city: "City Of Panabo",
    },
    {
      city: "City Of Para�aque",
    },
    {
      city: "City Of Pasig",
    },
    {
      city: "City Of Passi",
    },
    {
      city: "City Of San Fernando",
    },
    {
      city: "City Of San Jose Del Monte",
    },
    {
      city: "City Of San Juan",
    },
    {
      city: "City Of San Pedro",
    },
    {
      city: "City Of Santa Rosa",
    },
    {
      city: "City Of Santiago",
    },
    {
      city: "City Of Sipalay",
    },
    {
      city: "City Of Sorsogon",
    },
    {
      city: "City Of Tabaco",
    },
    {
      city: "City Of Tabuk",
    },
    {
      city: "City Of Tacurong",
    },
    {
      city: "City Of Tagum",
    },
    {
      city: "City Of Talisay",
    },
    {
      city: "City Of Tanauan",
    },
    {
      city: "City Of Tandag",
    },
    {
      city: "City Of Tanjay",
    },
    {
      city: "City Of Tarlac",
    },
    {
      city: "City Of Tayabas",
    },
    {
      city: "City Of Urdaneta",
    },
    {
      city: "City Of Valencia",
    },
    {
      city: "City Of Valenzuela",
    },
    {
      city: "City Of Victorias",
    },
    {
      city: "City Of Vigan",
    },
    {
      city: "Clarin",
    },
    {
      city: "Claver",
    },
    {
      city: "Claveria",
    },
    {
      city: "Columbio",
    },
    {
      city: "Compostela",
    },
    {
      city: "Concepcion",
    },
    {
      city: "Conner",
    },
    {
      city: "Consolacion",
    },
    {
      city: "Corcuera",
    },
    {
      city: "Cordon",
    },
    {
      city: "Cordova",
    },
    {
      city: "Corella",
    },
    {
      city: "Coron",
    },
    {
      city: "Cortes",
    },
    {
      city: "Cotabato City",
    },
    {
      city: "Cuartero",
    },
    {
      city: "Cuenca",
    },
    {
      city: "Culaba",
    },
    {
      city: "Culasi",
    },
    {
      city: "Culion",
    },
    {
      city: "Currimao",
    },
    {
      city: "Cuyapo",
    },
    {
      city: "Cuyo",
    },
    {
      city: "Daanbantayan",
    },
    {
      city: "Daet",
    },
    {
      city: "Dagami",
    },
    {
      city: "Dagohoy",
    },
    {
      city: "Daguioman",
    },
    {
      city: "Dagupan City",
    },
    {
      city: "Dalaguete",
    },
    {
      city: "Damulog",
    },
    {
      city: "Danao",
    },
    {
      city: "Danao City",
    },
    {
      city: "Dangcagan",
    },
    {
      city: "Danglas",
    },
    {
      city: "Dao",
    },
    {
      city: "Dapa",
    },
    {
      city: "Dapitan City",
    },
    {
      city: "Daraga",
    },
    {
      city: "Daram",
    },
    {
      city: "Dasol",
    },
    {
      city: "Datu Abdullah Sangki",
    },
    {
      city: "Datu Anggal Midtimbang",
    },
    {
      city: "Datu Blah T Sinsuat",
    },
    {
      city: "Datu Hoffer Ampatuan",
    },
    {
      city: "Datu Odin Sinsuat Dinaig",
    },
    {
      city: "Datu Paglas",
    },
    {
      city: "Datu Piang",
    },
    {
      city: "Datu Salibo",
    },
    {
      city: "Datu Saudi Ampatuan",
    },
    {
      city: "Datu Unsay",
    },
    {
      city: "Dauin",
    },
    {
      city: "Dauis",
    },
    {
      city: "Davao City",
    },
    {
      city: "Del Carmen",
    },
    {
      city: "Del Gallego",
    },
    {
      city: "Delfin Albano Magsaysay",
    },
    {
      city: "Diadi",
    },
    {
      city: "Diffun",
    },
    {
      city: "Dilasag",
    },
    {
      city: "Dimasalang",
    },
    {
      city: "Dimataling",
    },
    {
      city: "Dimiao",
    },
    {
      city: "Dinagat",
    },
    {
      city: "Dinalungan",
    },
    {
      city: "Dinalupihan",
    },
    {
      city: "Dinapigue",
    },
    {
      city: "Dinas",
    },
    {
      city: "Dingalan",
    },
    {
      city: "Dingle",
    },
    {
      city: "Dingras",
    },
    {
      city: "Dipaculao",
    },
    {
      city: "Diplahan",
    },
    {
      city: "Dipolog City",
    },
    {
      city: "Ditsaan Ramain",
    },
    {
      city: "Divilacan",
    },
    {
      city: "Dolores",
    },
    {
      city: "Don Carlos",
    },
    {
      city: "Don Marcelino",
    },
    {
      city: "Don Victoriano Chiongbian Don Mariano Marcos",
    },
    {
      city: "Do�a Remedios Trinidad",
    },
    {
      city: "Donsol",
    },
    {
      city: "Due�as",
    },
    {
      city: "Duero",
    },
    {
      city: "Dulag",
    },
    {
      city: "Dumaguete City",
    },
    {
      city: "Dumalag",
    },
    {
      city: "Dumalinao",
    },
    {
      city: "Dumalneg",
    },
    {
      city: "Dumangas",
    },
    {
      city: "Dumanjug",
    },
    {
      city: "Dumaran",
    },
    {
      city: "Dumarao",
    },
    {
      city: "Dumingag",
    },
    {
      city: "Dupax Del Norte",
    },
    {
      city: "Dupax Del Sur",
    },
    {
      city: "Echague",
    },
    {
      city: "El Nido Bacuit",
    },
    {
      city: "Enrile",
    },
    {
      city: "Enrique B Magalona Saravia",
    },
    {
      city: "Enrique Villanueva",
    },
    {
      city: "Esperanza",
    },
    {
      city: "Estancia",
    },
    {
      city: "Famy",
    },
    {
      city: "Ferrol",
    },
    {
      city: "Flora",
    },
    {
      city: "Floridablanca",
    },
    {
      city: "Gabaldon",
    },
    {
      city: "Gainza",
    },
    {
      city: "Galimuyod",
    },
    {
      city: "Gamay",
    },
    {
      city: "Gamu",
    },
    {
      city: "Ganassi",
    },
    {
      city: "Gandara",
    },
    {
      city: "Garchitorena",
    },
    {
      city: "Garcia Hernandez",
    },
    {
      city: "Gasan",
    },
    {
      city: "Gattaran",
    },
    {
      city: "Gen S K Pendatun",
    },
    {
      city: "Gen. Mariano Alvarez",
    },
    {
      city: "General Emilio Aguinaldo",
    },
    {
      city: "General Luna",
    },
    {
      city: "General Macarthur",
    },
    {
      city: "General Mamerto Natividad",
    },
    {
      city: "General Nakar",
    },
    {
      city: "General Santos City",
    },
    {
      city: "General Tinio Papaya",
    },
    {
      city: "General Trias",
    },
    {
      city: "Gerona",
    },
    {
      city: "Gigaquit",
    },
    {
      city: "Gigmoto",
    },
    {
      city: "Ginatilan",
    },
    {
      city: "Gingoog City",
    },
    {
      city: "Giporlos",
    },
    {
      city: "Gitagum",
    },
    {
      city: "Glan",
    },
    {
      city: "Gloria",
    },
    {
      city: "Goa",
    },
    {
      city: "Godod",
    },
    {
      city: "Gonzaga",
    },
    {
      city: "Governor Generoso",
    },
    {
      city: "Gregorio Del Pilar Concepcion",
    },
    {
      city: "Guagua",
    },
    {
      city: "Gubat",
    },
    {
      city: "Guiguinto",
    },
    {
      city: "Guimba",
    },
    {
      city: "Guimbal",
    },
    {
      city: "Guinayangan",
    },
    {
      city: "Guindulman",
    },
    {
      city: "Guindulungan",
    },
    {
      city: "Guinobatan",
    },
    {
      city: "Guinsiliban",
    },
    {
      city: "Guipos",
    },
    {
      city: "Guiuan",
    },
    {
      city: "Gumaca",
    },
    {
      city: "Gutalac",
    },
    {
      city: "Hadji Mohammad Ajul",
    },
    {
      city: "Hadji Muhtamad",
    },
    {
      city: "Hadji Panglima Tahil Marunggas",
    },
    {
      city: "Hagonoy",
    },
    {
      city: "Hamtic",
    },
    {
      city: "Hermosa",
    },
    {
      city: "Hernani",
    },
    {
      city: "Hilongos",
    },
    {
      city: "Hinabangan",
    },
    {
      city: "Hinatuan",
    },
    {
      city: "Hindang",
    },
    {
      city: "Hingyon",
    },
    {
      city: "Hinigaran",
    },
    {
      city: "Hinoba An Asia",
    },
    {
      city: "Hinunangan",
    },
    {
      city: "Hinundayan",
    },
    {
      city: "Hungduan",
    },
    {
      city: "Iba",
    },
    {
      city: "Ibaan",
    },
    {
      city: "Ibajay",
    },
    {
      city: "Igbaras",
    },
    {
      city: "Iguig",
    },
    {
      city: "Ilagan City",
    },
    {
      city: "Iligan City",
    },
    {
      city: "Ilog",
    },
    {
      city: "Iloilo City",
    },
    {
      city: "Imelda",
    },
    {
      city: "Impasug Ong",
    },
    {
      city: "Imus City",
    },
    {
      city: "Inabanga",
    },
    {
      city: "Indanan",
    },
    {
      city: "Indang",
    },
    {
      city: "Infanta",
    },
    {
      city: "Initao",
    },
    {
      city: "Inopacan",
    },
    {
      city: "Ipil",
    },
    {
      city: "Iriga City",
    },
    {
      city: "Irosin",
    },
    {
      city: "Isabel",
    },
    {
      city: "Isabela",
    },
    {
      city: "Island Garden City Of Samal",
    },
    {
      city: "Isulan",
    },
    {
      city: "Itbayat",
    },
    {
      city: "Itogon",
    },
    {
      city: "Ivana",
    },
    {
      city: "Ivisan",
    },
    {
      city: "Jabonga",
    },
    {
      city: "Jaen",
    },
    {
      city: "Jagna",
    },
    {
      city: "Jala Jala",
    },
    {
      city: "Jamindan",
    },
    {
      city: "Janiuay",
    },
    {
      city: "Jaro",
    },
    {
      city: "Jasaan",
    },
    {
      city: "Javier Bugho",
    },
    {
      city: "Jetafe",
    },
    {
      city: "Jiabong",
    },
    {
      city: "Jimalalud",
    },
    {
      city: "Jimenez",
    },
    {
      city: "Jipapad",
    },
    {
      city: "Jolo",
    },
    {
      city: "Jomalig",
    },
    {
      city: "Jones",
    },
    {
      city: "Jordan",
    },
    {
      city: "Jose Abad Santos Trinidad",
    },
    {
      city: "Jose Dalman Ponot",
    },
    {
      city: "Jose Panganiban",
    },
    {
      city: "Josefina",
    },
    {
      city: "Jovellar",
    },
    {
      city: "Juban",
    },
    {
      city: "Julita",
    },
    {
      city: "Kabacan",
    },
    {
      city: "Kabasalan",
    },
    {
      city: "Kabayan",
    },
    {
      city: "Kabugao",
    },
    {
      city: "Kabuntalan Tumbao",
    },
    {
      city: "Kadingilan",
    },
    {
      city: "Kalamansig",
    },
    {
      city: "Kalawit",
    },
    {
      city: "Kalayaan",
    },
    {
      city: "Kalibo",
    },
    {
      city: "Kalilangan",
    },
    {
      city: "Kalingalan Caluang",
    },
    {
      city: "Kananga",
    },
    {
      city: "Kapai",
    },
    {
      city: "Kapalong",
    },
    {
      city: "Kapangan",
    },
    {
      city: "Kapatagan",
    },
    {
      city: "Kasibu",
    },
    {
      city: "Katipunan",
    },
    {
      city: "Kauswagan",
    },
    {
      city: "Kawayan",
    },
    {
      city: "Kawit",
    },
    {
      city: "Kayapa",
    },
    {
      city: "Kiamba",
    },
    {
      city: "Kiangan",
    },
    {
      city: "Kibawe",
    },
    {
      city: "Kiblawan",
    },
    {
      city: "Kibungan",
    },
    {
      city: "Kinoguitan",
    },
    {
      city: "Kitaotao",
    },
    {
      city: "Kitcharao",
    },
    {
      city: "Kolambugan",
    },
    {
      city: "Kumalarang",
    },
    {
      city: "La Carlota City",
    },
    {
      city: "La Castellana",
    },
    {
      city: "La Libertad",
    },
    {
      city: "La Paz",
    },
    {
      city: "La Trinidad",
    },
    {
      city: "Laak San Vicente",
    },
    {
      city: "Labangan",
    },
    {
      city: "Labason",
    },
    {
      city: "Labo",
    },
    {
      city: "Labrador",
    },
    {
      city: "Lacub",
    },
    {
      city: "Lagangilang",
    },
    {
      city: "Lagawe",
    },
    {
      city: "Lagayan",
    },
    {
      city: "Lagonglong",
    },
    {
      city: "Lagonoy",
    },
    {
      city: "Laguindingan",
    },
    {
      city: "Lake Sebu",
    },
    {
      city: "Lakewood",
    },
    {
      city: "Lal Lo",
    },
    {
      city: "Lala",
    },
    {
      city: "Lambayong Mariano Marcos",
    },
    {
      city: "Lambunao",
    },
    {
      city: "Lamut",
    },
    {
      city: "Langiden",
    },
    {
      city: "Languyan",
    },
    {
      city: "Lantapan",
    },
    {
      city: "Lantawan",
    },
    {
      city: "Lanuza",
    },
    {
      city: "Laoac",
    },
    {
      city: "Laoag City",
    },
    {
      city: "Laoang",
    },
    {
      city: "Lapinig",
    },
    {
      city: "Lapu Lapu City Opon",
    },
    {
      city: "Lapuyan",
    },
    {
      city: "Larena",
    },
    {
      city: "Las Navas",
    },
    {
      city: "Las Nieves",
    },
    {
      city: "Lasam",
    },
    {
      city: "Laua An",
    },
    {
      city: "Laur",
    },
    {
      city: "Laurel",
    },
    {
      city: "Lavezares",
    },
    {
      city: "Lawaan",
    },
    {
      city: "Lazi",
    },
    {
      city: "Lebak",
    },
    {
      city: "Leganes",
    },
    {
      city: "Legazpi City",
    },
    {
      city: "Lemery",
    },
    {
      city: "Leon",
    },
    {
      city: "Leyte",
    },
    {
      city: "Lezo",
    },
    {
      city: "Lian",
    },
    {
      city: "Lianga",
    },
    {
      city: "Libacao",
    },
    {
      city: "Libagon",
    },
    {
      city: "Libertad",
    },
    {
      city: "Libjo Albor",
    },
    {
      city: "Libmanan",
    },
    {
      city: "Libon",
    },
    {
      city: "Libona",
    },
    {
      city: "Libungan",
    },
    {
      city: "Licab",
    },
    {
      city: "Licuan Baay Licuan",
    },
    {
      city: "Lidlidda",
    },
    {
      city: "Lila",
    },
    {
      city: "Liliw",
    },
    {
      city: "Liloan",
    },
    {
      city: "Liloy",
    },
    {
      city: "Limasawa",
    },
    {
      city: "Limay",
    },
    {
      city: "Linamon",
    },
    {
      city: "Linapacan",
    },
    {
      city: "Lingig",
    },
    {
      city: "Lipa City",
    },
    {
      city: "Llanera",
    },
    {
      city: "Llorente",
    },
    {
      city: "Loay",
    },
    {
      city: "Lobo",
    },
    {
      city: "Loboc",
    },
    {
      city: "Looc",
    },
    {
      city: "Loon",
    },
    {
      city: "Lope De Vega",
    },
    {
      city: "Lopez",
    },
    {
      city: "Lopez Jaena",
    },
    {
      city: "Loreto",
    },
    {
      city: "Los Ba�os",
    },
    {
      city: "Luba",
    },
    {
      city: "Lubang",
    },
    {
      city: "Lubao",
    },
    {
      city: "Lubuagan",
    },
    {
      city: "Lucban",
    },
    {
      city: "Lucena City",
    },
    {
      city: "Lugait",
    },
    {
      city: "Lugus",
    },
    {
      city: "Luisiana",
    },
    {
      city: "Lumba Bayabao Maguing",
    },
    {
      city: "Lumbaca Unayan",
    },
    {
      city: "Lumban",
    },
    {
      city: "Lumbatan",
    },
    {
      city: "Lumbayanague",
    },
    {
      city: "Luna",
    },
    {
      city: "Lupao",
    },
    {
      city: "Lupi",
    },
    {
      city: "Lupon",
    },
    {
      city: "Lutayan",
    },
    {
      city: "Luuk",
    },
    {
      city: "Ma Ayon",
    },
    {
      city: "Maasim",
    },
    {
      city: "Maasin",
    },
    {
      city: "Mabalacat City",
    },
    {
      city: "Mabinay",
    },
    {
      city: "Mabini",
    },
    {
      city: "Mabini Do�a Alicia",
    },
    {
      city: "Mabitac",
    },
    {
      city: "Mabuhay",
    },
    {
      city: "Macabebe",
    },
    {
      city: "Macalelon",
    },
    {
      city: "Macarthur",
    },
    {
      city: "Maco",
    },
    {
      city: "Maconacon",
    },
    {
      city: "Macrohon",
    },
    {
      city: "Madalag",
    },
    {
      city: "Madalum",
    },
    {
      city: "Madamba",
    },
    {
      city: "Maddela",
    },
    {
      city: "Madrid",
    },
    {
      city: "Madridejos",
    },
    {
      city: "Magalang",
    },
    {
      city: "Magallanes",
    },
    {
      city: "Magarao",
    },
    {
      city: "Magdalena",
    },
    {
      city: "Magdiwang",
    },
    {
      city: "Magpet",
    },
    {
      city: "Magsaysay",
    },
    {
      city: "Magsaysay Linugos",
    },
    {
      city: "Magsingal",
    },
    {
      city: "Maguing",
    },
    {
      city: "Mahaplag",
    },
    {
      city: "Mahatao",
    },
    {
      city: "Mahayag",
    },
    {
      city: "Mahinog",
    },
    {
      city: "Maigo",
    },
    {
      city: "Maimbung",
    },
    {
      city: "Mainit",
    },
    {
      city: "Maitum",
    },
    {
      city: "Majayjay",
    },
    {
      city: "Makato",
    },
    {
      city: "Makilala",
    },
    {
      city: "Malabang",
    },
    {
      city: "Malabuyoc",
    },
    {
      city: "Malalag",
    },
    {
      city: "Malangas",
    },
    {
      city: "Malapatan",
    },
    {
      city: "Malasiqui",
    },
    {
      city: "Malay",
    },
    {
      city: "Malibcong",
    },
    {
      city: "Malilipot",
    },
    {
      city: "Malimono",
    },
    {
      city: "Malinao",
    },
    {
      city: "Malita",
    },
    {
      city: "Malitbog",
    },
    {
      city: "Mallig",
    },
    {
      city: "Malungon",
    },
    {
      city: "Maluso",
    },
    {
      city: "Malvar",
    },
    {
      city: "Mamasapano",
    },
    {
      city: "Mambajao",
    },
    {
      city: "Mamburao",
    },
    {
      city: "Mambusao",
    },
    {
      city: "Manabo",
    },
    {
      city: "Manaoag",
    },
    {
      city: "Manapla",
    },
    {
      city: "Manay",
    },
    {
      city: "Mandaon",
    },
    {
      city: "Mandaue City",
    },
    {
      city: "Mangaldan",
    },
    {
      city: "Mangatarem",
    },
    {
      city: "Mangudadatu",
    },
    {
      city: "Manito",
    },
    {
      city: "Manjuyod",
    },
    {
      city: "Mankayan",
    },
    {
      city: "Manolo Fortich",
    },
    {
      city: "Mansalay",
    },
    {
      city: "Manticao",
    },
    {
      city: "Manukan",
    },
    {
      city: "Mapanas",
    },
    {
      city: "Mapandan",
    },
    {
      city: "Mapun Cagayan De Tawi Tawi",
    },
    {
      city: "Marabut",
    },
    {
      city: "Maragondon",
    },
    {
      city: "Maragusan San Mariano",
    },
    {
      city: "Maramag",
    },
    {
      city: "Marantao",
    },
    {
      city: "Marawi City",
    },
    {
      city: "Marcos",
    },
    {
      city: "Margosatubig",
    },
    {
      city: "Maria",
    },
    {
      city: "Maria Aurora",
    },
    {
      city: "Maribojoc",
    },
    {
      city: "Marihatag",
    },
    {
      city: "Marilao",
    },
    {
      city: "Maripipi",
    },
    {
      city: "Mariveles",
    },
    {
      city: "Marogong",
    },
    {
      city: "Masantol",
    },
    {
      city: "Masinloc",
    },
    {
      city: "Masiu",
    },
    {
      city: "Maslog",
    },
    {
      city: "Mataasnakahoy",
    },
    {
      city: "Matag Ob",
    },
    {
      city: "Matalam",
    },
    {
      city: "Matalom",
    },
    {
      city: "Matanao",
    },
    {
      city: "Matanog",
    },
    {
      city: "Matnog",
    },
    {
      city: "Matuguinao",
    },
    {
      city: "Matungao",
    },
    {
      city: "Mauban",
    },
    {
      city: "Mawab",
    },
    {
      city: "Mayantoc",
    },
    {
      city: "Maydolong",
    },
    {
      city: "Mayorga",
    },
    {
      city: "Mayoyao",
    },
    {
      city: "Medellin",
    },
    {
      city: "Medina",
    },
    {
      city: "Mendez Mendez Nu�ez",
    },
    {
      city: "Mercedes",
    },
    {
      city: "Merida",
    },
    {
      city: "Mexico",
    },
    {
      city: "Miagao",
    },
    {
      city: "Midsalip",
    },
    {
      city: "Midsayap",
    },
    {
      city: "Milagros",
    },
    {
      city: "Milaor",
    },
    {
      city: "Mina",
    },
    {
      city: "Minalabac",
    },
    {
      city: "Minalin",
    },
    {
      city: "Minglanilla",
    },
    {
      city: "Mlang",
    },
    {
      city: "Moalboal",
    },
    {
      city: "Mobo",
    },
    {
      city: "Mogpog",
    },
    {
      city: "Moises Padilla Magallon",
    },
    {
      city: "Molave",
    },
    {
      city: "Moncada",
    },
    {
      city: "Mondragon",
    },
    {
      city: "Monkayo",
    },
    {
      city: "Monreal",
    },
    {
      city: "Montevista",
    },
    {
      city: "Morong",
    },
    {
      city: "Motiong",
    },
    {
      city: "Mulanay",
    },
    {
      city: "Mulondo",
    },
    {
      city: "Munai",
    },
    {
      city: "Murcia",
    },
    {
      city: "Mutia",
    },
    {
      city: "Naawan",
    },
    {
      city: "Nabas",
    },
    {
      city: "Nabua",
    },
    {
      city: "Nabunturan",
    },
    {
      city: "Naga",
    },
    {
      city: "Naga City",
    },
    {
      city: "Nagbukel",
    },
    {
      city: "Nagcarlan",
    },
    {
      city: "Nagtipunan",
    },
    {
      city: "Naguilian",
    },
    {
      city: "Naic",
    },
    {
      city: "Nampicuan",
    },
    {
      city: "Narra",
    },
    {
      city: "Narvacan",
    },
    {
      city: "Nasipit",
    },
    {
      city: "Nasugbu",
    },
    {
      city: "Natividad",
    },
    {
      city: "Natonin",
    },
    {
      city: "Naujan",
    },
    {
      city: "Naval",
    },
    {
      city: "New Bataan",
    },
    {
      city: "New Corella",
    },
    {
      city: "New Lucena",
    },
    {
      city: "New Washington",
    },
    {
      city: "Norala",
    },
    {
      city: "Northern Kabuntalan",
    },
    {
      city: "Norzagaray",
    },
    {
      city: "Noveleta",
    },
    {
      city: "Nueva Era",
    },
    {
      city: "Nueva Valencia",
    },
    {
      city: "Numancia",
    },
    {
      city: "Nunungan",
    },
    {
      city: "Oas",
    },
    {
      city: "Obando",
    },
    {
      city: "Ocampo",
    },
    {
      city: "Odiongan",
    },
    {
      city: "Old Panamao",
    },
    {
      city: "Olongapo City",
    },
    {
      city: "Olutanga",
    },
    {
      city: "Omar",
    },
    {
      city: "Opol",
    },
    {
      city: "Orani",
    },
    {
      city: "Oras",
    },
    {
      city: "Orion",
    },
    {
      city: "Ormoc City",
    },
    {
      city: "Oroquieta City",
    },
    {
      city: "Oslob",
    },
    {
      city: "Oton",
    },
    {
      city: "Ozamis City",
    },
    {
      city: "Padada",
    },
    {
      city: "Padre Burgos",
    },
    {
      city: "Padre Garcia",
    },
    {
      city: "Paete",
    },
    {
      city: "Pagadian City",
    },
    {
      city: "Pagagawan",
    },
    {
      city: "Pagalungan",
    },
    {
      city: "Pagayawan Tatarikan",
    },
    {
      city: "Pagbilao",
    },
    {
      city: "Paglat",
    },
    {
      city: "Pagsanghan",
    },
    {
      city: "Pagsanjan",
    },
    {
      city: "Pagudpud",
    },
    {
      city: "Pakil",
    },
    {
      city: "Palanan",
    },
    {
      city: "Palanas",
    },
    {
      city: "Palapag",
    },
    {
      city: "Palauig",
    },
    {
      city: "Palayan City",
    },
    {
      city: "Palimbang",
    },
    {
      city: "Palo",
    },
    {
      city: "Palompon",
    },
    {
      city: "Paluan",
    },
    {
      city: "Pambujan",
    },
    {
      city: "Pamplona",
    },
    {
      city: "Panaon",
    },
    {
      city: "Panay",
    },
    {
      city: "Pandag",
    },
    {
      city: "Pandami",
    },
    {
      city: "Pandan",
    },
    {
      city: "Pandi",
    },
    {
      city: "Panganiban",
    },
    {
      city: "Pangantucan",
    },
    {
      city: "Pangil",
    },
    {
      city: "Panglao",
    },
    {
      city: "Panglima Estino New Panamao",
    },
    {
      city: "Panglima Sugala Balimbing",
    },
    {
      city: "Pangutaran",
    },
    {
      city: "Paniqui",
    },
    {
      city: "Panitan",
    },
    {
      city: "Pantabangan",
    },
    {
      city: "Pantao Ragat",
    },
    {
      city: "Pantar",
    },
    {
      city: "Pantukan",
    },
    {
      city: "Panukulan",
    },
    {
      city: "Paoay",
    },
    {
      city: "Paombong",
    },
    {
      city: "Paracale",
    },
    {
      city: "Paracelis",
    },
    {
      city: "Paranas Wright",
    },
    {
      city: "Parang",
    },
    {
      city: "Pasacao",
    },
    {
      city: "Pasay City",
    },
    {
      city: "Pasil",
    },
    {
      city: "Pastrana",
    },
    {
      city: "Pasuquin",
    },
    {
      city: "Pata",
    },
    {
      city: "Pateros",
    },
    {
      city: "Patikul",
    },
    {
      city: "Patnanungan",
    },
    {
      city: "Patnongon",
    },
    {
      city: "Pavia",
    },
    {
      city: "Payao",
    },
    {
      city: "Pe�ablanca",
    },
    {
      city: "Pe�aranda",
    },
    {
      city: "Penarrubia",
    },
    {
      city: "Perez",
    },
    {
      city: "Piagapo",
    },
    {
      city: "Piat",
    },
    {
      city: "Picong Sultan Gumander",
    },
    {
      city: "Piddig",
    },
    {
      city: "Pidigan",
    },
    {
      city: "Pigkawayan",
    },
    {
      city: "Pikit",
    },
    {
      city: "Pila",
    },
    {
      city: "Pilar",
    },
    {
      city: "Pili",
    },
    {
      city: "Pililla",
    },
    {
      city: "Pinabacdao",
    },
    {
      city: "Pinamalayan",
    },
    {
      city: "Pinamungahan",
    },
    {
      city: "Pi�an New Pi�an",
    },
    {
      city: "Pinili",
    },
    {
      city: "Pintuyan",
    },
    {
      city: "Pinukpuk",
    },
    {
      city: "Pio Duran",
    },
    {
      city: "Pio V Corpuz",
    },
    {
      city: "Pitogo",
    },
    {
      city: "Placer",
    },
    {
      city: "Plaridel",
    },
    {
      city: "Pola",
    },
    {
      city: "Polanco",
    },
    {
      city: "Polangui",
    },
    {
      city: "Polillo",
    },
    {
      city: "Polomolok",
    },
    {
      city: "Pontevedra",
    },
    {
      city: "Poona Bayabao Gata",
    },
    {
      city: "Poona Piagapo",
    },
    {
      city: "Porac",
    },
    {
      city: "Poro",
    },
    {
      city: "Pototan",
    },
    {
      city: "Pozorrubio",
    },
    {
      city: "Pres Carlos P Garcia Pitogo",
    },
    {
      city: "Pres Manuel A Roxas",
    },
    {
      city: "Presentacion",
    },
    {
      city: "President Quirino",
    },
    {
      city: "President Roxas",
    },
    {
      city: "Prieto Diaz",
    },
    {
      city: "Prosperidad",
    },
    {
      city: "Pualas",
    },
    {
      city: "Pudtol",
    },
    {
      city: "Puerto Galera",
    },
    {
      city: "Puerto Princesa City",
    },
    {
      city: "Pugo",
    },
    {
      city: "Pulilan",
    },
    {
      city: "Pulupandan",
    },
    {
      city: "Pura",
    },
    {
      city: "Quezon",
    },
    {
      city: "Quezon City",
    },
    {
      city: "Quinapondan",
    },
    {
      city: "Quirino",
    },
    {
      city: "Quirino Angkaki",
    },
    {
      city: "Ragay",
    },
    {
      city: "Rajah Buayan",
    },
    {
      city: "Ramon",
    },
    {
      city: "Ramon Magsaysay Liargo",
    },
    {
      city: "Ramos",
    },
    {
      city: "Rapu Rapu",
    },
    {
      city: "Real",
    },
    {
      city: "Reina Mercedes",
    },
    {
      city: "Remedios T Romualdez",
    },
    {
      city: "Rizal",
    },
    {
      city: "Rizal Liwan",
    },
    {
      city: "Rizal Marcos",
    },
    {
      city: "Rodriguez Montalban",
    },
    {
      city: "Romblon",
    },
    {
      city: "Ronda",
    },
    {
      city: "Rosales",
    },
    {
      city: "Rosario",
    },
    {
      city: "Roseller Lim",
    },
    {
      city: "Roxas",
    },
    {
      city: "Roxas City",
    },
    {
      city: "Sabangan",
    },
    {
      city: "Sablan",
    },
    {
      city: "Sablayan",
    },
    {
      city: "Sabtang",
    },
    {
      city: "Sadanga",
    },
    {
      city: "Sagada",
    },
    {
      city: "Sagay",
    },
    {
      city: "Sagay City",
    },
    {
      city: "Sagbayan Borja",
    },
    {
      city: "Sag�ay",
    },
    {
      city: "Saguday",
    },
    {
      city: "Saguiaran",
    },
    {
      city: "Saint Bernard",
    },
    {
      city: "Salay",
    },
    {
      city: "Salcedo",
    },
    {
      city: "Salcedo Baugen",
    },
    {
      city: "Sallapadan",
    },
    {
      city: "Salug",
    },
    {
      city: "Salvador",
    },
    {
      city: "Salvador Benedicto",
    },
    {
      city: "Samal",
    },
    {
      city: "Samboan",
    },
    {
      city: "Sampaloc",
    },
    {
      city: "San Agustin",
    },
    {
      city: "San Andres",
    },
    {
      city: "San Antonio",
    },
    {
      city: "San Benito",
    },
    {
      city: "San Carlos City",
    },
    {
      city: "San Clemente",
    },
    {
      city: "San Dionisio",
    },
    {
      city: "San Emilio",
    },
    {
      city: "San Enrique",
    },
    {
      city: "San Esteban",
    },
    {
      city: "San Fabian",
    },
    {
      city: "San Felipe",
    },
    {
      city: "San Fernando",
    },
    {
      city: "San Francisco",
    },
    {
      city: "San Francisco Anao Aon",
    },
    {
      city: "San Francisco Aurora",
    },
    {
      city: "San Gabriel",
    },
    {
      city: "San Guillermo",
    },
    {
      city: "San Ildefonso",
    },
    {
      city: "San Isidro",
    },
    {
      city: "San Jacinto",
    },
    {
      city: "San Joaquin",
    },
    {
      city: "San Jorge",
    },
    {
      city: "San Jose",
    },
    {
      city: "San Jose City",
    },
    {
      city: "San Jose De Buan",
    },
    {
      city: "San Juan",
    },
    {
      city: "San Juan Cabalian",
    },
    {
      city: "San Juan Lapog",
    },
    {
      city: "San Julian",
    },
    {
      city: "San Leonardo",
    },
    {
      city: "San Lorenzo",
    },
    {
      city: "San Lorenzo Ruiz",
    },
    {
      city: "San Luis",
    },
    {
      city: "San Manuel",
    },
    {
      city: "San Marcelino",
    },
    {
      city: "San Mariano",
    },
    {
      city: "San Mateo",
    },
    {
      city: "San Miguel",
    },
    {
      city: "San Narciso",
    },
    {
      city: "San Nicolas",
    },
    {
      city: "San Pablo",
    },
    {
      city: "San Pablo City",
    },
    {
      city: "San Pascual",
    },
    {
      city: "San Policarpo",
    },
    {
      city: "San Quintin",
    },
    {
      city: "San Rafael",
    },
    {
      city: "San Remigio",
    },
    {
      city: "San Ricardo",
    },
    {
      city: "San Roque",
    },
    {
      city: "San Sebastian",
    },
    {
      city: "San Simon",
    },
    {
      city: "San Teodoro",
    },
    {
      city: "San Vicente",
    },
    {
      city: "Sanchez Mira",
    },
    {
      city: "Santa",
    },
    {
      city: "Santa Ana",
    },
    {
      city: "Santa Barbara",
    },
    {
      city: "Santa Catalina",
    },
    {
      city: "Santa Cruz",
    },
    {
      city: "Santa Elena",
    },
    {
      city: "Santa Fe",
    },
    {
      city: "Santa Ignacia",
    },
    {
      city: "Santa Josefa",
    },
    {
      city: "Santa Lucia",
    },
    {
      city: "Santa Magdalena",
    },
    {
      city: "Santa Marcela",
    },
    {
      city: "Santa Margarita",
    },
    {
      city: "Santa Maria",
    },
    {
      city: "Santa Maria Imelda",
    },
    {
      city: "Santa Monica Sapao",
    },
    {
      city: "Santa Praxedes",
    },
    {
      city: "Santa Rita",
    },
    {
      city: "Santa Rosa",
    },
    {
      city: "Santa Teresita",
    },
    {
      city: "Santander",
    },
    {
      city: "Santiago",
    },
    {
      city: "Santo Domingo",
    },
    {
      city: "Santo Ni�o",
    },
    {
      city: "Santo Ni�o Faire",
    },
    {
      city: "Santo Tomas",
    },
    {
      city: "Santol",
    },
    {
      city: "Sapa Sapa",
    },
    {
      city: "Sapad",
    },
    {
      city: "Sapang Dalaga",
    },
    {
      city: "Sapi An",
    },
    {
      city: "Sara",
    },
    {
      city: "Sarangani",
    },
    {
      city: "Sariaya",
    },
    {
      city: "Sarrat",
    },
    {
      city: "Sasmuan Sexmoan",
    },
    {
      city: "Science City Of Mu�oz",
    },
    {
      city: "Sebaste",
    },
    {
      city: "Sen. Ninoy Aquino",
    },
    {
      city: "Sergio Osmena Sr",
    },
    {
      city: "Sevilla",
    },
    {
      city: "Shariff Aguak (Maganoy)",
    },
    {
      city: "Shariff Saydona Mustapha",
    },
    {
      city: "Siasi",
    },
    {
      city: "Siaton",
    },
    {
      city: "Siay",
    },
    {
      city: "Siayan",
    },
    {
      city: "Sibagat",
    },
    {
      city: "Sibalom",
    },
    {
      city: "Sibonga",
    },
    {
      city: "Sibuco",
    },
    {
      city: "Sibulan",
    },
    {
      city: "Sibunag",
    },
    {
      city: "Sibutad",
    },
    {
      city: "Sibutu",
    },
    {
      city: "Sierra Bullones",
    },
    {
      city: "Sigay",
    },
    {
      city: "Sigma",
    },
    {
      city: "Sikatuna",
    },
    {
      city: "Silago",
    },
    {
      city: "Silang",
    },
    {
      city: "Silay City",
    },
    {
      city: "Silvino Lobos",
    },
    {
      city: "Simunul",
    },
    {
      city: "Sinacaban",
    },
    {
      city: "Sinait",
    },
    {
      city: "Sindangan",
    },
    {
      city: "Siniloan",
    },
    {
      city: "Siocon",
    },
    {
      city: "Sipocot",
    },
    {
      city: "Siquijor",
    },
    {
      city: "Sirawai",
    },
    {
      city: "Siruma",
    },
    {
      city: "Sison",
    },
    {
      city: "Sitangkai",
    },
    {
      city: "Socorro",
    },
    {
      city: "Sogod",
    },
    {
      city: "Solana",
    },
    {
      city: "Solano",
    },
    {
      city: "Solsona",
    },
    {
      city: "Sominot Don Mariano Marcos",
    },
    {
      city: "South Ubian",
    },
    {
      city: "South Upi",
    },
    {
      city: "Sual",
    },
    {
      city: "Subic",
    },
    {
      city: "Sudipen",
    },
    {
      city: "Sugbongcogon",
    },
    {
      city: "Sugpon",
    },
    {
      city: "Sulat",
    },
    {
      city: "Sulop",
    },
    {
      city: "Sultan Dumalondong",
    },
    {
      city: "Sultan Kudarat (Nuling)",
    },
    {
      city: "Sultan Mastura",
    },
    {
      city: "Sultan Sa Barongis (Lambayong)",
    },
    {
      city: "Sumilao",
    },
    {
      city: "Sumisip",
    },
    {
      city: "Surallah",
    },
    {
      city: "Surigao City",
    },
    {
      city: "Suyo",
    },
    {
      city: "Taal",
    },
    {
      city: "Tabango",
    },
    {
      city: "Tabina",
    },
    {
      city: "Tabogon",
    },
    {
      city: "Tabontabon",
    },
    {
      city: "Tabuan Lasa",
    },
    {
      city: "Tabuelan",
    },
    {
      city: "Tacloban City",
    },
    {
      city: "Tadian",
    },
    {
      city: "Taft",
    },
    {
      city: "Tagana An",
    },
    {
      city: "Tagapul An",
    },
    {
      city: "Tagaytay City",
    },
    {
      city: "Tagbilaran City",
    },
    {
      city: "Tagbina",
    },
    {
      city: "Tagkawayan",
    },
    {
      city: "Tago",
    },
    {
      city: "Tagoloan",
    },
    {
      city: "Tagoloan Ii",
    },
    {
      city: "Tagudin",
    },
    {
      city: "Taguig City",
    },
    {
      city: "Talacogon",
    },
    {
      city: "Talaingod",
    },
    {
      city: "Talakag",
    },
    {
      city: "Talalora",
    },
    {
      city: "Talavera",
    },
    {
      city: "Talayan",
    },
    {
      city: "Talibon",
    },
    {
      city: "Talipao",
    },
    {
      city: "Talisay",
    },
    {
      city: "Talisayan",
    },
    {
      city: "Talitay",
    },
    {
      city: "Talugtug",
    },
    {
      city: "Talusan",
    },
    {
      city: "Tambulig",
    },
    {
      city: "Tampakan",
    },
    {
      city: "Tamparan",
    },
    {
      city: "Tampilisan",
    },
    {
      city: "Tanauan",
    },
    {
      city: "Tanay",
    },
    {
      city: "Tandubas",
    },
    {
      city: "Tangalan",
    },
    {
      city: "Tangcal",
    },
    {
      city: "Tangub City",
    },
    {
      city: "Tantangan",
    },
    {
      city: "Tanudan",
    },
    {
      city: "Tanza",
    },
    {
      city: "Tapaz",
    },
    {
      city: "Tapul",
    },
    {
      city: "Taraka",
    },
    {
      city: "Tarangnan",
    },
    {
      city: "Tarragona",
    },
    {
      city: "Tayasan",
    },
    {
      city: "Taysan",
    },
    {
      city: "Taytay",
    },
    {
      city: "Tayug",
    },
    {
      city: "Tayum",
    },
    {
      city: "Tboli",
    },
    {
      city: "Teresa",
    },
    {
      city: "Ternate",
    },
    {
      city: "Tiaong",
    },
    {
      city: "Tibiao",
    },
    {
      city: "Tigaon",
    },
    {
      city: "Tigbao",
    },
    {
      city: "Tigbauan",
    },
    {
      city: "Tinambac",
    },
    {
      city: "Tineg",
    },
    {
      city: "Tinglayan",
    },
    {
      city: "Tingloy",
    },
    {
      city: "Tinoc",
    },
    {
      city: "Tipo Tipo",
    },
    {
      city: "Titay",
    },
    {
      city: "Tiwi",
    },
    {
      city: "Tobias Fornier Dao",
    },
    {
      city: "Toboso",
    },
    {
      city: "Toledo City",
    },
    {
      city: "Tolosa",
    },
    {
      city: "Tomas Oppus",
    },
    {
      city: "Tongkil",
    },
    {
      city: "Torrijos",
    },
    {
      city: "Trece Martires City",
    },
    {
      city: "Trento",
    },
    {
      city: "Trinidad",
    },
    {
      city: "Tuao",
    },
    {
      city: "Tuba",
    },
    {
      city: "Tubajon",
    },
    {
      city: "Tubao",
    },
    {
      city: "Tubaran",
    },
    {
      city: "Tubay",
    },
    {
      city: "Tubigon",
    },
    {
      city: "Tublay",
    },
    {
      city: "Tubo",
    },
    {
      city: "Tubod",
    },
    {
      city: "Tubungan",
    },
    {
      city: "Tuburan",
    },
    {
      city: "Tudela",
    },
    {
      city: "Tugaya",
    },
    {
      city: "Tuguegarao City",
    },
    {
      city: "Tukuran",
    },
    {
      city: "Tulunan",
    },
    {
      city: "Tumauini",
    },
    {
      city: "Tunga",
    },
    {
      city: "Tungawan",
    },
    {
      city: "Tupi",
    },
    {
      city: "Turtle Islands",
    },
    {
      city: "Tuy",
    },
    {
      city: "Ubay",
    },
    {
      city: "Umingan",
    },
    {
      city: "Ungkaya Pukan",
    },
    {
      city: "Unisan",
    },
    {
      city: "Upi",
    },
    {
      city: "Urbiztondo",
    },
    {
      city: "Uson",
    },
    {
      city: "Uyugan",
    },
    {
      city: "Valderrama",
    },
    {
      city: "Valencia",
    },
    {
      city: "Valencia Luzurriaga",
    },
    {
      city: "Valladolid",
    },
    {
      city: "Vallehermoso",
    },
    {
      city: "Veruela",
    },
    {
      city: "Victoria",
    },
    {
      city: "Viga",
    },
    {
      city: "Villaba",
    },
    {
      city: "Villanueva",
    },
    {
      city: "Villareal",
    },
    {
      city: "Villasis",
    },
    {
      city: "Villaverde",
    },
    {
      city: "Villaviciosa",
    },
    {
      city: "Vincenzo A Sagun",
    },
    {
      city: "Vintar",
    },
    {
      city: "Vinzons",
    },
    {
      city: "Virac",
    },
    {
      city: "Wao",
    },
    {
      city: "Zamboanga City",
    },
    {
      city: "Zamboanguita",
    },
    {
      city: "Zaragoza",
    },
    {
      city: "Zarraga",
    },
    {
      city: "Zumarraga",
    },
  ];

  const preferredLocationData = [
    {
      key: "Makati City",
      value: "Makati City",
    },
    {
      key: "Quezon City",
      value: "Quezon City",
    },
    {
      key: "Pampanga",
      value: "Pampanga",
    },
    {
      key: "Siargao",
      value: "Siargao",
    },
    {
      key: "Surigao Del Norte",
      value: "Surigao Del Norte",
    },
    {
      key: "Taguig",
      value: "Taguig",
    },
    {
      key: "Palawan",
      value: "Palawan",
    },
    {
      key: "Cebu",
      value: "Cebu",
    },
  ];

  return {
    suffixData,
    genderData,
    priorityGroupData,
    subPriorityGroupData,
    hasComorbidityData,
    hasAllergyData,
    regionData,
    provinceData,
    cityData,
    preferredLocationData,
  };
};
