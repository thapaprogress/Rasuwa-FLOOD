import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../assets/images';
import { MapPin, AlertOctagon, Waves, Home, Shield, ExternalLink, Filter } from 'lucide-react';

interface DestroyedVillage {
  id: string;
  name: string;
  nepaliName: string;
  municipality: string;
  elevationM: number;
  waterSpeedMs: number;
  waterSpeedKmh: number;
  familiesDisplaced: number;
  structuresDestroyed: number;
  primaryCause: string;
  floodLevelM: string;
  damageSummary: string;
  activeStatus: 'Transitional Housing Active' | 'Highway Reopened / Bypass' | 'Bailey Bridge Operational' | 'Sediment Clearance';
  image: string;
  keyMitigations: string[];
}

export const DestroyedVillagesDossier: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'severe'>('all');
  const [selectedVillageId, setSelectedVillageId] = useState<string>('syaphrubesi');

  const villages: DestroyedVillage[] = [
    {
      id: 'syaphrubesi',
      name: 'Syaphrubesi Lower Bazaar',
      nepaliName: 'स्याफ्रुबेसी तल्लो बजार',
      municipality: 'Gosaikunda Rural Municipality - Ward 5',
      elevationM: 1460,
      waterSpeedMs: 11.4,
      waterSpeedKmh: 41.0,
      familiesDisplaced: 394,
      structuresDestroyed: 48,
      primaryCause: 'Confluence flash surge wave colliding from Langtang Khola and Bhote Koshi with 3.5m boulder bombardment.',
      floodLevelM: '+6.2 meters within 35 minutes',
      damageSummary: 'The riverside commercial core and ancient stone dwellings were swept away down to bedrock. Two suspension footbridges serving high-altitude trails were ripped from their anchors.',
      activeStatus: 'Transitional Housing Active',
      image: IMAGES.syaphrubesiDamage,
      keyMitigations: [
        'Relocated 394 families to Upper Syaphrubesi safe bedrock plateau.',
        'Constructed 220 winterized CGI temporary shelters with timber frames.',
        'Completed 140m reinforced gabion river revetment to prevent future bank scouring.',
      ],
    },
    {
      id: 'ramche',
      name: 'Ramche & Mulkharka',
      nepaliName: 'राम्चे / मुलखर्क पहिरो क्षेत्र',
      municipality: 'Kalika Rural Municipality - Ward 1',
      elevationM: 1780,
      waterSpeedMs: 8.6,
      waterSpeedKmh: 31.0,
      familiesDisplaced: 285,
      structuresDestroyed: 22,
      primaryCause: 'Undercutting of active Main Central Thrust (MCT) geological fault line triggering a 340,000 m³ rotational rock avalanche.',
      floodLevelM: '+5.4 meters canyon river stage',
      damageSummary: 'Engulfed 4.2 km of the Pasang Lhamu Highway. Terraced homes and the community basic school were crushed by massive granite boulders cascading 400m into the Trishuli abyss.',
      activeStatus: 'Highway Reopened / Bypass',
      image: IMAGES.ramcheLandslide,
      keyMitigations: [
        'Round-the-clock excavator deployment clearing 120,000 m³ of rockfall.',
        'Carved a temporary single-lane arterial bypass on stable limestone stratum.',
        'Resettled 285 displaced farming families on Kalikasthan safe ridge.',
      ],
    },
    {
      id: 'timure',
      name: 'Timure & Rasuwagadhi Border',
      nepaliName: 'टिमुरे तथा रसुवागढी नाका',
      municipality: 'Gosaikunda Rural Municipality - Ward 2',
      elevationM: 1814,
      waterSpeedMs: 10.2,
      waterSpeedKmh: 36.7,
      familiesDisplaced: 228,
      structuresDestroyed: 34,
      primaryCause: 'Transboundary glacial runoff surcharge and Ghatte Khola tributary breach overflowing dry port embankments.',
      floodLevelM: '+4.8 meters sudden crest surge',
      damageSummary: 'Customs container inspection depot flooded; Ghatte Khola bridge severed, cutting off Nepal-China cross-border trade and stranding 120 heavy cargo trucks.',
      activeStatus: 'Bailey Bridge Operational',
      image: IMAGES.timureBridge,
      keyMitigations: [
        'Nepal Army engineers assembled 42m heavy-duty steel Bailey bridge in 18 days.',
        'Customs terminal cleared with Armed Police Force combat bulldozers.',
        'Installed solar-powered flood siren relay with transboundary data link.',
      ],
    },
    {
      id: 'mailung',
      name: 'Mailung & Lower Trishuli Basin',
      nepaliName: 'मैलुङ तटीय क्षेत्र',
      municipality: 'Uttargaya Rural Municipality - Ward 1',
      elevationM: 890,
      waterSpeedMs: 5.2,
      waterSpeedKmh: 18.7,
      familiesDisplaced: 165,
      structuresDestroyed: 18,
      primaryCause: 'Hyper-concentrated sediment deposition and river aggradation where canyon widens into agricultural terraces.',
      floodLevelM: '+3.6 meters with 1.5m gravel deposition',
      damageSummary: '18 hectares of fertile terraced rice and maize fields were buried under 1.5m of inert sand and gravel. Motor bridge southern abutment undercut by river eddies.',
      activeStatus: 'Sediment Clearance',
      image: IMAGES.terrainAfter,
      keyMitigations: [
        'Restored irrigation canals and reclaimed 11 hectares of agrarian soil.',
        'Constructed 350m of armored boulder deflection spurs along riverbank.',
        'Cash-for-work grants disbursed to 320 agrarian households.',
      ],
    },
    {
      id: 'dhunche',
      name: 'Dhunche (Dunche) District HQ',
      nepaliName: 'धुन्चे सदरमुकाम',
      municipality: 'Gosaikunda Rural Municipality - Ward 6',
      elevationM: 2030,
      waterSpeedMs: 7.8,
      waterSpeedKmh: 28.1,
      familiesDisplaced: 310,
      structuresDestroyed: 19,
      primaryCause: 'Severe groundwater saturation and deep rotational slope creep directly threatening municipal hospital and civic depot.',
      floodLevelM: 'Chronic geological slope subsidence',
      damageSummary: 'Isolated for 19 days without road access. Severe slope fissures developed beneath the district hospital perimeter and central supply depots.',
      activeStatus: 'Transitional Housing Active',
      image: IMAGES.sheltersReconstruction,
      keyMitigations: [
        'Airlifted 124 critically injured patients via military helicopter air-bridge.',
        'Drilled deep horizontal drainage siphons to relieve sub-surface hydrostatic pressure.',
        'Established 160 transitional shelters on stable bedrock plateau.',
      ],
    },
  ];

  const selectedVillage = villages.find((v) => v.id === selectedVillageId) || villages[0];

  return (
    <section id="destroyed-villages" className="py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#111713] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Forensic Settlement Damage Dossier &amp; Photographic Evidence</span>
            <span aria-hidden="true">·</span>
            <span>Rasuwa District Disaster Assessment</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Destroyed Settlements: Hydrological Speed &amp; Impact
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Detailed forensic records of the hardest-hit mountain settlements along the Trishuli and Bhote Koshi corridors, documenting recorded water speeds, building destruction, and humanitarian resettlement.
          </p>
        </div>

        {/* Village Selection Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {villages.map((v) => {
            const isSelected = selectedVillageId === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVillageId(v.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C261E] text-white border-[#1C261E] dark:bg-stone-800 dark:border-stone-700 shadow-md'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className={isSelected ? 'text-amber-300 font-mono' : 'text-stone-500 font-mono'}>
                    {v.waterSpeedKmh} km/h
                  </span>
                  <span className="text-[10px] text-stone-400">{v.elevationM}m</span>
                </div>
                <div className="font-serif font-medium text-xs sm:text-sm line-clamp-1">
                  {v.name.split(' ')[0]}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                  {v.familiesDisplaced} Families
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Village Detail Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVillage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Photographic Image with Data Badges (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-xl border border-stone-300 dark:border-stone-800 bg-stone-950 relative min-h-[400px] lg:min-h-full">
              <img
                src={selectedVillage.image}
                alt={`${selectedVillage.name} damage in Rasuwa Nepal`}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Water Speed Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/75 backdrop-blur-md rounded-lg border border-white/15 text-white flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono">
                  Recorded Surge Speed: <strong className="text-cyan-300">{selectedVillage.waterSpeedMs} m/s</strong> ({selectedVillage.waterSpeedKmh} km/h)
                </span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-emerald-950/85 backdrop-blur-md rounded-md border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                {selectedVillage.activeStatus}
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-300">
                  {selectedVillage.nepaliName} · Elev. {selectedVillage.elevationM}m
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  {selectedVillage.name}
                </h3>
                <p className="text-xs text-stone-300 font-light line-clamp-2">
                  {selectedVillage.damageSummary}
                </p>
              </div>
            </div>

            {/* Forensic Damage Log (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{selectedVillage.municipality}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100 mt-1">
                    Forensic Damage &amp; Hydrological Survey
                  </h3>
                </div>

                {/* 3 Quantitative Metric Squares */}
                <div className="grid grid-cols-3 gap-3 py-3 border-y border-stone-200 dark:border-stone-800">
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60">
                    <div className="text-[11px] text-stone-500 uppercase tracking-wider">Displaced</div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-rose-600 dark:text-rose-400 tabular-nums mt-0.5">
                      {selectedVillage.familiesDisplaced}
                    </div>
                    <div className="text-[10px] text-stone-400">Households</div>
                  </div>

                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60">
                    <div className="text-[11px] text-stone-500 uppercase tracking-wider">Structures</div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums mt-0.5">
                      {selectedVillage.structuresDestroyed}
                    </div>
                    <div className="text-[10px] text-stone-400">Destroyed</div>
                  </div>

                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60">
                    <div className="text-[11px] text-stone-500 uppercase tracking-wider">Peak Stage</div>
                    <div className="text-base sm:text-lg font-serif font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                      {selectedVillage.floodLevelM.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-stone-400">Flood Rise</div>
                  </div>
                </div>

                {/* Cause Description */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Primary Disaster Mechanism
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-light">
                    {selectedVillage.primaryCause}
                  </p>
                </div>

                {/* Rehabilitation & Recovery Actions Deployed */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Active Rehabilitation &amp; Protective Works
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                    {selectedVillage.keyMitigations.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verified Stamp */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-[11px]">Geo-Survey ID: RSW-VIL-{selectedVillage.id.toUpperCase()}</span>
                <span>Audit Verified by DDMC Rasuwa</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
