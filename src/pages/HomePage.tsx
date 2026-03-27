import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import logo from 'figma:asset/1e6c52ff2697aaf9588fe0f4bb5bc6992fca671a.png';
import { Heartbeat, Brain, GraduationCap } from '@phosphor-icons/react';

const products = [
  {
    icon: <Heartbeat size={48} weight="light" color="#86754f" />,
    name: 'CARDIOLOGICA-DX',
    subtitle: 'Clinical ECG Interpretation Engine',
    description: 'Deterministic rhythm classification. 87.9% overall accuracy. 100% VT/VF detection. Built for FDA 510(k).',
    path: '/cardiologica-dx',
  },
  {
    icon: <Brain size={48} weight="light" color="#86754f" />,
    name: 'CARDIOLOGICA-AI',
    subtitle: 'Synthetic ECG Training Data Platform',
    description: 'Construction-guaranteed labels. Unlimited volume. Zero annotator disagreement. Proven +7.5 F1 augmentation lift.',
    path: '/cardiologica-ai',
  },
  {
    icon: <GraduationCap size={48} weight="light" color="#86754f" />,
    name: 'CORDIS-DX',
    subtitle: 'Interactive ECG Education Simulator',
    description: 'Build any rhythm. Layer any condition. See it on any monitor. 35 identities. 50+ conduction features. 48 diagnostic patterns.',
    path: '/cordis-dx',
  },
];

export function HomePage() {
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
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Hero - Full viewport, same as original */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
        {/* Tight grid overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000000 1px, transparent 1px),
              linear-gradient(to bottom, #000000 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            opacity: 0.4
          }}
        />

        {/* Drifting gold glow */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'blur(60px)' }}
          animate={{
            background: `radial-gradient(ellipse 40% 40% at ${glowPosition.x}% ${glowPosition.y}%,
              rgba(134, 117, 77, 0.25) 0%,
              rgba(134, 117, 77, 0.15) 30%,
              transparent 70%)`
          }}
          transition={{
            duration: 12.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />

        <div className="relative z-10">
          <motion.img
            src={logo}
            alt="Cardiologica"
            className="w-auto h-[68rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Tagline Reveal */}
      <section className="relative h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center px-8">
          <h1 className="tracking-tight" style={{ fontSize: '3.04rem' }}>
            Deterministic, first-principles electrocardiography.
          </h1>
        </div>
      </section>

      {/* Product Cards Section */}
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

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-sm tracking-widest text-gray-400 mb-4">PRODUCTS</div>
            <h2 className="text-5xl mb-6">
              Three Engines. One Framework.
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built on the same deterministic taxonomy. Deployed for different missions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.path}
                className="p-8 bg-black border border-zinc-800 hover:border-zinc-700 transition-all group rounded-lg flex flex-col"
              >
                <div className="text-5xl mb-6">{product.icon}</div>
                <h3 className="text-2xl mb-2">{product.name}</h3>
                <div className="text-sm text-gray-500 mb-4">{product.subtitle}</div>
                <p className="text-gray-400 mb-8 flex-1">{product.description}</p>
                <Link
                  to={product.path}
                  className="inline-block px-8 py-2 text-sm rounded transition-all text-white hover:opacity-90 text-center"
                  style={{ background: 'linear-gradient(135deg, #86754f 0%, #5c5035 100%)' }}
                >
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About SARC Section */}
      <section className="relative py-32 px-8 bg-black">
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-sm tracking-widest text-gray-400 mb-4">COMPANY</div>
          <h2 className="text-5xl mb-8">About SARC</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Service-Disabled Veteran-Owned Small Business. Three provisional patents. Built by clinicians for clinicians. Every line of code is written by someone who has used cardiac monitors at the bedside, in the back of an ambulance, and on the battlefield.
          </p>

          {/* Patent cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12 text-sm">
            <div className="p-6 border border-zinc-800 rounded-lg">
              <div className="text-white mb-1">Cardiologica Framework</div>
              <div style={{ color: '#86754f' }} className="text-xs">Patent Pending 63/927,475</div>
              <div className="text-gray-500 text-xs">November 29, 2025</div>
            </div>
            <div className="p-6 border border-zinc-800 rounded-lg">
              <div className="text-white mb-1">Cardiologica-DX</div>
              <div style={{ color: '#86754f' }} className="text-xs">Patent Pending 63/912,035</div>
              <div className="text-gray-500 text-xs">November 5, 2025</div>
            </div>
            <div className="p-6 border border-zinc-800 rounded-lg">
              <div className="text-white mb-1">Cardiologica-AI</div>
              <div style={{ color: '#86754f' }} className="text-xs">Patent Pending 63/943,976</div>
              <div className="text-gray-500 text-xs">December 18, 2025</div>
            </div>
          </div>

          <a
            href="mailto:devteam@cardiologica.med?subject=Cardiologica%20Inquiry"
            className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all"
          >
            Contact Research Team
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
