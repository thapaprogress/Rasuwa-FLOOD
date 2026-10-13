import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Waves, Zap, ShieldAlert, ArrowRight, Gauge, Cpu } from 'lucide-react';

export const WaterVelocityPhysicsSection: React.FC = () => {
  const [velocity, setVelocity] = useState<number>(11.4); // Default to recorded peak: 11.4 m/s

  // Debris slurry density ~ 1,450 kg/m³ (water + 38% quartz/granite sediment)
  const DENSITY_SLURRY = 1450;
  // Dynamic Pressure = 0.5 * rho * v^2 in Pascals -> convert to kPa
  const dynamicPressureKPa = (0.5 * DENSITY_SLURRY * Math.pow(velocity, 2)) / 1000;
  // Boulder diameter transport capacity ~ proportional to v^2
  // At 2.5 m/s -> ~0.15m. At 11.4 m/s -> ~3.6m
  const maxBoulderDiameterM = Math.min(4.8, 0.027 * Math.pow(velocity, 2));
  const velocityKmH = (velocity * 3.6).toFixed(1);

  // Destruction index
  let destructionState = 'Structural Obliteration (Bridge & Masonry Failure)';
  let stateColor = 'text-rose-500';
  if (velocity < 4.0) {
    destructionState = 'Stable Channel / Pebble Movement';
    stateColor = 'text-emerald-500';
  } else if (velocity < 7.0) {
    destructionState = 'Bank Erosion / Unreinforced Scouring';
    stateColor = 'text-amber-500';
  } else if (velocity < 10.0) {
    destructionState = 'Severe Submergence & Road Shoulder Shear';
    stateColor = 'text-orange-500';
  }

  return (
    <section className="py-16 sm:py-24 bg-[#F5F2EB] dark:bg-[#151D16] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <Cpu className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Fluid Dynamics &amp; Structural Impact Mechanics</span>
            <span aria-hidden="true">·</span>
            <span>Hydraulic Energy Analysis</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Water Speed &amp; Destruction Physics: How 41 km/h Crushed Concrete
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Why did reinforced concrete bridge abutments and heavy stone buildings collapse? Use the diagnostic slider below to explore how hydrodynamic impact pressure scales with the square of velocity ($P = \frac{1}{2} \rho v^2$), turning sediment-laden floodwaters into an irresistible force.
          </p>
        </div>

        {/* Interactive Physics Diagnostic Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls & Velocity Slider (6 cols) */}
          <div className="lg:col-span-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Simulate Torrent Velocity ($v$) in Mountain Canyon
                </label>
                <div className="flex items-baseline justify-between mt-2">
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {velocity.toFixed(1)} m/s
                  </div>
                  <div className="text-sm font-mono text-stone-500">
                    {velocityKmH} km/h
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="1.0"
                  max="13.0"
                  step="0.1"
                  value={velocity}
                  onChange={(e) => setVelocity(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-stone-100"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-400">
                  <span>1.0 m/s (Gentle)</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">11.4 m/s (Rasuwa 2024 Record)</span>
                  <span>13.0 m/s (Extreme Gorge)</span>
                </div>
              </div>

              {/* Preset buttons */}
              <div className="pt-2">
                <div className="text-[11px] text-stone-500 uppercase tracking-wider mb-2">
                  Benchmark Water Speed Scenarios
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setVelocity(2.5)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                      velocity === 2.5
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    Normal Monsoon (2.5 m/s)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVelocity(5.2)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                      velocity === 5.2
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    Betrawati Basin (5.2 m/s)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVelocity(8.6)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                      velocity === 8.6
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    Ramche Trishuli (8.6 m/s)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVelocity(11.4)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer font-bold ${
                      velocity === 11.4
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                    }`}
                  >
                    ★ Syaphrubesi Peak (11.4 m/s)
                  </button>
                </div>
              </div>
            </div>

            {/* Explanatory note */}
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
              Slurry Density (&rho; &asymp; 1,450 kg/m&sup3;) accounts for heavy quartz, gneiss, and sediment suspension. Pure water exerts 31% less pressure at identical velocities.
            </div>
          </div>

          {/* Real-time Dynamic Force Calculation Results (6 cols) */}
          <div className="lg:col-span-6 bg-[#1A261D] text-white border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-md space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider font-mono">
                    Hydrodynamic Force Output
                  </div>
                  <div className={`text-sm font-semibold mt-0.5 ${stateColor}`}>
                    {destructionState}
                  </div>
                </div>
                <Gauge className="w-5 h-5 text-emerald-400" />
              </div>

              {/* 3 Metric Rows */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-xs text-stone-400 uppercase tracking-wider">
                    Dynamic Impact Pressure ($P = \frac{1}{2} \rho v^2$)
                  </div>
                  <div className="text-3xl font-serif font-bold text-white tabular-nums">
                    {dynamicPressureKPa.toFixed(1)} kPa
                  </div>
                  <div className="text-xs text-stone-300 font-mono">
                    Equivalent to { (dynamicPressureKPa / 9.81).toFixed(1) } tonnes of direct thrust per square meter
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-xs text-stone-400 uppercase tracking-wider">
                    Maximum Boulder Diameter Transportable
                  </div>
                  <div className="text-3xl font-serif font-bold text-cyan-300 tabular-nums">
                    {maxBoulderDiameterM.toFixed(2)} Meters
                  </div>
                  <div className="text-xs text-stone-300">
                    Boulders this size are lifted and rolled along the riverbed as projectile battering rams
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-xs text-stone-400 uppercase tracking-wider">
                    Destructive Energy Multiplier vs. Normal Flow
                  </div>
                  <div className="text-3xl font-serif font-bold text-amber-300 tabular-nums">
                    {(Math.pow(velocity, 2) / Math.pow(2.5, 2)).toFixed(1)}x Fold Increase
                  </div>
                  <div className="text-xs text-stone-300">
                    Energy scales exponentially: jumping from 2.5 m/s to 11.4 m/s generates over 20x the destruction
                  </div>
                </div>
              </div>
            </div>

            {/* Takeaway */}
            <div className="text-[11px] text-stone-300 font-light border-t border-white/10 pt-3">
              This exponential hydrodynamic force explains why the 128m Syaphrubesi suspension bridge abutment and 48 stone buildings failed within 35 minutes of the wave&apos;s arrival.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
