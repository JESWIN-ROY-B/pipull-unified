import { connectMongo } from '@/lib/mongodb'
import { User } from '@/lib/mongodb/models'

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get('username')?.trim().toLowerCase() || ''
  if (!/^[a-z0-9_.-]{3,24}$/.test(username)) return Response.json({ available: false, reason: 'invalid' }, { status: 400 })
  try {
    await connectMongo()
    const exists = await User.exists({ username })
    return Response.json({ available: !exists })
  } catch (error) {
    console.error('Username availability check failed', error)
    return Response.json({ available: false, reason: 'unavailable' }, { status: 503 })
  }
}
