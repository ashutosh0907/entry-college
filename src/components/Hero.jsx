import { Check, Compass, Sparkles, UserRoundCheck } from 'lucide-react';
import Button from './ui/Button';
import heroImage from '../assets/images/hero-students.jpg';

const trustPoints = [
  'Personalised Career Guidance',
  'Expert Admission Support',
  'Student-First Approach',
];

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__decor" aria-hidden="true">
        <span className="hero__glow hero__glow--blue" />
        <span className="hero__glow hero__glow--warm" />
        <span className="hero__dot-grid" />
        <span className="hero__ring" />
        <span className="hero__line" />
      </div>

      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow hero-anim" style={{ '--anim-delay': '40ms' }}>
            Your future. Our guidance.
          </p>

          <h1 className="hero__title hero-anim" id="hero-title" style={{ '--anim-delay': '120ms' }}>
            Your Dream Career Starts With the{' '}
            <span className="hero__accent">
              Right College.
              <svg
                className="hero__underline"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9.5c62-6 143-7.5 294-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="hero__lead hero-anim" style={{ '--anim-delay': '210ms' }}>
            Making the right educational choice shapes your future. We help students discover the
            right colleges, explore opportunities, and navigate admissions with confidence.
          </p>

          <div className="hero__actions hero-anim" style={{ '--anim-delay': '300ms' }}>
            <Button href="#services" variant="primary">
              Explore Your Options
            </Button>
            <Button href="#contact" variant="ghost">
              Talk to Our Counsellor
            </Button>
          </div>

          <ul className="hero__trust hero-anim" style={{ '--anim-delay': '390ms' }}>
            {trustPoints.map((point) => (
              <li key={point}>
                <span className="hero__trust-check" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual hero-anim" style={{ '--anim-delay': '240ms' }}>
          <span className="hero__visual-slab" aria-hidden="true" />
          <span className="hero__visual-orb" aria-hidden="true" />

          <div className="hero__frame">
            <img
              src={heroImage}
              alt="A group of confident college students sitting together on a sunlit campus"
              width="1200"
              height="1600"
              fetchPriority="high"
            />
            <span className="hero__frame-shade" aria-hidden="true" />
            <div className="hero__frame-caption">
              <span className="hero__frame-pulse" aria-hidden="true" />
              <div>
                <span>Campus conversations</span>
                <strong>Clarity for the road ahead</strong>
              </div>
            </div>
          </div>

          <div className="float-card float-card--future">
            <span className="float-card__icon float-card__icon--blue" aria-hidden="true">
              <Compass size={20} strokeWidth={2} />
            </span>
            <div>
              <span className="float-card__kicker">Your next chapter</span>
              <strong>Your Future Starts Here</strong>
            </div>
          </div>

          <div className="float-card float-card--guidance">
            <span className="float-card__icon float-card__icon--warm" aria-hidden="true">
              <UserRoundCheck size={20} strokeWidth={2} />
            </span>
            <div>
              <span className="float-card__kicker">One-to-one support</span>
              <strong>Personalised Guidance</strong>
            </div>
          </div>

          <div className="hero__seal" aria-hidden="true">
            <Sparkles size={16} />
            <span>
              Student-first
              <br />
              guidance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
