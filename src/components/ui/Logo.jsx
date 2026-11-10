import { useId } from 'react';

/**
 * Reusable brand lockup. Replace the SVG mark and wordmark here when a
 * final logo is available.
 */
export default function Logo({ tone = 'dark', className = '' }) {
  const gradientId = useId();

  return (
    <span className={`logo logo--${tone} ${className}`.trim()}>
      <svg
        className="logo__mark"
        viewBox="0 0 44 44"
        role="img"
        aria-label="Northlight compass mark"
      >
        <defs>
          <linearGradient id={gradientId} x1="4" y1="2" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#20466f" />
            <stop offset="1" stopColor="#0c2036" />
          </linearGradient>
        </defs>
        <rect
          width="44"
          height="44"
          rx="13"
          fill={tone === 'light' ? 'rgba(255,255,255,0.10)' : `url(#${gradientId})`}
        />
        <path
          d="M22 8.2 25.15 18.85 35.8 22 25.15 25.15 22 35.8 18.85 25.15 8.2 22 18.85 18.85Z"
          fill="#ffffff"
        />
        <circle cx="22" cy="22" r="2.9" fill="#F4A340" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">Northlight</span>
        <span className="logo__descriptor">Education</span>
      </span>
    </span>
  );
}
