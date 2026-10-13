import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedNumber } from './AnimatedNumber';
import { REPORT_METADATA } from '../data/reportData';
import {
  Users,
  Route,
  Zap,
  Coins,
  ShieldAlert,
  Droplets,
  Activity,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

type MetricCategory = 'all' | 'humanitarian' | 'infrastructure' | 'fiscal' | 'geohazard';

export const ImpactMetricsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MetricCategory>('all');

  const metrics = [
    {
      id: 'displaced-families',
      category: 'humanitarian',
      label: 'Displaced Families Relocated',
      value: REPORT_METADATA.totalDisplacedFamilies,
      unit: 'Households',
      subtext: 'Across Gosaikunda, Kalika, Uttargaya, Naukunda, and Aama Chhodingmo',
      progress: 68,
      progressLabel: '68% in transitional winterized shelters',
      icon: <Users className="w-5 h-5 text-rose-500" />,
    },
    {
      id: 'blocked-highways',
      category: 'infrastructure',
      label: 'Highway Corridor Reopened',
      value: REPORT_METADATA.blockedHighwayKm,
      decimals: 1,
      unit: 'km',
      subtext: 'Pasang Lhamu Highway (Betrawati – Dhunche – Syaphrubesi – Timure)',
      progress: 82,
      progressLabel: '82% of key rockfall blockades cleared',
      icon: <Route className="w-5 h-5 text-amber-500" />,
    },
    {
      id: 'hydropower-disrupted',
      category: 'infrastructure',
      label: 'Hydropower Capacity Disrupted',
      value: REPORT_METADATA.hydropowerDisruptedMw,
      unit: 'MW',
      subtext: 'Upper Trishuli-1, Chilime, Rasuwagadhi, and Mailung HEP intakes',
      progress: 58,
      progressLabel: '58% generation restored or in dry commissioning',
      icon: <Zap className="w-5 h-5 text-sky-500" />,
    },
    {
      id: 'relief-funds',
      category: 'fiscal',
      label: 'Emergency Relief Deployed',
      value: 412.5,
      decimals: 1,
      prefix: 'रू ',
      unit: 'M NPR',
      subtext: 'NPR 412.5M ($3.1M USD) in emergency grants, logistics, and materials',
      progress: 74,
      progressLabel: '74% of district emergency allocation disbursed',
      icon: <Coins className="w-5 h-5 text-emerald-500" />,
    },
    {
      id: 'bridges-restored',
      category: 'infrastructure',
      label: 'Suspension & Bailey Bridges Restored',
      value: REPORT_METADATA.bridgesRestoredCount,
      unit: 'Crossings',
      subtext: '14 critical crossings damaged; 9 reopened via steel truss & cable replacement',
      progress: 64,
      progressLabel: '64% crossings reopened to pedestrian & vehicle transit',
      icon: <Route className="w-5 h-5 text-indigo-500" />,
    },
    {
      id: 'shelters-built',
      category: 'humanitarian',
      label: 'Winterized Transitional Shelters',
      value: REPORT_METADATA.sheltersConstructed,
      unit: 'Shelters',
      subtext: 'Galvanized zinc roofing (CGI) and timber framing completed',
      progress: 68,
      progressLabel: 'Target: 1,200 units before mid-winter freeze',
      icon: <HeartHandshake className="w-5 h-5 text-pink-500" />,
    },
    {
      id: 'water-schemes',
      category: 'geohazard',
      label: 'Potable Gravity Water Schemes',
      value: REPORT_METADATA.waterSchemesRestored,
      unit: 'Schemes',
      subtext: 'Spring intake repairs, HDPE pipeline stringing, and chlorination',
      progress: 67,
      progressLabel: '28 of 42 mountain water supply schemes functional',
      icon: <Droplets className="w-5 h-5 text-cyan-500" />,
    },
    {
      id: 'medical-interventions',
      category: 'humanitarian',
      label: 'Emergency Medical & Health Camps',
      value: REPORT_METADATA.medicalInterventions,
      unit: 'Treatments',
      subtext: 'Airlifted emergency surgeries, cholera prophylaxis, and trauma care',
      progress: 95,
      progressLabel: 'Zero cholera outbreaks reported in evacuation clusters',
      icon: <Activity className="w-5 h-5 text-teal-500" />,
    },
  ];

  const filteredMetrics = metrics.filter((m) => {
    if (activeTab === 'all') return true;
    return m.category === activeTab;
  });

  return (
    <section id="metrics" className="py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#111713] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
              <TrendingUp className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
              <span>Quantitative Impact Index</span>
              <span aria-hidden="true">·</span>
              <span>Validated by NDRRMA &amp; DDMC Rasuwa</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
              Disaster Metrics &amp; Reconstruction Statistics
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
              Real-world operational figures measuring displaced population relief, highway lifeline restoration, power grid stabilization, and emergency fiscal deployment.
            </p>
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/60 dark:bg-stone-800/60 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              All Metrics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('humanitarian')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'humanitarian'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Humanitarian
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('infrastructure')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'infrastructure'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Infrastructure
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fiscal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'fiscal'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Fiscal Grants
            </button>
          </div>
        </div>

        {/* Responsive Grid of Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredMetrics.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800">
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                      {item.unit}
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight tabular-nums">
                      <AnimatedNumber
                        value={item.value}
                        decimals={item.decimals}
                        prefix={item.prefix}
                        suffix={item.unit ? ` ${item.unit}` : ''}
                      />
                    </div>
                    <div className="text-sm font-medium text-stone-800 dark:text-stone-200 mt-1">
                      {item.label}
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                    {item.subtext}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-stone-600 dark:text-stone-400">
                    <span>{item.progressLabel}</span>
                    <span className="font-mono font-medium">{item.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2E4333] dark:bg-[#47684F] rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Municipality Breakdown Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-100">
              Disaster Impact Distribution by Rural Municipality (Gaunpalika)
            </h3>
            <span className="text-xs text-stone-500">Official Ward Census Records</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2 text-xs">
            <div className="space-y-1 p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
              <div className="font-medium text-stone-900 dark:text-stone-100">Gosaikunda</div>
              <div className="text-lg font-serif font-bold text-rose-600 dark:text-rose-400 tabular-nums">622</div>
              <div className="text-stone-500 text-[11px]">Dunche, Saphrubesi, Timure</div>
            </div>

            <div className="space-y-1 p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
              <div className="font-medium text-stone-900 dark:text-stone-100">Kalika</div>
              <div className="text-lg font-serif font-bold text-rose-600 dark:text-rose-400 tabular-nums">345</div>
              <div className="text-stone-500 text-[11px]">Ramche, Kalikasthan</div>
            </div>

            <div className="space-y-1 p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
              <div className="font-medium text-stone-900 dark:text-stone-100">Uttargaya</div>
              <div className="text-lg font-serif font-bold text-amber-600 dark:text-amber-400 tabular-nums">215</div>
              <div className="text-stone-500 text-[11px]">Betrawati, Mailung basin</div>
            </div>

            <div className="space-y-1 p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
              <div className="font-medium text-stone-900 dark:text-stone-100">Aama Chhodingmo</div>
              <div className="text-lg font-serif font-bold text-amber-600 dark:text-amber-400 tabular-nums">180</div>
              <div className="text-stone-500 text-[11px]">Chilime, Thambuchet, Gatlang</div>
            </div>

            <div className="space-y-1 p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
              <div className="font-medium text-stone-900 dark:text-stone-100">Naukunda</div>
              <div className="text-lg font-serif font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">120</div>
              <div className="text-stone-500 text-[11px]">Southeastern highland hamlets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
