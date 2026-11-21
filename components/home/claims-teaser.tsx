import type { ReactNode } from 'react';
import { claims } from '../../content/claims';
import { ClaimsBuoy } from '../artwork/claims-buoy';
import { SiteLink } from '../site-link';

type ContentProps = { children: ReactNode };

function ClaimsTeaserSection({ children }: ContentProps) {
  return (
    <section
      aria-labelledby="home-claims-heading"
      className="border-y border-rule bg-shoal py-14 sm:py-18"
    >
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">{children}</div>
          <SiteLink href="/claims/" className="button button-quiet">
            Claims help <span aria-hidden="true">→</span>
          </SiteLink>
        </div>

        {/* Charted dotted channel across 6 buoys (horizontal on desktop, vertical on mobile) */}
        <div className="relative mt-10">
          {/* Desktop horizontal dotted course line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[34px] right-6 left-6 hidden border-t-2 border-dashed border-sea/80 lg:block"
          />
          {/* Mobile vertical dotted course line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-8 bottom-8 left-[26px] border-l-2 border-dashed border-sea/80 lg:hidden"
          />

          <ol className="grid gap-6 lg:grid-cols-6 lg:gap-4">
            {claims.steps.map(step => (
              <li
                key={step.id}
                className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
              >
                <div className="relative z-10 shrink-0">
                  <ClaimsBuoy number={step.number} buoy={step.buoy} className="h-16 w-14" />
                </div>
                <div className="pt-1 lg:pt-0">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.11em] text-sea">
                    {step.when}
                  </p>
                  <h3 className="mt-1 font-display text-lg leading-snug text-ink">
                    {step.title}
                  </h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: ContentProps) {
  return <p className="eyebrow text-ink/80">{children}</p>;
}

function Heading({ children }: ContentProps) {
  return (
    <h2 id="home-claims-heading" className="mt-2 text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function Introduction({ children }: ContentProps) {
  return <p className="mt-2.5 text-ink/85">{children}</p>;
}

export const ClaimsTeaser = Object.assign(ClaimsTeaserSection, {
  Eyebrow,
  Heading,
  Introduction,
});
