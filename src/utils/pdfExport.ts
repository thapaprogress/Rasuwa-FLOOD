import jsPDF from 'jspdf';
import { REPORT_METADATA } from '../data/reportData';

export function exportFormattedReportPDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Helper colors
  const primaryColor = [28, 38, 30] as const; // #1C261E
  const accentRed = [185, 28, 28] as const;
  const textDark = [35, 40, 36] as const;
  const textMuted = [105, 115, 108] as const;

  // ================= PAGE 1: EXECUTIVE BRIEFING & KEY METRICS =================
  // Header Ribbon
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('GOVERNMENT OF NEPAL · DISTRICT ADMINISTRATION OFFICE RASUWA', margin, 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('DISTRICT DISASTER MANAGEMENT COMMITTEE (DDMC) & NDRRMA JOINT ASSESSMENT', margin, 18);
  doc.text(`DOC REF: ${REPORT_METADATA.docRef} · ISSUED: OCTOBER 2026`, margin, 23);

  // Document Title
  doc.setTextColor(...primaryColor);
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.text('Rasuwa Flood Emergency & Recovery Report', margin, 39);

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...textMuted);
  doc.text('Comprehensive Forensic Impact Assessment & Multi-Year Rehabilitation (2024–2026)', margin, 46);

  // Red Emergency Classification Notice
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(252, 165, 165);
  doc.roundedRect(margin, 51, contentWidth, 14, 2, 2, 'FD');
  doc.setTextColor(...accentRed);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('OFFICIAL CLASSIFICATION: DISASTER RECOVERY & INFRASTRUCTURE RESTORATION DOSSIER', margin + 4, 57);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 20, 20);
  doc.setFontSize(7.5);
  doc.text('Catastrophic monsoon flash floods and hyper-concentrated debris flows along the Trishuli and Bhote Koshi river corridors.', margin + 4, 62);

  // Executive Summary Box
  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('1. EXECUTIVE SUMMARY & CRISIS PROFILE', margin, 73);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const summaryText =
    'In late 2024 and through the 2025-2026 monsoon cycles, unprecedented cloudbursts over the Langtang and Ganesh Himal catchments triggered devastating flash floods. Narrow mountain canyons channeled surging floodwaters reaching recorded velocities of 11.4 m/s (41.0 km/h). Extreme hydrodynamic thrust demolished 48 stone-masonry buildings in Syaphrubesi, sheared 4.2 km of the Pasang Lhamu Highway at Ramche, severed 14 bridges, and temporarily knocked 342 MW of hydropower offline. Coordinated civil and military mobilization prevented loss of life, relocating 1,482 displaced families into transitional housing.';
  doc.text(doc.splitTextToSize(summaryText, contentWidth), margin, 79);

  // Quantitative Metrics Grid Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('2. CORE DISASTER IMPACT METRICS', margin, 107);

  const metrics = [
    { label: 'Displaced Families', value: '1,482 Households', detail: 'Relocated across 5 rural municipalities' },
    { label: 'Blocked / Severed Highway', value: '68.4 km', detail: 'Pasang Lhamu arterial cleared with rock-blasting' },
    { label: 'Hydropower Disrupted', value: '342 MW', detail: 'Upper Trishuli-1, Chilime, and Rasuwagadhi HEP' },
    { label: 'Relief Funds Deployed', value: 'NPR 412.5M ($3.1M USD)', detail: 'Transitional shelters, airlifts, and civil works' },
    { label: 'Transitional Shelters Built', value: '820 Units Completed', detail: 'Winterized CGI zinc roofs and timber frames' },
    { label: 'Bridges Restored', value: '9 of 14 Reopened', detail: 'Ghatte Khola Bailey bridge and cable spans' },
  ];

  let startY = 113;
  metrics.forEach((m, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxX = margin + col * (contentWidth / 2 + 2);
    const boxY = startY + row * 19;
    const boxW = contentWidth / 2 - 2;

    doc.setFillColor(247, 246, 243);
    doc.setDrawColor(225, 222, 215);
    doc.roundedRect(boxX, boxY, boxW, 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...textMuted);
    doc.text(m.label.toUpperCase(), boxX + 4, boxY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.text(m.value, boxX + 4, boxY + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(90, 95, 90);
    doc.text(m.detail, boxX + 4, boxY + 14);
  });

  // Municipal Breakdown Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...textDark);
  doc.text('3. IMPACT DISTRIBUTION BY RURAL MUNICIPALITY (GAUNPALIKA)', margin, 178);

  const muniData = [
    ['Gosaikunda Rural Municipality', '6 Wards', '622 Families', 'Dhunche HQ, Syaphrubesi, Timure, Rasuwagadhi Border'],
    ['Kalika Rural Municipality', '5 Wards', '345 Families', 'Ramche Landslide Chasm, Mulkharka, Kalikasthan'],
    ['Uttargaya Rural Municipality', '5 Wards', '215 Families', 'Betrawati River Gateway, Mailung Silt Basin'],
    ['Aama Chhodingmo Rural Municipality', '5 Wards', '180 Families', 'Chilime Valley, Thambuchet, Gatlang Tamang Hamlet'],
    ['Naukunda Rural Municipality', '6 Wards', '120 Families', 'Southeastern Alpine Ridges, Water Source Damage'],
  ];

  // Table header
  doc.setFillColor(230, 227, 220);
  doc.rect(margin, 183, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...primaryColor);
  doc.text('MUNICIPALITY', margin + 3, 187.2);
  doc.text('WARDS', margin + 65, 187.2);
  doc.text('DISPLACED', margin + 85, 187.2);
  doc.text('KEY IMPACT HUBS', margin + 112, 187.2);

  let muniY = 194;
  muniData.forEach((row, i) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...textDark);
    if (i % 2 === 1) {
      doc.setFillColor(248, 247, 244);
      doc.rect(margin, muniY - 4, contentWidth, 7, 'F');
    }
    doc.text(row[0], margin + 3, muniY);
    doc.text(row[1], margin + 65, muniY);
    doc.text(row[2], margin + 85, muniY);
    doc.text(row[3], margin + 112, muniY);
    muniY += 7.5;
  });

  // Page 1 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text('Page 1 of 3 · Rasuwa District Emergency Assessment · Certified by DAO Dhunche', margin, 285);

  // ================= PAGE 2: CHRONOLOGY, CAUSES & VILLAGE FORENSICS =================
  doc.addPage();

  // Header Ribbon Page 2
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('FORENSIC HYDROLOGY, EVENT TIMELINE & DESTROYED SETTLEMENTS', margin, 10.5);

  // Chronological Table
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('4. TIMELINE OF OCCURRENCE & RECORDED WATER VELOCITIES', margin, 26);

  const timelineRows = [
    ['July 8, 2024 · 18:30 NPT', 'Cloudburst Supercell', '3.8 m/s', '264 mm in 9 hrs over Langtang & Ganesh Himal catchments'],
    ['July 8, 2024 · 22:15 NPT', 'Tributary Dam Breach', '7.2 m/s', 'Debris dams breached; stage rose +3.2m in 20 minutes'],
    ['July 8, 2024 · 23:45 NPT', 'Midnight Peak Surge', '11.4 m/s (41 km/h)', 'Collided at Syaphrubesi (+6.2m surge); swept 48 stone houses'],
    ['July 9, 2024 · 03:15 NPT', 'Trishuli Ramche Shear', '8.6 m/s', '340,000 m³ rock avalanche engulfed 4.2 km Pasang Lhamu Highway'],
    ['July 9, 2024 · 06:00 NPT', 'Dawn Military Air-bridge', '5.2 m/s', '124 critical patients airlifted; 180 tonnes food & zinc flown in'],
  ];

  doc.setFillColor(230, 227, 220);
  doc.rect(margin, 31, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('DATE / TIME (NPT)', margin + 3, 35.2);
  doc.text('EVENT PHASE', margin + 45, 35.2);
  doc.text('SPEED', margin + 92, 35.2);
  doc.text('HYDROLOGICAL IMPACT & DISCHARGE', margin + 115, 35.2);

  let tY = 42;
  timelineRows.forEach((r, idx) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...textDark);
    if (idx === 2) {
      // Highlight midnight peak
      doc.setFillColor(254, 242, 242);
      doc.rect(margin, tY - 4, contentWidth, 7, 'F');
      doc.setTextColor(...accentRed);
      doc.setFont('helvetica', 'bold');
    }
    doc.text(r[0], margin + 3, tY);
    doc.text(r[1], margin + 45, tY);
    doc.text(r[2], margin + 92, tY);
    doc.text(r[3], margin + 115, tY);
    tY += 7.5;
  });

  // Destroyed Settlements Forensic Log
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text('5. FORENSIC DAMAGE DOSSIER: DESTROYED MOUNTAIN SETTLEMENTS', margin, 87);

  const villageDossier = [
    {
      name: 'Syaphrubesi Lower Bazaar (Elev. 1,460m)',
      speed: '11.4 m/s (41 km/h) · Stage: +6.2m',
      displaced: '394 Families Displaced · 48 Buildings Destroyed',
      details: 'Confluence flash flood of Langtang Khola and Bhote Koshi severed riverfront. Two suspension footbridges ripped from anchors. Relocation to Upper Syaphrubesi plateau with 220 CGI transitional shelters.',
    },
    {
      name: 'Ramche & Mulkharka Fault Zone (Elev. 1,780m)',
      speed: '8.6 m/s Rock Avalanche · 340,000 m³ Volume',
      displaced: '285 Families Displaced · 22 Homesteads Buried',
      details: 'Active Main Central Thrust (MCT) failure sheared 4.2 km of Pasang Lhamu Highway. Community basic school crushed under boulders. Bypasses blasted on limestone stratum; families housed in Kalikasthan.',
    },
    {
      name: 'Timure & Rasuwagadhi Border Corridor (Elev. 1,814m)',
      speed: '10.2 m/s Transboundary Surge · Stage: +4.8m',
      displaced: '228 Families Displaced · 34 Structures Flooded',
      details: 'Glacial runoff surcharge inundated customs terminal and dry port approach. Ghatte Khola bridge severed. Nepal Army deployed 42m steel Bailey bridge in 18 days to resume international trade.',
    },
    {
      name: 'Mailung & Lower Trishuli Basin (Elev. 890m)',
      speed: '5.2 m/s Gravel Slurry · +1.5m Silt Burial',
      displaced: '165 Families Displaced · 18 Hectares Paddy Inundated',
      details: 'Hyper-concentrated sediment deposition buried agrarian terraces under inert sand and river gravel. Motor bridge southern abutment undercut; 350m of armored boulder deflection spurs constructed.',
    },
    {
      name: 'Dhunche District Headquarters (Elev. 2,030m)',
      speed: 'Deep Sub-surface Hydrostatic Creep',
      displaced: '310 Families Displaced · Hospital Perimeter Fissures',
      details: 'Isolated for 19 days without highway supply. Severe subsidence threatening municipal hospital and administration complex. Horizontal drainage siphons installed to dewater unstable upper slopes.',
    },
  ];

  let vY = 94;
  villageDossier.forEach((v) => {
    doc.setFillColor(247, 246, 243);
    doc.setDrawColor(220, 218, 212);
    doc.roundedRect(margin, vY, contentWidth, 29, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    doc.text(v.name, margin + 4, vY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...accentRed);
    doc.text(`Recorded Speed: ${v.speed}`, margin + 4, vY + 10.5);

    doc.setTextColor(...textDark);
    doc.setFont('helvetica', 'bold');
    doc.text(v.displaced, margin + 4, vY + 15.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(80, 85, 80);
    const splitDetail = doc.splitTextToSize(v.details, contentWidth - 8);
    doc.text(splitDetail, margin + 4, vY + 20);

    vY += 33;
  });

  // Page 2 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text('Page 2 of 3 · Rasuwa District Emergency Assessment · Forensic Hydrology Record', margin, 285);

  // ================= PAGE 3: RECONSTRUCTION STRATA & AUDIT LEDGER =================
  doc.addPage();

  // Header Ribbon Page 3
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('MULTI-SECTOR REHABILITATION STRATA & FISCAL AUDIT LEDGER', margin, 10.5);

  // Strata Breakdown
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('6. FOUR RECONSTRUCTION STRATA (BUDGET & FIELD DELIVERABLES)', margin, 26);

  const strata = [
    {
      title: 'Temporary Shelters & Transitional Housing',
      budget: 'NPR 98.4 Million (88% Disbursed)',
      agency: 'Nepal Red Cross Society & UN-Habitat',
      output: '820 Winterized Shelters Built (Goal: 1,200) · 3,400 Solar Lanterns · Insulated Mats',
    },
    {
      title: 'Road Infrastructure Repair & Bridge Engineering',
      budget: 'NPR 164.8 Million (72% Disbursed)',
      agency: 'Department of Roads & Nepal Army Engineers',
      output: '68.4 km Highway Reopened · 42m Ghatte Khola Bailey Bridge · 12,400 m³ Gabions',
    },
    {
      title: 'Hydropower & Grid Energy Restoration',
      budget: 'NPR 92.5 Million (61% Disbursed)',
      agency: 'Nepal Electricity Authority & IPPs',
      output: '342 MW Capacity Stabilized · Chilime 22.1 MW Online · Silt Desanding Dikes',
    },
    {
      title: 'Community Health, Potable Water & Sanitation (WASH)',
      budget: 'NPR 56.8 Million (94% Disbursed)',
      agency: 'District Health Office & UNICEF Nepal',
      output: '28 Gravity Water Schemes Restored · 3,840 Patients Treated · Zero Cholera Cases',
    },
  ];

  let sY = 32;
  strata.forEach((s) => {
    doc.setFillColor(247, 246, 243);
    doc.setDrawColor(220, 218, 212);
    doc.roundedRect(margin, sY, contentWidth, 20, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    doc.text(s.title, margin + 4, sY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(16, 120, 60);
    doc.text(`Allocation: ${s.budget}`, margin + 4, sY + 9.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...textMuted);
    doc.text(`Lead Agency: ${s.agency}`, margin + 4, sY + 13.5);

    doc.setTextColor(...textDark);
    doc.text(`Key Outputs: ${s.output}`, margin + 4, sY + 17.5);

    sY += 23.5;
  });

  // Itemized Audit Ledger Extract
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text('7. OFFICIAL EMERGENCY SUPPLY & DISPATCH LEDGER (AUDIT SAMPLES)', margin, 134);

  const ledgerRows = [
    ['DISP-001', 'Dhunche Heli-pad', 'Surgical Kits & Plasma (12 Sorties)', 'Nepal Army & Red Cross', 'रू 8.40M', 'Delivered'],
    ['DISP-002', 'Upper Syaphrubesi', '3,200 CGI Zinc Roofing Bundles', 'UN-Habitat & DDMC', 'रू 26.40M', 'Delivered'],
    ['DISP-003', 'Ghatte Khola / Timure', '42m Modular Steel Bailey Bridge', 'Nepal Army Engineers', 'रू 28.00M', 'Audited'],
    ['DISP-004', 'Ramche / Kalikasthan', '285 Wall Insulation & Stove Kits', 'Nepal Red Cross', 'रू 9.80M', 'Delivered'],
    ['DISP-005', 'Highland Wards', '1,850 Ceramic Water Filters & Tablets', 'UNICEF & Health Office', 'रू 11.20M', 'Audited'],
    ['DISP-006', 'Mailung Basin', '42 Tonnes Fortified Rice & Lentils', 'WFP Logistics', 'रू 14.50M', 'Delivered'],
    ['DISP-007', 'Ramche Cliff Zone', '12,400 m³ Galvanized Gabion Wire Boxes', 'Department of Roads', 'रू 42.00M', 'In Field'],
  ];

  doc.setFillColor(230, 227, 220);
  doc.rect(margin, 139, contentWidth, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('DISP ID', margin + 3, 143);
  doc.text('DESTINATION', margin + 22, 143);
  doc.text('ITEMS DISPATCHED', margin + 58, 143);
  doc.text('LEAD ENTITY', margin + 115, 143);
  doc.text('ALLOCATION', margin + 152, 143);
  doc.text('STATUS', margin + 170, 143);

  let lY = 149;
  ledgerRows.forEach((lr, i) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...textDark);
    if (i % 2 === 1) {
      doc.setFillColor(248, 247, 244);
      doc.rect(margin, lY - 3.8, contentWidth, 6.2, 'F');
    }
    doc.text(lr[0], margin + 3, lY);
    doc.text(lr[1], margin + 22, lY);
    doc.text(lr[2], margin + 58, lY);
    doc.text(lr[3], margin + 115, lY);
    doc.text(lr[4], margin + 152, lY);
    doc.text(lr[5], margin + 170, lY);
    lY += 6.5;
  });

  // Strategic Roadmap & Certification Signature Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text('8. OFFICIAL DISASTER ARCHIVE CERTIFICATION', margin, 204);

  doc.setFillColor(245, 244, 240);
  doc.setDrawColor(210, 208, 200);
  doc.roundedRect(margin, 209, contentWidth, 58, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  doc.text('DISTRICT DISASTER MANAGEMENT COMMITTEE (DDMC) STATEMENT OF ACCURACY', margin + 5, 216);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textDark);
  const certText =
    'This report represents the official multi-sector record of the 2024-2026 Rasuwa District Flood Emergency and Post-Disaster Reconstruction. Data points regarding displaced families, highway damage logs, recorded hydrological velocities, and public fiscal allocations have been cross-verified by the District Administration Office (DAO), the National Disaster Risk Reduction & Management Authority (NDRRMA), and verified field engineering teams. This document is certified for official district archival and humanitarian research records.';
  doc.text(doc.splitTextToSize(certText, contentWidth - 10), margin + 5, 222);

  // Sign-off line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('ARJUN NEUPANE', margin + 5, 248);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Chief District Officer & Incident Commander', margin + 5, 252);
  doc.text('District Administration Office, Dhunche, Rasuwa', margin + 5, 256);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('NDRRMA DISASTER DATABASE REGISTER', margin + 105, 248);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Incident Registry: NP-BAG-RSW-2024-FL-01', margin + 105, 252);
  doc.text('Permanent Archive Hash: 9afab1c8-ddmc-rasuwa-2026', margin + 105, 256);

  // Page 3 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text('Page 3 of 3 · Final Certified Archival Copy · Government of Nepal Disaster Portal', margin, 285);

  // Trigger Save / Download
  doc.save('Rasuwa_Flood_Emergency_Recovery_Report_2024-2026.pdf');
}
