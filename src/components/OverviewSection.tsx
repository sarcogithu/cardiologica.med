import { useEffect, useRef, useState } from 'react';

export function OverviewSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.4;

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      const fadeTime = 1.5; // seconds to fade in/out

      if (currentTime < fadeTime) {
        // Fade in
        setVideoOpacity(currentTime / fadeTime);
      } else if (currentTime > duration - fadeTime) {
        // Fade out
        setVideoOpacity((duration - currentTime) / fadeTime);
      } else {
        setVideoOpacity(1);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
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

          {/* Right side - Video */}
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-lg transition-opacity duration-300"
              style={{ opacity: videoOpacity * 0.9 }}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            {/* Vignette overlay */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 50% 50% at center, transparent 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%)'
              }}
            />
          </div>
        </div>
      </div>

    </section>
  );
}
