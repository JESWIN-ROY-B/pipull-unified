'use client'

import { useState } from 'react'
import { AlertTriangle, MapPin, Phone, X } from 'lucide-react'

export function PanicButton() {
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState<string | null>(null)

  function activate() {
    setOpen(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setLocation(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`),
        () => setLocation('Location unavailable — share your campus/building manually.'),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60_000 },
      )
    } else setLocation('Location unavailable — share your campus/building manually.')
  }

  return (
    <>
      <button type="button" onClick={activate} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2">
        <AlertTriangle className="size-4" /> Emergency help
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/50 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="panic-title">
          <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-red-700">High priority support</p>
                <h2 id="panic-title" className="mt-1 text-xl font-bold text-foreground">Are you in immediate danger?</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close emergency dialog" className="rounded-lg p-2 text-muted-foreground hover:bg-accent"><X className="size-5" /></button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">This MVP does not dispatch emergency services. If you are in immediate danger, call local emergency services now.</p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface p-3 text-sm text-foreground"><MapPin className="size-4 shrink-0 text-brand" /><span>{location ?? 'Requesting your approximate location…'}</span></div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href="tel:112" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-700"><Phone className="size-4" />Call 112</a>
              <button type="button" onClick={() => setOpen(false)} className="min-h-12 rounded-xl border border-border px-4 text-sm font-semibold text-foreground hover:bg-accent">I’m safe</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
