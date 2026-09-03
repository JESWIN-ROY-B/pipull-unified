'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep the error boundary intentionally quiet in production while allowing local debugging.
    if (process.env.NODE_ENV !== 'production') console.error('PiPull runtime error', error)
  }, [error])

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-6">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-100 text-amber-700"><AlertTriangle className="size-7" /></div>
        <h1 className="mt-5 text-2xl font-bold">PiPull needs a quick refresh</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Something interrupted this screen. Your account and payment information were not changed.</p>
        <button type="button" onClick={() => reset()} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-brand-foreground"><RefreshCw className="size-4" /> Try again</button>
      </section>
    </main>
  )
}
