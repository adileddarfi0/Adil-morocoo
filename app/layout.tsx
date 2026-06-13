import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adil Morocoo',
  description: 'Welcome to my website',
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
