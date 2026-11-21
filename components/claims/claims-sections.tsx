import type { ReactNode } from 'react';
import { teamMemberById } from '../../content/broker';
import { claims } from '../../content/claims';
import { coverById } from '../../content/cover';
import { ClaimsBuoy } from '../artwork/claims-buoy';
import { CoverIcon } from '../artwork/cover-icon';
import { ChecklistTickBox } from '../artwork/nautical-motifs';
import { SiteLink } from '../site-link';

type ContentProps = { children: ReactNode };

/** Full-width urgent emergency strip immediately below the Claims page head. */
export function UrgentStrip({ children }: ContentProps) {
  return (
    <div role="note" className="border-b-2 border-ink bg-primary text-on-primary">
      <div className="wrap flex items-start gap-3 py-3.5 text-sm font-medium leading-relaxed sm:items-center sm:text-[0.95rem]">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-on-primary/70 font-mono text-xs font-bold sm:mt-0"
        >
          !
        </span>
        <p>{children}</p>
      </div>
    </div>
  );
}

/** Full six-step claims course as a vertical buoyed channel chart. */
function ClaimsCourseSection({ children }: ContentProps) {
  return (
    <section className="wrap py-12 sm:py-16" aria-labelledby="claims-course-heading">
      <div className="max-w-2xl">{children}</div>

      <div className="relative mt-10">
        {/* Continuous vertical dotted channel line behind the buoys */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 bottom-10 left-[27px] border-l-2 border-dashed border-sea/80 sm:left-[33px]"
        />

        <ol className="space-y-6">
          {claims.steps.map(step => (
            <li key={step.id} className="relative grid grid-cols-[3.5rem_1fr] items-start gap-4 sm:grid-cols-[4.5rem_1fr] sm:gap-7">
              <div className="relative z-10 flex justify-center pt-1">
                <ClaimsBuoy number={step.number} buoy={step.buoy} className="h-16 w-14 sm:h-[4.5rem] sm:w-16" />
              </div>

              <div className="chart-plate px-5 py-4 sm:px-7 sm:py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl text-ink sm:text-2xl">
                    {step.number}. {step.title}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-sea">
                    {step.when}
                  </span>
                </div>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export const ClaimsCourse = Object.assign(ClaimsCourseSection, {
  Eyebrow: ({ children }: ContentProps) => <p className="eyebrow">{children}</p>,
  Heading: ({ children }: ContentProps) => (
    <h2 id="claims-course-heading" className="mt-2 text-3xl text-ink sm:text-4xl">{children}</h2>
  ),
  Introduction: ({ children }: ContentProps) => <p className="mt-3 text-muted">{children}</p>,
});

/** "What to gather" keeper's checklist on a ruled lined plate with decorative SVG tick boxes. */
function GatherChecklistSection({ children }: ContentProps) {
  return (
    <section className="border-y border-rule bg-shoal/65 py-12 sm:py-16" aria-labelledby="gather-heading">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">{children}</div>
        <div className="chart-plate p-6 sm:p-8 lg:col-span-7">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea">
            Keeper&apos;s checklist · Keep to hand
          </p>
          <ul className="mt-4 divide-y divide-rule/75">
            {claims.checklist.map(item => (
              <li key={item} className="flex items-start gap-3.5 py-3.5 first:pt-1 last:pb-0">
                <ChecklistTickBox />
                <span className="text-sm leading-relaxed text-ink sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export const GatherChecklist = Object.assign(GatherChecklistSection, {
  Eyebrow: ({ children }: ContentProps) => <p className="eyebrow text-ink/80">{children}</p>,
  Heading: ({ children }: ContentProps) => (
    <h2 id="gather-heading" className="mt-2 text-3xl text-ink sm:text-4xl">{children}</h2>
  ),
  Introduction: ({ children }: ContentProps) => <p className="mt-3 text-ink/85">{children}</p>,
});

/** "What we do for you" split beside Priya Nadeau's keepers' log profile. */
function BrokerRoleSection({ children }: ContentProps) {
  const advocate = teamMemberById('priya-nadeau');

  return (
    <section className="wrap py-12 sm:py-16" aria-labelledby="broker-role-heading">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">{children}</div>

        {advocate ? (
          <aside className="caution-panel p-6 sm:p-7 lg:col-span-5" aria-label="Claims advocate profile">
            <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-3 font-mono text-[0.72rem] uppercase tracking-[0.12em]">
              <span className="text-sea">Keepers&apos; log · Claims desk</span>
              <span className="text-muted">Since {advocate.since}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-ink">{advocate.name}</h3>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-primary-ink">{advocate.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink">{advocate.note}</p>

            <div className="mt-5 border-t border-rule/75 pt-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                Primary lines
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {advocate.specialties.map(coverId => {
                  const cover = coverById(coverId);
                  if (!cover) return null;
                  return (
                    <li key={coverId}>
                      <SiteLink
                        href={`/cover/#${cover.id}`}
                        className="inline-flex items-center gap-1.5 border border-rule bg-paper px-2.5 py-1 font-mono text-xs text-ink no-underline hover:border-ink hover:bg-beam-tint"
                      >
                        <CoverIcon id={cover.id} className="h-4 w-4" />
                        <span>{cover.name}</span>
                      </SiteLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

export const BrokerRole = Object.assign(BrokerRoleSection, {
  Eyebrow: ({ children }: ContentProps) => <p className="eyebrow">{children}</p>,
  Heading: ({ children }: ContentProps) => (
    <h2 id="broker-role-heading" className="mt-2 text-3xl text-ink sm:text-4xl">{children}</h2>
  ),
  Body: ({ children }: ContentProps) => <div className="mt-4 space-y-4 text-muted">{children}</div>,
});

/** Claims FAQs rendered as native <details> chart notes (no headings inside <summary>). */
function ClaimsFaqsSection({ children }: ContentProps) {
  return (
    <section className="wrap pb-16" aria-labelledby="claims-faq-heading">
      <div className="max-w-2xl">{children}</div>

      <div className="chart-plate mt-7">
        {claims.faqs.map((faq, index) => (
          <details key={faq.id} id={faq.id} className="chart-details">
            <summary className="flex items-start gap-3.5 px-5 py-4 text-ink hover:bg-beam-tint/60 sm:px-7 sm:py-5">
              <span className="chart-details-chevron mt-1" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5.5 3.5 L10.5 8 L5.5 12.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex flex-1 flex-wrap items-baseline justify-between gap-2">
                <span className="font-display text-lg text-ink sm:text-xl">{faq.question}</span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  Note 0{index + 1}
                </span>
              </span>
            </summary>
            <div className="border-t border-rule/55 bg-paper/55 px-5 py-4 pl-12 text-sm leading-relaxed text-muted sm:px-7 sm:py-5 sm:pl-14 sm:text-base">
              <p className="max-w-3xl text-ink">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export const ClaimsFaqs = Object.assign(ClaimsFaqsSection, {
  Eyebrow: ({ children }: ContentProps) => <p className="eyebrow">{children}</p>,
  Heading: ({ children }: ContentProps) => (
    <h2 id="claims-faq-heading" className="mt-2 text-3xl text-ink sm:text-4xl">{children}</h2>
  ),
});
