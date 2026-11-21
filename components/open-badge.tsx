'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Neutral static/no-JS output reads "Office hours".
 * In the browser, computes current status in the configured IANA time zone and refreshes every minute.
 */
export function OpenBadge({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [label, setLabel] = useState('Office hours');

  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const isOpen = label.startsWith('Open now');
  const isClosed = label.startsWith('Closed');

  return (
    <span
      className={`inline-flex items-center gap-2 border border-rule bg-paper px-2.5 py-1 font-mono text-xs font-medium tracking-wide text-ink ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          isOpen ? 'bg-sea' : isClosed ? 'bg-primary' : 'bg-muted'
        }`}
      />
      <span>{label}</span>
    </span>
  );
}
