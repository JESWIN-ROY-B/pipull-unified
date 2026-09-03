'use client'

import { ArrowRight, Sparkles, ShieldCheck, Star } from 'lucide-react'
import { categories } from '@/lib/pipull-data'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-brand" />
              The trusted campus economy platform
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Turn Campus Skills Into{' '}
              <span className="text-brand">Opportunity.</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Book trusted student peers for design, tutoring, event photography,
              or quick errands — safely and locally, all within your campus.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#gigs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                Post a Campus Gig
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#talent"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Offer Your Skills
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-verified" />
                .edu verified peers
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="size-4 fill-brand text-brand" />
                4.9 avg gig rating
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="font-semibold text-foreground">2,400+</span>
                gigs completed
              </span>
            </div>
          </div>

          {/* Visual stat panel */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Live on campus now
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-verified/10 px-2.5 py-1 text-xs font-semibold text-verified">
                  <span className="size-1.5 animate-pulse rounded-full bg-verified" />
                  Active
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-surface p-4">
                  <p className="text-2xl font-bold text-foreground">312</p>
                  <p className="text-xs text-muted-foreground">Open gigs today</p>
                </div>
                <div className="rounded-xl bg-surface p-4">
                  <p className="text-2xl font-bold text-brand">1.8k</p>
                  <p className="text-xs text-muted-foreground">Verified students</p>
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-border p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Escrow protected volume this week
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">$18,940</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-brand to-verified" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick category carousel */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Browse by category
            </h2>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <a
                  key={cat.id}
                  href="#gigs"
                  className="group flex min-w-[180px] flex-1 items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-sm"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {cat.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {cat.count} active gigs
                    </span>
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
