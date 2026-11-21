type Props = {
  className?: string;
};

/**
 * Two-routes comparison chart: "You" to "Cover".
 * Upper course: Going direct — a single rigid straight line past one harbour.
 * Lower course: With a broker — a charted channel weaving past six panel harbours
 * with the lighthouse marking the safe passage.
 */
export function TwoRoutesChart({ className = 'w-full h-auto' }: Props) {
  const harbours = [
    { x: 178, y: 208, label: 'Granite Ledge', below: false },
    { x: 248, y: 254, label: 'Northline', below: true },
    { x: 320, y: 204, label: 'Bramblewood', below: true },
    { x: 406, y: 254, label: 'Tidewater', below: true },
    { x: 482, y: 206, label: 'Kennebec', below: false },
    { x: 552, y: 250, label: 'Seaward', below: true },
  ];

  return (
    <svg viewBox="0 0 720 320" className={className} aria-hidden="true" fill="none">
      {/* Chart background & neatline */}
      <rect x="4" y="4" width="712" height="312" fill="var(--plate)" stroke="var(--ink)" strokeWidth="1.6" />
      <rect x="9" y="9" width="702" height="302" stroke="var(--rule)" strokeWidth="0.9" />

      {/* Chart graticule */}
      <g stroke="var(--rule)" strokeWidth="0.8" opacity="0.42">
        <line x1="120" y1="9" x2="120" y2="311" />
        <line x1="240" y1="9" x2="240" y2="311" />
        <line x1="360" y1="9" x2="360" y2="311" />
        <line x1="480" y1="9" x2="480" y2="311" />
        <line x1="600" y1="9" x2="600" y2="311" />
        <line x1="9" y1="115" x2="711" y2="115" />
        <line x1="9" y1="220" x2="711" y2="220" />
      </g>

      {/* Shoal water tint along the lower broker channel */}
      <path
        d="M92 178 C190 156 320 156 445 162 C540 166 600 168 638 178 V288 H92 Z"
        fill="var(--shoal)"
        opacity="0.45"
      />

      {/* ─── Upper route: Going direct (one harbour) ────────────────────────── */}
      <line
        x1="88"
        y1="142"
        x2="626"
        y2="82"
        stroke="var(--muted)"
        strokeWidth="1.8"
        strokeDasharray="6 6"
      />
      <polygon points="356,112 346,108 347,117" fill="var(--muted)" />

      {/* Single isolated harbour */}
      <g transform="translate(362 78)">
        <circle cx="0" cy="0" r="14" fill="var(--paper)" stroke="var(--muted)" strokeWidth="1.4" />
        <circle cx="0" cy="0" r="4" fill="var(--muted)" />
        <text
          x="0"
          y="-22"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="var(--muted)"
          letterSpacing="0.8"
        >
          ONE INSURER · DIRECT
        </text>
      </g>

      {/* ─── Lower route: With Lighthouse Cover (6 harbours + beacon) ───────── */}
      {/* Beam wash from the lighthouse marking the safe channel */}
      <polygon points="366,184 150,236 582,236" fill="var(--beam)" opacity="0.22" />

      <path
        d="M88 158 C130 226 168 228 185 205 C212 168 232 268 255 252 C286 232 308 182 332 200 C362 222 384 270 408 254 C436 236 456 186 482 204 C508 222 528 264 550 248 C580 226 600 182 628 164"
        stroke="var(--sea)"
        strokeWidth="2.4"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />

      {/* Six panel harbours along the broker channel */}
      {harbours.map((h, i) => (
        <g key={h.label} transform={`translate(${h.x} ${h.y})`}>
          <circle cx="0" cy="0" r="7.5" fill="var(--plate)" stroke="var(--sea)" strokeWidth="1.8" />
          <circle cx="0" cy="0" r="3" fill={i % 2 === 0 ? 'var(--primary)' : 'var(--sea)'} />
          <text
            x="0"
            y={h.below ? 21 : -13}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="var(--ink)"
          >
            {h.label}
          </text>
        </g>
      ))}

      {/* Lighthouse beacon marking the centre of the safe channel */}
      <g transform="translate(368 136)">
        <circle cx="0" cy="18" r="16" fill="var(--beam)" opacity="0.38" />
        <polygon points="-7,38 -4,14 4,14 7,38" fill="var(--daymark-white)" stroke="var(--ink)" strokeWidth="1.5" />
        <rect x="-5.5" y="24" width="11" height="5" fill="var(--primary)" />
        <rect x="-4.5" y="7" width="9" height="7" fill="var(--beam)" stroke="var(--ink)" strokeWidth="1.3" />
        <polygon points="-5.5,7 0,1 5.5,7" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.3" />
      </g>

      {/* Start waypoint: YOU */}
      <g transform="translate(74 150)">
        <circle cx="0" cy="0" r="16" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.8" />
        <circle cx="0" cy="0" r="4.5" fill="var(--primary)" />
        <text
          x="0"
          y="-24"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="10.5"
          fontWeight="500"
          fill="var(--ink)"
        >
          YOU
        </text>
      </g>

      {/* Destination waypoint: COVER */}
      <g transform="translate(642 150)">
        <circle cx="0" cy="0" r="18" fill="var(--beam)" opacity="0.32" />
        <circle cx="0" cy="0" r="12" fill="var(--plate)" stroke="var(--ink)" strokeWidth="1.8" />
        <path d="M-4.5 0.5 L-1 4 L5.5 -3.5" stroke="var(--sea)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text
          x="0"
          y="-24"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="10.5"
          fontWeight="500"
          fill="var(--ink)"
        >
          COVER
        </text>
      </g>

      {/* Chart title & bottom caption */}
      <text x="24" y="32" fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)" letterSpacing="1">
        TWO COURSES TO COVER · PANEL OF 6 INSURERS
      </text>
      <text x="24" y="298" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--sea)" letterSpacing="0.8">
        BROKER CHANNEL · COMPARED &amp; REVIEWED YEARLY
      </text>
    </svg>
  );
}
