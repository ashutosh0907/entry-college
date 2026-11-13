import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Filter,
  GraduationCap,
  HelpCircle,
  Phone,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import Logo from './ui/Logo';
import CollegeCard from './CollegeCard';
import { colleges, pathwayMetadata } from '../data/colleges';

export default function CollegesScreen({ initialCategory = 'all', onBack, onGoToContact }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [modalCollege, setModalCollege] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });
  const [enquiryErrors, setEnquiryErrors] = useState({});
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Extract unique cities
  const cities = useMemo(() => {
    const set = new Set();
    colleges.forEach((c) => set.add(c.city));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter colleges based on category, search, and city
  const filteredColleges = useMemo(() => {
    return colleges.filter((c) => {
      const matchesCategory =
        selectedCategory === 'all' || c.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.fullName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.degrees.some((d) => d.toLowerCase().includes(q)) ||
        c.badges.some((b) => b.toLowerCase().includes(q));

      const matchesCity = selectedCity === 'All' || c.city === selectedCity;

      return matchesCategory && matchesSearch && matchesCity;
    });
  }, [selectedCategory, searchQuery, selectedCity]);

  // Counts for tabs
  const counts = useMemo(() => {
    const res = { all: colleges.length, engineering: 0, management: 0, 'bca-bba': 0 };
    colleges.forEach((c) => {
      if (res[c.category] !== undefined) res[c.category] += 1;
    });
    return res;
  }, []);

  const currentMeta = pathwayMetadata[selectedCategory] || pathwayMetadata.all;

  const handleEnquire = (college) => {
    setModalCollege(college);
    setEnquiryForm({
      name: '',
      phone: '',
      email: '',
      course: college.degrees[0] || '',
      message: `I would like admission details for ${college.name} (${college.categoryLabel}).`,
    });
    setEnquiryErrors({});
    setEnquirySubmitted(false);
  };

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
    if (enquiryErrors[name]) {
      setEnquiryErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!enquiryForm.name.trim()) errors.name = 'Please enter your name';
    const digits = enquiryForm.phone.replace(/\D/g, '');
    if (!enquiryForm.phone.trim() || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (
      !enquiryForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiryForm.email.trim())
    ) {
      errors.email = 'Please enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setEnquiryErrors(errors);
      return;
    }

    setEnquirySubmitted(true);
  };

  return (
    <div className="colleges-screen" id="colleges-screen">
      {/* Top sticky navigation bar */}
      <header className="colleges-nav">
        <div className="container colleges-nav__inner">
          <button
            type="button"
            className="colleges-nav__back"
            onClick={onBack}
            aria-label="Back to home"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span className="colleges-nav__back-desktop">Back to Home</span>
            <span className="colleges-nav__back-mobile">Back</span>
          </button>

          <a href="#home" onClick={onBack} className="colleges-nav__brand">
            <Logo />
          </a>

          <div className="colleges-nav__right">
            <a href="tel:+919876543210" className="colleges-nav__phone">
              <Phone size={15} aria-hidden="true" />
              <span className="colleges-nav__phone-text">+91 98765 43210</span>
            </a>
            <button
              type="button"
              className="colleges-nav__contact-btn"
              onClick={() => onGoToContact?.()}
            >
              Get Free Counselling
            </button>
          </div>
        </div>
      </header>

      {/* Screen Hero Section */}
      <section className="colleges-hero">
        <div className="container">
          <nav className="colleges-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <button type="button" onClick={onBack}>
                  Home
                </button>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <button type="button" onClick={onBack}>
                  Where Are You Headed?
                </button>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{currentMeta.title}</li>
            </ol>
          </nav>

          <div className="colleges-hero__head">
            <span className="colleges-hero__eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              {currentMeta.eyebrow}
            </span>
            <h1 className="colleges-hero__title">
              {selectedCategory === 'engineering' && (
                <>
                  Premier <em>Engineering</em> Colleges
                </>
              )}
              {selectedCategory === 'management' && (
                <>
                  Top <em>Management</em> Institutions
                </>
              )}
              {selectedCategory === 'bca-bba' && (
                <>
                  Leading <em>BCA & BBA</em> Institutes
                </>
              )}
              {selectedCategory === 'all' && (
                <>
                  Where Are You <em>Headed?</em> All Colleges
                </>
              )}
            </h1>
            <p className="colleges-hero__desc">{currentMeta.description}</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="colleges-tabs" role="tablist" aria-label="College categories">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'engineering'}
              className={`colleges-tab ${selectedCategory === 'engineering' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('engineering')}
            >
              <GraduationCap size={16} aria-hidden="true" />
              <span>Engineering</span>
              <span className="colleges-tab__count">{counts.engineering}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'management'}
              className={`colleges-tab ${selectedCategory === 'management' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('management')}
            >
              <GraduationCap size={16} aria-hidden="true" />
              <span>Management</span>
              <span className="colleges-tab__count">{counts.management}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'bca-bba'}
              className={`colleges-tab ${selectedCategory === 'bca-bba' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('bca-bba')}
            >
              <GraduationCap size={16} aria-hidden="true" />
              <span>BCA / BBA</span>
              <span className="colleges-tab__count">{counts['bca-bba']}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              className={`colleges-tab ${selectedCategory === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <span>View All</span>
              <span className="colleges-tab__count">{counts.all}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content & Controls */}
      <section className="colleges-body">
        <div className="container">
          {/* Controls Bar: Search & Location filters */}
          <div className="colleges-controls">
            <div className="colleges-search">
              <Search size={18} className="colleges-search__icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search college name, location, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search colleges"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="colleges-search__clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="colleges-cities" aria-label="Filter by location">
              <span className="colleges-cities__label">
                <Filter size={13} aria-hidden="true" />
                City:
              </span>
              <div className="colleges-cities__pills">
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    className={`colleges-city-pill ${selectedCity === city ? 'is-active' : ''}`}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="colleges-meta-bar">
            <p className="colleges-meta-count">
              Showing <strong>{filteredColleges.length}</strong> {filteredColleges.length === 1 ? 'college' : 'colleges'}
              {selectedCategory !== 'all' && (
                <span> in <em>{currentMeta.title}</em></span>
              )}
              {selectedCity !== 'All' && <span> in <strong>{selectedCity}</strong></span>}
              {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            </p>

            {(selectedCity !== 'All' || searchQuery) && (
              <button
                type="button"
                className="colleges-reset-btn"
                onClick={() => {
                  setSelectedCity('All');
                  setSearchQuery('');
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {/* College Cards Grid */}
          {filteredColleges.length > 0 ? (
            <div className="colleges-grid">
              {filteredColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onEnquire={handleEnquire}
                />
              ))}
            </div>
          ) : (
            <div className="colleges-empty">
              <HelpCircle size={44} aria-hidden="true" />
              <h3>No colleges found</h3>
              <p>
                We could not find any colleges matching your criteria. Try resetting your search or
                selecting another category.
              </p>
              <button
                type="button"
                className="colleges-empty__btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCity('All');
                  setSearchQuery('');
                }}
              >
                Show All Colleges
              </button>
            </div>
          )}

          {/* Bottom Guidance Banner */}
          <div className="colleges-cta-banner">
            <div className="colleges-cta-banner__content">
              <span className="eyebrow eyebrow--light">Direct Counselling & Cutoff Guidance</span>
              <h2>Need help choosing between these institutions?</h2>
              <p>
                Every student has distinct entrance scores, branch preferences, and budget
                constraints. Our senior education consultants provide one-on-one cutoff analysis and
                step-by-step admission assistance.
              </p>
              <div className="colleges-cta-banner__actions">
                <button
                  type="button"
                  className="colleges-cta-banner__primary"
                  onClick={() => onGoToContact?.()}
                >
                  <span>Connect with an Expert Counsellor</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="colleges-cta-banner__secondary"
                  onClick={onBack}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Return to Main Website</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College Admission Enquiry Modal */}
      {modalCollege && (
        <div
          className="modal"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModalCollege(null);
          }}
        >
          <div
            className="modal__dialog colleges-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
          >
            <button
              type="button"
              className="modal__close"
              onClick={() => setModalCollege(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {enquirySubmitted ? (
              <div className="colleges-modal__success">
                <div className="colleges-modal__success-icon">
                  <CheckCircle2 size={44} />
                </div>
                <h3>Enquiry Received!</h3>
                <p>
                  Thank you, <strong>{enquiryForm.name}</strong>. Our senior counsellor for{' '}
                  <strong>{modalCollege.name}</strong> ({modalCollege.fullName}) will connect with you
                  shortly at <strong>{enquiryForm.phone}</strong>.
                </p>
                <div className="colleges-modal__success-badges">
                  <span>✓ Cutoff Guidance</span>
                  <span>✓ Fee Details</span>
                  <span>✓ Application Assistance</span>
                </div>
                <button
                  type="button"
                  className="colleges-modal__close-btn"
                  onClick={() => setModalCollege(null)}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="colleges-modal__header">
                  <p className="eyebrow">Admission Enquiry</p>
                  <h3 id="enquiry-modal-title">Enquire for {modalCollege.name}</h3>
                  <p className="colleges-modal__sub">
                    {modalCollege.fullName} · {modalCollege.location}
                  </p>
                </div>

                <form className="colleges-modal__form" onSubmit={handleEnquirySubmit} noValidate>
                  <div className="form-field">
                    <label htmlFor="enquiry-name">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      placeholder="Your Full Name"
                      value={enquiryForm.name}
                      onChange={handleEnquiryChange}
                    />
                    {enquiryErrors.name && (
                      <span className="form-field__error">{enquiryErrors.name}</span>
                    )}
                  </div>

                  <div className="colleges-modal__row">
                    <div className="form-field">
                      <label htmlFor="enquiry-phone">
                        Phone Number <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="enquiry-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={enquiryForm.phone}
                        onChange={handleEnquiryChange}
                      />
                      {enquiryErrors.phone && (
                        <span className="form-field__error">{enquiryErrors.phone}</span>
                      )}
                    </div>

                    <div className="form-field">
                      <label htmlFor="enquiry-email">
                        Email Address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="enquiry-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={enquiryForm.email}
                        onChange={handleEnquiryChange}
                      />
                      {enquiryErrors.email && (
                        <span className="form-field__error">{enquiryErrors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="enquiry-course">Interested Course / Branch</label>
                    <select
                      id="enquiry-course"
                      name="course"
                      value={enquiryForm.course}
                      onChange={handleEnquiryChange}
                    >
                      {modalCollege.degrees.map((deg) => (
                        <option key={deg} value={deg}>
                          {deg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="enquiry-message">Questions / Entrance Exam Rank</label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows="3"
                      value={enquiryForm.message}
                      onChange={handleEnquiryChange}
                      placeholder="Share your entrance exam rank or any specific questions about fees, hostels, etc."
                    />
                  </div>

                  <button type="submit" className="colleges-modal__submit">
                    <span>Submit Admission Enquiry</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
