'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const noNavbarRoutes = ['/register', '/login']
    console.log(pathname);
  return (
    <>
      {!noNavbarRoutes.some((route) => pathname.startsWith(route)) && <Navbar />}
      {children}
    </>
  )
}
