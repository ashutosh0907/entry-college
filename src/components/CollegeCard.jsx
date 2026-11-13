import { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  GraduationCap,
  MapPin,
  PhoneCall,
  Star,
  TrendingUp,
} from 'lucide-react';

export default function CollegeCard({ college, onEnquire }) {
  const [imgSrc, setImgSrc] = useState(college.image);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError && college.fallbackImage) {
      setImgSrc(college.fallbackImage);
      setHasError(true);
    }
  };

  return (
    <article
      className="college-card"
      style={{
        '--card-accent': college.accent,
        '--card-accent-soft': college.accentSoft,
      }}
    >
      <div className="college-card__media">
        <img
          src={imgSrc}
          alt={`${college.fullName} campus`}
          loading="lazy"
          onError={handleImageError}
        />
        <span className="college-card__media-shade" aria-hidden="true" />

        <div className="college-card__pills">
          <span className="college-card__category-badge">
            <GraduationCap size={13} aria-hidden="true" />
            {college.categoryLabel}
          </span>
          <span className="college-card__rating-badge">
            <Star size={12} className="rating-star" fill="currentColor" aria-hidden="true" />
            <span>{college.rating}</span>
          </span>
        </div>

        <div className="college-card__media-footer">
          <span className="college-card__location-pill">
            <MapPin size={13} aria-hidden="true" />
            {college.location}
          </span>
        </div>
      </div>

      <div className="college-card__body">
        <div className="college-card__header">
          <div className="college-card__name-row">
            <h3 className="college-card__name">{college.name}</h3>
            {college.established && (
              <span className="college-card__est">
                <Calendar size={12} aria-hidden="true" />
                Estd. {college.established}
              </span>
            )}
          </div>
          <p className="college-card__full-name">{college.fullName}</p>
        </div>

        <div className="college-card__badges">
          {college.badges.map((badge) => (
            <span key={badge} className="college-card__badge">
              <Award size={11} aria-hidden="true" />
              {badge}
            </span>
          ))}
        </div>

        <p className="college-card__desc">{college.description}</p>

        <div className="college-card__programs">
          <p className="college-card__section-label">
            <Building2 size={12} aria-hidden="true" />
            Featured Specialisations
          </p>
          <div className="college-card__program-tags">
            {college.degrees.map((deg) => (
              <span key={deg} className="college-card__program-tag">
                <CheckCircle2 size={11} aria-hidden="true" />
                {deg}
              </span>
            ))}
          </div>
        </div>

        {(college.avgPackage || college.highestPackage) && (
          <div className="college-card__stats">
            {college.avgPackage && (
              <div className="college-card__stat">
                <span className="college-card__stat-label">Avg. Package</span>
                <span className="college-card__stat-value">{college.avgPackage}</span>
              </div>
            )}
            {college.highestPackage && (
              <div className="college-card__stat">
                <span className="college-card__stat-label">Highest CTC</span>
                <span className="college-card__stat-value">
                  <TrendingUp size={12} aria-hidden="true" />
                  {college.highestPackage}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="college-card__actions">
          <button
            type="button"
            className="college-card__cta"
            onClick={() => onEnquire(college)}
          >
            <span>Enquire Admission</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <a
            href="tel:+919876543210"
            className="college-card__call"
            title="Call Admission Desk"
            aria-label={`Call admission desk for ${college.name}`}
          >
            <PhoneCall size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
