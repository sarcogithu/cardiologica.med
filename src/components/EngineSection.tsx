import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function EngineSection() {
  const [glowPosition, setGlowPosition] = useState({ x: 70, y: 30 });

  useEffect(() => {
    const animate = () => {
      const duration = 10000 + Math.random() * 5000;
      const nextX = 20 + Math.random() * 60;
      const nextY = 20 + Math.random() * 60;
      setGlowPosition({ x: nextX, y: nextY });
      setTimeout(animate, duration);
    };
    animate();
  }, []);

  return (
    <section className="relative py-32 px-8 bg-[#0a0a0a] overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          opacity: 0.2
        }}
      />

      {/* Drifting gold glow - with heavy blur */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'blur(80px)' }}
        animate={{
          background: `radial-gradient(ellipse 50% 50% at ${glowPosition.x}% ${glowPosition.y}%,
            rgba(134, 117, 77, 0.12) 0%,
            rgba(134, 117, 77, 0.06) 40%,
            transparent 70%)`
        }}
        transition={{
          duration: 12.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="text-sm tracking-widest text-gray-400 mb-4">FRAMEWORK</div>
        <h2 className="text-6xl mb-8 tracking-tight">
          <span style={{ fontWeight: 700 }}>CARDIO</span><span style={{ fontWeight: 300 }}>LOGIC∆</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-16">
          A deterministic interpretive sequence that mirrors clinical reasoning, not statistical pattern matching.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div>
            <div className="text-2xl tracking-normal text-white mb-4"><span style={{ fontWeight: 700 }}>RHYTHM</span> <span style={{ fontWeight: 300 }}>TAXONOMY</span></div>
            <div className="p-8 bg-black/50 backdrop-blur border border-zinc-800 rounded-lg">
              <div className="text-5xl mb-4" style={{ color: '#86754f' }}>35</div>
              <h3 className="text-2xl mb-4">Rhythm Identities</h3>
              <p className="text-gray-400">
                Region → Origin → Class → Identity
              </p>
            </div>
          </div>

          <div>
            <div className="text-2xl tracking-normal text-white mb-4"><span style={{ fontWeight: 700 }}>INTRINSICS</span> <span style={{ fontWeight: 300 }}>ONTOLOGY</span></div>
            <div className="p-8 bg-black/50 backdrop-blur border border-zinc-800 rounded-lg">
              <div className="text-5xl mb-4" style={{ color: '#86754f' }}>18</div>
              <h3 className="text-2xl mb-4">Feature Branches</h3>
              <p className="text-gray-400">
                Feature → Property → Phenotype
              </p>
            </div>
          </div>

          <div>
            <div className="text-2xl tracking-normal text-white mb-4"><span style={{ fontWeight: 700 }}>PATHOGNOMONICS</span> <span style={{ fontWeight: 300 }}>ONTOLOGY</span></div>
            <div className="p-8 bg-black/50 backdrop-blur border border-zinc-800 rounded-lg">
              <div className="text-5xl mb-4" style={{ color: '#86754f' }}>7</div>
              <h3 className="text-2xl mb-4">Diagnostic Domains</h3>
              <p className="text-gray-400">
                Pattern → Criteria → Combined Phenotypes
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <button className="px-12 py-4 border border-white hover:bg-white hover:text-black transition-all rounded-xl">
            Explore the Taxonomy
          </button>
        </div>
      </div>
    </section>
  );
}
