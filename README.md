# Noir Portfolio

![Noir Portfolio](https://imgix.cosmicjs.com/c3ae80c0-ef79-11f0-b6f7-17a0a54d0877-photo-1534996858221-380b92700493-1768196669867.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A cinematic, scroll-driven portfolio experience that transforms your work into an immersive digital art exhibition. Built with Next.js 16, Three.js for WebGL backgrounds, and GSAP for buttery-smooth scroll animations.

## Features

- 🎬 **Full-screen WebGL Canvas** — Volumetric clouds and soft glow effects
- 📜 **Scroll-Driven Storytelling** — Timeline-based animations via GSAP ScrollTrigger
- ✨ **Parallax Depth** — Multi-layered movement at different speeds
- 🔤 **Cinematic Typography** — Letter-by-letter heading reveals
- 🎨 **Dynamic Theming** — Colors pulled from Cosmic CMS site settings
- 📱 **Responsive Design** — Desktop-first with mobile optimization
- 🖼️ **Film Grain Overlay** — Subtle texture for premium aesthetic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=696489ae40088e3d769697a2&clone_repository=69648bc240088e3d769697c8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "🎨 PROJECT BRIEF
>
> Build a high-end personal portfolio website inspired by the Shopify Winter 2026 Editions experience.
>
> The website should feel like a cinematic, interactive digital art experience, not a normal portfolio.
>
> 🧠 CORE DESIGN PHILOSOPHY
>
> Editorial, cinematic, and immersive
>
> Scroll-driven storytelling
>
> Renaissance-meets-futurism aesthetic
>
> Minimal UI layered over rich animated visuals
>
> Premium tech-company launch vibe
>
> 🖼️ VISUAL STYLE
>
> Dark, atmospheric background with soft gradients
>
> Large, dramatic typography (editorial style)
>
> High contrast between text and background
>
> Gold / warm accent tones used sparingly
>
> Layered visuals creating depth (foreground, midground, background)
>
> Subtle grain / film texture overlay
>
> No bright colors, no flat UI, no cartoon style
>
> 🎞️ ANIMATION & INTERACTION (CRITICAL)
>
> Implement continuous, smooth animations tied to scroll position:
>
> Scroll Behavior
>
> Scrolling controls the entire experience (scroll = timeline)
>
> Parallax movement at different speeds for layered elements
>
> Background visuals move slower than foreground text
>
> Smooth inertia scrolling (luxury feel)
>
> Canvas / Graphics Layer
>
> A full-screen WebGL / Canvas background
>
> Abstract shapes, soft clouds, or volumetric light
>
> Subtle glow and shader-like distortion effects
>
> Camera movement synced with scroll
>
> No visible FPS drops
>
> UI Animations
>
> Text fades in + slight vertical motion
>
> Headings animate letter-by-letter or word-by-word
>
> Images gently float or drift
>
> Hover interactions feel soft and magnetic
>
> Buttons have smooth hover glow, not sharp transitions
>
> 🧱 PAGE STRUCTURE (SINGLE PAGE EXPERIENCE)
> 1️⃣ Hero Section
>
> Full-screen immersive opening
>
> Large name in bold editorial typography
>
> Short tagline (1 line max)
>
> Animated background already active
>
> No call-to-action buttons initially
>
> 2️⃣ About Section
>
> Appears through scroll transition
>
> Text slides in slowly from depth
>
> Background animation subtly changes tone
>
> Keep text minimal and powerful
>
> 3️⃣ Work / Projects Section
>
> Each project revealed one by one via scroll
>
> Projects feel like "chapters"
>
> Image + title + short description
>
> Hover causes image distortion or light bloom
>
> 4️⃣ Skills / Philosophy
>
> Minimal text
>
> Abstract visuals continue behind content
>
> Focus on storytelling, not bullet lists
>
> 5️⃣ Contact Section
>
> Calm ending
>
> Smooth fade to darker background
>
> Simple contact info
>
> Elegant final animation
>
> 🧰 TECHNICAL REQUIREMENTS
>
> Use WebGL / Three.js / Canvas for background visuals
>
> Use GSAP + ScrollTrigger or equivalent for animations
>
> UI layered above canvas using HTML/CSS
>
> Smooth scrolling with inertia
>
> Fully responsive (desktop first, mobile optimized)
>
> High performance (lazy loading, optimized assets)
>
> 🚫 STRICT AVOID
>
> No template-looking sections
>
> No basic fade-only animations
>
> No visible page jumps
>
> No harsh colors
>
> No generic portfolio layout
>
> No Shopify branding or copied assets
>
> 🎯 FINAL GOAL
>
> The website should feel like:
>
> "A tech launch + digital art exhibition + personal story"
>
> Users should want to scroll slowly, not rush."

### Code Generation Prompt

> "Based on the content model I created for the cinematic portfolio, now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **WebGL**: [Three.js](https://threejs.org/) for canvas backgrounds
- **Animation**: [GSAP](https://gsap.com/) with ScrollTrigger
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3.4
- **CMS**: [Cosmic](https://www.cosmicjs.com/docs)
- **Typography**: Inter font family
- **Language**: TypeScript with strict mode

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with bucket credentials

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd noir-portfolio

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your Cosmic credentials to .env.local

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the experience.

## Cosmic SDK Examples

### Fetching Site Settings

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .findOne({ type: 'site-settings', slug: 'site-settings' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const settings = response.object
```

### Fetching Projects

```typescript
const response = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const projects = response.objects.sort(
  (a, b) => (a.metadata?.display_order || 0) - (b.metadata?.display_order || 0)
)
```

## Cosmic CMS Integration

This application uses two Object Types from your Cosmic bucket:

### Site Settings (Singleton)
- **name**: Your display name for the hero
- **tagline**: One-line descriptor
- **about_text**: Biography (2-3 sentences)
- **philosophy**: Creative manifesto
- **contact_email**: Contact information
- **social_links**: JSON array of social profiles
- **bg_color_start / bg_color_end**: Gradient colors
- **accent_color**: Gold highlight color

### Projects
- **title / subtitle**: Project naming
- **description**: Evocative project summary
- **featured_image**: Dramatic project visual
- **project_url**: External link
- **year / category**: Metadata
- **display_order**: Scroll sequence position

## Deployment Options

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

### Netlify

```bash
# Build command
bun run build

# Publish directory
.next
```

Add environment variables in Netlify site settings.

<!-- README_END -->