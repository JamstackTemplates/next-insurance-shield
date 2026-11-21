import { useId } from 'react';

type Props = {
  className?: string;
};

/**
 * Hero scene "Portland Head at dusk": rocky Maine headland, white lighthouse with red
 * daymark band, red-roofed keeper's house, layered engraved sea, moored lobster boat,
 * channel buoy, gulls, sweeping conical beam and corner compass rose over a chart graticule.
 */
export function HeroScene({ className = 'w-full h-auto' }: Props) {
  const uid = useId().replace(/:/g, '');
  const beamGradId = `hero-beam-grad-${uid}`;
  const rockHatchId = `hero-rock-hatch-${uid}`;
  const seaHatchId = `hero-sea-hatch-${uid}`;
  const lanternGlowId = `hero-lantern-glow-${uid}`;
  const clipId = `hero-frame-clip-${uid}`;

  return (
    <svg
      viewBox="0 0 820 540"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="6" y="6" width="808" height="528" />
        </clipPath>

        {/* Luminous conical lantern beam gradient */}
        <linearGradient id={beamGradId} x1="548" y1="186" x2="10" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--beam)" stopOpacity="0.92" />
          <stop offset="28%" stopColor="var(--beam)" stopOpacity="0.46" />
          <stop offset="72%" stopColor="var(--beam)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--beam)" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={lanternGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--beam)" stopOpacity="0.95" />
          <stop offset="45%" stopColor="var(--beam)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--beam)" stopOpacity="0" />
        </radialGradient>

        {/* Fine diagonal engraving hatch for rocky headland shadow */}
        <pattern id={rockHatchId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--ink)" strokeWidth="0.85" opacity="0.28" />
        </pattern>

        {/* Horizontal maritime wave hatch */}
        <pattern id={seaHatchId} width="18" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="4" x2="10" y2="4" stroke="var(--sea)" strokeWidth="0.7" opacity="0.25" />
        </pattern>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* Chart plate base */}
        <rect x="6" y="6" width="808" height="528" fill="var(--plate)" />

        {/* Sky/sea graticule lines */}
        <g stroke="var(--rule)" strokeWidth="0.9" opacity="0.48">
          <line x1="120" y1="6" x2="120" y2="534" />
          <line x1="280" y1="6" x2="280" y2="534" />
          <line x1="440" y1="6" x2="440" y2="534" />
          <line x1="600" y1="6" x2="600" y2="534" />
          <line x1="740" y1="6" x2="740" y2="534" />
          <line x1="6" y1="110" x2="814" y2="110" />
          <line x1="6" y1="230" x2="814" y2="230" />
          <line x1="6" y1="350" x2="814" y2="350" />
          <line x1="6" y1="460" x2="814" y2="460" />
        </g>

        {/* Subtle dusk horizon wash */}
        <rect x="6" y="290" width="808" height="72" fill="var(--shoal)" opacity="0.32" />

        {/* Distant Casco Bay islands on the horizon */}
        <path
          d="M6 346 Q55 335 112 340 Q158 344 215 332 Q260 328 312 346 Z"
          fill="var(--shoal)"
          stroke="var(--ink)"
          strokeWidth="1.2"
          opacity="0.72"
        />
        <path
          d="M325 346 Q372 337 424 346 Z"
          fill="var(--shoal)"
          stroke="var(--ink)"
          strokeWidth="1.1"
          opacity="0.6"
        />

        {/* Sweeping lantern beam crossing left toward the Hero heading */}
        <g className="beacon-sweep">
          <polygon points="548,186 -40,42 -40,268" fill={`url(#${beamGradId})`} />
          {/* Secondary faint counter-beam right */}
          <polygon points="548,186 850,126 850,238" fill="var(--beam)" opacity="0.16" />
          {/* Engraved optical ray hairlines */}
          <line x1="548" y1="186" x2="40" y2="95" stroke="var(--beam)" strokeWidth="1" strokeDasharray="6 6" opacity="0.55" />
          <line x1="548" y1="186" x2="25" y2="155" stroke="var(--beam)" strokeWidth="1.1" opacity="0.45" />
          <line x1="548" y1="186" x2="55" y2="215" stroke="var(--beam)" strokeWidth="1" strokeDasharray="4 7" opacity="0.5" />
        </g>

        {/* Layered sea bands with shoal tint & contour lines */}
        <rect x="6" y="346" width="808" height="188" fill="var(--shoal)" opacity="0.72" />
        <path
          d="M6 392 C140 378 270 404 410 388 C545 374 680 398 814 386 V534 H6 Z"
          fill="var(--shoal)"
        />
        <rect x="6" y="392" width="808" height="142" fill={`url(#${seaHatchId})`} />

        {/* Horizon line */}
        <line x1="6" y1="346" x2="814" y2="346" stroke="var(--ink)" strokeWidth="1.5" />

        {/* Charted dotted shipping channel + bearing label */}
        <path
          d="M32 502 C145 486 240 468 354 468 C452 468 532 490 676 476"
          stroke="var(--sea)"
          strokeWidth="2"
          strokeDasharray="3 6"
          strokeLinecap="round"
        />
        <polygon points="358,468 349,464 351,472" fill="var(--sea)" />

        {/* Engraved wave strokes across the harbour */}
        <g stroke="var(--ink)" strokeWidth="1.25" strokeLinecap="round" opacity="0.6">
          <path d="M36 368 Q56 363 76 368 T116 368" />
          <path d="M180 374 Q202 369 224 374 T268 374" />
          <path d="M312 364 Q332 360 352 364" />
          <path d="M62 418 Q84 413 106 418 T150 418" />
          <path d="M276 432 Q298 427 320 432 T364 432" />
          <path d="M404 414 Q426 409 448 414" />
          <path d="M98 486 Q124 480 150 486 T202 486" />
          <path d="M428 504 Q456 498 484 504 T540 504" />
        </g>

        {/* Depth soundings in chart mono */}
        <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--muted)" opacity="0.88">
          <text x="58" y="452">24</text>
          <text x="166" y="498">31</text>
          <text x="278" y="464">18</text>
          <text x="382" y="446">14</text>
          <text x="454" y="484">9</text>
          <text x="688" y="514">12</text>
          <text x="218" y="518" fontSize="9.5" letterSpacing="1.2">PORTLAND APPROACH · 072°M</text>
        </g>

        {/* Rocky Maine granite headland */}
        <path
          d="M446 422 L470 374 L504 352 L532 340 L586 336 L662 342 L746 334 L814 344 V466 L760 456 L706 462 L636 452 L572 458 L508 442 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Granite facets and hatching shadow */}
        <path
          d="M446 422 L508 442 L572 458 L636 452 L706 462 L760 456 L814 466 V406 L744 392 L670 398 L592 382 L528 386 L484 402 Z"
          fill={`url(#${rockHatchId})`}
        />
        <path
          d="M476 410 L516 392 L566 402 L614 388 L674 404 L742 396 L806 410"
          stroke="var(--ink)"
          strokeWidth="1.3"
          opacity="0.65"
        />
        <path
          d="M522 434 L568 424 L624 432 L688 422 L754 436"
          stroke="var(--ink)"
          strokeWidth="1.1"
          opacity="0.5"
        />
        {/* Surf line hugging the headland rocks */}
        <path
          d="M432 426 Q468 438 508 448 Q552 464 596 462 Q650 458 708 468 Q758 462 814 472"
          stroke="var(--daymark-white)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M436 430 Q474 442 514 452 Q558 468 602 465"
          stroke="var(--ink)"
          strokeWidth="1.2"
          strokeDasharray="8 5"
          opacity="0.55"
        />

        {/* Keeper's house with lighthouse-red gable roof */}
        <g>
          {/* Side porch / link to lighthouse */}
          <rect
            x="576"
            y="314"
            width="38"
            height="34"
            fill="var(--daymark-white)"
            stroke="var(--ink)"
            strokeWidth="1.6"
          />
          <polygon
            points="572,315 595,299 618,315"
            fill="var(--primary)"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          {/* Main two-storey keeper's house */}
          <rect
            x="612"
            y="296"
            width="92"
            height="56"
            fill="var(--daymark-white)"
            stroke="var(--ink)"
            strokeWidth="1.7"
          />
          {/* Shaded side wall */}
          <rect x="676" y="296" width="28" height="56" fill={`url(#${rockHatchId})`} />
          {/* Chimney */}
          <rect
            x="674"
            y="256"
            width="12"
            height="28"
            fill="var(--primary)"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          {/* Red pitched roof */}
          <polygon
            points="604,298 658,262 712,298"
            fill="var(--primary)"
            stroke="var(--ink)"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          {/* Gable dormer */}
          <polygon
            points="634,298 648,278 662,298"
            fill="var(--daymark-white)"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          {/* Warm lit keeper's house windows */}
          <rect x="626" y="308" width="12" height="16" fill="var(--beam)" stroke="var(--ink)" strokeWidth="1.3" />
          <rect x="649" y="308" width="12" height="16" fill="var(--beam)" stroke="var(--ink)" strokeWidth="1.3" />
          <rect x="683" y="310" width="11" height="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.3" />
          <rect x="643" y="285" width="10" height="10" fill="var(--beam)" stroke="var(--ink)" strokeWidth="1.2" />
          {/* Door */}
          <rect x="626" y="332" width="12" height="20" fill="var(--ink)" />
          {/* Window mullions */}
          <line x1="632" y1="308" x2="632" y2="324" stroke="var(--ink)" strokeWidth="0.9" />
          <line x1="655" y1="308" x2="655" y2="324" stroke="var(--ink)" strokeWidth="0.9" />
        </g>

        {/* Portland Head Lighthouse */}
        <g>
          {/* Lantern halo */}
          <circle cx="548" cy="186" r="46" fill={`url(#${lanternGlowId})`} opacity="var(--beam-glow-opacity)" />

          {/* Tapered stone tower */}
          <polygon
            points="518,350 532,208 564,208 578,350"
            fill="var(--daymark-white)"
            stroke="var(--ink)"
            strokeWidth="1.9"
            strokeLinejoin="round"
          />

          {/* Bold red daymark band around tower middle */}
          <polygon
            points="524.5,264 571.5,264 574.5,296 521.5,296"
            fill="var(--primary)"
          />
          <line x1="524.5" y1="264" x2="571.5" y2="264" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="521.5" y1="296" x2="574.5" y2="296" stroke="var(--ink)" strokeWidth="1.5" />

          {/* Engraved cylindrical shading on right edge of tower */}
          <polygon points="555,208 564,208 578,350 564,350" fill={`url(#${rockHatchId})`} />

          {/* Tower windows */}
          <rect x="544" y="226" width="8" height="13" rx="1" fill="var(--ink)" />
          <rect x="543.5" y="274" width="9" height="12" rx="1" fill="var(--daymark-white)" stroke="var(--ink)" strokeWidth="1.3" />
          <rect x="543" y="314" width="10" height="15" rx="1" fill="var(--ink)" />

          {/* Gallery brackets & walkway */}
          <rect x="522" y="201" width="52" height="7" fill="var(--ink)" />
          <line x1="518" y1="201" x2="578" y2="201" stroke="var(--ink)" strokeWidth="1.8" />
          {/* Iron gallery railing */}
          <line x1="522" y1="193" x2="574" y2="193" stroke="var(--ink)" strokeWidth="1.3" />
          <line x1="524" y1="193" x2="524" y2="201" stroke="var(--ink)" strokeWidth="1.2" />
          <line x1="534" y1="193" x2="534" y2="201" stroke="var(--ink)" strokeWidth="1.2" />
          <line x1="562" y1="193" x2="562" y2="201" stroke="var(--ink)" strokeWidth="1.2" />
          <line x1="572" y1="193" x2="572" y2="201" stroke="var(--ink)" strokeWidth="1.2" />

          {/* Glass lantern room with glowing Fresnel lens */}
          <rect
            x="533"
            y="172"
            width="30"
            height="29"
            fill="var(--beam)"
            stroke="var(--ink)"
            strokeWidth="1.8"
          />
          {/* Fresnel optic diamond */}
          <polygon
            points="548,176 557,186 548,196 539,186"
            fill="var(--daymark-white)"
            opacity="0.85"
          />
          <line x1="541" y1="172" x2="541" y2="201" stroke="var(--ink)" strokeWidth="1.2" />
          <line x1="555" y1="172" x2="555" y2="201" stroke="var(--ink)" strokeWidth="1.2" />
          <line x1="533" y1="186" x2="563" y2="186" stroke="var(--ink)" strokeWidth="0.9" opacity="0.6" />

          {/* Red lantern cupola & lightning rod */}
          <path
            d="M530 172 Q548 150 566 172 Z"
            fill="var(--primary)"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="548" cy="154" r="3" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="548" y1="142" x2="548" y2="151" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" />
        </g>

        {/* Moored Maine lobster boat */}
        <g transform="translate(154 388)">
          {/* Hull */}
          <path
            d="M0 24 L94 21 L104 34 L12 37 Z"
            fill="var(--daymark-white)"
            stroke="var(--ink)"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          {/* Red boot-top waterline stripe */}
          <path d="M8 32 L100 30 L103 34 L12 37 Z" fill="var(--primary)" />
          {/* Wheelhouse cabin */}
          <path
            d="M28 23 L32 6 L60 6 L64 22 Z"
            fill="var(--daymark-white)"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Cabin windows */}
          <rect x="35" y="10" width="9" height="8" fill="var(--beam)" stroke="var(--ink)" strokeWidth="1.2" />
          <rect x="47" y="10" width="9" height="8" fill="var(--shoal)" stroke="var(--ink)" strokeWidth="1.2" />
          {/* Mast & radar */}
          <line x1="46" y1="6" x2="46" y2="-10" stroke="var(--ink)" strokeWidth="1.6" />
          <line x1="40" y1="-5" x2="52" y2="-5" stroke="var(--ink)" strokeWidth="1.4" />
          {/* Trap stack on stern */}
          <rect x="68" y="15" width="16" height="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
          {/* Mooring line & float */}
          <path d="M2 26 Q-14 36 -28 33" stroke="var(--ink)" strokeWidth="1.2" />
          <circle cx="-30" cy="33" r="3.2" fill="var(--daymark-white)" stroke="var(--ink)" strokeWidth="1.3" />
          {/* Water ripples under boat */}
          <path d="M-8 40 Q48 45 112 39" stroke="var(--ink)" strokeWidth="1.2" opacity="0.65" />
        </g>

        {/* Channel buoy (#2 red nun buoy) */}
        <g transform="translate(342 424)">
          <polygon
            points="10,26 16,5 22,26"
            fill="var(--primary)"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect x="7" y="26" width="18" height="7" rx="1.5" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.6" />
          <text
            x="16"
            y="22"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            fontWeight="500"
            fill="var(--on-primary)"
          >
            2
          </text>
          <path d="M0 35 Q16 39 32 35" stroke="var(--ink)" strokeWidth="1.3" />
          <path d="M4 39 Q16 42 28 39" stroke="var(--sea)" strokeWidth="1.1" opacity="0.75" />
        </g>

        {/* Coastal gulls */}
        <g stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M210 144 Q218 136 226 144 Q234 136 242 144" />
          <path d="M268 118 Q274 112 280 118 Q286 112 292 118" />
          <path d="M412 104 Q418 98 424 104 Q430 98 436 104" />
          <path d="M680 156 Q687 149 694 156 Q701 149 708 156" />
        </g>

        {/* Corner compass rose in upper-left of chart */}
        <g transform="translate(88 86)">
          <circle cx="0" cy="0" r="36" stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="0" cy="0" r="24" stroke="var(--ink)" strokeWidth="1.1" opacity="0.6" />
          {/* Main N-S-E-W star */}
          <polygon points="0,-34 5,-6 0,0" fill="var(--ink)" />
          <polygon points="0,-34 -5,-6 0,0" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
          <polygon points="0,34 5,6 0,0" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
          <polygon points="0,34 -5,6 0,0" fill="var(--ink)" />
          <polygon points="34,0 6,5 0,0" fill="var(--ink)" />
          <polygon points="34,0 6,-5 0,0" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
          <polygon points="-34,0 -6,5 0,0" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
          <polygon points="-34,0 -6,-5 0,0" fill="var(--ink)" />
          {/* Secondary intercardinal needles */}
          <line x1="-18" y1="-18" x2="18" y2="18" stroke="var(--ink)" strokeWidth="1" opacity="0.55" />
          <line x1="18" y1="-18" x2="-18" y2="18" stroke="var(--ink)" strokeWidth="1" opacity="0.55" />
          <circle cx="0" cy="0" r="3" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1" />
          <text
            x="0"
            y="-40"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fontWeight="500"
            fill="var(--ink)"
          >
            N
          </text>
        </g>

        {/* Chart margin coordinate stamps */}
        <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)" letterSpacing="0.8">
          <text x="646" y="30">CHART 13292 · CASCO BAY</text>
          <text x="20" y="522">43°37′N · 70°12′W</text>
        </g>
      </g>

      {/* Double-ruled engraved chart border with neatline ticks */}
      <rect x="6" y="6" width="808" height="528" stroke="var(--ink)" strokeWidth="1.8" />
      <rect x="11" y="11" width="798" height="518" stroke="var(--rule)" strokeWidth="0.9" />
    </svg>
  );
}
