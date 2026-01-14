export function OverviewSection() {

  return (
    <section className="relative pt-16 px-8 bg-black" style={{ paddingBottom: '600px' }}>
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>


      <div className="relative max-w-7xl mx-auto px-8">
        <div style={{ maxWidth: '600px' }}>
          <div className="text-sm tracking-widest text-gray-400 mb-4">OVERVIEW</div>
          <h2 className="text-5xl mb-8">
            Mechanistic. Deterministic.
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Most ECG software gives you an answer. Cardiologica shows you why. Every classification follows a transparent decision path, from signal to diagnosis, so you can verify, document, and defend your clinical judgment. No black boxes. No probability scores.
          </p>
          <p className="text-xl text-gray-300">
            No neural networks, just pure electrophysiologic reasoning derived from clinical cardiology principles.
          </p>
        </div>
      </div>

    </section>
  );
}