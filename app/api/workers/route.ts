import { and, asc, eq, ilike, gte, or } from 'drizzle-orm'
import { db } from '@/lib/db'
import { workers } from '@/lib/db/schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trade = searchParams.get('trade')
  const location = searchParams.get('location')
  const minRating = Number(searchParams.get('minRating') || 0)
  const filters = [gte(workers.rating, String(minRating))]
  if (trade) filters.push(eq(workers.trade, trade))
  if (location) filters.push(or(ilike(workers.location, `%${location}%`), ilike(workers.name, `%${location}%`))!)
  const result = await db.select().from(workers).where(and(...filters)).orderBy(asc(workers.name)).limit(100)
  return Response.json({ workers: result })
}
