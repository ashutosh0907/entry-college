import { ArrowRight } from 'lucide-react';

export default function Button({
  children,
  href,
  variant = 'primary',
  showIcon = true,
  className = '',
  ...props
}) {
  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href } : { type: 'button' };

  return (
    <Tag
      className={`btn btn--${variant} ${className}`.trim()}
      {...tagProps}
      {...props}
    >
      {children}
      {showIcon && <ArrowRight className="btn__icon" size={17} strokeWidth={2.2} aria-hidden="true" />}
    </Tag>
  );
}
