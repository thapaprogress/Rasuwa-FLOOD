import React from 'react';
import { motion } from 'motion/react';
import { STRATEGIC_ROADMAP, REPORT_METADATA } from '../data/reportData';
import { ShieldCheck, Compass, HeartHandshake, Building2 } from 'lucide-react';

export const RoadmapGratitudeSection: React.FC = () => {
  const partners = [
    'National Disaster Risk Reduction & Management Authority (NDRRMA)',
    'District Disaster Management Committee (DDMC) Rasuwa',
    'District Administration Office (DAO) Dhunche',
    'Nepal Red Cross Society - Rasuwa Chapter',
    'Nepal Army Engineering Directorate',
    'Armed Police Force (APF) Disaster Response Unit',
    'Nepal Electricity Authority (NEA)',
    'Department of Roads (DoR) - Galchhi-Mailung-Syaphrubesi Project',
    'UN-Habitat Nepal & WFP Logistics Cluster',
    'Langtang Community Youth Disaster Volunteers',
  ];

  return (
    <section id="roadmap" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-t border-stone-200 dark:border-stone-800 bg-[#FBF9F5] dark:bg-[#111713] text-[#1C241E] dark:text-[#EAE6DF] transition-colors">
      <div className="max-w-6xl mx-auto w-full space-y-20">
        {/* Section Headline */}
        <div className="space-y-3 max-w-4xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <Compass className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Multi-Year Reconstruction Strategy 2026–2028</span>
            <span aria-hidden="true">·</span>
            <span>Build-Back-Better Mandate</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 font-normal leading-[1.05] tracking-tight">
            From Emergency Stabilization to Enduring Mountain Resilience
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light leading-relaxed">
            The transition from temporary corrugated shelters to permanent, seismically engineered settlements requires geotechnically safe zoning, slope bio-engineering, and early-warning hydro-telemetry across all Rasuwa catchments.
          </p>
        </div>

        {/* 4 Strategic Pillars - Sandstone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {STRATEGIC_ROADMAP.map((goal, idx) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#F5F2EB] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {goal.pillar}
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    {goal.targetDate}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 dark:text-stone-100">
                  {goal.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {goal.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-baseline justify-between">
                <span className="text-xs text-stone-500 uppercase tracking-wider">Benchmark Metric</span>
                <span className="font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100 font-bold tabular-nums">
                  {goal.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Executive Statement Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1C261E] dark:bg-[#162118] text-white shadow-xl space-y-6 border border-stone-800">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>District Operations Summary &amp; Institutional Accountability</span>
            </div>
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-light leading-snug">
              &ldquo;{REPORT_METADATA.executiveQuote}&rdquo;
            </blockquote>
            <div className="pt-2">
              <p className="text-base font-medium text-emerald-300">{REPORT_METADATA.spokesperson}</p>
              <p className="text-xs text-stone-400 font-light">
                {REPORT_METADATA.leadAgency} · {REPORT_METADATA.districtHeadquarters}
              </p>
            </div>
          </div>
        </div>

        {/* Partner Gratitude & Institutional Credits */}
        <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <HeartHandshake className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Coordinating Entities, First Responders &amp; Humanitarian Partners</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-stone-600 dark:text-stone-400">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 leading-snug"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Footer */}
        <footer className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <p>© 2024–2026 Rasuwa District Disaster Management Committee (DDMC) &amp; NDRRMA. Report ID {REPORT_METADATA.docRef}.</p>
          <p>Published in accordance with the Disaster Risk Reduction and Management Act of Nepal.</p>
        </footer>
      </div>
    </section>
  );
};
