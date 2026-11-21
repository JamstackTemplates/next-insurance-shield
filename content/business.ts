import { validateHours, type OpeningHours } from '../lib/hours.ts';

export interface BusinessAddress {
  /** Public landmark or wharf name. */
  landmark: string;
  /** Street name (no street number for Custom House Wharf). */
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  /** Full formatted address for maps and display. */
  formatted: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short wordmark for compact header spaces. */
  shortName: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text description used for fallback metadata and structured data. */
  introduction: string;
  /** Public contact email, always visible on Contact. */
  email: string;
  /** Public telephone number; owner edits most often. */
  phone: string;
  /** Nautical chart coordinates for the Portland waterfront office. */
  coordinates: string;
  /** Office location details for visitors, maps and structured data. */
  address: BusinessAddress;
  /** Towns and regions served; owner edits often. */
  serviceArea: readonly string[];
  /** Seven weekly OpeningHours records (same-day intervals only); owner edits most often. */
  hours: readonly OpeningHours[];
  /** Contact guidance; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Plain-text summary used in Contact metadata and intro. */
    introduction: string;
    /** Suggestions for the message box, not extra form inputs. */
    usefulToInclude: readonly string[];
    /** Explicit warning not to transmit sensitive personal or financial identifiers. */
    sensitiveCaution: string;
    /** Required non-binding wording for quote and review enquiries. */
    bindingNotice: string;
    /** Required wording for claim notifications sent via Contact. */
    claimsNotice: string;
  };
  /** Site-wide legal disclaimers rendered in the footer. */
  legal: {
    sampleNotice: string;
    wordingNotice: string;
  };
}

export const business: Business = {
  name: 'Lighthouse Cover Insurance',
  shortName: 'Lighthouse Cover',
  tagline: "Cover that fits. A broker who picks up when it doesn't go to plan.",
  introduction:
    'Independent insurance broker on the Portland, Maine waterfront. Home, auto, boat and small-business cover compared across our insurer panel, with claims help when it counts.',
  email: 'hello@lighthousecover.example',
  phone: '(207) 555-0142',
  coordinates: '43°39′N 70°15′W',
  address: {
    landmark: 'Custom House Wharf',
    street: 'Commercial Street',
    city: 'Portland',
    region: 'ME',
    postalCode: '04101',
    country: 'US',
    formatted: 'Custom House Wharf, Commercial Street, Portland, ME 04101',
  },
  serviceArea: [
    'Greater Portland',
    'Cape Elizabeth',
    'South Portland',
    'Falmouth',
    'the southern Maine coast',
  ],
  hours: [
    { day: 'Monday', opens: '08:30', closes: '17:30' },
    { day: 'Tuesday', opens: '08:30', closes: '17:30' },
    { day: 'Wednesday', opens: '08:30', closes: '17:30' },
    { day: 'Thursday', opens: '08:30', closes: '17:30' },
    { day: 'Friday', opens: '08:30', closes: '16:00' },
    { day: 'Saturday', opens: '09:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  enquiries: {
    title: 'Ask for a cover review',
    introduction:
      'Send an enquiry for a cover review, a quote comparison, a question about an existing policy, or to keep us in the loop on a claim you have reported to your insurer.',
    usefulToInclude: [
      'What you want to insure or ask about (home, car, boat or business)',
      'Your town or mooring harbour',
      'When your current cover renews',
      'The best time of day to call you back',
    ],
    sensitiveCaution:
      "Please don't send policy numbers, Social Security numbers, dates of birth or bank or card details through this form — we'll ask for anything we need over the phone.",
    bindingNotice:
      "Cover starts only when an insurer confirms it in writing. Sending this form doesn't create or change a policy.",
    claimsNotice:
      'Report a claim to your insurer first; this form is for keeping us in the loop.',
  },
  legal: {
    sampleNotice:
      'Sample website for the Jamstacks gallery. Lighthouse Cover Insurance and its insurers are fictitious; nothing here is an offer of insurance.',
    wordingNotice:
      'Cover summaries are general descriptions; your policy wording governs.',
  },
};

export function validateBusinessData(data: Business = business): void {
  for (const key of ['name', 'shortName', 'tagline', 'introduction', 'email', 'phone', 'coordinates'] as const) {
    if (!data[key].trim()) throw new Error(`business.${key}: required`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error('business.email: valid public email required');
  }
  for (const key of ['landmark', 'street', 'city', 'region', 'postalCode', 'country', 'formatted'] as const) {
    if (!data.address[key].trim()) throw new Error(`business.address.${key}: required`);
  }
  if (data.serviceArea.length === 0) throw new Error('business.serviceArea: list at least one area');
  for (const area of data.serviceArea) {
    if (!area.trim()) throw new Error('business.serviceArea: empty entry');
  }
  validateHours(data.hours);
  for (const key of ['title', 'introduction', 'sensitiveCaution', 'bindingNotice', 'claimsNotice'] as const) {
    if (!data.enquiries[key].trim()) throw new Error(`business.enquiries.${key}: required`);
  }
  if (data.enquiries.usefulToInclude.length === 0) {
    throw new Error('business.enquiries.usefulToInclude: include message guidance');
  }
  for (const tip of data.enquiries.usefulToInclude) {
    if (!tip.trim()) throw new Error('business.enquiries.usefulToInclude: empty tip');
  }
  if (!data.legal.sampleNotice.trim()) throw new Error('business.legal.sampleNotice: required');
  if (!data.legal.wordingNotice.trim()) throw new Error('business.legal.wordingNotice: required');
}
