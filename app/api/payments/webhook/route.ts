import crypto from 'node:crypto'
import { eq } from 'drizzle-orm'
import { connectMongo } from '@/lib/mongodb'
import { Booking, PaymentEvent } from '@/lib/mongodb/models'
import { db } from '@/lib/db'
import { bookings } from '@/lib/db/schema'

function signatureIsValid(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  const received = Buffer.from(signature, 'utf8')
  const expectedBuffer = Buffer.from(expected, 'utf8')
  return received.length === expectedBuffer.length && crypto.timingSafeEqual(received, expectedBuffer)
}

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) return Response.json({ error: 'Webhook secret is not configured' }, { status: 503 })
  const rawBody = await request.text()
  const signature = request.headers.get('x-razorpay-signature') || ''
  if (!signatureIsValid(rawBody, signature, secret)) return Response.json({ error: 'Invalid webhook signature' }, { status: 401 })

  let payload: { event?: string; payload?: { payment?: { entity?: { id?: string; order_id?: string } }; order?: { entity?: { id?: string } } } }
  try { payload = JSON.parse(rawBody) } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }) }
  const eventId = request.headers.get('x-razorpay-event-id') || crypto.createHash('sha256').update(rawBody).digest('hex')
  const event = payload.event || 'unknown'
  const payment = payload.payload?.payment?.entity
  const order = payload.payload?.order?.entity
  const orderId = payment?.order_id || order?.id
  const paymentId = payment?.id

  try {
    await connectMongo()
    const existing = await PaymentEvent.findOne({ eventId }).lean()
    if (existing) return Response.json({ received: true, duplicate: true })
    await PaymentEvent.create({ eventId, event, orderId, paymentId, payload })
    if (orderId) {
      const status = event === 'payment.failed' ? 'failed' : event === 'refund.processed' ? 'refunded' : ['payment.authorized', 'order.paid', 'payment.captured'].includes(event) ? 'paid' : undefined
      if (status) {
        const update = { status, ...(paymentId ? { razorpayPaymentId: paymentId } : {}) }
        await Promise.all([
          Booking.findOneAndUpdate({ razorpayOrderId: orderId }, { $set: update }),
          db.update(bookings).set(update).where(eq(bookings.razorpayOrderId, orderId)),
        ])
      }
    }
    return Response.json({ received: true })
  } catch (error) {
    console.error('Razorpay webhook processing failed', error)
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
