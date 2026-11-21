import type { ReactNode } from 'react';
import { RopeEdge, RopeKnot } from '../artwork/nautical-motifs';

type ContentProps = { children: ReactNode };

function NumeralsBandSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="broker-changes-heading" className="daymark-band-bg relative overflow-x-clip">
      <RopeEdge />
      <div className="wrap py-10 sm:py-14">
        <div className="chart-plate mx-auto bg-plate px-6 py-8 sm:-rotate-[0.65deg] sm:px-10 sm:py-10">
          <div className="sm:rotate-[0.65deg]">
            {children}
          </div>
        </div>
      </div>
      <RopeEdge />
    </section>
  );
}

function Eyebrow({ children }: ContentProps) {
  return (
    <p id="broker-changes-heading" className="eyebrow text-center text-ink">
      {children}
    </p>
  );
}

function Row({ children }: ContentProps) {
  return (
    <div className="mt-6 flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-center md:gap-4">
      {children}
    </div>
  );
}

function Stat({ figure, label, detail }: { figure: ReactNode; label: ReactNode; detail: ReactNode }) {
  return (
    <div className="flex-1 text-center md:px-3">
      <p className="font-display text-[clamp(2.5rem,4.6vw,3.9rem)] leading-none text-primary-ink">
        {figure}
      </p>
      <p className="mt-2.5 font-display text-lg text-ink sm:text-xl">
        {label}
      </p>
      <p className="mt-1 text-sm text-muted">
        {detail}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center md:shrink-0" aria-hidden="true">
      <RopeKnot className="h-9 w-9 rotate-90 md:h-10 md:w-10 md:rotate-0" />
    </div>
  );
}

export const NumeralsBand = Object.assign(NumeralsBandSection, {
  Eyebrow,
  Row,
  Stat,
  Divider,
});
