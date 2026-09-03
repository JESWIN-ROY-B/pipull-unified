'use client'

import { useEffect, useRef, useState } from 'react'
import {
  MapPin,
  ChevronDown,
  Search,
  Bell,
  ShoppingBag,
  Briefcase,
  Users,
  Newspaper,
} from 'lucide-react'
import { PipullLogo } from './logo'
import { Avatar } from './avatar'

type SearchMode = 'gigs' | 'talent'

export function Header({
  cartCount,
  onCartClick,
}: {
  cartCount: number
  onCartClick: () => void
}) {
  const [searchMode, setSearchMode] = useState<SearchMode>('gigs')
  const [query, setQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement
      const typing =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
      if (e.key === '/' && !typing) {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const navLinks = [
    { label: 'Discover Gigs', href: '#gigs', icon: Briefcase },
    { label: 'Campus Feed', href: '#feed', icon: Newspaper },
    { label: 'Top Skilled Students', href: '#talent', icon: Users },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: logo + location */}
        <div className="flex items-center gap-3">
          <a href="#top" aria-label="Pipull home">
            <PipullLogo />
          </a>
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:bg-accent lg:flex"
          >
            <MapPin className="size-4 text-brand" />
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
                Campus
              </span>
              <span>North Campus • Main Quad</span>
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
        </div>

        {/* Center: universal search */}
        <div className="relative mx-auto hidden max-w-xl flex-1 md:block">
          <div className="flex items-center overflow-hidden rounded-xl border border-border bg-surface focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
            <div className="flex shrink-0 border-r border-border p-1">
              <button
                type="button"
                onClick={() => setSearchMode('gigs')}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  searchMode === 'gigs'
                    ? 'bg-brand text-brand-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Gigs
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('talent')}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  searchMode === 'talent'
                    ? 'bg-brand text-brand-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Talent
              </button>
            </div>
            <Search className="ml-3 size-4 shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                searchMode === 'gigs'
                  ? 'Search services & gigs…'
                  : 'Search student talent & profiles…'
              }
              className="w-full bg-transparent px-2 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <kbd className="mr-3 hidden shrink-0 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:block">
              /
            </kbd>
          </div>
        </div>

        {/* Right: nav + actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onCartClick}
            className="relative rounded-lg p-2 text-foreground transition-colors hover:bg-accent"
            aria-label={`Active bookings, ${cartCount} in tray`}
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="relative rounded-lg p-2 text-foreground transition-colors hover:bg-accent"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-verified ring-2 ring-background" />
          </button>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full p-0.5 transition-colors hover:bg-accent"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
            >
              <Avatar name="Jamie Park" color="#2563eb" className="size-8 text-xs" />
              <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
            </button>
            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-md"
              >
                <div className="flex items-center gap-3 border-b border-border p-3">
                  <Avatar name="Jamie Park" color="#2563eb" className="size-10 text-sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      Jamie Park
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      Design • Class of &apos;26
                    </p>
                  </div>
                </div>
                <ul className="p-1 text-sm">
                  {['My Profile', 'My Gigs', 'Earnings', 'Settings', 'Sign out'].map(
                    (item) => (
                      <li key={item}>
                        <button
                          type="button"
                          role="menuitem"
                          className="w-full rounded-lg px-3 py-2 text-left text-foreground transition-colors hover:bg-accent"
                        >
                          {item}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
