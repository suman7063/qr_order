import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'South Indian Kitchen - Online Menu',
  description: 'Authentic South Indian cuisine with fresh ingredients. Explore our delicious menu with traditional flavors and modern presentation.',
  keywords: 'South Indian food, restaurant, menu, authentic cuisine, dosa, idly, biryani',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
