interface PhilosophySectionProps {
  philosophy: string
}

export default function PhilosophySection({ philosophy }: PhilosophySectionProps) {
  if (!philosophy) return null

  return (
    <section className="philosophy-section relative min-h-screen flex items-center justify-center px-6 py-32 z-10">
      <div className="philosophy-content max-w-4xl mx-auto text-center">
        <span className="text-noir-accent text-sm uppercase tracking-[0.3em] font-medium mb-8 block">
          Philosophy
        </span>
        
        <blockquote className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed italic">
          "{philosophy}"
        </blockquote>
      </div>

      {/* Abstract background element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="parallax-slow absolute top-1/3 right-1/4 w-80 h-80 border border-white/5 rounded-full" />
        <div className="parallax-fast absolute bottom-1/4 left-1/3 w-48 h-48 border border-noir-accent/10 rounded-full" />
      </div>
    </section>
  )
}