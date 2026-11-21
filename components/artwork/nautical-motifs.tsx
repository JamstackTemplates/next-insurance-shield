import type { ReactNode } from 'react';

/** 8-point engraved nautical compass rose for page heads, Light List and footer. */
export function CompassRose({ className = 'h-16 w-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="none">
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.55" />
      <circle cx="50" cy="50" r="31" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      {/* Intercardinal points */}
      <polygon points="50,50 72,28 56,50" fill="currentColor" opacity="0.35" />
      <polygon points="50,50 72,72 50,56" fill="currentColor" opacity="0.35" />
      <polygon points="50,50 28,72 44,50" fill="currentColor" opacity="0.35" />
      <polygon points="50,50 28,28 50,44" fill="currentColor" opacity="0.35" />
      {/* Cardinal needles */}
      <polygon points="50,8 56,44 50,50" fill="var(--primary)" />
      <polygon points="50,8 44,44 50,50" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="50,92 56,56 50,50" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="50,92 44,56 50,50" fill="currentColor" />
      <polygon points="92,50 56,56 50,50" fill="currentColor" />
      <polygon points="92,50 56,44 50,50" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="8,50 44,56 50,50" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="8,50 44,44 50,50" fill="currentColor" />
      <circle cx="50" cy="50" r="4" fill="var(--beam)" stroke="currentColor" strokeWidth="1.4" />
      <g fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="500" fill="currentColor" textAnchor="middle">
        <text x="50" y="7" dy="-0.5">N</text>
        <text x="50" y="99">S</text>
        <text x="97" y="53">E</text>
        <text x="3" y="53">W</text>
      </g>
    </svg>
  );
}

/** Braided horizontal rope border used to edge daymark bands. */
export function RopeEdge({ className = 'w-full h-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 12" preserveAspectRatio="none" className={className} aria-hidden="true" fill="none">
      <rect x="0" y="2" width="600" height="8" fill="var(--paper)" />
      <line x1="0" y1="2" x2="600" y2="2" stroke="var(--ink)" strokeWidth="1.4" />
      <line x1="0" y1="10" x2="600" y2="10" stroke="var(--ink)" strokeWidth="1.4" />
      {Array.from({ length: 60 }).map((_, i) => (
        <line
          key={i}
          x1={i * 10}
          y1="10"
          x2={i * 10 + 7}
          y2="2"
          stroke="var(--ink)"
          strokeWidth="1.15"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

/** Engraved reef knot divider separating oversized numerals on the daymark plate. */
export function RopeKnot({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path
        d="M6 24 C12 12 22 12 24 24 C26 36 36 36 42 24"
        stroke="var(--ink)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M6 24 C12 36 22 36 24 24 C26 12 36 12 42 24"
        stroke="var(--primary)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="16 5"
      />
      <circle cx="24" cy="24" r="3.2" fill="var(--plate)" stroke="var(--ink)" strokeWidth="1.6" />
    </svg>
  );
}

/** Dotted nautical course divider with compass bearing label and directional arrowhead. */
export function CourseDivider({ bearing, label, className = '' }: {
  bearing: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`wrap flex items-center gap-3 py-4 font-mono text-xs uppercase tracking-[0.12em] text-muted ${className}`} aria-hidden="true">
      <span className="shrink-0 font-medium text-sea">{bearing}</span>
      <svg viewBox="0 0 360 16" className="h-4 flex-1" preserveAspectRatio="none" fill="none">
        <line
          x1="0"
          y1="8"
          x2="346"
          y2="8"
          stroke="var(--sea)"
          strokeWidth="1.8"
          strokeDasharray="3 6"
          strokeLinecap="round"
        />
        <polygon points="356,8 345,3.5 347.5,8 345,12.5" fill="var(--sea)" />
      </svg>
      <span className="shrink-0">{label}</span>
    </div>
  );
}

/** Vertical margin of scattered depth soundings and a shoal contour curve. */
export function SoundingsMargin({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 460" className={className} aria-hidden="true" fill="none">
      <path
        d="M84 12 C56 74 96 138 66 206 C38 270 92 332 62 448"
        stroke="var(--sea)"
        strokeWidth="1.4"
        strokeDasharray="4 4"
        opacity="0.7"
      />
      <path
        d="M44 24 C22 108 58 188 30 282 C12 346 46 396 28 450"
        stroke="var(--rule)"
        strokeWidth="1.2"
        opacity="0.8"
      />
      <g fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--muted)">
        <text x="16" y="42">14</text>
        <text x="64" y="88">22</text>
        <text x="20" y="136">19</text>
        <text x="58" y="176">27</text>
        <text x="12" y="232">11</text>
        <text x="68" y="268">31</text>
        <text x="24" y="324">16</text>
        <text x="54" y="376">24</text>
        <text x="16" y="424">9</text>
        <text x="6" y="454" fontSize="8.5" letterSpacing="1">FATHOMS · MLLW</text>
      </g>
    </svg>
  );
}

/** Framed harbour chart inset showing Custom House Wharf on Portland's Commercial Street. */
export function HarbourInset({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 156" className={className} aria-hidden="true" fill="none">
      <rect x="2" y="2" width="316" height="152" fill="var(--shoal)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Graticule */}
      <g stroke="var(--rule)" strokeWidth="0.8" opacity="0.55">
        <line x1="80" y1="2" x2="80" y2="154" />
        <line x1="160" y1="2" x2="160" y2="154" />
        <line x1="240" y1="2" x2="240" y2="154" />
        <line x1="2" y1="54" x2="318" y2="54" />
        <line x1="2" y1="106" x2="318" y2="106" />
      </g>
      {/* Portland waterfront shoreline & wharves */}
      <path
        d="M2 2 H318 V54 L268 58 L262 84 L244 82 L248 56 L194 60 L184 102 L160 100 L168 62 L116 66 L110 92 L92 90 L98 64 L44 68 L2 62 Z"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Commercial Street line */}
      <path d="M2 38 Q160 44 318 32" stroke="var(--ink)" strokeWidth="2" opacity="0.7" />
      {/* Custom House Wharf beacon marker */}
      <circle cx="172" cy="82" r="10" fill="var(--beam)" opacity="0.55" />
      <circle cx="172" cy="82" r="4.5" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Dotted ferry/harbour channel */}
      <path d="M18 134 C96 126 196 132 302 114" stroke="var(--sea)" strokeWidth="1.7" strokeDasharray="3 5" />
      {/* Labels & soundings */}
      <g fontFamily="var(--font-mono)" fill="var(--ink)">
        <text x="14" y="28" fontSize="8.5" letterSpacing="0.9">COMMERCIAL ST</text>
        <text x="190" y="96" fontSize="8.5" fontWeight="500" fill="var(--primary-ink)">CUSTOM HOUSE WHARF</text>
        <text x="20" y="122" fontSize="9" fill="var(--muted)">21</text>
        <text x="128" y="142" fontSize="9" fill="var(--muted)">28 · PORTLAND HARBOR</text>
        <text x="278" y="140" fontSize="9" fill="var(--muted)">19</text>
      </g>
    </svg>
  );
}

/** Radiant Fresnel lantern optics backdrop for the deep-ink closing band. */
export function LanternGlow({ className = 'pointer-events-none absolute inset-0 h-full w-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" fill="none">
      <defs>
        <radialGradient id="closing-lantern-radial" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="var(--beam)" stopOpacity="0.46" />
          <stop offset="42%" stopColor="var(--beam)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--beam)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="380" fill="url(#closing-lantern-radial)" />
      {/* Engraved concentric Fresnel lens rings */}
      <g stroke="var(--beam)" strokeWidth="1" opacity="0.28">
        <circle cx="600" cy="175" r="76" strokeDasharray="4 6" />
        <circle cx="600" cy="175" r="142" />
        <circle cx="600" cy="175" r="220" strokeDasharray="2 8" />
        <line x1="120" y1="175" x2="1080" y2="175" opacity="0.4" />
        <line x1="600" y1="16" x2="600" y2="364" opacity="0.35" />
      </g>
    </svg>
  );
}

/** Decorative engraved checklist tick-box SVG (explicitly not a form input). */
export function ChecklistTickBox({ className = 'mt-0.5 h-5 w-5 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" className={className} aria-hidden="true" fill="none">
      <rect x="2" y="2" width="18" height="18" rx="1.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M6 11.5 L9.5 15 L16.5 7" stroke="var(--sea)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Subtle SVG feTurbulence chart-paper grain overlay kept at lower opacity in dark mode. */
export function ChartGrain() {
  return (
    <svg className="chart-grain" aria-hidden="true" width="100%" height="100%">
      <filter id="nautical-paper-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#nautical-paper-grain)" />
    </svg>
  );
}

/** Helper frame for chart plates with small mono corner coordinates. */
export function ChartPlate({
  coordTopLeft,
  coordTopRight,
  className = '',
  children,
}: {
  coordTopLeft?: string;
  coordTopRight?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`chart-plate ${className}`}>
      {(coordTopLeft || coordTopRight) ? (
        <div className="flex items-center justify-between gap-4 border-b border-rule/70 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted sm:px-6">
          <span>{coordTopLeft ?? ''}</span>
          <span>{coordTopRight ?? ''}</span>
        </div>
      ) : null}
      {children}
    </div>
  );
}
