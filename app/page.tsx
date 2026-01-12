import { getSiteSettings, getProjects } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import PhilosophySection from '@/components/PhilosophySection'
import ContactSection from '@/components/ContactSection'
import WebGLBackground from '@/components/WebGLBackground'
import ScrollController from '@/components/ScrollController'

export default async function HomePage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ])

  if (!settings) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">Loading experience...</p>
      </main>
    )
  }

  return (
    <main className="relative">
      <WebGLBackground />
      <ScrollController />
      
      <HeroSection
        name={settings.metadata?.name || 'Portfolio'}
        tagline={settings.metadata?.tagline || ''}
      />
      
      <AboutSection
        aboutText={settings.metadata?.about_text || ''}
      />
      
      <ProjectsSection projects={projects} />
      
      <PhilosophySection
        philosophy={settings.metadata?.philosophy || ''}
      />
      
      <ContactSection
        email={settings.metadata?.contact_email || ''}
        socialLinks={settings.metadata?.social_links || []}
      />
    </main>
  )
}