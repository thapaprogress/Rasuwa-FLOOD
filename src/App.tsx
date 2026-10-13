/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveHydroTelemetrySection } from './components/LiveHydroTelemetrySection';
import { SurgeTimelineSection } from './components/SurgeTimelineSection';
import { DestroyedVillagesDossier } from './components/DestroyedVillagesDossier';
import { WaterVelocityPhysicsSection } from './components/WaterVelocityPhysicsSection';
import { OverviewSection } from './components/OverviewSection';
import { RasuwaCorridorMap } from './components/RasuwaCorridorMap';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ImpactMetricsSection } from './components/ImpactMetricsSection';
import { ReliefStrataSection } from './components/ReliefStrataSection';
import { RecoveryResourceCalculator } from './components/RecoveryResourceCalculator';
import { NarrativeStoriesSection } from './components/NarrativeStoriesSection';
import { EducationPreparednessSection } from './components/EducationPreparednessSection';
import { EmergencyLedgerSection } from './components/EmergencyLedgerSection';
import { RoadmapGratitudeSection } from './components/RoadmapGratitudeSection';

function MainContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] dark:bg-[#111713] text-[#1C241E] dark:text-[#EAE6DF] font-sans antialiased selection:bg-[#E2DDD3] dark:selection:bg-[#2A3B2E] selection:text-[#141C15] dark:selection:text-[#EAE6DF] transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar />

      {/* Reading Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#283C2D] dark:bg-[#436449] origin-left z-50 pointer-events-none transition-colors duration-300"
      />

      {/* Main Report Flow */}
      <main className="w-full overflow-x-hidden">
        {/* 1. Header & Hero Section */}
        <HeroSection />

        {/* 2. Real-Time Hydro-Telemetry & Early-Warning Monitoring */}
        <LiveHydroTelemetrySection />

        {/* 3. Forensic Event Timeline: Occurrence, Causes & Surge Velocities */}
        <SurgeTimelineSection />

        {/* 4. Destroyed Settlements Forensic Dossier with Photographic Imagery */}
        <DestroyedVillagesDossier />

        {/* 5. Fluid Dynamics & Water Speed Physics Diagnostic */}
        <WaterVelocityPhysicsSection />

        {/* 6. Executive Overview & Humanitarian Context */}
        <OverviewSection />

        {/* 7. Geospatial Corridor Map & Infrastructure Points */}
        <RasuwaCorridorMap />

        {/* 8. Before & After Visual Analysis Slider */}
        <BeforeAfterSection />

        {/* 9. Comprehensive Impact Metrics & Ward Statistics */}
        <ImpactMetricsSection />

        {/* 10. Multi-Sector Relief & Rehabilitation Strata */}
        <ReliefStrataSection />

        {/* 11. Interactive Municipal Resource & Budget Simulator */}
        <RecoveryResourceCalculator />

        {/* 12. Frontline Dispatches & Community Stories */}
        <NarrativeStoriesSection />

        {/* 13. Public Health, WASH & Early-Warning Drills */}
        <EducationPreparednessSection />

        {/* 14. Itemized Public Relief & Audit Ledger */}
        <EmergencyLedgerSection />

        {/* 15. Strategic 2026-2028 Build-Back-Better Plan & Partner Credits */}
        <RoadmapGratitudeSection />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}
