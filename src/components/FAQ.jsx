import { useState } from 'react';
import { ArrowUpRight, MessagesSquare } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import AccordionItem from './ui/AccordionItem';
import { faqs } from '../data/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__layout">
        <Reveal className="faq__intro">
          <SectionHeading
            eyebrow="Good to know"
            id="faq-title"
            title={
              <>
                Frequently Asked <em>Questions</em>
              </>
            }
            description="Straight answers to the questions students and parents ask us most often."
          />

          <div className="faq__help">
            <span className="faq__help-icon" aria-hidden="true">
              <MessagesSquare size={21} strokeWidth={1.8} />
            </span>
            <div className="faq__help-copy">
              <strong>Still have a question?</strong>
              <p>Have a real conversation with our team — no pressure, no jargon.</p>
            </div>
            <a className="faq__help-link" href="#contact">
              Ask us directly
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal className="faq__list" delay={100}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              item={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
