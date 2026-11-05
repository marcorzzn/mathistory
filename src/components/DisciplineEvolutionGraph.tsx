import React, { useMemo, useState } from 'react';
import {
  DISCIPLINE_GRAPH_NODES,
  DisciplineNode,
  GRAPH_LAYER_TITLES,
  GraphLayer,
  STREAM_COLORS,
} from '../data/disciplineGraphData';
import { ArrowRight, GitBranch } from 'lucide-react';

export const DisciplineEvolutionGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('frontier-ml-deep-learning-transformers');
  const [streamFilter, setStreamFilter] = useState<'all' | DisciplineNode['stream']>('all');

  const nodeMap = useMemo(() => {
    const m = new Map<string, DisciplineNode>();
    DISCIPLINE_GRAPH_NODES.forEach((n) => m.set(n.id, n));
    return m;
  }, []);

  const selectedNode = nodeMap.get(selectedNodeId) || DISCIPLINE_GRAPH_NODES[0];

  // Recursively find all historical ancestors and technological descendants of selectedNode
  const { ancestorIds, descendantIds } = useMemo(() => {
    const anc = new Set<string>();
    const desc = new Set<string>();

    const collectAncestors = (id: string) => {
      const node = nodeMap.get(id);
      if (!node) return;
      node.parentIds.forEach((pid) => {
        if (!anc.has(pid)) {
          anc.add(pid);
          collectAncestors(pid);
        }
      });
    };

    const collectDescendants = (id: string) => {
      DISCIPLINE_GRAPH_NODES.forEach((n) => {
        if (n.parentIds.includes(id) && !desc.has(n.id)) {
          desc.add(n.id);
          collectDescendants(n.id);
        }
      });
    };

    collectAncestors(selectedNode.id);
    collectDescendants(selectedNode.id);
    return { ancestorIds: anc, descendantIds: desc };
  }, [selectedNode, nodeMap]);

  const layers: GraphLayer[] = [0, 1, 2, 3, 4];

  return (
    <div className="space-y-8">
      {/* Intro & Quick Causal Journeys ("Percorsi Guidati") */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-tabular text-amber-900">
              GENEALOGIA INTERATTIVA DELLE DISCIPLINE E DELLE APPLICAZIONI
            </div>
            <h3 className="text-2xl font-serif-display font-bold text-stone-900 mt-0.5">
              Dalla Misura dei Campi Agricoli alla Crittografia Post-Quantistica e al Machine Learning
            </h3>
          </div>

          {/* Stream Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setStreamFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                streamFilter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Tutti i Filoni
            </button>
            {(Object.keys(STREAM_COLORS) as Array<DisciplineNode['stream']>).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStreamFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  streamFilter === st
                    ? 'text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                style={streamFilter === st ? { backgroundColor: STREAM_COLORS[st].hex } : undefined}
              >
                {STREAM_COLORS[st].label.replace('Filone ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Guided Causal Chains */}
        <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-stone-500 mr-1">
            Esplora un filo conduttore diretto:
          </span>
          {(
            [
              {
                nodeId: 'tech-cryptography-blockchain',
                label: 'Perché Eredità & Duelli → Algebra Astratta → Crittografia & Blockchain',
              },
              {
                nodeId: 'frontier-ml-deep-learning-transformers',
                label: 'Perché Tasse del Grano & Dadi → Matrici & Bayes → Machine Learning & LLM',
              },
              {
                nodeId: 'tech-Predictive-modeling-kalman',
                label: 'Perché Piene del Nilo & Pianeti → Geometria & ODE → Modellazione Predittiva & GPS',
              },
              {
                nodeId: 'tech-dsp-medical-imaging',
                label: 'Perché Numeri Complessi (√-1) → Fourier → Wi-Fi, 5G & Risonanza Magnetica',
              },
            ] as const
          ).map((guide) => (
            <button
              key={guide.nodeId}
              type="button"
              onClick={() => setSelectedNodeId(guide.nodeId)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                selectedNodeId === guide.nodeId
                  ? 'bg-amber-900 text-white border-amber-900'
                  : 'bg-stone-50 text-stone-800 border-stone-300 hover:bg-stone-100'
              }`}
            >
              {guide.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Column Interactive DAG Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {layers.map((layerNum) => {
          const layerInfo = GRAPH_LAYER_TITLES[layerNum];
          const layerNodes = DISCIPLINE_GRAPH_NODES.filter(
            (n) => n.layer === layerNum && (streamFilter === 'all' || n.stream === streamFilter)
          );

          return (
            <div
              key={layerNum}
              className="bg-stone-100/80 border border-stone-200/90 rounded-xl p-3.5 flex flex-col gap-3"
            >
              <div className="pb-2.5 border-b border-stone-300/80">
                <div className="text-xs font-mono-tabular font-semibold text-stone-900">
                  {layerInfo.title}
                </div>
                <div className="text-xs text-stone-500 mt-0.5 leading-snug">
                  {layerInfo.subtitle}
                </div>
              </div>

              <div className="space-y-3">
                {layerNodes.map((node) => {
                  const isSelected = node.id === selectedNode.id;
                  const isAncestor = ancestorIds.has(node.id);
                  const isDescendant = descendantIds.has(node.id);
                  const isRelated = isSelected || isAncestor || isDescendant;
                  const streamColor = STREAM_COLORS[node.stream];

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-amber-500'
                          : isAncestor
                          ? 'bg-amber-50/90 text-stone-900 border-amber-500 shadow-xs'
                          : isDescendant
                          ? 'bg-sky-50/90 text-stone-900 border-sky-500 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 opacity-75 hover:opacity-100 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular mb-1">
                        <span
                          className="font-semibold truncate"
                          style={{ color: isSelected ? '#fcd34d' : streamColor.hex }}
                        >
                          {node.streamLabel.replace('Filone ', '')}
                        </span>
                        {isSelected && <span className="text-amber-300 shrink-0">● NODO ATTIVO</span>}
                        {isAncestor && <span className="text-amber-800 font-semibold shrink-0">↑ RADICE STORICA</span>}
                        {isDescendant && <span className="text-sky-800 font-semibold shrink-0">↓ IMPATTO OGGI</span>}
                      </div>

                      <h4 className="text-sm font-serif-display font-bold leading-snug">
                        {node.title}
                      </h4>

                      <div
                        className={`text-[11px] font-mono-tabular mt-2 pt-1.5 border-t truncate ${
                          isSelected
                            ? 'border-stone-700 text-amber-200'
                            : isRelated
                            ? 'border-stone-200 text-stone-700'
                            : 'border-stone-100 text-stone-500'
                        }`}
                      >
                        {node.formula}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive ("Il Ponte Concettuale: Dall'Origine all'Applicazione") */}
      <div className="bg-white border border-stone-300 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Etymology, Concept & Why It Matters */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-stone-500">
              <span>{selectedNode.layerLabel.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedNode.eraLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedNode.streamLabel}</span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-serif-display font-bold text-stone-900">
              {selectedNode.title}
            </h3>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-2">
              <div className="text-xs font-semibold text-amber-900">
                Origine Storica, Bisogno Reale ed Etimologia
              </div>
              <p className="text-sm text-stone-800 leading-relaxed">
                {selectedNode.etymologyOrOrigin}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-stone-900">
                Struttura Concettuale & Perché è stata una svolta epocale
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {selectedNode.coreConcept} {selectedNode.whyItMatters}
              </p>
            </div>

            <div className="font-mono-tabular text-xs bg-stone-900 text-amber-300 px-4 py-3 rounded-lg">
              Formalismo Chiave: {selectedNode.formula}
            </div>
          </div>

          {/* Right 5 Cols: Ancestors, Concrete Applications & Descendants */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 border-t lg:border-t-0 lg:border-l border-stone-200 pt-5 lg:pt-0 lg:pl-7">
            <div className="space-y-4">
              {/* Parent roots */}
              <div>
                <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5 mb-2">
                  <GitBranch className="w-3.5 h-3.5 text-amber-800" />
                  <span>Nasce direttamente da ({selectedNode.parentIds.length} prerequisiti):</span>
                </div>
                {selectedNode.parentIds.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">
                    Radice empirica primaria (osservazione diretta della natura e necessità sociale).
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.parentIds.map((pid) => {
                      const pNode = nodeMap.get(pid);
                      if (!pNode) return null;
                      return (
                        <button
                          key={pid}
                          type="button"
                          onClick={() => setSelectedNodeId(pid)}
                          className="text-xs px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-md transition-colors text-left"
                        >
                          ↑ {pNode.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Concrete Applications */}
              <div>
                <div className="text-xs font-semibold text-stone-900 mb-2">
                  Applicazioni Reali, Industriali e Scientifiche
                </div>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {selectedNode.concreteApplications.map((app, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-stone-900 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Descendants */}
              <div>
                <div className="text-xs font-semibold text-stone-900 mb-2">
                  Sblocca nei secoli successivi ({descendantIds.size} nodi collegati):
                </div>
                {descendantIds.size === 0 ? (
                  <p className="text-xs text-stone-500 italic">
                    Frontiera attuale della ricerca contemporanea (2026–2035+).
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(descendantIds).map((did) => {
                      const dNode = nodeMap.get(did);
                      if (!dNode) return null;
                      return (
                        <button
                          key={did}
                          type="button"
                          onClick={() => setSelectedNodeId(did)}
                          className="text-xs px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-950 border border-sky-300 rounded-md transition-colors text-left"
                        >
                          ↓ {dNode.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
