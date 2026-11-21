import type { ReactNode } from 'react';
import { coverLinesForInsurer } from '../content/cover';
import { insurers } from '../content/insurers';
import { SignalFlag } from './artwork/signal-flag';

type ContentProps = { children: ReactNode };

function InsurerHalyardSection({ children }: ContentProps) {
  return (
    <section className="wrap py-14 sm:py-16" aria-labelledby="insurer-panel-heading">
      <div className="max-w-2xl">{children}</div>

      {/* Stretched braided halyard with signal-flag pennants; 2 halyards of 3 on mobile, 1 full halyard of 6 on desktop */}
      <div className="relative mt-9">
        {/* Desktop full-width halyard line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[5px] right-0 left-0 hidden h-[3px] border-y border-ink/75 bg-paper lg:block"
        />

        <ul className="grid grid-cols-3 gap-x-4 gap-y-8 lg:grid-cols-6 lg:gap-x-5">
          {insurers.map((insurer, index) => {
            const lines = coverLinesForInsurer(insurer.id);
            return (
              <li key={insurer.id} className="relative flex flex-col items-start">
                {/* Mobile halyard segment spanning each row of 3 */}
                {index % 3 === 0 ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[5px] right-[-200%] left-0 h-[3px] border-y border-ink/65 bg-paper lg:hidden"
                  />
                ) : null}

                <div className="relative z-10 flex flex-col items-start pt-1.5">
                  {/* Small toggle clip hanging from the halyard line */}
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-2.5 w-[2px] bg-ink"
                  />
                  <SignalFlag flag={insurer.flag} className="h-11 w-16 sm:h-12 sm:w-[4.5rem]" />
                </div>

                <p className="mt-3 font-mono text-xs font-medium leading-snug text-ink sm:text-[0.8rem]">
                  {insurer.name}
                </p>
                <p className="mt-1 font-mono text-[0.7rem] text-muted">
                  {lines.length} {lines.length === 1 ? 'cover line' : 'cover lines'}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Eyebrow({ children }: ContentProps) {
  return <p className="eyebrow">{children}</p>;
}

function Heading({ children }: ContentProps) {
  return (
    <h2 id="insurer-panel-heading" className="mt-2 text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function Introduction({ children }: ContentProps) {
  return <p className="mt-3 text-muted">{children}</p>;
}

export const InsurerHalyard = Object.assign(InsurerHalyardSection, {
  Eyebrow,
  Heading,
  Introduction,
});
