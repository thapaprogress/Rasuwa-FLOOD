import React, { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { Sun, Moon, FileText, Download, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { exportFormattedReportPDF } from '../utils/pdfExport';

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportFormattedReportPDF();
      setIsExporting(false);
    }, 400);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF9F5]/92 dark:bg-[#111713]/92 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60 py-3 shadow-xs'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-serif font-semibold tracking-tight text-[#1C241E] dark:text-[#EAE6DF] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          Rasuwa Disaster Report
        </a>

        {/* Zone 2: 5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-medium text-stone-600 dark:text-stone-300">
          <a
            href="#surge-timeline"
            className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Surge Timeline
          </a>
          <a
            href="#live-telemetry"
            className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            <span>Live Telemetry</span>
          </a>
          <a
            href="#corridor-map"
            className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Satellite Map
          </a>
          <a
            href="#destroyed-villages"
            className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Villages Dossier
          </a>
          <a
            href="#before-after"
            className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Before &amp; After
          </a>
          <a
            href="#relief-strata"
            className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Relief Strata
          </a>
        </nav>

        {/* Zone 3: 1 primary action button + PDF Export + Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="p-2 rounded-md text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-900 dark:text-stone-100 bg-stone-200/80 dark:bg-stone-800 hover:bg-stone-300/80 dark:hover:bg-stone-700 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer border border-stone-300/60 dark:border-stone-700"
            title="Export full formatted PDF document for local archival"
          >
            <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce text-emerald-500' : ''}`} />
            <span>{isExporting ? 'Generating PDF...' : 'Export PDF'}</span>
          </button>

          <a
            href="#emergency-ledger"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#25382A] dark:bg-[#324B38] hover:bg-[#1E2E22] dark:hover:bg-[#3D5B44] rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Audit Ledger</span>
          </a>
        </div>
      </div>
    </header>
  );
};
