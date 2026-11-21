import type { Metadata } from 'next';
import { CourseDivider } from '../components/artwork/nautical-motifs';
import { ClosingBand } from '../components/closing-band';
import { BrokerTeaser } from '../components/home/broker-teaser';
import { ClaimsTeaser } from '../components/home/claims-teaser';
import { Hero } from '../components/home/hero';
import { LightListPreview } from '../components/home/light-list-preview';
import { NumeralsBand } from '../components/home/numerals-band';
import { OfficeFinder } from '../components/home/office-finder';
import { InsurerHalyard } from '../components/insurer-halyard';
import { business } from '../content/business';
import { insurers } from '../content/insurers';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: Portland Head at dusk with sweeping lantern beam */}
      <Hero>
        <Hero.Coordinate>{business.coordinates} · Portland, ME</Hero.Coordinate>
        <Hero.Heading>
          Cover that fits. A broker who picks up when it doesn&apos;t go to plan.
        </Hero.Heading>
        <Hero.Introduction>
          We compare a panel of insurers for your home, car, boat or business, explain the small
          print in plain English, and stay on your side of the table when you claim.
        </Hero.Introduction>
        <Hero.Actions>
          <Hero.PrimaryAction href="/contact/">Ask for a cover review</Hero.PrimaryAction>
          <Hero.SecondaryAction href="/claims/">
            I need to make a claim <span aria-hidden="true">→</span>
          </Hero.SecondaryAction>
        </Hero.Actions>
      </Hero>

      {/* 2. What a broker changes — oversized numerals laid diagonally across daymark stripes */}
      <NumeralsBand>
        <NumeralsBand.Eyebrow>What a broker changes</NumeralsBand.Eyebrow>
        <NumeralsBand.Row>
          <NumeralsBand.Stat
            figure={insurers.length}
            label="insurers on our panel"
            detail="Side-by-side policy wording and quotes compared across six carriers, not one."
          />
          <NumeralsBand.Divider />
          <NumeralsBand.Stat
            figure="1"
            label="named broker for every client"
            detail="The same Portland desk handles your questions, endorsements and renewals."
          />
          <NumeralsBand.Divider />
          <NumeralsBand.Stat
            figure="Every year"
            label="we review your cover before renewal"
            detail="We check limits, exclusions and alternatives before your policy rolls over."
          />
        </NumeralsBand.Row>
      </NumeralsBand>

      {/* 3. Light List preview — five featured cover types on a printed nautical plate */}
      <LightListPreview>
        <LightListPreview.Eyebrow>The Light List · Selected entries</LightListPreview.Eyebrow>
        <LightListPreview.Heading>Cover we place for households &amp; businesses</LightListPreview.Heading>
        <LightListPreview.Introduction>
          Every line we arrange is catalogued with what it typically covers, what to watch for in
          the small print, and which panel insurers write it.
        </LightListPreview.Introduction>
      </LightListPreview>

      <CourseDivider bearing="045°M" label="Next: Claims help" />

      {/* 4. Claims course teaser — six numbered channel buoys on a shoal-tinted band */}
      <ClaimsTeaser>
        <ClaimsTeaser.Eyebrow>Charted claims course</ClaimsTeaser.Eyebrow>
        <ClaimsTeaser.Heading>Six steady steps when something goes wrong</ClaimsTeaser.Heading>
        <ClaimsTeaser.Introduction>
          Your insurer decides the claim; we help you prepare the record, meet the adjuster and
          check the settlement against your policy.
        </ClaimsTeaser.Introduction>
      </ClaimsTeaser>

      {/* 5. Why a broker teaser — two routes chart beside a ruled comparison ledger */}
      <BrokerTeaser>
        <BrokerTeaser.Eyebrow>Going direct or using a broker</BrokerTeaser.Eyebrow>
        <BrokerTeaser.Heading>Six harbours checked instead of one</BrokerTeaser.Heading>
        <BrokerTeaser.Introduction>
          Buying direct gives you one insurer&apos;s wording and a call queue. An independent broker
          compares the panel first and stays on your file after the policy starts.
        </BrokerTeaser.Introduction>
      </BrokerTeaser>

      <CourseDivider bearing="112°M" label="Next: Insurer panel" />

      {/* 6. Insurer panel — maritime signal flags on a stretched halyard */}
      <InsurerHalyard>
        <InsurerHalyard.Eyebrow>Signal halyard · Our insurer panel</InsurerHalyard.Eyebrow>
        <InsurerHalyard.Heading>Six insurers compared under one roof</InsurerHalyard.Heading>
        <InsurerHalyard.Introduction>
          Each flag represents a carrier on our panel. Where a risk needs a specialist or government
          programme—such as coastal flood cover—we tell you plainly.
        </InsurerHalyard.Introduction>
      </InsurerHalyard>

      {/* 7. Find the office — tide-table hours and Custom House Wharf chart plate */}
      <OfficeFinder>
        <OfficeFinder.Eyebrow>Portland waterfront office</OfficeFinder.Eyebrow>
        <OfficeFinder.Heading>Drop by Custom House Wharf or call the desk</OfficeFinder.Heading>
        <OfficeFinder.Introduction>
          Bring your renewal paperwork or give us a ring. We work with households, boat owners and
          small businesses across Greater Portland and southern Maine.
        </OfficeFinder.Introduction>
      </OfficeFinder>

      {/* 8. Closing band — deep ink with Fresnel lantern glow */}
      <ClosingBand>
        <ClosingBand.Eyebrow>No fee for a cover review</ClosingBand.Eyebrow>
        <ClosingBand.Heading>Not sure you&apos;re covered?</ClosingBand.Heading>
        <ClosingBand.Body>
          Ask for a cover review. We will read through your current policies, point out any gaps
          worth fixing, and compare options across our panel.
        </ClosingBand.Body>
        <ClosingBand.Action href="/contact/">Ask for a cover review</ClosingBand.Action>
      </ClosingBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
