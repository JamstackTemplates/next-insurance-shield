import type { ReactNode } from 'react';
import { coverCharacteristic, featuredCoverTypes } from '../../content/cover';
import { CoverIcon } from '../artwork/cover-icon';
import { CompassRose, SoundingsMargin } from '../artwork/nautical-motifs';
import { SiteLink } from '../site-link';

type ContentProps = { children: ReactNode };

function LightListPreviewSection({ children }: ContentProps) {
  return (
    <section className="wrap py-14 sm:py-18" aria-labelledby="home-light-list-heading">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Narrow vertical soundings margin on desktop */}
        <aside className="hidden lg:col-span-2 lg:block" aria-hidden="true">
          <SoundingsMargin className="h-full max-h-[540px] w-full" />
        </aside>

        {/* Printed Light List publication plate */}
        <div className="chart-plate lg:col-span-10">
          <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-6 sm:px-8">
            <div className="max-w-2xl">{children}</div>
            <CompassRose className="hidden h-16 w-16 shrink-0 text-ink/75 sm:block" />
          </div>

          {/* Publication column header (desktop) */}
          <div className="hidden grid-cols-[5.5rem_2.5rem_12rem_1fr_13rem] items-center gap-4 border-b border-rule bg-paper/65 px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted sm:px-8 md:grid">
            <span>No.</span>
            <span aria-hidden="true" />
            <span>Cover</span>
            <span>Description</span>
            <span className="text-right">Characteristic</span>
          </div>

          <ol className="divide-y divide-rule/75">
            {featuredCoverTypes.map(item => (
              <li key={item.id} className="beam-row">
                <SiteLink
                  href={`/cover/#${item.id}`}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-3.5 gap-y-1.5 px-5 py-4 text-ink no-underline hover:no-underline sm:px-8 sm:py-5 md:grid-cols-[5.5rem_2.5rem_12rem_1fr_13rem] md:items-center md:gap-4"
                >
                  <span className="font-mono text-xs font-medium tracking-[0.08em] text-sea md:text-sm">
                    {item.listNo}
                  </span>

                  <span className="col-start-2 flex items-center gap-2.5 md:col-start-2 md:contents">
                    <span className="text-ink">
                      <CoverIcon id={item.id} className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                    <span className="font-display text-lg text-ink md:text-[1.12rem]">
                      {item.name}
                    </span>
                  </span>

                  <span className="col-span-2 text-sm leading-relaxed text-muted md:col-span-1">
                    {item.summary}
                  </span>

                  <span className="col-span-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted md:col-span-1 md:text-right">
                    {coverCharacteristic(item)}
                  </span>
                </SiteLink>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule bg-paper/55 px-5 py-4 sm:px-8">
            <p className="font-mono text-xs text-muted">
              Showing 5 featured entries · 10 cover types in the full Light List
            </p>
            <SiteLink href="/cover/" className="text-link inline-flex items-center gap-1.5 text-sm">
              See the full Light List <span aria-hidden="true">→</span>
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: ContentProps) {
  return <p className="eyebrow">{children}</p>;
}

function Heading({ children }: ContentProps) {
  return (
    <h2 id="home-light-list-heading" className="mt-2 text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function Introduction({ children }: ContentProps) {
  return <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">{children}</p>;
}

export const LightListPreview = Object.assign(LightListPreviewSection, {
  Eyebrow,
  Heading,
  Introduction,
});
