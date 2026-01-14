import { useState, useEffect } from 'react';

const slides = [
  '/slide1.png',
  '/slide2.png',
  '/slide3.png',
  '/slide4.png',
  '/slide5.png',
  '/slide6.png',
];

export function ScreenshotSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-32 px-8 bg-black">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm tracking-widest text-gray-400 mb-4">INTERFACE</div>
          <h2 className="text-5xl mb-6">
            Designed for Clinical Precision
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See the reasoning, not just the result. Every classification displays the complete ROCI traversal path, so you know why, not just what.
          </p>
        </div>

        {/* Main Screenshot - Slideshow */}
        <div className="relative mb-16">
          <div className="bg-black rounded-xl overflow-hidden">
            <div className="aspect-video relative">
              {slides.map((slide, index) => (
                <img
                  key={slide}
                  src={slide}
                  alt={`Cardiologica Interface ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black rounded-xl p-6">
            <h3 className="text-xl mb-2">Full Traversal</h3>
            <p className="text-gray-400">See the complete Region → Origin → Class → Identity path for every classification.</p>
          </div>

          <div className="bg-black rounded-xl p-6">
            <h3 className="text-xl mb-2">Evidence Chain</h3>
            <p className="text-gray-400">Every decision backed by measured intervals, morphology findings, and constraint validation.</p>
          </div>

          <div className="bg-black rounded-xl p-6">
            <h3 className="text-xl mb-2">Audit Ready</h3>
            <p className="text-gray-400">One-click export. Complete traceability. Built for chart defense and regulatory review.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
