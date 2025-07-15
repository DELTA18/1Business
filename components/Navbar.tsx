'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  const session: Session | null = null
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          1Business
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-gray-700 hover:text-blue-600 transition ${
                pathname === item.href ? 'font-semibold text-blue-600' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="space-x-4">
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Login
          </Link>
          <button
            onClick={() => signIn('google')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in with Google
          </button>

          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >Signout </button>
        </div>
      </div>
    </nav>
  )
}
