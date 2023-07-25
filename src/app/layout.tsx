import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Background Eraser',
  description: 'Simple tool to erase background of any images',
  keywords: ['tool', 'image', 'erase', 'background erase'],
  authors: [
    {
      name: 'Mateus Felipe Gonçalves',
      url: 'https://mateusf.com'
    }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
