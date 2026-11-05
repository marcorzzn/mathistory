export type GraphLayer = 0 | 1 | 2 | 3 | 4;

export interface DisciplineNode {
  id: string;
  layer: GraphLayer;
  layerLabel: string;
  stream: 'geometria' | 'algebra-numeri' | 'analisi-fisica' | 'probabilita-info' | 'logica-calcolo';
  streamLabel: string;
  title: string;
  eraLabel: string;
  etymologyOrOrigin: string;
  coreConcept: string;
  formula: string;
  whyItMatters: string;
  concreteApplications: string[];
  parentIds: string[];
}

export const GRAPH_LAYER_TITLES: Record<GraphLayer, { title: string; subtitle: string }> = {
  0: {
    title: '1. Bisogni Umani & Etimologia',
    subtitle: 'Perché è nata: campi, grano, commerci, dadi, stelle',
  },
  1: {
    title: '2. Formalizzazione Classica',
    subtitle: 'Dall’empiria agli assiomi, all’algebra e ai numeri complessi',
  },
  2: {
    title: '3. Astrazione Moderna (’800–’900)',
    subtitle: 'Varietà, gruppi di Galois, spazi di Hilbert, entropia e Turing',
  },
  3: {
    title: '4. Tecnologie del Mondo Reale',
    subtitle: 'Crittografia, GPS, Wi-Fi, modellazione predittiva e controllo',
  },
  4: {
    title: '5. IA & Frontiere del Calcolo',
    subtitle: 'Transformer, zk-SNARKs, Post-Quantum, robotica e Lean 4',
  },
};

export const STREAM_COLORS: Record<
  DisciplineNode['stream'],
  { label: string; hex: string; bgSoft: string; border: string }
> = {
  geometria: {
    label: 'Filone Geometrico-Spaziale',
    hex: '#1E3A8A',
    bgSoft: '#EFF6FF',
    border: '#BFDBFE',
  },
  'algebra-numeri': {
    label: 'Filone Algebrico-Aritmetico & Complesso',
    hex: '#9A3412',
    bgSoft: '#FFF7ED',
    border: '#FED7AA',
  },
  'analisi-fisica': {
    label: 'Filone Analitico-Dinamico',
    hex: '#14532D',
    bgSoft: '#F0FDF4',
    border: '#BBF7D0',
  },
  'probabilita-info': {
    label: 'Filone Probabilistico-Predittivo',
    hex: '#78350F',
    bgSoft: '#FEFCE8',
    border: '#FEF08A',
  },
  'logica-calcolo': {
    label: 'Filone Logico-Algoritmico & Reti',
    hex: '#581C87',
    bgSoft: '#FAF5FF',
    border: '#E9D5FF',
  },
};

export const DISCIPLINE_GRAPH_NODES: DisciplineNode[] = [
  // ==================== LAYER 0: BISOGNI UMANI & ETIMOLOGIA ====================
  {
    id: 'need-land-measurement',
    layer: 0,
    layerLabel: 'Bisogno Primordiale',
    stream: 'geometria',
    streamLabel: 'Filone Geometrico-Spaziale',
    title: 'Misura dei Campi Agricoli (Geo-metria)',
    eraLabel: '3000 – 1600 a.C. (Nilo & Eufrate)',
    etymologyOrOrigin:
      'Dal greco γῆ (gê, "terra") + μετρία (metría, "misura"). Dopo ogni piena annuale del Nilo che cancellava i confini dei poderi, i "tenditori di corde" (Arpedonapti) dovevano ristabilire le superfici per calcolare il tributo al Faraone.',
    coreConcept: 'Equivalenza di aree, angoli retti con corde annodate (3-4-5), volumi di granai e canali.',
    formula: '3² + 4² = 5² · Area_trapezio = ½(b₁ + b₂)h',
    whyItMatters:
      'Fa capire che la geometria non è nata come esercizio astratto alla lavagna, ma come tecnologia fiscale, agricola e architettonica.',
    concreteApplications: ['Agrimensura catastale', 'Costruzione di piramidi, templi e canali idraulici'],
    parentIds: [],
  },
  {
    id: 'need-counting-taxes',
    layer: 0,
    layerLabel: 'Bisogno Primordiale',
    stream: 'algebra-numeri',
    streamLabel: 'Filone Algebrico-Aritmetico & Complesso',
    title: 'Conteggio, Grano, Debiti e Scacchiere (Calcolo)',
    eraLabel: '20.000 a.C. – 200 a.C. (Ishango, Sumeri, Cina Han)',
    etymologyOrOrigin:
      '"Calcolo" deriva dal latino calculus ("sassolino" usato sull’abaco); "Cifra" e "Zero" derivano dall’arabo ṣifr ("vuoto"), traduzione del sanscrito śūnya.',
    coreConcept:
      'Raggruppare grandi quantità in basi posizionali (60 in Mesopotamia, 10 in India/Cina) e schierare bacchette in righe e colonne (Fangcheng) per bilanciare raccolti e debiti.',
    formula: 'Notazione posizionale: ∑ a_k · 10^k · Numeri negativi per i debiti',
    whyItMatters:
      'Senza lo zero posizionale e i numeri negativi nati per registrare assenze di merce e debiti commerciali, nessun calcolo complesso sarebbe possibile.',
    concreteApplications: ['Contabilità statale', 'Calendari lunisolari', 'Tassazione equa dei raccolti'],
    parentIds: [],
  },
  {
    id: 'need-inheritance-duels',
    layer: 0,
    layerLabel: 'Bisogno Primordiale',
    stream: 'algebra-numeri',
    streamLabel: 'Filone Algebrico-Aritmetico & Complesso',
    title: 'Divisione di Eredità, Commercio e Duelli sulle Cubiche',
    eraLabel: '820 d.C. (Baghdad) – 1545 d.C. (Bologna/Venezia)',
    etymologyOrOrigin:
      '"Algebra" viene da al-jabr ("ricomporre un osso rotto / spostare un termine negativo dall’altro lato dell’uguale") nel trattato di al-Khwarizmi per risolvere le leggi ereditarie e i contratti.',
    coreConcept:
      'Trovare una quantità ignota ("la Cosa" x) sottoposta a vincoli lineari, quadratici o cubici.',
    formula: 'ax² + bx = c · x³ + px = q',
    whyItMatters:
      'Cercando di risolvere le equazioni di 3° grado nei duelli pubblici del Rinascimento, Tartaglia, Cardano e Bombelli si imbatterono nelle radici quadrate dei numeri negativi.',
    concreteApplications: ['Partita doppia e interesse composto', 'Risoluzione di problemi geometrici di volume'],
    parentIds: [],
  },
  {
    id: 'need-motion-celestial',
    layer: 0,
    layerLabel: 'Bisogno Primordiale',
    stream: 'analisi-fisica',
    streamLabel: 'Filone Analitico-Dinamico',
    title: 'Moto dei Pianeti, Monsoni e Traiettorie Balistiche',
    eraLabel: '1350 d.C. (Kerala) – 1687 d.C. (Galileo/Newton)',
    etymologyOrOrigin:
      'La geometria classica sapeva misurare solo figure statiche. Ma nel mondo reale tutto cambia istante per istante: la velocità di un sasso che cade, la marea, l’orbita di Marte.',
    coreConcept:
      'Catturare il tasso di variazione istantaneo (derivata) e sommare infiniti contributi microscopici (integrale).',
    formula: 'v(t) = lim_{Δt→0} Δs / Δt',
    whyItMatters:
      'Trasforma la matematica da fotografia statica del mondo a film dinamico capace di predire il futuro di un sistema fisico.',
    concreteApplications: ['Tavole nautiche e astronomiche', 'Balistica e orologi a pendolo'],
    parentIds: [],
  },
  {
    id: 'need-dice-uncertainty',
    layer: 0,
    layerLabel: 'Bisogno Primordiale',
    stream: 'probabilita-info',
    streamLabel: 'Filone Probabilistico-Predittivo',
    title: 'Giochi di Dadi, Assicurazioni Marittime e Censimenti',
    eraLabel: '1654 d.C. (Carteggio Pascal-Fermat & Cardano)',
    etymologyOrOrigin:
      'Il cavaliere di Méré chiese a Blaise Pascal come dividere equamente la posta in gioco di una partita a dadi interrotta a metà: da quel problema da salotto nacque il Calcolo delle Probabilità.',
    coreConcept:
      'Quantificare matematicamente l’incertezza, il rischio e la speranza matematica (valore atteso) di eventi futuri.',
    formula: 'E[X] = ∑ x_i P(X = x_i)',
    whyItMatters:
      'Prima del 1654 il futuro era dominio degli indovini; con Pascal, Fermat, Bernoulli e Bayes il caso stesso diventa calcolabile.',
    concreteApplications: ['Polizze assicurative navali (Lloyd’s)', 'Tavole demografiche e attuariali'],
    parentIds: [],
  },

  // ==================== LAYER 1: FORMALIZZAZIONE CLASSICA ====================
  {
    id: 'classic-euclidean-analytic-geom',
    layer: 1,
    layerLabel: 'Fondamento Classico',
    stream: 'geometria',
    streamLabel: 'Filone Geometrico-Spaziale',
    title: 'Geometria Assiomatica (Euclide) & Cartesiana (x, y, z)',
    eraLabel: '300 a.C. (Alessandria) – 1637 d.C. (Descartes/Fermat)',
    etymologyOrOrigin:
      'Euclide organizza lo spazio in 5 postulati deduttivi; nel 1637 René Descartes (Cartesio) unisce Geometria e Algebra con le coordinate cartesiane: ogni curva diventa un’equazione!',
    coreConcept:
      'Isomorfismo tra punti geometrici nello spazio e coppie/terne di numeri reali (x, y, z).',
    formula: 'x² + y² = r² · d(P₁, P₂) = √((x₂-x₁)² + (y₂-y₁)²)',
    whyItMatters:
      'Tradurre le forme geometriche in equazioni numeriche è ciò che permette ai computer (che conoscono solo numeri) di vedere e disegnare lo spazio.',
    concreteApplications: ['Cartografia e proiezioni di Mercatore', 'Progettazione architettonica e ottica dei telescopi'],
    parentIds: ['need-land-measurement', 'need-counting-taxes'],
  },
  {
    id: 'classic-complex-numbers',
    layer: 1,
    layerLabel: 'Fondamento Classico',
    stream: 'algebra-numeri',
    streamLabel: 'Filone Algebrico-Aritmetico & Complesso',
    title: 'I Numeri Complessi (i = √-1) e il Piano di Gauss-Argand',
    eraLabel: '1572 (Bombelli) – 1748 (Eulero) – 1799 (Gauss)',
    etymologyOrOrigin:
      'Chiamati inizialmente con diffidenza "immaginari" da Cartesio, si rivelarono indispensabili a Bombelli per far tornare i conti reali nelle equazioni di terzo grado. Eulero e Gauss mostrarono che moltiplicare per i significa semplicemente ruotare di 90° nel piano!',
    coreConcept:
      'Estensione dei numeri reali a coppie z = a + bi, dove ogni equazione polinomiale di grado n ha esattamente n soluzioni (Teorema Fondamentale dell’Algebra) ed esponenziali e onde coincidono.',
    formula: 'e^{iθ} = cos(θ) + i sin(θ) · i² = -1',
    whyItMatters:
      'Senza i numeri complessi non potremmo sommare onde con fasi diverse: ogni segnale radio, acustico o quantistico è descritto da un numero complesso.',
    concreteApplications: ['Risoluzione completa delle equazioni algebriche', 'Rappresentazione delle rotazioni e delle oscillazioni armoniche'],
    parentIds: ['need-inheritance-duels', 'need-counting-taxes'],
  },
  {
    id: 'classic-matrices-linear-systems',
    layer: 1,
    layerLabel: 'Fondamento Classico',
    stream: 'algebra-numeri',
    streamLabel: 'Filone Algebrico-Aritmetico & Complesso',
    title: 'Sistemi Lineari, Determinanti e Matrici',
    eraLabel: '200 a.C. (Fangcheng) – 1683 (Seki) – 1850 (Sylvester/Cayley)',
    etymologyOrOrigin:
      'La parola "Matrice" fu coniata da James Joseph Sylvester nel 1850 dal latino matrix ("utero / grembo materno"), perché la tabella rettangolare di numeri è il "grembo" da cui si generano i determinanti dei sistemi lineari.',
    coreConcept:
      'Rappresentare trasformazioni simultanee di molte variabili (rotazioni, dilatazioni, reti di flussi) come moltiplicazioni di tabelle numeriche A·x = b.',
    formula: 'det(A - λI) = 0 (Autovalori e Autovettori)',
    whyItMatters:
      'Qualsiasi problema scientifico con migliaia di variabili accoppiate viene linearizzato e risolto tramite matrici e autovalori.',
    concreteApplications: ['Stabilità dei ponti e vibrazioni meccaniche', 'Economia matematica e bilanci industriali'],
    parentIds: ['need-counting-taxes', 'classic-euclidean-analytic-geom'],
  },
  {
    id: 'classic-calculus-ode',
    layer: 1,
    layerLabel: 'Fondamento Classico',
    stream: 'analisi-fisica',
    streamLabel: 'Filone Analitico-Dinamico',
    title: 'Calcolo Infinitesimale ed Equazioni Differenziali',
    eraLabel: '1687 (Newton/Leibniz) – 1788 (Lagrange)',
    etymologyOrOrigin:
      'Newton lo chiamò "Metodo delle Flussioni", Leibniz introdusse i simboli dx e ∫ (una S allungata per Summa). Nasce per esprimere le leggi della natura come relazioni tra una grandezza e le sue derivate.',
    coreConcept:
      'La derivata misura la pendenza locale; l’integrale accumula la quantità totale; le Equazioni Differenziali (ODE/PDE) predicono l’evoluzione temporale.',
    formula: 'F = m (d²x/dt²) · ∂u/∂t = α ∇²u (Equazione del calore di Fourier)',
    whyItMatters:
      'È il motore di tutta la fisica e l’ingegneria: dalla termodinamica all’elettromagnetismo di Maxwell.',
    concreteApplications: ['Macchine a vapore e motori termici', 'Ponti sospesi, idrodinamica e reti elettriche'],
    parentIds: ['need-motion-celestial', 'classic-euclidean-analytic-geom'],
  },
  {
    id: 'classic-bayes-statistics',
    layer: 1,
    layerLabel: 'Fondamento Classico',
    stream: 'probabilita-info',
    streamLabel: 'Filone Probabilistico-Predittivo',
    title: 'Teorema di Bayes, Minimi Quadrati e Curva di Gauss',
    eraLabel: '1763 (Bayes) – 1801 (Gauss scopre Cerere) – 1812 (Laplace)',
    etymologyOrOrigin:
      'Nel 1801 il pianetino Cerere scomparve dietro il Sole dopo poche osservazioni rumorose. Il ventiquattrenne Gauss inventò il Metodo dei Minimi Quadrati e la distribuzione Normale (a campana) per predirne la posizione esatta nel cielo.',
    coreConcept:
      'Aggiornare la probabilità di un’ipotesi man mano che arrivano nuovi dati (inferenza bayesiana) e filtrare il rumore di misura minimizzando la somma degli errori al quadrato.',
    formula: 'P(θ|D) = P(D|θ)P(θ)/P(D) · min_β ‖y - Xβ‖²',
    whyItMatters:
      'La Regressione ai Minimi Quadrati di Gauss e la regola di Bayes sono letteralmente il primo algoritmo di Machine Learning e Data Science della storia.',
    concreteApplications: ['Astronomia osservativa e geodesia', 'Controllo qualità industriale, epidemiologia e genetica'],
    parentIds: ['need-dice-uncertainty', 'classic-calculus-ode'],
  },

  // ==================== LAYER 2: ASTRAZIONE MODERNA ('800-'900) ====================
  {
    id: 'modern-riemannian-manifolds',
    layer: 2,
    layerLabel: 'Rivoluzione Strutturale',
    stream: 'geometria',
    streamLabel: 'Filone Geometrico-Spaziale',
    title: 'Geometrie Non-Euclidee, Varietà Riemanniane e Topologia',
    eraLabel: '1823 (Bolyai/Lobachevsky) – 1854 (Riemann) – 1895 (Poincaré)',
    etymologyOrOrigin:
      'Negando il V postulato delle parallele di Euclide, Bolyai, Lobachevsky e Riemann scoprono gli spazi curvi a n dimensioni ("Varietà" / Manifolds), mentre Poincaré fonda la Topologia (studio delle proprietà invarianti per deformazione continua).',
    coreConcept:
      'Lo spazio non è un palcoscenico rigido e piatto, ma un tessuto elastico la cui metrica g_{ij}(x) varia da punto a punto.',
    formula: 'ds² = g_{μν} dx^μ dx^ν · R_{μν} - ½Rg_{μν} = (8πG/c⁴) T_{μν}',
    whyItMatters:
      'Senza la geometria riemanniana (e il calcolo tensoriale degli italiani Ricci-Curbastro e Levi-Civita), Albert Einstein non avrebbe mai potuto scrivere la Relatività Generale nel 1915.',
    concreteApplications: ['Cosmologia, buchi neri e onde gravitazionali', 'Studio della forma dei dati ad alta dimensione (Topological Data Analysis)'],
    parentIds: ['classic-euclidean-analytic-geom', 'classic-calculus-ode'],
  },
  {
    id: 'modern-galois-abstract-algebra',
    layer: 2,
    layerLabel: 'Rivoluzione Strutturale',
    stream: 'algebra-numeri',
    streamLabel: 'Filone Algebrico-Aritmetico & Complesso',
    title: 'Algebra Astratta: Gruppi di Galois, Anelli, Campi Finiti e Curve Ellittiche',
    eraLabel: '1832 (Galois) – 1921 (Emmy Noether) – 1940 (Weil/Grothendieck)',
    etymologyOrOrigin:
      'Per spiegare perché non esiste una formula con radici per le equazioni di 5° grado, Galois sposta l’attenzione dai numeri alle simmetrie (permutazioni) delle soluzioni: nasce l’Algebra Astratta, generalizzata da Emmy Noether a Gottinga e dalla scuola francese di Bourbaki/ENS.',
    coreConcept:
      'Operare non più solo sui numeri ordinari, ma su insiemi finiti dotati di simmetria (Campi Finiti GF(p^n), Gruppi ciclici e punti razionali su Curve Ellittiche).',
    formula: 'E(𝔽_p): y² ≡ x³ + ax + b (mod p) · Piccolo Teorema di Fermat: a^{p-1} ≡ 1 (mod p)',
    whyItMatters:
      'Considerata per un secolo il ramo più "puro e inutile" della matematica (come vantava G.H. Hardy), la Teoria dei Numeri e l’Algebra dei Campi Finiti si sono rivelate il fondamento insostituibile della sicurezza informatica mondiale!',
    concreteApplications: ['Funzioni "botola" (Trapdoor) facili da calcolare in avanti ma impossibili da invertire senza chiave segreta', 'Codici a correzione d’errore per sonde spaziali e memorie SSD'],
    parentIds: ['classic-complex-numbers', 'need-inheritance-duels'],
  },
  {
    id: 'modern-fourier-hilbert-banach',
    layer: 2,
    layerLabel: 'Rivoluzione Strutturale',
    stream: 'analisi-fisica',
    streamLabel: 'Filone Analitico-Dinamico',
    title: 'Analisi Complessa, Trasformata di Fourier e Spazi di Banach/Hilbert',
    eraLabel: '1822 (Fourier) – 1900 (Hilbert) – 1932 (Banach al Caffè Scozzese)',
    etymologyOrOrigin:
      'Studiando come il calore si propaga in una sbarra di metallo, Joseph Fourier scoprì che qualsiasi segnale complesso può essere scomposto in una somma di onde semplici (seni e coseni / esponenziali complessi). Hilbert e Banach a Leopoli generalizzarono questa idea a spazi vettoriali infinito-dimensionali.',
    coreConcept:
      'Proiettare funzioni, suoni e immagini su basi ortogonali in uno Spazio di Hilbert usando il prodotto scalare complesso.',
    formula: 'f̂(ω) = ∫_{-∞}^{+∞} f(t) e^{-iωt} dt · ⟨ψ|φ⟩ = ∫ ψ*(x)φ(x) dx',
    whyItMatters:
      'Unisce i Numeri Complessi, l’Algebra Lineare e l’Analisi: è la grammatica matematica sia della Meccanica Quantistica sia di tutta l’elaborazione digitale dei segnali.',
    concreteApplications: ['Spettroscopia e fisica quantistica', 'Analisi delle frequenze acustiche, sismiche ed elettromagnetiche'],
    parentIds: ['classic-complex-numbers', 'classic-matrices-linear-systems', 'classic-calculus-ode'],
  },
  {
    id: 'modern-kolmogorov-shannon-info',
    layer: 2,
    layerLabel: 'Rivoluzione Strutturale',
    stream: 'probabilita-info',
    streamLabel: 'Filone Probabilistico-Predittivo',
    title: 'Assiomi di Kolmogorov, Processi Stocastici e Teoria dell’Informazione (Shannon)',
    eraLabel: '1933 (Kolmogorov a Mosca) – 1948 (Shannon ai Bell Labs)',
    etymologyOrOrigin:
      'Nel 1933 Andrey Kolmogorov fonda rigorosamente la probabilità sulla Teoria della Misura; nel 1948 Claude Shannon ai Bell Labs pubblica "A Mathematical Theory of Communication", coniando l’unità "bit" (binary digit) e misurando l’informazione tramite l’entropia.',
    coreConcept:
      'Trattare segnali e fenomeni naturali come processi aleatori nel tempo (catene di Markov, moto browniano) e stabilire i limiti matematici assoluti della compressione e trasmissione dati su un canale rumoroso.',
    formula: 'C = B log₂(1 + S/N) (Capacità di Shannon) · H(P,Q) = -∑ P(x) log Q(x)',
    whyItMatters:
      'Ha permesso la nascita delle telecomunicazioni digitali, dei modem, delle comunicazioni dallo spazio profondo e della teoria statistica dell’apprendimento.',
    concreteApplications: ['Codifica di sorgente e di canale', 'Catene di Markov (da cui è nato l’algoritmo PageRank di Google)'],
    parentIds: ['classic-bayes-statistics', 'modern-fourier-hilbert-banach'],
  },
  {
    id: 'modern-turing-graphs-combinatorics',
    layer: 2,
    layerLabel: 'Rivoluzione Strutturale',
    stream: 'logica-calcolo',
    streamLabel: 'Filone Logico-Algoritmico & Reti',
    title: 'Logica Matematica (Gödel/Turing) & Combinatoria dei Grafi (Erdős)',
    eraLabel: '1854 (Boole) – 1931 (Gödel) – 1936 (Turing) – 1959 (Erdős-Rényi)',
    etymologyOrOrigin:
      'Cercando di rispondere al problema dei fondamenti posto da David Hilbert ("ogni verità matematica è dimostrabile meccanicamente?"), Kurt Gödel scopre l’Incompletezza e Alan Turing inventa sulla carta un calcolatore universale astratto prima ancora che esistessero i computer elettronici.',
    coreConcept:
      'Qualsiasi algoritmo è codificabile come sequenza binaria (0 e 1) eseguita da una macchina universale; la complessità di reti e problemi discreti è governata dalla teoria dei grafi e dalla complessità computazionale (P vs NP).',
    formula: 'Macchina Universale U(⟨M⟩, x) · Classi di complessità P, NP, BQP',
    whyItMatters:
      'È l’atto di nascita del software: l’idea che un’unica macchina fisica (l’architettura di von Neumann) possa diventare qualsiasi strumento cambiando solo il programma in memoria.',
    concreteApplications: ['Compilatori, linguaggi di programmazione e sistemi operativi', 'Ottimizzazione combinatoria di reti di trasporto, microchip e logistica'],
    parentIds: ['need-counting-taxes', 'modern-galois-abstract-algebra'],
  },

  // ==================== LAYER 3: TECNOLOGIE DEL MONDO REALE ====================
  {
    id: 'tech-cryptography-blockchain',
    layer: 3,
    layerLabel: 'Applicazione Tecnologica',
    stream: 'algebra-numeri',
    streamLabel: 'Filone Algebrico-Aritmetico & Complesso',
    title: 'Crittografia Moderna (RSA, Curve Ellittiche ECC, AES) & Blockchain KSI',
    eraLabel: '1976 (Diffie-Hellman/RSA) – 1985 (ECC) – 2007 (KSI e-Estonia)',
    etymologyOrOrigin:
      'Ecco perché l’Algebra Astratta e la Teoria dei Numeri sono diventate vitali: moltiplicare due numeri primi di 300 cifre richiede millisecondi, ma fattorizzare il loro prodotto (RSA) o invertire il logaritmo discreto su una Curva Ellittica richiede migliaia di anni.',
    coreConcept:
      'Usare l’aritmetica modulare di Eulero/Fermat, i Campi di Galois GF(2⁸) e i gruppi su curve ellittiche per cifrare comunicazioni, firmare digitalmente contratti (EstEID / X-Road) e garantire l’integrità dei registri statali con alberi di hash (KSI di Ahto Buldas).',
    formula: 'c ≡ m^e (mod n), m ≡ c^d (mod n) · Q = k·P su curva ellittica E(𝔽_p)',
    whyItMatters:
      'Ogni volta che vedi il lucchetto HTTPS nel browser, usi la carta di credito, firmi con SPID o scambi messaggi cifrati end-to-end, stai eseguendo teoremi di algebra astratta e teoria dei numeri.',
    concreteApplications: ['Protocolli TLS/HTTPS, SSH, Signal, Carte bancarie EMV', 'Infrastruttura statale estone X-Road, firme digitali e Blockchain'],
    parentIds: ['modern-galois-abstract-algebra', 'modern-turing-graphs-combinatorics'],
  },
  {
    id: 'tech-Predictive-modeling-kalman',
    layer: 3,
    layerLabel: 'Applicazione Tecnologica',
    stream: 'analisi-fisica',
    streamLabel: 'Filone Analitico-Dinamico',
    title: 'Modellazione Predittiva, Meteo/Clima, Finanza & Filtri di Kalman (GNC)',
    eraLabel: '1960 (Filtro di Kalman per Apollo) – Oggi',
    etymologyOrOrigin:
      'Come ha fatto il computer dell’Apollo 11 (con meno memoria di una calcolatrice tascabile) a portare l’uomo sulla Luna, e come fanno i meteorologi o i droni autonomi a predire una traiettoria immersa nel rumore? Unendo le Equazioni Differenziali (scuola russa di Arnold/Lyapunov) con l’Inferenza Bayesiana e l’Algebra Lineare!',
    coreConcept:
      'Discretizzare equazioni alle derivate parziali (Navier-Stokes per il clima, Black-Scholes per la finanza) su supercomputer e usare il Filtro di Kalman (EKF) per fondere in tempo reale modelli dinamici e sensori rumorosi.',
    formula: 'x̂_{k|k} = x̂_{k|k-1} + K_k (z_k - H x̂_{k|k-1}) · Stabilità di Lyapunov V̇(x) < 0',
    whyItMatters:
      'Permette di prevedere l’evoluzione di sistemi complessi (uragani, epidemie, mercati, aerodinamica e guida proporzionale di veicoli autonomi) prima che gli eventi accadano.',
    concreteApplications: ['Previsioni meteorologiche numeriche e modelli climatici globali', 'Guida, Navigazione e Controllo (GNC) aerospaziale, robotica autonoma e GPS'],
    parentIds: ['modern-riemannian-manifolds', 'modern-fourier-hilbert-banach', 'classic-bayes-statistics'],
  },
  {
    id: 'tech-dsp-medical-imaging',
    layer: 3,
    layerLabel: 'Applicazione Tecnologica',
    stream: 'analisi-fisica',
    streamLabel: 'Filone Analitico-Dinamico',
    title: 'Telecomunicazioni (Wi-Fi/5G), Compressione & Imaging Medico (TAC/RMN)',
    eraLabel: '1965 (Cooley-Tukey FFT) – 1979 (Nobel per la TAC di Cormack/Hounsfield)',
    etymologyOrOrigin:
      'Come vedere dentro il corpo umano senza usare il bisturi? Nel 1917 il matematico austriaco Johann Radon dimostrò come ricostruire una funzione 2D dai suoi integrali di linea (Trasformata di Radon): cinquant’anni dopo quel teorema puro è diventato la TAC ospedaliera.',
    coreConcept:
      'Usare la Trasformata di Fourier Veloce (FFT su numeri complessi), le Wavelets (Ingrid Daubechies) e il Compressed Sensing (Terence Tao & Emmanuel Candès) per ricostruire immagini ad altissima definizione da pochissime misure.',
    formula: 'FFT in O(N log N) · min ‖x‖₁ soggetto a Φx = y (Compressed Sensing)',
    whyItMatters:
      'Grazie al Compressed Sensing di Tao e Candès (basato su analisi armonica e matrici casuali), oggi le risonanze magnetiche pediatriche durano una frazione del tempo.',
    concreteApplications: ['Risonanza Magnetica (MRI), TAC ed ecografia Doppler', 'Modulazione OFDM per Wi-Fi, 4G/5G, fibra ottica e audio/video streaming'],
    parentIds: ['modern-fourier-hilbert-banach', 'modern-kolmogorov-shannon-info'],
  },

  // ==================== LAYER 4: IA & FRONTIERE DEL CALCOLO ====================
  {
    id: 'frontier-ml-deep-learning-transformers',
    layer: 4,
    layerLabel: 'Frontiera Attuale & Futura',
    stream: 'probabilita-info',
    streamLabel: 'Filone Probabilistico-Predittivo',
    title: 'Machine Learning Moderno, Reti Neurali Profonde & Architettura Transformer',
    eraLabel: '2012 (AlexNet) – 2017 (Transformer) – 2026+ (AI Multimodale & Scientifica)',
    etymologyOrOrigin:
      'Il Machine Learning e i Large Language Models non sono "magia": sono la convergenza suprema di 4000 anni di matematica! Una rete neurale è una composizione di moltiplicazioni di Matrici (Cina Han / Algebra Lineare), derivate parziali concatenate per la Backpropagation (Calcolo di Leibniz/Newton), ottimizzazione stocastica su varietà ad altissima dimensione (Geometria Riemanniana) e minimizzazione dell’entropia incrociata (Probabilità di Bayes/Kolmogorov/Shannon).',
    coreConcept:
      'Rappresentare concetti, parole, immagini e proteine come vettori (embeddings) in uno spazio geometrico a migliaia di dimensioni e apprendere i pesi sinaptici θ scendendo lungo il gradiente della funzione di costo.',
    formula: 'θ_{t+1} = θ_t - η ∇_θ L(f_θ(x), y) · Attention(Q,K,V) = softmax(QK^T / √d_k)V',
    whyItMatters:
      'Ha trasformato la matematica in un motore universale di scoperta scientifica: dal ripiegamento delle proteine (AlphaFold) alla scoperta di nuovi materiali, farmaci e algoritmi di moltiplicazione matriciale (AlphaTensor).',
    concreteApplications: ['Modelli linguistici e multimodali generativi (LLM), visione artificiale YOLO/ViT', 'Biologia computazionale, scoperta di farmaci e simulazione molecolare'],
    parentIds: [
      'classic-matrices-linear-systems',
      'modern-kolmogorov-shannon-info',
      'tech-Predictive-modeling-kalman',
      'modern-turing-graphs-combinatorics',
    ],
  },
  {
    id: 'frontier-zkp-post-quantum-formal-ai',
    layer: 4,
    layerLabel: 'Frontiera Attuale & Futura',
    stream: 'logica-calcolo',
    streamLabel: 'Filone Logico-Algoritmico & Reti',
    title: 'Prove a Conoscenza Zero (zk-SNARKs), Crittografia Post-Quantistica & Co-Piloti Formali (Lean 4)',
    eraLabel: '2015 – Frontiere 2030+ (Tartu, Bonn, Princeton, DeepMind)',
    etymologyOrOrigin:
      'Di fronte all’arrivo dei computer quantistici (che grazie all’algoritmo di Shor basato sulla Trasformata di Fourier Quantistica possono violare RSA ed ECC), la matematica risponde con la Geometria dei Reticoli (Lattice-Based Cryptography) e con gli assistenti di dimostrazione formale (Lean 4) accoppiati all’IA.',
    coreConcept:
      '1) zk-SNARKs (Helger Lipmaa, Goldwasser-Micali-Rackoff): dimostrare matematicamente che un calcolo o un’identità è valida senza rivelare alcun dato segreto; 2) Reticoli euclidei a centinaia di dimensioni per resistere ai computer quantistici; 3) Verifica formale dei teoremi tramite Teoria dei Tipi Dipendenti (Lean 4 + AlphaProof/AlphaGeometry).',
    formula: 'Learning With Errors (LWE): b = A·s + e (mod q) · Verifica formale in Lean 4',
    whyItMatters:
      'Chiude il cerchio storico iniziato con Euclide ad Alessandria: la dimostrazione matematica diventa un codice verificabile al 100% dalla macchina, mentre l’IA impara a ragionare per deduzione logica rigorosa.',
    concreteApplications: ['Voto elettronico verificabile e privacy digitale (e-Estonia 2.0)', 'Standard NIST di Crittografia Post-Quantistica (ML-KEM / Kyber)', 'Scoperta matematica assistita da IA e software avionico/critico certificato senza bug'],
    parentIds: ['tech-cryptography-blockchain', 'modern-riemannian-manifolds', 'frontier-ml-deep-learning-transformers'],
  },
];
