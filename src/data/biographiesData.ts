export interface MathematicianBiography {
  id: string;
  name: string;
  lifespan: string;
  eraId: string;
  eraLabel: string;
  regionAndSchool: string;
  primaryFields: string[];
  iconicFormula: string;
  keyBreakthroughs: string;
  humanStoryAndAnecdote: string;
  modernApplicationLink: string;
  mactutorUrl: string;
  wikipediaUrl: string;
}

export const MATHEMATICIAN_BIOGRAPHIES: MathematicianBiography[] = [
  {
    id: 'ahmes',
    name: 'Ahmes (Ahmose)',
    lifespan: 'c. 1680 – 1620 a.C.',
    eraId: 'era-2',
    eraLabel: 'Antico Egitto (Secondo Periodo Intermedio)',
    regionAndSchool: 'Tebe, Valle del Nilo — Corporazione degli Scribi Egizi',
    primaryFields: ['Aritmetica delle frazioni unitarie', 'Geometria agrimensoria'],
    iconicFormula: '2/n = 1/a + 1/b + 1/c · A ≈ (8/9 d)²',
    keyBreakthroughs:
      'Autore materiale del Papiro di Rhind, il più esteso trattato matematico dell’antichità giunto fino a noi: 84 problemi su divisioni proporzionali, equazioni lineari ("Aha"), volumi di granai e pendenza delle piramidi (seqed).',
    humanStoryAndAnecdote:
      'Ahmes è il primo individuo nella storia umana il cui nome sia associato a un testo matematico. Si firma con umiltà e orgoglio come colui che ha copiato un papiro ancora più antico del Medio Regno, regalandoci la finestra più limpida sulla mente degli scribi del Nilo.',
    modernApplicationLink:
      'L’algoritmo di moltiplicazione per raddoppi successivi documentato da Ahmes è identico all’algoritmo "square-and-multiply" usato nei processori moderni e nella crittografia RSA.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Ahmes/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Ahmes',
  },
  {
    id: 'archimedes',
    name: 'Archimede di Siracusa',
    lifespan: '287 – 212 a.C.',
    eraId: 'era-3',
    eraLabel: 'Età Ellenistica (Magna Grecia)',
    regionAndSchool: 'Siracusa (Sicilia) & Corrispondenza con Alessandria',
    primaryFields: ['Metodo di Esaustione (Pre-Calcolo)', 'Idrostatica', 'Meccanica Geometrica'],
    iconicFormula: 'V_sfera = ⅔ V_cilindro = 4/3 πr³ · 3 + 10/71 < π < 3 + 1/7',
    keyBreakthroughs:
      'Calcolò l’area del segmento parabolico, il volume e la superficie della sfera, la spirale di Archimede e il principio di galleggiamento, anticipando di quasi duemila anni il calcolo integrale con il "Metodo dei Teoremi Meccanici".',
    humanStoryAndAnecdote:
      'Corrispondeva regolarmente con Eratostene e Conone ad Alessandria; talvolta inseriva nelle lettere qualche teorema falso "come trappola" per smascherare i matematici vanitosi che sostenevano di aver dimostrato tutto da soli. Volle sulla sua tomba una sfera inscritta in un cilindro.',
    modernApplicationLink:
      'Ingegneria navale, calcolo integrale di superfici 3D (mesh poligonali nei motori grafici) e statica strutturale.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Archimedes/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Archimedes',
  },
  {
    id: 'liu-hui',
    name: 'Liu Hui',
    lifespan: 'c. 220 – 280 d.C.',
    eraId: 'era-3',
    eraLabel: 'Regno di Wei / Cina Antica',
    regionAndSchool: 'Cina Settentrionale — Tradizione dei Nove Capitoli (Jiuzhang Suanshu)',
    primaryFields: ['Algebra Lineare (Fangcheng)', 'Geometria Solida', 'Approssimazione di π'],
    iconicFormula: 'Poligono a 3072 lati ⇒ π ≈ 3.14159 · Principio di Liu Hui-Cavalieri',
    keyBreakthroughs:
      'Nel 263 d.C. scrisse il commentario fondamentale ai "Nove Capitoli", dimostrando rigorosamente gli algoritmi fino ad allora accettati senza prova, giustificando l’eliminazione gaussiana sulle matrici e l’aritmetica dei numeri negativi.',
    humanStoryAndAnecdote:
      'Rifiutò di assumere come valore di π la rozza approssimazione tradizionale uguale a 3 ("la circonferenza è tre volte il diametro"), inscrivendo poligoni fino a 3072 lati e scrivendo: "Lasciamo questa fatica a chi verrà dopo di noi, perché chi taglia sempre più finemente finirà per coincidere col cerchio".',
    modernApplicationLink:
      'Risoluzione di grandi sistemi lineari sparsi nell’ingegneria civile, nella topografia (il suo "Manuale Matematico dell’Isola Marina") e nel calcolo scientifico.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Liu_Hui/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Liu_Hui',
  },
  {
    id: 'al-khwarizmi',
    name: 'Muhammad ibn Musa al-Khwarizmi',
    lifespan: 'c. 780 – 850 d.C.',
    eraId: 'era-4',
    eraLabel: 'Età dell’Oro Islamica',
    regionAndSchool: 'Baghdad — Casa della Sapienza (Bayt al-Hikma)',
    primaryFields: ['Algebra', 'Algoritmica Decimale', 'Astronomia e Geografia Matematica'],
    iconicFormula: 'al-jabr (x² + bx = c) & al-muqabala · Algoritmi posizionali in base 10',
    keyBreakthroughs:
      'Fondò l’Algebra come disciplina indipendente dalla geometria e dall’aritmetica nel "Kitab al-mukhtasar fi hisab al-jabr wa’l-muqabala" e introdusse in Occidente il sistema numerico posizionale indiano con lo zero.',
    humanStoryAndAnecdote:
      'Nato nella regione del Khwarazm (nell’odierno Uzbekistan), diresse la biblioteca e l’osservatorio del califfo al-Ma’mun a Baghdad. Dichiara nell’introduzione della sua Algebra di aver scritto l’opera per aiutare il popolo nei "casi di eredità, partizioni, processi legali, commercio e scavo di canali".',
    modernApplicationLink:
      'Ogni "Algoritmo" informatico porta letteralmente il suo nome (Algoritmi), mentre ogni manipolazione simbolica porta il titolo del suo libro (Algebra).',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Al-Khwarizmi',
  },
  {
    id: 'madhava',
    name: 'Madhava di Sangamagrama',
    lifespan: 'c. 1340 – 1425 d.C.',
    eraId: 'era-4',
    eraLabel: 'Scuola del Kerala (India Medievale)',
    regionAndSchool: 'Sangamagrama (Irinjalakuda), Kerala — India Meridionale',
    primaryFields: ['Serie Infinite di Potenze', 'Trigonometria Analitica', 'Pre-Calcolo'],
    iconicFormula: 'arctan(x) = x - x³/3 + x⁵/5 - x⁷/7 + ... · π = √12 ∑ (-3)^{-k}/(2k+1)',
    keyBreakthroughs:
      'Fondatore della Scuola di Astronomia e Matematica del Kerala; scoprì gli sviluppi in serie infinita delle funzioni trigonometriche e i termini correttivi di resto razionale per accelerare la convergenza di π fino a 11 cifre decimali.',
    humanStoryAndAnecdote:
      'I suoi teoremi ci sono giunti attraverso i commentari dei suoi discepoli (Nilakantha e Jyesthadeva), scritti in versi sanscriti su foglie di palma dove i numeri erano codificati come parole poetiche tramite il sistema Katapayadi.',
    modernApplicationLink:
      'Approssimazione numerica ad alta precisione delle funzioni elementari nelle unità in virgola mobile (FPU) dei processori.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Madhava/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Madhava_of_Sangamagrama',
  },
  {
    id: 'tartaglia-cardano-bombelli',
    name: 'Niccolò Tartaglia, Gerolamo Cardano & Raffaele Bombelli',
    lifespan: '1499 – 1576 d.C.',
    eraId: 'era-5',
    eraLabel: 'Rinascimento Italiano (I Cossisti)',
    regionAndSchool: 'Brescia, Venezia, Milano e Bologna — Scuole d’Abaco e Università',
    primaryFields: ['Equazioni Algebriche di 3° e 4° Grado', 'Numeri Complessi', 'Probabilità nei Dadi'],
    iconicFormula: 'x = ∛(q/2 + √((q/2)² + (p/3)³)) + ∛(q/2 - √((q/2)² + (p/3)³))',
    keyBreakthroughs:
      'Risoluzione generale delle equazioni cubiche e quartiche (pubblicate nell’Ars Magna di Cardano nel 1545) e formalizzazione delle regole di calcolo con l’unità immaginaria ("più di meno" +i e "meno di meno" -i) nell’Algebra di Bombelli (1572).',
    humanStoryAndAnecdote:
      'Tartaglia ("il balbuziente"), cresciuto in estrema povertà, imparò l’alfabeto fino alla lettera K perché la madre non aveva più soldi per pagare il maestro; usò le lapidi del cimitero come lavagne. La sua contesa furibonda con Cardano e Lodovico Ferrari culminò nel celebre duello pubblico di Milano del 10 agosto 1548.',
    modernApplicationLink:
      'I numeri complessi nati da quella disputa sono oggi il pilastro dell’elettrotecnica, delle telecomunicazioni (FFT), del controllo automatico e della meccanica quantistica.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Bombelli/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Raffaele_Bombelli',
  },
  {
    id: 'euler',
    name: 'Leonhard Euler (Eulero)',
    lifespan: '1707 – 1783',
    eraId: 'era-6',
    eraLabel: 'Illuminismo e Accademie Reali',
    regionAndSchool: 'Basilea (Svizzera), San Pietroburgo (Russia) e Berlino (Prussia)',
    primaryFields: ['Analisi Infinitesimale', 'Teoria dei Numeri', 'Teoria dei Grafi', 'Meccanica dei Fluidi'],
    iconicFormula: 'e^{iπ} + 1 = 0 · ζ(s) = ∑ n^{-s} = ∏ (1 - p^{-s})^{-1}',
    keyBreakthroughs:
      'Il matematico più prolifico per numero di pagine della storia (Opera Omnia in oltre 80 volumi in quarto). Fondò la Teoria dei Grafi (Ponti di Königsberg), la Topologia poliedrica, il Calcolo delle Variazioni, la funzione φ(n) della crittografia e la moderna notazione matematica.',
    humanStoryAndAnecdote:
      'Allievo prediletto di Johann Bernoulli a Basilea, divenne completamente cieco negli ultimi 17 anni di vita a San Pietroburgo: lungi dal fermarsi, la sua produttività raddoppiò grazie a una memoria fotografica prodigiosa ("Ora avrò meno distrazioni", commentò). Calcolava a mente fino alla cinquantesima potenza.',
    modernApplicationLink:
      'Il Teorema di Eulero-Fermat (a^{φ(n)} ≡ 1 mod n) è il cuore esatto dell’algoritmo crittografico RSA; gli angoli di Eulero e le equazioni di Eulero governano l’aerodinamica e il volo dei droni.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Euler/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Leonhard_Euler',
  },
  {
    id: 'gauss-riemann',
    name: 'Carl Friedrich Gauss & Bernhard Riemann',
    lifespan: '1777 – 1855 (Gauss) · 1826 – 1866 (Riemann)',
    eraId: 'era-7',
    eraLabel: 'L’Età d’Oro di Gottinga (Ottocento)',
    regionAndSchool: 'Università di Gottinga, Germania',
    primaryFields: ['Teoria dei Numeri', 'Geometria Differenziale e Riemanniana', 'Analisi Complessa', 'Statistica'],
    iconicFormula: 'ds² = g_{ij}dx^i dx^j · ζ(s) = 0 ⇒ Re(s) = ½ (Ipotesi di Riemann)',
    keyBreakthroughs:
      'Gauss ("Princeps Mathematicorum") rivoluzionò l’aritmetica modulare (Disquisitiones Arithmeticae a 21 anni), la statistica (Minimi Quadrati e Gaussiana) e la curvatura intrinseca delle superfici. Il suo allievo Riemann creò le varietà riemanniane a n dimensioni, l’integrale di Riemann e legò i numeri primi agli zeri complessi della funzione Zeta.',
    humanStoryAndAnecdote:
      'Figlio di un muratore, a 3 anni Gauss corresse a mente i conti delle paghe del padre; a 7 anni stupì il maestro sommando istantaneamente i numeri da 1 a 100 in 50 coppie da 101 (= 5050). Riemann, di salute fragilissima, morì a soli 39 anni a Selasca sul Lago Maggiore in Italia, lasciando negli appunti il più famoso problema aperto della matematica (l’Ipotesi di Riemann).',
    modernApplicationLink:
      'Relatività Generale, navigazione satellitare GPS, Regressione e Processi Gaussiani nel Machine Learning, distribuzione dei numeri primi in crittografia.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Riemann/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Bernhard_Riemann',
  },
  {
    id: 'galois-noether',
    name: 'Évariste Galois & Emmy Noether',
    lifespan: '1811 – 1832 (Galois) · 1882 – 1935 (Noether)',
    eraId: 'era-8',
    eraLabel: 'La Rivoluzione dell’Algebra Astratta',
    regionAndSchool: 'Parigi (Francia) & Gottinga (Germania) / Bryn Mawr (USA)',
    primaryFields: ['Teoria dei Gruppi e di Galois', 'Algebra Commutativa (Anelli e Ideali)', 'Fisica Teorica'],
    iconicFormula: 'Gal(E/F) risolubile ⇔ equazione risolvibile per radicali · Simmetria ⇔ Conservazione',
    keyBreakthroughs:
      'Galois creò a 19 anni il concetto di Gruppo e di Campo Finito (Campi di Galois). Un secolo dopo, a Gottinga, Emmy Noether (definita da Einstein e Alexandrov "la più grande genio matematico femminile della storia") rifondò l’intera algebra astratta su base assiomatica e dimostrò il Teorema di Noether per la fisica.',
    humanStoryAndAnecdote:
      'La notte del 29 maggio 1832, prima di un duello mortale alla pistola a 20 anni, Galois scrisse una febbrile lettera-testamento a Chevalier annotando a margine "Non ho tempo! Non ho tempo!". Emmy Noether insegnò per anni a Gottinga senza stipendio (sotto il nome di Hilbert, perché la legge prussiana vietava alle donne la cattedra), circondata dai suoi devotissimi allievi soprannominati "i ragazzi di Noether" (Noether-Knaben).',
    modernApplicationLink:
      'I Campi di Galois GF(2^n) sono alla base della crittografia AES e dei codici QR; l’algebra commutativa e omologica di Noether è la spina dorsale della topologia algebrica e della fisica moderna.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Noether_Emmy/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Emmy_Noether',
  },
  {
    id: 'ramanujan',
    name: 'Srinivasa Ramanujan',
    lifespan: '1887 – 1920',
    eraId: 'era-8',
    eraLabel: 'Intuizione Indiana & Collaborazione di Cambridge',
    regionAndSchool: 'Kumbakonam / Madras (India) & Trinity College, Cambridge (UK)',
    primaryFields: ['Teoria Analitica dei Numeri', 'Funzioni Partizione', 'Forme Modulari & Mock Theta Functions'],
    iconicFormula: '1/π = (2√2 / 9801) ∑ [(4k)!(1103 + 26390k)] / [(k!)⁴ 396^{4k}]',
    keyBreakthroughs:
      'Autodidatta cresciuto nella povertà del Tamil Nadu, riempì tre taccuini con quasi 3900 identità, serie ipergeometriche, frazioni continue e proprietà della funzione di partizione p(n), molte delle quali sono state comprese e dimostrate solo decenni dopo la sua morte.',
    humanStoryAndAnecdote:
      'Nel gennaio 1913 spedì da Madras una lettera di 9 pagine a G.H. Hardy a Cambridge piena di formule incredibili: Hardy disse che "dovevano essere vere, perché se non lo fossero state nessuno avrebbe avuto l’immaginazione per inventarle". Quando Hardy andò a trovarlo in ospedale con il taxi numero 1729 dicendo che era un numero banale, Ramanujan rispose all’istante: "No, Hardy! È il più piccolo numero esprimibile come somma di due cubi in due modi diversi (1³+12³ = 9³+10³)".',
    modernApplicationLink:
      'La sua serie per 1/π è alla base degli algoritmi moderni (Chudnovsky) per calcolare trilioni di cifre di π; i "Grafi di Ramanujan" sono reti espansive ottimali usate in informatica e crittografia post-quantistica.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Ramanujan/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Srinivasa_Ramanujan',
  },
  {
    id: 'von-neumann-erdos',
    name: 'John von Neumann & Paul Erdős',
    lifespan: '1903 – 1957 (von Neumann) · 1913 – 1996 (Erdős)',
    eraId: 'era-8',
    eraLabel: 'Il Fenomeno Ungherese: "I Marziani" & Il Nomade dei Numeri',
    regionAndSchool: 'Budapest (Fasori Gimnázium / KöMaL) & IAS Princeton / Mondo Intero',
    primaryFields: ['Architettura dei Computer, Teoria dei Giochi, Quantistica', 'Combinatoria, Teoria dei Grafi, Teoria dei Numeri'],
    iconicFormula: 'v(A) = max_x min_y x^T A y · Numero di Erdős (Grafo di collaborazione)',
    keyBreakthroughs:
      'Le due facce complementari del miracolo di Budapest: von Neumann formalizzò assiomaticamente la Meccanica Quantistica (algebre di von Neumann), creò la Teoria dei Giochi, gli automi cellulari, il metodo Monte Carlo (con Ulam) e l’architettura dei computer moderni. Erdős pubblicò oltre 1500 paper con 511 coautori fondando la teoria dei grafi casuali e la combinatoria probabilistica.',
    humanStoryAndAnecdote:
      'Cresciuti entrambi risolvendo i problemi della rivista liceale ungherese KöMaL. Erdős non ebbe mai una casa né un conto in banca fisso: viaggiava da un continente all’altro con una valigia mezza vuota bussando alla porta dei colleghi ("La mia mente è aperta!"), convinto che Dio custodisse "Il Libro" (The Book) con le dimostrazioni più eleganti di ogni teorema.',
    modernApplicationLink:
      'Ogni computer su cui gira questo codice è una macchina di von Neumann; ogni algoritmo di analisi delle reti sociali, biologiche o neurali usa la teoria dei grafi di Erdős.',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Von_Neumann/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Paul_Erd%C5%91s',
  },
  {
    id: 'turing-kolmogorov',
    name: 'Alan Turing & Andrey Kolmogorov',
    lifespan: '1912 – 1954 (Turing) · 1903 – 1987 (Kolmogorov)',
    eraId: 'era-9',
    eraLabel: 'Criptoanalisi, Informatica Teorica e Scuola Sovietica',
    regionAndSchool: 'Cambridge & Bletchley Park (UK) · Università Statale di Mosca (URSS)',
    primaryFields: ['Calcolabilità, Criptoanalisi, Intelligenza Artificiale', 'Probabilità Assiomatica, Complessità, Turbolenza e KAM'],
    iconicFormula: 'Problema della Fermata indecidibile · Complessità di Kolmogorov K(s) = min |p|',
    keyBreakthroughs:
      'Turing definì matematicamente cosa significa "calcolare" (Macchina di Turing, 1936), guidò la decrittazione di Enigma a Bletchley Park, pose le basi dell’Intelligenza Artificiale (1950) e persino della morfogenesi biologica. A Mosca, Kolmogorov rifondò il calcolo delle probabilità, la teoria dei sistemi dinamici (Teorema KAM), la complessità algoritmica e creò i Math Circles e il collegio-scuola n. 18 per giovani talenti.',
    humanStoryAndAnecdote:
      'Turing correva maratone a livello quasi olimpico per scaricare la tensione di Bletchley Park, viaggiando talvolta di corsa per 60 km fino a Londra per le riunioni. Kolmogorov amava sciare per decine di chilometri nei boschi innevati fuori Mosca discutendo di topologia e poesia russa con i suoi studenti.',
    modernApplicationLink:
      'Fondamenti teorici di tutti i linguaggi di programmazione, della sicurezza crittografica e delle architetture di Machine Learning moderno (Reti di Kolmogorov-Arnold KAN e modelli probabilistici).',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Turing/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Andrey_Kolmogorov',
  },
  {
    id: 'grothendieck-mirzakhani-scholze',
    name: 'Alexander Grothendieck, Maryam Mirzakhani & Peter Scholze',
    lifespan: '1928–2014 (Grothendieck) · 1977–2017 (Mirzakhani) · 1987–Oggi (Scholze)',
    eraId: 'era-10',
    eraLabel: 'La Frontiera Contemporanea (Parigi, Teheran/Stanford, Bonn)',
    regionAndSchool: 'IHÉS Parigi (Francia) · Sharif Univ. / Stanford (Iran/USA) · Univ. di Bonn (Germania)',
    primaryFields: ['Geometria Algebrica (Schemi e Topoi)', 'Geometria Iperbolica e Dinamica degli Spazi dei Moduli', 'Geometria Aritmetica (Spazi Perfettoidi)'],
    iconicFormula: 'Spec(R) (Schema affine) · Vol(M_{g,n}(L)) (Polinomi di Mirzakhani) · Spazi Perfettoidi',
    keyBreakthroughs:
      'Grothendieck rivoluzionò la geometria algebrica unificando aritmetica e geometria con la teoria degli Schemi. Maryam Mirzakhani (prima donna e prima iraniana a vincere la Medaglia Fields nel 2014, formata nelle Olimpiadi e alla Sharif University) svelò la dinamica delle geodetiche sulle superfici di Riemann iperboliche. Peter Scholze (Medaglia Fields 2018 a Bonn) ha introdotto gli spazi perfettoidi e guidato la verifica formale al computer in Lean 4.',
    humanStoryAndAnecdote:
      'Mirzakhani lavorava stendendo sul pavimento di casa enormi fogli di carta bianca su cui disegnava superfici iperboliche a colori: sua figlia di 3 anni, vedendola, diceva agli amici "La mamma fa la pittrice!".',
    modernApplicationLink:
      'Crittografia post-quantistica, teoria delle stringhe quantistiche, codici geometrico-algebrici e verifica formale assistita dall’IA (Lean 4 / Mathlib).',
    mactutorUrl: 'https://mathshistory.st-andrews.ac.uk/Biographies/Mirzakhani/',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Maryam_Mirzakhani',
  },
];
