import type { Metadata } from 'next';
import { ClosingBand } from '../../components/closing-band';
import { SpecialistNote } from '../../components/cover/cover-notes';
import { LightListExplorer } from '../../components/cover/light-list-explorer';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Cover — The Light List',
  description:
    'Every personal and business insurance line Lighthouse Cover Insurance places in Portland and southern Maine, with typical coverage, exclusions to watch for and panel insurers.',
  alternates: { canonical: absoluteUrl('/cover/') },
};

export default function CoverPage() {
  return (
    <>
      <PageHead
        eyebrow="The Light List"
        coordinate="LL-101 · LL-204"
        title="The Light List — every cover we place"
        showBeam
      >
        <p>
          Personal and small-business policies catalogued in plain English: what each cover
          typically includes, what to watch for in the small print, and which carriers on our panel
          write it.
        </p>
      </PageHead>

      <LightListExplorer />

      <SpecialistNote>
        <SpecialistNote.Eyebrow>Margin note · Specialist markets</SpecialistNote.Eyebrow>
        <SpecialistNote.Heading>Not on the list?</SpecialistNote.Heading>
        <SpecialistNote.Body>
          Seasonal coastal cottages, classic wooden boats, vacant properties under renovation and
          specialist trades sometimes sit outside standard panel products. Tell us what you need to
          insure—if a specialist market or government programme fits better, we will say so plainly
          and talk through your options.
        </SpecialistNote.Body>
        <SpecialistNote.Action href="/contact/">Ask us about specialist cover</SpecialistNote.Action>
      </SpecialistNote>

      <ClosingBand>
        <ClosingBand.Eyebrow>Plain-English review</ClosingBand.Eyebrow>
        <ClosingBand.Heading>Want us to check your current policies?</ClosingBand.Heading>
        <ClosingBand.Body>
          Send a note with what you insure and when it renews. We compare options across our panel
          and walk through the differences before you decide.
        </ClosingBand.Body>
        <ClosingBand.Action href="/contact/">Ask for a cover review</ClosingBand.Action>
      </ClosingBand>
    </>
  );
}
