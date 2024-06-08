import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mangaverse',
  description: 'Find the manga you deserve',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/Konoha-logo.jpg" type="image/jpeg" />
      {/* <body >{children}</body> */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}
