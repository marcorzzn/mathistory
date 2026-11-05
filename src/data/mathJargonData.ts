export type JargonCategory =
  | 'proof-aesthetics'
  | 'objects-pathology'
  | 'conventions-shorthand'
  | 'folklore-erdosese';

export interface MathJargonEntry {
  id: string;
  termEn: string;
  termIt: string;
  category: JargonCategory;
  categoryLabel: string;
  laypersonMyth: string;
  mathematicianReality: string;
  classicExample: string;
  historicalOriginOrCommunity: string;
  symbolOrFormula?: string;
}

export const JARGON_CATEGORIES: Record<
  JargonCategory,
  { label: string; subtitle: string; badgeColor: string }
> = {
  'proof-aesthetics': {
    label: 'Estetica e Qualità della Dimostrazione',
    subtitle: 'Elementary, Deep, Brute Force, Hand-waving, Morally true, Trivial',
    badgeColor: '#1E3A8A',
  },
  'objects-pathology': {
    label: 'Anatomia degli Oggetti: Canonici vs Patologici',
    subtitle: 'Pathological, Well-behaved, Canonical, Degenerate, Toy Model',
    badgeColor: '#9A3412',
  },
  'conventions-shorthand': {
    label: 'Tecniche, Notazioni e Scrittura Formale',
    subtitle: 'WLOG, Up to isomorphism, Abuse of notation, Ansatz, Abstract nonsense',
    badgeColor: '#047857',
  },
  'folklore-erdosese': {
    label: 'Folklore Accademico & «Erdősese»',
    subtitle: 'The Book, Epsilons, Curva Pericolosa di Bourbaki (☡), Halmos (∎)',
    badgeColor: '#6D28D9',
  },
};

export const MATH_JARGON_ENTRIES: MathJargonEntry[] = [
  // ==================== ESTETICA E QUALITÀ DELLA DIMOSTRAZIONE ====================
  {
    id: 'jargon-elementary',
    termEn: 'Elementary Proof',
    termIt: 'Dimostrazione Elementare',
    category: 'proof-aesthetics',
    categoryLabel: 'Estetica della Dimostrazione',
    symbolOrFormula: 'π(x) ∼ x / ln(x) senza usare ζ(s) ∈ ℂ',
    laypersonMyth:
      'Una dimostrazione facile, semplice, adatta a uno studente delle scuole elementari o superiori.',
    mathematicianReality:
      'Una dimostrazione che utilizza solo concetti di base (es. aritmetica dei numeri interi e disuguaglianze reali) senza ricorrere a macchinari superiori come l’analisi complessa o la coomologia. Spesso una dimostrazione "elementare" è infinitamente più lunga, tortuosa e difficile di quella avanzata!',
    classicExample:
      'Il Teorema dei Numeri Primi fu dimostrato nel 1896 da Hadamard e de la Vallée Poussin usando l’analisi complessa della funzione Zeta di Riemann. Per mezzo secolo si pensò fosse impossibile farne a meno, finché nel 1949 Paul Erdős e Atle Selberg trovarono una celebre "dimostrazione elementare" tecnicamente formidabile.',
    historicalOriginOrCommunity:
      'Teoria Analitica dei Numeri (G.H. Hardy, Paul Erdős, Atle Selberg).',
  },
  {
    id: 'jargon-deep',
    termEn: 'Deep Theorem',
    termIt: 'Teorema Profondo',
    category: 'proof-aesthetics',
    categoryLabel: 'Estetica della Dimostrazione',
    symbolOrFormula: 'Legge di Reciprocità Quadratica · Modularità di Wiles',
    laypersonMyth:
      'Un concetto filosoficamente misterioso o emotivamente toccante.',
    mathematicianReality:
      'Un risultato la cui dimostrazione richiede di scavare molto al di sotto della superficie dell’enunciato, svelando connessioni strutturali inaspettate tra rami della matematica apparentemente lontanissimi.',
    classicExample:
      'L’Ultimo Teorema di Fermat (xⁿ + yⁿ = zⁿ non ha soluzioni intere per n ≥ 3) ha un enunciato comprensibile a un bambino, ma è un teorema "profondo" perché la sua dimostrazione (Andrew Wiles, 1994) passa per la Congettura di Taniyama-Shimura-Weil che unisce Curve Ellittiche e Forme Modulari.',
    historicalOriginOrCommunity:
      'Carl Friedrich Gauss (che chiamò la Reciprocità Quadratica "Theorema Aureum") e G.H. Hardy (Apologia di un matematico).',
  },
  {
    id: 'jargon-morally-true',
    termEn: 'Morally True',
    termIt: 'Moralmente Vero',
    category: 'proof-aesthetics',
    categoryLabel: 'Estetica della Dimostrazione',
    symbolOrFormula: '∫ f’ = f «moralmente vero» a meno di regolarità',
    laypersonMyth:
      'Qualcosa che è eticamente giusto o buono dal punto di vista morale.',
    mathematicianReality:
      'Un’intuizione o un teorema che cattura perfettamente la ragione strutturale profonda per cui un fatto funziona, anche se nella formulazione ingenua può fallire su qualche controesempio tecnico o "patologico" che richiede ipotesi aggiuntive.',
    classicExample:
      'Dire che "la dimensione dello spazio duale V* è uguale a quella di V" è moralmente vero perché spiega la dualità lineare, anche se formalmente vale solo in dimensione finita e richiede topologie appropriate in dimensione infinita.',
    historicalOriginOrCommunity:
      'Seminari di Geometria Algebrica e Topologia del XX secolo (scuola di Parigi e Princeton).',
  },
  {
    id: 'jargon-brute-force-bash',
    termEn: 'Brute Force / Algebraic Bash / Grinding',
    termIt: 'Forza Bruta / Calcolo Muscolare («In the forehead»)',
    category: 'proof-aesthetics',
    categoryLabel: 'Estetica della Dimostrazione',
    symbolOrFormula: 'Espansione in coordinate (x₁, y₁, z₁) vs Simmetria intrinseca',
    laypersonMyth:
      'Usare la violenza fisica o rompere un oggetto.',
    mathematicianReality:
      'Risolvere un problema non tramite un’idea concettuale elegante, ma macinando pagine di calcoli algebrici spietati, derivate mostruose, coordinate cartesiane o facendo controllare migliaia di casi a un computer.',
    classicExample:
      'Nelle Olimpiadi della Matematica, "fare un coordinate bash" o "complex bash" significa piazzare un triangolo geometrico sul piano cartesiano e calcolare tutto con l’algebra. Nella scuola russa (Teorminimum di Landau) si chiama risolvere "в лоб" (in piena fronte).',
    historicalOriginOrCommunity:
      'Olimpiadi della Matematica (IMO / AoPS) e tradizione del Demidovich a Mosca.',
  },
  {
    id: 'jargon-hand-waving',
    termEn: 'Hand-waving',
    termIt: 'Dimostrazione «agitando le mani»',
    category: 'proof-aesthetics',
    categoryLabel: 'Estetica della Dimostrazione',
    symbolOrFormula: '«Per continuità è chiaro che... [agita le mani alla lavagna]»',
    laypersonMyth:
      'Salutare qualcuno con la mano.',
    mathematicianReality:
      'Saltare i passaggi tecnici di convergenza, scambio di limiti o verifica delle ipotesi sostituendoli con gesti espressivi delle mani davanti alla lavagna per trasmettere solo l’idea geometrica globale.',
    classicExample:
      'Scambiare un integrale con una serie infinita (∫ ∑ = ∑ ∫) dicendo "tanto qui tutto converge bene" senza verificare il Teorema della Convergenza Dominata di Lebesgue.',
    historicalOriginOrCommunity:
      'Gergo universale dei dipartimenti di matematica e fisica teorica.',
  },
  {
    id: 'jargon-vacuously-true',
    termEn: 'Vacuously True',
    termIt: 'Vacuamente Vero (Verità a vuoto)',
    category: 'proof-aesthetics',
    categoryLabel: 'Estetica della Dimostrazione',
    symbolOrFormula: '∀x ∈ ∅, P(x) ≡ VERO (poiché Falso ⇒ Qualsiasi cosa)',
    laypersonMyth:
      'Una frase stupida, vuota o priva di significato.',
    mathematicianReality:
      'Un’implicazione logica P ⇒ Q che risulta rigorosamente VERA semplicemente perché l’ipotesi P non è mai soddisfatta (l’insieme degli oggetti che soddisfano P è l’insieme vuoto ∅).',
    classicExample:
      'L’affermazione "Tutti i numeri primi pari maggiori di 10 sono divisibili per 7" è matematicamente VERA (vacuamente vera), perché non esiste alcun numero primo pari maggiore di 10 che possa smentirla!',
    historicalOriginOrCommunity:
      'Logica Matematica e Teoria degli Insiemi (Peano, Russell, Bourbaki).',
  },

  // ==================== OGGETTI MATEMATICI: CANONICI VS PATOLOGICI ====================
  {
    id: 'jargon-pathological',
    termEn: 'Pathological vs. Well-Behaved',
    termIt: 'Funzione Patologica vs. Ben Comportata («Nice»)',
    category: 'objects-pathology',
    categoryLabel: 'Anatomia degli Oggetti',
    symbolOrFormula: 'f(x) = ∑_{n=0}^∞ aⁿ cos(bⁿ π x) (Weierstrass, 1872)',
    laypersonMyth:
      'Una malattia medica o un disturbo psicologico.',
    mathematicianReality:
      'Un oggetto matematico perfettamente legittimo dal punto di vista logico, ma le cui proprietà controintuitive mandano in frantumi il buon senso geometrico, fungendo da controesempio estremo alle congetture ingenue.',
    classicExample:
      'Nel 1872 Karl Weierstrass costruì una funzione continua in ogni punto ma non derivabile in nessun punto (una curva fatta solo di spigoli infiniti su ogni scala frattale). Henri Poincaré protestò: "In passato si inventavano nuove funzioni per scopi pratici; oggi le si inventa di proposito per mettere in difetto i ragionamenti dei nostri padri!".',
    historicalOriginOrCommunity:
      'Crisi dei fondamenti dell’Analisi nell’Ottocento (Weierstrass, Cantor, Peano, Banach-Tarski).',
  },
  {
    id: 'jargon-canonical',
    termEn: 'Canonical / Natural',
    termIt: 'Canonico / Naturale (Senza scelte arbitrarie)',
    category: 'objects-pathology',
    categoryLabel: 'Anatomia degli Oggetti',
    symbolOrFormula: 'V ≅ V** (Canonico: v ↦ ev_v) vs V ≅ V* (Non canonico)',
    laypersonMyth:
      'Approvato dal diritto canonico della Chiesa o tradizionale.',
    mathematicianReality:
      'Una costruzione, una mappa o un isomorfismo che è univocamente determinato dalla struttura stessa degli oggetti, senza bisogno di scegliere arbitrariamente una base di coordinate. È così "scritto nella natura delle cose" che due matematici su pianeti diversi lo definirebbero nello stesso identico modo.',
    classicExample:
      'Uno spazio vettoriale di dimensione finita V è isomorfo al suo duale V*, ma per costruire l’isomorfismo devi scegliere arbitrariamente una base. Invece, V è "canonicamente isomorfo" al suo biduale V** tramite la mappa naturale v ↦ (φ ↦ φ(v)), che non dipende da alcuna base!',
    historicalOriginOrCommunity:
      'Samuel Eilenberg e Saunders Mac Lane (che nel 1945 inventarono la Teoria delle Categorie proprio per definire rigorosamente cosa significa "trasformazione naturale").',
  },
  {
    id: 'jargon-degenerate',
    termEn: 'Degenerate Case',
    termIt: 'Caso Degenere',
    category: 'objects-pathology',
    categoryLabel: 'Anatomia degli Oggetti',
    symbolOrFormula: 'x² - y² = 0 ⇔ (x-y)(x+y) = 0 (Iperbole degenere in 2 rette)',
    laypersonMyth:
      'Qualcosa di moralmente corrotto o deteriorato.',
    mathematicianReality:
      'Un caso limite in cui un parametro si annulla o assume un valore critico, facendo "collassare" un oggetto di una classe generale in un oggetto qualitativamente più semplice (e spesso privo delle proprietà generiche).',
    classicExample:
      'Un punto è un cerchio degenere di raggio r = 0; un segmento è un triangolo degenere con angoli di 180°, 0°, 0°; due rette incidenti sono un’iperbole degenere ottenuta tagliando il cono esattamente per il suo vertice.',
    historicalOriginOrCommunity:
      'Geometria delle Coniche (Apollonio di Perga, Geometria Proiettiva e Algebrica).',
  },
  {
    id: 'jargon-toy-model',
    termEn: 'Toy Model',
    termIt: 'Modello Giocattolo',
    category: 'objects-pathology',
    categoryLabel: 'Anatomia degli Oggetti',
    symbolOrFormula: 'x_{n+1} = r x_n (1 - x_n) (Mappa Logistica del Caos)',
    laypersonMyth:
      'Un modellino di plastica per bambini.',
    mathematicianReality:
      'Un sistema matematico o fisico spogliato di tutte le complicazioni accessorie del mondo reale, ridotto all’osso in modo da poter essere risolto o simulato con chiarezza, pur conservando intatto il fenomeno profondo che si vuole studiare.',
    classicExample:
      'Per capire la turbolenza atmosferica o i sistemi dinamici caotici (studiati da Lorenz e dall’IMPA di Rio), i matematici studiano la Mappa di Smale (Ferro di Cavallo) o la Mappa Logistica unidimensionale: un "toy model" semplicissimo che contiene già tutte le biforcazioni verso il caos.',
    historicalOriginOrCommunity:
      'Fisica Matematica, Meccanica Statistica (Modello di Ising) e Sistemi Dinamici.',
  },

  // ==================== TECNICHE, NOTAZIONI E SCRITTURA FORMALE ====================
  {
    id: 'jargon-wlog',
    termEn: 'Without Loss of Generality (WLOG)',
    termIt: 'Senza Perdita di Generalità (S.P.G. / WLOG)',
    category: 'conventions-shorthand',
    categoryLabel: 'Convenzioni e Scrittura',
    symbolOrFormula: '«Sia x, y ∈ ℝ. Senza perdita di generalità, supponiamo x ≤ y...»',
    laypersonMyth:
      'Parlare in modo generico o approssimativo.',
    mathematicianReality:
      'Una potente scorciatoia logica: quando un problema è simmetrico rispetto a più variabili o casi, si dimostra il teorema solo per uno di essi (es. x ≤ y), poiché gli altri casi si ottengono semplicemente rinominando le lettere o applicando una simmetria ovvia.',
    classicExample:
      'Se devi dimostrare un teorema per un triangolo qualunque nel piano cartesiano, puoi dire: "Senza perdita di generalità, trasliamo e ruotiamo il triangolo in modo che il vertice A coincida con l’origine (0,0) e il lato AB giaccia sull’asse x". Questo dimezza i calcoli senza restringere il teorema!',
    historicalOriginOrCommunity:
      'Formula canonica della prosa matematica moderna da Gauss e Hilbert in poi.',
  },
  {
    id: 'jargon-up-to-isomorphism',
    termEn: 'Up to Isomorphism / Modulo',
    termIt: 'A meno di isomorfismo / Modulo...',
    category: 'conventions-shorthand',
    categoryLabel: 'Convenzioni e Scrittura',
    symbolOrFormula: 'ℤ/4ℤ e V₄ = ℤ/2ℤ × ℤ/2ℤ (Unici 2 gruppi di ordine 4 a meno di isomorfismo)',
    laypersonMyth:
      'Un calcolo approssimativo o incompleto.',
    mathematicianReality:
      'Ignorare deliberatamente il "vestito" esteriore o i nomi degli elementi di due strutture matematiche per classificarle come lo stesso identico oggetto se hanno la stessa identica tabella di operazioni (isomorfismo) o se differiscono solo per una trasformazione nota (es. "a meno di una costante additiva + C" negli integrali).',
    classicExample:
      'Le rotazioni di 90° di un quadrato, le potenze dell’unità immaginaria {1, i, -1, -i} con la moltiplicazione e i resti {0, 1, 2, 3} dell’addizione modulo 4 sembrano tre cose diversissime, ma "a meno di isomorfismo" sono lo stesso identico gruppo ciclico C₄!',
    historicalOriginOrCommunity:
      'Algebra Astratta e Programma di Erlangen di Felix Klein (1872).',
  },
  {
    id: 'jargon-abuse-of-notation',
    termEn: 'Abuse of Notation',
    termIt: 'Abuso di Notazione',
    category: 'conventions-shorthand',
    categoryLabel: 'Convenzioni e Scrittura',
    symbolOrFormula: 'Scrivere «sia G un gruppo» invece di «sia (G, ·, e, ⁻¹) una quadrupla...»',
    laypersonMyth:
      'Un errore di calcolo o una svista grammaticale dello studente.',
    mathematicianReality:
      'L’atto consapevole e dichiarato di usare una notazione formalmente imprecisa o sintatticamente "scorretta" perché la scrittura 100% pedante appesantirebbe il testo rendendolo illeggibile, mentre il contesto rende impossibile qualsiasi ambiguità.',
    classicExample:
      'Scrivere f(x) per indicare la funzione f (mentre f(x) è il valore assunto nel punto x), oppure scrivere dy/dx come se fosse una vera frazione algebrica per ricordare la regola della catena (dy/dx = dy/du · du/dx).',
    historicalOriginOrCommunity:
      'Termine coniato e sistematizzato dal collettivo francese Nicolas Bourbaki negli Éléments de mathématique (anni ’30).',
  },
  {
    id: 'jargon-abstract-nonsense',
    termEn: 'General Abstract Nonsense (Diagram Chasing)',
    termIt: '«Assurdità Astratta Generale» (Caccia al diagramma)',
    category: 'conventions-shorthand',
    categoryLabel: 'Convenzioni e Scrittura',
    symbolOrFormula: '0 → A → B → C → 0 (Successione esatta & Lemma del Serpente)',
    laypersonMyth:
      'Un insulto rivolto a una teoria insensata o sbagliata.',
    mathematicianReality:
      'Espressione affettuosa e piena di orgoglio usata dai matematici per indicare una dimostrazione che non fa alcun calcolo concreto sugli elementi, ma deduce il risultato puramente dalle proprietà universali delle frecce in Teoria delle Categorie (caccia al diagramma / diagram chasing).',
    classicExample:
      'Dimostrare che due oggetti complessi sono isomorfi non costruendo la mappa a mano, ma dicendo: "Entrambi soddisfano la proprietà universale del prodotto fibrato, quindi per general abstract nonsense sono canonicamente isomorfi".',
    historicalOriginOrCommunity:
      'Coniato da Norman Steenrod e reso celebre da Saunders Mac Lane e Alexander Grothendieck.',
  },
  {
    id: 'jargon-ansatz',
    termEn: 'Ansatz',
    termIt: 'Ansatz (Ipotesi strutturale di partenza)',
    category: 'conventions-shorthand',
    categoryLabel: 'Convenzioni e Scrittura',
    symbolOrFormula: 'u(x,t) = X(x)·T(t) (Separazione delle variabili) · y(x) = e^{λx}',
    laypersonMyth:
      'Un tirare a indovinare alla cieca.',
    mathematicianReality:
      'Dal tedesco "posizionamento iniziale": postulare in anticipo la forma matematica di una soluzione (sulla base di simmetrie fisiche o esperienza analitica), inserirla nell’equazione differenziale e verificare che il problema si riduca a un’equazione algebrica risolvibile.',
    classicExample:
      'L’Ansatz di Bethe (1931) per trovare gli autostati esatti di una catena quantistica di spin unidimensionale, o l’Ansatz esponenziale e^{λt} che trasforma un’equazione differenziale lineare in un polinomio caratteristico.',
    historicalOriginOrCommunity:
      'Scuola tedesco-russa di Fisica Matematica (Gottinga, Zurigo, Mosca).',
  },

  // ==================== FOLKLORE ACCADEMICO & ERDŐSESE ====================
  {
    id: 'jargon-the-book-erdosese',
    termEn: 'The Book, Epsilons & The Supreme Fascist (Erdősese)',
    termIt: '«Il Libro», gli Epsilon (ε) e il Vocabolario di Paul Erdős',
    category: 'folklore-erdosese',
    categoryLabel: 'Folklore & Erdősese',
    symbolOrFormula: '∀ε > 0 (Piccolo a piacere) ⇒ I bambini sono «gli epsilon»',
    laypersonMyth:
      'Un libro stampato in libreria o una lettera dell’alfabeto greco.',
    mathematicianReality:
      'Paul Erdős aveva inventato un intero vocabolario gergale (l’Erdősese) adottato dai matematici di tutto il mondo: "Il Libro" (The Book) è il volume celeste in cui Dio (chiamato ironicamente "Il Supremo Fascista", SF, perché ci nasconde i calzini e le dimostrazioni) ha scritto le dimostrazioni più belle di ogni teorema. I bambini, essendo piccoli e preziosi come l’ε dei limiti di Analisi 1, venivano chiamati "gli epsilon".',
    classicExample:
      'Quando Erdős vedeva una dimostrazione di abbagliante semplicità e bellezza, esclamava: "Questa viene dritta dal Libro!". Nel 1998 Martin Aigner e Günter Ziegler hanno pubblicato con Springer il celebre volume "Proofs from THE BOOK", raccogliendo 40 di queste dimostrazioni perfette.',
    historicalOriginOrCommunity:
      'Paul Erdős e la rete globale del Fenomeno Ungherese.',
  },
  {
    id: 'jargon-dangerous-bend-halmos',
    termEn: 'Bourbaki Dangerous Bend (☡) & Halmos Tombstone (∎)',
    termIt: 'La «Curva Pericolosa» di Bourbaki (☡) e la Lapide di Halmos (∎)',
    category: 'folklore-erdosese',
    categoryLabel: 'Folklore & Erdősese',
    symbolOrFormula: '☡ (Attenzione: trappola logica!) · ∎ (Fine della dimostrazione)',
    laypersonMyth:
      'Simboli decorativi casuali a margine o fine pagina.',
    mathematicianReality:
      'Due icone tipografiche create da grandi matematici del ’900: 1) Il collettivo francese Nicolas Bourbaki inseriva a margine dei suoi trattati il segnale stradale di "curva pericolosa" (☡, ripreso poi da Donald Knuth in TeX) per avvertire il lettore di un passaggio dove è facilissimo cadere in un errore sottile; 2) L’ungherese-americano Paul Halmos introdusse nel 1950 il quadratino nero ∎ ("tombstone" o "halmos") al posto del latino Q.E.D. (Quod Erat Demonstrandum).',
    classicExample:
      'Donald Knuth nei suoi manuali di TeX e in "The Art of Computer Programming" usa addirittura la "doppia curva pericolosa" (☡☡) per i paragrafi tecnicamente più insidiosi.',
    historicalOriginOrCommunity:
      'Nicolas Bourbaki (Parigi), Paul Halmos (Budapest/USA) e Donald Knuth (Stanford).',
  },
  {
    id: 'jargon-folklore-theorem',
    termEn: 'Mathematical Folklore',
    termIt: 'Teorema del Folklore',
    category: 'folklore-erdosese',
    categoryLabel: 'Folklore & Erdősese',
    symbolOrFormula: '«È ben noto nel folklore che...» (Citazione nei paper di ricerca)',
    laypersonMyth:
      'Leggende popolari, balli tradizionali o superstizioni sui numeri.',
    mathematicianReality:
      'Un teorema vero e importante che circola oralmente tra i ricercatori di un settore (nei corridoi dei dipartimenti, alle conferenze o nei caffè matematici) ed è dato per scontato dagli esperti, ma di cui nessuno sa indicare chi lo abbia dimostrato per primo su una rivista ufficiale.',
    classicExample:
      'Il "Folk Theorem" nella Teoria dei Giochi (sui giochi ripetuti all’infinito): negli anni ’50 tutti i matematici della RAND Corporation e di Princeton lo conoscevano e lo usavano a voce, molto prima che qualcuno decidesse di scriverlo in un articolo.',
    historicalOriginOrCommunity:
      'Comunità di ricerca di Princeton, RAND Corporation, Mosca e Parigi.',
  },
];
