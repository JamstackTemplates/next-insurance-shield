import type { ReactNode } from 'react';
import { HeroScene } from '../artwork/hero-scene';
import { SiteLink } from '../site-link';

type ContentProps = { children: ReactNode };

function HeroSection({ children }: ContentProps) {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      {/* Subtle golden beam continuation crossing behind the heading on desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(254deg, color-mix(in srgb, var(--beam) 20%, transparent) 12%, color-mix(in srgb, var(--beam) 10%, transparent) 46%, transparent 78%)',
        }}
      />
      <div className="wrap relative grid items-center gap-6 pt-4 pb-8 sm:gap-8 sm:pt-8 sm:pb-12 lg:grid-cols-12 lg:gap-10 lg:py-10">
        {/* Artwork first on mobile (cropped to lighthouse & beam in top ~35% of viewport); right 7/12 bleeding out on desktop */}
        <div className="relative overflow-hidden border border-ink/80 bg-plate lg:order-2 lg:col-span-7 lg:-mr-12 lg:border-0 lg:bg-transparent xl:-mr-20">
          {/* On mobile, crop tightly around the lighthouse, headland & sweeping beam so heading + button stay above the fold */}
          <div className="h-[195px] w-full overflow-hidden sm:h-[300px] lg:h-auto">
            <HeroScene className="h-full w-full scale-[1.22] object-cover object-[74%_44%] sm:scale-100 lg:h-auto lg:w-full" />
          </div>
        </div>

        {/* Left 5/12 copy column */}
        <div className="relative z-10 lg:order-1 lg:col-span-5">
          {children}
        </div>
      </div>
    </section>
  );
}

function Coordinate({ children }: ContentProps) {
  return (
    <p className="eyebrow flex items-center gap-2 text-sea">
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
      <span>{children}</span>
    </p>
  );
}

function Heading({ children }: ContentProps) {
  return (
    <h1 className="mt-2.5 font-display text-[clamp(2.2rem,5.1vw,4.5rem)] leading-[1.03] tracking-[-0.02em] text-ink sm:mt-4">
      {children}
    </h1>
  );
}

function Introduction({ children }: ContentProps) {
  return (
    <p className="mt-3.5 max-w-xl text-[0.98rem] leading-relaxed text-muted sm:mt-5 sm:text-[1.1rem]">
      {children}
    </p>
  );
}

function Actions({ children }: ContentProps) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-7">
      {children}
    </div>
  );
}

function PrimaryAction({ href = '/contact/', children }: { href?: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="button px-5 py-3 text-[0.95rem] sm:px-6">
      {children}
    </SiteLink>
  );
}

function SecondaryAction({ href = '/claims/', children }: { href?: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="text-link inline-flex items-center gap-1.5 text-[0.95rem]">
      {children}
    </SiteLink>
  );
}

export const Hero = Object.assign(HeroSection, {
  Coordinate,
  Heading,
  Introduction,
  Actions,
  PrimaryAction,
  SecondaryAction,
});
