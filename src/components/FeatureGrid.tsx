import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TreeStructure, Lightning, Atom, GearSix, Waveform, ShieldCheck } from '@phosphor-icons/react';

const features = [
  {
    icon: <Lightning size={48} weight="light" color="#86754f" />,
    title: 'Real-Time Signal Processing',
    description: 'Sub-second rhythm classification with advanced signal processing techniques.'
  },
  {
    icon: <Atom size={48} weight="light" color="#86754f" />,
    title: 'First-Principles Analysis',
    description: 'No neural networks, pure electrophysiologic reasoning derived from clinical cardiology principles.'
  },
  {
    icon: <GearSix size={48} weight="light" color="#86754f" />,
    title: 'Deterministic Analysis',
    description: 'Same input always produces same output. Fully reproducible, fully auditable.'
  },
  {
    icon: <TreeStructure size={48} weight="light" color="#86754f" style={{ transform: 'rotate(90deg)' }} />,
    title: 'Universal Taxonomy',
    description: '35 canonical rhythm identities (ROCI) mapped to ICD-10 codes.'
  },
  {
    icon: <Waveform size={48} weight="light" color="#86754f" />,
    title: 'Signal Decomposition',
    description: 'Multi-domain signal analysis for robust feature extraction.'
  },
  {
    icon: <ShieldCheck size={48} weight="light" color="#86754f" />,
    title: 'Clinical-Grade Security',
    description: 'HIPAA-ready architecture designed for FDA 510(k) SaMD pathway (Class II).'
  }
];

export function FeatureGrid() {
  const [glowPosition, setGlowPosition] = useState({ x: 30, y: 40 });

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

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-sm tracking-widest text-gray-400 mb-4">PRECISION ENGINEERING</div>
          <h2 className="text-5xl mb-6">
            Engineered for Precision and Transparency
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Logic you can trace. Decisions you can defend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-black border border-zinc-800 hover:border-zinc-700 transition-all group rounded-lg"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
