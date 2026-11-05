export type GeoScale = 'mondo' | 'europa' | 'italia' | 'campania';

export type CommunityArchetype =
  | 'gardner-kvant' // Matematica ricreativa, divulgazione, enigmistica d'élite
  | 'math-circles-komal' // Problem solving, Olimpiadi, addestramento del talento
  | 'tmrc-hacker-maker' // Cultura Hacker, Open Source, FabLab, peer-learning
  | 'bletchley-rand-crypto' // Crittografia, Cybersecurity, Think Tank strategici
  | 'accademia-storica' // Grandi Scuole storiche, Caffè matematici e Istituti d'élite
  | 'etnomatematica'; // Tradizioni matematiche indigene e antropologiche

export interface MathCommunityPin {
  id: string;
  name: string;
  cityOrArea: string;
  country: string;
  scale: GeoScale;
  archetype: CommunityArchetype;
  archetypeLabel: string;
  period: string;
  isActiveToday: boolean;
  mode: 'Fisico' | 'Online' | 'Fisico + Online';
  coordinates: [number, number]; // [lat, lng]
  shortDescription: string;
  culturalPractice: string;
  keyFiguresOrProjects: string[];
  externalUrl: string;
}

export const ARCHETYPE_INFO: Record<
  CommunityArchetype,
  { label: string; subtitle: string; colorHex: string }
> = {
  'accademia-storica': {
    label: 'Genius Clusters & Scuole Storiche',
    subtitle: 'Caffè matematici, templi-scuola e istituti di ricerca d’élite',
    colorHex: '#1E3A8A', // Deep Lapis
  },
  'math-circles-komal': {
    label: 'Math Circles, KöMaL & Olimpiadi',
    subtitle: 'Problem-solving cooperativo, scoperta guidata e gare',
    colorHex: '#9A3412', // Terracotta
  },
  'gardner-kvant': {
    label: 'Eredi di Martin Gardner & Kvant',
    subtitle: 'Matematica ricreativa, paradossi, editoria e festival',
    colorHex: '#78350F', // Bronze
  },
  'tmrc-hacker-maker': {
    label: 'Eredi del MIT TMRC, Open Source & FabLab',
    subtitle: 'Peer-learning, hardware libero, Linux e fabbricazione digitale',
    colorHex: '#14532D', // Forest Ink
  },
  'bletchley-rand-crypto': {
    label: 'Eredi di Bletchley Park, RAND & Crittografia',
    subtitle: 'Criptoanalisi, prove a conoscenza zero, CTF e sicurezza',
    colorHex: '#312E81', // Indigo Ink
  },
  etnomatematica: {
    label: 'Etnomatematica & Tradizioni Indigene',
    subtitle: 'Frattali africani, Quipu andini, algebra della parentela e Sangaku',
    colorHex: '#701A75', // Tyrian Purple
  },
};

export const MATH_COMMUNITIES_PINS: MathCommunityPin[] = [
  // ==================== CAMPANIA (FOCUS LOCALE) ====================
  {
    id: 'napoli-apple-academy',
    name: 'Apple Developer Academy (Polo Federico II)',
    cityOrArea: 'San Giovanni a Teduccio, Napoli',
    country: 'Italia (Campania)',
    scale: 'campania',
    archetype: 'tmrc-hacker-maker',
    archetypeLabel: 'Erede moderno del Tech Model Railroad Club',
    period: '2016 – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [40.8369, 14.3066],
    shortDescription:
      'Hub internazionale dell’Università Federico II dove centinaia di studenti da tutto il mondo programmano, progettano architetture software e condividono competenze in un ambiente destrutturato basato sul Challenge-Based Learning e peer-learning.',
    culturalPractice:
      'Apprendimento orizzontale tra pari in spazi aperti senza lezioni frontali tradizionali, unendo design, algoritmi e prototipazione.',
    keyFiguresOrProjects: ['Università degli Studi di Napoli Federico II', 'Challenge-Based Learning', 'Comunità internazionale iOS/AI'],
    externalUrl: 'https://www.developeracademy.unina.it/',
  },
  {
    id: 'napoli-ssm-federico-ii',
    name: 'Scuola Superiore Meridionale (SSM) & Dip. Matematica Renato Caccioppoli',
    cityOrArea: 'Napoli (Centro Storico / Monte Sant’Angelo)',
    country: 'Italia (Campania)',
    scale: 'campania',
    archetype: 'accademia-storica',
    archetypeLabel: 'Polo d’eccellenza in Analisi, PDE e Fisica Matematica',
    period: '1224 / 1930 (Caccioppoli) / 2019 (SSM) – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [40.839, 14.252],
    shortDescription:
      'Custode della leggendaria scuola napoletana di Analisi Matematica di Renato Caccioppoli e Carlo Miranda. La SSM offre oggi percorsi d’élite su Teoria Geometrica della Misura, Sistemi Dinamici, Caos e Fisica Matematica.',
    culturalPractice:
      'Rigore dimostrativo classico unito all’intuizione geometrica dei sistemi dinamici e delle equazioni alle derivate parziali (PDE).',
    keyFiguresOrProjects: ['Renato Caccioppoli', 'Carlo Miranda', 'Scuola Superiore Meridionale (SSM)'],
    externalUrl: 'https://www.ssmeridionale.it/',
  },
  {
    id: 'campania-polo-olimpico',
    name: 'Polo Olimpico Campano: San Giorgio a Cremano, Nunziatella & UNISA',
    cityOrArea: 'San Giorgio a Cremano / Napoli / Salerno',
    country: 'Italia (Campania)',
    scale: 'campania',
    archetype: 'math-circles-komal',
    archetypeLabel: 'Vivaio di problem-solving e Olimpiadi della Matematica',
    period: 'Tradizione storica – Picco nazionale 2026',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [40.832, 14.335],
    shortDescription:
      'Rete di allenamento matematico avanzato tra licei d’eccellenza (San Giorgio a Cremano sul podio nazionale delle Olimpiadi della Matematica, Scuola Militare Nunziatella) e docenti preparatori della Federico II e dell’Università di Salerno.',
    culturalPractice:
      'Sessioni pomeridiane extra-scolastiche su combinatoria, teoria dei numeri e geometria sintetica nello spirito dei Math Circles.',
    keyFiguresOrProjects: ['Nuclei Olimpici UMI Campania', 'Scuola Militare Nunziatella', 'Dip. Matematica UNISA'],
    externalUrl: 'https://olimpiadi.dm.unibo.it/',
  },
  {
    id: 'campania-mathesis',
    name: 'Mathesis — Sezioni di Napoli e Castellammare di Stabia',
    cityOrArea: 'Napoli / Castellammare di Stabia',
    country: 'Italia (Campania)',
    scale: 'campania',
    archetype: 'gardner-kvant',
    archetypeLabel: 'Circolo didattico, storico e divulgativo',
    period: '1895 – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [40.702, 14.485],
    shortDescription:
      'Le storiche sezioni campane della Società Italiana di Scienze Matematiche e Fisiche mantengono vivi i circoli scientifici organizzando gare matematiche, conferenze pubbliche e seminari sulla bellezza dell’algebra e della geometria.',
    culturalPractice:
      'Dialogo diretto tra docenti universitari, insegnanti di liceo e studenti appassionati sul territorio.',
    keyFiguresOrProjects: ['Mathesis Nazionale e Sezioni Campane', 'Premio Caccioppoli / Gare locali'],
    externalUrl: 'https://www.mathesisnazionale.it/',
  },
  {
    id: 'caserta-kromlaboro',
    name: 'KromLabòro Caserta FabLab & Fab Caffè',
    cityOrArea: 'Caserta',
    country: 'Italia (Campania)',
    scale: 'campania',
    archetype: 'tmrc-hacker-maker',
    archetypeLabel: 'Fabbricazione digitale, robotica e open-hardware',
    period: '2014 – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [41.073, 14.332],
    shortDescription:
      'Spazio di co-working e laboratorio di fabbricazione digitale condivisa che unisce ingegneri, programmatori, designer e musicisti attorno a circuiti elettronici, robotica e microcontrollori open-source.',
    culturalPractice:
      'Prototipazione collaborativa nel Fab Caffè, dove teoria algoritmica e saldatore su stagno si incontrano.',
    keyFiguresOrProjects: ['Rete FabLab Campania', 'Automazione open-source'],
    externalUrl: 'https://www.fablabs.io/',
  },
  {
    id: 'cava-medaarch-fablab',
    name: 'Mediterranean FabLab & Medaarch',
    cityOrArea: 'Cava de’ Tirreni (Salerno)',
    country: 'Italia (Campania)',
    scale: 'campania',
    archetype: 'tmrc-hacker-maker',
    archetypeLabel: 'Primo nodo della MIT Fab Foundation nel Mezzogiorno',
    period: '2012 – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [40.701, 14.706],
    shortDescription:
      'Uno dei primi centri di fabbricazione digitale e architettura parametrica del Sud Italia, interconnesso alla rete globale della Fab Foundation del MIT.',
    culturalPractice:
      'Geometria computazionale, design parametrico, stampa 3D e formazione STEAM per giovani e artigiani digitali.',
    keyFiguresOrProjects: ['Medaarch', 'MIT Fab Foundation Network'],
    externalUrl: 'https://www.medaarch.com/',
  },
  {
    id: 'napoli-progetto-hope-nalug',
    name: 'Progetto HoPE (Liceo Galilei) & NaLUG (Napoli Linux Users Group)',
    cityOrArea: 'Napoli',
    country: 'Italia (Campania)',
    scale: 'campania',
    archetype: 'tmrc-hacker-maker',
    archetypeLabel: 'Hackerspace scolastico MIT-Edgerton & Software Libero',
    period: 'Anni ’90 (NaLUG) / 2018 (HoPE) – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [40.848, 14.228],
    shortDescription:
      'In collaborazione con il MIT-Edgerton Center, il progetto HoPE trasforma le scuole (come il Liceo Scientifico Galileo Galilei di Napoli) in hackerspace studenteschi basati sul motto "Build it, Learn it, Share it", affiancato dalla storica community NaLUG e dai team CTF universitari.',
    culturalPractice:
      'Mentoring tra studenti più grandi e più piccoli, kernel Linux, elettronica sperimentale e Caffè Scientifici a Città della Scienza.',
    keyFiguresOrProjects: ['Progetto HoPE (Hands-On Physics Experience)', 'NaLUG', 'Futuro Remoto / Città della Scienza'],
    externalUrl: 'https://www.cittadellascienza.it/',
  },

  // ==================== ITALIA (NAZIONALE & STORICA) ====================
  {
    id: 'pisa-sns-umi-gobbino',
    name: 'Scuola Normale Superiore di Pisa, Olimpiadi UMI & Precorso Gobbino',
    cityOrArea: 'Pisa / Bologna',
    country: 'Italia',
    scale: 'italia',
    archetype: 'math-circles-komal',
    archetypeLabel: 'Capitale italiana della ricerca pura e delle Olimpiadi',
    period: '1810 – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [43.719, 10.4],
    shortDescription:
      'L’ecosistema di Ennio De Giorgi, Vito Volterra e delle Medaglie Fields Enrico Bombieri e Alessio Figalli. Coordina con l’UMI gli stage olimpici (Winter/Senior Camp) per i migliori talenti liceali italiani e ospita l’archivio didattico online di Massimo Gobbino.',
    culturalPractice:
      'Vita collegiale totalizzante a Palazzo della Carovana e allenamento cooperativo sui problemi di Cesenatico.',
    keyFiguresOrProjects: ['Ennio De Giorgi', 'Enrico Bombieri', 'Alessio Figalli', 'Massimo Gobbino', 'Unione Matematica Italiana (UMI)'],
    externalUrl: 'https://www.sns.it/',
  },
  {
    id: 'italia-maddmaths-rudi-base5',
    name: 'MaddMaths!, Rudi Mathematici, BASE Cinque & Matematicamente.it',
    cityOrArea: 'Rete Nazionale Italiana',
    country: 'Italia',
    scale: 'italia',
    archetype: 'gardner-kvant',
    archetypeLabel: 'Comunità online di matematica ricreativa e divulgazione',
    period: '1999 – Oggi',
    isActiveToday: true,
    mode: 'Online',
    coordinates: [41.902, 12.496],
    shortDescription:
      'La spina dorsale digitale della cultura matematica italiana: i rompicapi narrativi mensili di Rudi Mathematici (eredi diretti di Martin Gardner), l’archivio storico di giochi matematici BASE Cinque di Gianfranco Bo, il Carnevale della Matematica e il forum collaborativo Matematicamente.it.',
    culturalPractice:
      'Risoluzione collettiva di enigmi mensili su e-zine, blogging scientifico condiviso e supporto gratuito agli studenti universitari.',
    keyFiguresOrProjects: ['Roberto Natalini (MaddMaths!)', 'Rudi Mathematici', 'Gianfranco Bo (BASE Cinque)', 'Matematicamente.it'],
    externalUrl: 'https://maddmaths.simai.eu/',
  },
  {
    id: 'bologna-venezia-cossisti',
    name: 'Le Città dei Duelli Rinascimentali e le Scuole d’Abaco',
    cityOrArea: 'Bologna, Venezia, Milano e Firenze',
    country: 'Italia',
    scale: 'italia',
    archetype: 'accademia-storica',
    archetypeLabel: 'Culla dell’Algebra simbolica e dei Numeri Complessi',
    period: '1202 (Fibonacci) – 1572 (Bombelli)',
    isActiveToday: false,
    mode: 'Fisico',
    coordinates: [44.494, 11.342],
    shortDescription:
      'Tra le botteghe mercantili toscane e i portici dell’Università di Bologna, i matematici italiani si sfidavano in pubbliche disfide sulle equazioni cubiche e quartiche, dando i natali ai numeri immaginari.',
    culturalPractice:
      'Cartelli di sfida affissi sulle porte delle chiese, scommesse davanti ai notai e cifratura poetica delle formule risolutive.',
    keyFiguresOrProjects: ['Leonardo Fibonacci', 'Scipione dal Ferro', 'Niccolò Tartaglia', 'Gerolamo Cardano', 'Raffaele Bombelli'],
    externalUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Cardan/',
  },
  {
    id: 'palermo-circolo-matematico',
    name: 'Circolo Matematico di Palermo',
    cityOrArea: 'Palermo',
    country: 'Italia',
    scale: 'italia',
    archetype: 'accademia-storica',
    archetypeLabel: 'Prima grande rete matematica internazionale pre-1914',
    period: '1884 – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [38.115, 13.361],
    shortDescription:
      'Fondato da Giovan Battista Guccia nel 1884, divenne all’inizio del ’900 la più importante società matematica internazionale del mondo grazie ai suoi celebri "Rendiconti", su cui pubblicarono Poincaré, Hilbert, Noether e Weyl.',
    culturalPractice:
      'Internazionalismo scientifico puro: apertura totale ai matematici di ogni nazione e circolazione rapidissima dei preprint.',
    keyFiguresOrProjects: ['Giovan Battista Guccia', 'Henri Poincaré', 'Rendiconti del Circolo Matematico di Palermo'],
    externalUrl: 'https://mathshistory.st-andrews.ac.uk/Societies/Palermo/',
  },
  {
    id: 'ivrea-arduino-cyberchallenge',
    name: 'Comunità Arduino (Ivrea), Metro Olografix & CyberChallenge.IT',
    cityOrArea: 'Ivrea / Pescara / Rete Universitaria CINI',
    country: 'Italia',
    scale: 'italia',
    archetype: 'bletchley-rand-crypto',
    archetypeLabel: 'Open Hardware e vivaio nazionale di Cybersecurity',
    period: '1994 (Metro Olografix) / 2005 (Arduino) / 2017 (CyberChallenge) – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [45.466, 7.876],
    shortDescription:
      'Dalla nascita di Arduino a Ivrea (che ha democratizzato l’hardware libero nel mondo) a CyberChallenge.IT, il programma nazionale CINI che addestra ogni anno i migliori talenti italiani tra i 16 e i 24 anni nella crittografia e sicurezza informatica.',
    culturalPractice:
      'Gare Capture The Flag (CTF) di decrittazione e condivisione totale degli schemi circuitali e del codice.',
    keyFiguresOrProjects: ['Massimo Banzi / Arduino', 'Metro Olografix', 'CyberChallenge.IT / Squadra Nazionale Italiana'],
    externalUrl: 'https://cyberchallenge.it/',
  },

  // ==================== EUROPA ====================
  {
    id: 'budapest-komal-bsm',
    name: 'Budapest: Il Fenomeno Ungherese, KöMaL, Fasori Gimnázium & Rényi Institute',
    cityOrArea: 'Budapest',
    country: 'Ungheria',
    scale: 'europa',
    archetype: 'math-circles-komal',
    archetypeLabel: 'Archetipo mondiale della scoperta guidata e della combinatoria',
    period: '1894 – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [47.497, 19.04],
    shortDescription:
      'La patria del giornale studentesco KöMaL (1894), del Metodo Pósa per "fili di problemi", di Paul Erdős e dei "Marziani" (von Neumann, Wigner, Szilard, Pólya). Oggi ospita i Budapest Semesters in Mathematics (BSM) e l’Istituto Alfréd Rényi.',
    culturalPractice:
      'Matematica fatta nei caffè (Kávéház) e nei parchi, problemi mensili per corrispondenza e collaborazione nomade.',
    keyFiguresOrProjects: ['Paul Erdős', 'John von Neumann', 'László Lovász', 'Lajos Pósa', 'Rivista KöMaL'],
    externalUrl: 'https://www.komal.hu/info/bemutatkozas.e.shtml',
  },
  {
    id: 'lwow-warsaw-polish-school',
    name: 'Scuola Polacca: Caffè Scozzese di Leopoli (Lwów) e Università di Varsavia',
    cityOrArea: 'Leopoli (Ucraina) & Varsavia (Polonia)',
    country: 'Ucraina / Polonia',
    scale: 'europa',
    archetype: 'accademia-storica',
    archetypeLabel: 'Culla dell’Analisi Funzionale, Topologia e Logica',
    period: '1918 – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [49.839, 24.029],
    shortDescription:
      'Tra le due guerre, Stefan Banach, Stanislaw Ulam e Hugo Steinhaus crearono l’Analisi Funzionale sui tavoli di marmo del Caffè Scozzese di Leopoli, mentre a Varsavia Sierpiński, Kuratowski e Tarski rifondavano la Topologia e la Logica.',
    culturalPractice:
      'Scrittura di problemi aperti sul "Libro Scozzese" custodito dal cameriere con premi stravaganti (una bottiglia di cognac o un’oca viva).',
    keyFiguresOrProjects: ['Stefan Banach', 'Stanisław Ulam', 'Wacław Sierpiński', 'Alfred Tarski', 'Studia Mathematica & Fundamenta Mathematicae'],
    externalUrl: 'https://en.wikipedia.org/wiki/Polish_School_of_Mathematics',
  },
  {
    id: 'moscow-mechmat-math-circles',
    name: 'Mosca: MechMat (MGU), Math Circles Sovietici, Rivista Kvant e IUM',
    cityOrArea: 'Mosca e San Pietroburgo',
    country: 'Russia',
    scale: 'europa',
    archetype: 'math-circles-komal',
    archetypeLabel: 'Monolite analitico-fisico e circoli matematici giovanili',
    period: '1930 – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [55.703, 37.53],
    shortDescription:
      'La tradizione inaugurata da Kolmogorov, Gelfand, Arnold e Landau: all’università il rigore tecnico brutale del Demidovich e di Zorich; per i ragazzi delle medie i Circoli Matematici gratuiti e la leggendaria rivista Kvant.',
    culturalPractice:
      'Risoluzione cooperativa alla lavagna dove grandi accademici discutono da pari a pari con adolescenti talentuosi.',
    keyFiguresOrProjects: ['Andrey Kolmogorov', 'Vladimir Arnold', 'Israel Gelfand', 'Independent University of Moscow (IUM)'],
    externalUrl: 'https://old.mccme.ru/ium/',
  },
  {
    id: 'paris-ens-bourbaki-animath',
    name: 'Parigi: École Normale Supérieure (Rue d’Ulm), Nicolas Bourbaki & Animath',
    cityOrArea: 'Parigi',
    country: 'Francia',
    scale: 'europa',
    archetype: 'accademia-storica',
    archetypeLabel: 'Capitale dello strutturalismo assiomatico (record di Medaglie Fields)',
    period: '1794 / 1935 (Bourbaki) – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [48.842, 2.345],
    shortDescription:
      'L’istituzione con la più alta densità al mondo di Medaglie Fields per metro quadro. Negli anni ’30 vi nacque il collettivo segreto Nicolas Bourbaki (Weil, Cartan, Dieudonné, Grothendieck), mentre oggi l’associazione Animath diffonde i club matematici nei licei francesi.',
    culturalPractice:
      'Studio su "polycopiés" d’autore anziché manuali standard, culto della chiarezza strutturale e ritiri collettivi di revisione.',
    keyFiguresOrProjects: ['Nicolas Bourbaki', 'Alexander Grothendieck', 'Jean-Pierre Serre', 'Cédric Villani', 'Animath'],
    externalUrl: 'https://www.math.ens.psl.eu/',
  },
  {
    id: 'gottingen-bonn-germany',
    name: 'Gottinga & Hausdorff Center for Mathematics (Bonn)',
    cityOrArea: 'Gottinga / Bonn',
    country: 'Germania',
    scale: 'europa',
    archetype: 'accademia-storica',
    archetypeLabel: 'Da Gauss, Riemann e Hilbert alla Geometria Aritmetica di Scholze',
    period: '1737 – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [50.737, 7.098],
    shortDescription:
      'Gottinga fu fino al 1933 il centro dell’universo matematico e quantistico (Gauss, Riemann, Hilbert, Emmy Noether). Oggi il testimone tedesco è guidato dal centro Hausdorff dell’Università di Bonn con Peter Scholze e la Geometria Aritmetica.',
    culturalPractice:
      'Passeggiate matematiche nei boschi, integrazione profonda tra teoria dei numeri, topologia e fisica teorica.',
    keyFiguresOrProjects: ['Carl Friedrich Gauss', 'Bernhard Riemann', 'David Hilbert', 'Emmy Noether', 'Peter Scholze'],
    externalUrl: 'https://www.hcm.uni-bonn.de/',
  },
  {
    id: 'cambridge-bletchley-mathsjam',
    name: 'Cambridge (Mathematical Tripos), Bletchley Park & MathsJam UK',
    cityOrArea: 'Cambridge / Bletchley Park / Londra',
    country: 'Regno Unito',
    scale: 'europa',
    archetype: 'bletchley-rand-crypto',
    archetypeLabel: 'Velocità newtoniana, criptoanalisi di Enigma e matematica nei pub',
    period: '1669 (Newton) / 1939 (Bletchley) / 2008 (MathsJam) – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [52.205, 0.113],
    shortDescription:
      'Dal leggendario "Part III" del Mathematical Tripos di Cambridge (dove matematica e fisica teorica si fondono) alle baracche di Bletchley Park di Alan Turing, fino alla rete europea MathsJam dove ogni mese ci si incontra nei pub per fare giochi matematici.',
    culturalPractice:
      'Sfide ad altissima velocità analitica ("Wranglers"), decifrazione cooperativa e raduni informali nei pub (MathsJam).',
    keyFiguresOrProjects: ['Isaac Newton', 'Alan Turing', 'Stephen Hawking', 'UKMT', 'MathsJam & Gathering 4 Gardner Europe'],
    externalUrl: 'https://www.maths.cam.ac.uk/',
  },
  {
    id: 'tartu-taltech-estonia',
    name: 'e-Estonia: Scuola di Tartu, TalTech, Blockchain KSI & Difesa Autonoma',
    cityOrArea: 'Tartu e Tallinn',
    country: 'Estonia',
    scale: 'europa',
    archetype: 'bletchley-rand-crypto',
    archetypeLabel: 'Stato matematico digitale: Crittografia ZKP, Post-Quantistica e Robotica',
    period: '1996 (Tiigrihüpe) – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [58.378, 26.729],
    shortDescription:
      'L’ecosistema che ha trasformato la matematica discreta e la crittografia in sovranità nazionale: la firma keyless KSI (Ahto Buldas), le prove a conoscenza zero zk-SNARKs (Helger Lipmaa), la sicurezza post-quantistica (Dominique Unruh) e la robotica autonoma.',
    culturalPractice:
      'Passaggio precoce dal calcolo continuo alla logica computazionale, crittografia applicata e dual-use (Cybernetica, Milrem).',
    keyFiguresOrProjects: ['Ahto Buldas (KSI Blockchain)', 'Helger Lipmaa (zk-SNARKs)', 'Dominique Unruh', 'X-Road & AI Leap'],
    externalUrl: 'https://cs.ut.ee/en',
  },
  {
    id: 'zurich-eth-cern-ccc',
    name: 'ETH Zurigo, CERN Ginevra & Chaos Computer Club (CCC)',
    cityOrArea: 'Zurigo / Ginevra / Amburgo-Berlino',
    country: 'Svizzera / Germania',
    scale: 'europa',
    archetype: 'tmrc-hacker-maker',
    archetypeLabel: 'Calcolo scientifico ad alte prestazioni, Web ed Etica Hacker Europea',
    period: '1855 (ETH) / 1954 (CERN) / 1981 (CCC) – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [47.376, 8.548],
    shortDescription:
      'Il triangolo continentale tra l’analisi numerica e le simulazioni dell’ETH di Zurigo, la rete di calcolo distribuito del CERN (dove è nato il World Wide Web) e il Chaos Computer Club, la più grande associazione europea di hacker etici e crittografi.',
    culturalPractice:
      'Condivisione globale dei dati scientifici e congressi annuali (Chaos Communication Congress) sulla trasparenza algoritmica.',
    keyFiguresOrProjects: ['Albert Einstein', 'John von Neumann (allievo ETH)', 'CERN Computing', 'Chaos Computer Club'],
    externalUrl: 'https://math.ethz.ch/',
  },

  // ==================== MONDO (GLOBALE) ====================
  {
    id: 'princeton-ias-harvard-mit',
    name: 'IAS Princeton, Harvard (Math 55) & MIT (Course 18 / TMRC)',
    cityOrArea: 'Princeton (NJ) & Cambridge (MA)',
    country: 'Stati Uniti',
    scale: 'mondo',
    archetype: 'accademia-storica',
    archetypeLabel: 'Santuario mondiale post-1933, Senior Thesis e cultura Hacker del MIT',
    period: '1930 – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [40.331, -74.667],
    shortDescription:
      'L’Institute for Advanced Study (IAS) di Princeton accolse Einstein, Gödel e von Neumann in fuga dall’Europa. Ad Harvard il leggendario corso "Math 55" condensa 4 anni in 2 semestri sul Baby Rudin, mentre al MIT convivono l’algebra lineare di Strang e l’eredità del Tech Model Railroad Club.',
    culturalPractice:
      'Tè pomeridiano interdisciplinare a Fine Hall (Princeton), ricerca originale fin dal terzo anno e Problem Sets collaborativi notturni.',
    keyFiguresOrProjects: ['Kurt Gödel', 'John Nash', 'Andrew Wiles', 'Gilbert Strang', 'Tech Model Railroad Club (MIT)'],
    externalUrl: 'https://www.ias.edu/math',
  },
  {
    id: 'global-aops-euler-polymath-g4g',
    name: 'Ecosistema Globale Online: AoPS, Project Euler, MathOverflow, Polymath & G4G',
    cityOrArea: 'San Diego / Atlanta / Cloud Globale',
    country: 'Globale (Online + Conferenze)',
    scale: 'mondo',
    archetype: 'gardner-kvant',
    archetypeLabel: 'La mente alveare planetaria della matematica contemporanea',
    period: '1993 (G4G) / 2001 (Project Euler) / 2003 (AoPS) / 2009 (Polymath) – Oggi',
    isActiveToday: true,
    mode: 'Online',
    coordinates: [33.749, -84.388],
    shortDescription:
      'Il più grande circolo matematico digitale della storia umana: Art of Problem Solving (AoPS) per i giovani talenti olimpici, Project Euler (800+ sfide tra matematica e codice), Gathering 4 Gardner (G4G) e il Progetto Polymath di Timothy Gowers e Terence Tao.',
    culturalPractice:
      'Crowdsourcing di dimostrazioni scientifiche aperte, classifiche algoritmiche e scambio tra matematici, prestigiatori ed enigmisti.',
    keyFiguresOrProjects: ['Richard Rusczyk (AoPS)', 'Timothy Gowers & Terence Tao (Polymath)', 'Martin Gardner (G4G)', 'Project Euler'],
    externalUrl: 'https://artofproblemsolving.com/',
  },
  {
    id: 'tokyo-kyoto-japan',
    name: 'Giappone: Scuola di Kyoto (Analisi Algebrica di Sato), Todai & Templi Sangaku',
    cityOrArea: 'Kyoto e Tokyo',
    country: 'Giappone',
    scale: 'mondo',
    archetype: 'accademia-storica',
    archetypeLabel: 'Dalle tavolette votive Edo ai D-moduli e alla Teoria dei Numeri',
    period: '1603 (Wasan) / 1959 (Sato) – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [35.026, 135.78],
    shortDescription:
      'Il Giappone unisce due tradizioni straordinarie: l’eredità popolare dei Sangaku e del Soroban, e la profonda scuola accademica moderna divisa tra il rigore di Tokyo (Takagi, Kodaira) e la visione filosofica di Kyoto (RIMS), dove Mikio Sato ha fondato l’Analisi Algebrica e l’analisi microlocale.',
    culturalPractice:
      'Fusione tra intuizione filosofica (Scuola di Kyoto), rigore strutturale e calcolo mentale visuo-spaziale fin dall’infanzia.',
    keyFiguresOrProjects: ['Seki Takakazu', 'Kunihiko Kodaira', 'Mikio Sato', 'Masaki Kashiwara', 'RIMS Kyoto'],
    externalUrl: 'https://www.kurims.kyoto-u.ac.jp/en/',
  },
  {
    id: 'india-cmi-isi-kerala',
    name: 'India: Scuola del Kerala, Ramanujan, Chennai Mathematical Institute (CMI) & ISI',
    cityOrArea: 'Chennai (Madras), Calcutta e Kerala',
    country: 'India',
    scale: 'mondo',
    archetype: 'accademia-storica',
    archetypeLabel: 'Dall’intuizione infinita di Madhava e Ramanujan alla sintesi Algebra-Codice',
    period: '500 d.C. (Aryabhata) / 1350 (Kerala) / 1989 (CMI) – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [12.825, 80.219],
    shortDescription:
      'Terra natale dello zero posizionale, delle serie infinite del Kerala e del genio intuitivo di Srinivasa Ramanujan. Oggi il Chennai Mathematical Institute (CMI) e l’Indian Statistical Institute (ISI) offrono uno dei programmi triennali più selettivi al mondo, fondendo Algebra Astratta, Complessità Computazionale e Statistica.',
    culturalPractice:
      'Approccio profondamente algoritmico e numerico, dove la teoria dei gruppi dialoga fin dal primo giorno con gli algoritmi (es. Test di primalità AKS).',
    keyFiguresOrProjects: ['Brahmagupta', 'Madhava', 'Srinivasa Ramanujan', 'Manindra Agrawal (AKS)', 'CMI & ISI'],
    externalUrl: 'https://www.cmi.ac.in/',
  },
  {
    id: 'china-pku-tsinghua-ymsc',
    name: 'Cina: Dai Nove Capitoli Han a Peking University (PKU) e Tsinghua YMSC',
    cityOrArea: 'Pechino',
    country: 'Cina',
    scale: 'mondo',
    archetype: 'math-circles-komal',
    archetypeLabel: 'Selezione olimpica su scala continentale e Geometria Differenziale',
    period: '200 a.C. (Han) / 1898 (PKU) / 2009 (Yau Class) – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [39.999, 116.326],
    shortDescription:
      'Dall’invenzione delle matrici nell’era Han all’attuale superpotenza delle Olimpiadi Matematiche (IMO). Alla Peking University e nella "Yau Mathematical Sciences Class" di Tsinghua (diretta da Shing-Tung Yau), gli studenti studiano sui classici russi (Zorich, Kostrikin) spingendosi fino alla frontiera della geometria riemanniana e algebrica.',
    culturalPractice:
      'Drilling tecnico formidabile unito a programmi d’onore accelerati che portano gli studenti undergraduate direttamente alla ricerca.',
    keyFiguresOrProjects: ['Liu Hui', 'Shiing-Shen Chern', 'Shing-Tung Yau', 'YMSC Tsinghua & PKU'],
    externalUrl: 'https://ymsc.tsinghua.edu.cn/en/',
  },
  {
    id: 'brazil-impa-rio',
    name: 'Brasile: IMPA (Rio de Janeiro) e la Dinastia dei Sistemi Dinamici & OBMEP',
    cityOrArea: 'Rio de Janeiro',
    country: 'Brasile',
    scale: 'mondo',
    archetype: 'accademia-storica',
    archetypeLabel: 'Capitale mondiale dei Sistemi Dinamici, Teoria del Caos ed Etnomatematica',
    period: '1952 – Oggi',
    isActiveToday: true,
    mode: 'Fisico + Online',
    coordinates: [-22.966, -43.233],
    shortDescription:
      'Fondato a Rio de Janeiro e cresciuto con Peixoto, Jacob Palis, Marcelo Viana e la Medaglia Fields Artur Avila, l’IMPA ha trasformato il Brasile in un leader mondiale dei Sistemi Dinamici e della teoria ergodica, organizzando inoltre l’OBMEP per 18 milioni di studenti delle scuole pubbliche. In Brasile è nata anche l’Etnomatematica con Ubiratan D’Ambrosio.',
    culturalPractice:
      'Ricerca di punta su attrattori caotici immersa nella foresta di Tijuca, unita al più grande programma mondiale di inclusione matematica sociale (OBMEP).',
    keyFiguresOrProjects: ['Jacob Palis', 'Marcelo Viana', 'Artur Avila', 'Ubiratan D’Ambrosio (Etnomatematica)', 'IMPA & OBMEP'],
    externalUrl: 'https://impa.br/en_US/',
  },
  {
    id: 'israel-huji-technion-iran-sharif',
    name: 'Gerusalemme (HUJI), Haifa (Technion) & Teheran (Sharif University)',
    cityOrArea: 'Gerusalemme / Haifa / Teheran',
    country: 'Israele / Iran',
    scale: 'mondo',
    archetype: 'accademia-storica',
    archetypeLabel: 'Logica, Combinatoria, Teoria dei Giochi e il "Condotto Sharif" di Mirzakhani',
    period: '1925 (HUJI) / 1966 (Sharif) – Oggi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [31.776, 35.198],
    shortDescription:
      'In Medio Oriente spiccano due poli di straordinario rigore: in Israele l’Einstein Institute (HUJI) e il Technion dominano la Logica (Saharon Shelah), la Combinatoria (Noga Alon) e la Teoria dei Giochi (Aumann); in Iran la Sharif University di Teheran e le scuole Farzanegan hanno formato generazioni di matematici d’élite tra cui la prima donna Medaglia Fields, Maryam Mirzakhani.',
    culturalPractice:
      'Gruppi di lettura auto-organizzati dagli studenti su testi graduate (Rudin, Spivak) e fortissima sinergia tra matematica pura, crittografia e algoritmi.',
    keyFiguresOrProjects: ['Saharon Shelah', 'Noga Alon', 'Robert Aumann', 'Maryam Mirzakhani', 'Caucher Birkar'],
    externalUrl: 'https://mathematics.huji.ac.il/',
  },
  {
    id: 'africa-fractals-americas-quipu',
    name: 'Etnomatematica Globale: Geometrie Frattali Sub-Sahariane, Quipu Inca e Parentela Warlpiri',
    cityOrArea: 'Africa Sub-Sahariana / Cusco (Ande) / Deserto Centrale Australiano',
    country: 'Zambia, Mali, Camerun / Perù / Australia',
    scale: 'mondo',
    archetype: 'etnomatematica',
    archetypeLabel: 'Sistemi matematici indigeni non-eurocentrici',
    period: 'Millenni a.C. – Tradizioni viventi',
    isActiveToday: true,
    mode: 'Fisico',
    coordinates: [-13.531, -71.967],
    shortDescription:
      'Mondi matematici costruiti fuori dai supporti cartacei: l’architettura frattale autoreplicante dei villaggi Ba-Ila e Bamileke studiata da Ron Eglash; i database a corde annodate in base 10 (Quipu) dei Quipucamayoc Inca; e i gruppi diedrali dell’algebra della parentela aborigena Warlpiri.',
    culturalPractice:
      'Integrazione diretta delle strutture algebriche, ricorsive e topologiche nel tessuto urbano, nei nodi tessili e nelle regole genealogiche.',
    keyFiguresOrProjects: ['Ron Eglash (African Fractals)', 'Marcia Ascher (Quipu Mathematics)', 'Quipucamayoc Andini', 'Comunità Warlpiri'],
    externalUrl: 'https://www.ted.com/talks/ron_eglash_the_fractals_at_the_heart_of_african_designs',
  },
];
