import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RELIEF_STRATA_DATA } from '../data/reportData';
import { ReliefStrataItem } from '../types';
import {
  Home,
  Route,
  Zap,
  HeartPulse,
  AlertCircle,
  CheckCircle,
  Building2,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export const ReliefStrataSection: React.FC = () => {
  const [activeStrataId, setActiveStrataId] = useState<ReliefStrataItem['id']>('shelters');

  const activeStrata = RELIEF_STRATA_DATA.find((s) => s.id === activeStrataId) || RELIEF_STRATA_DATA[0];

  const getStrataIcon = (id: ReliefStrataItem['id']) => {
    switch (id) {
      case 'shelters':
        return <Home className="w-4 h-4" />;
      case 'roads':
        return <Route className="w-4 h-4" />;
      case 'hydropower':
        return <Zap className="w-4 h-4" />;
      case 'health':
        return <HeartPulse className="w-4 h-4" />;
    }
  };

  return (
    <section id="relief-strata" className="py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#111713] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <Building2 className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Multi-Sector Reconstruction Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Rasuwa District Post-Disaster Framework</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Relief &amp; Rehabilitation Strata
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Four interconnected rehabilitation pillars organized by emergency urgency, engineering complexity, and long-term climate resilience across the Himalayan mountain basin.
          </p>
        </div>

        {/* Interactive Strata Tab Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {RELIEF_STRATA_DATA.map((stratum) => {
            const isActive = activeStrataId === stratum.id;
            return (
              <button
                key={stratum.id}
                type="button"
                onClick={() => setActiveStrataId(stratum.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C261E] text-white border-[#1C261E] dark:bg-stone-800 dark:border-stone-700 shadow-md'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? 'bg-white/10 text-emerald-300'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {getStrataIcon(stratum.id)}
                  </div>
                  <span
                    className={`text-xs font-mono font-medium ${
                      isActive ? 'text-emerald-300' : 'text-stone-500'
                    }`}
                  >
                    {stratum.fundsDisbursedPercent}% Disbursed
                  </span>
                </div>
                <div className="font-serif font-medium text-sm sm:text-base leading-snug line-clamp-1">
                  {stratum.title}
                </div>
                <div className={`text-xs mt-1 ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                  रू {stratum.budgetAllocatedNprM}M NPR Budget
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Strata Deep-Dive Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStrata.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Visual Photography Card (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 bg-stone-900 relative min-h-[380px] lg:min-h-full">
              <img
                src={activeStrata.image}
                alt={activeStrata.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-2">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-mono">
                  {activeStrata.nepaliTitle}
                </div>
                <div className="font-serif text-xl sm:text-2xl font-light">
                  {activeStrata.keyUnitsDelivered}
                </div>
                <p className="text-xs text-stone-300 font-light">
                  Lead Agency: {activeStrata.leadAgency}
                </p>
              </div>
            </div>

            {/* Detailed Operational Breakdown (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100">
                      {activeStrata.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {activeStrata.primaryRole}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-stone-500 uppercase tracking-wider">Total Allocation</div>
                    <div className="font-serif text-xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                      रू {activeStrata.budgetAllocatedNprM} Million
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400">
                    <span>Fiscal Disbursement &amp; Engineering Execution</span>
                    <span className="font-mono font-medium">{activeStrata.fundsDisbursedPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2A3D2D] dark:bg-[#436447] rounded-full transition-all duration-500"
                      style={{ width: `${activeStrata.fundsDisbursedPercent}%` }}
                    />
                  </div>
                </div>

                {/* Field Highlights */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Field Deliverables &amp; Progress Milestones</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    {activeStrata.fieldHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 pl-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Operational Challenges */}
                <div className="pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>High-Altitude Operational &amp; Terrain Bottlenecks</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                    {activeStrata.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2 pl-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                        <span className="leading-relaxed">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lead Agency Stamp */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Governing Entity: <strong className="text-stone-800 dark:text-stone-200">{activeStrata.leadAgency}</strong></span>
                <span className="font-mono text-[11px]">Audit Status: Verified (FY 2025/26)</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
