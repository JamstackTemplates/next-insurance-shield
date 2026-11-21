import type { Metadata } from 'next';
import { BeaconShield } from '../../components/artwork/beacon-shield';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { TideTableHours } from '../../components/tide-table-hours';
import { business } from '../../content/business';
import { mapDirectionsUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;
  const directions = mapDirectionsUrl(business.address.formatted);

  return (
    <>
      <PageHead
        eyebrow="Contact · Portland desk"
        coordinate={business.coordinates}
        title={business.enquiries.title}
        before={<BeaconShield className="h-14 w-12" />}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap grid gap-10 py-10 sm:py-14 lg:grid-cols-12">
        {/* Left column: guidance, required wording, sensitive-details caution and hosted form / fallback */}
        <section aria-label="Enquiry form" className="space-y-6 lg:col-span-7">
          {/* What to include + required non-binding & claims wording */}
          <div className="chart-plate p-6 sm:p-7">
            <h2 className="font-display text-2xl text-ink">What helps us reply faster</h2>
            <p className="mt-2 text-sm text-muted">
              A short note in your message is plenty—just let us know:
            </p>
            <ul className="mt-3.5 space-y-2 text-sm text-ink">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip} className="flex gap-2.5">
                  <span aria-hidden="true" className="font-mono text-sea">—</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-rule/75 pt-4 text-sm text-muted">
              <p className="font-medium text-ink">{business.enquiries.bindingNotice}</p>
              <p>{business.enquiries.claimsNotice}</p>
            </div>
          </div>

          {/* Sensitive-details caution panel */}
          <div role="note" className="caution-panel-red p-5 sm:p-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary-ink">
              Caution · Keep sensitive details out of this form
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              {business.enquiries.sensitiveCaution}
            </p>
          </div>

          {/* Hosted Jamstacks support form when configured, else visible email fallback */}
          {hosted ? (
            <div className="chart-plate p-6 sm:p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-sea">
                Send an enquiry
              </p>
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            </div>
          ) : (
            <div className="chart-plate p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-sea">
                Direct email enquiry
              </p>
              <h2 className="mt-1.5 font-display text-2xl text-ink">Write to our Portland desk</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                The online enquiry form is not connected on this preview. Email{' '}
                <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>{' '}
                or call{' '}
                <a className="text-link" href={telHref}>
                  {business.phone}
                </a>{' '}
                and one of our brokers will reply during office hours.
              </p>
            </div>
          )}
        </section>

        {/* Right column: email, phone, address, tide-table hours + open badge, and Custom House Wharf map */}
        <aside aria-label="Contact details and office location" className="space-y-6 lg:col-span-5">
          <div className="chart-plate p-6">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea">
              Direct desk details
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Email</h2>
                <p className="mt-1">
                  <a className="text-link wrap-anywhere text-base" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <CopyEmail email={business.email} />
                </div>
              </div>

              <div className="border-t border-rule/70 pt-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Phone</h2>
                <p className="mt-1">
                  <a className="font-mono text-lg font-medium text-ink hover:text-sea" href={telHref}>
                    {business.phone}
                  </a>
                </p>
              </div>

              <div className="border-t border-rule/70 pt-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Address</h2>
                <address className="mt-1 not-italic text-sm leading-relaxed text-ink">
                  <p className="font-medium">{business.address.landmark}</p>
                  <p className="text-muted">
                    {business.address.street}, {business.address.city}, {business.address.region}{' '}
                    {business.address.postalCode}
                  </p>
                </address>
                <p className="mt-2 text-xs text-muted">
                  Serving {business.serviceArea.join(', ')}.
                </p>
                <p className="mt-3">
                  <a
                    href={directions}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link inline-flex items-center gap-1 text-sm"
                  >
                    Get directions <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            </div>
          </div>

          <TideTableHours hours={business.hours} />

          <div className="chart-plate overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-rule px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              <span>Chart location</span>
              <span className="text-sea">Custom House Wharf</span>
            </div>
            <GoogleMap
              address={business.address.formatted}
              title={`Map showing ${business.name} at ${business.address.formatted}`}
            />
          </div>
        </aside>
      </div>
    </>
  );
}
