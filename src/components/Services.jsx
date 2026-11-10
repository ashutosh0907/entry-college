import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import ServiceCard from './ServiceCard';
import Reveal from './ui/Reveal';
import { services } from '../data/services';

export default function Services({ onSelect }) {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services__decor" aria-hidden="true">
        <span className="services__glow" />
        <span className="services__orbit services__orbit--one" />
        <span className="services__orbit services__orbit--two" />
        <span className="services__star">✳</span>
      </div>

      <div className="container">
        <Reveal className="services__head">
          <SectionHeading
            eyebrow="Explore your possibilities"
            id="services-title"
            title={
              <>
                Where Are You <em>Headed?</em>
              </>
            }
            description="Every great career begins with the right decision. Explore our specialised education guidance and find the path that matches your ambitions."
            tone="light"
          />

          <div className="services__aside" aria-hidden="true">
            <span className="services__aside-number">03</span>
            <span className="services__aside-text">
              specialised
              <br />
              pathways
            </span>
            <span className="services__aside-rule" />
          </div>
        </Reveal>

        <div className="services__grid">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 110} className="services__reveal">
              <ServiceCard service={service} onSelect={onSelect} />
            </Reveal>
          ))}
        </div>

        <Reveal className="services__footnote" delay={160}>
          <span className="services__footnote-icon" aria-hidden="true">
            <Sparkles size={17} />
          </span>
          <p>Not sure which path fits best?</p>
          <a href="#contact">
            Start with a conversation
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
