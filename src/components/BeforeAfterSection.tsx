import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { IMAGES } from '../assets/images';
import { MoveHorizontal, AlertTriangle, Layers, ShieldCheck, Mountain } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100%
  const [activeZone, setActiveZone] = useState<'all' | 'riverbed' | 'slope' | 'mitigation'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-16 sm:py-24 bg-[#F5F2EB] dark:bg-[#151D16] border-y border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Editorial Heading */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <Mountain className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Geotechnical Terrain Analysis</span>
            <span aria-hidden="true">·</span>
            <span>Drone Orthophoto &amp; Satellite Comparison</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Before &amp; After: Morphological Erosion &amp; Recovery Zones
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Drag the comparative slider below to examine the dramatic terrain transformation along the Saphrubesi-Trishuli confluence: from serene agricultural river terraces to raw landslide scars, followed by geotechnical bio-engineering defenses.
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="space-y-4">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            className="relative h-[380px] sm:h-[480px] lg:h-[560px] w-full rounded-2xl overflow-hidden shadow-xl select-none cursor-ew-resize border border-stone-300 dark:border-stone-700 bg-stone-950"
          >
            {/* After (Post-Flood) Image Layer (Full Base) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={IMAGES.terrainAfter}
                alt="Post-flood erosion and recovery work along Trishuli river gorge"
                className="w-full h-full object-cover object-center pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-stone-900/85 text-stone-100 text-xs font-medium rounded-md backdrop-blur-xs border border-white/10 shadow-xs">
                Post-Flood Erosion &amp; Stabilized Works (2025–2026)
              </div>
            </div>

            {/* Before (Pre-Flood) Image Layer (Clipped via Slider Percentage) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={IMAGES.terrainBefore}
                alt="Pre-flood peaceful settlement and green terraces in Rasuwa"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-emerald-950/85 text-emerald-100 text-xs font-medium rounded-md backdrop-blur-xs border border-emerald-500/20 shadow-xs">
                Pre-Disaster Intact Settlement (Archival Baseline)
              </div>
            </div>

            {/* Vertical Divider Line with Grab Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900 text-white border-2 border-white flex items-center justify-center shadow-lg">
                <MoveHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
              <span className="text-[11px] sm:text-xs text-white/90 bg-black/60 px-2.5 py-1 rounded-sm backdrop-blur-xs">
                ◄ Pre-Flood Terraced Basin
              </span>
              <span className="text-[11px] sm:text-xs text-white/90 bg-black/60 px-2.5 py-1 rounded-sm backdrop-blur-xs">
                Post-Flood Erosion &amp; Gabions ►
              </span>
            </div>
          </div>

          {/* Quick Slider Range Fallback & Mobile Assist */}
          <div className="flex items-center gap-4 px-2">
            <span className="text-xs text-stone-500 whitespace-nowrap">Pre-Disaster</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Comparative terrain view slider percentage"
              className="w-full h-1.5 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-800 dark:accent-stone-200"
            />
            <span className="text-xs text-stone-500 whitespace-nowrap">Post-Disaster</span>
          </div>
        </div>

        {/* 4 Quantitative Terrain Shift Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Riverbed Aggradation
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
              +4.2 Meters
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Trishuli riverbed rose an average of 4.2m due to massive debris deposits, permanently reducing riverbank bridge clearances.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Slope Failure Scar
              </span>
              <Layers className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
              340,000 m³
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Total volume of weathered colluvium and granite boulders mobilized across the Ramche-Thade fault slip.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Bio-Engineering Mesh
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
              18,200 m²
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              High-tensile wire mesh netting and vetiver grass contour plantings installed to anchor unstable upper scree slopes.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Settlement Buffer Zone
              </span>
              <Mountain className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
              50m Setback
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              New municipal zoning prevents permanent construction within 50m of active flood channels, relocating families to upper terraces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
