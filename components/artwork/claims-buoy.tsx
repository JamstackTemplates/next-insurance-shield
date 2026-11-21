type Props = {
  number: number;
  buoy: 'nun' | 'can';
  className?: string;
};

/**
 * Numbered channel buoy for the six-step claims course:
 * alternating red conical "nun" buoy and sea-green flat-top "can" buoy.
 */
export function ClaimsBuoy({ number, buoy, className = 'h-16 w-14' }: Props) {
  const isNun = buoy === 'nun';

  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true" fill="none">
      {/* Subtle halo behind buoy */}
      <circle cx="32" cy="34" r="24" fill="var(--plate)" opacity="0.6" />

      {isNun ? (
        /* Red conical Nun buoy (starboard / returning) */
        <g>
          <polygon
            points="17,52 24,24 32,9 40,24 47,52"
            fill="var(--primary)"
            stroke="var(--ink)"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <line x1="21" y1="36" x2="43" y2="36" stroke="var(--daymark-white)" strokeWidth="2.5" opacity="0.85" />
          <rect x="14" y="51" width="36" height="6" rx="2" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.7" />
          {/* Daymark number */}
          <text
            x="32"
            y="32"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="13"
            fontWeight="500"
            fill="var(--on-primary)"
          >
            {number}
          </text>
        </g>
      ) : (
        /* Sea-green flat-top Can buoy (port / returning) */
        <g>
          <rect
            x="18"
            y="14"
            width="28"
            height="38"
            rx="1.5"
            fill="var(--sea)"
            stroke="var(--ink)"
            strokeWidth="1.7"
          />
          <line x1="18" y1="22" x2="46" y2="22" stroke="var(--daymark-white)" strokeWidth="2.4" opacity="0.85" />
          <rect x="14" y="51" width="36" height="6" rx="2" fill="var(--sea)" stroke="var(--ink)" strokeWidth="1.7" />
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="13"
            fontWeight="500"
            fill="var(--on-primary)"
          >
            {number}
          </text>
        </g>
      )}

      {/* Waterline ripples */}
      <path d="M8 60 Q20 57 32 60 T56 60" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 65 Q23 63 32 65 T50 65" stroke="var(--sea)" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
