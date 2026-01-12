'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollController() {
  useEffect(() => {
    // Hero section animations
    gsap.fromTo(
      '.hero-name .char',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.5,
      }
    )

    gsap.fromTo(
      '.hero-tagline',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.5,
      }
    )

    // About section scroll animation
    gsap.fromTo(
      '.about-content',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    )

    // Projects section - each project animates individually
    gsap.utils.toArray<HTMLElement>('.project-item').forEach((project, index) => {
      gsap.fromTo(
        project,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      )
    })

    // Philosophy section parallax
    gsap.fromTo(
      '.philosophy-content',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.philosophy-section',
          start: 'top 75%',
          end: 'top 40%',
          scrub: 1,
        },
      }
    )

    // Contact section fade in
    gsap.fromTo(
      '.contact-content',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    )

    // Parallax for floating elements
    gsap.utils.toArray<HTMLElement>('.parallax-slow').forEach((el) => {
      gsap.to(el, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })
    })

    gsap.utils.toArray<HTMLElement>('.parallax-fast').forEach((el) => {
      gsap.to(el, {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}