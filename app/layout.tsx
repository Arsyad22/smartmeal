import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SmartMeal Planner",
  description: "Plan your meals. Stay healthy. Save time.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
