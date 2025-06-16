import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SmartMeal Planner',
  description: 'Plan your meals. Stay healthy. Save time.',
  generator: 'v0.dev',
}

import SyncUserToFirestoreClient from "@/components/SyncUserToFirestoreClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen`}>
          <SyncUserToFirestoreClient />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
