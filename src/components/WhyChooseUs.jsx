import {
  ArrowRight,
  Compass,
  FileCheck2,
  HeartHandshake,
  Target,
} from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { features } from '../data/features';

const icons = {
  compass: Compass,
  target: Target,
  fileCheck: FileCheck2,
  heart: HeartHandshake,
};

const tones = ['#022c50', '#e8610b', '#0a4c78', '#063a63'];

export default function WhyChooseUs() {
  return (
    <section className="why" id="why-us" aria-labelledby="why-title">
      <div className="container why__layout">
        <Reveal className="why__intro">
          <SectionHeading
            eyebrow="Why students choose us"
            id="why-title"
            title={
              <>
                More Than Guidance.
                <br />
                <em>A Partner in Your Journey.</em>
              </>
            }
            description="The right guidance makes a complex decision feel calm, clear, and personal. Here is what that looks like with us."
          />

          <div className="why__promise">
            <div className="why__promise-top">
              <span className="why__promise-icon" aria-hidden="true">
                <Compass size={22} strokeWidth={1.8} />
              </span>
              <span className="why__promise-label">Our promise</span>
            </div>
            <p className="why__promise-quote">“The best decision is an informed one.”</p>
            <p className="why__promise-text">
              No pressure, no jargon — just honest guidance built around what is right for you.
            </p>
            <a className="why__promise-link" href="#contact">
              Start your conversation
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="why__grid">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon] ?? Compass;
            return (
              <Reveal
                as="article"
                className="feature-card"
                key={feature.number}
                delay={index * 90}
                style={{ '--feature-tone': tones[index % tones.length] }}
              >
                <div className="feature-card__top">
                  <span className="feature-card__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <span className="feature-card__number" aria-hidden="true">
                    {feature.number}
                  </span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
