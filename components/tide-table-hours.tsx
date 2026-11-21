'use client';

import { useEffect, useState } from 'react';
import { currentDayInTimeZone, type Day, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';
import { OpenBadge } from './open-badge';
import { TimeZoneNote } from './time-zone-note';

/**
 * Tide-table framed weekly office hours.
 * Static/no-JS HTML shows the neutral full table with no highlighted row or live status;
 * in the browser, today's row in America/New_York is highlighted and refreshed every minute.
 */
export function TideTableHours({
  hours,
  heading = 'Office hours',
  className = '',
}: {
  hours: readonly OpeningHours[];
  heading?: string;
  className?: string;
}) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const update = () => setToday(currentDayInTimeZone(site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`chart-plate ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3.5">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            Tide &amp; watch table
          </p>
          <h3 className="mt-0.5 font-display text-xl text-ink">{heading}</h3>
        </div>
        <OpenBadge hours={hours} />
      </div>

      <div className="px-5 py-3">
        <table className="w-full border-collapse font-mono text-sm">
          <caption className="sr-only">{heading}</caption>
          <thead>
            <tr className="border-b border-rule/80 text-left text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              <th scope="col" className="py-2 font-medium">Day</th>
              <th scope="col" className="py-2 text-right font-medium">Watch</th>
            </tr>
          </thead>
          <tbody>
            {hours.map(entry => {
              const isToday = today === entry.day;
              const isOpenDay = Boolean(entry.opens && entry.closes);
              return (
                <tr
                  key={entry.day}
                  className={`border-b border-rule/50 last:border-b-0 ${
                    isToday ? 'bg-beam-tint font-medium text-ink' : ''
                  }`}
                >
                  <th
                    scope="row"
                    className={`py-2.5 text-left font-normal ${isToday ? 'pl-2 font-medium text-ink' : 'text-ink'}`}
                  >
                    <span>{entry.day}</span>
                    {isToday ? (
                      <span className="ml-2 text-[0.68rem] uppercase tracking-[0.1em] text-sea">
                        Today
                      </span>
                    ) : null}
                  </th>
                  <td
                    className={`py-2.5 text-right ${isToday ? 'pr-2' : ''} ${
                      isOpenDay ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    {isOpenDay ? `${entry.opens}–${entry.closes}` : 'Closed'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <TimeZoneNote className="font-mono text-xs text-muted" />
      </div>
    </div>
  );
}
