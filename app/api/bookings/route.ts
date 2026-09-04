import { connectMongo } from '@/lib/mongodb'
import { Booking } from '@/lib/mongodb/models'

const feeRate = 0.08

function cleanItems(body: Record<string, unknown>) {
  const items = Array.isArray(body.items) ? body.items : []
  return items.map((item) => {
    const value = item as Record<string, unknown>
    const amount = Number(value.amount)
    if (!value.id || !value.title || !Number.isFinite(amount) || amount < 1) throw new Error('Each booking item needs an id, title, and positive amount')
    return { id: String(value.id), title: String(value.title).slice(0, 200), amount: Math.round(amount), quantity: Math.max(1, Number(value.quantity || 1)) }
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>
    const userId = String(body.userId || '').trim()
    if (!userId) return Response.json({ error: 'userId is required' }, { status: 400 })
    const items = cleanItems(body)
    if (!items.length) return Response.json({ error: 'At least one booking item is required' }, { status: 400 })
    const subtotal = items.reduce((sum, item) => sum + item.amount * item.quantity, 0)
    const platformFee = Math.round(subtotal * feeRate)
    await connectMongo()
    const booking = await Booking.create({ id: `bkg_${crypto.randomUUID()}`, userId, workerId: body.workerId ? String(body.workerId) : undefined, title: String(body.title || items[0].title), lineItems: items, subtotal, platformFee, total: subtotal + platformFee, currency: 'INR', status: 'pending' })
    return Response.json({ booking })
  } catch (error) {
    console.error('Booking creation failed', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Booking creation failed' }, { status: 400 })
  }
}

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId')?.trim()
  if (!userId) return Response.json({ error: 'userId is required' }, { status: 400 })
  try {
    await connectMongo()
    return Response.json({ bookings: await Booking.find({ userId }).sort({ createdAt: -1 }).lean() })
  } catch (error) {
    console.error('Booking lookup failed', error)
    return Response.json({ error: 'Booking lookup failed' }, { status: 503 })
  }
}
