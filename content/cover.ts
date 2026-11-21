import { insurers, validateInsurersData, type Insurer } from './insurers.ts';

export type CoverAudience = 'personal' | 'business';
export type CoverPlacement = 'panel' | 'specialist';

export interface CoverType {
  /** URL-safe unique identifier used as the #anchor on /cover/ and referenced by team specialties. */
  id: string;
  /** Light List catalogue number: LL-1xx for personal, LL-2xx for business. */
  listNo: string;
  /** Cover name shown in the Light List. */
  name: string;
  /** Grouping on /cover/ and filter target. */
  audience: CoverAudience;
  /** One-sentence plain-English summary. */
  summary: string;
  /** 2–4 concise items typically included under this cover. */
  covers: readonly string[];
  /** 1–3 common exclusions, waiting periods or limits to watch for. */
  watchFor: readonly string[];
  /** One-line description of who this cover suits. */
  goodFor: string;
  /** 'panel' = compared across our insurer panel; 'specialist' = specialist or government programme. */
  placement: CoverPlacement;
  /** Optional description for specialist placements (e.g. government flood programme). */
  placementNote?: string;
  /** Insurer IDs from content/insurers.ts; required non-empty when placement is 'panel'. */
  insurers: readonly string[];
  /** Exactly five entries are featured in the Home page Light List preview. */
  featured: boolean;
  /** Set to false to show "Not currently placing — ask us" while keeping the entry visible. */
  available: boolean;
}

/**
 * The Light List — every cover type placed by Lighthouse Cover Insurance.
 * Owner edits most often: insurers, featured, available, or adding a new cover type.
 * Never publish premiums or starting price figures: rates depend on the risk.
 */
export const coverTypes: readonly CoverType[] = [
  {
    id: 'homeowners',
    listNo: 'LL-101',
    name: 'Homeowners',
    audience: 'personal',
    summary: 'Your house, its contents and your liability to others, in one policy.',
    covers: [
      'Dwelling and attached structures',
      'Personal belongings',
      'Liability if someone is hurt on your property',
      "Extra living costs while you're out of your home",
    ],
    watchFor: [
      'Flood is excluded',
      'Replacement cost vs actual cash value',
    ],
    goodFor: 'Owners of a house or multi-family they live in.',
    placement: 'panel',
    insurers: ['granite-ledge', 'northline', 'bramblewood', 'tidewater'],
    featured: true,
    available: true,
  },
  {
    id: 'condo-renters',
    listNo: 'LL-102',
    name: 'Condo & renters',
    audience: 'personal',
    summary: "Your belongings and the inside of your unit, where the building's policy stops.",
    covers: [
      'Belongings',
      'Interior improvements (condo)',
      'Liability',
    ],
    watchFor: [
      "Check the association's master policy",
      'High-value items may need scheduling',
    ],
    goodFor: 'Condo owners and tenants.',
    placement: 'panel',
    insurers: ['granite-ledge', 'northline', 'bramblewood'],
    featured: false,
    available: true,
  },
  {
    id: 'auto',
    listNo: 'LL-103',
    name: 'Auto',
    audience: 'personal',
    summary: 'Liability, collision and comprehensive cover for the cars in your household.',
    covers: [
      'Bodily injury and property damage liability',
      'Collision',
      'Comprehensive (theft, storm, deer)',
      'Uninsured motorist',
    ],
    watchFor: [
      'Rideshare use needs its own endorsement',
    ],
    goodFor: 'Households with one or more vehicles.',
    placement: 'panel',
    insurers: ['northline', 'bramblewood', 'kennebec'],
    featured: true,
    available: true,
  },
  {
    id: 'boat',
    listNo: 'LL-104',
    name: 'Boat & yacht',
    audience: 'personal',
    summary: 'Hull, gear and liability for boats on the water, on the trailer or on the hard.',
    covers: [
      'Hull and machinery',
      'Liability on the water',
      'Fuel spill and wreck removal',
      'Towing assistance',
    ],
    watchFor: [
      'Navigation limits and lay-up periods',
    ],
    goodFor: 'Sail and power boats, moorings in Casco Bay.',
    placement: 'panel',
    insurers: ['tidewater', 'seaward'],
    featured: true,
    available: true,
  },
  {
    id: 'umbrella',
    listNo: 'LL-105',
    name: 'Personal umbrella',
    audience: 'personal',
    summary: 'An extra layer of liability above your home, auto and boat policies.',
    covers: [
      'Liability above underlying limits',
      'Legal defence costs',
    ],
    watchFor: [
      "Underlying limits must meet the insurer's minimums",
    ],
    goodFor: 'Households with more to protect.',
    placement: 'panel',
    insurers: ['granite-ledge', 'northline'],
    featured: false,
    available: true,
  },
  {
    id: 'flood',
    listNo: 'LL-106',
    name: 'Flood',
    audience: 'personal',
    summary: 'Flood cover for buildings and contents, which standard home policies exclude.',
    covers: [
      'Building',
      'Contents',
    ],
    watchFor: [
      'A waiting period usually applies before cover starts',
      'Basements have limits',
    ],
    goodFor: 'Coastal and riverside properties.',
    placement: 'specialist',
    placementNote: 'Placed through the government flood programme or private flood markets.',
    insurers: [],
    featured: false,
    available: true,
  },
  {
    id: 'business-owners',
    listNo: 'LL-201',
    name: "Business owner's policy",
    audience: 'business',
    summary: 'Property and general liability bundled for small businesses.',
    covers: [
      'Premises and equipment',
      'General liability',
      'Business interruption',
    ],
    watchFor: [
      'Professional mistakes need separate cover',
    ],
    goodFor: 'Shops, studios, cafés and offices.',
    placement: 'panel',
    insurers: ['granite-ledge', 'kennebec', 'seaward'],
    featured: true,
    available: true,
  },
  {
    id: 'commercial-auto',
    listNo: 'LL-202',
    name: 'Commercial auto',
    audience: 'business',
    summary: 'Vehicles your business owns or that employees drive for work.',
    covers: [
      'Liability',
      'Physical damage',
      'Hired and non-owned autos',
    ],
    watchFor: [
      'Personal auto policies may not respond to business use',
    ],
    goodFor: 'Trades, delivery and service businesses.',
    placement: 'panel',
    insurers: ['kennebec', 'northline'],
    featured: false,
    available: true,
  },
  {
    id: 'professional-liability',
    listNo: 'LL-203',
    name: 'Professional liability',
    audience: 'business',
    summary: 'Cover for claims that your advice or work caused a client a loss.',
    covers: [
      'Defence costs',
      'Settlements and judgments',
    ],
    watchFor: [
      'Usually written on a claims-made basis',
    ],
    goodFor: 'Consultants, designers and other advice-led firms.',
    placement: 'panel',
    insurers: ['seaward', 'tidewater'],
    featured: false,
    available: true,
  },
  {
    id: 'workers-comp',
    listNo: 'LL-204',
    name: "Workers' compensation",
    audience: 'business',
    summary: 'Medical costs and lost wages for employees hurt on the job.',
    covers: [
      'Medical care',
      'Wage replacement',
      "Employer's liability",
    ],
    watchFor: [
      'Required in Maine for most employers with staff',
    ],
    goodFor: 'Any business with employees.',
    placement: 'panel',
    insurers: ['kennebec', 'granite-ledge'],
    featured: true,
    available: true,
  },
];

export const featuredCoverTypes = coverTypes.filter(item => item.featured);

export function coverById(id: string): CoverType | undefined {
  return coverTypes.find(entry => entry.id === id);
}

/** Derive the cover lines an insurer writes directly from content/cover.ts. */
export function coverLinesForInsurer(
  insurerId: string,
  list: readonly CoverType[] = coverTypes,
): readonly CoverType[] {
  return list.filter(item => item.insurers.includes(insurerId));
}

/** Characteristic label shown in mono type in the Light List table. */
export function coverCharacteristic(item: CoverType): string {
  const audience = item.audience.toUpperCase();
  if (!item.available) return `${audience} · ASK US`;
  if (item.placement === 'specialist') return `${audience} · SPECIALIST MARKET`;
  const count = item.insurers.length;
  return `${audience} · ${count} ${count === 1 ? 'INSURER' : 'INSURERS'}`;
}

export function validateCoverData(
  list: readonly CoverType[] = coverTypes,
  panel: readonly Insurer[] = insurers,
): void {
  const validInsurerIds = new Set(panel.map(entry => entry.id));
  const referencedInsurers = new Set<string>();
  const seenIds = new Set<string>();
  const seenListNos = new Set<string>();
  let featuredCount = 0;

  for (const item of list) {
    const label = `cover.${item.id || '(empty)'}`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) {
      throw new Error(`${label}: id must be URL-safe lowercase kebab-case`);
    }
    if (seenIds.has(item.id)) {
      throw new Error(`${label}: duplicate cover id`);
    }
    seenIds.add(item.id);

    if (!/^LL-[12]\d{2}$/.test(item.listNo)) {
      throw new Error(`${label}: listNo "${item.listNo}" must match LL-1xx or LL-2xx`);
    }
    if (seenListNos.has(item.listNo)) {
      throw new Error(`${label}: duplicate listNo "${item.listNo}"`);
    }
    seenListNos.add(item.listNo);

    if (item.audience !== 'personal' && item.audience !== 'business') {
      throw new Error(`${label}: audience must be "personal" or "business"`);
    }
    const expectedPrefix = item.audience === 'personal' ? 'LL-1' : 'LL-2';
    if (!item.listNo.startsWith(expectedPrefix)) {
      throw new Error(
        `${label}: listNo "${item.listNo}" must start with "${expectedPrefix}" for ${item.audience} cover`,
      );
    }

    if (!item.name.trim()) throw new Error(`${label}: name is required`);
    if (!item.summary.trim()) throw new Error(`${label}: summary is required`);
    if (!item.goodFor.trim()) throw new Error(`${label}: goodFor is required`);

    if (item.covers.length < 2 || item.covers.length > 4) {
      throw new Error(`${label}: covers must have 2 to 4 items (found ${item.covers.length})`);
    }
    for (const line of item.covers) {
      if (!line.trim()) throw new Error(`${label}: covers contains an empty entry`);
    }

    if (item.watchFor.length < 1 || item.watchFor.length > 3) {
      throw new Error(`${label}: watchFor must have 1 to 3 items (found ${item.watchFor.length})`);
    }
    for (const line of item.watchFor) {
      if (!line.trim()) throw new Error(`${label}: watchFor contains an empty entry`);
    }

    if (item.placement !== 'panel' && item.placement !== 'specialist') {
      throw new Error(`${label}: placement must be "panel" or "specialist"`);
    }
    if (item.placement === 'panel' && item.insurers.length === 0) {
      throw new Error(`${label}: panel placement requires at least one insurer`);
    }

    const seenItemInsurers = new Set<string>();
    for (const insurerId of item.insurers) {
      if (!validInsurerIds.has(insurerId)) {
        throw new Error(`${label}: unknown insurer "${insurerId}"`);
      }
      if (seenItemInsurers.has(insurerId)) {
        throw new Error(`${label}: duplicate insurer "${insurerId}"`);
      }
      seenItemInsurers.add(insurerId);
      referencedInsurers.add(insurerId);
    }

    if (typeof item.featured !== 'boolean') {
      throw new Error(`${label}: featured must be a boolean`);
    }
    if (typeof item.available !== 'boolean') {
      throw new Error(`${label}: available must be a boolean`);
    }
    if (item.featured) featuredCount += 1;
  }

  if (featuredCount !== 5) {
    throw new Error(`cover: expected exactly 5 featured entries for Home (found ${featuredCount})`);
  }

  validateInsurersData(panel, referencedInsurers);
}
