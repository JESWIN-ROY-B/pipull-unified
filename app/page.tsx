'use client'

import { useEffect, useState } from 'react'
import { AuthScreen } from '@/components/pipull/auth-screen'
import { RoleDashboard } from '@/components/pipull/role-dashboard'
import { BookingTray, type BookingItem } from '@/components/pipull/booking-tray'
import { PanicButton } from '@/components/pipull/panic-button'
import type { Gig, Student } from '@/lib/pipull-data'
import type { DemoAccount } from '@/lib/pipull-demo'

export default function Page() {
  const [account, setAccount] = useState<DemoAccount | null>(null)
  const [tray, setTray] = useState<BookingItem[]>([])
  const [trayOpen, setTrayOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('pipull-account')
      if (saved) setAccount(JSON.parse(saved) as DemoAccount)
    } catch { window.localStorage.removeItem('pipull-account') }
  }, [])

  function login(nextAccount: DemoAccount) {
    setAccount(nextAccount)
    window.localStorage.setItem('pipull-account', JSON.stringify(nextAccount))
  }

  function bookGig(gig: Gig) {
    setTray((prev) => prev.some((item) => item.id === gig.id) ? prev : [...prev, { id: gig.id, title: gig.title, provider: gig.provider, avatarColor: gig.avatarColor, turnaround: gig.turnaround, price: gig.price, kind: 'gig' }])
    setTrayOpen(true)
  }

  function hireStudent(student: Student) {
    const id = `req-${student.id}`
    setTray((prev) => prev.some((item) => item.id === id) ? prev : [...prev, { id, title: `Custom ${student.primarySkill} request`, provider: student.name, avatarColor: student.avatarColor, turnaround: 'Scope to be agreed', price: 25, kind: 'request' }])
    setTrayOpen(true)
  }

  if (!account) return <AuthScreen onLogin={login} />

  return <>
    <RoleDashboard account={account} onLogout={() => { setAccount(null); window.localStorage.removeItem('pipull-account'); setTray([]); setTrayOpen(false) }} onBook={bookGig} onHire={hireStudent} />
    <div className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6"><PanicButton /></div>
    <BookingTray accountId={account.id} open={trayOpen} items={tray} onClose={() => setTrayOpen(false)} onRemove={(id) => setTray((prev) => prev.filter((item) => item.id !== id))} />
  </>
}
