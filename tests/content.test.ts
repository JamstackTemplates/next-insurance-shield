import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { broker, validateBrokerData } from '../content/broker.ts';
import { business, validateBusinessData } from '../content/business.ts';
import { claims, validateClaimsData } from '../content/claims.ts';
import {
  coverCharacteristic,
  coverLinesForInsurer,
  coverTypes,
  validateCoverData,
} from '../content/cover.ts';
import { insurers, validateInsurersData } from '../content/insurers.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const rootDir = fileURLToPath(new URL('../', import.meta.url));

function collectSourceFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectSourceFiles(full));
    else if (/\.(ts|tsx)$/.test(entry.name)) results.push(full);
  }
  return results;
}

test('business content has actionable required fields and valid hours', () => {
  assert.doesNotThrow(() => validateBusinessData(business));
  assert.throws(
    () => validateBusinessData({ ...business, email: 'not-an-email' }),
    /business\.email/,
  );
  assert.throws(
    () => validateBusinessData({ ...business, serviceArea: [] }),
    /business\.serviceArea/,
  );
});

test('Light List cover data passes validation and reports item-specific failures', () => {
  assert.doesNotThrow(() => validateCoverData(coverTypes, insurers));

  // Duplicate id identifies item
  assert.throws(
    () => validateCoverData([...coverTypes, { ...coverTypes[0], listNo: 'LL-199', featured: false }], insurers),
    /cover\.homeowners: duplicate cover id/,
  );

  // Prefix mismatch (LL-2xx on personal)
  assert.throws(
    () => validateCoverData(
      coverTypes.map(item => (item.id === 'boat' ? { ...item, listNo: 'LL-209' } : item)),
      insurers,
    ),
    /cover\.boat: listNo "LL-209" must start with "LL-1"/,
  );

  // Covers count bounds (2-4)
  assert.throws(
    () => validateCoverData(
      coverTypes.map(item => (item.id === 'auto' ? { ...item, covers: ['Only one'] } : item)),
      insurers,
    ),
    /cover\.auto: covers must have 2 to 4 items/,
  );

  // WatchFor count bounds (1-3)
  assert.throws(
    () => validateCoverData(
      coverTypes.map(item => (item.id === 'flood' ? { ...item, watchFor: [] } : item)),
      insurers,
    ),
    /cover\.flood: watchFor must have 1 to 3 items/,
  );

  // Unknown insurer reference
  assert.throws(
    () => validateCoverData(
      coverTypes.map(item => (item.id === 'homeowners' ? { ...item, insurers: ['phantom-carrier'] } : item)),
      insurers,
    ),
    /cover\.homeowners: unknown insurer "phantom-carrier"/,
  );

  // Panel placement requires at least one insurer
  assert.throws(
    () => validateCoverData(
      coverTypes.map(item => (item.id === 'auto' ? { ...item, insurers: [] } : item)),
      insurers,
    ),
    /cover\.auto: panel placement requires at least one insurer/,
  );

  // Exactly five featured entries
  assert.throws(
    () => validateCoverData(
      coverTypes.map(item => (item.id === 'homeowners' ? { ...item, featured: false } : item)),
      insurers,
    ),
    /expected exactly 5 featured entries/,
  );
});

test('insurers have unique IDs and flags and every insurer is referenced by at least one cover', () => {
  const referenced = new Set(coverTypes.flatMap(item => item.insurers));
  assert.doesNotThrow(() => validateInsurersData(insurers, referenced));

  assert.throws(
    () => validateInsurersData(
      insurers.map(entry => (entry.id === 'seaward' ? { ...entry, flag: 'cross' } : entry)),
      referenced,
    ),
    /insurers\.seaward: duplicate signal flag/,
  );

  assert.throws(
    () => validateInsurersData(
      [...insurers, { id: 'unused-carrier', name: 'Unused Carrier', flag: 'cross' }],
      referenced,
    ),
    /insurers\.unused-carrier/,
  );
});

test('claims steps stay unique and ordered; FAQs and checklist stay valid', () => {
  assert.doesNotThrow(() => validateClaimsData(claims));
  assert.throws(
    () => validateClaimsData({ ...claims, steps: [...claims.steps].reverse() }),
    /expected step "make-safe" at position 1/,
  );
});

test('broker team specialties reference real Light List cover IDs', () => {
  assert.doesNotThrow(() => validateBrokerData(broker, coverTypes));
  assert.throws(
    () => validateBrokerData(
      {
        ...broker,
        team: broker.team.map(member =>
          member.id === 'maren-holt' ? { ...member, specialties: ['nonexistent-line'] } : member,
        ),
      },
      coverTypes,
    ),
    /broker\.team\.maren-holt: unknown specialty cover "nonexistent-line"/,
  );
});

test('common owner edit (pausing boat & adding Kennebec to homeowners) stays valid', () => {
  const edited = coverTypes.map(item => {
    if (item.id === 'boat') return { ...item, available: false };
    if (item.id === 'homeowners') {
      return { ...item, insurers: [...new Set([...item.insurers, 'kennebec'])] };
    }
    return item;
  });
  assert.doesNotThrow(() => validateCoverData(edited, insurers));
  const boat = edited.find(item => item.id === 'boat')!;
  assert.equal(coverCharacteristic(boat), 'PERSONAL · ASK US');
  assert.ok(coverLinesForInsurer('kennebec', edited).some(item => item.id === 'homeowners'));
});

test('structured data is InsuranceAgency derived from content/business.ts and escapes HTML', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'InsuranceAgency');
  assert.equal(schema.name, business.name);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.email, business.email);
  assert.equal(schema.address.addressLocality, 'Portland');
  assert.equal(schema.address.addressRegion, 'ME');
  assert.equal(schema.openingHoursSpecification.length, 6);
  assert.ok(schema.areaServed.length >= 4);

  const dangerous = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(dangerous);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), dangerous);
});

test('copy guardrails: no prices, no coverage/claim guarantees, required Contact and footer notices present', () => {
  const files = [
    ...collectSourceFiles(join(rootDir, 'content')),
    ...collectSourceFiles(join(rootDir, 'app')),
    ...collectSourceFiles(join(rootDir, 'components')),
  ];
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    // No dollar amounts or "from $" figures anywhere in website copy (ignore template literals like `${`)
    assert.doesNotMatch(source, /\$\s?\d|from\s+\$/i, `${file}: must not contain price figures`);
    // No prohibited promises
    assert.doesNotMatch(
      source,
      /guaranteed\s+quote|quote\s+is\s+guaranteed|cover\s+is\s+bound|instant\s+cover|claim\s+will\s+be\s+paid|guaranteed\s+payout/i,
      `${file}: must not promise bound cover, guaranteed quotes or paid claims`,
    );
  }

  assert.match(
    business.enquiries.bindingNotice,
    /Cover starts only when an insurer confirms it in writing/,
  );
  assert.match(business.enquiries.sensitiveCaution, /policy numbers/i);
  assert.match(business.enquiries.sensitiveCaution, /Social Security numbers/i);
  assert.match(business.legal.sampleNotice, /Sample website for the Jamstacks gallery/);
  assert.match(business.legal.wordingNotice, /your policy wording governs/);
});
