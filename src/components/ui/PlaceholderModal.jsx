import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function PlaceholderModal({ open, title, onClose, children }) {
  const closeRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previouslyFocused.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="placeholder-modal-title"
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
        <p className="eyebrow">Placeholder</p>
        <h2 className="modal__title" id="placeholder-modal-title">
          {title}
        </h2>
        <div className="modal__content">{children}</div>
        <button type="button" className="btn btn--primary modal__action" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
