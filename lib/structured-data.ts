import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';
import { site } from './site.ts';

/** InsuranceAgency structured data derived from content/business.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const image = site.url ? `${site.url}/og.png` : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phone,
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.landmark}, ${business.address.street}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: business.serviceArea.map(name => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    openingHoursSpecification: business.hours
      .filter(entry => entry.opens && entry.closes)
      .map(entry => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${entry.day}`,
        opens: entry.opens,
        closes: entry.closes,
      })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
