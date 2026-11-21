import type { ReactNode } from 'react';
import { LanternGlow } from './artwork/nautical-motifs';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

function ClosingBandSection({ children }: ContentProps) {
  return (
    <section className="deep-band relative overflow-hidden border-t-2 border-ink py-16 text-center sm:py-20">
      <LanternGlow />
      <div className="wrap relative z-10 flex flex-col items-center">
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children }: ContentProps) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.16em] text-beam">
      {children}
    </p>
  );
}

function Heading({ children }: ContentProps) {
  return (
    <h2 className="mt-3 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] text-deep-ink">
      {children}
    </h2>
  );
}

function Body({ children }: ContentProps) {
  return (
    <p className="mt-4 max-w-xl text-base leading-relaxed text-deep-muted sm:text-lg">
      {children}
    </p>
  );
}

function Action({ href = '/contact/', children }: { href?: string; children: ReactNode }) {
  return (
    <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
      <SiteLink href={href} className="button px-6 py-3 text-base">
        {children}
      </SiteLink>
    </div>
  );
}

export const ClosingBand = Object.assign(ClosingBandSection, {
  Eyebrow,
  Heading,
  Body,
  Action,
});
