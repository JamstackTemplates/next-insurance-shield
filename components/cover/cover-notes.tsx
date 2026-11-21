import type { ReactNode } from 'react';
import { CourseDivider } from '../artwork/nautical-motifs';
import { SiteLink } from '../site-link';

type ContentProps = { children: ReactNode };

function SpecialistNoteSection({ children }: ContentProps) {
  return (
    <section className="wrap pb-14">
      <CourseDivider bearing="210°M" label="Specialist markets" className="px-0" />
      <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="caution-panel p-6 sm:p-8 lg:col-span-8">
          {children}
        </div>
        <aside className="border-l-2 border-rule pl-5 lg:col-span-4 lg:pt-2">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
            Policy wording notice
          </p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
            Cover summaries on this Light List are general descriptions of what policies typically
            include and exclude. Exact limits, endorsements and waiting periods are set by the
            insurer&apos;s policy wording.
          </p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-muted">
            We do not publish premiums or &ldquo;from&rdquo; estimates because every home, vessel
            and business is underwritten on its own risk.
          </p>
        </aside>
      </div>
    </section>
  );
}

function Eyebrow({ children }: ContentProps) {
  return <p className="eyebrow text-sea">{children}</p>;
}

function Heading({ children }: ContentProps) {
  return <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{children}</h2>;
}

function Body({ children }: ContentProps) {
  return <p className="mt-3 text-muted">{children}</p>;
}

function Action({ href = '/contact/', children }: { href?: string; children: ReactNode }) {
  return (
    <p className="mt-5">
      <SiteLink href={href} className="button">
        {children}
      </SiteLink>
    </p>
  );
}

export const SpecialistNote = Object.assign(SpecialistNoteSection, {
  Eyebrow,
  Heading,
  Body,
  Action,
});
