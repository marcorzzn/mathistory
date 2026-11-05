export interface GlobalSchoolProfile {
  id: string;
  soulTitle: string;
  flagshipInstitutions: string;
  philosophyMotto: string;
  coreStrengths: string[];
  sacredTexts: string[];
  pedagogicalMethod: string;
  realWorldSuperpower: string;
  syllabusComparison: {
    analysis: string;
    algebra: string;
    physicsAndModels: string;
  };
}

export interface VideoDocumentaryItem {
  id: string;
  category: string;
  title: string;
  channelOrSource: string;
  description: string;
  url: string;
}

export interface BudapestRule {
  number: string;
  title: string;
  subtitle: string;
  actionableHabit: string;
}

export const GLOBAL_SCHOOLS_COMPARISON: GlobalSchoolProfile[] = [
  {
    id: 'russian-soviet-soul',
    soulTitle: '1. L’Anima Analitico-Fisica (Scuola Russo-Sovietica & Ucraina)',
    flagshipInstitutions: 'Lomonosov Moscow State University (MSU MechMat), MIPT, IUM, KNU Kyiv',
    philosophyMotto: '«La matematica è l’architettura della fisica: non capisci la teoria se non sai calcolare l’integrale»',
    coreStrengths: ['Hard Analysis (Analisi 4 semestri)', 'Equazioni Differenziali come flussi geometrici', 'Meccanica Razionale e Teoria del Controllo (Lyapunov)'],
    sacredTexts: [
      'B.P. Demidovich — Problems in Mathematical Analysis (Zadachnik: 3000+ esercizi)',
      'V.A. Zorich — Mathematical Analysis (Vol. 1 & 2)',
      'V.I. Arnold — Ordinary Differential Equations & Mathematical Methods of Classical Mechanics',
      'Landau-Lifshitz — Course of Theoretical Physics ("Teorminimum")',
    ],
    pedagogicalMethod:
      'Allenamento atletico sul libro di problemi (Zadachnik) accoppiato ai seminari di ricerca fin dal primo anno (stile IUM/Gelfand).',
    realWorldSuperpower:
      'Dinamica aerospaziale, stabilità del volo, fisica matematica e controllo non lineare.',
    syllabusComparison: {
      analysis: 'Ricostruzione assiomatica di ℝ + padronanza manuale di limiti e integrali complessi (Zorich + Demidovich).',
      algebra: 'Trattazione unificata Algebra Lineare + Geometria Analitica e tensori (Gelfand, Kostrikin).',
      physicsAndModels: 'Centrale: Meccanica Teorica insegnata dentro Matematica (Lagrangiane, Hamiltoniane, PDE di Vladimirov).',
    },
  },
  {
    id: 'french-german-structural-soul',
    soulTitle: '2. L’Anima Strutturalista (Scuola Francese ENS & Tedesca Bonn/Gottinga)',
    flagshipInstitutions: 'École Normale Supérieure (Rue d’Ulm, Parigi), IHÉS, Università di Bonn (Hausdorff Center)',
    philosophyMotto: '«La struttura astratta viene prima dell’esempio particolare: l’eredità di Bourbaki e Noether»',
    coreStrengths: ['Geometria Algebrica e Aritmetica', 'Teoria delle Categorie e Topologia', 'Teoria della Misura e Analisi Funzionale'],
    sacredTexts: [
      'Nicolas Bourbaki — Éléments de mathématique & Polycopiés d’autore ENS',
      'Jean-Pierre Serre — A Course in Arithmetic & Linear Representations of Finite Groups',
      'Jürgen Neukirch — Algebraic Number Theory (Scuola di Bonn)',
      'Xavier Gourdon — Les Maths en tête (Analisi e Algebra per CPGE/Agrégation)',
    ],
    pedagogicalMethod:
      'Classes Préparatoires (CPGE), concorsi ad altissima selezione, studio su dispense dense (polycopiés) e culto della clarté dimostrativa.',
    realWorldSuperpower:
      'Crittografia avanzata su Curve Ellittiche, Campi Finiti, Protocolli Zero-Knowledge (ZKP) e verifica formale.',
    syllabusComparison: {
      analysis: 'Topologia generale e spazi metrici/normati (Banach/Hilbert) fin dal primo giorno prima del calcolo.',
      algebra: 'Gruppi, Anelli, Corpi, Teoria di Galois e Moduli prima delle matrici numeriche.',
      physicsAndModels: 'Separata nei percorsi puri, ma potentissima nella Fisica Matematica (Fourier, Poincaré, Villani).',
    },
  },
  {
    id: 'anglo-american-pragmatic-soul',
    soulTitle: '3. L’Anima Pragmatica e Accelerata (USA d’Élite & Cambridge Tripos)',
    flagshipInstitutions: 'Harvard (Math 55), Princeton University, MIT (Course 18), University of Cambridge (DAMTP)',
    philosophyMotto: '«Velocità newtoniana, Problem Sets collaborativi e ricerca originale fin dal terzo anno»',
    coreStrengths: ['Analisi su Varietà e Topologia (Harvard/Princeton)', 'Algebra Lineare Applicata e Calcolo Scientifico (MIT)', 'Mixed Mathematics & Fisica Teorica (Cambridge Part III)'],
    sacredTexts: [
      'Walter Rudin — Principles of Mathematical Analysis ("Baby Rudin")',
      'Michael Spivak — Calculus on Manifolds & Sheldon Axler — Linear Algebra Done Right',
      'Gilbert Strang — Introduction to Linear Algebra (MIT)',
      'Elias Stein & Rami Shakarchi — Princeton Lectures in Analysis (4 voll.)',
    ],
    pedagogicalMethod:
      'Weekly Problem Sets (P-Sets), Junior Paper e Senior Thesis obbligatoria di ricerca originale a Princeton; supervisioni a coppie a Cambridge.',
    realWorldSuperpower:
      'Modellazione rapida, codice scientifico bug-free, finanza quantitativa e Machine Learning.',
    syllabusComparison: {
      analysis: 'Dal Calculus applicato (MIT) all’urto frontale di Harvard Math 55 (Rudin + Spivak + Analisi Complessa).',
      algebra: 'Doppia via: intuizione matriciale/spettrale (Strang al MIT) o rigore astratto senza determinanti (Axler/Artin).',
      physicsAndModels: 'A Cambridge (Mathematical Tripos) Fisica Teorica e Matematica formano un unico dipartimento.',
    },
  },
  {
    id: 'algorithmic-discrete-soul',
    soulTitle: '4. L’Anima Algoritmica e Discreta (e-Estonia, Ungheria, India CMI/ISI & ETH Zurigo)',
    flagshipInstitutions: 'Università di Tartu & TalTech (Estonia), Budapest (BSM/Rényi), Chennai Mathematical Institute (India), ETH Zurigo',
    philosophyMotto: '«Matematica e Codice sono la stessa cosa: dal discreto alla sovranità digitale e all’IA»',
    coreStrengths: ['Combinatoria, Teoria dei Grafi e Metodo Probabilistico (Budapest)', 'Crittografia Applicata, zk-SNARKs e Post-Quantum (Tartu)', 'Analisi Numerica, Complessità e Data Science (CMI/ISI/ETH)'],
    sacredTexts: [
      'Graham, Knuth, Patashnik — Concrete Mathematics',
      'N.J. Higham — Accuracy and Stability of Numerical Algorithms (ETH)',
      'Dan Boneh & Victor Shoup — A Graduate Course in Applied Cryptography',
      'László Lovász — Combinatorial Problems and Exercises',
    ],
    pedagogicalMethod:
      'Scoperta guidata per fili di problemi (Metodo Pósa in Ungheria), integrazione immediata Logica-Discreto-Codice fin dal 1° semestre (Tartu/CMI).',
    realWorldSuperpower:
      'Architettura di stati digitali (X-Road, KSI Blockchain), algoritmi di Intelligenza Artificiale e robotica autonoma.',
    syllabusComparison: {
      analysis: 'Focus su funzioni generatrici, analisi asintotica, probabilità su grafi e stabilità numerica.',
      algebra: 'Teoria dei gruppi e campi finiti insegnati direttamente insieme a complessità computazionale e crittografia.',
      physicsAndModels: 'Sistemi cyber-fisici, robotica autonoma, filtri di Kalman (EKF) e visione artificiale.',
    },
  },
  {
    id: 'italian-brazil-asian-traditions',
    soulTitle: '5. La Tradizione Italiana (L-35 / SSM / SNS) e i Poli Mondiali (Kyoto, IMPA Rio, HUJI, Sharif)',
    flagshipInstitutions: 'SNS Pisa, Scuola Superiore Meridionale (Napoli), IMPA Rio, Kyoto RIMS, HUJI Gerusalemme, Sharif Teheran',
    philosophyMotto: '«La Grammatica del Rigore: dimostrare tutto dai fondamenti unendo Geometria, Analisi e Meccanica Razionale»',
    coreStrengths: ['Analisi Matematica 1-2-3 e Calcolo delle Variazioni (De Giorgi, Caccioppoli)', 'Fisica Matematica / Meccanica Razionale deduttiva', 'Sistemi Dinamici (IMPA Brasile) e Analisi Algebrica (Kyoto)'],
    sacredTexts: [
      'Enrico Giusti / Giovanni Prodi — Analisi Matematica',
      'Antonio Fasano & Stefano Marmi — Meccanica Analitica',
      'Marcelo Viana & Jacob Palis — Dynamical Systems (IMPA Rio)',
      'Massimo Gobbino — Precorso e Lezioni di Analisi e Algebra Lineare (Unipi)',
    ],
    pedagogicalMethod:
      'Solido blocco fondazionale nei primi due anni con esame scritto + esame orale alla lavagna che forgia una profonda maturità logica.',
    realWorldSuperpower:
      'Capacità di affrontare qualsiasi problema teorico o applicativo grazie a fondamenta logico-deduttive incrollabili.',
    syllabusComparison: {
      analysis: 'Triplo anello Analisi 1, 2, 3 (da Dedekind/Cauchy fino alla misura di Lebesgue e agli spazi funzionali).',
      algebra: 'Geometria 1 (Algebra Lineare) affiancata fin dal primo anno da Algebra 1 astratta (Herstein).',
      physicsAndModels: 'Specificità unica italiana: Meccanica Razionale obbligatoria come materia matematica deduttiva.',
    },
  },
];

export const VIDEO_DOCUMENTARIES: VideoDocumentaryItem[] = [
  // Fenomeno Ungherese
  {
    id: 'vid-erdos-n-is-a-number',
    category: 'Fenomeno Ungherese & I Marziani',
    title: 'N is a Number: A Portrait of Paul Erdős & The Most Prolific Mathematician',
    channelOrSource: 'Documentario Biografico / YouTube',
    description:
      'Ritratto intimo della vita nomade di Paul Erdős tra Budapest e il mondo, il "Libro" delle dimostrazioni perfette e la nascita della combinatoria moderna.',
    url: 'https://www.youtube.com/results?search_query=N+is+a+Number+A+Portrait+of+Paul+Erdos+documentary',
  },
  {
    id: 'vid-von-neumann-martians',
    category: 'Fenomeno Ungherese & I Marziani',
    title: 'John von Neumann: The Most Intelligent Man Who Ever Lived? & The Martians of Science',
    channelOrSource: 'Biographics / Istvan Hargittai Lecture',
    description:
      'Dall’infanzia nel Fasori Gimnázium di Budapest con László Rátz alla nascita dei computer moderni, della teoria dei giochi e il mito degli scienziati "Marziani".',
    url: 'https://www.youtube.com/results?search_query=John+von+Neumann+documentary+Martians+of+Science+Hargittai',
  },
  // Scuola Russa, Caffè Scozzese & Bourbaki
  {
    id: 'vid-kolmogorov-math-circles',
    category: 'Math Circles Sovietici, Caffè Scozzese & Bourbaki',
    title: 'Kolmogorov’s Legacy & How the USSR Created the Foundations of Modern Mathematics',
    channelOrSource: 'Storia della Matematica / Math Circles',
    description:
      'Come Andrey Kolmogorov ha formalizzato la probabilità e il caos creando contemporaneamente la rete dei Circoli Matematici giovanili e la rivista Kvant.',
    url: 'https://www.youtube.com/results?search_query=Andrey+Kolmogorov+documentary+Math+Circles+USSR',
  },
  {
    id: 'vid-scottish-cafe-banach',
    category: 'Math Circles Sovietici, Caffè Scozzese & Bourbaki',
    title: 'Stefan Banach & The Scottish Café: The Cafe Where Geniuses Wrote on Marble Tables',
    channelOrSource: 'Storia della Scuola di Leopoli (Lwów)',
    description:
      'La straordinaria storia del Caffè Scozzese di Leopoli, dove Banach, Ulam e Mazur fondarono l’analisi funzionale annotando problemi in cambio di un’oca viva.',
    url: 'https://www.youtube.com/results?search_query=Scottish+Cafe+Stefan+Banach+Lviv+mathematics',
  },
  {
    id: 'vid-bourbaki-ted',
    category: 'Math Circles Sovietici, Caffè Scozzese & Bourbaki',
    title: 'The Greatest Mathematician That Never Lived: Nicolas Bourbaki',
    channelOrSource: 'TED-Ed (Pratik Aghor)',
    description:
      'La storia segreta del collettivo francese che negli anni ’30 ha riscritto la matematica mondiale sotto lo pseudonimo di un generale inesistente.',
    url: 'https://www.youtube.com/results?search_query=The+greatest+mathematician+that+never+lived+Nicolas+Bourbaki+TED-Ed',
  },
  // Bletchley Park, MIT TMRC & RAND
  {
    id: 'vid-bletchley-enigma',
    category: 'Bletchley Park, MIT TMRC & RAND Corporation',
    title: 'Inside Bletchley Park: Secrets of the WW2 Codebreakers & Cracking the Enigma Code',
    channelOrSource: 'Documentario Storico Crittografia',
    description:
      'Come Alan Turing, Joan Clarke, Tommy Flowers (Colossus) e i campioni di scacchi e cruciverba britannici hanno industrializzato la decifrazione di Enigma.',
    url: 'https://www.youtube.com/results?search_query=Inside+Bletchley+Park+Secrets+of+the+WW2+Codebreakers+Enigma',
  },
  {
    id: 'vid-mit-tmrc-hackers',
    category: 'Bletchley Park, MIT TMRC & RAND Corporation',
    title: 'The Tech Model Railroad Club of MIT & The Origins of Hacker Culture (Peter Samson)',
    channelOrSource: 'Computer History Museum / MIT Archives',
    description:
      'Un viaggio dentro la stanza dei trenini elettrici del MIT negli anni ’50-’60, dove l’ossessione per gli scambi a relè ha fatto nascere la parola "Hack" e il software libero.',
    url: 'https://www.youtube.com/results?search_query=Tech+Model+Railroad+Club+MIT+Peter+Samson+Origins+of+Hacker+Culture',
  },
  {
    id: 'vid-rand-game-theory',
    category: 'Bletchley Park, MIT TMRC & RAND Corporation',
    title: 'How the RAND Corporation & Game Theory Shaped Strategy (John Nash & Von Neumann)',
    channelOrSource: 'Storia della Guerra Fredda e Teoria dei Giochi',
    description:
      'Il ruolo del think tank di Santa Monica nello sviluppo della Teoria dei Giochi, della programmazione dinamica (Bellman) e dell’architettura di rete.',
    url: 'https://www.youtube.com/results?search_query=RAND+Corporation+Game+Theory+history+documentary',
  },
  // Martin Gardner, Etnomatematica, Sangaku & Italia
  {
    id: 'vid-gardner-escher-coxeter',
    category: 'Martin Gardner, Etnomatematica & Olimpiadi Italiane',
    title: 'Mystery and Magic of Mathematics: Martin Gardner, Coxeter & M.C. Escher',
    channelOrSource: 'Gathering 4 Gardner (G4G)',
    description:
      'Come le rubriche di "Mathematical Games" di Martin Gardner su Scientific American hanno unito John Conway, Persi Diaconis, Coxeter ed Escher.',
    url: 'https://www.youtube.com/results?search_query=Martin+Gardner+Mathematics+Coxeter+Escher+Gathering+4+Gardner',
  },
  {
    id: 'vid-sangaku-ramanujan-eglash',
    category: 'Martin Gardner, Etnomatematica & Olimpiadi Italiane',
    title: 'Sangaku Japanese Temple Geometry, Ramanujan & Ron Eglash: African Fractals (TED)',
    channelOrSource: 'TED / Storia dell’Etnomatematica',
    description:
      'Tre capolavori sull’universalità culturale della matematica: le tavolette Sangaku del periodo Edo, l’intuizione di Ramanujan e la geometria frattale nei villaggi africani.',
    url: 'https://www.youtube.com/results?search_query=Ron+Eglash+The+fractals+at+the+heart+of+African+designs+Sangaku+mathematics',
  },
  {
    id: 'vid-olimpiadi-umi-gobbino',
    category: 'Martin Gardner, Etnomatematica & Olimpiadi Italiane',
    title: 'Finali Nazionali Olimpiadi della Matematica (Cesenatico UMI) & Lezioni Prof. Massimo Gobbino',
    channelOrSource: 'Olimpiadi della Matematica UMI / Massimo Gobbino YouTube',
    description:
      'Le dirette delle gare a squadre di Cesenatico e l’archivio completo (Precorso, Analisi 1 e 2, Algebra Lineare) del Prof. Massimo Gobbino dell’Università di Pisa.',
    url: 'https://www.youtube.com/results?search_query=Olimpiadi+della+Matematica+Finale+Gara+a+Squadre+Massimo+Gobbino+Precorso',
  },
];

export const CODICE_BUDAPEST_RULES: BudapestRule[] = [
  {
    number: '01',
    title: 'La Regola del Caffè (Sfratta l’Isolamento)',
    subtitle: 'I matematici di Budapest e Leopoli non studiavano chiusi al buio in cameretta',
    actionableHabit:
      'Almeno 3 volte a settimana cambia spazio fisico: porta un solo quaderno in biblioteca, in un’aula studio o in un caffè. La matematica nasce dall’attrito con la vita reale, non dalla reclusione.',
  },
  {
    number: '02',
    title: 'Il Metodo KöMaL (Smonta il Mostro in Micro-Sfide)',
    subtitle: 'Dimentica il peso dell’intero esame o degli anni fuoricorso',
    actionableHabit:
      'Il tuo unico obiettivo quotidiano è microscopico e misurabile: comprendere a fondo 1 singola dimostrazione o risolvere 1 singolo esercizio scelto con cura. Una grande carriera è solo una serie convergente di micro-vittorie.',
  },
  {
    number: '03',
    title: 'Ragiona sui Tovaglioli (Il Diritto di Scarabocchiare)',
    subtitle: 'Anche Archimede pesava mentalmente le figure prima di scrivere la prova formale',
    actionableHabit:
      'Non pretendere di capire un teorema leggendolo passivamente come un romanzo. Prendi fogli brutti, fai esempi numerici piccoli (n=2, n=3), disegna frecce, cerca un controesempio per "rompere" le ipotesi del teorema.',
  },
  {
    number: '04',
    title: 'La Regola dei 15 Minuti (Uccidi l’Attrito Statica)',
    subtitle: 'In meccanica razionale l’attrito di primo distacco è sempre maggiore di quello dinamico',
    actionableHabit:
      'Quando senti il blocco, prometti a te stesso di sederti al tavolo con il timer puntato su soli 15 minuti per decifrare un paragrafo. Superata la barriera d’attivazione, il cervello matematico entra naturalmente in risonanza.',
  },
  {
    number: '05',
    title: 'Costruisci il tuo "Circolo" (Anche di due sole persone)',
    subtitle: 'Da Erdős a Mirzakhani: la matematica è uno sport cooperativo',
    actionableHabit:
      'Usa Matematicamente.it, Math StackExchange, r/learnmath o trova anche un solo compagno per spiegare a voce alta un concetto alla lavagna: se riesci a spiegarlo semplicemente, è davvero tuo.',
  },
  {
    number: '06',
    title: 'Amnistia Generale (Il Proprio di Markov)',
    subtitle: 'In probabilità, una catena di Markov dipende solo dallo stato presente, non dal passato',
    actionableHabit:
      'Chi ha superato Analisi 1 possiede già la struttura mentale per arrivare in fondo. Il passato accademico non ha alcun potere predittivo sul calcolo che fai oggi: azzera il contatore ogni mattina.',
  },
];
