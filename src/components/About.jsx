import { GraduationCap, ShieldCheck, TrendingUp, UserRoundCheck } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import campusImage from '../assets/images/about-campus.jpg';
import collaborationImage from '../assets/images/about-collab.jpg';

const highlights = [
  {
    icon: UserRoundCheck,
    title: 'Student-focused counselling.',
    text: 'Sessions centred on your strengths, interests, and ambitions.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent admission guidance.',
    text: 'Clear explanations of requirements, processes, and next steps.',
  },
  {
    icon: TrendingUp,
    title: 'Career-oriented recommendations.',
    text: 'Advice that looks beyond the offer letter to the path ahead.',
  },
];

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container about__layout">
        <Reveal className="about__media">
          <span className="about__dot-grid" aria-hidden="true" />
          <span className="about__accent-line" aria-hidden="true" />

          <div className="about__image-main">
            <img
              src={campusImage}
              alt="A classic university campus building surrounded by green lawns"
              loading="lazy"
              width="1200"
              height="800"
            />
          </div>

          <div className="about__image-inset">
            <img
              src={collaborationImage}
              alt="Students collaborating around a table with laptops"
              loading="lazy"
              width="900"
              height="600"
            />
          </div>

          <div className="about__badge">
            <span className="about__badge-icon" aria-hidden="true">
              <GraduationCap size={20} strokeWidth={1.9} />
            </span>
            <span>
              Student-first.
              <em>Always.</em>
            </span>
          </div>
        </Reveal>

        <Reveal className="about__content" delay={120}>
          <SectionHeading
            eyebrow="About us"
            id="about-title"
            title={
              <>
                Helping Students Make <em>Smarter</em> Educational Decisions.
              </>
            }
          />

          <p className="about__description">
            We believe every student deserves the opportunity to build a successful future. Our
            mission is to simplify the college selection and admission journey through personalised
            guidance, transparent information, and dedicated support.
          </p>

          <ul className="about__list">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title}>
                  <span className="about__list-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="about__actions">
            <Button href="#contact">Talk to an Expert</Button>
            <span className="about__actions-note">A thoughtful conversation. No obligation.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
