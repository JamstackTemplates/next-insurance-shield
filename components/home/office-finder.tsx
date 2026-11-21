import type { ReactNode } from 'react';
import { business } from '../../content/business';
import { mapDirectionsUrl } from '../../lib/maps';
import { HarbourInset } from '../artwork/nautical-motifs';
import { SiteLink } from '../site-link';
import { TideTableHours } from '../tide-table-hours';

type ContentProps = { children: ReactNode };

function OfficeFinderSection({ children }: ContentProps) {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;
  const directions = mapDirectionsUrl(business.address.formatted);

  return (
    <section
      className="border-t border-rule bg-paper/70 py-14 sm:py-18"
      aria-labelledby="home-office-heading"
    >
      <div className="wrap">
        <div className="max-w-2xl">{children}</div>

        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Left: Tide-table hours frame */}
          <div className="lg:col-span-6">
            <TideTableHours hours={business.hours} className="h-full" />
          </div>

          {/* Right: Charted Portland office plate with harbour inset */}
          <div className="chart-plate flex flex-col justify-between p-5 sm:p-7 lg:col-span-6">
            <div>
              <div className="flex items-center justify-between gap-3 border-b border-rule/70 pb-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
                <span>Waterfront desk</span>
                <span className="text-sea">{business.coordinates}</span>
              </div>

              <div className="mt-4">
                <HarbourInset className="h-auto w-full" />
              </div>

              <address className="mt-5 not-italic">
                <p className="font-display text-xl text-ink">{business.address.landmark}</p>
                <p className="mt-1 text-muted">
                  {business.address.street}, {business.address.city}, {business.address.region}{' '}
                  {business.address.postalCode}
                </p>
                <p className="mt-2.5 text-sm text-muted">
                  Serving {business.serviceArea.join(', ')}.
                </p>
              </address>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule/70 pt-5">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  Direct desk line
                </p>
                <a href={telHref} className="font-mono text-base font-medium text-ink hover:text-sea">
                  {business.phone}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={directions}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-quiet text-sm"
                >
                  Get directions <span aria-hidden="true">↗</span>
                </a>
                <SiteLink href="/contact/" className="text-link text-sm">
                  Map &amp; enquiry form
                </SiteLink>
              </div>
            </div>
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
    <h2 id="home-office-heading" className="mt-2 text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function Introduction({ children }: ContentProps) {
  return <p className="mt-2.5 text-muted">{children}</p>;
}

export const OfficeFinder = Object.assign(OfficeFinderSection, {
  Eyebrow,
  Heading,
  Introduction,
});
