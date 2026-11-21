export const INSURER_FLAGS = [
  'cross',
  'diagonal',
  'quartered',
  'border',
  'stripe',
  'chevron',
] as const;

export type InsurerFlag = (typeof INSURER_FLAGS)[number];

export interface Insurer {
  /** URL-safe unique identifier referenced by content/cover.ts. */
  id: string;
  /** Display name of the fictitious panel insurer. */
  name: string;
  /** Unique maritime signal-flag pattern rendered on the halyard and Light List. */
  flag: InsurerFlag;
}

/**
 * Fictitious panel of insurers compared by Lighthouse Cover Insurance.
 * Lines placed with each insurer are derived from content/cover.ts rather than duplicated here.
 */
export const insurers: readonly Insurer[] = [
  { id: 'granite-ledge', name: 'Granite Ledge Insurance', flag: 'quartered' },
  { id: 'northline', name: 'Northline Casualty', flag: 'stripe' },
  { id: 'bramblewood', name: 'Bramblewood Mutual', flag: 'border' },
  { id: 'tidewater', name: 'Tidewater Indemnity', flag: 'diagonal' },
  { id: 'kennebec', name: 'Kennebec Fire & Marine', flag: 'cross' },
  { id: 'seaward', name: 'Seaward Specialty', flag: 'chevron' },
];

export type InsurerId = (typeof insurers)[number]['id'];

export function insurerById(id: string): Insurer | undefined {
  return insurers.find(entry => entry.id === id);
}

export function validateInsurersData(
  list: readonly Insurer[] = insurers,
  referencedInsurerIds?: ReadonlySet<string>,
): void {
  if (list.length === 0) throw new Error('insurers: at least one insurer is required');
  const seenIds = new Set<string>();
  const seenFlags = new Set<string>();
  for (const insurer of list) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(insurer.id)) {
      throw new Error(`insurers.${insurer.id || '(empty)'}: id must be URL-safe lowercase kebab-case`);
    }
    if (seenIds.has(insurer.id)) {
      throw new Error(`insurers.${insurer.id}: duplicate insurer id`);
    }
    seenIds.add(insurer.id);
    if (!insurer.name.trim()) {
      throw new Error(`insurers.${insurer.id}: name is required`);
    }
    if (!INSURER_FLAGS.includes(insurer.flag)) {
      throw new Error(`insurers.${insurer.id}: invalid flag "${String(insurer.flag)}"`);
    }
    if (seenFlags.has(insurer.flag)) {
      throw new Error(`insurers.${insurer.id}: duplicate signal flag "${insurer.flag}"`);
    }
    seenFlags.add(insurer.flag);
    if (referencedInsurerIds && !referencedInsurerIds.has(insurer.id)) {
      throw new Error(`insurers.${insurer.id}: must be referenced by at least one cover type`);
    }
  }
}
