import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { workers } from '@/lib/db/schema'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const updates: Partial<typeof workers.$inferInsert> = {}
  if (Array.isArray(body.skills)) updates.skills = body.skills.map(String)
  if (body.availability) updates.availability = String(body.availability)
  if (body.bio) updates.bio = String(body.bio)
  const [worker] = await db.update(workers).set(updates).where(eq(workers.id, id)).returning()
  return worker ? Response.json({ worker }) : Response.json({ error: 'Worker not found' }, { status: 404 })
}
