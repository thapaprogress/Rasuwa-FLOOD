import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NARRATIVE_STORIES } from '../data/reportData';
import { Quote, MapPin, Award, ChevronRight } from 'lucide-react';

export const NarrativeStoriesSection: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const activeStory = NARRATIVE_STORIES[activeStoryIndex];

  return (
    <section className="py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#111713] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <Quote className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Eyewitness Dispatches &amp; Frontline Courage</span>
            <span aria-hidden="true">·</span>
            <span>Voices from the Trishuli &amp; Bhote Koshi Corridors</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Field Reports: Resilience on the Himalayan Edge
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
            Beyond the geotechnical statistics lie stories of midnight evacuation alerts, excavator crews defying cliffside rockfalls, and mountain communities rebuilding with mutual solidarity.
          </p>
        </div>

        {/* Story Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {NARRATIVE_STORIES.map((story, idx) => (
            <button
              key={story.title}
              type="button"
              onClick={() => setActiveStoryIndex(idx)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeStoryIndex === idx
                  ? 'bg-[#1C261E] text-white border-[#1C261E] dark:bg-stone-800 dark:border-stone-700 shadow-md'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className={activeStoryIndex === idx ? 'text-amber-300' : 'text-stone-500'}>
                  Dispatch {idx + 1}
                </span>
                <span className="font-mono text-[11px]">{story.subDistrict}</span>
              </div>
              <div className="font-serif font-medium text-sm sm:text-base line-clamp-1">
                {story.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Dispatch Presentation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{activeStory.location} · {activeStory.subDistrict}</span>
                  {activeStory.agencyBadge && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {activeStory.agencyBadge}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-100">
                  {activeStory.title}
                </h3>
              </div>

              {/* Hero stat */}
              <div className="lg:text-right shrink-0">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  {activeStory.heroStat}
                </div>
                <div className="text-xs text-stone-500 max-w-[200px] lg:ml-auto mt-0.5">
                  {activeStory.statLabel}
                </div>
              </div>
            </div>

            {/* Narrative Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed font-light">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900 dark:first-letter:text-white">
                  {activeStory.body}
                </p>
              </div>

              {/* Pullquote Box */}
              <div className="lg:col-span-5 p-6 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-4">
                <blockquote className="font-serif italic text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-snug">
                  &ldquo;{activeStory.quote}&rdquo;
                </blockquote>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                  — <strong className="text-stone-700 dark:text-stone-200">{activeStory.quoteAuthor}</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
