type Props = {
  id: string;
  className?: string;
};

/**
 * Engraved 32px line icons for each cover type on the Light List (1.5px stroke).
 */
export function CoverIcon({ id, className = 'h-7 w-7' }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {id === 'homeowners' ? (
        <>
          <path d="M4 15 L16 5 L28 15" stroke="var(--primary)" />
          <path d="M7 13 V27 H25 V13" />
          <rect x="13" y="19" width="6" height="8" />
          <line x1="21" y1="7" x2="21" y2="11" />
        </>
      ) : id === 'condo-renters' ? (
        <>
          <rect x="7" y="5" width="18" height="22" />
          <path d="M4 27 H28" />
          <rect x="11" y="9" width="3" height="3" fill="var(--beam)" stroke="currentColor" strokeWidth="1.1" />
          <rect x="18" y="9" width="3" height="3" />
          <rect x="11" y="15" width="3" height="3" />
          <rect x="18" y="15" width="3" height="3" fill="var(--beam)" stroke="currentColor" strokeWidth="1.1" />
          <path d="M14 27 V22 H18 V27" />
        </>
      ) : id === 'auto' ? (
        <>
          <path d="M5 19 L8 11 H24 L27 19" />
          <rect x="4" y="18" width="24" height="6" rx="1.5" />
          <circle cx="9.5" cy="24.5" r="2.5" fill="var(--plate)" />
          <circle cx="22.5" cy="24.5" r="2.5" fill="var(--plate)" />
          <line x1="15" y1="11" x2="15" y2="18" />
        </>
      ) : id === 'boat' ? (
        <>
          <path d="M15 5 V21" />
          <path d="M15 6 L25 19 H15 Z" fill="var(--beam)" fillOpacity="0.35" />
          <path d="M15 9 L8 19 H15" />
          <path d="M5 21 H27 L24 26 H8 Z" stroke="var(--primary)" />
          <path d="M4 28 Q10 26 16 28 T28 28" stroke="var(--sea)" />
        </>
      ) : id === 'umbrella' ? (
        <>
          <path d="M5 16 C5 9.5 10 5 16 5 C22 5 27 9.5 27 16 Z" fill="var(--shoal)" fillOpacity="0.55" />
          <path d="M16 5 V24 C16 26.2 14.2 27.5 12.5 27.5 C11 27.5 10 26.5 10 25" />
          <path d="M11 16 C11 11 13 7 16 5 C19 7 21 11 21 16" opacity="0.6" />
        </>
      ) : id === 'flood' ? (
        <>
          <path d="M7 15 L16 8 L25 15" />
          <path d="M10 13 V19 H22 V13" />
          <path d="M4 21 Q8 18.5 12 21 T20 21 T28 21" stroke="var(--sea)" />
          <path d="M4 25.5 Q8 23 12 25.5 T20 25.5 T28 25.5" stroke="var(--sea)" />
        </>
      ) : id === 'business-owners' ? (
        <>
          <path d="M5 13 L7 7 H25 L27 13" stroke="var(--primary)" />
          <path d="M5 13 C5 15 8 15 9.5 13 C11 15 14 15 16 13 C18 15 21 15 22.5 13 C24 15 27 15 27 13" stroke="var(--primary)" />
          <path d="M7 15 V26 H25 V15" />
          <rect x="11" y="19" width="5" height="7" />
          <rect x="18.5" y="19" width="3.5" height="3.5" />
        </>
      ) : id === 'commercial-auto' ? (
        <>
          <path d="M4 11 H20 V22 H4 Z" />
          <path d="M20 14 H26 L28 18 V22 H20" />
          <circle cx="9.5" cy="23.5" r="2.5" fill="var(--plate)" />
          <circle cx="23.5" cy="23.5" r="2.5" fill="var(--plate)" />
          <line x1="7" y1="15" x2="17" y2="15" stroke="var(--primary)" />
        </>
      ) : id === 'professional-liability' ? (
        <>
          <rect x="5" y="11" width="22" height="15" rx="1.5" />
          <path d="M12 11 V8 C12 7.2 12.7 6.5 13.5 6.5 H18.5 C19.3 6.5 20 7.2 20 8 V11" />
          <path d="M5 17 H27" />
          <rect x="14" y="15.5" width="4" height="3" fill="var(--beam)" />
        </>
      ) : (
        /* workers-comp: hard hat */
        <>
          <path d="M7 20 C7 13 11 9 16 9 C21 9 25 13 25 20" fill="var(--beam)" fillOpacity="0.35" />
          <path d="M14 9 V19 M18 9 V19" />
          <path d="M4 20 H28 L27 23 H5 Z" stroke="var(--primary)" />
        </>
      )}
    </svg>
  );
}
