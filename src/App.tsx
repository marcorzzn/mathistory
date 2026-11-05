/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  MACRO_ERAS,
  TIMELINE_MILESTONES,
  TimelineMilestone,
} from './data/timelineData';
import {
  MATH_COMMUNITIES_PINS,
  MathCommunityPin,
} from './data/communitiesMapData';
import {
  MATHEMATICIAN_BIOGRAPHIES,
  MathematicianBiography,
} from './data/biographiesData';
import {
  CODICE_BUDAPEST_RULES,
  GLOBAL_SCHOOLS_COMPARISON,
  VIDEO_DOCUMENTARIES,
} from './data/schoolsAndResourcesData';
import { Artifact3DMode, ThreeSpatialAtlas } from './components/ThreeSpatialAtlas';
import { InteractiveWorldMap } from './components/InteractiveWorldMap';
import { DisciplineEvolutionGraph } from './components/DisciplineEvolutionGraph';
import { MathJargonExplorer } from './components/MathJargonExplorer';
import {
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Play,
  Search,
} from 'lucide-react';

export default function App() {
  // 3D Observatory State
  const [artifact3DMode, setArtifact3DMode] = useState<Artifact3DMode>('globe');
  const [is3DFullScreen, setIs3DFullScreen] = useState<boolean>(false);

  // Timeline State
  const [selectedEraId, setSelectedEraId] = useState<string>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(
    TIMELINE_MILESTONES[0]
  );
  const [timelineSearch, setTimelineSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Map Community Pin State
  const [selectedPin, setSelectedPin] = useState<MathCommunityPin>(
    MATH_COMMUNITIES_PINS[0]
  );

  // Biographies State
  const [bioEraFilter, setBioEraFilter] = useState<string>('all');
  const [selectedBio, setSelectedBio] = useState<MathematicianBiography>(
    MATHEMATICIAN_BIOGRAPHIES[10] // Von Neumann & Erdos default highlight
  );

  // Schools & Resources Tab State
  const [activeResourceTab, setActiveResourceTab] = useState<
    'syllabi' | 'documentari' | 'codice-budapest'
  >('syllabi');
  const [checkedRules, setCheckedRules] = useState<Record<string, boolean>>({
    '01': true,
    '02': true,
  });

  const filteredMilestones = useMemo(() => {
    return TIMELINE_MILESTONES.filter((m) => {
      if (selectedEraId !== 'all' && m.eraId !== selectedEraId) return false;
      if (timelineSearch.trim() !== '') {
        const q = timelineSearch.toLowerCase();
        const match =
          m.title.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          m.region.toLowerCase().includes(q) ||
          m.discipline.toLowerCase().includes(q) ||
          m.etymologyAndPracticalOrigin.toLowerCase().includes(q) ||
          m.modernApplications.some((app) => app.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [selectedEraId, timelineSearch]);

  const filteredBiographies = useMemo(() => {
    if (bioEraFilter === 'all') return MATHEMATICIAN_BIOGRAPHIES;
    return MATHEMATICIAN_BIOGRAPHIES.filter((b) => b.eraId === bioEraFilter);
  }, [bioEraFilter]);

  const handleSelectMilestone = (m: TimelineMilestone) => {
    setSelectedMilestone(m);
    const era = MACRO_ERAS.find((e) => e.id === m.eraId);
    if (era) {
      setArtifact3DMode(era.artifact3DMode);
    }
  };

  const handleCopyMarkdownCard = (m: TimelineMilestone) => {
    const md = `## ${m.title}
* **Epoca Storica:** ${m.yearLabel} (${m.eraId.toUpperCase()})
* **Collocazione Geografica:** ${m.region} (${m.modernCountry})
* **Tipologia di Comunità:** ${m.communityType}
* **Disciplina & Formula Chiave:** ${m.discipline} — \`${m.keyFormulaOrNotation}\`

### Origine Pratica ed Etimologia
${m.etymologyAndPracticalOrigin}

### Il Contesto Antropologico e Sociale
${m.anthropologicalContext}

### Trasmissione della Conoscenza e Cultura Diffusa
${m.knowledgeTransmission}

### Il "Caso Studio" o l'Aneddoto Chiave
> ${m.caseStudyAnecdote}

### Eredità Storica, Applicazioni Oggi e Fonti
* **Cosa ci resta:** ${m.historicalLegacy}
* **Applicazioni Moderne:** ${m.modernApplications.join('; ')}
* **Fonti:** ${m.sources.map((s) => `${s.title} (${s.url})`).join(' | ')}
`;
    navigator.clipboard?.writeText(md);
    setCopiedId(m.id);
    window.setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917]">
      {/* ==================== STRICT 3-ZONE TOP NAVIGATION BAR ==================== */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 border-b border-stone-300/80 px-6 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="text-2xl font-serif-display font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 flex items-baseline gap-2"
        >
          <span>Mathistory</span>
          <span className="text-[11px] font-mono-tabular uppercase tracking-widest text-amber-800 font-semibold hidden sm:inline">
            Atlante & Lessico
          </span>
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <a
            href="#cronologia"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Cronologia
          </a>
          <a
            href="#mappa"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Cartografia Comunità
          </a>
          <a
            href="#grafo"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Grafo Discipline
          </a>
          <a
            href="#gergo"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Gergo & Folklore
          </a>
          <a
            href="#biografie"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Biografie & Scuole
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setIs3DFullScreen(true)}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            Osservatorio 3D
          </button>
        </div>
      </header>

      {/* ==================== HERO & 3D SPATIAL OBSERVATORY ==================== */}
      <section id="top" className="max-w-[1380px] mx-auto px-6 pt-10 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Columns: Editorial Curatorial Introduction */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white/80 border border-stone-200/90 rounded-2xl p-6 lg:p-8 shadow-xs">
            <div className="space-y-4">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-amber-800 font-semibold">
                MATHISTORY · ATLANTE STORICO, GEOGRAFICO E GERGO MATEMATICO
              </div>

              <h1 className="text-4xl lg:text-[44px] font-serif-display font-bold text-stone-900 leading-[1.08] text-balance">
                Storia, Geografia dei Cenacoli e Lessico Segreto della Matematica
              </h1>

              <p className="text-sm lg:text-base text-stone-700 leading-relaxed">
                <strong>Mathistory</strong> esplora la matematica come ecosistema vivente: dalle
                tacche paleolitiche di Ishango e la <em>geo-metria</em> del Nilo fino ai
                circoli matematici, alle reti crittografiche e all’IA moderna, includendo la
                cartografia interattiva (dal Mondo fino alla Campania) e il celebre{' '}
                <em>Glossary of Mathematical Jargon</em> con il dialetto di Paul Erdős.
              </p>
            </div>

            {/* Key Curatorial Metrics (Unboxed with separators) */}
            <div className="border-t border-b border-stone-200 py-4 grid grid-cols-4 gap-3">
              <div>
                <div className="text-xl lg:text-2xl font-serif-display font-bold text-stone-900 font-mono-tabular">
                  10 Ere
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5">
                  20.000 a.C. – 2030+
                </div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-serif-display font-bold text-stone-900 font-mono-tabular">
                  4 Mappe
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5">
                  Mondo · UE · IT · Campania
                </div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-serif-display font-bold text-stone-900 font-mono-tabular">
                  17 Lemmi
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5">
                  Gergo & Erdősese
                </div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-serif-display font-bold text-stone-900 font-mono-tabular">
                  5 Livelli
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5">
                  Grafo Discipline
                </div>
              </div>
            </div>

            {/* Quick Navigation Actions */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="#mappa"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Esplora Cartografia (Mondo → Campania)
                </a>
                <a
                  href="#gergo"
                  className="px-4 py-2.5 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200/90 border border-amber-300/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Glossary of Mathematical Jargon
                </a>
                <a
                  href="#cronologia"
                  className="px-3.5 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Cronologia 10 Ere
                </a>
              </div>

              <div className="text-xs text-stone-500">
                Fonti primarie:{' '}
                <a
                  href="https://mathshistory.st-andrews.ac.uk/HistTopics/History_overview/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-stone-900"
                >
                  MacTutor (St Andrews)
                </a>{' '}
                ·{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Glossary_of_mathematical_jargon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-stone-900"
                >
                  Glossary of Mathematical Jargon
                </a>{' '}
                ·{' '}
                <a
                  href="https://en.wikipedia.org/wiki/History_of_mathematics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-stone-900"
                >
                  History of Mathematics
                </a>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Interactive Three.js 3D Spatial Observatory */}
          <div className="lg:col-span-7">
            <ThreeSpatialAtlas
              activeMode={artifact3DMode}
              onModeChange={setArtifact3DMode}
              selectedPinId={selectedPin.id}
              onSelectPin={(pin) => {
                setSelectedPin(pin);
                const mapEl = document.getElementById('mappa');
                if (mapEl && !is3DFullScreen) {
                  mapEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              isFullScreenModal={is3DFullScreen}
              onToggleFullScreen={() => setIs3DFullScreen((prev) => !prev)}
            />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 01: INTERACTIVE HISTORICAL TIMELINE (10 ERAS) ==================== */}
      <section
        id="cronologia"
        className="border-t border-stone-300 bg-[#F4EFE6] py-16 px-6"
      >
        <div className="max-w-[1380px] mx-auto space-y-8">
          {/* Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-amber-900">
                01. CRONOLOGIA ENCICLOPEDICA IN 10 MACRO-ERE
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif-display font-bold text-stone-900 mt-1">
                Sequenza degli Sviluppi Matematici e Schede Antropologiche
              </h2>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={timelineSearch}
                onChange={(e) => setTimelineSearch(e.target.value)}
                placeholder="Cerca epoca, concetto, applicazione (es. crittografia, matrici)..."
                className="pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900 w-72 sm:w-80"
              />
            </div>
          </div>

          {/* 10 Macro-Eras Selector Rail */}
          <div className="bg-white border border-stone-200 rounded-xl p-3 shadow-xs overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              <button
                type="button"
                onClick={() => setSelectedEraId('all')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedEraId === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Tutte le 10 Ere ({TIMELINE_MILESTONES.length} Nodi)
              </button>
              {MACRO_ERAS.map((era) => {
                const isSelected = selectedEraId === era.id;
                return (
                  <button
                    key={era.id}
                    type="button"
                    onClick={() => {
                      setSelectedEraId(era.id);
                      setArtifact3DMode(era.artifact3DMode);
                      const firstInEra = TIMELINE_MILESTONES.find((m) => m.eraId === era.id);
                      if (firstInEra) setSelectedMilestone(firstInEra);
                    }}
                    className={`px-3.5 py-2 text-left rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-amber-900 text-white shadow-xs'
                        : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border border-stone-200/80'
                    }`}
                  >
                    <div className="text-[11px] font-mono-tabular opacity-80">
                      ERA {era.number} · {era.period}
                    </div>
                    <div className="text-xs font-semibold">
                      {era.title.split(':')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Macro-Era Banner if filtered */}
          {selectedEraId !== 'all' && (
            <div className="bg-stone-900 text-stone-100 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
              {(() => {
                const era = MACRO_ERAS.find((e) => e.id === selectedEraId)!;
                return (
                  <>
                    <div className="max-w-3xl space-y-1">
                      <div className="text-xs font-mono-tabular text-amber-400">
                        MACRO-ERA {era.number} · {era.period} · PARADIGMA: {era.dominantParadigm}
                      </div>
                      <h3 className="text-xl font-serif-display font-bold text-white">
                        {era.title} — {era.subtitle}
                      </h3>
                      <p className="text-xs text-stone-300 leading-relaxed">{era.summary}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setArtifact3DMode(era.artifact3DMode);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 text-xs font-medium bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
                    >
                      Ispeziona Reperto 3D dell’Era
                    </button>
                  </>
                );
              })()}
            </div>
          )}

          {/* Split Layout: Timeline Milestone Rail (Left 5 Cols) + Encyclopedic Monograph Card (Right 7 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Columns: Chronological Sequence Rail */}
            <div className="lg:col-span-5 space-y-3">
              {filteredMilestones.map((m, idx) => {
                const isSelected = m.id === selectedMilestone.id;
                const eraObj = MACRO_ERAS.find((e) => e.id === m.eraId);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelectMilestone(m)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                        : 'bg-white text-stone-900 border-stone-200/90 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular mb-1">
                      <span className={isSelected ? 'text-amber-300 font-semibold' : 'text-amber-900 font-semibold'}>
                        {String(idx + 1).padStart(2, '0')} · {m.yearLabel}
                      </span>
                      <span className={isSelected ? 'text-stone-400' : 'text-stone-500'}>
                        Era {eraObj?.number} · {m.modernCountry}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif-display font-bold leading-snug">
                      {m.title}
                    </h3>

                    <p
                      className={`text-xs mt-1 line-clamp-2 ${
                        isSelected ? 'text-stone-300' : 'text-stone-600'
                      }`}
                    >
                      {m.subtitle} — {m.discipline}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right 7 Columns: Full Encyclopedic & Anthropological Card */}
            <div className="lg:col-span-7 bg-white border border-stone-300 rounded-xl p-6 lg:p-8 shadow-xs space-y-6">
              {/* Top Metadata & Copy Markdown Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div className="text-xs font-mono-tabular text-stone-500">
                  <span>{selectedMilestone.yearLabel}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{selectedMilestone.region}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{selectedMilestone.communityType}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyMarkdownCard(selectedMilestone)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {copiedId === selectedMilestone.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Scheda copiata per Google Docs!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copia Scheda Markdown (Google Docs)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Title & Formula Banner */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                  {selectedMilestone.discipline}
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif-display font-bold text-stone-900 mt-1">
                  {selectedMilestone.title}
                </h3>
                <p className="text-sm text-stone-600 mt-1">{selectedMilestone.subtitle}</p>

                <div className="mt-4 bg-stone-900 text-amber-300 font-mono-tabular text-xs px-4 py-3 rounded-lg">
                  {selectedMilestone.keyFormulaOrNotation}
                </div>
              </div>

              {/* Etymology & Practical Need */}
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 space-y-1.5">
                <div className="text-xs font-semibold text-amber-950">
                  Origine Pratica, Etimologia e Bisogno Reale
                </div>
                <p className="text-sm text-stone-800 leading-relaxed">
                  {selectedMilestone.etymologyAndPracticalOrigin}
                </p>
              </div>

              {/* Theoretical Breakthrough */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Svolta Teorica e Concettuale
                </h4>
                <p className="text-sm text-stone-800 leading-relaxed">
                  {selectedMilestone.theoreticalBreakthrough}
                </p>
              </div>

              {/* Anthropological & Social Context + Knowledge Transmission */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 space-y-1.5">
                  <h4 className="text-xs font-semibold text-stone-900">
                    Il Contesto Antropologico e Sociale
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {selectedMilestone.anthropologicalContext}
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 space-y-1.5">
                  <h4 className="text-xs font-semibold text-stone-900">
                    Trasmissione del Sapere e Cultura Diffusa
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {selectedMilestone.knowledgeTransmission}
                  </p>
                </div>
              </div>

              {/* Case Study / Historical Anecdote */}
              <blockquote className="border-t border-b border-stone-200 py-4 my-2">
                <div className="text-xs font-semibold text-amber-900 mb-1">
                  Il Caso Studio / Aneddoto Storico Chiave
                </div>
                <p className="text-sm font-serif-display italic text-stone-800 leading-relaxed text-base">
                  «{selectedMilestone.caseStudyAnecdote}»
                </p>
              </blockquote>

              {/* Modern Applications & Legacy */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 mb-1.5">
                    Applicazioni Moderne e Tecnologiche Dirette
                  </h4>
                  <ul className="space-y-1 text-xs text-stone-700">
                    {selectedMilestone.modernApplications.map((app, i) => (
                      <li key={i}>• {app}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-stone-600">
                  <strong className="text-stone-900">Cosa ci resta:</strong>{' '}
                  {selectedMilestone.historicalLegacy}
                </div>
              </div>

              {/* Verified Academic Sources */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-stone-900">
                  Fonti Verificate per Approfondire:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedMilestone.sources.map((src, i) => (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      <span>
                        {src.title} ({src.authorOrOrg})
                      </span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 02: WORLD, EUROPEAN, ITALIAN & CAMPANIAN MAP ==================== */}
      <section id="mappa" className="py-16 px-6 max-w-[1380px] mx-auto space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono-tabular uppercase tracking-widest text-amber-900">
              02. GEOGRAFIA DEI CENACOLI, DELLE SCUOLE E DEGLI ISTITUTI ATTIVI OGGI
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif-display font-bold text-stone-900 mt-1">
              Mappa Globale e Territoriale: Dal Mondo all’Europa, all’Italia e alla Campania
            </h2>
          </div>
          <p className="text-xs text-stone-600 max-w-md leading-relaxed">
            Esplora sia i grandi cluster storici (Baghdad, Kerala, Bologna, Gottinga, Budapest,
            Caffè Scozzese di Leopoli) sia le realtà vive oggi sul territorio italiano e
            campano (Apple Developer Academy, SSM, Polo Olimpico, FabLab e Mathesis).
          </p>
        </div>

        <InteractiveWorldMap
          selectedPin={selectedPin}
          onSelectPin={(pin) => {
            setSelectedPin(pin);
            setArtifact3DMode('globe');
          }}
        />
      </section>

      {/* ==================== SECTION 03: INTERACTIVE DISCIPLINE & APPLICATION GRAPH ==================== */}
      <section
        id="grafo"
        className="border-t border-stone-300 bg-[#F4EFE6] py-16 px-6"
      >
        <div className="max-w-[1380px] mx-auto">
          <DisciplineEvolutionGraph />
        </div>
      </section>

      {/* ==================== SECTION 04: GLOSSARY OF MATHEMATICAL JARGON & FOLKLORE ==================== */}
      <section
        id="gergo"
        className="border-t border-stone-300 bg-[#FBF9F5] py-16 px-6"
      >
        <div className="max-w-[1380px] mx-auto">
          <MathJargonExplorer />
        </div>
      </section>

      {/* ==================== SECTION 05: GREAT MATHEMATICIANS BIOGRAPHIES ==================== */}
      <section id="biografie" className="border-t border-stone-300 bg-[#F4EFE6] py-16 px-6">
        <div className="max-w-[1380px] mx-auto space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono-tabular uppercase tracking-widest text-amber-900">
              05. GALLERIA PROSOPOGRAFICA E BIOGRAFIE INTEGRALI
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif-display font-bold text-stone-900 mt-1">
              I Protagonisti di Ogni Epoca: Teoremi, Aneddoti e Impatto Moderno
            </h2>
          </div>

          {/* Era Filter for Biographies */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setBioEraFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                bioEraFilter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Tutte le Epoche ({MATHEMATICIAN_BIOGRAPHIES.length})
            </button>
            {[
              { id: 'era-2', label: 'Antichità' },
              { id: 'era-3', label: 'Grecia & Cina' },
              { id: 'era-4', label: 'Islam & Kerala' },
              { id: 'era-5', label: 'Rinascimento' },
              { id: 'era-6', label: 'Illuminismo' },
              { id: 'era-7', label: 'Ottocento' },
              { id: 'era-8', label: 'Novecento & Marziani' },
              { id: 'era-9', label: 'Guerra Fredda' },
              { id: 'era-10', label: 'Contemporanei' },
            ].map((ef) => (
              <button
                key={ef.id}
                type="button"
                onClick={() => setBioEraFilter(ef.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  bioEraFilter === ef.id
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {ef.label}
              </button>
            ))}
          </div>
        </div>

        {/* Biographies Master-Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Columns: Biographies Selector Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {filteredBiographies.map((bio) => {
              const isSelected = bio.id === selectedBio.id;
              return (
                <button
                  key={bio.id}
                  type="button"
                  onClick={() => setSelectedBio(bio)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-white text-stone-900 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular mb-1">
                    <span className={isSelected ? 'text-amber-300' : 'text-amber-900'}>
                      {bio.lifespan}
                    </span>
                    <span className={isSelected ? 'text-stone-400 truncate' : 'text-stone-500 truncate'}>
                      {bio.eraLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif-display font-bold">{bio.name}</h3>
                  <div
                    className={`text-xs mt-1 truncate ${
                      isSelected ? 'text-stone-300' : 'text-stone-600'
                    }`}
                  >
                    {bio.regionAndSchool}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Selected Mathematician Full Profile */}
          <div className="lg:col-span-7 bg-white border border-stone-300 rounded-xl p-6 lg:p-8 flex flex-col justify-between shadow-xs space-y-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-4">
                <div className="text-xs font-mono-tabular text-stone-500">
                  {selectedBio.lifespan} · {selectedBio.eraLabel}
                </div>
                <div className="text-xs text-amber-900 font-medium">
                  {selectedBio.regionAndSchool}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-serif-display font-bold text-stone-900">
                  {selectedBio.name}
                </h3>
                <div className="text-xs text-stone-500 mt-1">
                  Campi d’indagine: {selectedBio.primaryFields.join(' · ')}
                </div>
              </div>

              <div className="bg-stone-900 text-amber-300 font-mono-tabular text-xs px-4 py-3 rounded-lg">
                Formula / Teorema Iconico: {selectedBio.iconicFormula}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Contributi e Svolte Fondamentali
                </h4>
                <p className="text-sm text-stone-800 leading-relaxed">
                  {selectedBio.keyBreakthroughs}
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1.5">
                <h4 className="text-xs font-semibold text-stone-900">
                  Ritratto Umano, Sottocultura e Aneddoto Storico
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {selectedBio.humanStoryAndAnecdote}
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-1">
                <h4 className="text-xs font-semibold text-amber-950">
                  Dove Vive Oggi il Suo Lavoro (Applicazioni Contemporanee)
                </h4>
                <p className="text-xs text-stone-800 leading-relaxed">
                  {selectedBio.modernApplicationLink}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-stone-500">
                Fonti Biografiche Accademiche:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={selectedBio.mactutorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Biografia MacTutor (St Andrews)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={selectedBio.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Voce Wikipedia</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ==================== SECTION 06: GLOBAL SCHOOLS, VIDEO DOCUMENTARIES & CODICE BUDAPEST ==================== */}
      <section
        id="scuole"
        className="border-t border-stone-300 bg-[#FBF9F5] py-16 px-6"
      >
        <div className="max-w-[1380px] mx-auto space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-amber-900">
                06. GEOPOLITICA DELLA FORMAZIONE, CINETECA E METODO DI STUDIO
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif-display font-bold text-stone-900 mt-1">
                Le Grandi Scuole Mondiali, i Documentari e il «Codice Budapest»
              </h2>
            </div>

            {/* Segmented Tab Switcher */}
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-stone-300">
              <button
                type="button"
                onClick={() => setActiveResourceTab('syllabi')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeResourceTab === 'syllabi'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Le 5 Anime & Syllabi Mondiali
              </button>
              <button
                type="button"
                onClick={() => setActiveResourceTab('documentari')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeResourceTab === 'documentari'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Cineteca Video & Documentari ({VIDEO_DOCUMENTARIES.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveResourceTab('codice-budapest')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeResourceTab === 'codice-budapest'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Il «Codice Budapest» & Toolkit Studente
              </button>
            </div>
          </div>

          {/* TAB 1: GLOBAL SCHOOLS & SYLLABI COMPARISON */}
          {activeResourceTab === 'syllabi' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {GLOBAL_SCHOOLS_COMPARISON.map((school) => (
                  <div
                    key={school.id}
                    className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="text-xs font-mono-tabular text-amber-900">
                        {school.flagshipInstitutions}
                      </div>
                      <h3 className="text-xl font-serif-display font-bold text-stone-900">
                        {school.soulTitle}
                      </h3>
                      <p className="text-xs italic text-stone-600">{school.philosophyMotto}</p>

                      <div className="pt-2 space-y-2 text-xs text-stone-700">
                        <div>
                          <strong className="text-stone-900">Analisi:</strong>{' '}
                          {school.syllabusComparison.analysis}
                        </div>
                        <div>
                          <strong className="text-stone-900">Algebra & Geometria:</strong>{' '}
                          {school.syllabusComparison.algebra}
                        </div>
                        <div>
                          <strong className="text-stone-900">Fisica & Modelli:</strong>{' '}
                          {school.syllabusComparison.physicsAndModels}
                        </div>
                      </div>

                      <div className="bg-stone-50 border border-stone-200/80 rounded-lg p-3 space-y-1">
                        <div className="text-xs font-semibold text-stone-900">
                          I «Testi Sacri» di Riferimento:
                        </div>
                        <ul className="text-xs text-stone-600 space-y-0.5">
                          {school.sacredTexts.map((txt, i) => (
                            <li key={i}>• {txt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-200 text-xs text-stone-700">
                      <strong className="text-amber-950">Superpotere Applicativo:</strong>{' '}
                      {school.realWorldSuperpower}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: VIDEO & DOCUMENTARY CATALOG */}
          {activeResourceTab === 'documentari' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VIDEO_DOCUMENTARIES.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono-tabular text-amber-900">
                      {vid.category}
                    </div>
                    <h3 className="text-lg font-serif-display font-bold text-stone-900 leading-snug">
                      {vid.title}
                    </h3>
                    <div className="text-xs text-stone-500">{vid.channelOrSource}</div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {vid.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100">
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors w-full justify-center"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Cerca e Guarda su YouTube</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: IL CODICE BUDAPEST & STUDENT REBUILDING TOOLKIT */}
          {activeResourceTab === 'codice-budapest' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 Columns: Interactive 6 Daily Rules of the Codice Budapest */}
              <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 space-y-5">
                <div>
                  <div className="text-xs font-mono-tabular text-amber-900">
                    PROTOCOLLO QUOTIDIANO PER RICREARE IL «GENIUS CLUSTER» NEL PROPRIO STUDIO
                  </div>
                  <h3 className="text-2xl font-serif-display font-bold text-stone-900 mt-1">
                    Il «Codice Budapest»: 6 Regole per Sbloccare l’Inerzia Accademica
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Spunta le abitudini che hai applicato nella sessione di studio di oggi:
                  </p>
                </div>

                <div className="space-y-3">
                  {CODICE_BUDAPEST_RULES.map((rule) => {
                    const isChecked = !!checkedRules[rule.number];
                    return (
                      <button
                        key={rule.number}
                        type="button"
                        onClick={() =>
                          setCheckedRules((prev) => ({
                            ...prev,
                            [rule.number]: !prev[rule.number],
                          }))
                        }
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                          isChecked
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-900 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono-tabular font-bold ${
                            isChecked
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-white border border-stone-300 text-stone-600'
                          }`}
                        >
                          {isChecked ? '✓' : rule.number}
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold">{rule.title}</div>
                          <div
                            className={`text-xs ${
                              isChecked ? 'text-amber-300' : 'text-amber-900'
                            }`}
                          >
                            {rule.subtitle}
                          </div>
                          <p
                            className={`text-xs leading-relaxed ${
                              isChecked ? 'text-stone-300' : 'text-stone-600'
                            }`}
                          >
                            {rule.actionableHabit}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right 5 Columns: Rebuilding Roadmap & Frankenstein Curriculum + Archive Screenshot */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
                  <div className="text-xs font-mono-tabular text-amber-900">
                    KIT DI RICOSTRUZIONE RAPIDA & CURRICULUM INTEGRALE
                  </div>
                  <h3 className="text-xl font-serif-display font-bold text-stone-900">
                    Risorse Salvavita dopo Analisi 1 (Geometria 1, Algebra 1, Fisica Matematica)
                  </h3>
                  <ul className="space-y-3 text-xs text-stone-700 leading-relaxed">
                    <li className="pb-2.5 border-b border-stone-100">
                      <strong className="text-stone-900 block">
                        1. Archivio Didattico Prof. Massimo Gobbino (Univ. di Pisa)
                      </strong>
                      Precorso di Matematica (per colmare i buchi del liceo in 2 settimane),
                      Algebra Lineare (Geometria 1) e Analisi 2 spiegati passo-passo in PDF e video.{' '}
                      <a
                        href="http://pagine.dm.unipi.it/gobbino/Home_Page/ArchivioDidattico.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-amber-900 font-medium"
                      >
                        Apri Archivio Gobbino →
                      </a>
                    </li>
                    <li className="pb-2.5 border-b border-stone-100">
                      <strong className="text-stone-900 block">
                        2. Forum di Matematicamente.it & r/learnmath
                      </strong>
                      Luoghi protetti e privi di giudizio dove chiedere chiarimenti su passaggi
                      algebrici, spazi vettoriali, autovalori o gruppi ciclici.{' '}
                      <a
                        href="https://www.matematicamente.it/forum/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-amber-900 font-medium"
                      >
                        Vai al Forum →
                      </a>
                    </li>
                    <li>
                      <strong className="text-stone-900 block">
                        3. Il «Frankenstein Curriculum» (Prendi il meglio da ogni scuola)
                      </strong>
                      Usa <em>Strang + 3Blue1Brown</em> (MIT) per vedere geometricamente le
                      matrici prima di studiare le dimostrazioni astratte, <em>Arnold</em>{' '}
                      (Mosca) per visualizzare le equazioni differenziali come flussi nello
                      spazio delle fasi, e <em>Demidovich</em> per l’allenamento tecnico.
                    </li>
                  </ul>
                </div>

                {/* Embedded Reference Table from User Attachment */}
                <div className="bg-stone-900 text-stone-100 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-mono-tabular text-amber-400">
                    REPERTO D’ARCHIVIO · LA TAVOLA DEGLI ARCHETIPI (ERA 9 & 10)
                  </div>
                  <div className="overflow-hidden rounded-lg border border-stone-700 bg-black">
                    <img
                      src="/assets/aistudio/402d0a28-ce01-4ca4-b3c9-a31e0bdb41aa_7739e2f4.jpg"
                      alt="Tabella storica delle comunità matematiche: Math Circles, Kvant, KöMaL, Bletchley Park, MIT TMRC, RAND e Martin Gardner"
                      referrerPolicy="no-referrer"
                      className="w-full h-48 object-cover object-top opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Dalla matrice storica dei cenacoli del Novecento (Math Circles, Kvant,
                    KöMaL, Bletchley Park, TMRC MIT, RAND e Martin Gardner) alla loro
                    evoluzione contemporanea mappata in questo Atlante.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================== QUIET EDITORIAL FOOTER ==================== */}
      <footer className="border-t border-stone-300 bg-[#F4EFE6] py-10 px-6 text-xs text-stone-600">
        <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-serif-display font-bold text-base text-stone-900">
              Mathistory — Atlante Storico, Geografico e Lessico del Pensiero Matematico
            </div>
            <p>
              Dalle prime attestazioni paleolitiche di Ishango ai Circoli Matematici, dal
              Glossary of Mathematical Jargon fino alla Crittografia Post-Quantistica e all’IA.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://mathshistory.st-andrews.ac.uk/HistTopics/History_overview/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-950 inline-flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>MacTutor Archive (St Andrews)</span>
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Glossary_of_mathematical_jargon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-950 inline-flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glossary of Mathematical Jargon</span>
            </a>
            <a
              href="https://en.wikipedia.org/wiki/History_of_mathematics"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-950 inline-flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>History of Mathematics</span>
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Timeline_of_mathematics"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-950 inline-flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Timeline of Mathematics</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
