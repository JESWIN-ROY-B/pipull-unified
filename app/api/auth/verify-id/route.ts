import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { workers } from '@/lib/db/schema'

export async function POST(request: Request) {
  const { workerId } = await request.json()
  if (!workerId) return Response.json({ error: 'workerId is required' }, { status: 400 })
  const [worker] = await db.update(workers).set({ verificationStatus: 'Verified' }).where(eq(workers.id, String(workerId))).returning()
  if (!worker) return Response.json({ error: 'Worker not found' }, { status: 404 })
  return Response.json({ worker })
}
