import { eq, desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { bookings } from '@/lib/db/schema'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return Response.json({ bookings: await db.select().from(bookings).where(eq(bookings.userId, id)).orderBy(desc(bookings.createdAt)) })
}
