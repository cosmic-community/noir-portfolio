import type { SocialLink } from '@/types'

interface ContactSectionProps {
  email: string
  socialLinks: SocialLink[]
}

export default function ContactSection({ email, socialLinks }: ContactSectionProps) {
  return (
    <section className="contact-section relative min-h-screen flex items-center justify-center px-6 py-32 z-10">
      <div className="contact-content max-w-2xl mx-auto text-center">
        <span className="text-noir-accent text-sm uppercase tracking-[0.3em] font-medium mb-8 block">
          Get in Touch
        </span>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-bold text-gradient mb-8">
          Let's Create Together
        </h2>

        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-block text-xl md:text-2xl text-white/80 hover:text-noir-accent transition-colors duration-300 mb-12 magnetic-hover"
          >
            {email}
          </a>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center gap-8 flex-wrap">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-noir-accent transition-colors duration-300 text-sm uppercase tracking-wider magnetic-hover"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}

        {/* Final decorative element */}
        <div className="mt-24 flex justify-center">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-noir-accent/50 to-transparent" />
        </div>
      </div>

      {/* Fade to darker background */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  )
}