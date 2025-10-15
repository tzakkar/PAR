import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/print.css'
import { Navbar } from '@/components/Navbar'
import { I18nProvider } from '@/components/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PAR Builder - Project Approval Request Builder',
  description: 'Create professional Project Approval Requests with bilingual support (English/Arabic) and RTL layout.',
  keywords: 'PAR, Project Approval Request, document builder, bilingual, Arabic, RTL',
  authors: [{ name: 'PAR Builder Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>{children}</main>
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
