import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ShieldCheck, Home, Route, Droplets, Zap, RotateCcw, Download } from 'lucide-react';

export const RecoveryResourceCalculator: React.FC = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('Gosaikunda');
  const [shelterUnits, setShelterUnits] = useState<number>(240);
  const [roadMeters, setRoadMeters] = useState<number>(1800);
  const [waterSchemes, setWaterSchemes] = useState<number>(8);
  const [riverSpurs, setRiverSpurs] = useState<number>(3);

  // Unit costs in NPR
  const COST_PER_SHELTER = 120000; // NPR 120k per winterized CGI shelter
  const COST_PER_METER_ROAD = 45000; // NPR 45k per meter of gabion + high-tensile wire mesh
  const COST_PER_WATER_SCHEME = 1800000; // NPR 1.8M per gravity spring water system
  const COST_PER_RIVER_SPUR = 8500000; // NPR 8.5M per heavy boulder deflector spur

  const totalNpr =
    shelterUnits * COST_PER_SHELTER +
    roadMeters * COST_PER_METER_ROAD +
    waterSchemes * COST_PER_WATER_SCHEME +
    riverSpurs * COST_PER_RIVER_SPUR;

  const totalUsd = Math.round(totalNpr / 132); // 1 USD ~ 132 NPR
  const familiesProtected = Math.round(shelterUnits * 1.15 + (roadMeters / 100) * 12);
  const waterLitresPerDay = waterSchemes * 12500;
  const estimatedMonths = Math.max(3, Math.min(24, Math.round(totalNpr / 25000000)));

  const handleResetToBaseline = () => {
    setShelterUnits(240);
    setRoadMeters(1800);
    setWaterSchemes(8);
    setRiverSpurs(3);
  };

  return (
    <section id="resource-simulator" className="py-16 sm:py-24 bg-[#F5F2EB] dark:bg-[#151D16] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <Calculator className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Interactive Resource Allocation Engine</span>
            <span aria-hidden="true">·</span>
            <span>Rasuwa District Post-Disaster Planning</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Rehabilitation Resource &amp; Budget Simulator
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
            Simulate recovery resource requirements across Rasuwa&apos;s rural municipalities. Adjust transitional shelter allocations, road retaining lengths, and drinking water schemes to evaluate fiscal and humanitarian outcomes.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-7">
            {/* Target Municipality Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Target Rural Municipality (Gaunpalika)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Gosaikunda',
                  'Kalika',
                  'Uttargaya',
                  'Aama Chhodingmo',
                  'Naukunda',
                ].map((mun) => (
                  <button
                    key={mun}
                    type="button"
                    onClick={() => setSelectedMunicipality(mun)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                      selectedMunicipality === mun
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-transparent shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {mun}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6 pt-2">
              {/* Slider 1: Transitional Shelters */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-rose-500" />
                    Transitional CGI Shelters (Timber Frame &amp; Zinc Roof)
                  </span>
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {shelterUnits} Units
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  step="10"
                  value={shelterUnits}
                  onChange={(e) => setShelterUnits(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>20 units</span>
                  <span>रू 120,000 / unit</span>
                  <span>600 units</span>
                </div>
              </div>

              {/* Slider 2: Road Retaining Walls & Wire Mesh */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5 text-amber-500" />
                    Gabion Retaining &amp; Slope Mesh Stabilization
                  </span>
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {roadMeters.toLocaleString()} Meters
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={roadMeters}
                  onChange={(e) => setRoadMeters(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>200m</span>
                  <span>रू 45,000 / meter</span>
                  <span>5,000m</span>
                </div>
              </div>

              {/* Slider 3: Gravity Water Schemes */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-sky-500" />
                    Gravity Spring HDPE Potable Water Systems
                  </span>
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {waterSchemes} Schemes
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={waterSchemes}
                  onChange={(e) => setWaterSchemes(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>1 scheme</span>
                  <span>रू 1.8M / scheme</span>
                  <span>20 schemes</span>
                </div>
              </div>

              {/* Slider 4: Heavy Boulder River Deflectors */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-500" />
                    Armored Boulder Spurs &amp; Silt Deflection Bunds
                  </span>
                  <span className="font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {riverSpurs} Spurs
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={riverSpurs}
                  onChange={(e) => setRiverSpurs(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>1 spur</span>
                  <span>रू 8.5M / spur</span>
                  <span>8 spurs</span>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleResetToBaseline}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to DDMC Recommended Baseline</span>
              </button>
            </div>
          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#1C281F] text-white border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider font-mono">
                    Projected Requirement
                  </div>
                  <div className="text-sm font-serif text-emerald-300 mt-0.5">
                    {selectedMunicipality} Relief Sector
                  </div>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Total Budget Display */}
              <div>
                <div className="text-xs text-stone-400 uppercase tracking-wider">
                  Total Estimated Investment
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white tabular-nums mt-1">
                  रू {(totalNpr / 1000000).toFixed(1)} Million
                </div>
                <div className="text-xs text-stone-400 font-mono mt-1">
                  Approx. ${totalUsd.toLocaleString()} USD (at 1:132 NPR exchange)
                </div>
              </div>

              {/* Impact Indicators */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center py-2 border-t border-white/10 text-xs">
                  <span className="text-stone-300">Families Protected &amp; Re-housed</span>
                  <span className="font-serif font-bold text-white tabular-nums text-sm">
                    {familiesProtected.toLocaleString()} Households
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-white/10 text-xs">
                  <span className="text-stone-300">Potable Spring Water Generated</span>
                  <span className="font-serif font-bold text-white tabular-nums text-sm">
                    {waterLitresPerDay.toLocaleString()} L / Day
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-white/10 text-xs">
                  <span className="text-stone-300">Estimated Engineering Duration</span>
                  <span className="font-serif font-bold text-amber-300 tabular-nums text-sm">
                    {estimatedMonths} Months to Completion
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-white/10 text-xs">
                  <span className="text-stone-300">Hazard Vulnerability Reduction</span>
                  <span className="font-serif font-bold text-emerald-400 tabular-nums text-sm">
                    ~{Math.min(92, 45 + Math.round((roadMeters / 5000) * 35 + (riverSpurs / 8) * 15))}%
                  </span>
                </div>
              </div>
            </div>

            {/* Note & Guidelines */}
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-stone-300 leading-relaxed">
              Calculations based on 2025/2026 District Disaster Management Committee (DDMC) scheduled rates for high-altitude transport and military engineering deployment.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
