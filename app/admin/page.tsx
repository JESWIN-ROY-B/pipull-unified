'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, MapPin, TrendingUp } from 'lucide-react'

type Forecast = { trade: string; demand: number; workers: number; gap: number; locations: string[] }

export default function AdminPage() {
  const [forecast, setForecast] = useState<Forecast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/demand-forecast')
      .then((response) => response.json())
      .then((data) => setForecast(data.forecast ?? []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-dvh bg-background px-5 py-8 text-foreground sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">Pipull intelligence</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">Demand forecast</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">A live view of where verified talent is needed next, based on open job signals and worker supply.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground"><span className="size-2 rounded-full bg-verified" /> Updated just now</div>
        </header>

        {loading ? <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">Loading forecast...</div> : (
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {forecast.map((item) => (
              <article key={item.trade} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4"><div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand"><BriefcaseBusiness className="size-5" /></div><span className="inline-flex items-center gap-1 rounded-full bg-verified/10 px-2.5 py-1 text-xs font-semibold text-verified"><TrendingUp className="size-3.5" />{item.demand}% demand</span></div>
                <div><h2 className="text-xl font-bold">{item.trade}</h2><p className="mt-1 text-sm text-muted-foreground">{item.gap} more workers needed</p></div>
                <div className="flex items-center justify-between border-t border-border pt-4 text-sm"><span className="text-muted-foreground">Available talent</span><span className="font-bold">{item.workers}</span></div>
                <div className="flex flex-wrap gap-2">{item.locations.map((location) => <span key={location} className="inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3.5" />{location}</span>)}</div>
              </article>
            ))}
          </section>
        )}
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">Return to Pipull <ArrowUpRight className="size-4" /></a>
      </div>
    </main>
  )
}
