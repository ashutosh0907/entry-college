import { useCallback, useState } from 'react';
import {
  ArrowUpRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Logo from './ui/Logo';
import PlaceholderModal from './ui/PlaceholderModal';
import { site } from '../data/site';
import { services } from '../data/services';

function InstagramIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.35" cy="6.65" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3" />
      <path d="M7.6 10.3v6.1M7.6 7.5v.1M11.4 16.4v-6.1M11.4 12.8c0-1.7 1-2.8 2.6-2.8s2.5 1.1 2.5 2.9v3.5" strokeLinecap="round" />
    </svg>
  );
}

function YouTubeIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="4" />
      <path d="m10.2 9.2 5 2.8-5 2.8V9.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIcons = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
};

const currentYear = new Date().getFullYear();

const legalCopy = {
  'Privacy Policy': {
    label: 'Privacy Policy',
    body: [
      'This is a placeholder for your privacy policy.',
      'Add details about the information you collect through the callback form, how it is used, how long it is retained, and how visitors can request access, corrections, or deletion.',
      'The contact form on this demo page validates only in the browser. It does not transmit or store any information.',
    ],
  },
  'Terms & Conditions': {
    label: 'Terms & Conditions',
    body: [
      'This is a placeholder for your terms and conditions.',
      'Add the terms that govern use of this website, the scope of your counselling services, limitations, and any applicable disclaimers.',
      'No separate legal pages are linked in this single-page demo.',
    ],
  },
};

export default function Footer({ onSelectService }) {
  const [modal, setModal] = useState(null);

  const closeModal = useCallback(() => setModal(null), []);

  const openPrivacy = () => setModal(legalCopy['Privacy Policy']);
  const openTerms = () => setModal(legalCopy['Terms & Conditions']);
  const openSocial = (label) =>
    setModal({
      label: `${label} profile`,
      body: [
        `This is a placeholder for the ${label} profile.`,
        'Add your official profile URL here before launch. No external social profiles are linked in this demo.',
      ],
    });

  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <div className="footer__decor" aria-hidden="true">
        <span className="footer__glow" />
        <span className="footer__grain" />
      </div>

      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="footer__logo" aria-label="EntryCollege — back to top">
              <Logo tone="light" />
            </a>
            <h2 className="footer__heading" id="footer-heading">
              Empowering students with the right guidance, college opportunities, and admission
              support to build a brighter future.
            </h2>
            <p className="footer__tagline">{site.brand.tagline}</p>

            <div className="footer__socials" role="group" aria-label="Social media placeholders">
              {site.social.map((social) => {
                const Icon = socialIcons[social.icon] ?? InstagramIcon;
                return (
                  <button
                    type="button"
                    className="footer__social"
                    key={social.label}
                    onClick={() => openSocial(social.label)}
                    aria-label={`${social.label} placeholder`}
                  >
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          <nav className="footer__column" aria-labelledby="footer-quick-title">
            <h3 className="footer__column-title" id="footer-quick-title">
              Quick Links
            </h3>
            <ul className="footer__links">
              {site.nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__column" aria-labelledby="footer-services-title">
            <h3 className="footer__column-title" id="footer-services-title">
              Our Services
            </h3>
            <ul className="footer__links">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    className="footer__link-button"
                    onClick={() => onSelectService(service.title)}
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__column footer__contacts">
            <h3 className="footer__column-title">Contact Information</h3>
            <ul className="footer__contact-list">
              <li>
                <Phone size={16} strokeWidth={1.8} aria-hidden="true" />
                <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              </li>
              <li>
                <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
                <a href={site.contact.emailHref}>{site.contact.email}</a>
              </li>
              <li>
                <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />
                <span>{site.contact.address}</span>
              </li>
              <li>
                <Clock3 size={16} strokeWidth={1.8} aria-hidden="true" />
                <span>{site.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__map-row">
          <div className="footer__map-copy">
            <p className="eyebrow eyebrow--light">Find us</p>
            <h3>A conversation is closer than you think.</h3>
            <p>{site.contact.address}</p>
            <p className="footer__map-hours">
              <Clock3 size={15} aria-hidden="true" />
              {site.contact.hours}
            </p>
            <a
              className="footer__directions"
              href={site.contact.mapLink}
              target="_blank"
              rel="noreferrer"
            >
              Get directions
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="footer__map">
            <iframe
              title="Map showing the EntryCollege office location"
              src={site.contact.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <span className="footer__map-badge">
              <MapPin size={13} aria-hidden="true" />
              Placeholder location
            </span>
            <a
              className="footer__map-external"
              href={site.contact.mapLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Open the office location in Google Maps"
            >
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} EntryCollege. All rights reserved.</p>
          <div className="footer__legal">
            <button type="button" onClick={openPrivacy}>
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={openTerms}>
              Terms &amp; Conditions
            </button>
          </div>
          <p className="footer__bottom-note">Guidance for what&apos;s next.</p>
        </div>
      </div>

      <p className="footer__watermark" aria-hidden="true">
        EntryCollege
      </p>

      <PlaceholderModal
        open={Boolean(modal)}
        title={modal?.label ?? ''}
        onClose={closeModal}
      >
        {modal?.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PlaceholderModal>
    </footer>
  );
}
