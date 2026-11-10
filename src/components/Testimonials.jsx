import { Info, Quote } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal className="testimonials__head">
          <SectionHeading
            eyebrow="Student stories"
            id="testimonials-title"
            title={
              <>
                Stories That <em>Inspire</em> Us.
              </>
            }
            description="Different ambitions, the same need for clarity. A glimpse at the journeys our guidance is designed to support."
          />

          <div className="testimonials__notice">
            <Info size={16} aria-hidden="true" />
            <span>Illustrative sample stories</span>
          </div>
        </Reveal>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="figure"
              className={`testimonial testimonial--${testimonial.tone}`}
              key={testimonial.id}
              delay={index * 110}
            >
              <div className="testimonial__top">
                <span className="testimonial__badge">Sample story</span>
                <Quote className="testimonial__quote-mark" size={30} strokeWidth={1.4} aria-hidden="true" />
              </div>

              <blockquote className="testimonial__quote">
                <p>{testimonial.quote}</p>
              </blockquote>

              <figcaption className="testimonial__person">
                <span className="testimonial__avatar" aria-hidden="true">
                  {testimonial.initials}
                </span>
                <span className="testimonial__identity">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.label}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="testimonials__disclaimer" delay={120}>
          Sample content for design purposes. Names, programme labels, and quotes are placeholders
          and should be replaced with verified, permission-based student stories before launch.
        </Reveal>
      </div>
    </section>
  );
}
