import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adil Morocoo',
  description: 'منصة اجتماعية احترافية',
  manifest: '/manifest.json',
  themeColor: '#00C853',
  icons: {
    icon: '/icon-512.png',
    apple: '/icon-512.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
