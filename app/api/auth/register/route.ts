import { db } from '@/lib/db'
import { accounts } from '@/lib/db/schema'

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name || !body.email) return Response.json({ error: 'Name and email are required' }, { status: 400 })
  const [account] = await db.insert(accounts).values({ id: `acct_${crypto.randomUUID()}`, name: String(body.name), email: String(body.email).toLowerCase(), role: String(body.role || 'WORKER').toUpperCase() }).returning()
  return Response.json({ account }, { status: 201 })
}
