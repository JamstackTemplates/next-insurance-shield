import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { BeaconShield } from './artwork/beacon-shield';
import { SiteLink } from './site-link';

const navLinks = [
  { href: '/cover/', label: 'Cover' },
  { href: '/claims/', label: 'Claims help' },
  { href: '/why-a-broker/', label: 'Why a broker' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur-sm">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 py-2.5 sm:py-3 lg:flex-nowrap lg:gap-x-4">
        <SiteLink
          href="/"
          className="group inline-flex min-w-0 flex-1 items-center gap-2.5 text-ink no-underline hover:no-underline lg:flex-none"
        >
          <BeaconShield className="h-9 w-8 shrink-0 sm:h-11 sm:w-10" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight text-ink sm:text-[1.3rem]">
              {business.shortName}
            </span>
            <span className="mt-0.5 hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted sm:block">
              Portland, Maine
            </span>
          </span>
        </SiteLink>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:order-3">
          <a
            href={telHref}
            className="hidden font-mono text-xs font-medium tracking-wide text-ink no-underline hover:text-sea hover:underline lg:inline-flex"
          >
            {business.phone}
          </a>
          <SiteLink
            href="/contact/"
            className="button whitespace-nowrap px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="sm:hidden">Cover review</span>
            <span className="hidden sm:inline">Ask for a cover review</span>
          </SiteLink>
          <DarkModeToggle />
        </div>

        <nav
          aria-label="Main"
          className="flex w-full items-center justify-between gap-3 border-t border-rule/60 pt-1.5 text-[0.84rem] font-medium text-ink sm:text-[0.9375rem] lg:order-2 lg:w-auto lg:justify-start lg:gap-6 lg:border-t-0 lg:pt-0"
        >
          {navLinks.map(link => (
            <SiteLink
              key={link.href}
              href={link.href}
              markCurrent="page"
              className="whitespace-nowrap py-0.5 text-ink hover:text-sea"
            >
              {link.label}
            </SiteLink>
          ))}
        </nav>
      </div>
      <div className="daymark-hairline" aria-hidden="true" />
    </header>
  );
}
