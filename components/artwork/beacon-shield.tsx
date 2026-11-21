import { useId } from 'react';

type Props = {
  className?: string;
  decorative?: boolean;
  label?: string;
};

/**
 * The signature Beacon Shield crest: a pointed heraldic shield split by red and white
 * daymark bands with a lighthouse rising through it and a lit lantern beacon.
 */
export function BeaconShield({ className = 'h-10 w-10', decorative = true, label = 'Lighthouse Cover crest' }: Props) {
  const uid = useId().replace(/:/g, '');
  const clipId = `beacon-shield-clip-${uid}`;
  const hatchId = `beacon-shield-hatch-${uid}`;

  return (
    <svg
      viewBox="0 0 80 92"
      className={className}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      fill="none"
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M40 5 L71 15 V44 C71 65 57 78 40 87 C23 78 9 65 9 44 V15 Z" />
        </clipPath>
        <pattern id={hatchId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="0.7" opacity="0.18" />
        </pattern>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* Warm bone / daymark white field */}
        <rect x="0" y="0" width="80" height="92" fill="var(--daymark-white)" />

        {/* Diagonal lighthouse-red daymark bands */}
        <path d="M-6 24 L86 8 V29 L-6 45 Z" fill="var(--primary)" />
        <path d="M-6 58 L86 42 V63 L-6 79 Z" fill="var(--primary)" />
        {/* Engraved shadow hatching over lower sea base */}
        <rect x="0" y="68" width="80" height="24" fill="var(--shoal)" />
        <rect x="0" y="68" width="80" height="24" fill={`url(#${hatchId})`} />

        {/* Engraved wave strokes at foot of shield */}
        <path
          d="M6 74 Q18 70 30 74 T54 74 T76 74"
          stroke="var(--ink)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M12 80 Q24 77 36 80 T60 80 T74 80"
          stroke="var(--sea)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Lantern beacon fan */}
        <path d="M40 27 L7 18 V35 Z" fill="var(--beam)" opacity="0.68" />
        <path d="M40 27 L73 18 V35 Z" fill="var(--beam)" opacity="0.68" />
        <line x1="40" y1="27" x2="10" y2="23" stroke="var(--beam)" strokeWidth="1.2" opacity="0.9" />
        <line x1="40" y1="27" x2="70" y2="23" stroke="var(--beam)" strokeWidth="1.2" opacity="0.9" />

        {/* Rocky headland base */}
        <path
          d="M21 71 L28 65 L52 65 L59 71 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Lighthouse tower */}
        <polygon
          points="31,66 34.5,33 45.5,33 49,66"
          fill="var(--daymark-white)"
          stroke="var(--ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Daymark red collar on tower */}
        <polygon points="32.8,48 47.2,48 47.8,55 32.2,55" fill="var(--primary)" />
        <line x1="32.8" y1="48" x2="47.2" y2="48" stroke="var(--ink)" strokeWidth="1.2" />
        <line x1="32.2" y1="55" x2="47.8" y2="55" stroke="var(--ink)" strokeWidth="1.2" />
        {/* Engraved vertical shading line & tower window */}
        <line x1="43.5" y1="34" x2="46.2" y2="65" stroke="var(--ink)" strokeWidth="0.9" opacity="0.35" />
        <rect x="38.5" y="38.5" width="3" height="5" rx="1" fill="var(--ink)" />
        <rect x="38.2" y="58" width="3.6" height="5" rx="1" fill="var(--ink)" />

        {/* Gallery deck */}
        <rect x="31.5" y="30.5" width="17" height="3.2" fill="var(--ink)" rx="0.5" />
        <line x1="30" y1="30.5" x2="50" y2="30.5" stroke="var(--ink)" strokeWidth="1.5" />

        {/* Lit lantern room */}
        <rect
          x="34.5"
          y="21.5"
          width="11"
          height="9"
          fill="var(--beam)"
          stroke="var(--ink)"
          strokeWidth="1.6"
        />
        <line x1="38.2" y1="21.5" x2="38.2" y2="30.5" stroke="var(--ink)" strokeWidth="1.1" />
        <line x1="41.8" y1="21.5" x2="41.8" y2="30.5" stroke="var(--ink)" strokeWidth="1.1" />

        {/* Cupola and finial */}
        <path
          d="M33.5 21.5 Q40 13.5 46.5 21.5 Z"
          fill="var(--primary)"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <line x1="40" y1="12" x2="40" y2="15.5" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="40" cy="11.5" r="1.4" fill="var(--ink)" />
      </g>

      {/* Outer heraldic shield border + inner engraved rule */}
      <path
        d="M40 5 L71 15 V44 C71 65 57 78 40 87 C23 78 9 65 9 44 V15 Z"
        stroke="var(--ink)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M40 8.8 L67.4 17.6 V43.6 C67.4 62.6 55 74.4 40 82.6 C25 74.4 12.6 62.6 12.6 43.6 V17.6 Z"
        stroke="var(--ink)"
        strokeWidth="0.9"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}
