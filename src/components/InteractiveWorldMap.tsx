import React, { useMemo, useState } from 'react';
import * as d3Geo from 'd3-geo';
import * as topojson from 'topojson-client';
import worldAtlasData from 'world-atlas/countries-110m.json';
import {
  ARCHETYPE_INFO,
  CommunityArchetype,
  GeoScale,
  MATH_COMMUNITIES_PINS,
  MathCommunityPin,
} from '../data/communitiesMapData';
import {
  Compass,
  ExternalLink,
  MapPin,
  RotateCcw,
  Search,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface InteractiveWorldMapProps {
  selectedPin: MathCommunityPin;
  onSelectPin: (pin: MathCommunityPin) => void;
}

// High-precision GeoJSON polygons for Campania coastline, islands, and provincial boundaries
// so when zoomed to Campania (13.7°E–15.8°E, 39.9°N–41.55°N) the cartography is crisp and authentic.
const CAMPANIA_GEOJSON: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Regione Campania (Costa Tirrenica & Entroterra)', type: 'land' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [13.76, 41.38],
            [13.86, 41.23],
            [13.94, 41.02],
            [14.04, 40.88],
            [14.04, 40.79], // Capo Miseno / Campi Flegrei
            [14.18, 40.81], // Posillipo
            [14.26, 40.84], // Napoli Porto
            [14.34, 40.82], // San Giovanni a Teduccio / Portici
            [14.42, 40.75], // Torre Annunziata
            [14.48, 40.69], // Castellammare di Stabia
            [14.37, 40.63], // Sorrento
            [14.32, 40.57], // Punta Campanella
            [14.48, 40.61], // Positano
            [14.60, 40.63], // Amalfi
            [14.71, 40.67], // Vietri / Cava de' Tirreni
            [14.76, 40.67], // Salerno
            [14.92, 40.48], // Paestum
            [14.95, 40.22], // Punta Licosa / Cilento
            [15.16, 40.06], // Palinuro
            [15.48, 40.01], // Golfo di Policastro
            [15.72, 40.18], // Vallo di Diano
            [15.62, 40.58], // Confine Lucano
            [15.54, 40.88], // Alta Irpinia
            [15.28, 41.15], // Ariano Irpino
            [15.05, 41.38], // Fortore / Sannio
            [14.75, 41.46], // Matese Orientale
            [14.35, 41.48], // Matese / Alto Casertano
            [13.95, 41.47], // Roccamonfina / Cassino
            [13.76, 41.38],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Isola d’Ischia', type: 'island' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [13.85, 40.75],
            [13.96, 40.76],
            [13.96, 40.70],
            [13.86, 40.69],
            [13.85, 40.75],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Isola di Capri', type: 'island' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [14.20, 40.56],
            [14.27, 40.56],
            [14.26, 40.53],
            [14.20, 40.54],
            [14.20, 40.56],
          ],
        ],
      },
    },
  ],
};

// High-resolution Italy outline supplement (Sicily, Sardinia, Peninsula refinement)
const ITALY_REGIONAL_CITIES = [
  { name: 'Torino', coords: [7.68, 45.07] },
  { name: 'Milano', coords: [9.19, 45.46] },
  { name: 'Venezia', coords: [12.31, 45.44] },
  { name: 'Bologna', coords: [11.34, 44.49] },
  { name: 'Pisa', coords: [10.40, 43.72] },
  { name: 'Firenze', coords: [11.25, 43.77] },
  { name: 'Roma', coords: [12.49, 41.90] },
  { name: 'Napoli', coords: [14.25, 40.84] },
  { name: 'Bari', coords: [16.87, 41.12] },
  { name: 'Crotone', coords: [17.12, 39.08] },
  { name: 'Palermo', coords: [13.36, 38.11] },
  { name: 'Siracusa', coords: [15.28, 37.07] },
];

export const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({
  selectedPin,
  onSelectPin,
}) => {
  const [scaleFilter, setScaleFilter] = useState<'all' | GeoScale>('all');
  const [archetypeFilter, setArchetypeFilter] = useState<'all' | CommunityArchetype>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyActiveToday, setOnlyActiveToday] = useState<boolean>(false);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [mapTheme, setMapTheme] = useState<'parchment' | 'night'>('parchment');

  // Interactive Zoom & Pan state
  const [zoomFactor, setZoomFactor] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Extract GeoJSON countries from world-atlas TopoJSON once
  const worldCountriesGeo = useMemo(() => {
    const topo = worldAtlasData as unknown as TopoJSON.Topology;
    return topojson.feature(
      topo,
      topo.objects.countries as TopoJSON.GeometryCollection
    ) as GeoJSON.FeatureCollection;
  }, []);

  const graticuleGeo = useMemo(() => {
    return d3Geo.geoGraticule10();
  }, []);

  // Configure D3 projection based on active geographic scale + user zoom/pan
  const { projection, pathGenerator } = useMemo(() => {
    let proj: d3Geo.GeoProjection;

    if (scaleFilter === 'all') {
      proj = d3Geo
        .geoNaturalEarth1()
        .scale(178 * zoomFactor)
        .translate([500 + panOffset.x, 275 + panOffset.y]);
    } else if (scaleFilter === 'europa') {
      proj = d3Geo
        .geoMercator()
        .center([14.5, 50.0])
        .scale(680 * zoomFactor)
        .translate([500 + panOffset.x, 280 + panOffset.y]);
    } else if (scaleFilter === 'italia') {
      proj = d3Geo
        .geoMercator()
        .center([12.6, 41.9])
        .scale(1950 * zoomFactor)
        .translate([500 + panOffset.x, 265 + panOffset.y]);
    } else {
      // Campania high-zoom projection centered on Naples / Salerno / Caserta
      proj = d3Geo
        .geoMercator()
        .center([14.65, 40.78])
        .scale(14500 * zoomFactor)
        .translate([500 + panOffset.x, 265 + panOffset.y]);
    }

    const pathGen = d3Geo.geoPath().projection(proj);
    return { projection: proj, pathGenerator: pathGen };
  }, [scaleFilter, zoomFactor, panOffset]);

  const handleScaleChange = (newScale: 'all' | GeoScale) => {
    setScaleFilter(newScale);
    setZoomFactor(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const filteredPins = useMemo(() => {
    return MATH_COMMUNITIES_PINS.filter((pin) => {
      if (scaleFilter !== 'all') {
        if (
          scaleFilter === 'europa' &&
          pin.scale !== 'europa' &&
          pin.scale !== 'italia' &&
          pin.scale !== 'campania'
        ) {
          return false;
        }
        if (scaleFilter === 'italia' && pin.scale !== 'italia' && pin.scale !== 'campania') {
          return false;
        }
        if (scaleFilter === 'campania' && pin.scale !== 'campania') {
          return false;
        }
      }
      if (archetypeFilter !== 'all' && pin.archetype !== archetypeFilter) {
        return false;
      }
      if (onlyActiveToday && !pin.isActiveToday) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          pin.name.toLowerCase().includes(q) ||
          pin.cityOrArea.toLowerCase().includes(q) ||
          pin.country.toLowerCase().includes(q) ||
          pin.shortDescription.toLowerCase().includes(q) ||
          pin.keyFiguresOrProjects.some((k) => k.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [scaleFilter, archetypeFilter, searchQuery, onlyActiveToday]);

  const activeHoverPin = useMemo(() => {
    if (!hoveredPinId) return null;
    return MATH_COMMUNITIES_PINS.find((p) => p.id === hoveredPinId) || null;
  }, [hoveredPinId]);

  const isParchment = mapTheme === 'parchment';

  return (
    <div className="space-y-8">
      {/* Filter & Scale Control Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Scale Switcher: Globale -> Europa -> Italia -> Campania */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl">
            {(
              [
                { id: 'all', label: 'Planisfero Globale' },
                { id: 'europa', label: 'Quadrante Europeo' },
                { id: 'italia', label: 'Mappa Italia' },
                { id: 'campania', label: 'Focus Campania (Napoli · Caserta · Salerno)' },
              ] as const
            ).map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleScaleChange(sc.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  scaleFilter === sc.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Search, Active Toggle & Map Theme */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca città, scuola, matematico..."
                className="pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 w-56"
              />
            </div>

            <button
              type="button"
              onClick={() => setOnlyActiveToday((prev) => !prev)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                onlyActiveToday
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              {onlyActiveToday ? 'Solo Attive Oggi' : 'Storiche + Attive Oggi'}
            </button>

            <button
              type="button"
              onClick={() =>
                setMapTheme((prev) => (prev === 'parchment' ? 'night' : 'parchment'))
              }
              className="px-3 py-2 text-xs font-medium rounded-xl border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
            >
              {isParchment ? 'Stile: Atlante Storico' : 'Stile: Notturno'}
            </button>
          </div>
        </div>

        {/* Archetype Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100">
          <span className="text-xs font-medium text-stone-500 mr-1">Archetipo:</span>
          <button
            type="button"
            onClick={() => setArchetypeFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              archetypeFilter === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Tutti ({MATH_COMMUNITIES_PINS.length})
          </button>
          {(Object.keys(ARCHETYPE_INFO) as CommunityArchetype[]).map((archKey) => {
            const info = ARCHETYPE_INFO[archKey];
            const isSelected = archetypeFilter === archKey;
            return (
              <button
                key={archKey}
                type="button"
                onClick={() => setArchetypeFilter(archKey)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                style={isSelected ? { backgroundColor: info.colorHex } : undefined}
              >
                {info.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: True-Projection Cartographic Map + Selected Community Monograph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 Columns: Authentic D3-Geo Vector Cartography */}
        <div
          className={`lg:col-span-7 rounded-2xl border p-4 flex flex-col justify-between shadow-xs transition-colors ${
            isParchment
              ? 'bg-[#EFECE4] border-stone-300 text-stone-900'
              : 'bg-[#0F172A] border-slate-800 text-stone-100'
          }`}
        >
          {/* Map Top Header & Zoom Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3 px-1">
            <div>
              <div
                className={`text-xs font-mono-tabular font-semibold ${
                  isParchment ? 'text-amber-900' : 'text-amber-400'
                }`}
              >
                CARTOGRAFIA VETTORIALE NATURAL EARTH · PROIEZIONE GEODETICA D3-GEO
              </div>
              <h3 className="text-lg font-serif-display font-bold">
                {scaleFilter === 'all' && 'Planisfero Globale delle Comunità e Scuole Matematiche'}
                {scaleFilter === 'europa' && 'Carta Geopolitica Europea: Caffè, Accademie e Hub Contemporanei'}
                {scaleFilter === 'italia' && 'Carta d’Italia: Da Crotone e Siracusa alle Scuole d’Abaco, Pisa e Reti UMI'}
                {scaleFilter === 'campania' && 'Carta Topografica della Campania: Napoli, San Giorgio, Caserta, Cava e Salerno'}
              </h3>
            </div>

            {/* Interactive Zoom / Reset Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setZoomFactor((z) => Math.min(4.5, z * 1.35))}
                title="Ingrandisci mappa"
                className={`p-2 rounded-lg border transition-colors ${
                  isParchment
                    ? 'bg-white border-stone-300 text-stone-800 hover:bg-stone-100'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomFactor((z) => Math.max(0.75, z / 1.35))}
                title="Riduci mappa"
                className={`p-2 rounded-lg border transition-colors ${
                  isParchment
                    ? 'bg-white border-stone-300 text-stone-800 hover:bg-stone-100'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoomFactor(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                title="Ripristina inquadratura"
                className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1 ${
                  isParchment
                    ? 'bg-white border-stone-300 text-stone-800 hover:bg-stone-100'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Interactive SVG Map Viewport (Draggable & Zoomable) */}
          <div
            className={`relative w-full aspect-[16/10] rounded-xl border overflow-hidden ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            } ${
              isParchment
                ? 'bg-[#D8E6EE] border-stone-300'
                : 'bg-[#09101D] border-slate-800'
            }`}
            onMouseDown={(e) => {
              setIsDragging(true);
              setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
            }}
            onMouseMove={(e) => {
              if (!isDragging) return;
              setPanOffset({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
              });
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            <svg
              viewBox="0 0 1000 540"
              className="w-full h-full select-none"
              role="img"
              aria-label="Mappa cartografica interattiva delle comunità matematiche"
            >
              {/* Spherical Graticule Grid (Meridians & Parallels) */}
              <path
                d={pathGenerator(graticuleGeo) || ''}
                fill="none"
                stroke={
                  isParchment ? 'rgba(30, 58, 138, 0.12)' : 'rgba(148, 163, 184, 0.12)'
                }
                strokeWidth="0.8"
              />

              {/* Real World Countries from Natural Earth TopoJSON */}
              {scaleFilter !== 'campania' && (
                <g>
                  {worldCountriesGeo.features.map((feature, idx) => {
                    const d = pathGenerator(feature);
                    if (!d) return null;
                    return (
                      <path
                        key={`country-${feature.id || idx}`}
                        d={d}
                        fill={isParchment ? '#F7F3E8' : '#1B2A44'}
                        stroke={isParchment ? '#B8AFA0' : '#334155'}
                        strokeWidth={scaleFilter === 'italia' ? '1.2' : '0.75'}
                      />
                    );
                  })}
                </g>
              )}

              {/* High-Resolution Campania Topographic Map when scaleFilter === 'campania' */}
              {scaleFilter === 'campania' && (
                <g>
                  {/* Also draw surrounding Italian peninsula lightly */}
                  {worldCountriesGeo.features.map((feature, idx) => {
                    const d = pathGenerator(feature);
                    if (!d) return null;
                    return (
                      <path
                        key={`bg-it-${idx}`}
                        d={d}
                        fill={isParchment ? '#EAE4D6' : '#131E32'}
                        stroke="none"
                      />
                    );
                  })}

                  {/* High-precision Campania coastline and islands */}
                  {CAMPANIA_GEOJSON.features.map((feat, idx) => {
                    const d = pathGenerator(feat);
                    if (!d) return null;
                    return (
                      <path
                        key={`campania-feat-${idx}`}
                        d={d}
                        fill={isParchment ? '#F9F6EE' : '#1E314F'}
                        stroke={isParchment ? '#8C7A63' : '#60A5FA'}
                        strokeWidth="2"
                      />
                    );
                  })}

                  {/* Geographic Water & Landmark Labels in Campania */}
                  {(() => {
                    const napoliGulf = projection([14.12, 40.72]);
                    const salernoGulf = projection([14.62, 40.48]);
                    const vesuvio = projection([14.426, 40.821]);
                    const benevento = projection([14.78, 41.13]);
                    const avellino = projection([14.79, 40.91]);
                    return (
                      <g className="pointer-events-none">
                        {napoliGulf && (
                          <text
                            x={napoliGulf[0]}
                            y={napoliGulf[1]}
                            fill={isParchment ? '#3B6998' : '#60A5FA'}
                            fontSize="12"
                            fontStyle="italic"
                            fontFamily="Cormorant Garamond, Georgia, serif"
                            textAnchor="middle"
                          >
                            Golfo di Napoli
                          </text>
                        )}
                        {salernoGulf && (
                          <text
                            x={salernoGulf[0]}
                            y={salernoGulf[1]}
                            fill={isParchment ? '#3B6998' : '#60A5FA'}
                            fontSize="12"
                            fontStyle="italic"
                            fontFamily="Cormorant Garamond, Georgia, serif"
                            textAnchor="middle"
                          >
                            Golfo di Salerno
                          </text>
                        )}
                        {vesuvio && (
                          <g transform={`translate(${vesuvio[0]}, ${vesuvio[1]})`}>
                            <polygon points="0,-6 -5,4 5,4" fill="#9A3412" opacity="0.7" />
                            <text
                              x="8"
                              y="3"
                              fill={isParchment ? '#78350F' : '#FBBF24'}
                              fontSize="10"
                              fontFamily="JetBrains Mono, monospace"
                            >
                              ▲ Vesuvio (1281m)
                            </text>
                          </g>
                        )}
                        {benevento && (
                          <text
                            x={benevento[0]}
                            y={benevento[1]}
                            fill={isParchment ? '#78716C' : '#94A3B8'}
                            fontSize="10"
                            textAnchor="middle"
                          >
                            Benevento (Sannio)
                          </text>
                        )}
                        {avellino && (
                          <text
                            x={avellino[0]}
                            y={avellino[1]}
                            fill={isParchment ? '#78716C' : '#94A3B8'}
                            fontSize="10"
                            textAnchor="middle"
                          >
                            Avellino (Irpinia)
                          </text>
                        )}
                      </g>
                    );
                  })()}
                </g>
              )}

              {/* Reference Italian City Markers when viewing Italy */}
              {scaleFilter === 'italia' &&
                ITALY_REGIONAL_CITIES.map((city) => {
                  const pt = projection(city.coords as [number, number]);
                  if (!pt) return null;
                  return (
                    <g
                      key={city.name}
                      transform={`translate(${pt[0]}, ${pt[1]})`}
                      className="pointer-events-none"
                    >
                      <circle
                        r="2.2"
                        fill={isParchment ? '#78716C' : '#94A3B8'}
                      />
                      <text
                        x="5"
                        y="3"
                        fontSize="9.5"
                        fill={isParchment ? '#57534E' : '#94A3B8'}
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })}

              {/* Geodesic Arcs connecting mathematical hubs */}
              {scaleFilter === 'all' && (
                <g className="pointer-events-none">
                  {[
                    [
                      [76.21, 10.33],
                      [44.36, 33.31],
                    ], // Kerala -> Baghdad
                    [
                      [44.36, 33.31],
                      [11.34, 44.49],
                    ], // Baghdad -> Bologna
                    [
                      [11.34, 44.49],
                      [9.93, 51.53],
                    ], // Bologna -> Gottingen
                    [
                      [19.04, 47.49],
                      [-74.66, 40.33],
                    ], // Budapest -> Princeton
                    [
                      [24.03, 49.84],
                      [37.53, 55.7],
                    ], // Lwow -> Moscow
                  ].map(([c1, c2], idx) => {
                    const lineFeature: GeoJSON.Feature = {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'LineString',
                        coordinates: [c1, c2],
                      },
                    };
                    const d = pathGenerator(lineFeature);
                    if (!d) return null;
                    return (
                      <path
                        key={`geodesic-${idx}`}
                        d={d}
                        fill="none"
                        stroke={isParchment ? '#B45309' : '#F59E0B'}
                        strokeWidth="1.4"
                        strokeDasharray="4 4"
                        opacity="0.55"
                      />
                    );
                  })}
                </g>
              )}

              {/* Interactive Mathematical Community Pins */}
              {filteredPins.map((pin) => {
                // Note: d3-geo takes [longitude, latitude]
                const projected = projection([pin.coordinates[1], pin.coordinates[0]]);
                if (!projected) return null;
                const [cx, cy] = projected;
                if (cx < -20 || cx > 1020 || cy < -20 || cy > 560) return null;

                const isSelected = selectedPin.id === pin.id;
                const isHovered = hoveredPinId === pin.id;
                const archColor = ARCHETYPE_INFO[pin.archetype].colorHex;
                const showLabel =
                  isSelected ||
                  isHovered ||
                  scaleFilter === 'campania' ||
                  scaleFilter === 'italia';

                return (
                  <g
                    key={pin.id}
                    transform={`translate(${cx}, ${cy})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPin(pin);
                    }}
                    onMouseEnter={() => setHoveredPinId(pin.id)}
                    onMouseLeave={() => setHoveredPinId(null)}
                    className="cursor-pointer"
                  >
                    {/* Outer halo on selected or hovered pin */}
                    {(isSelected || isHovered) && (
                      <circle
                        r={isSelected ? 15 : 12}
                        fill={isSelected ? 'rgba(217, 119, 6, 0.25)' : 'rgba(30, 58, 138, 0.2)'}
                        stroke={isSelected ? '#D97706' : archColor}
                        strokeWidth="2"
                      />
                    )}

                    {/* Pin Marker */}
                    <circle
                      r={isSelected ? 7.5 : isHovered ? 6.5 : 5.2}
                      fill={isSelected ? '#D97706' : archColor}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {/* Clean Callout Badge for active/regional pins */}
                    {showLabel && (
                      <g transform="translate(10, -8)" className="pointer-events-none">
                        <rect
                          x="-2"
                          y="-10"
                          width={
                            Math.min(28, pin.cityOrArea.split(',')[0].length) * 6.4 + 10
                          }
                          height="18"
                          rx="4"
                          fill={
                            isSelected
                              ? '#1C1917'
                              : isParchment
                              ? 'rgba(255, 255, 255, 0.92)'
                              : 'rgba(15, 23, 42, 0.92)'
                          }
                          stroke={isSelected ? '#F59E0B' : '#CBD5E1'}
                          strokeWidth="1"
                        />
                        <text
                          x="3"
                          y="2"
                          fill={
                            isSelected
                              ? '#FDE68A'
                              : isParchment
                              ? '#1C1917'
                              : '#F8FAFC'
                          }
                          fontSize="10.5"
                          fontWeight="600"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {pin.cityOrArea.split(',')[0].split('/')[0]}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Floating Hover Preview Pill in Bottom-Left of Map */}
            {activeHoverPin && (
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md bg-stone-900/95 text-white px-3.5 py-2.5 rounded-xl border border-stone-700 shadow-lg">
                <div className="text-[11px] font-mono-tabular text-amber-300">
                  {activeHoverPin.cityOrArea} · {activeHoverPin.period}
                </div>
                <div className="text-xs font-semibold truncate">{activeHoverPin.name}</div>
              </div>
            )}
          </div>

          <div
            className={`flex flex-wrap items-center justify-between gap-2 mt-3 text-xs px-1 ${
              isParchment ? 'text-stone-600' : 'text-stone-400'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>
                Trascina la mappa per spostarti, usa + / − per lo zoom e clicca sulle puntine.
              </span>
            </span>
            <span className="font-mono-tabular font-semibold">
              {filteredPins.length} comunità visualizzate · Lat {selectedPin.coordinates[0].toFixed(2)}° N, Lng{' '}
              {selectedPin.coordinates[1].toFixed(2)}° E
            </span>
          </div>
        </div>

        {/* Right 5 Columns: Selected Community Monograph */}
        <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs text-stone-500 font-mono-tabular">
              <span>{selectedPin.country.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPin.mode}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPin.isActiveToday ? 'Attiva Oggi' : 'Ecosistema Storico'}</span>
            </div>

            <div>
              <h3 className="text-2xl font-serif-display font-bold text-stone-900 leading-snug">
                {selectedPin.name}
              </h3>
              <p className="text-xs font-semibold text-amber-900 mt-1">
                {selectedPin.cityOrArea} · {selectedPin.period} · {selectedPin.archetypeLabel}
              </p>
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-3.5 text-sm text-stone-700 leading-relaxed">
              <p>{selectedPin.shortDescription}</p>
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4">
                <div className="text-xs font-semibold text-stone-900 mb-1">
                  Pratica Sociale e Trasmissione del Sapere
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {selectedPin.culturalPractice}
                </p>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-stone-900 mb-1.5">
                Figure Chiave, Progetti e Istituzioni Collegate
              </div>
              <div className="text-xs text-stone-600 leading-relaxed">
                {selectedPin.keyFiguresOrProjects.join(' · ')}
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-stone-200 flex items-center justify-between gap-4">
            <div className="text-xs font-mono-tabular text-stone-500">
              Coord: {selectedPin.coordinates[0]}° N, {selectedPin.coordinates[1]}° E
            </div>
            <a
              href={selectedPin.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>Approfondisci / Sito Ufficiale</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Directory Grid of Filtered Communities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPins.map((pin) => {
          const isSelected = pin.id === selectedPin.id;
          return (
            <button
              key={pin.id}
              type="button"
              onClick={() => onSelectPin(pin)}
              className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-stone-900 text-stone-100 border-stone-900 shadow-md'
                  : 'bg-white text-stone-900 border-stone-200/90 hover:border-stone-400 shadow-2xs'
              }`}
            >
              <div>
                <div
                  className={`flex items-center gap-1.5 text-xs mb-1.5 ${
                    isSelected ? 'text-amber-300' : 'text-stone-500'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate font-medium">{pin.cityOrArea}</span>
                  <span aria-hidden="true">·</span>
                  <span className="shrink-0">{pin.mode}</span>
                </div>
                <h4 className="text-lg font-serif-display font-bold leading-snug">
                  {pin.name}
                </h4>
                <p
                  className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                    isSelected ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {pin.shortDescription}
                </p>
              </div>

              <div
                className={`mt-4 pt-3 border-t text-xs flex items-center justify-between ${
                  isSelected
                    ? 'border-stone-700 text-stone-300'
                    : 'border-stone-100 text-stone-500'
                }`}
              >
                <span className="truncate">{ARCHETYPE_INFO[pin.archetype].label}</span>
                <span className="font-mono-tabular shrink-0 ml-2">
                  {pin.isActiveToday ? 'Attiva oggi' : 'Storica'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
