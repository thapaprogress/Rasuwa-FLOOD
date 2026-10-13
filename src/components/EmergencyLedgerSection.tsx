import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, FileSpreadsheet, CheckCircle, Clock, ShieldCheck, Download, Filter } from 'lucide-react';
import { exportFormattedReportPDF } from '../utils/pdfExport';

interface LedgerEntry {
  id: string;
  dateDispatched: string;
  destination: string;
  municipality: string;
  category: 'Shelter Material' | 'Emergency Airlift' | 'Bridge Engineering' | 'Health & WASH' | 'Food Rations';
  itemsDispatched: string;
  quantityUnits: string;
  leadAgency: string;
  status: 'Verified Delivered' | 'In Field Deployment' | 'Completed Audit';
  budgetNpr: string;
}

export const EmergencyLedgerSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const ledgerData: LedgerEntry[] = [
    {
      id: 'DISP-RSW-001',
      dateDispatched: 'July 9, 2024',
      destination: 'Dhunche Emergency Heli-pad',
      municipality: 'Gosaikunda Ward 6',
      category: 'Emergency Airlift',
      itemsDispatched: 'Emergency Trauma Surgical Kits & Blood Plasma',
      quantityUnits: '12 Sorties / 4.8 Tonnes',
      leadAgency: 'Nepal Army Air Wing & Red Cross',
      status: 'Verified Delivered',
      budgetNpr: 'रू 8,400,000',
    },
    {
      id: 'DISP-RSW-002',
      dateDispatched: 'July 11, 2024',
      destination: 'Upper Syaphrubesi Plateau',
      municipality: 'Gosaikunda Ward 5',
      category: 'Shelter Material',
      itemsDispatched: 'Corrugated Galvanized Iron (CGI) Zinc Sheets & Timber Fasteners',
      quantityUnits: '3,200 CGI Bundles',
      leadAgency: 'UN-Habitat & DDMC Rasuwa',
      status: 'Verified Delivered',
      budgetNpr: 'रू 26,400,000',
    },
    {
      id: 'DISP-RSW-003',
      dateDispatched: 'July 14, 2024',
      destination: 'Ghatte Khola / Timure Link',
      municipality: 'Gosaikunda Ward 2',
      category: 'Bridge Engineering',
      itemsDispatched: '42m Modular Steel Bailey Bridge Trusses & Decking',
      quantityUnits: '1 Complete Span (42m)',
      leadAgency: 'Nepal Army Engineering Directorate',
      status: 'Completed Audit',
      budgetNpr: 'रू 28,000,000',
    },
    {
      id: 'DISP-RSW-004',
      dateDispatched: 'July 16, 2024',
      destination: 'Kalikasthan & Ramche Resettlement',
      municipality: 'Kalika Ward 1',
      category: 'Shelter Material',
      itemsDispatched: 'Winterized Wall Insulation Mats & Smokeless Stoves',
      quantityUnits: '285 Household Kits',
      leadAgency: 'Nepal Red Cross Society',
      status: 'Verified Delivered',
      budgetNpr: 'रू 9,800,000',
    },
    {
      id: 'DISP-RSW-005',
      dateDispatched: 'July 19, 2024',
      destination: 'Syaphrubesi, Timure & Thambuchet',
      municipality: 'Multiple Wards',
      category: 'Health & WASH',
      itemsDispatched: 'Gravity Ceramic Candle Filters & Chlorine Sachets',
      quantityUnits: '1,850 Filter Units',
      leadAgency: 'UNICEF Nepal & District Health Office',
      status: 'Completed Audit',
      budgetNpr: 'रू 11,200,000',
    },
    {
      id: 'DISP-RSW-006',
      dateDispatched: 'July 22, 2024',
      destination: 'Mailung Agrarian Flatlands',
      municipality: 'Uttargaya Ward 1',
      category: 'Food Rations',
      itemsDispatched: 'Fortified Rice, Lentils, Cooking Oil & Salt Bags',
      quantityUnits: '42 Tonnes Distributed',
      leadAgency: 'World Food Programme (WFP)',
      status: 'Verified Delivered',
      budgetNpr: 'रू 14,500,000',
    },
    {
      id: 'DISP-RSW-007',
      dateDispatched: 'August 4, 2024',
      destination: 'Ramche Cliff Rockfall Zone',
      municipality: 'Kalika / Dhunche',
      category: 'Bridge Engineering',
      itemsDispatched: 'Heavy Galvanized Wire Gabion Boxes & High-Tensile Mesh',
      quantityUnits: '12,400 m³ Mesh Supply',
      leadAgency: 'Department of Roads (DoR)',
      status: 'In Field Deployment',
      budgetNpr: 'रू 42,000,000',
    },
    {
      id: 'DISP-RSW-008',
      dateDispatched: 'September 12, 2024',
      destination: 'Gatlang & Chilime Highland Wards',
      municipality: 'Aama Chhodingmo Ward 3',
      category: 'Shelter Material',
      itemsDispatched: 'Off-grid Solar Home Lighting Systems & Lanterns',
      quantityUnits: '450 Solar Battery Kits',
      leadAgency: 'Alternative Energy Promotion Centre',
      status: 'Completed Audit',
      budgetNpr: 'रू 6,750,000',
    },
  ];

  const filteredData = ledgerData.filter((entry) => {
    const matchesSearch =
      entry.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.itemsDispatched.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.leadAgency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.municipality.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="emergency-ledger" className="py-16 sm:py-24 bg-[#FBF9F5] dark:bg-[#111713] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans">
              <FileSpreadsheet className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
              <span>Public Audit &amp; Dispatch Transparency Record</span>
              <span aria-hidden="true">·</span>
              <span>DDMC Rasuwa Verified Ledger</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
              Emergency Relief &amp; Reconstruction Ledger
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light">
              Itemized record of helicopter airlifts, temporary shelter roofing sheets, emergency Bailey bridges, and public health dispatches across affected wards.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-end gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs text-stone-500 font-mono">TOTAL DISBURSED LEDGER</div>
              <div className="font-serif text-2xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                रू 147.05M Audited
              </div>
            </div>

            <button
              type="button"
              onClick={() => exportFormattedReportPDF()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#25382A] dark:bg-[#324B38] hover:bg-[#1E2E22] dark:hover:bg-[#3D5B44] rounded-md transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              title="Download formatted multi-page PDF document for local archiving"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Certified PDF</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by destination, agency, or supply item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-stone-500"
            />
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Shelter Material', 'Emergency Airlift', 'Bridge Engineering', 'Health & WASH', 'Food Rations'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-transparent shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/70 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 font-mono text-[11px] uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="py-3 px-4">Dispatch ID &amp; Date</th>
                  <th className="py-3 px-4">Destination &amp; Ward</th>
                  <th className="py-3 px-4">Category &amp; Supply Items</th>
                  <th className="py-3 px-4">Dispatched Units</th>
                  <th className="py-3 px-4">Lead Agency</th>
                  <th className="py-3 px-4">Allocated NPR</th>
                  <th className="py-3 px-4">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
                {filteredData.map((entry) => (
                  <tr key={entry.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">{entry.id}</div>
                      <div className="text-[11px] text-stone-400">{entry.dateDispatched}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-900 dark:text-stone-100">{entry.destination}</div>
                      <div className="text-xs text-stone-500">{entry.municipality}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-900 dark:text-stone-100">{entry.itemsDispatched}</div>
                      <div className="text-xs text-stone-500">{entry.category}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-700 dark:text-stone-300 whitespace-nowrap">
                      {entry.quantityUnits}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-stone-600 dark:text-stone-400">
                      {entry.leadAgency}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">
                      {entry.budgetNpr}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-medium ${
                          entry.status === 'Completed Audit'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : entry.status === 'Verified Delivered'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>{entry.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="p-8 text-center text-stone-500 text-sm">
              No matching relief entries found for &ldquo;{searchQuery}&rdquo;. Try adjusting your filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
