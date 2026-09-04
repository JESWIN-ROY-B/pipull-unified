import Razorpay from 'razorpay'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { bookings } from '@/lib/db/schema'
import { connectMongo } from '@/lib/mongodb'
import { Booking } from '@/lib/mongodb/models'

export async function POST(request: Request) {
  const { bookingId } = await request.json()
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return Response.json({ error: 'Razorpay test keys are not configured' }, { status: 503 })
  const booking = process.env.MONGODB_URI
    ? await (async () => { await connectMongo(); return Booking.findOne({ id: String(bookingId) }).lean() })()
    : (await db.select().from(bookings).where(eq(bookings.id, String(bookingId))))[0]
  if (!booking) return Response.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.status !== 'pending') return Response.json({ error: 'Booking is not payable' }, { status: 409 })
  const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  const order = await razorpay.orders.create({ amount: booking.total * 100, currency: 'INR', receipt: booking.id, notes: { bookingId: booking.id } })
  if (process.env.MONGODB_URI) await Booking.findOneAndUpdate({ id: String(bookingId) }, { $set: { razorpayOrderId: order.id, status: 'payment_initiated' } })
  else await db.update(bookings).set({ razorpayOrderId: order.id, status: 'payment_initiated' }).where(eq(bookings.id, booking.id))
  return Response.json({ orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID, amount: order.amount, currency: order.currency })
}
