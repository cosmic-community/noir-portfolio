'use client'

import { useState } from 'react'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const metadata = project.metadata
  if (!metadata) return null

  const isEven = index % 2 === 0
  const image = metadata.featured_image

  return (
    <article
      className={`project-item flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="w-full lg:w-3/5 relative overflow-hidden rounded-lg">
        <div 
          className={`aspect-[16/10] overflow-hidden transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
        >
          {image && (
            <img
              src={`${image.imgix_url}?w=1200&h=750&fit=crop&auto=format,compress`}
              alt={metadata.title || project.title}
              width={600}
              height={375}
              className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'brightness-110 saturate-110' : 'brightness-100'}`}
              loading="lazy"
            />
          )}
          
          {/* Hover glow overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-noir-accent/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      {/* Content */}
      <div className={`w-full lg:w-2/5 ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          {metadata.category && (
            <span className="text-noir-accent text-xs uppercase tracking-[0.2em] font-medium">
              {metadata.category.value}
            </span>
          )}
          {metadata.year && (
            <span className="text-white/40 text-xs">
              {metadata.year}
            </span>
          )}
        </div>

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-editorial font-bold text-white mb-2">
          {metadata.title || project.title}
        </h3>
        
        {metadata.subtitle && (
          <p className="text-white/60 text-lg mb-4">
            {metadata.subtitle}
          </p>
        )}

        {metadata.description && (
          <p className="text-white/70 leading-relaxed mb-6">
            {metadata.description}
          </p>
        )}

        {metadata.project_url && (
          <a
            href={metadata.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-noir-accent hover:text-white transition-colors duration-300 group"
          >
            <span className="text-sm uppercase tracking-[0.15em] font-medium">
              View Project
            </span>
            <svg 
              className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}