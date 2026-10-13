import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Radio,
  Activity,
  AlertTriangle,
  Waves,
  Droplets,
  CloudRain,
  ShieldAlert,
  Volume2,
  RefreshCw,
  Gauge,
  ArrowUpRight,
} from 'lucide-react';

export const LiveHydroTelemetrySection: React.FC = () => {
  const [isFloodSimulation, setIsFloodSimulation] = useState<boolean>(false);
  const [sirenAudibleTest, setSirenAudibleTest] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 600);
  };

  // Data values switch based on live baseline vs. 2024 peak simulation
  const stations = [
    {
      id: 'syaphrubesi-stn',
      name: 'Bhote Koshi at Syaphrubesi',
      stationCode: 'DHM-STN-445.0',
      elevationM: 1460,
      currentSpeed: isFloodSimulation ? '11.4 m/s (41.0 km/h)' : '4.1 m/s (14.8 km/h)',
      speedPercent: isFloodSimulation ? 95 : 36,
      currentDischarge: isFloodSimulation ? '1,420 m³/s' : '268 m³/s',
      waterStage: isFloodSimulation ? '9.62 m (CRITICAL DANGER)' : '3.42 m (Normal Flow)',
      stagePercent: isFloodSimulation ? 96 : 35,
      thresholdAlert: isFloodSimulation ? 'RED EMERGENCY SURGE' : 'GREEN MONITORED',
      turbidity: isFloodSimulation ? '18,500 NTU (Debris Slurry)' : '840 NTU (Mountain Silt)',
      sensorHealth: '100% Online · Solar Battery 24.2V',
    },
    {
      id: 'betrawati-stn',
      name: 'Trishuli River at Betrawati Gateway',
      stationCode: 'DHM-STN-447.2',
      elevationM: 890,
      currentSpeed: isFloodSimulation ? '8.6 m/s (31.0 km/h)' : '3.2 m/s (11.5 km/h)',
      speedPercent: isFloodSimulation ? 75 : 28,
      currentDischarge: isFloodSimulation ? '2,180 m³/s' : '410 m³/s',
      waterStage: isFloodSimulation ? '10.35 m (RIVER OVERFLOW)' : '4.15 m (Normal Flow)',
      stagePercent: isFloodSimulation ? 92 : 40,
      thresholdAlert: isFloodSimulation ? 'RED EVACUATION ALERT' : 'GREEN MONITORED',
      turbidity: isFloodSimulation ? '16,200 NTU' : '720 NTU',
      sensorHealth: '100% Online · Satellite Telemetry',
    },
    {
      id: 'upper-trishuli-intake',
      name: 'Upper Trishuli-1 Intake Basin',
      stationCode: 'UT1-HEP-WEIR-01',
      elevationM: 1240,
      currentSpeed: isFloodSimulation ? '9.8 m/s (35.3 km/h)' : '3.6 m/s (13.0 km/h)',
      speedPercent: isFloodSimulation ? 86 : 31,
      currentDischarge: isFloodSimulation ? '1,890 m³/s' : '345 m³/s',
      waterStage: isFloodSimulation ? 'Intake Overtopped (+7.1m)' : 'Operating Head (+2.1m)',
      stagePercent: isFloodSimulation ? 98 : 30,
      thresholdAlert: isFloodSimulation ? 'SLUICE EMERGENCY OPEN' : 'NORMAL INTAKE OPERATION',
      turbidity: isFloodSimulation ? '42% Sediment Volume' : '12% Sediment Volume',
      sensorHealth: 'Submersible Transducer Active',
    },
    {
      id: 'chilime-radar',
      name: 'Chilime & Langtang Rain Radar',
      stationCode: 'RADAR-RASUWA-04',
      elevationM: 2100,
      currentSpeed: isFloodSimulation ? 'Cloudburst Peak' : 'Light Mountain Drizzle',
      speedPercent: isFloodSimulation ? 100 : 20,
      currentDischarge: isFloodSimulation ? '264 mm / 9 hrs' : '38 mm / 24 hrs',
      waterStage: isFloodSimulation ? 'Intensity: 58 mm/hr' : 'Intensity: 3.2 mm/hr',
      stagePercent: isFloodSimulation ? 100 : 15,
      thresholdAlert: isFloodSimulation ? 'EXTREME RAINFALL WARNING' : 'NORMAL PRECIPITATION',
      turbidity: isFloodSimulation ? 'Soil Saturation 100%' : 'Soil Saturation 62%',
      sensorHealth: 'Doppler Radar Connected',
    },
  ];

  const sirenTowers = [
    { name: 'Syaphrubesi Confluence', status: isFloodSimulation ? 'Active Siren (118 dB)' : 'Standby / Armed', code: 'SRN-01' },
    { name: 'Timure Customs Terminal', status: isFloodSimulation ? 'Active Siren (118 dB)' : 'Standby / Armed', code: 'SRN-02' },
    { name: 'Dhunche Hospital Post', status: isFloodSimulation ? 'Active Siren (118 dB)' : 'Standby / Armed', code: 'SRN-03' },
    { name: 'Ramche Fault Ridge', status: isFloodSimulation ? 'Active Siren (118 dB)' : 'Standby / Armed', code: 'SRN-04' },
    { name: 'Mailung River Junction', status: isFloodSimulation ? 'Active Siren (118 dB)' : 'Standby / Armed', code: 'SRN-05' },
    { name: 'Betrawati Bridge Post', status: isFloodSimulation ? 'Active Siren (118 dB)' : 'Standby / Armed', code: 'SRN-06' },
  ];

  return (
    <section id="live-telemetry" className="py-16 sm:py-24 bg-[#141E16] text-[#F3EFE8] border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header with Live Signal Indicator and Simulation Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-800">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE HYDRO-METEOROLOGICAL SENSOR FEED</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-400">DHM &amp; DDMC TELEMETRY LINK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Real-Time River Gauges &amp; Early-Warning Telemetry
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-light">
              Live automated sensor feeds monitoring flow velocities, discharge volumes, and river stages across the Trishuli and Bhote Koshi canyon corridors.
            </p>
          </div>

          {/* Interactive Simulation Switcher & Refresh Button */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFloodSimulation(!isFloodSimulation)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-2 border ${
                isFloodSimulation
                  ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500 shadow-md shadow-rose-900/40'
                  : 'bg-white/10 hover:bg-white/15 text-stone-200 border-white/20'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>
                {isFloodSimulation ? 'Simulating 2024 Catastrophic Peak' : 'Simulate 2024 Flood Peak Wave'}
              </span>
            </button>

            <button
              type="button"
              onClick={handleRefresh}
              className="p-2 text-stone-400 hover:text-white rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              title="Refresh Telemetry Packet"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 4 Telemetry Station Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stations.map((stn) => (
            <motion.div
              key={stn.id}
              layout
              className={`p-6 rounded-xl border transition-all ${
                isFloodSimulation
                  ? 'bg-stone-900/90 border-rose-700/80 shadow-md shadow-rose-950/40'
                  : 'bg-stone-900/60 border-stone-800'
              } space-y-4 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>{stn.stationCode}</span>
                  <span className="text-emerald-400">● LIVE FEED</span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-semibold text-white leading-snug">
                    {stn.name}
                  </h3>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Elevation {stn.elevationM}m · Automatic Stream Gauge
                  </div>
                </div>

                {/* Speed Metric */}
                <div className="pt-2">
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                    <Waves className="w-3 h-3 text-cyan-400" />
                    Recorded Water Speed
                  </div>
                  <div className="font-serif text-2xl font-bold text-white tabular-nums mt-0.5">
                    {stn.currentSpeed}
                  </div>
                  {/* Gauge bar */}
                  <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isFloodSimulation ? 'bg-rose-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${stn.speedPercent}%` }}
                    />
                  </div>
                </div>

                {/* Discharge and Water Stage */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-stone-800">
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Discharge Rate</div>
                    <div className="font-mono font-medium text-stone-200 mt-0.5">{stn.currentDischarge}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Water Stage</div>
                    <div className="font-mono font-medium text-stone-200 mt-0.5">{stn.waterStage}</div>
                  </div>
                </div>

                {/* Turbidity */}
                <div className="text-xs pt-1">
                  <span className="text-stone-400">Turbidity: </span>
                  <span className="font-mono text-stone-300">{stn.turbidity}</span>
                </div>
              </div>

              {/* Bottom Alert Pill */}
              <div className="pt-3 border-t border-stone-800">
                <span
                  className={`block text-center py-1 rounded-sm text-[11px] font-mono font-bold tracking-wider ${
                    isFloodSimulation
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                  }`}
                >
                  {stn.thresholdAlert}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 12 Early-Warning Sirens Network Strip */}
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Volume2 className={`w-4 h-4 ${isFloodSimulation ? 'text-rose-400 animate-bounce' : 'text-stone-400'}`} />
              <h3 className="font-serif text-base sm:text-lg font-medium text-white">
                Solar-Powered Acoustic River Sirens Network (12 Telemetry Hubs)
              </h3>
            </div>
            <div className="text-xs text-stone-400 font-mono">
              VHF RELAY PROTOCOL · LATENCY &lt; 1.2s
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1 text-xs">
            {sirenTowers.map((siren) => (
              <div
                key={siren.code}
                className={`p-3 rounded-xl border transition-colors ${
                  isFloodSimulation
                    ? 'bg-rose-950/50 border-rose-800/80 text-rose-200'
                    : 'bg-stone-950/60 border-stone-800 text-stone-300'
                }`}
              >
                <div className="font-mono text-[10px] text-stone-400">{siren.code}</div>
                <div className="font-medium mt-0.5 line-clamp-1">{siren.name}</div>
                <div
                  className={`text-[11px] font-mono mt-1 ${
                    isFloodSimulation ? 'text-rose-400 font-bold' : 'text-emerald-400'
                  }`}
                >
                  {siren.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
