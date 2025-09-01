import type { Metadata } from 'next'
import './globals.css'
import { AmplitudeProvider } from '@/components/AmplitudeProvider'

export const metadata: Metadata = {
  title: 'Sagars Cafe - Online Menu',
  description: 'Authentic Sagars Cafe cuisine with fresh ingredients. Explore our delicious menu with traditional flavors and modern presentation.',
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
