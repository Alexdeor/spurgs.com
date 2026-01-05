import './globals.css'

import Header from '../components/Header'
import { ReactNode } from 'react'
import AuthProvider from '../components/AuthProvider'

export const metadata = {
  title: 'Spurgs Video Site',
  description: 'YouTube-style app in Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <AuthProvider>
                 <Header />
          <main className="p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
