import { OffChartScene } from '../components/artwork/off-chart-scene';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="wrap py-12 sm:py-16">
      <div className="chart-plate mx-auto max-w-3xl overflow-hidden">
        <div className="border-b border-rule bg-paper/70 px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-sea">
          404 · Position uncharted
        </div>

        <div className="p-6 sm:p-10">
          <OffChartScene className="h-auto w-full" />

          <h1 className="mt-8 font-display text-4xl text-ink sm:text-5xl">Off the chart</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            There is no buoy or page at this bearing. Head back to the Portland harbour front, check
            the Light List of covers we place, or contact our desk directly.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <SiteLink href="/" className="button">
              Back to Home
            </SiteLink>
            <SiteLink href="/cover/" className="button button-quiet">
              Browse Cover
            </SiteLink>
            <SiteLink href="/contact/" className="text-link px-1 text-sm">
              Contact our desk →
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
