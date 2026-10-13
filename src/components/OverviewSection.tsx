import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AnimatedNumber } from './AnimatedNumber';
import { REPORT_METADATA } from '../data/reportData';
import { IMAGES } from '../assets/images';
import { MapPin, AlertCircle, Quote } from 'lucide-react';

export const OverviewSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '5%'], { clamp: true });

  return (
    <section
      id="overview-section"
      className="relative bg-[#FBF9F5] dark:bg-[#111713] text-[#1C241E] dark:text-[#EAE6DF] pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto w-full space-y-12 sm:space-y-16">
        {/* Curatorial Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <span>Executive Assessment</span>
            <span aria-hidden="true">·</span>
            <span>Rasuwa District Disaster Management Committee</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-100 text-balance">
            Geohazard Crisis &amp; the Engineering Battle for the Mountain Corridors
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light leading-relaxed">
            In late 2024 and through the 2025–2026 monsoon cycles, unprecedented cloudbursts over the Langtang and Ganesh Himal watersheds triggered hyper-concentrated sediment floods. Narrow gorges choked with debris, eroding riverbanks by up to 25 meters horizontally and displacing thousands along the Trishuli and Bhote Koshi arteries.
          </p>
        </div>

        {/* Visual Showcase Card Container with Parallax Framing */}
        <div
          ref={cardRef}
          className="relative h-[440px] sm:h-[540px] lg:h-[620px] w-full rounded-2xl overflow-hidden shadow-xl bg-stone-900 border border-stone-200/50 dark:border-stone-800"
        >
          <motion.img
            style={{ y: imageY }}
            src={IMAGES.sheltersReconstruction}
            alt="Humanitarian shelter reconstruction in Rasuwa Nepal"
            referrerPolicy="no-referrer"
            className="absolute top-0 left-0 w-full h-[125%] object-cover object-center max-w-none will-change-transform"
          />

          {/* Measured overlay for typographic contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-10" />

          {/* Overlay Narrative */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-[#FBF9F5]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Upper Dunche &amp; Saphrubesi Transitional Zones</span>
              </div>
              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight font-light text-white">
                Over 820 winterized transitional shelters erected on stable bedrock plateaus before the Himalayan freeze.
              </p>
            </div>
          </div>
        </div>

        {/* Quantitative Real-World Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="w-full pt-4 border-t border-stone-200 dark:border-stone-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div className="space-y-1.5">
              <div className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 font-light tracking-tight tabular-nums">
                <AnimatedNumber value={REPORT_METADATA.totalDisplacedFamilies} />
              </div>
              <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-medium">
                Households Relocated to Safety
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                Coordinated across 5 rural municipalities including high-altitude Tamang communities
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 font-light tracking-tight tabular-nums">
                <AnimatedNumber value={REPORT_METADATA.blockedHighwayKm} decimals={1} suffix=" km" />
              </div>
              <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-medium">
                Mountain Highway Cleared
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                Round-the-clock blasting and gabion wall revetment along the Pasang Lhamu corridor
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-serif text-4xl sm:text-5xl text-emerald-700 dark:text-emerald-400 font-light tracking-tight tabular-nums">
                <AnimatedNumber value={412.5} decimals={1} prefix="रू " suffix="M" />
              </div>
              <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 font-medium">
                Disaster Relief Disbursed
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                Direct housing grants, medical sorties, Bailey bridges, and bio-engineering defenses
              </p>
            </div>
          </div>
        </motion.div>

        {/* Field Leadership Quote */}
        <div className="p-6 sm:p-8 rounded-xl bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start gap-4">
          <Quote className="w-8 h-8 text-stone-400 dark:text-stone-600 shrink-0 mt-1" />
          <div className="space-y-2">
            <p className="font-serif italic text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-relaxed">
              &ldquo;{REPORT_METADATA.executiveQuote}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans">
              <span className="font-semibold text-stone-700 dark:text-stone-300">{REPORT_METADATA.spokesperson}</span>
              <span aria-hidden="true">·</span>
              <span>{REPORT_METADATA.districtHeadquarters}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
