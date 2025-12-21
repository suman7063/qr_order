import type { Metadata } from 'next'
import './globals.css'
import { AmplitudeProvider } from '@/components/AmplitudeProvider'

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || 'Restaurant';

export const metadata: Metadata = {
  title: `${projectName} - Online Menu`,
  description: `Authentic ${projectName} cuisine with fresh ingredients. Explore our delicious menu with traditional flavors and modern presentation.`,
  keywords: 'South Indian food, restaurant, menu, authentic cuisine, dosa, idly, biryani',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AmplitudeProvider>
          {children}
        </AmplitudeProvider>
      </body>
    </html>
  )
}
