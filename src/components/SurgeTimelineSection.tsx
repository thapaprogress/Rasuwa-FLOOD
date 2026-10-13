import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Calendar, Zap, AlertTriangle, Wind, Waves, ShieldCheck, ChevronRight } from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: string;
  date: string;
  phase: string;
  title: string;
  location: string;
  cause: string;
  recordedSpeed: string;
  speedKmH: string;
  dischargeRate: string;
  waterLevelRise: string;
  impactDetails: string[];
  severity: 'Catastrophic' | 'Severe' | 'Critical Alert' | 'Reconstruction';
}

export const SurgeTimelineSection: React.FC = () => {
  const [activeEventIndex, setActiveEventIndex] = useState(2); // Default to Midnight Surge

  const timelineEvents: TimelineEvent[] = [
    {
      id: 'event-cloudburst',
      timestamp: '18:30 NPT',
      date: 'July 8, 2024',
      phase: 'Phase 1: Atmospheric Trigger',
      title: 'Orographic Cloudburst Supercell Over High Catchment',
      location: 'Langtang & Ganesh Himal Watersheds (Elev. 2,400m – 4,800m)',
      cause: 'Monsoon low-pressure trough stalled against steep topography, dumping 264 mm of rainfall in 9 hours, instantly exceeding soil saturation thresholds.',
      recordedSpeed: '3.8 m/s',
      speedKmH: '13.7 km/h',
      dischargeRate: '340 m³/s',
      waterLevelRise: '+1.4 m above datum',
      impactDetails: [
        'Topsoil pore water pressure reached critical liquefaction limit.',
        'Initial debris slumps formed across Ramche and Grang cliff faces.',
        'District administration issued first yellow radio bulletin to downstream police posts.',
      ],
      severity: 'Critical Alert',
    },
    {
      id: 'event-surcharge',
      timestamp: '22:15 NPT',
      date: 'July 8, 2024',
      phase: 'Phase 2: Catchment Surcharge',
      title: 'Tributary Damming & Moraine Siphon Breaches',
      location: 'Upper Bhote Koshi & Langtang Khola Gorges',
      cause: 'Temporary landslide dams breached under hyper-concentrated hydrostatic head. Boulders choked tributary junctions, creating a cascading wave effect.',
      recordedSpeed: '7.2 m/s',
      speedKmH: '25.9 km/h',
      dischargeRate: '780 m³/s',
      waterLevelRise: '+3.2 m in 20 minutes',
      impactDetails: [
        'River water transformed from clear runoff into dense slurry with 38% sediment volume.',
        'Ground acoustic vibrations recorded at Chilime seismic sensor station.',
        'Police post officers sounded hand-crank warning sirens in Syaphrubesi bazaar.',
      ],
      severity: 'Severe',
    },
    {
      id: 'event-surge-midnight',
      timestamp: '23:45 NPT',
      date: 'July 8, 2024',
      phase: 'Phase 3: The Midnight Torrent',
      title: 'Peak Flash Flood Wave Slams Syaphrubesi Confluence',
      location: 'Syaphrubesi Lower Bazaar & Langtang Confluence (1,460m)',
      cause: 'Dual torrents of Bhote Koshi and Langtang Khola collided with massive hydrodynamic shock, carrying 3.5m boulders acting as battering rams.',
      recordedSpeed: '11.4 m/s (Record Peak)',
      speedKmH: '41.0 km/h',
      dischargeRate: '1,420 m³/s (7.6x Normal Flow)',
      waterLevelRise: '+6.2 m in 35 minutes',
      impactDetails: [
        '48 stone and concrete structures completely swept away or structurally unseated.',
        'Syaphrubesi pedestrian suspension bridge severed at southern anchor.',
        '394 families evacuated in pitch darkness to Upper Syaphrubesi high ground with zero casualties.',
      ],
      severity: 'Catastrophic',
    },
    {
      id: 'event-ramche-shear',
      timestamp: '03:15 NPT',
      date: 'July 9, 2024',
      phase: 'Phase 4: Canyon Blockade',
      title: 'Trishuli Gorge Surge & Ramche Landslide Shear',
      location: 'Pasang Lhamu Highway Ch. 68 to Ch. 76 (1,780m)',
      cause: 'Undercutting by high-velocity Trishuli rapids destabilized the toe of the historic Ramche fault line, triggering a 340,000 m³ rotational rock avalanche.',
      recordedSpeed: '8.6 m/s',
      speedKmH: '31.0 km/h',
      dischargeRate: '2,180 m³/s at Betrawati gauge',
      waterLevelRise: '+5.4 m canyon surge',
      impactDetails: [
        '4.2 km of the Pasang Lhamu Highway plunged into the Trishuli river canyon.',
        'Dhunche District Headquarters completely cut off from all vehicular access for 19 days.',
        'Upper Trishuli-1 hydropower cofferdam submerged; heavy construction portals flooded.',
      ],
      severity: 'Catastrophic',
    },
    {
      id: 'event-recon-dawn',
      timestamp: '06:00 NPT',
      date: 'July 9, 2024',
      phase: 'Phase 5: Emergency Air-Bridge',
      title: 'Dawn Military Reconnaissance & Helicopter Air-Bridge',
      location: 'Dhunche Heli-pad & Isolated High Valley Pockets',
      cause: 'Immediate national declaration of Disaster Crisis Zone; mobilization of Nepal Army, Armed Police Force (APF), and Red Cross.',
      recordedSpeed: '5.2 m/s (Receding Flow)',
      speedKmH: '18.7 km/h',
      dischargeRate: '920 m³/s',
      waterLevelRise: 'Receded to +2.8 m (Bed aggraded +4.2m)',
      impactDetails: [
        '124 critically ill patients and injured villagers airlifted by military helicopters.',
        '180 tonnes of emergency grain, zinc sheets, and water chlorination flown into Dhunche.',
        'Establishment of the District Emergency Operations Center (DEOC) operating 24/7.',
      ],
      severity: 'Severe',
    },
    {
      id: 'event-rebuild-cycles',
      timestamp: '2024 – 2026',
      date: 'Multi-Year Timeline',
      phase: 'Phase 6: Systematic Rehabilitation',
      title: 'Geotechnical Stabilization & Transitional Resettlement',
      location: 'Across All 5 Rural Municipalities of Rasuwa District',
      cause: 'Transition from crisis stabilization to permanent climate-resilient engineering and hazard-zoned resettlement.',
      recordedSpeed: '2.5 m/s (Regulated Flow)',
      speedKmH: '9.0 km/h',
      dischargeRate: '190 m³/s (Regulated Baseline)',
      waterLevelRise: 'New Stable River Equilibrium',
      impactDetails: [
        '820 winterized transitional shelters completed on safe bedrock plateaus.',
        '68.4 km of Pasang Lhamu Highway reopened with gabion walls and wire netting.',
        'Ghatte Khola Bailey bridge deployed in 18 days by army combat engineers.',
      ],
      severity: 'Reconstruction',
    },
  ];

  const currentEvent = timelineEvents[activeEventIndex];

  return (
    <section id="surge-timeline" className="py-16 sm:py-24 bg-[#F5F2EB] dark:bg-[#151D16] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <Clock className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Forensic Event Reconstruction &amp; Hydrology Chronology</span>
            <span aria-hidden="true">·</span>
            <span>Rasuwa District Disaster Log</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Time of Occurrence, Causes &amp; Water Velocities
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Examine the exact timeline of the catastrophe: from the evening cloudburst trigger to the midnight flash surge traveling at 41 km/h, the Ramche highway collapse, and dawn military helicopter evacuations.
          </p>
        </div>

        {/* Horizontal Timeline Rail (Interactive Stepper) */}
        <div className="overflow-x-auto pb-3 pt-1">
          <div className="flex items-center gap-3 min-w-[760px]">
            {timelineEvents.map((evt, idx) => {
              const isSelected = activeEventIndex === idx;
              return (
                <button
                  key={evt.id}
                  type="button"
                  onClick={() => setActiveEventIndex(idx)}
                  className={`flex-1 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C261E] text-white border-[#1C261E] dark:bg-stone-800 dark:border-stone-700 shadow-md'
                      : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isSelected ? 'text-amber-300' : 'text-stone-500'}>
                      {evt.timestamp}
                    </span>
                    <span className="text-stone-400">{evt.date.split(',')[0]}</span>
                  </div>
                  <div className="font-serif text-xs sm:text-sm font-semibold line-clamp-1">
                    {evt.title}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                    Speed: {evt.recordedSpeed}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Timeline Card for Selected Event */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-8"
          >
            {/* Top Bar: Phase, Timestamp, Severity */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
                  <Calendar className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                  <span>{currentEvent.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-800 dark:text-stone-200 font-semibold">{currentEvent.timestamp}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentEvent.phase}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100 mt-1">
                  {currentEvent.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Location: {currentEvent.location}
                </p>
              </div>

              <div className="shrink-0">
                <span
                  className={`inline-block px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider ${
                    currentEvent.severity === 'Catastrophic'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : currentEvent.severity === 'Severe'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : currentEvent.severity === 'Critical Alert'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {currentEvent.severity} Status
                </span>
              </div>
            </div>

            {/* 4 Quantitative Telemetry Badges: Water Speed & Discharge */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <div className="text-xs text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  Recorded Water Velocity
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums mt-1">
                  {currentEvent.recordedSpeed}
                </div>
                <div className="text-[11px] text-stone-500 font-mono mt-0.5">{currentEvent.speedKmH}</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <div className="text-xs text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Peak Flood Discharge
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums mt-1">
                  {currentEvent.dischargeRate}
                </div>
                <div className="text-[11px] text-stone-500 font-mono mt-0.5">Hydrological Sensor Log</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <div className="text-xs text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  River Stage Surge
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums mt-1">
                  {currentEvent.waterLevelRise}
                </div>
                <div className="text-[11px] text-stone-500 font-mono mt-0.5">Vertical Crest Rise</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                <div className="text-xs text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Flow Regime
                </div>
                <div className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                  Hyper-Concentrated
                </div>
                <div className="text-[11px] text-stone-500 font-mono mt-0.5">38–42% Sediment / Vol</div>
              </div>
            </div>

            {/* Root Cause & Consequences Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              <div className="lg:col-span-6 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Scientific Trigger &amp; Geophysical Cause
                </h4>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-light">
                  {currentEvent.cause}
                </p>
              </div>

              <div className="lg:col-span-6 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Direct Field Consequences &amp; Operational Impact
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  {currentEvent.impactDetails.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-100 shrink-0 mt-2" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
