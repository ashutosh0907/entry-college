import { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Info,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Button from './ui/Button';
import { site } from '../data/site';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  interest: '',
  message: '',
};

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const digits = phone.replace(/\D/g, '');

  if (!name) {
    errors.name = 'Please enter your full name.';
  } else if (name.length < 2) {
    errors.name = 'Your name should be at least 2 characters.';
  }

  if (!phone) {
    errors.phone = 'Please enter your phone number.';
  } else if (!/^[+\d][\d\s().-]*$/.test(phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Enter a valid phone number with 7–15 digits.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.interest) {
    errors.interest = 'Please choose a pathway.';
  }

  return errors;
}

export default function Contact({ preset }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  useEffect(() => {
    if (!preset?.value) return;
    setForm((previous) => ({ ...previous, interest: preset.value }));
    setErrors((previous) => ({ ...previous, interest: undefined }));
    setSubmitted(false);
  }, [preset]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = ['name', 'phone', 'email', 'interest'].find(
        (field) => nextErrors[field],
      );
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setSubmittedName(form.name.trim().split(' ')[0]);
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setSubmittedName('');
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__panel">
          <div className="contact__decor" aria-hidden="true">
            <span className="contact__glow" />
            <span className="contact__ring" />
            <span className="contact__star">✦</span>
          </div>

          <div className="contact__content">
            <p className="eyebrow eyebrow--light">Let's talk</p>
            <h2 className="contact__title" id="contact-title">
              Let's Find the <em>Right Path</em> for Your Future.
            </h2>
            <p className="contact__description">
              Have questions about your college admission journey? Connect with our team and take
              your next step with confidence.
            </p>

            <div className="contact__channels">
              <a className="contact__channel" href={site.contact.phoneHref}>
                <span className="contact__channel-icon" aria-hidden="true">
                  <Phone size={19} strokeWidth={1.9} />
                </span>
                <span>
                  <small>Call us</small>
                  <strong>{site.contact.phone}</strong>
                </span>
              </a>

              <a className="contact__channel" href={site.contact.emailHref}>
                <span className="contact__channel-icon" aria-hidden="true">
                  <Mail size={19} strokeWidth={1.9} />
                </span>
                <span>
                  <small>Email us</small>
                  <strong>{site.contact.email}</strong>
                </span>
              </a>

              <div className="contact__channel">
                <span className="contact__channel-icon" aria-hidden="true">
                  <MapPin size={19} strokeWidth={1.9} />
                </span>
                <span>
                  <small>Visit us</small>
                  <strong>{site.contact.address}</strong>
                </span>
              </div>
            </div>

            <p className="contact__hours">
              <Clock3 size={16} aria-hidden="true" />
              {site.contact.hours}
            </p>

            <div className="contact__actions">
              <Button
                href={site.contact.phoneHref}
                variant="ghost-light"
                className="contact__call"
                showIcon={false}
              >
                <Phone size={17} aria-hidden="true" />
                Talk to Our Team
              </Button>
              <span className="contact__actions-note">Or request a callback using the form.</span>
            </div>
          </div>

          <div className="contact__form-card">
            {submitted ? (
              <div className="form-success" role="status" aria-live="polite">
                <span className="form-success__icon" aria-hidden="true">
                  <CheckCircle2 size={36} strokeWidth={1.7} />
                </span>
                <p className="eyebrow">Request noted</p>
                <h3 className="form-success__title" id="contact-form-title">
                  Thank you, {submittedName}.
                </h3>
                <p className="form-success__text">
                  Your callback request has been captured in this preview
                  {form.interest ? ` for ${form.interest}` : ''}.
                </p>
                <p className="form-success__note">
                  <Info size={16} aria-hidden="true" />
                  This is a static demo form. Your details have not been sent to a server or stored
                  anywhere.
                </p>
                <button type="button" className="btn btn--ghost form-success__action" onClick={resetForm}>
                  Submit another request
                </button>
              </div>
            ) : (
              <form className="contact-form" noValidate onSubmit={handleSubmit}>
                <div className="contact-form__head">
                  <p className="eyebrow">Request a callback</p>
                  <h3 id="contact-form-title">Tell us a little about you.</h3>
                  <p>Share your details and we will arrange a convenient time to talk.</p>
                </div>

                <div className="contact-form__grid">
                  <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="contact-name">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <span className="form-field__error" id="contact-name-error">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={`form-field ${errors.phone ? 'has-error' : ''}`}>
                    <label htmlFor="contact-phone">
                      Phone Number <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    />
                    {errors.phone && (
                      <span className="form-field__error" id="contact-phone-error">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className={`form-field form-field--full ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="contact-email">
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && (
                      <span className="form-field__error" id="contact-email-error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={`form-field form-field--full ${errors.interest ? 'has-error' : ''}`}>
                    <label htmlFor="contact-interest">
                      Interested In <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={Boolean(errors.interest)}
                      aria-describedby={errors.interest ? 'contact-interest-error' : undefined}
                    >
                      <option value="" disabled>
                        Select a pathway
                      </option>
                      {site.formOptions.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.interest && (
                      <span className="form-field__error" id="contact-interest-error">
                        {errors.interest}
                      </span>
                    )}
                  </div>

                  <div className="form-field form-field--full">
                    <label htmlFor="contact-message">
                      Message <span className="form-field__optional">(optional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="3"
                      maxLength="500"
                      placeholder="Tell us briefly about your academic goals or questions."
                      value={form.message}
                      onChange={handleChange}
                    />
                    <span className="form-field__counter">{form.message.length}/500</span>
                  </div>
                </div>

                <button type="submit" className="btn btn--accent contact-form__submit">
                  Request a Callback
                  <ArrowRight size={17} aria-hidden="true" />
                </button>

                <p className="contact-form__privacy">
                  <Info size={14} aria-hidden="true" />
                  This demo form validates in your browser only. No information is submitted or
                  stored.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
