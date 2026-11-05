export interface SourceCitation {
  title: string;
  authorOrOrg: string;
  url: string;
  year?: string;
}

export interface MacroEra {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  dominantParadigm: string;
  artifact3DMode: 'globe' | 'ishango' | 'sangaku' | 'enigma';
}

export interface TimelineMilestone {
  id: string;
  eraId: string;
  yearLabel: string;
  yearNumeric: number; // negative for BCE
  title: string;
  subtitle: string;
  region: string;
  modernCountry: string;
  coordinates: [number, number]; // [lat, lng]
  communityType: string;
  discipline: string;
  etymologyAndPracticalOrigin: string;
  theoreticalBreakthrough: string;
  keyFormulaOrNotation: string;
  modernApplications: string[];
  anthropologicalContext: string;
  knowledgeTransmission: string;
  caseStudyAnecdote: string;
  historicalLegacy: string;
  sources: SourceCitation[];
}

export const MACRO_ERAS: MacroEra[] = [
  {
    id: 'era-1',
    number: '01',
    title: 'Paleolitico e Neolitico: L’Etnomatematica Primordiale',
    subtitle: 'Dalle origini al 3000 a.C.',
    period: '35.000 a.C. – 3000 a.C.',
    summary:
      'L’alba del pensiero logico fuori dalle istituzioni. Cacciatori-raccoglitori, naviganti oceanici e primi agricoltori sviluppano il conteggio su osso, la simmetria geometrica nelle ceramiche e mappe nautiche basate sulla rifrazione delle onde.',
    dominantParadigm: 'Conteggio corporeo, tacche calendariali lunari, simmetria spaziale implicita',
    artifact3DMode: 'ishango',
  },
  {
    id: 'era-2',
    number: '02',
    title: 'Le Sponde dei Grandi Fiumi: Matematiche Statali e Scribali',
    subtitle: 'Mesopotamia, Nilo, Indo, Fiume Giallo e Ande Arcaiche',
    period: '3000 a.C. – 600 a.C.',
    summary:
      'La nascita delle prime grandi burocrazie idrauliche. La geometria nasce letteralmente come "misura della terra" (geo-metria) dopo le piene del Nilo, mentre l’aritmetica sessagesimale babilonese governa il grano, il catasto e le eclissi.',
    dominantParadigm: 'Algoritmi contabili, sistema posizionale base 60, geometria agrimensoria',
    artifact3DMode: 'ishango',
  },
  {
    id: 'era-3',
    number: '03',
    title: 'L’Asse Ellenistico, la Via della Seta e il Mondo Maya',
    subtitle: 'La nascita della dimostrazione assiomatica e i sistemi posizionali',
    period: '600 a.C. – 500 d.C.',
    summary:
      'Il passaggio epocale dal calcolo empirico alla dimostrazione deduttiva rigorosa in Grecia (Pitagora, Euclide, Archimede), affiancato dall’algebra matriciale della Cina Han, dagli ordini d’infinito Jaina in India e dallo zero posizionale Maya.',
    dominantParadigm: 'Metodo assiomatico-deduttivo, eliminazione gaussiana su bacchette, zero calendariale',
    artifact3DMode: 'globe',
  },
  {
    id: 'era-4',
    number: '04',
    title: 'Il Medioevo Globale: Matematica Sacra e Transfrontaliera',
    subtitle: 'Baghdad, Samarcanda, Scuola del Kerala e Cattedrali Gotiche',
    period: '500 d.C. – 1400 d.C.',
    summary:
      'Nella Casa della Sapienza di Baghdad, al-Khwarizmi fonde la geometria greca e il sistema posizionale indiano fondando l’Algebra (al-jabr) e gli Algoritmi. In India meridionale, la Scuola del Kerala scopre le serie infinite del calcolo secoli prima dell’Europa.',
    dominantParadigm: 'Algebra retorica e simbolica, trigonometria sferica, serie infinite di potenze',
    artifact3DMode: 'globe',
  },
  {
    id: 'era-5',
    number: '05',
    title: 'I Duelli Rinascimentali, l’Abaco e il Wasan Giapponese',
    subtitle: 'Scuole d’Abaco, Cossisti, Numeri Complessi e Templi Sangaku',
    period: '1400 d.C. – 1700 d.C.',
    summary:
      'La matematica scende nelle piazze mercantili italiane: i duelli pubblici sulle equazioni di terzo grado tra Tartaglia, Cardano e Bombelli fanno nascere i numeri complessi. In Giappone fiorisce il Wasan con le tavolette votive Sangaku.',
    dominantParadigm: 'Algebra simbolica, unità immaginaria i, geometria analitica (Descartes/Fermat)',
    artifact3DMode: 'sangaku',
  },
  {
    id: 'era-6',
    number: '06',
    title: 'L’Illuminismo e le Grandi Corti Reali: Il Calcolo Dinastico',
    subtitle: 'San Pietroburgo, Basilea, Londra, Parigi ed Edimburgo',
    period: '1680 d.C. – 1800 d.C.',
    summary:
      'Con il calcolo infinitesimale di Newton e Leibniz, e la prodigiosa produzione di Eulero e dei Bernoulli nelle Accademie Reali, la matematica diventa il linguaggio universale della meccanica celeste, della fluidodinamica e della teoria dei grafi.',
    dominantParadigm: 'Calcolo differenziale e integrale, equazioni differenziali, teoria dei grafi',
    artifact3DMode: 'globe',
  },
  {
    id: 'era-7',
    number: '07',
    title: 'L’Ottocento: Istituzionalizzazione, Geometrie Non-Euclidee e Gruppi',
    subtitle: 'Gottinga, Parigi, Cambridge, Kazan, Budapest e Palermo',
    period: '1800 d.C. – 1900 d.C.',
    summary:
      'Crolla il dogma dell’unicità della geometria euclidea (Gauss, Bolyai, Lobachevsky, Riemann), aprendo la via alla Relatività. Galois ed Abel fondano la teoria dei gruppi; Boole algebrizza la logica; nasce il Circolo Matematico di Palermo.',
    dominantParadigm: 'Varietà riemanniane, teoria dei gruppi di Galois, analisi complessa, logica booleana',
    artifact3DMode: 'globe',
  },
  {
    id: 'era-8',
    number: '08',
    title: 'Il Primo Novecento: Rigore, Crisi dei Fondamenti e Caffè Matematici',
    subtitle: 'Gottinga, Caffè Scozzese di Leopoli, Budapest, Vienna e Bourbaki',
    period: '1900 d.C. – 1945 d.C.',
    summary:
      'L’età dei Genius Clusters: dai tavoli di marmo del Caffè Scozzese di Leopoli (Banach, Ulam) ai ginnasi di Budapest (von Neumann, Erdős), dal Circolo di Vienna (Gödel) al collettivo segreto Nicolas Bourbaki a Parigi e all’IAS di Princeton.',
    dominantParadigm: 'Spazi di Banach/Hilbert, incompletezza di Gödel, algebra astratta (Noether), assiomatica',
    artifact3DMode: 'enigma',
  },
  {
    id: 'era-9',
    number: '09',
    title: 'Guerra Fredda: Criptoanalisi, Circoli Sovietici e Cultura Hacker',
    subtitle: 'Bletchley Park, Mosca, MIT TMRC, RAND Corporation e Rio de Janeiro',
    period: '1945 d.C. – 1990 d.C.',
    summary:
      'Alan Turing a Bletchley Park e von Neumann plasmano il computer moderno. In URSS fioriscono i Math Circles di Kolmogorov e la rivista Kvant; negli USA nascono la Teoria dell’Informazione (Shannon), la Teoria dei Giochi (RAND/Nash) e l’hacking al MIT.',
    dominantParadigm: 'Macchina di Turing, entropia di Shannon, teoria del caos, combinatoria estremale',
    artifact3DMode: 'enigma',
  },
  {
    id: 'era-10',
    number: '10',
    title: 'Era Digitale, IA e Frontiere Future del Calcolo',
    subtitle: 'Crittografia, Deep Learning, e-Estonia, Dimostratori Formali e Calcolo Quantistico',
    period: '1990 d.C. – Frontiere 2030+',
    summary:
      'L’algebra lineare su GPU alimenta il Machine Learning e i Transformer; la geometria aritmetica protegge internet (ECC, zk-SNARKs, KSI in Estonia). Con Polymath, Lean 4 e l’IA neuro-simbolica, la scoperta matematica diventa collaborativa e verificata formalmente.',
    dominantParadigm: 'Reti neurali profonde, prove a conoscenza zero (ZKP), crittografia post-quantistica, verifica formale Lean',
    artifact3DMode: 'globe',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'ishango-bone',
    eraId: 'era-1',
    yearLabel: 'c. 20.000 a.C.',
    yearNumeric: -20000,
    title: 'L’Osso di Ishango e l’Alba dei Numeri Primi',
    subtitle: 'Comunità di pescatori e cacciatori-raccoglitori del Lago Edo',
    region: 'Valle del Semliki, Africa Centrale',
    modernCountry: 'Rep. Democratica del Congo / Uganda',
    coordinates: [-0.12, 29.6],
    communityType: 'Comunità indigena seminomade',
    discipline: 'Aritmetica Primordiale & Cronologia',
    etymologyAndPracticalOrigin:
      'Prima della scrittura, contare ("calcolo" deriva dal latino calculus, "sassolino") nasce dall’esigenza biologica e sociale di sincronizzare la caccia, le piene lacustri e i cicli lunari/mestruali incidendo tacche su fibule ossee.',
    theoreticalBreakthrough:
      'Raggruppamenti asimmetrici in tre colonne che mostrano raddoppi (3→6, 4→8, 5→10), la sequenza dei numeri primi tra 10 e 20 (11, 13, 17, 19) e somme pari a 60 e 48 (cicli lunari).',
    keyFormulaOrNotation: 'Colonna M: (3,6), (4,8), (10, 5,5, 7) · Colonna G: {11, 13, 17, 19} = 60',
    modernApplications: [
      'Sistemi numerici binari (raddoppio/dimezzamento alla base delle ALU nei processori)',
      'Cronobiologia e modellazione di serie temporali periodiche',
    ],
    anthropologicalContext:
      'Sulle sponde del Lago Edo, chi dominava il conteggio del tempo e delle stagioni agiva come custode della memoria collettiva. Molti etnomatematici (tra cui Claudia Zaslavsky) ipotizzano che le donne del Paleolitico, tracciando i cicli lunari e fertili, siano state le prime cronologiste e matematiche della specie umana.',
    knowledgeTransmission:
      'Trasmissione orale e cinestetica: i bambini imparavano a contare associando quantità a parti del corpo, ritmi percussivi e intagli su legno o osso con punte di quarzo.',
    caseStudyAnecdote:
      'Scoperto nel 1950 dall’archeologo belga Jean de Heinzelin de Braucourt tra le ceneri vulcaniche di Ishango, il reperto di 10 cm presenta all’estremità un frammento di quarzo incastonato come uno stilo di incisione: il più antico "taccuino scientifico" dell’umanità.',
    historicalLegacy:
      'Dimostra che l’astrazione numerica, la duplicazione e l’intuizione dei numeri primi precedono di oltre 15.000 anni le burocrazie urbane mesopotamiche.',
    sources: [
      {
        title: 'Africa Counts: Number and Pattern in African Cultures',
        authorOrOrg: 'Claudia Zaslavsky',
        url: 'https://en.wikipedia.org/wiki/Ishango_bone',
        year: '1973',
      },
      {
        title: 'An overview of the history of mathematics',
        authorOrOrg: 'MacTutor History of Mathematics (St Andrews)',
        url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/History_overview/',
      },
    ],
  },
  {
    id: 'micronesian-stick-charts',
    eraId: 'era-1',
    yearLabel: 'c. 3500 a.C. – Tradizione viva',
    yearNumeric: -3500,
    title: 'Le Stick Charts Micronesiane e la Geometria delle Onde',
    subtitle: 'Corporazione dei navigatori delle Isole Marshall (Mattang, Meddo, Rebbelib)',
    region: 'Oceania / Micronesia',
    modernCountry: 'Isole Marshall',
    coordinates: [7.13, 171.18],
    communityType: 'Gilda tradizionale di navigatori oceanici',
    discipline: 'Topologia Spaziale & Fisica Matematica Empirica',
    etymologyAndPracticalOrigin:
      'Navigare migliaia di chilometri nel Pacifico senza bussola magnetica richiedeva di modellare matematicamente i fronti d’onda (rifrazione, diffrazione e interferenza delle onde oceaniche contro gli atolli corallini).',
    theoreticalBreakthrough:
      'Rappresentazione analogica di campi vettoriali e nodi di interferenza d’onda mediante nervature di palma da cocco legate in reticoli geometrici simmetrici e conchiglie Cauri.',
    keyFormulaOrNotation: 'Nodi di rifrazione: Δθ_onda → intersezione di iperboli d’interferenza tra due atolli',
    modernApplications: [
      'Acustica subacquea, radar a schiera di fase (Phased Array) e inversione sismica',
      'Navigazione inerziale autonoma in ambienti privi di segnale GPS',
    ],
    anthropologicalContext:
      'La scienza della navigazione era un sapere iniziatico custodito dai capi-piloti. Le mappe non venivano portate in barca durante il viaggio, ma memorizzate a terra attraverso il tatto e il corpo.',
    knowledgeTransmission:
      'Fin da bambini, gli apprendisti navigatori venivano fatti sdraiare a occhi chiusi sul fondo della canoa o nella risacca per "sentire" con la schiena le derivate direzionali del moto ondoso.',
    caseStudyAnecdote:
      'La mappa "Mattang" non raffigurava isole reali, ma era un vero e proprio modello matematico astratto ideale usato per insegnare ai giovani il teorema generale di come un’isola puntiforme deforma un fronte d’onda piano.',
    historicalLegacy:
      'Un capolavoro di etnomatematica studiato da Marcia Ascher che dimostra come la modellazione dei sistemi dinamici continui possa esistere senza scrittura alfabetica.',
    sources: [
      {
        title: 'Ethnomathematics: A Multicultural View of Mathematical Ideas',
        authorOrOrg: 'Marcia Ascher',
        url: 'https://en.wikipedia.org/wiki/Marshall_Islands_stick_chart',
        year: '1991',
      },
    ],
  },
  {
    id: 'sumer-babylon-edubba',
    eraId: 'era-2',
    yearLabel: 'c. 2000 – 1600 a.C.',
    yearNumeric: -1800,
    title: 'Le Scuole Scribali Edubba, la Base 60 e Plimpton 322',
    subtitle: 'La corporazione degli scribi sumero-babilonesi di Nippur e Ur',
    region: 'Mesopotamia',
    modernCountry: 'Iraq',
    coordinates: [32.12, 45.23],
    communityType: 'Scuola burocratica statale (Edubba - "Casa delle Tavolette")',
    discipline: 'Aritmetica Posizionale, Equazioni Quadratiche & Trigonometria Esatta',
    etymologyAndPracticalOrigin:
      'La necessità di gestire canali d’irrigazione, prestiti a interesse composto, razioni d’orzo per migliaia di operai e osservazioni astronomiche spinse gli scribi a inventare il primo sistema numerico posizionale della storia (a base 60, divisibile per 2, 3, 4, 5, 6, 10, 12, 15, 20, 30).',
    theoreticalBreakthrough:
      'Calcolo di radici quadrate con l’algoritmo iterativo babilonese (metodo di Newton-Raphson ante litteram su YBC 7289 con √2 preciso a 6 cifre decimali) e generazione sistematica di terne pitagoriche su Plimpton 322.',
    keyFormulaOrNotation: 'x_{n+1} = ½ (x_n + S / x_n) · √2 ≈ 1 + 24/60 + 51/60² + 10/60³ = 1.41421296...',
    modernApplications: [
      'Divisione universale del tempo (60 minuti, 60 secondi) e degli angoli (360°)',
      'Algoritmo di Newton-Raphson implementato nell’hardware dei processori moderni per divisioni e radici veloci',
    ],
    anthropologicalContext:
      'Nelle Edubba ("Case delle Tavolette"), i figli dell’élite amministrativa studiavano dall’alba al tramonto incidendo l’argilla fresca con uno stilo di canna. Lo scriba matematico (dubsar) era il pilastro fiscale e ingegneristico dell’impero di Hammurabi.',
    knowledgeTransmission:
      'Gli studenti copiavano centinaia di tavolette di reciproci, quadrati e problemi quadratici ("Ho sommato l’area e il lato del mio quadrato ottenendo 45/60"), corretti dal "Padre della Casa delle Tavolette".',
    caseStudyAnecdote:
      'La tavoletta YBC 7289 (c. 1800 a.C.) ha la forma rotonda tipica delle "tavolette da palmo" degli apprendisti: uno studente babilonese vi disegnò un quadrato con la diagonale e incise √2 con una precisione di un milionesimo che i Greci non raggiunsero per altri 1500 anni.',
    historicalLegacy:
      'Invenzione della notazione posizionale, delle equazioni di secondo grado completando il quadrato e dei primi algoritmi iterativi convergenti.',
    sources: [
      {
        title: 'Babylonian mathematics — MacTutor',
        authorOrOrg: 'J.J. O’Connor & E.F. Robertson (St Andrews)',
        url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Babylonian_mathematics/',
      },
      {
        title: 'Mathematics in Ancient Iraq: A Social History',
        authorOrOrg: 'Eleanor Robson',
        url: 'https://en.wikipedia.org/wiki/Babylonian_mathematics',
        year: '2008',
      },
    ],
  },
  {
    id: 'egypt-harpedonaptai',
    eraId: 'era-2',
    yearLabel: 'c. 1650 a.C.',
    yearNumeric: -1650,
    title: 'Gli Arpedonapti Egizi e il Papiro di Rhind (Ahmes)',
    subtitle: 'Perché la Geometria si chiama "Misura della Terra"',
    region: 'Valle del Nilo (Tebe / Menfi)',
    modernCountry: 'Egitto',
    coordinates: [25.7, 32.64],
    communityType: 'Corporazione di agrimensori reali e scribi templari',
    discipline: 'Geometria Pratica & Frazioni Unitarie',
    etymologyAndPracticalOrigin:
      'Come documentato da Erodoto, ogni anno la piena del Nilo cancellava i confini dei campi agricoli. Il Faraone inviava i "tenditori di corde" (Arpedonapti) per rimisurare esattamente la terra e ricalcolare le tasse: da qui il greco γῆ (gê, "terra") + μετρία (metría, "misura") = Geometria.',
    theoreticalBreakthrough:
      'Costruzione di angoli retti sul terreno mediante corde a 12 nodi equidistanti (triangolo 3-4-5), formula esatta del volume del tronco di piramide (Papiro di Mosca) e moltiplicazione per raddoppi successivi.',
    keyFormulaOrNotation: 'V = (h/3)(a² + ab + b²) · A_cerchio ≈ (8/9 d)² → π ≈ 256/81 ≈ 3.1605',
    modernApplications: [
      'Geodesia satellitare, sistemi informativi geografici (GIS) e catasto digitale',
      'Algoritmo di moltiplicazione egizia (Russian Peasant Multiplication), identico all’esponenziazione modulare veloce in crittografia RSA',
    ],
    anthropologicalContext:
      'Lo scriba Ahmes apre il Papiro di Rhind promettendo "Un metodo accurato per indagare nella natura e conoscere tutto ciò che esiste, ogni mistero e ogni segreto", mostrando come contabilità pratica e sapienza sacra fossero unite.',
    knowledgeTransmission:
      'Manuali di problemi risolti su papiro (84 problemi nel Papiro di Rhind su divisione di pani, pendenza delle piramidi "seqed" e granai cilindrici) e frazioni dell’Occhio di Horus.',
    caseStudyAnecdote:
      'Per dividere 9 pagnotte tra 10 operai senza liti, gli Egizi non davano "9/10 di pagnotta" in briciole, ma usavano le frazioni unitarie 2/3 + 1/5 + 1/30, in modo che ogni operaio ricevesse pezzi visivamente identici.',
    historicalLegacy:
      'Fondazione empirica della geometria piana e solida che ispirò direttamente Talete e Pitagora durante i loro viaggi in Egitto.',
    sources: [
      {
        title: 'Egyptian mathematics — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Egyptian_mathematics/',
      },
      {
        title: 'Rhind Mathematical Papyrus',
        authorOrOrg: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Rhind_Mathematical_Papyrus',
      },
    ],
  },
  {
    id: 'pythagoras-euclid-alexandria',
    eraId: 'era-3',
    yearLabel: 'c. 530 – 212 a.C.',
    yearNumeric: -300,
    title: 'Dalla Fratellanza Pitagorica di Crotone alla Biblioteca di Alessandria',
    subtitle: 'Pitagora, Euclide e Archimede: la nascita della Dimostrazione',
    region: 'Magna Grecia (Crotone, Siracusa) & Alessandria d’Egitto',
    modernCountry: 'Italia / Egitto',
    coordinates: [31.2, 29.91],
    communityType: 'Comunità filosofica iniziatica & Primo istituto di ricerca statale (Mouseion)',
    discipline: 'Geometria Assiomatica, Teoria dei Numeri & Metodo di Esaustione',
    etymologyAndPracticalOrigin:
      'La parola "Matematica" nasce proprio nella scuola pitagorica di Crotone dal greco μάθημα (máthēma), "ciò che si impara / conoscenza rigorosa", separando gli "acusmatici" (ascoltatori) dai "matematici" (coloro che dimostravano il perché delle cose).',
    theoreticalBreakthrough:
      'Negli "Elementi" di Euclide (c. 300 a.C.), l’intera geometria e teoria dei numeri (infinità dei numeri primi, algoritmo euclideo del MCD) vengono dedotte da soli 5 postulati. A Siracusa, Archimede anticipa il calcolo integrale con il Metodo di Esaustione.',
    keyFormulaOrNotation: 'a² + b² = c² · ∀ insieme finito {p₁, ..., pₙ}, N = (p₁·...·pₙ) + 1 ha un fattore primo nuovo',
    modernApplications: [
      'Architettura assiomatica del software formale, verifica automatica dei programmi e motori fisici 3D',
      'Algoritmo di Euclide esteso per calcolare l’inverso moltiplicativo nelle chiavi crittografiche pubbliche',
    ],
    anthropologicalContext:
      'Mentre a Crotone la matematica era un culto comunitario che univa musica (rapporti armonici delle corde) e cosmologia, ad Alessandria d’Egitto i Tolomei crearono il Mouseion: il primo campus di ricerca finanziato dallo Stato dove studiosi di tutto il Mediterraneo vivevano insieme.',
    knowledgeTransmission:
      'Trattati geometrici su rotoli di papiro, diagrammi tracciati nella sabbia con il compasso e la riga, e lettere scientifiche internazionali (Archimede inviava i suoi teoremi da Siracusa a Eratostene ad Alessandria).',
    caseStudyAnecdote:
      'Nel "Metodo dei Teoremi Meccanici" (riscoperto nel Palinsesto di Archimede nel 1906 sotto un testo liturgico medievale), Archimede svela a Eratostene il suo "segreto di laboratorio": prima scopriva i volumi pesando mentalmente le figure geometriche con la legge della leva, e solo dopo costruiva la dimostrazione formale rigorosa.',
    historicalLegacy:
      'Gli "Elementi" di Euclide sono il testo scientifico più longevo della storia umana, rimasto il modello assoluto di rigore logico per 2300 anni.',
    sources: [
      {
        title: 'Greek mathematics — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Greek_sources_1/',
      },
      {
        title: 'History of mathematics — Greek',
        authorOrOrg: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/History_of_mathematics#Greek',
      },
    ],
  },
  {
    id: 'china-han-nine-chapters',
    eraId: 'era-3',
    yearLabel: 'c. 200 a.C. – 263 d.C.',
    yearNumeric: 200,
    title: 'I Nove Capitoli dell’Arte Matematica (Jiuzhang Suanshu) e Liu Hui',
    subtitle: 'La burocrazia imperiale Han inventa le Matrici e i Numeri Negativi',
    region: 'Pianura Centrale Cinese (Chang’an / Luoyang)',
    modernCountry: 'Cina',
    coordinates: [34.26, 108.94],
    communityType: 'Accademia dei funzionari imperiali e ingegneri idraulici',
    discipline: 'Algebra Lineare (Metodo Fangcheng) & Analisi Numerica',
    etymologyAndPracticalOrigin:
      'Per ripartire equamente le tasse in covoni di grano di tre diverse qualità tra le province dell’Impero Han, i funzionari cinesi disposero delle bacchette di bambù su una scacchiera in righe e colonne: nacque così il metodo "Fangcheng" ("schieramento rettangolare"), cioè le moderne matrici.',
    theoreticalBreakthrough:
      'Risoluzione sistematica di sistemi di equazioni lineari fino a 5 incognite mediante riduzione per righe (1800 anni prima di Carl Friedrich Gauss) e uso formale di bacchette rosse (numeri positivi) e nere (numeri negativi).',
    keyFormulaOrNotation: 'Ax = b → Riduzione Fangcheng su scacchiera · Liu Hui (263 d.C.): poligono a 3072 lati → π ≈ 3.1416',
    modernApplications: [
      'Algebra lineare numerica su GPU: ogni rete neurale, LLM o motore grafico 3D esegue miliardi di moltiplicazioni matriciali derivate da questa struttura',
      'Ottimizzazione logistica, ricerca operativa e modelli input-output in economia',
    ],
    anthropologicalContext:
      'In Cina la matematica (Suanxue) era una delle "Sei Arti" confuciane. Non era separata dall’amministrazione pubblica: un magistrato doveva saper calcolare il volume di una diga, la tassazione proporzionale e la resa agricola.',
    knowledgeTransmission:
      'Il calcolo con le bacchette (Chousuan) veniva insegnato fisicamente su tavole quadrettate, rendendo l’operazione di eliminazione lineare un gesto visivo e tattile.',
    caseStudyAnecdote:
      'Quando durante l’eliminazione matriciale una sottrazione produceva un valore minore di zero, il Capitolo 8 dei Nove Capitoli non si bloccava (come faranno gli europei fino al ’600), ma enunciava la regola "Zheng Fu Shu": "Stesso segno si sottrae, segno opposto si somma", cambiando semplicemente il colore delle bacchette da rosso a nero.',
    historicalLegacy:
      'Prima formulazione storica dell’algebra lineare matriciale, dei numeri negativi e del Teorema Cinese del Resto (Sunzi, base della crittografia RSA veloce).',
    sources: [
      {
        title: 'Nine Chapters on the Mathematical Art — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Nine_chapters/',
      },
      {
        title: 'The Nine Chapters on the Mathematical Art',
        authorOrOrg: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/The_Nine_Chapters_on_the_Mathematical_Art',
      },
    ],
  },
  {
    id: 'india-zero-baghdad-algebra',
    eraId: 'era-4',
    yearLabel: '628 d.C. – 830 d.C.',
    yearNumeric: 820,
    title: 'Dallo Zero Indiano di Brahmagupta alla Casa della Sapienza di Baghdad',
    subtitle: 'Al-Khwarizmi fonda l’Algebra e gli Algoritmi nel Bayt al-Hikma',
    region: 'Ujjain (India) & Baghdad (Califfato Abbaside)',
    modernCountry: 'India / Iraq',
    coordinates: [33.31, 44.36],
    communityType: 'Osservatorio astronomico e centro di ricerca cosmopolita (Bayt al-Hikma)',
    discipline: 'Algebra, Aritmetica Decimale Posizionale & Algoritmica',
    etymologyAndPracticalOrigin:
      'Due parole chiave del mondo moderno nascono qui: "Algoritmo" è la latinizzazione del nome di Muhammad ibn Musa al-Khwarizmi; "Algebra" deriva da al-jabr ("ristabilimento / ricomposizione"), il metodo da lui creato per risolvere problemi pratici di eredità islamica, divisione di terre, canali e commerci.',
    theoreticalBreakthrough:
      'Nel 628 d.C. Brahmagupta formalizza nel Brahmasphutasiddhanta le regole aritmetiche dello zero (śūnya, "vuoto") come numero a pieno titolo e dei debiti (negativi). Attorno all’820 d.C. a Baghdad, al-Khwarizmi unifica il sistema decimale indiano e il rigore geometrico greco creando l’Algebra come disciplina autonoma.',
    keyFormulaOrNotation: 'x² + 10x = 39 → x = √((10/2)² + 39) - 10/2 = 3 · Regole di śūnya (0) e al-jabr / al-muqabala',
    modernApplications: [
      'Ogni singola riga di codice informatico ed esecuzione algoritmica globale',
      'Crittografia asimmetrica, protocolli di rete, finanza quantitativa e calcolo simbolico',
    ],
    anthropologicalContext:
      'Il Bayt al-Hikma (Casa della Sapienza) di Baghdad riuniva studiosi musulmani, cristiani siriaci, ebrei e persiani. La matematica era vista sia come strumento di giustizia sociale (calcolo equo delle quote ereditarie nel Corano) sia come chiave per determinare la Qibla (direzione della Mecca) tramite la trigonometria sferica.',
    knowledgeTransmission:
      'Traduzione massiva di manoscritti dal greco, sanscrito e pahlavi in arabo su carta (tecnologia appena giunta da Samarcanda), che rese i libri matematici riproducibili su vasta scala.',
    caseStudyAnecdote:
      'Nel suo libro sull’algebra, al-Khwarizmi non usa un solo simbolo: scrive tutto in prosa ("un quadrato e dieci radici sono uguali a trentanove dirham"), ma accompagna la regola algebrica con una dimostrazione geometrica visiva in cui "completa fisicamente il quadrato" aggiungendo quattro rettangoli.',
    historicalLegacy:
      'Fondazione dell’algebra, diffusione mondiale delle cifre indo-arabe (0-9) e nascita del concetto stesso di procedura algoritmica finita.',
    sources: [
      {
        title: 'Arabic mathematics: forgotten brilliance? — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Arabic_mathematics/',
      },
      {
        title: 'Al-Khwarizmi Biography — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/',
      },
    ],
  },
  {
    id: 'kerala-school-calculus',
    eraId: 'era-4',
    yearLabel: 'c. 1350 – 1550 d.C.',
    yearNumeric: 1400,
    title: 'La Scuola del Kerala e la Scoperta delle Serie Infinite',
    subtitle: 'Madhava di Sangamagrama e Nilakantha anticipano l’Analisi Matematica',
    region: 'Costa del Malabar (Kerala)',
    modernCountry: 'India',
    coordinates: [10.33, 76.21],
    communityType: 'Rete di templi-scuola astronomici (Gurukula)',
    discipline: 'Analisi Infinitesimale, Serie di Potenze & Trigonometria',
    etymologyAndPracticalOrigin:
      'Per prevedere con precisione millimetrica le posizioni dei pianeti e i cicli monsonici per l’agricoltura e i calendari rituali, i matematici del Kerala avevano bisogno di calcolare il seno, il coseno e l’arco di cerchio oltre la precisione delle tabelle cordali tradizionali.',
    theoreticalBreakthrough:
      'Madhava (c. 1340–1425) scopre gli sviluppi in serie infinita di potenze per sin(x), cos(x) e arctan(x) (oggi noti in Occidente come serie di Taylor-Maclaurin e serie di Gregory-Leibniz per π) quasi tre secoli prima di Newton e Leibniz.',
    keyFormulaOrNotation: 'π/4 = 1 - 1/3 + 1/5 - 1/7 + ... · sin(x) = x - x³/3! + x⁵/5! - ...',
    modernApplications: [
      'Calcolo numerico delle funzioni trascendenti in tutte le librerie matematiche (C math.h, Python NumPy)',
      'Elaborazione numerica dei segnali (DSP) e approssimazioni polinomiali',
    ],
    anthropologicalContext:
      'Lungo il fiume Bharathappuzha, una dinastia ininterrotta di maestri e discepoli (Madhava, Parameshvara, Nilakantha Somayaji, Jyesthadeva) lavorava in villaggi templari immersi nella natura, componendo teoremi in versi poetici sanscriti e in lingua vernacolare malayalam.',
    knowledgeTransmission:
      'I teoremi venivano memorizzati attraverso il sistema Katapayadi (dove le consonanti del sanscrito codificano cifre numeriche, trasformando una poesia devozionale in una tabella di π a 11 cifre decimali) e scritti su foglie di palma essiccate.',
    caseStudyAnecdote:
      'Nel trattato Yuktibhasha (c. 1530) di Jyesthadeva — considerato il primo libro di testo di calcolo infinitesimale al mondo — non vengono date solo le formule, ma le dimostrazioni rigorose del passaggio al limite dividendo il quadrante del cerchio in infiniti segmenti infinitesimi.',
    historicalLegacy:
      'Primo passaggio documentato nella storia umana dall’algebra del finito all’analisi dell’infinito.',
    sources: [
      {
        title: 'The Crest of the Peacock: Non-European Roots of Mathematics',
        authorOrOrg: 'George Gheverghese Joseph',
        url: 'https://en.wikipedia.org/wiki/Kerala_school_of_astronomy_and_mathematics',
        year: '2011',
      },
      {
        title: 'Madhava of Sangamagrama — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Madhava/',
      },
    ],
  },
  {
    id: 'renaissance-cossisti-complex-numbers',
    eraId: 'era-5',
    yearLabel: '1202 – 1572 d.C.',
    yearNumeric: 1545,
    title: 'Dalle Scuole d’Abaco ai Duelli dei Cossisti e i Numeri Complessi',
    subtitle: 'Fibonacci, Tartaglia, Cardano, Ferrari e Bombelli tra Firenze, Venezia e Bologna',
    region: 'Italia Centro-Settentrionale (Pisa, Firenze, Venezia, Milano, Bologna)',
    modernCountry: 'Italia',
    coordinates: [44.49, 11.34],
    communityType: 'Scuole mercantili d’abaco & Duelli accademici pubblici nelle piazze',
    discipline: 'Algebra Superiore & Analisi Complessa',
    etymologyAndPracticalOrigin:
      'L’incognita x veniva chiamata in volgare italiano "la Cosa" (dal latino causa), da cui il nome di "Cossisti" per gli algebristi. Mentre le Scuole d’Abaco insegnavano ai figli dei mercanti la partita doppia e i cambi valutari, i matematici universitari si sfidavano in duelli pubblici all’ultimo sangue intellettuale per conservare la cattedra.',
    theoreticalBreakthrough:
      'Scoperta delle formule risolutive per radicali delle equazioni di 3° e 4° grado (Dal Ferro, Tartaglia, Cardano, Ferrari nell’Ars Magna del 1545). Per risolvere il "caso irriducibile" dell’equazione cubica (dove per trovare 3 soluzioni reali positive bisogna estrarre la radice quadrata di un numero negativo!), Raffaele Bombelli nel 1572 a Bologna formalizza l’aritmetica dei Numeri Complessi.',
    keyFormulaOrNotation: 'x³ + px = q · Bombelli (1572): ∛(2 + √-121) + ∛(2 - √-121) = (2 + i) + (2 - i) = 4',
    modernApplications: [
      'Elettrotecnica ed elettronica in corrente alternata (impedenza complessa Z = R + jωL)',
      'Meccanica Quantistica (equazione di Schrödinger iℏ ∂ψ/∂t = Hψ), Trasformata di Fourier veloce (FFT) per Wi-Fi, 5G, MP3 e risonanza magnetica',
    ],
    anthropologicalContext:
      'Nel Cinquecento italiano la matematica era uno sport agonistico di piazza. Un professore non aveva il posto fisso: chiunque poteva affiggere un "cartello di matematica disfida" sulla porta di una chiesa con 30 problemi da risolvere entro 40 giorni davanti a un notaio.',
    knowledgeTransmission:
      'Nelle Scuole d’Abaco i ragazzi tra gli 11 e i 14 anni studiavano sui "Libri d’Abaco" manoscritti; nelle università i segreti algebrici venivano cifrati in poesie in terza rima per non farseli rubare dai rivali.',
    caseStudyAnecdote:
      'Nel febbraio 1535 a Venezia, Niccolò Tartaglia (autodidatta rimasto balbuziente da bambino per un colpo di sciabola francese) sconfisse per 30 a 0 Antonio Maria Fior nella notte prima della scadenza, scoprendo la formula generale delle cubiche. Nel 1539 la confidò a Gerolamo Cardano sotto giuramento cifrandola nella celebre poesia: "Quando che’l cubo con le cose appresso / se agguaglia a qualche numero discreto...".',
    historicalLegacy:
      'Nascita dei numeri complessi (che non nacquero per gioco astratto, ma perché indispensabili per calcolare radici reali!) e della moderna notazione simbolica europea.',
    sources: [
      {
        title: 'Tartaglia versus Cardan — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Tartaglia/',
      },
      {
        title: 'La formula segreta. Tartaglia, Cardano e il duello matematico',
        authorOrOrg: 'Fabio Toscano',
        url: 'https://en.wikipedia.org/wiki/Ars_Magna_(Cardano_book)',
        year: '2009',
      },
    ],
  },
  {
    id: 'edo-japan-wasan-sangaku',
    eraId: 'era-5',
    yearLabel: '1603 – 1867 d.C.',
    yearNumeric: 1680,
    title: 'Il Giappone del Periodo Edo: Il Wasan, Seki Takakazu e i Templi Sangaku',
    subtitle: 'Quando samurai, mercanti e contadini dipingevano teoremi sotto i tetti dei templi',
    region: 'Edo (Tokyo), Kyoto e templi del Giappone',
    modernCountry: 'Giappone',
    coordinates: [35.01, 135.76],
    communityType: 'Cultura matematica popolare diffusa & Scuole Terakoya',
    discipline: 'Geometria dei Cerchi Tangenti (Enri), Determinanti & Calcolo Mentale Soroban',
    etymologyAndPracticalOrigin:
      'Durante i due secoli e mezzo di isolamento geopolitico (Sakoku), il Giappone sviluppò una matematica autoctona chiamata Wasan ("matematica giapponese"). Privata di scopi bellici, la matematica divenne un’arte spirituale, estetica e ricreativa praticata da ogni ceto sociale.',
    theoreticalBreakthrough:
      'Seki Takakazu (1642–1708) scopre i determinanti delle matrici e i numeri di Bernoulli indipendentemente e prima di Leibniz/Bernoulli, oltre al principio del cerchio (Enri) affine al calcolo integrale.',
    keyFormulaOrNotation: 'Teorema di Sangaku (6 sfere di Soddy) & Determinanti di Seki per l’eliminazione polinomiale',
    modernApplications: [
      'Algoritmi di impacchettamento sferico (Sphere Packing), codici correttori d’errore e geometria computazionale CAD',
      'Educazione cognitiva visuo-spaziale precoce attraverso l’abaco Soroban',
    ],
    anthropologicalContext:
      'I cittadini dipingevano problemi geometrici di straordinaria complessità (cerchi, ellissi e sfere tangenti inscritti in ventagli) su tavolette di legno di cedro policrome chiamate Sangaku ("tavolette matematiche") e le appendevano nei santuari scintoisti e templi buddisti sia come offerta agli dei sia come sfida pubblica ai pellegrini.',
    knowledgeTransmission:
      'Attraverso la pratica pubblica dell’Idai ("lascito di problemi senza soluzione" alla fine di un libro per sfidare i lettori) e le scuole di tempio Terakoya, dove quasi tutti i bambini giapponesi imparavano il Soroban.',
    caseStudyAnecdote:
      'Una tavoletta Sangaku del 1824 nella prefettura di Gunma contiene un teorema su tre cerchi mutuamente tangenti a una retta: quando in Occidente lo stesso problema fu proposto negli anni ’30 del Novecento, richiese l’intervento di grandi matematici, mentre nell’Edo giapponese era stato firmato da un giovane appassionato locale.',
    historicalLegacy:
      'Esempio unico al mondo di matematica avanzata trasformata in arte sacra e passatempo di massa fuori dalle università.',
    sources: [
      {
        title: 'Sacred Mathematics: Japanese Temple Geometry',
        authorOrOrg: 'Fukagawa Hidetoshi & Tony Rothman (Princeton Univ. Press)',
        url: 'https://en.wikipedia.org/wiki/Sangaku',
        year: '2008',
      },
    ],
  },
  {
    id: 'newton-leibniz-euler-calculus',
    eraId: 'era-6',
    yearLabel: '1687 – 1783 d.C.',
    yearNumeric: 1740,
    title: 'Dal Calcolo Infinitesimale all’Accademia di San Pietroburgo e Basilea',
    subtitle: 'Newton, Leibniz, il Clan dei Bernoulli e Leonhard Euler',
    region: 'Cambridge, Hannover, Basilea e San Pietroburgo',
    modernCountry: 'Regno Unito / Svizzera / Russia',
    coordinates: [59.94, 30.3],
    communityType: 'Accademie Reali delle Scienze & Rete Epistolare Europea',
    discipline: 'Analisi Infinitesimale, Equazioni Differenziali & Teoria dei Grafi',
    etymologyAndPracticalOrigin:
      'Come calcolare la velocità istantanea di un pianeta in orbita ellittica, la forma di una catena sospesa (catenaria), il flusso dell’acqua o se sia possibile attraversare i 7 ponti di Königsberg una sola volta? Il Calcolo (e la Teoria dei Grafi) nascono per tradurre il movimento continuo e le reti fisiche in equazioni risolvibili.',
    theoreticalBreakthrough:
      'Teorema Fondamentale del Calcolo (Newton/Leibniz), Equazioni di Eulero-Lagrange per il calcolo delle variazioni, dinamica dei fluidi (equazioni di Eulero) e nascita della Topologia e Teoria dei Grafi nel 1736 con il problema dei Ponti di Königsberg.',
    keyFormulaOrNotation: '∫_a^b f’(x)dx = f(b) - f(a) · e^{iπ} + 1 = 0 · V - E + F = 2 (Caratteristica di Eulero)',
    modernApplications: [
      'Ingegneria aerospaziale, navigazione orbitale, simulazione fluidodinamica CFD e meteorologia',
      'Teoria dei Grafi: algoritmi di routing internet, PageRank di Google, analisi dei social network e logistica globale',
    ],
    anthropologicalContext:
      'Nel Settecento i sovrani illuminati (Caterina I e Caterina la Grande a San Pietroburgo, Federico il Grande a Berlino) si contendevano i matematici come gioielli della corona. Eulero, pur avendo perso la vista, dettava ai suoi figli e assistenti a San Pietroburgo oltre metà dell’intera produzione scientifica dell’Accademia.',
    knowledgeTransmission:
      'Sfide pubbliche internazionali su riviste come gli Acta Eruditorum (es. il problema della Brachistocrona lanciato da Johann Bernoulli nel 1696 per mettere alla prova "i più acuti matematici dell’orbe terracqueo").',
    caseStudyAnecdote:
      'Quando Johann Bernoulli inviò a Londra il problema della Brachistocrona (la curva di discesa più veloce di un grave), Isaac Newton — allora Direttore della Zecca Reale — tornò a casa stanco alle 4 del pomeriggio, lo risolse prima di andare a dormire inventando il calcolo delle variazioni, e pubblicò la soluzione anonima. Bernoulli, leggendola, esclamò: "Ex ungue leonem!" (Riconosco il leone dall’artiglio!).',
    historicalLegacy:
      'La notazione matematica moderna (f(x), e, i, π, Σ) e l’intero impianto della Fisica Matematica classica.',
    sources: [
      {
        title: 'Leonhard Euler — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Euler/',
      },
      {
        title: 'Seven Bridges of Königsberg',
        authorOrOrg: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg',
      },
    ],
  },
  {
    id: 'gottingen-non-euclidean-palermo',
    eraId: 'era-7',
    yearLabel: '1823 – 1899 d.C.',
    yearNumeric: 1854,
    title: 'Gottinga, le Geometrie Non-Euclidee, Galois e il Circolo di Palermo',
    subtitle: 'Gauss, Bolyai, Lobachevsky, Riemann, Galois e Giovan Battista Guccia',
    region: 'Gottinga (Germania), Transilvania, Kazan, Parigi e Palermo',
    modernCountry: 'Germania / Ungheria / Russia / Francia / Italia',
    coordinates: [51.53, 9.93],
    communityType: 'Seminario Universitario Moderno & Società Matematica Internazionale',
    discipline: 'Geometria Differenziale/Riemanniana, Teoria dei Gruppi & Topologia',
    etymologyAndPracticalOrigin:
      'Dalla geodesia pratica (Gauss fu incaricato di misurare sul campo la curvatura del Regno di Hannover con i triangoli geodetici) nacque l’idea rivoluzionaria che la curvatura di una superficie è una proprietà intrinseca (Theorema Egregium) e che lo spazio fisico stesso può essere curvo.',
    theoreticalBreakthrough:
      'Nel 1823 l’ungherese János Bolyai scrive al padre: "Dal nulla ho creato un nuovo, altro mondo" (geometria iperbolica, insieme a Lobachevsky). Nel 1854 a Gottinga, Bernhard Riemann generalizza la geometria alle varietà a n dimensioni con metrica variabile g_{ij}. Parallelamente, il ventenne Évariste Galois fonda la Teoria dei Gruppi la notte prima di morire in duello (1832).',
    keyFormulaOrNotation: 'ds² = Σ g_{ij}(x) dx^i dx^j · R^ρ_{σμν} (Tensore di curvatura di Riemann) · Gruppi di Galois Gal(E/F)',
    modernApplications: [
      'Relatività Generale di Einstein e correzioni relativistiche indispensabili per far funzionare il GPS sul tuo smartphone',
      'Teoria dei Gruppi e Campi di Galois GF(2⁸): cuore dello standard di cifratura mondiale AES (Advanced Encryption Standard) e dei codici QR (Reed-Solomon)',
      'Manifold Learning e Geometric Deep Learning nell’Intelligenza Artificiale moderna',
    ],
    anthropologicalContext:
      'Nell’Ottocento Gottinga diventa il santuario mondiale della matematica, mentre in Sicilia nel 1884 il giovane nobile palermitano Giovan Battista Guccia fonda con i propri fondi il Circolo Matematico di Palermo: grazie ai suoi "Rendiconti", Palermo diventa prima del 1914 la più grande società matematica internazionale del pianeta, dove pubblicano Poincaré, Hilbert, Noether e Levi-Civita.',
    knowledgeTransmission:
      'Nasce il modello del "Seminario di Ricerca" (Gottinga e Berlino), in cui gli studenti non ascoltano passivamente ma presentano ricerche originali, e le prime grandi riviste internazionali peer-reviewed.',
    caseStudyAnecdote:
      'Per la sua abilitazione a Gottinga nel 1854, il timido ventisettenne Bernhard Riemann propose tre argomenti sperando che Gauss scegliesse i primi due; Gauss scelse invece il terzo, "Sulle ipotesi che stanno alla base della geometria". In quella singola lezione, senza quasi scrivere formule, Riemann demolì lo spazio piatto assoluto preparando il terreno a Einstein.',
    historicalLegacy:
      'Trasformazione della matematica da scienza delle quantità e dello spazio euclideo a scienza delle strutture astratte, delle simmetrie e delle varietà multidimensionali.',
    sources: [
      {
        title: 'Non-Euclidean geometry — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/Non-Euclidean_geometry/',
      },
      {
        title: 'Circolo Matematico di Palermo — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Societies/Palermo/',
      },
    ],
  },
  {
    id: 'hungarian-phenomenon-komal-martians',
    eraId: 'era-8',
    yearLabel: '1894 – 1945 d.C.',
    yearNumeric: 1915,
    title: 'Il Fenomeno Ungherese: Il KöMaL, i Ginnasi di Budapest, Erdős e "I Marziani"',
    subtitle: 'Come una sottocultura giovanile di problem-solving e caffè ha cambiato il XX secolo',
    region: 'Budapest, Ungheria',
    modernCountry: 'Ungheria',
    coordinates: [47.5, 19.04],
    communityType: 'Rivista-competizione studentesca, Ginnasi d’élite (Fasori) & Cultura dei Kávéház',
    discipline: 'Matematica Discreta, Combinatoria, Teoria dei Giochi & Architettura dei Computer',
    etymologyAndPracticalOrigin:
      'Esclusa dalle carriere aristocratiche e militari dell’Impero Austro-Ungarico dopo l’emancipazione del 1867, la borghesia ebraica e intellettuale di Budapest investì tutto sul capitale cognitivo. Nel 1894 nacquero la rivista mensile per liceali KöMaL e la competizione Eötvös: problemi profondi che premiavano l’intuizione creativa anziché la memoria.',
    theoreticalBreakthrough:
      'Nascita della Combinatoria Estremale e Probabilistica (Paul Erdős, Pál Turán), dell’Analisi Funzionale e Teoria degli Operatori della Meccanica Quantistica, della Teoria dei Giochi e dell’Architettura dei Calcolatori moderni (John von Neumann).',
    keyFormulaOrNotation: 'Teorema di Ramsey R(r,s) · Metodo Probabilistico di Erdős: P(A) > 0 ⇒ ∃ grafo · Teorema Minimax di von Neumann',
    modernApplications: [
      'Architettura di von Neumann (CPU + Memoria unificata in ogni computer, smartphone e server del mondo)',
      'Scienza delle reti complesse (modello dei grafi casuali di Erdős-Rényi per epidemiologia, internet e reti neurali)',
      'Teoria dei Giochi applicata alle aste dello spettro 5G, economia strategica e Reinforcement Learning nell’IA',
    ],
    anthropologicalContext:
      'Al Fasori Evangélikus Gimnázium, professori-mentori leggendari come László Rátz scovavano talenti come il giovane John von Neumann ed Eugene Wigner. Nel frattempo, il gruppo "Anonymous" (Erdős, Turán, Gallai, Esther Klein) si riuniva nei caffè di Budapest e ai piedi della statua di Anonimo nel parco cittadino per risolvere problemi di combinatoria.',
    knowledgeTransmission:
      'La gamification ante-litteram del KöMaL (vedere la propria foto pubblicata a fine anno nella classifica nazionale dei risolutori) e, più tardi, il "Metodo Pósa" della scoperta guidata tramite fili di problemi paralleli.',
    caseStudyAnecdote:
      'A Los Alamos e Princeton negli anni ’40, la concentrazione di scienziati nati nel raggio di pochi isolati a Budapest (von Neumann, Szilard, Wigner, Teller, Kármán, Erdős, Pólya) era tale che quando si chiese perché ci fossero così tanti geni ungheresi, Szilard rispose: "I Marziani sono già tra noi, si fanno semplicemente chiamare ungheresi". Erdős portò poi questa cultura in tutto il mondo viaggiando per 60 anni con una sola valigia ("Un altro tetto, un’altra dimostrazione").',
    historicalLegacy:
      'Fondazione dell’informatica moderna, della combinatoria discreta e del modello globale delle Olimpiadi della Matematica.',
    sources: [
      {
        title: 'Hungarian mathematics',
        authorOrOrg: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Hungarian_mathematics',
      },
      {
        title: 'Paul Erdős — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Erdos/',
      },
    ],
  },
  {
    id: 'scottish-cafe-bourbaki-gottingen',
    eraId: 'era-8',
    yearLabel: '1920 – 1939 d.C.',
    yearNumeric: 1935,
    title: 'Il Caffè Scozzese di Leopoli, Emmy Noether a Gottinga e Nicolas Bourbaki',
    subtitle: 'Dai tavoli di marmo di Banach alla rifondazione strutturalista della matematica',
    region: 'Lwów (Leopoli), Gottinga e Parigi',
    modernCountry: 'Ucraina / Polonia / Germania / Francia',
    coordinates: [49.84, 24.03],
    communityType: 'Caffè letterario-matematico & Collettivo accademico segreto',
    discipline: 'Analisi Funzionale, Algebra Astratta & Strutturalismo Assiomatico',
    etymologyAndPracticalOrigin:
      'Nel primo Novecento i matematici capirono che equazioni differenziali, segnali acustici e stati quantistici potevano essere trattati come semplici "punti" (vettori) dentro spazi a infinite dimensioni: nacque così l’Analisi Funzionale.',
    theoreticalBreakthrough:
      'Stefan Banach, Stanislaw Ulam e Hugo Steinhaus a Leopoli fondano la teoria degli Spazi di Banach (spazi vettoriali normati completi). A Gottinga, Emmy Noether rivoluziona l’algebra astratta (anelli noetheriani) e dimostra il Teorema di Noether (ogni simmetria continua genera una legge di conservazione fisica). A Parigi (1935), Weil, Cartan e Dieudonné fondano il collettivo Nicolas Bourbaki.',
    keyFormulaOrNotation: 'Spazio di Banach (X, ‖·‖) completo · Teorema di Hahn-Banach · Teorema di Noether: δL = 0 ⇒ ∂_μ J^μ = 0',
    modernApplications: [
      'Kernel Methods, Support Vector Machines (SVM) e regolarizzazione in Spazi di Hilbert/Banach nel Machine Learning',
      'Compressione di immagini e audio (Wavelets, JPEG2000) e tomografia computerizzata (TAC)',
      'Fisica delle particelle (Modello Standard basato sui gruppi di simmetria di Noether)',
    ],
    anthropologicalContext:
      'Al Caffè Scozzese (Kawiarnia Szkocka) di Lwów, Banach, Mazur e Ulam passavano fino a 17 ore di fila bevendo cognac e caffè, scrivendo teoremi a matita direttamente sui tavoli di marmo. Per evitare che i camerieri cancellassero le formule la sera, la moglie di Banach, Łucja, comprò un grosso quaderno custodito dal capocameriere: il leggendario "Libro Scozzese".',
    knowledgeTransmission:
      'Nel Libro Scozzese chiunque poteva annotare un problema aperto offrendo un premio per la soluzione (da una birra a una fonduta a Ginevra, fino a un’oca viva!). In Francia, invece, i membri di Bourbaki si ritiravano in campagna leggendo ad alta voce le bozze e urlando finché ogni riga non raggiungeva la perfezione assiomatica.',
    caseStudyAnecdote:
      'Il Problema 153 del Libro Scozzese (sull’esistenza di una base di Schauder in ogni spazio di Banach separabile), posto da Stanisław Mazur il 6 novembre 1936 con in palio un’oca viva, fu risolto solo 36 anni dopo, nel 1972, dal giovane matematico svedese Per Enflo: Mazur in persona gli consegnò davvero un’oca bianca viva durante una cerimonia trasmessa dalla TV polacca!',
    historicalLegacy:
      'L’intero edificio dell’analisi funzionale moderna e il linguaggio insiemistico-strutturale (iniettivo, suriettivo, biiettivo, insieme vuoto ∅) coniato da Bourbaki.',
    sources: [
      {
        title: 'Stefan Banach — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Banach/',
      },
      {
        title: 'Scottish Book',
        authorOrOrg: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Scottish_Book',
      },
    ],
  },
  {
    id: 'bletchley-tmrc-soviet-math-circles',
    eraId: 'era-9',
    yearLabel: '1939 – 1985 d.C.',
    yearNumeric: 1955,
    title: 'Bletchley Park, i Math Circles Sovietici (Kvant) e il Tech Model Railroad Club del MIT',
    subtitle: 'Criptoanalisi bellica, resistenza intellettuale sovietica e nascita della cultura Hacker',
    region: 'Bletchley Park (UK), Mosca/Leningrado (URSS), Cambridge MA & Santa Monica (USA)',
    modernCountry: 'Regno Unito / Russia / Stati Uniti',
    coordinates: [51.99, -0.74],
    communityType: 'Centro crittografico segreto, Circoli giovanili popolari & Club universitario hacker',
    discipline: 'Informatica Teorica, Crittografia, Probabilità Assiomatica & Cibernetica',
    etymologyAndPracticalOrigin:
      'Tre emergenze storiche generarono tre ecosistemi leggendari: 1) Decifrare il codice nazista Enigma a Bletchley Park (Turing inventa la Bomba elettromeccanica e la statistica bayesiana sequenziale "Banburismus"); 2) Coltivare il talento matematico giovanile in URSS con i Math Circles di Kolmogorov, Gelfand e Arnold; 3) Ottimizzare gli scambi dei trenini elettrici con relè telefonici al MIT (TMRC), dove nacque la parola "Hack".',
    theoreticalBreakthrough:
      'Macchina Universale di Turing (1936) e test di Turing; Assiomi della Probabilità e Complessità di Kolmogorov; Teoria Matematica della Comunicazione di Claude Shannon (1948, che definisce il "bit" e l’entropia dell’informazione); Equilibrio di Nash alla RAND Corporation (1950).',
    keyFormulaOrNotation: 'Entropia di Shannon: H(X) = -Σ p(x) log₂ p(x) · Regola di Bayes a Bletchley: P(H|E) = P(E|H)P(H)/P(E)',
    modernApplications: [
      'Ogni sistema operativo, compilatore, rete di telecomunicazioni e compressione dati (ZIP, PNG, streaming video)',
      'Intelligenza Artificiale: la funzione di perdita Cross-Entropy con cui vengono addestrati tutti i modelli linguistici (LLM) deriva direttamente dalla formula di Shannon e Kolmogorov',
      'Cultura Open-Source (Linux, Git, GitHub) nata direttamente dal laboratorio AI del MIT e dal TMRC',
    ],
    anthropologicalContext:
      'In Unione Sovietica i più grandi matematici del mondo (Kolmogorov, Arnold, Gelfand) dedicavano i loro pomeriggi a insegnare ai ragazzi di 12-16 anni nei Circoli Matematici (Matematicheskie Kruzhki) e scrivevano sulla rivista mensile Kvant (stampata in oltre 200.000 copie). Contemporaneamente, negli USA, Martin Gardner su Scientific American univa matematici, prestigiatori (Persi Diaconis) e artisti (M.C. Escher).',
    knowledgeTransmission:
      'Apprendimento tra pari (peer-learning): nei Math Circles sovietici non si davano voti ma si discuteva alla lavagna per ore su un problema; al TMRC del MIT chiunque poteva entrare di notte a programmare il PDP-1 seguendo l’Etica Hacker ("L’accesso ai computer e alla conoscenza deve essere illimitato").',
    caseStudyAnecdote:
      'Per reclutare in segreto i criptoanalisti di Bletchley Park nel 1942, il governo britannico organizzò una gara sul Daily Telegraph chiedendo di risolvere il cruciverba criptico del quotidiano in meno di 12 minuti: chi ci riusciva riceveva una lettera riservata dall’intelligence e veniva mandato nella Capanna 8 con Alan Turing e Joan Clarke.',
    historicalLegacy:
      'Nascita della Computer Science, della Cybersecurity, della cultura Open-Source e della divulgazione matematica moderna (Gathering 4 Gardner).',
    sources: [
      {
        title: 'Alan Turing — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Turing/',
      },
      {
        title: 'Andrey Kolmogorov — MacTutor',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Kolmogorov/',
      },
    ],
  },
  {
    id: 'digital-era-ai-quantum-frontiers',
    eraId: 'era-10',
    yearLabel: '1990 – Oggi & Frontiere 2030+',
    yearNumeric: 2026,
    title: 'Crittografia Sovrana (e-Estonia), Deep Learning, Polymath e le Frontiere del Calcolo',
    subtitle: 'Dalle Curve Ellittiche e zk-SNARKs ai Transformer, Lean 4 e il Calcolo Quantistico',
    region: 'Globale / Tartu (Estonia) / Zurigo / Princeton / Napoli (Campania)',
    modernCountry: 'Rete Globale Decentralizzata',
    coordinates: [58.38, 26.72],
    communityType: 'Mente alveare digitale (Polymath, MathOverflow), Hub Crittografici & Academy di Peer-Learning',
    discipline: 'Machine Learning Geometrico, Crittografia Post-Quantistica (ZKP) & Verifica Formale',
    etymologyAndPracticalOrigin:
      'Ciò che era nato nell’antichità per misurare campi (geometria) e contare sacchi di grano (matrici) governa oggi il mondo digitale: l’Algebra Astratta e la Geometria Aritmetica (curve ellittiche su campi finiti) proteggono ogni transazione bancaria e le identità digitali (come la blockchain KSI e le prove a conoscenza zero zk-SNARKs sviluppate dalla Scuola di Tartu in Estonia); il Calcolo Multivariabile, l’Algebra Lineare Tensoriale e la Probabilità di Bayes costituiscono il motore predittivo del Machine Learning moderno e dei modelli generativi.',
    theoreticalBreakthrough:
      'Dimostrazione dell’Ultimo Teorema di Fermat (Andrew Wiles, 1994) e della Congettura di Poincaré (Grigori Perelman su arXiv, 2002); Architettura Transformer basata sul prodotto scalare matriciale Attention(Q,K,V); Prove a Conoscenza Zero (zk-SNARKs) e Crittografia basata sui Reticoli (Lattice-Based Post-Quantum Cryptography); Verifica formale dei teoremi assistita da IA (Lean 4, Liquid Tensor Experiment di Peter Scholze, AlphaGeometry).',
    keyFormulaOrNotation: 'Attention(Q,K,V) = softmax(QK^T / √d_k)V · Curva Ellittica: y² = x³ + ax + b (mod p) · LWE (Learning With Errors)',
    modernApplications: [
      'Modellazione Predittiva e Intelligenza Artificiale: LLM, AlphaFold (ripiegamento proteico), previsioni climatiche ad alta risoluzione e guida autonoma (Filtri di Kalman EKF e controllo GNC)',
      'Sovranità Digitale e Privacy: infrastruttura X-Road, firme keyless KSI e protocolli Zero-Knowledge (dimostrare la verità di un dato senza rivelare il dato stesso)',
      'Future Frontiere del Calcolo: Computer Quantistici topologici, processori fotonici/neuromorfici e co-piloti matematici (Lean 4 + AI) per scoprire nuove dimostrazioni',
    ],
    anthropologicalContext:
      'Oggi la comunità matematica vive una doppia esistenza: da un lato la "mente alveare" globale online (MathOverflow, arXiv, AoPS, il Progetto Polymath di Timothy Gowers e Terence Tao su GitHub/Zulip); dall’altro il ritorno a hub fisici territoriali di peer-learning e fabbricazione digitale (dall’Istituto di Informatica di Tartu in Estonia fino all’Apple Developer Academy di San Giovanni a Teduccio a Napoli, alla Scuola Superiore Meridionale e ai FabLab campani).',
    knowledgeTransmission:
      'Open-access radicale (arXiv, librerie matematiche digitalizzate come Mathlib in Lean 4 con oltre 1.5 milioni di righe di matematica formalizzata collaborativamente da studenti e medaglie Fields).',
    caseStudyAnecdote:
      'Nel 2020 il vincitore della Medaglia Fields Peter Scholze sfidò la comunità mondiale a verificare al computer con l’assistente di prova Lean il suo teorema più complesso e astratto di Geometria Aritmetica Condensata ("Liquid Tensor Experiment"), di cui lui stesso voleva certezza assoluta. Nel giro di 18 mesi, una comunità aperta online di studenti e ricercatori ha completato la verifica formale al 100%, inaugurando una nuova era nella storia millenaria della dimostrazione.',
    historicalLegacy:
      'La convergenza definitiva tra Matematica Pura, Codice Informatico e Intelligenza Artificiale: il cerchio aperto 22.000 anni fa sull’Osso di Ishango entra nell’era del calcolo quantistico e della scoperta collaborativa uomo-macchina.',
    sources: [
      {
        title: 'Timeline of mathematics',
        authorOrOrg: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Timeline_of_mathematics',
      },
      {
        title: 'History of mathematics',
        authorOrOrg: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/History_of_mathematics',
      },
      {
        title: 'MacTutor History of Mathematics Archive',
        authorOrOrg: 'University of St Andrews',
        url: 'https://mathshistory.st-andrews.ac.uk/HistTopics/History_overview/',
      },
    ],
  },
];
