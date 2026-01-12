'use client'

interface HeroSectionProps {
  name: string
  tagline: string
}

export default function HeroSection({ name, tagline }: HeroSectionProps) {
  const nameChars = name.split('')

  return (
    <section className="hero-section relative min-h-screen flex flex-col items-center justify-center px-6 z-10">
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="hero-name font-editorial text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8">
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="char inline-block text-gradient will-change-transform"
              style={{ opacity: 0 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        
        <p
          className="hero-tagline text-lg md:text-xl lg:text-2xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed"
          style={{ opacity: 0 }}
        >
          {tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Decorative parallax elements */}
      <div className="parallax-slow absolute top-1/4 left-10 w-2 h-2 bg-noir-accent/30 rounded-full blur-sm" />
      <div className="parallax-fast absolute top-1/3 right-20 w-3 h-3 bg-noir-accent/20 rounded-full blur-md" />
      <div className="parallax-slow absolute bottom-1/3 left-1/4 w-1 h-1 bg-white/20 rounded-full" />
    </section>
  )
}