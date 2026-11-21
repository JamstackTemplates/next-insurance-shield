import { coverTypes, type CoverType } from './cover.ts';

export interface ComparisonRow {
  id: string;
  question: string;
  direct: string;
  broker: string;
}

export interface BrokerTeamMember {
  /** URL-safe unique identifier. */
  id: string;
  name: string;
  role: string;
  /** Year the broker joined or started working on the waterfront. */
  since: number;
  /** Cover IDs from content/cover.ts; validated against the Light List. */
  specialties: readonly string[];
  /** Short personal note for the keepers' log. */
  note: string;
}

/**
 * Why-a-broker comparison, payment transparency and keepers' log team list.
 * Owner edits often: team list.
 */
export const broker = {
  comparison: [
    {
      id: 'who-you-deal-with',
      question: 'Who you deal with',
      direct: "Whoever answers the insurer's phone line.",
      broker: 'A named broker in Portland who knows your file.',
    },
    {
      id: 'choice',
      question: 'Choice of cover',
      direct: "One insurer's products.",
      broker: 'Quotes compared across our panel of six.',
    },
    {
      id: 'small-print',
      question: 'Reading the small print',
      direct: 'You read the policy wording yourself.',
      broker: 'We explain the exclusions that matter for you.',
    },
    {
      id: 'claims',
      question: 'When you claim',
      direct: 'You manage the claim with the insurer.',
      broker: 'We help you prepare, follow up and question decisions.',
    },
    {
      id: 'renewal',
      question: 'At renewal',
      direct: 'Renewal arrives; you check it.',
      broker: 'We review cover and price before renewal, every year.',
    },
  ] as readonly ComparisonRow[],
  payment: {
    commission:
      'For most personal and small-business policies, we are paid a commission by the insurer you choose, built into the premium they quote.',
    fee:
      'If a specialist placement carries a separate broker fee, we agree the exact figure with you in writing before you buy.',
    review:
      'There is no charge for a cover review, whether you move a policy to us or keep what you have.',
  },
  team: [
    {
      id: 'maren-holt',
      name: 'Maren Holt',
      role: 'Principal broker',
      since: 2009,
      specialties: ['homeowners', 'boat', 'umbrella'],
      note: 'Grew up on Peaks Island; insures half the moorings she can see from her desk.',
    },
    {
      id: 'theo-ashby',
      name: 'Theo Ashby',
      role: 'Commercial lines',
      since: 2014,
      specialties: ['business-owners', 'commercial-auto', 'workers-comp'],
      note: 'Twenty years of helping owner-run businesses read their policies.',
    },
    {
      id: 'priya-nadeau',
      name: 'Priya Nadeau',
      role: 'Claims advocate',
      since: 2017,
      specialties: ['homeowners', 'auto', 'flood'],
      note: 'Former adjuster; knows what insurers ask for and when.',
    },
  ] as readonly BrokerTeamMember[],
};

export function teamMemberById(id: string): BrokerTeamMember | undefined {
  return broker.team.find(member => member.id === id);
}

export function validateBrokerData(
  data = broker,
  covers: readonly CoverType[] = coverTypes,
): void {
  const validCoverIds = new Set(covers.map(entry => entry.id));

  const seenComparisonIds = new Set<string>();
  if (data.comparison.length === 0) {
    throw new Error('broker.comparison: at least one comparison row is required');
  }
  for (const row of data.comparison) {
    const label = `broker.comparison.${row.id || '(empty)'}`;
    if (!row.id.trim()) throw new Error(`${label}: id is required`);
    if (seenComparisonIds.has(row.id)) throw new Error(`${label}: duplicate comparison row id`);
    seenComparisonIds.add(row.id);
    if (!row.question.trim()) throw new Error(`${label}: question is required`);
    if (!row.direct.trim()) throw new Error(`${label}: direct text is required`);
    if (!row.broker.trim()) throw new Error(`${label}: broker text is required`);
  }

  for (const key of ['commission', 'fee', 'review'] as const) {
    if (!data.payment[key].trim()) throw new Error(`broker.payment.${key}: required`);
  }

  const seenTeamIds = new Set<string>();
  if (data.team.length === 0) throw new Error('broker.team: at least one team member is required');
  for (const member of data.team) {
    const label = `broker.team.${member.id || '(empty)'}`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(member.id)) {
      throw new Error(`${label}: id must be URL-safe lowercase kebab-case`);
    }
    if (seenTeamIds.has(member.id)) throw new Error(`${label}: duplicate team member id`);
    seenTeamIds.add(member.id);
    if (!member.name.trim()) throw new Error(`${label}: name is required`);
    if (!member.role.trim()) throw new Error(`${label}: role is required`);
    if (!Number.isInteger(member.since) || member.since < 1950 || member.since > 2100) {
      throw new Error(`${label}: since must be a valid four-digit year`);
    }
    if (member.specialties.length === 0) {
      throw new Error(`${label}: specialties must reference at least one cover type`);
    }
    for (const coverId of member.specialties) {
      if (!validCoverIds.has(coverId)) {
        throw new Error(`${label}: unknown specialty cover "${coverId}"`);
      }
    }
    if (!member.note.trim()) throw new Error(`${label}: note is required`);
  }
}
