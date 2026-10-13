import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, ArrowDownRight, Compass, ShieldAlert, Download } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { exportFormattedReportPDF } from '../utils/pdfExport';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const handleScrollToNext = (id: string = 'overview-section') => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 lg:px-12 pt-28 pb-12 bg-[#121914] text-[#F3EFE8]"
    >
      {/* High-Fidelity Documentary Hero Backdrop with Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.rasuwaHero}
          alt="Trishuli and Bhote Koshi mountain river corridor in Rasuwa Nepal"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Anti-Slop Measured Scrim (4.5:1+ contrast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101712] via-[#101712]/60 to-[#101712]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(16,23,18,0.7)_100%)]" />
      </div>

      {/* Top Editorial Kicker / Trust Banner */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-4">
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-stone-300 font-sans">
          <span className="inline-flex items-center gap-1.5 text-amber-300/90 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            Official Disaster Assessment
          </span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>Rasuwa District, Bagmati Province</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>Trishuli &amp; Bhote Koshi Corridors</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="text-stone-400">Doc Ref: DAO-RSW-2026</span>
        </div>
      </div>

      {/* Main Hero Narrative */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-5xl mx-auto w-full text-left my-auto py-8"
      >
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-stone-300 mb-3 font-sans">
          Emergency Response &amp; Multi-Year Rehabilitation 2024–2026
        </p>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02] text-[#F9F7F2] font-normal text-balance">
          Rasuwa Flood Emergency &amp; Recovery Report
        </h1>

        <p className="mt-6 text-base sm:text-xl lg:text-2xl text-stone-200 font-light max-w-3xl leading-relaxed">
          Documenting catastrophic monsoon flash floods, landslide breaches along the Trishuli and Bhote Koshi gorges, and community-led reconstruction across Dunche, Saphrubesi, and highland river corridors.
        </p>

        {/* Action affordances */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleScrollToNext('corridor-map')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-stone-900 bg-[#EDE8DF] hover:bg-white rounded-md transition-colors cursor-pointer shadow-sm"
          >
            <Compass className="w-4 h-4" />
            <span>Satellite Corridor Map</span>
          </button>

          <button
            type="button"
            onClick={() => handleScrollToNext('before-after')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-colors cursor-pointer backdrop-blur-xs"
          >
            <span>Before &amp; After</span>
            <ArrowDownRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => exportFormattedReportPDF()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 rounded-md transition-colors cursor-pointer backdrop-blur-xs"
            title="Download formatted multi-page PDF document for local archival"
          >
            <Download className="w-4 h-4" />
            <span>Export Archival PDF</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom Operational Summary Strip (Claim-to-Proof Adjacency) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full border-t border-white/15 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
              1,482
            </div>
            <div className="text-xs text-stone-300 uppercase tracking-wider mt-1">
              Families Displaced
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Dunche, Saphrubesi &amp; Gorges</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
              68.4 km
            </div>
            <div className="text-xs text-stone-300 uppercase tracking-wider mt-1">
              Blocked Highway
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Pasang Lhamu Arterial</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
              342 MW
            </div>
            <div className="text-xs text-stone-300 uppercase tracking-wider mt-1">
              Hydropower Disrupted
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Trishuli &amp; Chilime Grid</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300 tabular-nums">
              रू 412.5M
            </div>
            <div className="text-xs text-stone-300 uppercase tracking-wider mt-1">
              Relief Funds Deployed
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">820 Shelters Rebuilt</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => handleScrollToNext('overview-section')}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Read Executive Briefing</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
