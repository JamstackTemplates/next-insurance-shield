import type { ReactNode } from 'react';
import { broker } from '../../content/broker';
import { coverById } from '../../content/cover';
import { CoverIcon } from '../artwork/cover-icon';
import { TwoRoutesChart } from '../artwork/two-routes-chart';
import { SiteLink } from '../site-link';

type ContentProps = { children: ReactNode };

/** Full-width Two Routes chart + responsive semantic comparison ledger table. */
function ComparisonLedgerSection({ children }: ContentProps) {
  return (
    <section className="wrap py-12 sm:py-16" aria-labelledby="comparison-ledger-heading">
      <div className="max-w-2xl">{children}</div>

      <div className="mt-8">
        <TwoRoutesChart className="h-auto w-full" />
      </div>

      <div
        tabIndex={0}
        role="region"
        aria-labelledby="comparison-table-caption"
        className="chart-plate ledger-wrapper mt-8"
      >
        <table className="ledger-table text-left text-sm sm:text-[0.95rem]">
          <caption id="comparison-table-caption" className="sr-only">
            Comparison between buying insurance direct and using Lighthouse Cover Insurance
          </caption>
          <thead>
            <tr className="border-b border-rule bg-paper/75 font-mono text-xs uppercase tracking-[0.11em]">
              <th scope="col" className="w-[24%] px-5 py-3.5 font-medium text-muted">
                Point of difference
              </th>
              <th scope="col" className="w-[36%] border-l border-rule px-5 py-3.5 font-medium text-muted">
                Going direct
              </th>
              <th scope="col" className="w-[40%] border-l border-rule bg-beam-tint px-5 py-3.5 font-medium text-sea">
                With Lighthouse Cover
              </th>
            </tr>
          </thead>
          <tbody>
            {broker.comparison.map(row => (
              <tr key={row.id} className="border-b border-rule/80 last:border-b-0">
                <th
                  scope="row"
                  className="border-b border-rule/80 px-5 py-4 align-top font-display text-base font-normal text-ink sm:text-lg"
                >
                  {row.question}
                </th>
                <td
                  data-col="direct"
                  className="border-b border-l border-rule/80 px-5 py-4 align-top text-muted"
                >
                  {row.direct}
                </td>
                <td
                  data-col="broker"
                  className="border-b border-l border-rule/80 bg-beam-tint px-5 py-4 align-top font-medium text-ink"
                >
                  {row.broker}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export const ComparisonLedger = Object.assign(ComparisonLedgerSection, {
  Eyebrow: ({ children }: ContentProps) => <p className="eyebrow">{children}</p>,
  Heading: ({ children }: ContentProps) => (
    <h2 id="comparison-ledger-heading" className="mt-2 text-3xl text-ink sm:text-4xl">{children}</h2>
  ),
  Introduction: ({ children }: ContentProps) => <p className="mt-3 text-muted">{children}</p>,
});

/** "How we're paid" boxed chart caution panel. */
function PaymentNoticeSection({ children }: ContentProps) {
  return (
    <section className="wrap pb-14" aria-labelledby="payment-heading">
      <div className="caution-panel p-6 sm:p-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary-ink">
              Chart notice · Compensation transparency
            </p>
            <h2 id="payment-heading" className="mt-1 font-display text-2xl text-ink sm:text-3xl">
              How we&apos;re paid
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            No fee for a cover review
          </span>
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-3 md:gap-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.11em] text-sea">01 · Commission</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{broker.payment.commission}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.11em] text-sea">02 · Any broker fee</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{broker.payment.fee}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.11em] text-sea">03 · Cover reviews</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{broker.payment.review}</p>
          </div>
        </div>

        {children ? <div className="mt-5 border-t border-rule/75 pt-4 text-sm text-muted">{children}</div> : null}
      </div>
    </section>
  );
}

export const PaymentNotice = Object.assign(PaymentNoticeSection, {});

/** "Who you'll talk to" keepers' log — dated nautical log entries, not portrait cards. */
function KeepersLogSection({ children }: ContentProps) {
  return (
    <section className="border-y border-rule bg-shoal/55 py-14 sm:py-16" aria-labelledby="keepers-log-heading">
      <div className="wrap">
        <div className="max-w-2xl">{children}</div>

        <ol className="chart-plate mt-8 divide-y divide-rule">
          {broker.team.map((member, index) => (
            <li
              key={member.id}
              className="grid gap-4 px-5 py-6 sm:px-8 md:grid-cols-12 md:items-start md:gap-6"
            >
              <div className="md:col-span-3">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-sea">
                  Log 0{index + 1} · Since {member.since}
                </p>
                <h3 className="mt-1.5 font-display text-2xl text-ink">{member.name}</h3>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.1em] text-primary-ink">
                  {member.role}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-base leading-relaxed text-ink">&ldquo;{member.note}&rdquo;</p>
              </div>

              <div className="md:col-span-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                  Lines handled
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {member.specialties.map(coverId => {
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export const KeepersLog = Object.assign(KeepersLogSection, {
  Eyebrow: ({ children }: ContentProps) => <p className="eyebrow text-ink/80">{children}</p>,
  Heading: ({ children }: ContentProps) => (
    <h2 id="keepers-log-heading" className="mt-2 text-3xl text-ink sm:text-4xl">{children}</h2>
  ),
  Introduction: ({ children }: ContentProps) => <p className="mt-3 text-ink/85">{children}</p>,
});

/** "When going direct is fine" honest margin note. */
function DirectNoteSection({ children }: ContentProps) {
  return (
    <section className="wrap pb-16" aria-labelledby="direct-fine-heading">
      <aside className="mx-auto max-w-3xl border-l-4 border-sea bg-plate px-6 py-6 sm:px-8">
        {children}
      </aside>
    </section>
  );
}

export const DirectNote = Object.assign(DirectNoteSection, {
  Eyebrow: ({ children }: ContentProps) => <p className="eyebrow text-sea">{children}</p>,
  Heading: ({ children }: ContentProps) => (
    <h2 id="direct-fine-heading" className="mt-2 font-display text-2xl text-ink sm:text-3xl">{children}</h2>
  ),
  Body: ({ children }: ContentProps) => <div className="mt-3 space-y-3 text-muted">{children}</div>,
});
