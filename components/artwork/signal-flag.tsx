import { useId } from 'react';
import type { InsurerFlag } from '../../content/insurers';

type Props = {
  flag: InsurerFlag;
  className?: string;
};

/**
 * Maritime signal-flag pennant for a panel insurer.
 * Six distinct engraved patterns: quartered, stripe, border, diagonal, cross, chevron.
 */
export function SignalFlag({ flag, className = 'h-9 w-12' }: Props) {
  const uid = useId().replace(/:/g, '');
  const clipId = `flag-clip-${uid}`;

  return (
    <svg viewBox="0 0 64 44" className={className} aria-hidden="true" fill="none">
      <defs>
        <clipPath id={clipId}>
          <path d="M4 5 H60 L51 22 L60 39 H4 Z" />
        </clipPath>
      </defs>

      {/* Hoist lanyard clips */}
      <line x1="4" y1="1" x2="4" y2="43" stroke="var(--ink)" strokeWidth="1.6" />
      <circle cx="4" cy="9" r="1.7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
      <circle cx="4" cy="35" r="1.7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />

      <g clipPath={`url(#${clipId})`}>
        {flag === 'quartered' ? (
          <>
            <rect x="4" y="5" width="56" height="34" fill="var(--daymark-white)" />
            <rect x="4" y="5" width="28" height="17" fill="var(--primary)" />
            <rect x="32" y="22" width="28" height="17" fill="var(--sea)" />
            <line x1="32" y1="5" x2="32" y2="39" stroke="var(--ink)" strokeWidth="1.2" />
            <line x1="4" y1="22" x2="60" y2="22" stroke="var(--ink)" strokeWidth="1.2" />
          </>
        ) : flag === 'stripe' ? (
          <>
            <rect x="4" y="5" width="56" height="34" fill="var(--daymark-white)" />
            <rect x="4" y="5" width="56" height="11" fill="var(--sea)" />
            <rect x="4" y="28" width="56" height="11" fill="var(--primary)" />
            <line x1="4" y1="16" x2="60" y2="16" stroke="var(--ink)" strokeWidth="1.1" />
            <line x1="4" y1="28" x2="60" y2="28" stroke="var(--ink)" strokeWidth="1.1" />
          </>
        ) : flag === 'border' ? (
          <>
            <rect x="4" y="5" width="56" height="34" fill="var(--primary)" />
            <rect x="13" y="12" width="32" height="20" fill="var(--daymark-white)" stroke="var(--ink)" strokeWidth="1.3" />
            <rect x="21" y="17" width="16" height="10" fill="var(--beam)" stroke="var(--ink)" strokeWidth="1.1" />
          </>
        ) : flag === 'diagonal' ? (
          <>
            <rect x="4" y="5" width="56" height="34" fill="var(--daymark-white)" />
            <polygon points="4,5 60,5 4,39" fill="var(--sea)" />
            <polygon points="4,30 46,5 60,5 60,12 16,39 4,39" fill="var(--beam)" />
            <line x1="4" y1="39" x2="60" y2="5" stroke="var(--ink)" strokeWidth="1.3" />
          </>
        ) : flag === 'cross' ? (
          <>
            <rect x="4" y="5" width="56" height="34" fill="var(--daymark-white)" />
            <rect x="21" y="5" width="10" height="34" fill="var(--primary)" />
            <rect x="4" y="17" width="56" height="10" fill="var(--primary)" />
            <rect x="21" y="17" width="10" height="10" fill="var(--beam)" />
          </>
        ) : (
          /* chevron */
          <>
            <rect x="4" y="5" width="56" height="34" fill="var(--sea)" />
            <polygon points="4,5 28,22 4,39" fill="var(--beam)" stroke="var(--ink)" strokeWidth="1.3" />
            <polygon points="18,5 42,22 18,39 30,39 54,22 30,5" fill="var(--daymark-white)" stroke="var(--ink)" strokeWidth="1.2" />
          </>
        )}
      </g>

      {/* Crisp engraved pennant outline */}
      <path d="M4 5 H60 L51 22 L60 39 H4 Z" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
