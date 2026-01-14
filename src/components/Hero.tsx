import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import logo from 'figma:asset/1e6c52ff2697aaf9588fe0f4bb5bc6992fca671a.png';

export function Hero() {
  const [showNav, setShowNav] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 30, y: 40 });

  useEffect(() => {
    const handleScroll = () => {
      // Show nav when scrolled past the first screen (hero logo section)
      setShowNav(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Generate smooth, organic movement path
    const animate = () => {
      const duration = 10000 + Math.random() * 5000; // 10-15 seconds per movement
      
      // Generate next position with gentle constraints
      const nextX = 20 + Math.random() * 60; // Keep glow within 20-80% of screen
      const nextY = 20 + Math.random() * 60;
      
      setGlowPosition({ x: nextX, y: nextY });
      
      setTimeout(animate, duration);
    };
    
    animate();
  }, []);

  return (
    <>
      {/* Fixed Navigation - Fades in on scroll */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/90 backdrop-blur-sm transition-opacity duration-500 ${showNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center">
          <div className="text-xl tracking-tight"><span style={{ fontWeight: 700 }}>CARDIO</span><span style={{ fontWeight: 300 }}>LOGIC∆</span></div>
        </div>
        <div className="flex items-center gap-8">
          <button className="hover:text-gray-300 transition-colors">Overview</button>
          <button className="hover:text-gray-300 transition-colors">Technology</button>
          <button className="hover:text-gray-300 transition-colors">Research</button>
          <button className="hover:text-gray-300 transition-colors">Support</button>
          <button className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all">
            Access Platform
          </button>
        </div>
      </nav>

      {/* Initial Hero - Just Logo */}
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
        
        {/* Drifting gold glow - smaller and smoother */}
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
          {/* Logo - simple fade in */}
          <motion.img 
            src={logo} 
            alt="Cardiologica" 
            className="w-auto h-[68rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.5
            }}
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

      {/* Tagline Reveal Section */}
      <section className="relative h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center px-8">
          <h1 className="tracking-tight" style={{ fontSize: '3.375rem' }}>
            Deterministic, first-principles electrocardiography.
          </h1>
        </div>
      </section>
    </>
  );
}