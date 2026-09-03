import crypto from 'node:crypto'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { bookings } from '@/lib/db/schema'

export async function POST(request: Request) {
  const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, String(bookingId)))
  if (!booking || booking.razorpayOrderId !== razorpay_order_id || !process.env.RAZORPAY_KEY_SECRET) return Response.json({ error: 'Invalid payment' }, { status: 400 })
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex')
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(String(razorpay_signature)))) return Response.json({ error: 'Signature verification failed' }, { status: 400 })
  const [updated] = await db.update(bookings).set({ status: 'paid', razorpayPaymentId: razorpay_payment_id }).where(eq(bookings.id, booking.id)).returning()
  return Response.json({ booking: updated })
}
