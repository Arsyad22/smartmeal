"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'

export default function Navigation() {
  const { user } = useUser();
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/discover", label: "Discover" },
    { href: "/my-plan", label: "My Plan" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            SmartMeal
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex space-x-4 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn-secondary text-sm">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-primary text-sm">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <span className="font-medium text-gray-700 mr-2">
                {user?.firstName ? `Hi, ${user.firstName}` : user?.username || 'Account'}
              </span>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}
