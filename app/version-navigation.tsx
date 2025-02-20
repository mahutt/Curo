'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const versions = ['v1', 'v2', 'v3']

export default function VersionNavigation() {
  const pathname = usePathname()
  return (
    <nav className="flex space-x-4">
      {versions.map((version) => (
        <Link
          key={version}
          href={`/${version}`}
          passHref
          className={`${
            pathname === `/${version}` ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          {version}
        </Link>
      ))}
    </nav>
  )
}
