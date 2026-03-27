interface SubpageHeroProps {
  title: string;
  subtitle: string;
  tagline: string;
  titleClassName?: string;
}

export function SubpageHero({ title, subtitle, tagline, titleClassName }: SubpageHeroProps) {
  return (
    <section className="relative w-full flex items-center justify-center bg-black pt-32 pb-20" style={{ minHeight: '45vh' }}>
      {/* Subtle grid */}
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

      <div className="relative z-10 text-center px-8">
        <div className="text-sm tracking-widest text-gray-400 mb-6">{subtitle.toUpperCase()}</div>
        <h1 className={`text-6xl md:text-7xl tracking-tight mb-6 ${titleClassName || ''}`}>
          {title}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {tagline}
        </p>
      </div>
    </section>
  );
}
