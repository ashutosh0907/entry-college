import { ArrowRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { steps } from '../data/steps';

export default function HowItWorks() {
  return (
    <section className="how" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <Reveal className="how__head">
          <SectionHeading
            eyebrow="How it works"
            id="how-title"
            align="center"
            title={
              <>
                Your Journey to the Right College, <em>Simplified.</em>
              </>
            }
            description="Four clear steps that turn a stressful decision into a confident, well-informed choice."
          />
        </Reveal>

        <Reveal className="steps-area">
          <span className="steps-line steps-line--horizontal" aria-hidden="true" />
          <span className="steps-line steps-line--vertical" aria-hidden="true" />

          <ol className="steps">
            {steps.map((step, index) => (
              <li className="step" key={step.number} style={{ '--step-index': index }}>
                <div className="step__marker" aria-hidden="true">
                  <span>{step.number}</span>
                </div>
                <div className="step__content">
                  <p className="step__kicker">Step {step.number}</p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="how__foot" delay={140}>
          <p>Ready to take the first step?</p>
          <a href="#contact">
            Book a conversation
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
