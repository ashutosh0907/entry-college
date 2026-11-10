import logoDark from '../../assets/images/entrycollege-logo.png';
import logoLight from '../../assets/images/entrycollege-logo-light.png';

/**
 * Brand lockup. The supplied EntryCollege logo already includes the mark and
 * wordmark, so this component simply swaps between the original artwork and a
 * white variant for dark backgrounds.
 */
export default function Logo({ tone = 'dark', className = '' }) {
  const src = tone === 'light' ? logoLight : logoDark;

  return (
    <span className={`logo logo--${tone} ${className}`.trim()}>
      <img
        className="logo__image"
        src={src}
        alt="EntryCollege"
        width="360"
        height="188"
        decoding="async"
      />
    </span>
  );
}
