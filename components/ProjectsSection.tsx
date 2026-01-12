import type { Project } from '@/types'
import ProjectCard from '@/components/ProjectCard'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="projects-section relative py-32 z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-noir-accent text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-bold text-gradient">
            Projects
          </h2>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}