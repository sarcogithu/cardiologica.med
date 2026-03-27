import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { OverviewSection } from '../components/OverviewSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { TechnologyShowcase } from '../components/TechnologyShowcase';
import { EngineSection } from '../components/EngineSection';
import { ScreenshotSection } from '../components/ScreenshotSection';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';
import { TaxonomyExplorer } from '../components/TaxonomyExplorer';
import { SubpageHero } from '../components/SubpageHero';

export function DXPage() {
  const [showTaxonomy, setShowTaxonomy] = useState(false);

  if (showTaxonomy) {
    return <TaxonomyExplorer onClose={() => setShowTaxonomy(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <Navigation alwaysVisible />
      <SubpageHero
        title="CARDIOLOGICA-DX"
        subtitle="Clinical ECG Interpretation Engine"
        tagline="Deterministic rhythm classification from signal to diagnosis."
      />
      <OverviewSection />
      <FeatureGrid />
      <TechnologyShowcase />
      <EngineSection onExploreTaxonomy={() => setShowTaxonomy(true)} />
      <ScreenshotSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
