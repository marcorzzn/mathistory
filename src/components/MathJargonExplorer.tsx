import React, { useMemo, useState } from 'react';
import {
  JARGON_CATEGORIES,
  JargonCategory,
  MATH_JARGON_ENTRIES,
  MathJargonEntry,
} from '../data/mathJargonData';
import { BookOpen, ExternalLink, Search, Sparkles } from 'lucide-react';

const ERDOSESE_MINI_DICT = [
  { term: 'The Book («Il Libro»)', meaning: 'Il libro celeste con le dimostrazioni perfette di ogni teorema' },
  { term: 'SF («Supreme Fascist»)', meaning: 'Dio (che nasconde ai matematici le dimostrazioni del Libro e i calzini)' },
  { term: 'Epsilons (ε)', meaning: 'I bambini e i giovanissimi talenti matematici («piccoli a piacere»)' },
  { term: 'Bosses & Slaves', meaning: 'Le mogli («Bosses») e i mariti («Slaves»)' },
  { term: 'Preaching («Predicare»)', meaning: 'Tenere una lezione o un seminario di matematica' },
  { term: 'Poison («Veleno»)', meaning: 'Le bevande alcoliche (mentre il caffè e le anfetamine erano «carburante»)' },
  { term: 'Noise («Rumore»)', meaning: 'La musica (eccetto Bach, che Erdős tollerava mentre calcolava)' },
  { term: 'Died vs. Left', meaning: 'Chi smette di fare matematica è «morto» (died); chi muore davvero è «partito» (left)' },
  { term: 'Sam & Joe', meaning: 'Gli Stati Uniti («Sam») e l’Unione Sovietica («Joe», da Stalin)' },
];

export const MathJargonExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | JargonCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<MathJargonEntry>(MATH_JARGON_ENTRIES[0]);

  const filteredEntries = useMemo(() => {
    return MATH_JARGON_ENTRIES.filter((entry) => {
      if (selectedCategory !== 'all' && entry.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          entry.termEn.toLowerCase().includes(q) ||
          entry.termIt.toLowerCase().includes(q) ||
          entry.mathematicianReality.toLowerCase().includes(q) ||
          entry.classicExample.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header & Filter Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono-tabular uppercase tracking-widest text-amber-800">
              LESSICO ANTROPOLOGICO E CULTURALE · GLOSSARY OF MATHEMATICAL JARGON
            </div>
            <h3 className="text-2xl lg:text-3xl font-serif-display font-bold text-stone-900">
              Il Gergo Segreto dei Matematici: Tra «Patologie», «Il Libro» e «Abstract Nonsense»
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca termine (es. WLOG, canonico, patologico)..."
                className="pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 w-64 sm:w-72"
              />
            </div>

            <a
              href="https://en.wikipedia.org/wiki/Glossary_of_mathematical_jargon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>Wikipedia: Mathematical Jargon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Tutte le Voci ({MATH_JARGON_ENTRIES.length})
          </button>
          {(Object.keys(JARGON_CATEGORIES) as JargonCategory[]).map((catKey) => {
            const cat = JARGON_CATEGORIES[catKey];
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => {
                  setSelectedCategory(catKey);
                  const first = MATH_JARGON_ENTRIES.find((e) => e.category === catKey);
                  if (first) setSelectedEntry(first);
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                style={isSelected ? { backgroundColor: cat.badgeColor } : undefined}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: Jargon Term List (Left 5 Cols) + Deep Comparison Card (Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Columns: Term Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredEntries.map((entry) => {
            const isSelected = entry.id === selectedEntry.id;
            const catColor = JARGON_CATEGORIES[entry.category].badgeColor;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setSelectedEntry(entry)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                    : 'bg-white text-stone-900 border-stone-200/90 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular mb-1">
                  <span
                    className="font-semibold"
                    style={{ color: isSelected ? '#fcd34d' : catColor }}
                  >
                    {entry.termEn}
                  </span>
                  <span className={isSelected ? 'text-stone-400' : 'text-stone-500'}>
                    {entry.categoryLabel}
                  </span>
                </div>
                <h4 className="text-lg font-serif-display font-bold leading-snug">
                  {entry.termIt}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Right 7 Columns: Selected Term Deep Analysis + Erdősese Box */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-mono-tabular text-stone-500">
                TERMINE INGLESE: <strong className="text-stone-900">{selectedEntry.termEn}</strong> ·{' '}
                {selectedEntry.categoryLabel.toUpperCase()}
              </div>
              <div className="text-xs text-amber-900 font-medium">
                {selectedEntry.historicalOriginOrCommunity}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-serif-display font-bold text-stone-900">
                {selectedEntry.termIt}
              </h3>
              {selectedEntry.symbolOrFormula && (
                <div className="mt-3 bg-stone-900 text-amber-300 font-mono-tabular text-xs px-4 py-3 rounded-xl">
                  {selectedEntry.symbolOrFormula}
                </div>
              )}
            </div>

            {/* Contrast Box: Cosa pensa un profano vs Cosa intende un matematico */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1.5">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Nel Linguaggio Comune (Cosa sembra)
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  «{selectedEntry.laypersonMyth}»
                </p>
              </div>

              <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-4 space-y-1.5">
                <div className="text-xs font-semibold text-amber-950 uppercase tracking-wider">
                  Nel Gergo dei Matematici (Cosa significa davvero)
                </div>
                <p className="text-sm text-stone-900 font-medium leading-relaxed">
                  {selectedEntry.mathematicianReality}
                </p>
              </div>
            </div>

            {/* Classic Historical Example */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-5 space-y-2">
              <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <span>Il Caso Classico nella Storia della Matematica</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {selectedEntry.classicExample}
              </p>
            </div>
          </div>

          {/* Mini-Dizionario Interattivo dell'Erdősese */}
          <div className="bg-[#111827] text-stone-100 rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono-tabular text-amber-400">
                  APPENDICE ANTROPOLOGICA · IL CODICE LINGUISTICO DI PAUL ERDŐS
                </div>
                <h4 className="text-xl font-serif-display font-bold text-white mt-0.5">
                  Piccolo Dizionario Tascabile di «Erdősese»
                </h4>
              </div>
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {ERDOSESE_MINI_DICT.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 space-y-1"
                >
                  <div className="text-xs font-mono-tabular font-semibold text-amber-300">
                    {item.term}
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
