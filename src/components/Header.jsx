import { useEffect, useState } from 'react';
import { Menu, Phone, X, ArrowUpRight } from 'lucide-react';
import Logo from './ui/Logo';
import Button from './ui/Button';
import { site } from '../data/site';
import useActiveSection from '../hooks/useActiveSection';

const navIds = site.nav.map((item) => item.id);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useActiveSection(navIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleBreakpoint = (event) => {
      if (event.matches) setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleBreakpoint);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`header ${isScrolled ? 'header--scrolled' : ''} ${isOpen ? 'header--open' : ''}`}
      >
        <div className="container header__inner">
          <a className="header__brand" href="#home" aria-label="EntryCollege — back to top">
            <Logo />
          </a>

          <nav className="primary-nav" aria-label="Primary navigation">
            <ul>
              {site.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeId === item.id ? 'is-active' : ''}
                    aria-current={activeId === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <Button href="#contact" className="header__cta">
              Talk to an Expert
            </Button>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="menu-toggle__icon" aria-hidden="true">
                {isOpen ? <X size={23} /> : <Menu size={23} />}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="mobile-menu__backdrop"
          aria-label="Close navigation menu"
          tabIndex={isOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <div
          className="mobile-menu__panel"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <p className="mobile-menu__label">Explore EntryCollege</p>
          <nav aria-label="Mobile navigation links">
            <ul className="mobile-menu__links">
              {site.nav.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    tabIndex={isOpen ? 0 : -1}
                    className={activeId === item.id ? 'is-active' : ''}
                  >
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {item.label}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__footer">
            <p className="mobile-menu__footer-label">Prefer a conversation?</p>
            <a className="mobile-menu__contact" href={site.contact.phoneHref} tabIndex={isOpen ? 0 : -1}>
              <Phone size={17} aria-hidden="true" />
              {site.contact.phone}
            </a>
            <Button href="#contact" onClick={closeMenu} className="mobile-menu__cta" tabIndex={isOpen ? 0 : -1}>
              Talk to an Expert
            </Button>
            <p className="mobile-menu__hours">{site.contact.hours}</p>
          </div>
        </div>
      </div>
    </>
  );
}
