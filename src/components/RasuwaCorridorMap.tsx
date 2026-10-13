import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Zap,
  Navigation,
  LifeBuoy,
  AlertTriangle,
  Compass,
  Layers,
  CheckCircle2,
  Maximize2,
  Eye,
  Crosshair,
} from 'lucide-react';
import { AFFECTED_REGIONS_DATA, INFRASTRUCTURE_POINTS } from '../data/reportData';
import { InfrastructurePoint, AffectedRegion, InfrastructureCategory } from '../types';

// Real geographic coordinate definitions for Rasuwa District
export interface GeoLocationItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'settlement' | InfrastructureCategory;
  categoryLabel: string;
  elevationM: number;
  severity: string;
  description: string;
}

const GEO_POINTS: GeoLocationItem[] = [
  // Key Settlements
  {
    id: 'saphrubesi',
    name: 'Syaphrubesi (Saphrubesi)',
    lat: 28.1565,
    lng: 85.3355,
    type: 'settlement',
    categoryLabel: 'Affected Settlement',
    elevationM: 1460,
    severity: 'Critical Priority (48 Houses Swept)',
    description: 'Confluence flash surge point of Langtang Khola & Bhote Koshi. 394 families relocated to upper terraces.',
  },
  {
    id: 'dunche',
    name: 'Dhunche (District HQ)',
    lat: 28.1105,
    lng: 85.306,
    type: 'settlement',
    categoryLabel: 'Affected Settlement',
    elevationM: 2030,
    severity: 'Critical (Hospital Perimeter Subsidence)',
    description: 'District headquarters isolated for 19 days. Heli-evacuation and horizontal drainage dewatering.',
  },
  {
    id: 'ramche-mulkharka',
    name: 'Ramche & Mulkharka',
    lat: 28.0645,
    lng: 85.241,
    type: 'settlement',
    categoryLabel: 'Affected Settlement',
    elevationM: 1780,
    severity: 'Severe (4.2 km Highway Engulfed)',
    description: '340,000 m³ rotational rock avalanche destroyed school and severed Pasang Lhamu Highway.',
  },
  {
    id: 'timure-rasuwagadhi',
    name: 'Timure & Border Post',
    lat: 28.2678,
    lng: 85.378,
    type: 'settlement',
    categoryLabel: 'Affected Settlement',
    elevationM: 1814,
    severity: 'Severe (Customs Terminal Flooded)',
    description: 'Transboundary surge overwhelmed container depot and severed Ghatte Khola bridge.',
  },
  {
    id: 'mailung-betrawati',
    name: 'Mailung Basin',
    lat: 28.028,
    lng: 85.195,
    type: 'settlement',
    categoryLabel: 'Affected Settlement',
    elevationM: 890,
    severity: 'Severe (18 ha Paddy Silt Burial)',
    description: 'Riverbed aggradation of +4.2m buried fertile agricultural terraces under gravel.',
  },
  {
    id: 'thambuchet-chilime',
    name: 'Thambuchet & Chilime',
    lat: 28.196,
    lng: 85.289,
    type: 'settlement',
    categoryLabel: 'Affected Settlement',
    elevationM: 1950,
    severity: 'Moderate Stabilized',
    description: 'Chilime valley Tamang communities. Pedestrian bridge restored and tailrace protected.',
  },
  {
    id: 'gatlang',
    name: 'Gatlang Traditional Village',
    lat: 28.142,
    lng: 85.258,
    type: 'settlement',
    categoryLabel: 'Affected Settlement',
    elevationM: 2238,
    severity: 'Transitional Timber Housing',
    description: 'Black village of Rasuwa. Traditional timber framing used for dignified transitional shelters.',
  },
  {
    id: 'betrawati-gateway',
    name: 'Betrawati Gateway',
    lat: 27.979,
    lng: 85.178,
    type: 'settlement',
    categoryLabel: 'Affected Settlement',
    elevationM: 630,
    severity: 'Lower Basin Flood Stage Station',
    description: 'Southern entrance to Rasuwa District; primary relief staging checkpoint.',
  },

  // Hydropower Projects
  {
    id: 'upper-trishuli-1',
    name: 'Upper Trishuli-1 HEP (216 MW)',
    lat: 28.055,
    lng: 85.228,
    type: 'hydropower',
    categoryLabel: 'Hydropower Project',
    elevationM: 1240,
    severity: 'Under Restoration',
    description: 'Cofferdam submerged; 45,000 m³ gravel deposited in intake basin. Armored diversion spurs built.',
  },
  {
    id: 'chilime-hep',
    name: 'Chilime Hydropower (22.1 MW)',
    lat: 28.212,
    lng: 85.281,
    type: 'hydropower',
    categoryLabel: 'Hydropower Project',
    elevationM: 1980,
    severity: 'Operational / Restored',
    description: 'Desanding chamber flushed; brought back online delivering full 22.1 MW generation.',
  },
  {
    id: 'rasuwagadhi-hep',
    name: 'Rasuwagadhi Hydropower (111 MW)',
    lat: 28.273,
    lng: 85.381,
    type: 'hydropower',
    categoryLabel: 'Hydropower Project',
    elevationM: 1820,
    severity: 'Under Restoration',
    description: 'Headworks sluice gate impacted by boulders; hydraulic actuators replaced.',
  },

  // Bridges & Crossings
  {
    id: 'saphrubesi-bridge',
    name: 'Syaphrubesi Suspension Bridge',
    lat: 28.1575,
    lng: 85.337,
    type: 'bridge',
    categoryLabel: 'Bridges & Crossings',
    elevationM: 1460,
    severity: 'Rebuilt (January 2026)',
    description: '128m steel cable pedestrian lifeline reconstructed 3m higher on solid bedrock anchors.',
  },
  {
    id: 'ghatte-khola-bailey',
    name: 'Ghatte Khola Bailey Bridge',
    lat: 28.258,
    lng: 85.372,
    type: 'bridge',
    categoryLabel: 'Bridges & Crossings',
    elevationM: 1810,
    severity: 'Operational in 18 Days',
    description: '42m modular steel truss assembled by Nepal Army engineers under monsoon rainfall.',
  },
  {
    id: 'mailung-crossing',
    name: 'Mailung Motor Bridge',
    lat: 28.029,
    lng: 85.196,
    type: 'bridge',
    categoryLabel: 'Bridges & Crossings',
    elevationM: 890,
    severity: 'Severe Damage / One-Lane Limit',
    description: 'Southern abutment undercut by river eddy; reinforced micropiles driven.',
  },

  // Highway Damage & Rescue Hubs
  {
    id: 'pasang-lhamu-ch74',
    name: 'Pasang Lhamu Highway (Ramche Rockfall)',
    lat: 28.066,
    lng: 85.243,
    type: 'highway',
    categoryLabel: 'Highway Arterial',
    elevationM: 1780,
    severity: 'Active Clearance & Wire Mesh Netting',
    description: 'High-velocity rockslides sheared road surface. 12,400 m³ gabion retaining walls installed.',
  },
  {
    id: 'dunche-coordination-hub',
    name: 'Dhunche Emergency Heli-pad & EOC',
    lat: 28.112,
    lng: 85.308,
    type: 'rescue_hub',
    categoryLabel: 'Rescue & Coordination Hub',
    elevationM: 2030,
    severity: 'Operational 24/7',
    description: 'Central district disaster coordination hub; handled 312 emergency helicopter sorties.',
  },
  {
    id: 'saphrubesi-forward-base',
    name: 'Syaphrubesi Forward Logistics Depot',
    lat: 28.155,
    lng: 85.334,
    type: 'rescue_hub',
    categoryLabel: 'Rescue & Coordination Hub',
    elevationM: 1470,
    severity: 'Operational Logistics Base',
    description: 'Transshipment depot dispatching mule caravans and porters with corrugated zinc roofing.',
  },
];

// River coordinates for realistic real-world geographic polylines
const RIVER_BHOTE_KOSHI_GEO: [number, number][] = [
  [28.28, 85.385],
  [28.273, 85.381],
  [28.2678, 85.378],
  [28.24, 85.365],
  [28.20, 85.35],
  [28.17, 85.34],
  [28.1565, 85.3355],
];

const RIVER_LANGTANG_GEO: [number, number][] = [
  [28.21, 85.50],
  [28.19, 85.45],
  [28.17, 85.38],
  [28.1565, 85.3355],
];

const RIVER_TRISHULI_GEO: [number, number][] = [
  [28.1565, 85.3355],
  [28.135, 85.32],
  [28.1105, 85.306],
  [28.08, 85.27],
  [28.055, 85.228],
  [28.028, 85.195],
  [27.979, 85.178],
  [27.94, 85.16],
];

export const RasuwaCorridorMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);

  const [mapLayerType, setMapLayerType] = useState<'satellite' | 'terrain' | 'dark'>('satellite');
  const [activeCategory, setActiveCategory] = useState<'all' | 'settlement' | InfrastructureCategory>('all');
  const [selectedPointId, setSelectedPointId] = useState<string>('saphrubesi');

  const selectedPoint = GEO_POINTS.find((p) => p.id === selectedPointId) || GEO_POINTS[0];
  const matchedRegion = AFFECTED_REGIONS_DATA.find((r) => r.id === selectedPointId);
  const matchedInfra = INFRASTRUCTURE_POINTS.find((i) => i.id === selectedPointId);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Rasuwa District, Nepal
    const map = L.map(mapContainerRef.current, {
      center: [28.15, 85.30],
      zoom: 11,
      minZoom: 9,
      maxZoom: 18,
      zoomControl: false,
    });

    // Add Zoom Control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial Satellite Tile Layer (Esri World Imagery)
    const satLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri, Maxar, Earthstar Geographics, CNES/Airbus DS',
        maxZoom: 18,
      }
    ).addTo(map);

    baseTileLayerRef.current = satLayer;

    // Add River Polylines
    // 1. Bhote Koshi
    L.polyline(RIVER_BHOTE_KOSHI_GEO, {
      color: '#06b6d4',
      weight: 4.5,
      opacity: 0.9,
      lineCap: 'round',
    }).addTo(map);

    // 2. Langtang Khola
    L.polyline(RIVER_LANGTANG_GEO, {
      color: '#38bdf8',
      weight: 3.5,
      opacity: 0.85,
      lineCap: 'round',
    }).addTo(map);

    // 3. Trishuli River
    L.polyline(RIVER_TRISHULI_GEO, {
      color: '#0284c7',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
    }).addTo(map);

    // Create markers layer group
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile Layer Switching (Satellite vs Terrain vs Dark)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
    }

    let tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let attribution = '&copy; Esri, Maxar, Earthstar Geographics';

    if (mapLayerType === 'terrain') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
    } else if (mapLayerType === 'dark') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
      attribution = '&copy; CARTO, OpenStreetMap';
    }

    const newLayer = L.tileLayer(tileUrl, { attribution, maxZoom: 18 }).addTo(map);
    baseTileLayerRef.current = newLayer;
  }, [mapLayerType]);

  // Update Markers based on active category & selected point
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markersLayer = markersLayerRef.current;
    markersLayer.clearLayers();

    const filtered = GEO_POINTS.filter((p) => {
      if (activeCategory === 'all') return true;
      return p.type === activeCategory;
    });

    filtered.forEach((pt) => {
      const isSelected = selectedPointId === pt.id;

      // Color based on type
      let colorBg = '#ef4444'; // Red for settlements
      let iconSymbol = '📍';
      if (pt.type === 'hydropower') {
        colorBg = '#f59e0b';
        iconSymbol = '⚡';
      } else if (pt.type === 'bridge') {
        colorBg = '#0284c7';
        iconSymbol = '🌉';
      } else if (pt.type === 'highway') {
        colorBg = '#e11d48';
        iconSymbol = '⚠️';
      } else if (pt.type === 'rescue_hub') {
        colorBg = '#10b981';
        iconSymbol = '🚁';
      }

      // Custom Leaflet DivIcon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${isSelected ? '36px' : '28px'};
            height: ${isSelected ? '36px' : '28px'};
            background-color: ${colorBg};
            color: #ffffff;
            border-radius: 9999px;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
            cursor: pointer;
            transition: all 0.2s ease;
            transform: translate(-50%, -50%);
          ">
            <span style="font-size: ${isSelected ? '16px' : '12px'};">${iconSymbol}</span>
            ${
              isSelected
                ? `<div style="
                    position: absolute;
                    inset: -6px;
                    border-radius: 9999px;
                    border: 2px solid #ffffff;
                    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                    opacity: 0.75;
                  "></div>`
                : ''
            }
          </div>
        `,
        iconSize: [0, 0],
      });

      const marker = L.marker([pt.lat, pt.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedPointId(pt.id);
        mapInstanceRef.current?.flyTo([pt.lat, pt.lng], 13, { duration: 1.2 });
      });

      // Tooltip
      marker.bindTooltip(`<strong>${pt.name}</strong><br/><span style="font-size: 11px;">${pt.severity}</span>`, {
        direction: 'top',
        offset: [0, -18],
        opacity: 0.95,
      });

      marker.addTo(markersLayer);
    });
  }, [activeCategory, selectedPointId]);

  // Center on selected point button
  const handleFlyToPoint = (lat: number, lng: number) => {
    mapInstanceRef.current?.flyTo([lat, lng], 13, { duration: 1.2 });
  };

  return (
    <section id="corridor-map" className="py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#111713] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
              <Compass className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
              <span>Real Satellite Maps Integration · Rasuwa District, Nepal</span>
              <span aria-hidden="true">·</span>
              <span>Coordinates: N28°09&apos; E85°19&apos;</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
              Interactive Affected Corridors &amp; Satellite Survey
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
              Explore high-resolution satellite imagery and terrain maps of the Trishuli and Bhote Koshi canyons. Switch between satellite orthophoto and topographic layers to inspect destroyed settlements, breached bridges, and hydropower stations.
            </p>
          </div>

          {/* Map Layer Switcher (Satellite vs Terrain vs Dark) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 dark:bg-stone-800/60 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setMapLayerType('satellite')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                mapLayerType === 'satellite'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-500" />
              <span>Satellite View</span>
            </button>
            <button
              type="button"
              onClick={() => setMapLayerType('terrain')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                mapLayerType === 'terrain'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Topographic</span>
            </button>
            <button
              type="button"
              onClick={() => setMapLayerType('dark')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                mapLayerType === 'dark'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <span>Dark Slate</span>
            </button>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'settlement', 'hydropower', 'bridge', 'highway', 'rescue_hub'] as const).map((cat) => {
            let label = 'All Corridors & Points';
            if (cat === 'settlement') label = 'Settlements (Dunche, Syaphrubesi, Ramche)';
            if (cat === 'hydropower') label = 'Hydropower Projects';
            if (cat === 'bridge') label = 'Suspension & Bailey Bridges';
            if (cat === 'highway') label = 'Highway Blockades';
            if (cat === 'rescue_hub') label = 'Rescue & Coordination Hubs';

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Real Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Real Leaflet Map Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#151F18] border border-stone-300 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm relative flex flex-col justify-between min-h-[520px]">
            {/* Top Operational Ribbon */}
            <div className="px-5 py-3 border-b border-stone-800/80 bg-[#121B15] flex items-center justify-between text-xs text-stone-300 z-20">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>
                  {mapLayerType.toUpperCase()} MODE · HIMALAYAN SECTOR WGS84
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-stone-400">
                <span className="text-cyan-300">● Bhote Koshi</span>
                <span className="text-sky-400">● Trishuli Gorge</span>
              </div>
            </div>

            {/* The Actual Leaflet Map Canvas */}
            <div className="relative w-full h-[460px] sm:h-[500px]">
              <div ref={mapContainerRef} className="w-full h-full z-10" />

              {/* Recenter Button */}
              <button
                type="button"
                onClick={() => handleFlyToPoint(selectedPoint.lat, selectedPoint.lng)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-lg bg-stone-900/80 text-white hover:bg-stone-900 border border-white/20 backdrop-blur-xs shadow-md transition-colors cursor-pointer"
                title="Recenter on Selected Point"
              >
                <Crosshair className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Bottom Map Legend */}
            <div className="px-5 py-3 border-t border-stone-800/80 bg-[#121B15] flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300 z-20">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Settlements
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Hydropower
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Bridges
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Rescue Hubs
                </span>
              </div>
              <div className="text-stone-400 text-[11px]">Click any marker to inspect &amp; fly to location</div>
            </div>
          </div>

          {/* Inspector Card (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{selectedPoint.categoryLabel}</span>
                </div>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  Elev. {selectedPoint.elevationM}m
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100">
                  {selectedPoint.name}
                </h3>
                <div className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-1">
                  {selectedPoint.severity}
                </div>
              </div>

              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-light">
                {selectedPoint.description}
              </p>

              {/* GPS Coordinates & Fly button */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-mono">Geographic Coordinates</div>
                  <div className="font-mono text-stone-900 dark:text-stone-100 mt-0.5">
                    Lat {selectedPoint.lat.toFixed(4)}°N · Lng {selectedPoint.lng.toFixed(4)}°E
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFlyToPoint(selectedPoint.lat, selectedPoint.lng)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-md hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Fly To</span>
                </button>
              </div>

              {/* Matched Settlement or Infrastructure Details */}
              {matchedRegion && (
                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Disaster Relief Actions Deployed
                  </div>
                  <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                    {matchedRegion.rehabActions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {matchedInfra && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs">
                  <div>
                    <div className="text-stone-500 uppercase">Restoration Budget</div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                      रू {matchedInfra.budgetNprMillion}M NPR
                    </div>
                  </div>
                  <div>
                    <div className="text-stone-500 uppercase">Timeline</div>
                    <div className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                      {matchedInfra.restorationTimeline}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Point Selector */}
            <div className="pt-2">
              <div className="text-[11px] text-stone-500 uppercase tracking-wider mb-2">
                Quick Select Landmark
              </div>
              <div className="flex flex-wrap gap-1.5">
                {GEO_POINTS.slice(0, 6).map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => {
                      setSelectedPointId(pt.id);
                      handleFlyToPoint(pt.lat, pt.lng);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-sm border transition-colors cursor-pointer ${
                      selectedPointId === pt.id
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-transparent font-medium'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {pt.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
