'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BadgeCheck, Clock, Plus, Check, Star } from 'lucide-react'
import { gigs, gigTabs, type Gig, type GigTab } from '@/lib/pipull-data'
import { Avatar } from './avatar'

function GigCard({
  gig,
  inTray,
  onBook,
}: {
  gig: Gig
  inTray: boolean
  onBook: (g: Gig) => void
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={gig.image || '/placeholder.svg'}
          alt={gig.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
          <Clock className="size-3.5 text-brand" />
          {gig.turnaround}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <Avatar name={gig.provider} color={gig.avatarColor} className="size-7 text-[11px]" />
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            {gig.provider}
            {gig.verified && <BadgeCheck className="size-3.5 text-verified" />}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-foreground">
            <Star className="size-3.5 fill-brand text-brand" />
            {gig.rating} <span className="font-normal text-muted-foreground">({gig.reviews})</span>
          </span>
        </div>

        <h3 className="mt-3 text-pretty font-semibold text-foreground">
          {gig.title}
        </h3>
        <p className="text-xs text-muted-foreground">{gig.providerSkill}</p>

        <ul className="mt-3 space-y-1.5">
          {gig.inclusions.map((inc) => (
            <li key={inc} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-verified" />
              <span className="text-pretty">{inc}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <span className="text-xs text-muted-foreground">Starting at</span>
            <p className="text-lg font-bold text-foreground">${gig.price}</p>
          </div>
          <button
            type="button"
            onClick={() => onBook(gig)}
            disabled={inTray}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              inTray
                ? 'cursor-default bg-verified/10 text-verified'
                : 'bg-brand text-brand-foreground hover:opacity-90'
            }`}
          >
            {inTray ? (
              <>
                <Check className="size-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="size-4" />
                Book Gig
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export function GigMarketplace({
  trayIds,
  onBook,
}: {
  trayIds: string[]
  onBook: (g: Gig) => void
}) {
  const [activeTab, setActiveTab] = useState<GigTab>('popular')
  const filtered = gigs.filter((g) => g.tab === activeTab)

  return (
    <section id="gigs" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Gig Marketplace
            </p>
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">
              Book a gig in a few taps
            </h2>
            <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
              Transparent pricing, clear turnaround times, and everything that&apos;s
              included — no surprises.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 inline-flex rounded-xl border border-border bg-surface p-1">
          {gigTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              inTray={trayIds.includes(gig.id)}
              onBook={onBook}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
