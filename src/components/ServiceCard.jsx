import { ArrowUpRight, BriefcaseBusiness, Check, Cpu, Laptop } from 'lucide-react';

const icons = {
  engineering: Cpu,
  management: BriefcaseBusiness,
  undergraduate: Laptop,
};

export default function ServiceCard({ service, onSelect }) {
  const Icon = icons[service.icon] ?? Cpu;
  const titleId = `service-${service.id}-title`;

  const handleClick = () => {
    onSelect(service.id, service.title);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className="service-card service-card--clickable"
      style={{ '--card-accent': service.accent, '--card-accent-soft': service.accentSoft }}
      aria-labelledby={titleId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <div className="service-card__media">
        <img
          src={service.image}
          alt={service.imageAlt}
          loading="lazy"
          width="1000"
          height="625"
        />
        <span className="service-card__media-shade" aria-hidden="true" />
        <span className="service-card__pathway">
          <span aria-hidden="true">{service.number}</span> Pathway
        </span>
      </div>

      <div className="service-card__body">
        <span className="service-card__icon" aria-hidden="true">
          <Icon size={23} strokeWidth={1.9} />
        </span>
        <h3 className="service-card__title" id={titleId}>
          {service.title}
        </h3>
        <p className="service-card__description">{service.description}</p>

        <p className="service-card__list-label">What we help with</p>
        <ul className="service-card__list">
          {service.highlights.map((highlight) => (
            <li key={highlight}>
              <span className="service-card__check" aria-hidden="true">
                <Check size={11} strokeWidth={3} />
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="service-card__cta">
          <span>{service.cta}</span>
          <span className="service-card__cta-icon" aria-hidden="true">
            <ArrowUpRight size={17} strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </article>
  );
}
