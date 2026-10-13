export interface AffectedRegion {
  id: string;
  name: string;
  nepaliName: string;
  municipality: string;
  elevationM: number;
  familiesDisplaced: number;
  damageSummary: string;
  recoveryProgressPercent: number;
  riverCorridor: 'Trishuli Corridor' | 'Bhote Koshi Corridor' | 'Langtang Catchment';
  priorityStatus: 'Critical Priority' | 'Severe Impact' | 'Moderate / Stabilized';
  coordinates: { x: number; y: number };
  keyRisks: string[];
  rehabActions: string[];
}

export type InfrastructureCategory = 'hydropower' | 'bridge' | 'highway' | 'rescue_hub';

export interface InfrastructurePoint {
  id: string;
  name: string;
  category: InfrastructureCategory;
  location: string;
  riverCorridor: string;
  damageStatus: 'Destroyed' | 'Severe Damage' | 'Under Restoration' | 'Operational / Restored';
  specMetric: string; // e.g. "60 MW", "145m Steel Span", "Ch. 74+200 km"
  budgetNprMillion: number;
  restorationTimeline: string;
  leadAgency: string;
  description: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 on map
}

export interface ReliefStrataItem {
  id: 'shelters' | 'roads' | 'hydropower' | 'health';
  title: string;
  nepaliTitle: string;
  leadAgency: string;
  budgetAllocatedNprM: number;
  fundsDisbursedPercent: number;
  keyUnitsDelivered: string;
  primaryRole: string;
  challenges: string[];
  fieldHighlights: string[];
  image: string;
}

export interface StrategicGoal {
  title: string;
  pillar: string;
  metric: string;
  description: string;
  targetDate: string;
}

export interface NarrativeStory {
  title: string;
  location: string;
  subDistrict: string;
  heroStat: string;
  statLabel: string;
  body: string;
  quote?: string;
  quoteAuthor?: string;
  agencyBadge?: string;
}
