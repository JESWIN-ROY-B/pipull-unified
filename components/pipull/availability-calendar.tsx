'use client'

import { useEffect, useState } from 'react'
import type { DemoAccount } from '@/lib/pipull-demo'

export function AvailabilityCalendar({ account }: { account: DemoAccount }) {
  const [days, setDays] = useState<Record<string, number>>({})
  useEffect(() => {
    fetch(`/api/cooperative?memberId=${encodeURIComponent(account.id)}&period=weekly`)
      .then((response) => response.json())
      .then((data: { availability?: Array<{ date: string; occupancy: number }> }) => setDays(Object.fromEntries((data.availability || []).map((day) => [day.date, day.occupancy]))))
      .catch(() => undefined)
  }, [account.id])
  const dates = Array.from({ length: 31 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - 15 + index); return date })
  async function toggle(date: Date) {
    const key = date.toISOString().slice(0, 10)
    const next = ((days[key] || 0) + 25) % 125
    setDays((current) => ({ ...current, [key]: next }))
    await fetch('/api/cooperative', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'set-availability', memberId: account.id, date: key, occupancy: next }) })
  }
  return <section className="mt-8 rounded-2xl border border-border bg-card p-5"><div className="flex items-center justify-between gap-3"><div><h2 className="font-bold">Availability calendar</h2><p className="mt-1 text-xs text-muted-foreground">Previous 15 days and next 15 days. Click a day to update occupancy.</p></div><div className="flex items-center gap-1 text-[10px] text-muted-foreground"><span>Free</span><i className="size-4 rounded bg-blue-50" /><i className="size-4 rounded bg-blue-200" /><i className="size-4 rounded bg-blue-500" /><span>Busy</span></div></div><div className="mt-4 grid grid-cols-7 gap-2 sm:grid-cols-11">{dates.map((date) => { const key = date.toISOString().slice(0, 10); const occupancy = days[key] || 0; const color = occupancy >= 100 ? 'bg-blue-700 text-white' : occupancy >= 75 ? 'bg-blue-500 text-white' : occupancy >= 50 ? 'bg-blue-300 text-blue-950' : occupancy >= 25 ? 'bg-blue-100 text-blue-950' : 'bg-blue-50 text-blue-950'; return <button type="button" key={key} onClick={() => void toggle(date)} title={`${key}: ${occupancy}% occupied`} className={`min-h-12 rounded-lg p-1 text-[10px] font-bold transition hover:ring-2 hover:ring-brand ${color}`}>{date.getDate()}<span className="block text-[9px] font-normal">{occupancy}%</span></button> })}</div></section>
}
