'use client'

import { useEffect, useRef, useState } from 'react'
import {
  X,
  ShieldCheck,
  Trash2,
  Clock,
  CalendarCheck,
} from 'lucide-react'
import { Avatar } from './avatar'

export type BookingItem = {
  id: string
  title: string
  provider: string
  avatarColor: string
  turnaround: string
  price: number
  kind: 'gig' | 'request'
}

export function BookingTray({
  open,
  items,
  onClose,
  onRemove,
  accountId,
}: {
  open: boolean
  items: BookingItem[]
  onClose: () => void
  onRemove: (id: string) => void
  accountId: string
}) {
  const [paymentState, setPaymentState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [paymentError, setPaymentError] = useState('')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => { script.remove() }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const subtotal = items.reduce((sum, i) => sum + i.price, 0)
  const serviceFee = items.length > 0 ? Math.round(subtotal * 0.08 * 100) / 100 : 0
  const total = subtotal + serviceFee

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Booking tray"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-md transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Your booking tray</h2>
            <p className="text-xs text-muted-foreground">
              {items.length} {items.length === 1 ? 'gig' : 'gigs'} ready to confirm
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close booking tray"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-accent text-brand">
                <CalendarCheck className="size-7" />
              </span>
              <p className="mt-4 font-semibold text-foreground">
                No bookings yet
              </p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Browse gigs or hire a peer to start building your booking tray.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <Avatar
                    name={item.provider}
                    color={item.avatarColor}
                    className="size-10 shrink-0 text-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-pretty text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      with {item.provider}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3.5" />
                        {item.turnaround}
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service fee (8%)</span>
                <span>₹{serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-1.5 text-base font-bold text-foreground">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-verified/10 px-3 py-2 text-xs font-medium text-verified">
              <ShieldCheck className="size-4 shrink-0" />
              Funds held in escrow until each gig is marked complete.
            </div>

            {paymentState === 'success' && (
              <p role="status" className="mt-3 rounded-lg bg-verified/10 px-3 py-2 text-sm font-medium text-verified">
                Booking request created. Your funds stay protected until completion.
              </p>
            )}
            {paymentState === 'error' && (
              <p role="alert" className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {paymentError || 'Something went wrong setting up secure checkout. No charge was made — please try again.'}
              </p>
            )}
            <button
              type="button"
              disabled={paymentState === 'pending' || paymentState === 'success'}
              onClick={async () => {
                setPaymentState('pending'); setPaymentError('')
                try {
                  const bookingResponse = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: accountId, items: items.map((item) => ({ id: item.id, title: item.title, amount: item.price, kind: item.kind })) }) })
                  if (!bookingResponse.ok) { const detail = await bookingResponse.json().catch(() => ({})) as { error?: string }; throw new Error(detail.error || 'Booking failed') }
                  const { booking } = await bookingResponse.json()
                  const orderResponse = await fetch('/api/payments/create-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookingId: booking.id }) })
                  if (!orderResponse.ok) { const detail = await orderResponse.json().catch(() => ({})) as { error?: string }; throw new Error(detail.error || 'Payment setup failed') }
                  const order = await orderResponse.json()
                  const checkout = (window as Window & { Razorpay?: new (options: Record<string, unknown>) => { open: () => void } }).Razorpay
                  if (!checkout) throw new Error('Razorpay checkout is still loading. Please wait a moment and try again.')
                  new checkout({ key: order.keyId, amount: order.amount, currency: order.currency, name: 'Pipull', description: `Booking ${booking.id}`, order_id: order.orderId, handler: async (response: { razorpay_payment_id: string; razorpay_signature: string }) => {
                    const verification = await fetch('/api/payments/verify-signature', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookingId: booking.id, ...response }) })
                    if (!verification.ok) { const detail = await verification.json().catch(() => ({})) as { error?: string }; throw new Error(detail.error || 'Payment verification failed') }
                    setPaymentState('success')
                  }, modal: { ondismiss: () => setPaymentState('idle') } }).open()
                } catch (error) { setPaymentError(error instanceof Error ? error.message : 'Payment setup failed'); setPaymentState('error') }
              }}
              className="mt-3 min-h-12 w-full rounded-xl bg-brand px-4 py-3.5 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {paymentState === 'pending' ? 'Preparing secure checkout…' : paymentState === 'success' ? 'Booking created' : 'Confirm & Pay Securely'}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
