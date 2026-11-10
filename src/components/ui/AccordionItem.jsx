import { useId } from 'react';
import { Plus } from 'lucide-react';

export default function AccordionItem({ item, index, isOpen, onToggle }) {
  const baseId = useId();
  const buttonId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="faq-item__trigger"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="faq-item__number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="faq-item__question">{item.question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          <Plus size={18} strokeWidth={2} />
        </span>
      </button>
      <div
        className="faq-item__panel"
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
      >
        <div className="faq-item__panel-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
