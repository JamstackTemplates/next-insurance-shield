import type { ReactNode } from 'react';
import { CompassRose } from './artwork/nautical-motifs';

/**
 * Chart-paper page head for inner routes: mono coordinate eyebrow, engraved compass rose
 * (or optional crest above), subtle lantern-beam highlight, Young Serif heading and lede.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  before,
  coordinate,
  showBeam = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Optional illustration (e.g. BeaconShield on Contact) above the eyebrow. */
  before?: ReactNode;
  /** Optional chart bearing or coordinate stamped in the top-right corner. */
  coordinate?: string;
  /** Render the subtle lantern beam sweep wash behind the heading. */
  showBeam?: boolean;
}) {
  return (
    <header className="relative overflow-hidden border-b border-rule bg-plate/85">
      {showBeam ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'linear-gradient(108deg, color-mix(in srgb, var(--beam) 20%, transparent) 0%, color-mix(in srgb, var(--beam) 6%, transparent) 44%, transparent 72%)',
          }}
        />
      ) : null}

      <div className="wrap relative py-10 sm:py-14">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            {before ? <div className="mb-4">{before}</div> : null}
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{eyebrow}</span>
              {coordinate ? <span className="text-sea">· {coordinate}</span> : null}
            </p>
            <h1
              id={id}
              className="mt-3 text-[clamp(2.25rem,5.4vw,3.75rem)] leading-[1.08] text-ink"
            >
              {title}
            </h1>
            {children ? (
              <div className="mt-4 max-w-(--measure) text-[clamp(1.04rem,1.4vw,1.18rem)] leading-relaxed text-muted">
                {children}
              </div>
            ) : null}
          </div>

          <CompassRose className="hidden h-20 w-20 shrink-0 text-ink/70 sm:block md:h-24 md:w-24" />
        </div>
      </div>
    </header>
  );
}
