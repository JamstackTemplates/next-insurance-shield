'use client';

import { useEffect, useState } from 'react';
import {
  coverCharacteristic,
  coverTypes,
  type CoverAudience,
  type CoverType,
} from '../../content/cover';
import { insurerById } from '../../content/insurers';
import { CoverIcon } from '../artwork/cover-icon';
import { SignalFlag } from '../artwork/signal-flag';
import { SiteLink } from '../site-link';

type Filter = 'all' | CoverAudience;

function parseHashFilter(hash: string): { filter: Filter; entryId: string | null } {
  const clean = hash.replace(/^#/, '').trim().toLowerCase();
  if (clean === 'personal') return { filter: 'personal', entryId: null };
  if (clean === 'business') return { filter: 'business', entryId: null };
  if (clean && coverTypes.some(item => item.id === clean)) {
    return { filter: 'all', entryId: clean };
  }
  return { filter: 'all', entryId: null };
}

function LightListRow({
  item,
  defaultOpen,
}: {
  item: CoverType;
  defaultOpen: boolean;
}) {
  const panelInsurers = item.insurers
    .map(id => insurerById(id))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <details
      id={item.id}
      className="chart-details beam-row scroll-mt-24"
      open={defaultOpen || undefined}
    >
      <summary className="grid grid-cols-[auto_1fr_auto] items-start gap-x-3.5 gap-y-2 px-5 py-4 text-ink sm:px-7 sm:py-5 md:grid-cols-[5.25rem_2.25rem_12.5rem_1fr_auto_1.5rem] md:items-center md:gap-4">
        <span className="font-mono text-xs font-medium tracking-[0.08em] text-sea md:text-sm">
          {item.listNo}
        </span>

        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 md:contents">
          <span className="text-ink">
            <CoverIcon id={item.id} className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg text-ink md:text-[1.12rem]">
              {item.name}
            </span>
            {!item.available ? (
              <span className="inline-block border border-primary-ink bg-paper px-2 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-primary-ink">
                Not currently placing — ask us
              </span>
            ) : null}
          </span>
        </span>

        <span className="chart-details-chevron col-start-3 row-start-1 pt-0.5 md:col-start-6 md:pt-0" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5.5 3.5 L10.5 8 L5.5 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <span className="col-span-3 text-sm leading-relaxed text-muted md:col-span-1 md:col-start-4 md:row-start-1">
          {item.summary}
        </span>

        <span className="col-span-3 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted md:col-span-1 md:col-start-5 md:row-start-1 md:text-right">
          {coverCharacteristic(item)}
        </span>
      </summary>

      <div className="border-t border-rule/60 bg-paper/55 px-5 py-5 sm:px-7 sm:py-6">
        {!item.available ? (
          <p className="mb-4 border-l-2 border-primary bg-plate px-3.5 py-2.5 text-sm text-ink">
            <strong>Not currently placing — ask us.</strong> Market availability changes through the
            year; contact our Portland desk and we can let you know when we can place this line or
            point you in the right direction.
          </p>
        ) : null}

        {/* Three ruled publication columns */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-rule/75">
          <div className="md:pr-6">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-sea">
              Typically covers
            </p>
            <ul className="mt-2.5 space-y-1.5 text-sm text-ink">
              {item.covers.map(point => (
                <li key={point} className="flex gap-2">
                  <span aria-hidden="true" className="font-mono text-sea">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-rule/60 pt-4 md:border-t-0 md:px-6 md:pt-0">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-primary-ink">
              Watch for
            </p>
            <ul className="mt-2.5 space-y-1.5 text-sm text-ink">
              {item.watchFor.map(point => (
                <li key={point} className="flex gap-2">
                  <span aria-hidden="true" className="font-mono text-primary-ink">!</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-rule/60 pt-4 md:border-t-0 md:pl-6 md:pt-0">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
              Good for
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink">{item.goodFor}</p>
            <p className="mt-4">
              <SiteLink href="/contact/" className="text-link inline-flex items-center gap-1 text-sm">
                Ask about {item.name.toLowerCase()} <span aria-hidden="true">→</span>
              </SiteLink>
            </p>
          </div>
        </div>

        {/* Inline insurer signal flags or specialist placement note */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-rule/60 pt-4">
          {item.placement === 'panel' ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                Panel insurers
              </span>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {panelInsurers.map(insurer => (
                  <li key={insurer.id} className="inline-flex items-center gap-2 font-mono text-xs text-ink">
                    <SignalFlag flag={insurer.flag} className="h-5 w-7 shrink-0" />
                    <span>{insurer.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="font-mono text-xs text-muted">
              <span className="uppercase tracking-[0.1em] text-sea">Specialist placement · </span>
              {item.placementNote ?? 'Placed through a specialist or government programme.'}
            </p>
          )}
        </div>
      </div>
    </details>
  );
}

export function LightListExplorer() {
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [targetEntryId, setTargetEntryId] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
    const syncFromHash = () => {
      const parsed = parseHashFilter(window.location.hash);
      setFilter(parsed.filter);
      setTargetEntryId(parsed.entryId);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function selectFilter(next: Filter) {
    setFilter(next);
    setTargetEntryId(null);
    if (typeof window !== 'undefined') {
      const nextHash = next === 'all' ? '' : `#${next}`;
      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      window.history.replaceState(null, '', nextUrl);
    }
  }

  const personalItems = coverTypes.filter(item => item.audience === 'personal');
  const businessItems = coverTypes.filter(item => item.audience === 'business');
  const showPersonal = filter === 'all' || filter === 'personal';
  const showBusiness = filter === 'all' || filter === 'business';

  const options: { id: Filter; label: string; count: number; href: string }[] = [
    { id: 'all', label: 'All', count: coverTypes.length, href: '#light-list' },
    { id: 'personal', label: 'Personal', count: personalItems.length, href: '#personal' },
    { id: 'business', label: 'Business', count: businessItems.length, href: '#business' },
  ];

  return (
    <div id="light-list" className="wrap py-10 sm:py-12">
      {/* Segmented filter with golden beam highlight; renders as in-page anchor links without JS */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {hydrated ? (
          <div
            role="group"
            aria-label="Filter Light List by audience"
            className="inline-flex border border-rule bg-plate p-1"
          >
            {options.map(option => {
              const active = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectFilter(option.id)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap border px-3 py-2 font-mono text-xs uppercase tracking-[0.09em] transition-colors sm:gap-2 sm:px-4 sm:text-[0.78rem] ${
                    active
                      ? 'beam-filter-active font-medium'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-[0.68rem] opacity-75">({option.count})</span>
                </button>
              );
            })}
          </div>
        ) : (
          <nav
            aria-label="Jump to Light List section"
            className="inline-flex border border-rule bg-plate p-1"
          >
            {options.map(option => (
              <a
                key={option.id}
                href={option.href}
                className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2 font-mono text-xs uppercase tracking-[0.09em] text-ink no-underline hover:bg-beam-tint sm:gap-2 sm:px-4 sm:text-[0.78rem]"
              >
                <span>{option.label}</span>
                <span className="text-[0.68rem] text-muted">({option.count})</span>
              </a>
            ))}
          </nav>
        )}

        <p className="font-mono text-xs text-muted">
          Select any entry to inspect coverage, exclusions and panel insurers.
        </p>
      </div>

      {/* Grouped Light List plates */}
      <div className="mt-8 space-y-10">
        {showPersonal ? (
          <section id="personal" aria-labelledby="personal-heading" className="scroll-mt-24">
            <div className="chart-plate">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule bg-paper/70 px-5 py-4 sm:px-7">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea">
                    Section I · LL-101 to LL-106
                  </p>
                  <h2 id="personal-heading" className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                    Personal cover
                  </h2>
                </div>
                <span className="font-mono text-xs text-muted">
                  Households, vehicles, boats &amp; coastal homes
                </span>
              </div>

              <div className="hidden grid-cols-[5.25rem_2.25rem_12.5rem_1fr_auto_1.5rem] items-center gap-4 border-b border-rule bg-paper/45 px-7 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted md:grid">
                <span>No.</span>
                <span aria-hidden="true" />
                <span>Cover</span>
                <span>Summary</span>
                <span className="text-right">Characteristic</span>
                <span aria-hidden="true" />
              </div>

              <div>
                {personalItems.map(item => (
                  <LightListRow
                    key={item.id}
                    item={item}
                    defaultOpen={targetEntryId === item.id}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {showBusiness ? (
          <section id="business" aria-labelledby="business-heading" className="scroll-mt-24">
            <div className="chart-plate">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule bg-paper/70 px-5 py-4 sm:px-7">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea">
                    Section II · LL-201 to LL-204
                  </p>
                  <h2 id="business-heading" className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                    Business cover
                  </h2>
                </div>
                <span className="font-mono text-xs text-muted">
                  Owner-run firms, trades &amp; commercial vehicles
                </span>
              </div>

              <div className="hidden grid-cols-[5.25rem_2.25rem_12.5rem_1fr_auto_1.5rem] items-center gap-4 border-b border-rule bg-paper/45 px-7 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted md:grid">
                <span>No.</span>
                <span aria-hidden="true" />
                <span>Cover</span>
                <span>Summary</span>
                <span className="text-right">Characteristic</span>
                <span aria-hidden="true" />
              </div>

              <div>
                {businessItems.map(item => (
                  <LightListRow
                    key={item.id}
                    item={item}
                    defaultOpen={targetEntryId === item.id}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
