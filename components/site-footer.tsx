import { business } from '../content/business';
import { BeaconShield } from './artwork/beacon-shield';
import { CompassRose } from './artwork/nautical-motifs';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="deep-band border-t-2 border-ink text-deep-ink">
      <div className="daymark-hairline" aria-hidden="true" />
      <div className="wrap py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Crest, wordmark and Portland waterfront bearings */}
          <div className="md:col-span-5">
            <div className="flex items-start gap-3.5">
              <BeaconShield className="h-12 w-11 shrink-0" />
              <div>
                <p className="font-display text-xl text-deep-ink">{business.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-deep-muted">
                  {business.coordinates} · Portland, Maine
                </p>
              </div>
            </div>
            <address className="mt-5 not-italic text-sm leading-relaxed text-deep-muted">
              <p className="text-deep-ink">{business.address.formatted}</p>
              <p className="mt-1.5">
                <a href={telHref} className="font-mono text-deep-ink hover:text-beam">
                  {business.phone}
                </a>
                {' · '}
                <a href={`mailto:${business.email}`} className="text-deep-ink underline decoration-beam/60 hover:text-beam">
                  {business.email}
                </a>
              </p>
              <p className="mt-2 text-xs text-deep-muted">
                Serving {business.serviceArea.join(', ')}.
              </p>
            </address>
          </div>

          {/* Office hours summary */}
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-beam">Office hours</p>
            <dl className="mt-3 space-y-1.5 font-mono text-xs text-deep-muted">
              <div className="flex justify-between gap-4 border-b border-deep-rule/70 pb-1">
                <dt>Mon–Thu</dt>
                <dd className="text-deep-ink">08:30–17:30</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-deep-rule/70 pb-1">
                <dt>Friday</dt>
                <dd className="text-deep-ink">08:30–16:00</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-deep-rule/70 pb-1">
                <dt>Saturday</dt>
                <dd className="text-deep-ink">09:00–12:00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </div>

          {/* Navigation + compass rose */}
          <div className="flex items-start justify-between gap-6 md:col-span-4 md:justify-end">
            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <SiteLink href="/" className="text-deep-ink hover:text-beam">Home</SiteLink>
              <SiteLink href="/cover/" className="text-deep-ink hover:text-beam">Cover</SiteLink>
              <SiteLink href="/claims/" className="text-deep-ink hover:text-beam">Claims help</SiteLink>
              <SiteLink href="/why-a-broker/" className="text-deep-ink hover:text-beam">Why a broker</SiteLink>
              <SiteLink href="/contact/" className="text-deep-ink hover:text-beam">Contact</SiteLink>
            </nav>
            <CompassRose className="h-14 w-14 shrink-0 text-deep-muted opacity-80" />
          </div>
        </div>

        {/* Legal disclaimers and Jamstacks credit */}
        <div className="mt-10 border-t border-deep-rule pt-6 text-xs leading-relaxed text-deep-muted">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-3xl space-y-1.5">
              <p>{business.legal.sampleNotice}</p>
              <p>{business.legal.wordingNotice}</p>
            </div>
            <p className="shrink-0 text-deep-muted">
              <span title="Made with love by jamstacks.net">
                with <span role="img" aria-label="love">❤️</span>{' '}
                <a className="text-deep-ink no-underline hover:text-beam hover:underline" href="https://jamstacks.net">
                  jamstacks.net
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
