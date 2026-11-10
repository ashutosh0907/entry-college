export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  id,
  className = '',
}) {
  return (
    <div className={`section-head section-head--${align} section-head--${tone} ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-head__title" id={id}>
        {title}
      </h2>
      {description && <p className="section-head__description">{description}</p>}
    </div>
  );
}
