import crypto from 'node:crypto'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { bookings } from '@/lib/db/schema'
import { connectMongo } from '@/lib/mongodb'
import { Booking } from '@/lib/mongodb/models'

export async function POST(request: Request) {
  const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()
  const booking = process.env.MONGODB_URI
    ? await (async () => { await connectMongo(); return Booking.findOne({ id: String(bookingId) }).lean() })()
    : (await db.select().from(bookings).where(eq(bookings.id, String(bookingId))))[0]
  if (!booking || booking.razorpayOrderId !== razorpay_order_id || !process.env.RAZORPAY_KEY_SECRET) return Response.json({ error: 'Invalid payment' }, { status: 400 })
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex')
  const received = Buffer.from(String(razorpay_signature || ''), 'utf8')
  const expectedBuffer = Buffer.from(expected, 'utf8')
  if (received.length !== expectedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, received)) return Response.json({ error: 'Signature verification failed' }, { status: 400 })
  if (process.env.MONGODB_URI) {
    const updated = await Booking.findOneAndUpdate({ id: String(bookingId) }, { $set: { status: 'paid', razorpayPaymentId: String(razorpay_payment_id) } }, { new: true }).lean()
    return Response.json({ booking: updated })
  }
  const [updated] = await db.update(bookings).set({ status: 'paid', razorpayPaymentId: razorpay_payment_id }).where(eq(bookings.id, booking.id)).returning()
  return Response.json({ booking: updated })
}
