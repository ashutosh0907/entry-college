import { useCallback, useState } from 'react';
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

export default function App() {
  const [contactPreset, setContactPreset] = useState(null);

  const handleServiceSelect = useCallback((title) => {
    setContactPreset({ value: title, id: Date.now() });
    const contact = document.getElementById('contact');
    if (!contact) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    contact.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services onSelect={handleServiceSelect} />
        <WhyChooseUs />
        <HowItWorks />
        <About />
        <Testimonials />
        <FAQ />
        <Contact preset={contactPreset} />
      </main>
      <Footer onSelectService={handleServiceSelect} />
    </>
  );
}
