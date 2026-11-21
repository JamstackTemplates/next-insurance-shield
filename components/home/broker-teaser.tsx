import type { ReactNode } from 'react';
import { broker } from '../../content/broker';
import { TwoRoutesChart } from '../artwork/two-routes-chart';
import { SiteLink } from '../site-link';

type ContentProps = { children: ReactNode };

function BrokerTeaserSection({ children }: ContentProps) {
  const previewRows = broker.comparison.slice(0, 3);

  return (
    <section className="wrap py-14 sm:py-18" aria-labelledby="home-broker-heading">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left: Two routes nautical chart */}
        <div className="lg:col-span-6">
          <TwoRoutesChart className="h-auto w-full" />
        </div>

        {/* Right: Heading + 3-row ruled comparison ledger */}
        <div className="lg:col-span-6">
          {children}

          <div className="chart-plate mt-6 overflow-hidden">
            <div className="grid grid-cols-2 border-b border-rule bg-paper/70 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              <div className="px-4 py-2.5">Going direct</div>
              <div className="border-l border-rule bg-beam-tint px-4 py-2.5 text-sea">
                With Lighthouse Cover
              </div>
            </div>
            <div className="divide-y divide-rule/80">
              {previewRows.map(row => (
                <div key={row.id} className="grid grid-cols-2 text-sm">
                  <div className="px-4 py-3.5 text-muted">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink/70">
                      {row.question}
                    </p>
                    <p className="mt-1">{row.direct}</p>
                  </div>
                  <div className="border-l border-rule bg-beam-tint px-4 py-3.5 text-ink">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-sea">
                      {row.question}
                    </p>
                    <p className="mt-1 font-medium">{row.broker}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5">
            <SiteLink href="/why-a-broker/" className="text-link inline-flex items-center gap-1.5 text-sm">
              Why use a broker — full comparison &amp; how we&apos;re paid <span aria-hidden="true">→</span>
            </SiteLink>
          </p>
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
    <h2 id="home-broker-heading" className="mt-2 text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function Introduction({ children }: ContentProps) {
  return <p className="mt-3 text-muted">{children}</p>;
}

export const BrokerTeaser = Object.assign(BrokerTeaserSection, {
  Eyebrow,
  Heading,
  Introduction,
});
