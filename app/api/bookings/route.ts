import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { bookings, jobOffers, workers } from '@/lib/db/schema'

export async function POST(request: Request) {
  const body = await request.json()
  const userId = String(body.userId || 'demo-user')
  const kind = body.kind === 'emergency' ? 'emergency' : body.kind === 'request' ? 'request' : 'gig'
  let amount = 0
  let title = String(body.title || 'Pipull booking')
  if (body.jobOfferId) { const [job] = await db.select().from(jobOffers).where(eq(jobOffers.id, String(body.jobOfferId))); if (!job) return Response.json({ error: 'Job not found' }, { status: 404 }); amount = job.offeredRate; title = job.title }
  else if (body.workerId) { const [worker] = await db.select().from(workers).where(eq(workers.id, String(body.workerId))); if (!worker) return Response.json({ error: 'Worker not found' }, { status: 404 }); amount = worker.hourlyRate; title = title || `${worker.trade} booking` }
  else { amount = Math.max(1, Number(body.amount || 25)) }
  const platformFee = Math.round(amount * 0.08)
  const [booking] = await db.insert(bookings).values({ id: `bkg_${crypto.randomUUID()}`, userId, workerId: body.workerId || null, jobOfferId: body.jobOfferId || null, kind, title, amount, platformFee, total: amount + platformFee }).returning()
  return Response.json({ booking })
}

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId')
  if (!userId) return Response.json({ error: 'userId is required' }, { status: 400 })
  return Response.json({ bookings: await db.select().from(bookings).where(eq(bookings.userId, userId)) })
}
