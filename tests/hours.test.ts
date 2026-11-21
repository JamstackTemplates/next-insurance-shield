import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  currentDayInTimeZone,
  DAYS,
  openingLabel,
  validateHours,
  type OpeningHours,
} from '../lib/hours.ts';

const sampleHours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const atSample = (date: string, zone = 'America/New_York') =>
  openingLabel(sampleHours, zone, new Date(date));
const atOffice = (date: string, zone = 'America/New_York') =>
  openingLabel(business.hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atSample('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('Lighthouse Cover hours: Friday 16:00 closed, Saturday 11:59 open / 12:00 closed, Sunday closed', () => {
  // Friday 2026-11-20 in EST (UTC-5): 15:59 = 20:59Z, 16:00 = 21:00Z
  assert.equal(atOffice('2026-11-20T20:59:00Z'), 'Open now · until 16:00');
  assert.equal(atOffice('2026-11-20T21:00:00Z'), 'Closed · opens Saturday at 09:00');

  // Saturday 2026-11-21 in EST (UTC-5): 11:59 = 16:59Z, 12:00 = 17:00Z
  assert.equal(atOffice('2026-11-21T16:59:00Z'), 'Open now · until 12:00');
  assert.equal(atOffice('2026-11-21T17:00:00Z'), 'Closed · opens Monday at 08:30');

  // Sunday 2026-11-22 in EST: always closed, opens Monday at 08:30
  assert.equal(atOffice('2026-11-22T15:00:00Z'), 'Closed · opens Monday at 08:30');
});

test('Lighthouse Cover hours remain accurate across March and November DST changes in America/New_York', () => {
  // March 2026: DST springs forward Sunday 2026-03-08 02:00 EST -> 03:00 EDT (UTC-4)
  // Saturday 2026-03-07 (still EST, UTC-5): 11:59 = 16:59Z, 12:00 = 17:00Z
  assert.equal(atOffice('2026-03-07T16:59:00Z'), 'Open now · until 12:00');
  assert.equal(atOffice('2026-03-07T17:00:00Z'), 'Closed · opens Monday at 08:30');
  // Monday 2026-03-09 (now EDT, UTC-4): 08:29 = 12:29Z, 08:30 = 12:30Z
  assert.equal(atOffice('2026-03-09T12:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(atOffice('2026-03-09T12:30:00Z'), 'Open now · until 17:30');

  // November 2026: DST falls back Sunday 2026-11-01 02:00 EDT -> 01:00 EST (UTC-5)
  // Saturday 2026-10-31 (still EDT, UTC-4): 11:59 = 15:59Z, 12:00 = 16:00Z
  assert.equal(atOffice('2026-10-31T15:59:00Z'), 'Open now · until 12:00');
  assert.equal(atOffice('2026-10-31T16:00:00Z'), 'Closed · opens Monday at 08:30');
  // Monday 2026-11-02 (now EST, UTC-5): 08:29 = 13:29Z, 08:30 = 13:30Z
  assert.equal(atOffice('2026-11-02T13:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(atOffice('2026-11-02T13:30:00Z'), 'Open now · until 17:30');
});

test('closed weekdays, week wrap and currentDayInTimeZone stay safe', () => {
  assert.equal(atSample('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(atSample('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');

  assert.equal(currentDayInTimeZone('America/New_York', new Date('2026-11-21T16:00:00Z')), 'Saturday');
  assert.equal(currentDayInTimeZone('', new Date('2026-11-21T16:00:00Z')), null);
  assert.equal(currentDayInTimeZone('Mars/Base', new Date('2026-11-21T16:00:00Z')), null);
});

test('missing/invalid zones stay neutral and DST boundaries preserve local times', () => {
  assert.equal(atSample('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(atSample('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(sampleHours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
