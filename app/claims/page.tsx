import type { Metadata } from 'next';
import {
  BrokerRole,
  ClaimsCourse,
  ClaimsFaqs,
  GatherChecklist,
  UrgentStrip,
} from '../../components/claims/claims-sections';
import { ClosingBand } from '../../components/closing-band';
import { PageHead } from '../../components/page-head';
import { claims } from '../../content/claims';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Claims help',
  description:
    'Calm, practical guidance for making an insurance claim: six steps from making safe to settlement, what to gather and how your Portland broker helps.',
  alternates: { canonical: absoluteUrl('/claims/') },
};

export default function ClaimsPage() {
  return (
    <>
      <PageHead
        eyebrow="Claims help"
        coordinate="6-BUOY CHANNEL"
        title="Steady help when something goes wrong"
      >
        <p>
          A burst pipe, a fender bender or storm damage on the mooring is stressful enough without
          guessing what happens next. Follow these six steps and bring us in alongside your insurer.
        </p>
      </PageHead>

      <UrgentStrip>{claims.urgentNotice}</UrgentStrip>

      <ClaimsCourse>
        <ClaimsCourse.Eyebrow>The claims course</ClaimsCourse.Eyebrow>
        <ClaimsCourse.Heading>Six steps from first hour to settlement</ClaimsCourse.Heading>
        <ClaimsCourse.Introduction>
          Your insurer makes the coverage decision under your policy wording. Knowing the sequence
          keeps the paperwork clear from day one.
        </ClaimsCourse.Introduction>
      </ClaimsCourse>

      <GatherChecklist>
        <GatherChecklist.Eyebrow>Before you call</GatherChecklist.Eyebrow>
        <GatherChecklist.Heading>What to gather</GatherChecklist.Heading>
        <GatherChecklist.Introduction>
          You do not need every receipt before reporting a loss—start with what is safe to collect
          and add estimates as they arrive.
        </GatherChecklist.Introduction>
      </GatherChecklist>

      <BrokerRole>
        <BrokerRole.Eyebrow>Your broker&apos;s role at claim time</BrokerRole.Eyebrow>
        <BrokerRole.Heading>What we do for you</BrokerRole.Heading>
        <BrokerRole.Body>
          <p>
            An insurer&apos;s adjuster works for the insurer. As an independent broker, our job is to
            stay in your corner: translating policy wording into plain English, helping you organise
            estimates and photos before the adjuster visits, and joining calls when a technical
            point comes up.
          </p>
          <p>
            Your insurer makes every decision under the policy wording—no broker can promise a
            payout or set a turnaround clock—but if a letter is unclear or an exclusion looks
            misapplied, we question it with you and keep pushing until you have a clear answer.
          </p>
        </BrokerRole.Body>
      </BrokerRole>

      <ClaimsFaqs>
        <ClaimsFaqs.Eyebrow>Chart notes · Common questions</ClaimsFaqs.Eyebrow>
        <ClaimsFaqs.Heading>Claims questions we hear most</ClaimsFaqs.Heading>
      </ClaimsFaqs>

      <ClosingBand>
        <ClosingBand.Eyebrow>Already reported to your insurer?</ClosingBand.Eyebrow>
        <ClosingBand.Heading>Tell us about your claim</ClosingBand.Heading>
        <ClosingBand.Body>
          Report the loss to your insurer first, then let our Portland desk know so we can follow
          the file with you. Please do not include policy numbers in the web form.
        </ClosingBand.Body>
        <ClosingBand.Action href="/contact/">Tell us about your claim</ClosingBand.Action>
      </ClosingBand>
    </>
  );
}
