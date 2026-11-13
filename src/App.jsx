import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CollegesScreen from './components/CollegesScreen';

function parseCategoryFromHash(hash) {
  if (!hash || !hash.startsWith('#colleges')) return null;
  if (hash.includes('engineering')) return 'engineering';
  if (hash.includes('management')) return 'management';
  if (hash.includes('bca') || hash.includes('bba')) return 'bca-bba';
  return 'all';
}

function normalizeCategory(idOrTitle) {
  if (!idOrTitle) return 'all';
  const str = String(idOrTitle).toLowerCase();
  if (str.includes('eng')) return 'engineering';
  if (str.includes('manag')) return 'management';
  if (str.includes('bca') || str.includes('bba')) return 'bca-bba';
  return 'all';
}

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash.startsWith('#colleges') ? 'colleges' : 'home';
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return parseCategoryFromHash(window.location.hash) || 'engineering';
  });
  const [contactPreset, setContactPreset] = useState(null);

  // Sync state with browser back/forward and URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const cat = parseCategoryFromHash(hash);
      if (cat) {
        setSelectedCategory(cat);
        setCurrentView('colleges');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Open the colleges screen for a specific pathway
  const handleOpenColleges = useCallback((idOrTitle) => {
    const category = normalizeCategory(idOrTitle);
    setSelectedCategory(category);
    setCurrentView('colleges');
    window.location.hash = `#colleges-${category}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Return from colleges screen to main home screen (scrolling to Where Are You Headed?)
  const handleBackToHome = useCallback(() => {
    setCurrentView('home');
    window.location.hash = '#services';
    setTimeout(() => {
      const servicesEl = document.getElementById('services');
      if (servicesEl) {
        servicesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  // Navigate to contact form on the home screen
  const handleGoToContact = useCallback((presetTitle) => {
    setCurrentView('home');
    const title = presetTitle || 'General Enquiry';
    setContactPreset({ value: title, id: Date.now() });
    window.location.hash = '#contact';
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      {currentView === 'colleges' ? (
        <main id="main">
          <CollegesScreen
            key={selectedCategory}
            initialCategory={selectedCategory}
            onBack={handleBackToHome}
            onGoToContact={handleGoToContact}
          />
          <Footer onSelectService={handleOpenColleges} />
        </main>
      ) : (
        <>
          <Header />
          <main id="main">
            <Hero />
            <Services onSelect={handleOpenColleges} />
            <WhyChooseUs />
            <HowItWorks />
            <About />
            <Testimonials />
            <FAQ />
            <Contact preset={contactPreset} />
          </main>
          <Footer onSelectService={handleOpenColleges} />
        </>
      )}
    </>
  );
}
