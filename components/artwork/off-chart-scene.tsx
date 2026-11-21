import { useId } from 'react';

/**
 * 404 "Off the chart" illustration: torn paper chart edge, empty open sea with
 * graticule, sweeping lighthouse beam from far left and a lone channel buoy.
 */
export function OffChartScene({ className = 'w-full h-auto' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const beamId = `offchart-beam-${uid}`;

  return (
    <svg viewBox="0 0 760 280" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={beamId} x1="48" y1="110" x2="660" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--beam)" stopOpacity="0.85" />
          <stop offset="55%" stopColor="var(--beam)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--beam)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Torn paper chart perimeter */}
      <path
        d="M8 8 H740 L734 38 L746 68 L732 104 L748 144 L735 182 L746 218 L734 248 L742 272 H8 Z"
        fill="var(--plate)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Open sea tint */}
      <path
        d="M9 170 H736 L735 182 L746 218 L734 248 L741 271 H9 Z"
        fill="var(--shoal)"
        opacity="0.65"
      />

      {/* Graticule lines */}
      <g stroke="var(--rule)" strokeWidth="0.85" opacity="0.45">
        <line x1="140" y1="10" x2="140" y2="270" />
        <line x1="290" y1="10" x2="290" y2="270" />
        <line x1="440" y1="10" x2="440" y2="270" />
        <line x1="590" y1="10" x2="590" y2="270" />
        <line x1="10" y1="90" x2="736" y2="90" />
        <line x1="10" y1="170" x2="736" y2="170" />
      </g>

      {/* Sweeping beam from far-left lighthouse */}
      <g className="offchart-sweep">
        <polygon points="48,110 720,38 720,192" fill={`url(#${beamId})`} />
      </g>
      {/* Distant silhouette of lighthouse on left margin */}
      <polygon points="38,170 43,118 53,118 58,170" fill="var(--daymark-white)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="41.5" y="138" width="13" height="10" fill="var(--primary)" />
      <rect x="43" y="106" width="10" height="12" fill="var(--beam)" stroke="var(--ink)" strokeWidth="1.4" />
      <polygon points="42,106 48,98 54,106" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.4" />

      {/* Horizon & open sea ripples */}
      <line x1="9" y1="170" x2="736" y2="170" stroke="var(--ink)" strokeWidth="1.5" />
      <g stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
        <path d="M126 198 Q154 192 182 198 T238 198" />
        <path d="M312 222 Q338 216 364 222 T416 222" />
        <path d="M558 206 Q584 200 610 206 T662 206" />
      </g>

      {/* Lone listing buoy out in empty water */}
      <g transform="translate(486 164) rotate(8 20 30)">
        <polygon points="12,42 18,12 26,42" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="9" y="42" width="20" height="7" rx="1.5" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.6" />
        <text x="19" y="34" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--on-primary)">?</text>
      </g>
      <path d="M474 214 Q504 220 534 214" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />

      {/* Mono chart stamps */}
      <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)" letterSpacing="1">
        <text x="24" y="32">SOUNDINGS UNKNOWN · OFF THE CHART</text>
        <text x="546" y="254">43°??′N · 70°??′W</text>
      </g>
    </svg>
  );
}
