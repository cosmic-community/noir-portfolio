'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create volumetric cloud particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 500

    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      scales[i] = Math.random()
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    // Custom shader material for glow effect
    const particlesMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        attribute float aScale;
        varying float vScale;
        
        void main() {
          vScale = aScale;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aScale * 80.0 * (1.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying float vScale;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.15 * vScale;
          
          vec3 color = mix(
            vec3(0.788, 0.663, 0.384),
            vec3(0.4, 0.35, 0.6),
            vScale
          );
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Add soft ambient glow spheres
    const glowGeometry = new THREE.SphereGeometry(2, 32, 32)
    const glowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.788, 0.663, 0.384, intensity * 0.1);
        }
      `,
    })

    const glow1 = new THREE.Mesh(glowGeometry, glowMaterial)
    glow1.position.set(-3, 2, -5)
    scene.add(glow1)

    const glow2 = new THREE.Mesh(glowGeometry, glowMaterial.clone())
    glow2.position.set(4, -1, -7)
    glow2.scale.setScalar(1.5)
    scene.add(glow2)

    let scrollY = 0

    const handleScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.0001

      // Rotate particles slowly
      particles.rotation.y = time * 0.5
      particles.rotation.x = time * 0.3

      // Move camera based on scroll
      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight)
      camera.position.y = -scrollProgress * 3
      camera.position.z = 5 - scrollProgress * 2

      // Animate glow positions
      glow1.position.y = 2 + Math.sin(time * 10) * 0.5
      glow2.position.x = 4 + Math.cos(time * 8) * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)
      
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}