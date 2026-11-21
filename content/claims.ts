export interface ClaimStep {
  /** URL-safe unique step identifier. */
  id: string;
  /** Sequential channel-buoy number (1–6). */
  number: number;
  /** Alternating maritime buoy shape: red conical 'nun' or green flat-top 'can'. */
  buoy: 'nun' | 'can';
  /** Short imperative heading. */
  title: string;
  /** Practical guidance without promising payout or turnaround time. */
  body: string;
  /** Relative timing label displayed in mono type. */
  when: string;
}

export interface ClaimFaq {
  /** Unique identifier for the FAQ entry. */
  id: string;
  question: string;
  answer: string;
}

export const claims = {
  urgentNotice:
    'In an emergency call 911. For urgent repairs out of hours, call the 24-hour claims line printed on your policy documents, then let us know.',
  steps: [
    {
      id: 'make-safe',
      number: 1,
      buoy: 'nun',
      title: 'Make it safe',
      body: "Stop the damage getting worse if it's safe to do so: turn off water, board a window, move belongings.",
      when: 'Straight away',
    },
    {
      id: 'record',
      number: 2,
      buoy: 'can',
      title: 'Record what happened',
      body: 'Photos and video before anything is cleared, plus the date, time and anyone involved.',
      when: 'The same day',
    },
    {
      id: 'notify',
      number: 3,
      buoy: 'nun',
      title: 'Tell your insurer, then tell us',
      body: 'Use the claims line on your policy documents, then email or call us so we can follow it.',
      when: 'As soon as you can',
    },
    {
      id: 'estimates',
      number: 4,
      buoy: 'can',
      title: 'Gather estimates',
      body: 'Keep receipts for emergency repairs and get repair estimates if your insurer asks.',
      when: 'First week',
    },
    {
      id: 'adjuster',
      number: 5,
      buoy: 'nun',
      title: 'Meet the adjuster',
      body: "The insurer's adjuster inspects the loss. We can help you prepare and join the call.",
      when: 'As arranged by the insurer',
    },
    {
      id: 'settle',
      number: 6,
      buoy: 'can',
      title: 'Settle and review',
      body: 'Check the settlement against your policy, then we review whether your cover still fits.',
      when: 'After the decision',
    },
  ] as readonly ClaimStep[],
  checklist: [
    "Your policy number (have it to hand when you call — don't send it through the web form)",
    'Photos and videos of the damage before anything is moved or cleared',
    'Receipts and invoices for any emergency make-safe work',
    'Police, Coast Guard or fire report number if one was made',
    'Names and contact details of anyone else involved or who saw what happened',
  ] as readonly string[],
  faqs: [
    {
      id: 'who-decides',
      question: 'Who decides whether a claim is covered?',
      answer:
        'Your insurer decides every claim under the wording of your policy. As your broker, we help you prepare what they ask for, explain their correspondence in plain English, and challenge anything that does not square with your policy.',
    },
    {
      id: 'will-premium-rise',
      question: 'Will making a claim raise my renewal premium?',
      answer:
        'It may affect your price at renewal depending on the insurer, the type of loss and your claim history. Before your policy renews, we compare options across our panel so you can see where you stand.',
    },
    {
      id: 'small-claims',
      question: 'Should I claim for a smaller loss or pay out of pocket?',
      answer:
        'Call us before you decide. We can walk through your deductible, how your insurer treats minor claims and whether lodging a claim makes sense for your situation.',
    },
    {
      id: 'out-of-hours',
      question: 'What if something happens at night or on a Sunday?',
      answer:
        'Use the 24-hour claims number printed on your policy documents to log the loss and arrange urgent protection. Then call or email us on the next working day and we will pick up the thread alongside you.',
    },
  ] as readonly ClaimFaq[],
};

const EXPECTED_STEP_ORDER = ['make-safe', 'record', 'notify', 'estimates', 'adjuster', 'settle'] as const;

export function validateClaimsData(data = claims): void {
  if (!data.urgentNotice.trim()) throw new Error('claims.urgentNotice: required');
  if (data.steps.length !== EXPECTED_STEP_ORDER.length) {
    throw new Error(`claims.steps: expected ${EXPECTED_STEP_ORDER.length} ordered steps`);
  }
  const seenStepIds = new Set<string>();
  data.steps.forEach((step, index) => {
    const label = `claims.steps[${index}] (${step.id || 'empty'})`;
    if (seenStepIds.has(step.id)) throw new Error(`${label}: duplicate step id`);
    seenStepIds.add(step.id);
    if (step.id !== EXPECTED_STEP_ORDER[index]) {
      throw new Error(`${label}: expected step "${EXPECTED_STEP_ORDER[index]}" at position ${index + 1}`);
    }
    if (step.number !== index + 1) {
      throw new Error(`${label}: number must be ${index + 1}`);
    }
    if (!step.title.trim()) throw new Error(`${label}: title is required`);
    if (!step.body.trim()) throw new Error(`${label}: body is required`);
    if (!step.when.trim()) throw new Error(`${label}: when timing label is required`);
  });

  if (data.checklist.length === 0) throw new Error('claims.checklist: at least one item required');
  for (const item of data.checklist) {
    if (!item.trim()) throw new Error('claims.checklist: empty item');
  }

  const seenFaqIds = new Set<string>();
  if (data.faqs.length === 0) throw new Error('claims.faqs: at least one FAQ required');
  for (const faq of data.faqs) {
    const label = `claims.faqs.${faq.id || '(empty)'}`;
    if (!faq.id.trim()) throw new Error(`${label}: id is required`);
    if (seenFaqIds.has(faq.id)) throw new Error(`${label}: duplicate FAQ id`);
    seenFaqIds.add(faq.id);
    if (!faq.question.trim()) throw new Error(`${label}: question is required`);
    if (!faq.answer.trim()) throw new Error(`${label}: answer is required`);
  }
}
