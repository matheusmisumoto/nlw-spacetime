import { ReactNode } from 'react'
import './globals.css'
import { Inter, Ubuntu } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
})

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-ubuntu',
})

export const metadata = {
  title: 'Live Notes',
  description: 'Aplicação desenvolvida em React + Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ubuntu.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
