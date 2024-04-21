import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'

export const metadata: Metadata = { 
  title: 'hireFest',
  description: 'The offical hireFest website.',
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar/>
        <RegisterModal/>
        <LoginModal/>
        {children}
      </body>
    </html>
  )
}
