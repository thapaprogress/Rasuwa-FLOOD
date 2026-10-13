// Authentic geographic representation of Rasuwa District, Nepal
// River corridors: Trishuli River, Bhote Koshi, Langtang Khola, and Chilime Khola
// Municipalities, mountain ranges, and critical infrastructure points

export interface RasuwaMunicipalityGeo {
  id: string;
  name: string;
  nepaliName: string;
  centroid: { x: number; y: number };
  svgPath: string;
  fillColor: string;
  strokeColor: string;
  description: string;
  wardsCount: number;
  displacedHouseholds: number;
}

export const RASUWA_MAP_DIMENSIONS = {
  viewBox: '0 0 800 700',
  width: 800,
  height: 700,
};

// SVG paths for the 5 Rural Municipalities of Rasuwa District
export const RASUWA_MUNICIPALITIES: RasuwaMunicipalityGeo[] = [
  {
    id: 'gosaikunda',
    name: 'Gosaikunda Rural Municipality',
    nepaliName: 'गोसाइँकुण्ड गाउँपालिका',
    centroid: { x: 440, y: 340 },
    // Encompasses Dhunche HQ, Syaphrubesi, Timure, Rasuwagadhi, and Langtang Valley
    svgPath: 'M 360 80 C 430 70 510 90 580 120 C 650 150 720 210 740 270 C 750 310 730 360 670 380 C 620 400 560 410 520 450 C 490 480 470 530 430 540 C 400 550 380 500 370 450 C 350 380 340 320 350 250 C 360 180 340 120 360 80 Z',
    fillColor: '#1E2922',
    strokeColor: '#3B4D3F',
    description: 'Encompasses northern high Himalayan gorges, Langtang National Park corridor, and transboundary trade route to Tibet.',
    wardsCount: 6,
    displacedHouseholds: 622,
  },
  {
    id: 'aama-chhodingmo',
    name: 'Aama Chhodingmo Rural Municipality',
    nepaliName: 'आमा छोदिङ्मो गाउँपालिका',
    centroid: { x: 260, y: 220 },
    // Northwestern highland valley including Chilime, Thambuchet, Gatlang
    svgPath: 'M 180 120 C 240 100 300 85 360 80 C 340 120 360 180 350 250 C 340 300 310 330 270 350 C 230 365 190 350 160 300 C 140 250 150 170 180 120 Z',
    fillColor: '#1A231C',
    strokeColor: '#344537',
    description: 'Steep northwestern catchments encompassing Chilime Valley, Tamang Heritage trail, and high hydropower generation assets.',
    wardsCount: 5,
    displacedHouseholds: 180,
  },
  {
    id: 'kalika',
    name: 'Kalika Rural Municipality',
    nepaliName: 'कालिका गाउँपालिका',
    centroid: { x: 290, y: 490 },
    // Western / southern ridge including Ramche, Kalikasthan, Dhaibung
    svgPath: 'M 270 350 C 310 330 340 300 350 250 C 370 320 370 380 370 450 C 380 500 400 550 370 580 C 330 610 270 590 240 550 C 220 500 230 430 250 380 Z',
    fillColor: '#202B23',
    strokeColor: '#3A4C3D',
    description: 'Mid-hill agricultural ridges severely impacted by the historic Ramche fault line reactivation and highway fractures.',
    wardsCount: 5,
    displacedHouseholds: 345,
  },
  {
    id: 'uttargaya',
    name: 'Uttargaya Rural Municipality',
    nepaliName: 'उत्तरगया गाउँपालिका',
    centroid: { x: 250, y: 610 },
    // Southern entry gateway at Betrawati and lower Trishuli river basin
    svgPath: 'M 240 550 C 270 590 330 610 370 580 C 350 630 300 670 240 680 C 190 680 170 630 180 580 C 190 540 220 520 240 550 Z',
    fillColor: '#17211A',
    strokeColor: '#2E3D31',
    description: 'Southern river basin gateway at Betrawati confluence where catastrophic sediment deposition inundated agricultural terraces.',
    wardsCount: 5,
    displacedHouseholds: 215,
  },
  {
    id: 'naukunda',
    name: 'Naukunda Rural Municipality',
    nepaliName: 'नौकुण्ड गाउँपालिका',
    centroid: { x: 450, y: 590 },
    // Southeastern high ridge bordering Nuwakot and Langtang southern slopes
    svgPath: 'M 430 540 C 470 530 490 480 520 450 C 560 490 580 550 560 610 C 530 660 460 680 400 660 C 370 630 370 580 400 550 Z',
    fillColor: '#1C251F',
    strokeColor: '#324235',
    description: 'Southeastern alpine slopes with scattered indigenous Tamang communities facing isolated water supply cuts.',
    wardsCount: 6,
    displacedHouseholds: 120,
  },
];

// Major mountain river corridors cutting through the terrain
export const RIVER_TRISHULI_PATH = 
  'M 470 120 C 450 180 430 240 420 300 C 400 360 380 430 360 480 C 340 520 310 560 270 610 C 230 650 200 680 170 700';

export const RIVER_BHOTE_KOSHI_PATH = 
  'M 540 70 C 520 120 490 180 460 240 C 430 290 410 330 390 360';

export const RIVER_LANGTANG_PATH = 
  'M 720 280 C 640 290 550 320 480 340 C 440 350 410 360 390 360';

export const RIVER_CHILIME_PATH = 
  'M 220 190 C 260 220 310 260 360 290 C 390 310 410 340 420 360';

// Pasang Lhamu Highway main arterial spine
export const HIGHWAY_PASANG_LHAMU_PATH = 
  'M 180 690 L 220 640 L 260 590 L 310 530 L 340 470 L 370 420 L 400 360 L 440 290 L 480 210 L 510 140 L 530 80';

// Mountain peaks / prominent landmarks for cartographic realism
export const HIMALAYAN_PEAKS = [
  { name: 'Langtang Lirung (7,227m)', x: 620, y: 160 },
  { name: 'Ganesh Himal (7,422m)', x: 120, y: 140 },
  { name: 'Gosainkunda Sacred Lake (4,380m)', x: 570, y: 440 },
  { name: 'Dorje Lakpa (6,966m)', x: 740, y: 230 },
];
