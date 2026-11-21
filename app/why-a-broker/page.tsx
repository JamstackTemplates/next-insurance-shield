import type { Metadata } from 'next';
import {
  ComparisonLedger,
  DirectNote,
  KeepersLog,
  PaymentNotice,
} from '../../components/broker/broker-sections';
import { ClosingBand } from '../../components/closing-band';
import { InsurerHalyard } from '../../components/insurer-halyard';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Why a broker',
  description:
    'What an independent insurance broker is, how it compares with buying direct, how Lighthouse Cover Insurance is paid and who you will speak with in Portland.',
  alternates: { canonical: absoluteUrl('/why-a-broker/') },
};

export default function WhyABrokerPage() {
  return (
    <>
      <PageHead
        eyebrow="Why use a broker"
        coordinate="TWO COURSES"
        title="Going direct or using a broker?"
      >
        <p>
          An independent broker is not tied to one insurer. We compare policies across our panel,
          explain what is excluded before you sign, and stay on your file every year—and when you
          claim.
        </p>
      </PageHead>

      <ComparisonLedger>
        <ComparisonLedger.Eyebrow>Direct vs independent broker</ComparisonLedger.Eyebrow>
        <ComparisonLedger.Heading>Two ways to place the same risk</ComparisonLedger.Heading>
        <ComparisonLedger.Introduction>
          Buying direct gives you one insurer&apos;s form and phone queue. A broker compares six
          carriers first and gives you one named person to call afterwards.
        </ComparisonLedger.Introduction>
      </ComparisonLedger>

      <PaymentNotice>
        We are happy to tell you the commission rate on any policy we quote—just ask.
      </PaymentNotice>

      <KeepersLog>
        <KeepersLog.Eyebrow>Keepers&apos; log · Custom House Wharf</KeepersLog.Eyebrow>
        <KeepersLog.Heading>Who you&apos;ll talk to</KeepersLog.Heading>
        <KeepersLog.Introduction>
          No call-centre script or ticket queue. Three people run our Portland desk and answer the
          phone directly.
        </KeepersLog.Introduction>
      </KeepersLog>

      <InsurerHalyard>
        <InsurerHalyard.Eyebrow>Our insurer panel</InsurerHalyard.Eyebrow>
        <InsurerHalyard.Heading>Six carriers we compare side by side</InsurerHalyard.Heading>
        <InsurerHalyard.Introduction>
          We place personal and commercial lines across this panel and use specialist or government
          programmes where a coastal or unusual risk calls for one.
        </InsurerHalyard.Introduction>
      </InsurerHalyard>

      <DirectNote>
        <DirectNote.Eyebrow>Margin note · Straight talk</DirectNote.Eyebrow>
        <DirectNote.Heading>When going direct is fine</DirectNote.Heading>
        <DirectNote.Body>
          <p>
            If you have one older car on minimum liability, rent a furnished room with little to
            insure, and enjoy comparing forms yourself every six months, buying direct online can be
            quick and sensible.
          </p>
          <p>
            Where an independent broker earns their keep is when things connect—a coastal home near
            flood water, a boat on a Casco Bay mooring, teen drivers, an umbrella limit, or a small
            business with tools, vehicles and staff—where one overlooked exclusion costs far more
            than the difference between quotes.
          </p>
        </DirectNote.Body>
      </DirectNote>

      <ClosingBand>
        <ClosingBand.Eyebrow>No obligation</ClosingBand.Eyebrow>
        <ClosingBand.Heading>See how your current policies stack up</ClosingBand.Heading>
        <ClosingBand.Body>
          Ask for a cover review. We will read your current declarations, flag any gaps in plain
          English, and compare options across our panel.
        </ClosingBand.Body>
        <ClosingBand.Action href="/contact/">Ask for a cover review</ClosingBand.Action>
      </ClosingBand>
    </>
  );
}
