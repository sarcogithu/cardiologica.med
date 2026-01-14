import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { FeatureGrid } from './components/FeatureGrid';
import { TechnologyShowcase } from './components/TechnologyShowcase';
import { EngineSection } from './components/EngineSection';
import { ScreenshotSection } from './components/ScreenshotSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <Hero />
      <OverviewSection />
      <FeatureGrid />
      <TechnologyShowcase />
      <EngineSection />
      <ScreenshotSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
