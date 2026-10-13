import React from 'react';
import { motion } from 'motion/react';
import { IMAGES } from '../assets/images';
import { Shield, Droplet, Radio, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const EducationPreparednessSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F2EB] dark:bg-[#151D16] border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
            <Shield className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Community Capacity &amp; Life Safety</span>
            <span aria-hidden="true">·</span>
            <span>WASH, Health Clinics &amp; Early-Warning Drills</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Disaster Preparedness &amp; Community Health Mobilization
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Reconstruction is fundamentally about human survival and community readiness. Alongside heavy civil works, public health units and local youth clubs formed an essential defense against waterborne epidemics and psychological trauma.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Water Filtration & Epidemic Shield */}
          <div className="p-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                Water Safety &amp; Cholera Defense
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                Distributed 1,850 gravity ceramic candle filters and 12,000 chlorine purification sachets. Over 28 mountain spring schemes restored with food-grade HDPE pipes, keeping drinking supplies free of E. coli and silt runoff.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-cyan-700 dark:text-cyan-400">
              <span>ZERO WATERBORNE OUTBREAKS</span>
              <span>100% AUDITED</span>
            </div>
          </div>

          {/* Card 2: Community Early-Warning Network */}
          <div className="p-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                Acoustic River Sirens &amp; Radio Relays
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                Trained 420 youth responders across Gosaikunda and Kalika in solar-powered VHF hand-crank radios and river acoustic sirens. Downstream settlements receive a 25-minute advance flood surge notice before torrent waves arrive.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-amber-700 dark:text-amber-400">
              <span>25-MIN ADVANCE WARNING</span>
              <span>12 SENSOR HUBS</span>
            </div>
          </div>

          {/* Card 3: Mobile Health Clinics & Trauma Care */}
          <div className="p-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                Mobile Mountain Health Camps
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                Delivered 3,840 patient examinations in temporary shelter hubs. Specialized orthopedic care, chronic medication refills, pediatric vaccinations, and trauma recovery counseling led by Nepal Red Cross clinical staff.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-emerald-700 dark:text-emerald-400">
              <span>3,840 PATIENTS CARED FOR</span>
              <span>14 CAMPS HELD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
