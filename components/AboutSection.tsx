interface AboutSectionProps {
  aboutText: string
}

export default function AboutSection({ aboutText }: AboutSectionProps) {
  return (
    <section className="about-section relative min-h-screen flex items-center justify-center px-6 py-32 z-10">
      <div className="about-content max-w-3xl mx-auto text-center">
        <span className="text-noir-accent text-sm uppercase tracking-[0.3em] font-medium mb-8 block">
          About
        </span>
        
        <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light leading-relaxed">
          {aboutText}
        </p>
      </div>

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="parallax-slow absolute top-1/2 left-0 w-96 h-96 bg-noir-accent/5 rounded-full blur-3xl transform -translate-x-1/2" />
        <div className="parallax-fast absolute bottom-1/4 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2" />
      </div>
    </section>
  )
}