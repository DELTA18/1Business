'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  const navSession = useSession()
  const proflink = session?.user ? `/profile/${session.user.googleId}` : '/profile'

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
          1Business
        </Link>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-white focus:outline-none"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Links */}
        <div
          className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 absolute md:static top-[72px] left-0 w-full md:w-auto bg-white/10 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-0 border-t md:border-none border-white/10 px-6 py-6 md:p-0 transition-all duration-300 ease-in-out ${
            open ? 'flex' : 'hidden md:flex'
          }`}
        >
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-lg font-medium text-white hover:text-cyan-400 transition duration-200 ${
                pathname === href ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Auth Section */}
          <div className="flex flex-col md:flex-row gap-4 md:ml-6 mt-4 md:mt-0 w-full md:w-auto">
            {!session?.user ? (
              <button
                onClick={() => signIn('google')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium px-5 py-2 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-200"
              >
                Sign in with Google
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link href={proflink} className="flex items-center gap-2">
                  <img
                    src={session.user.image || '/default-profile.png'}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover border border-white"
                  />
                  <span className="text-white font-medium">Hello, {session.user.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium px-4 py-2 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-200"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
