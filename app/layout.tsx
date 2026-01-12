import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/cosmic'
import CosmicBadge from '@/components/CosmicBadge'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  return {
    title: settings?.metadata?.name ? `${settings.metadata.name} — Portfolio` : 'Noir Portfolio',
    description: settings?.metadata?.tagline || 'A cinematic portfolio experience',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  const bgStart = settings?.metadata?.bg_color_start || '#0a0a0f'
  const bgEnd = settings?.metadata?.bg_color_end || '#1a1a2e'
  const accent = settings?.metadata?.accent_color || '#c9a962'

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
        <style dangerouslySetInnerHTML={{
          __html: `:root { --bg-start: ${bgStart}; --bg-end: ${bgEnd}; --accent: ${accent}; }`
        }} />
      </head>
      <body className="antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}