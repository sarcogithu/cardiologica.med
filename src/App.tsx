import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { FeatureGrid } from './components/FeatureGrid';
import { TechnologyShowcase } from './components/TechnologyShowcase';
import { EngineSection } from './components/EngineSection';
import { ScreenshotSection } from './components/ScreenshotSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { TaxonomyExplorer } from './components/TaxonomyExplorer';

export default function App() {
  const [showTaxonomy, setShowTaxonomy] = useState(false);

  // Handle URL hash for direct linking
  useEffect(() => {
    const handleHashChange = () => {
      setShowTaxonomy(window.location.hash === '#taxonomy');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openTaxonomy = () => {
    window.location.hash = 'taxonomy';
    setShowTaxonomy(true);
  };

  const closeTaxonomy = () => {
    window.location.hash = '';
    setShowTaxonomy(false);
  };

  if (showTaxonomy) {
    return <TaxonomyExplorer onClose={closeTaxonomy} />;
  }

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <Hero />
      <OverviewSection />
      <FeatureGrid />
      <TechnologyShowcase />
      <EngineSection onExploreTaxonomy={openTaxonomy} />
      <ScreenshotSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
