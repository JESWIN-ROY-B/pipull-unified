import { connectMongo } from '@/lib/mongodb'

export async function GET() {
  try {
    await connectMongo()
    return Response.json({ ok: true, database: 'mongodb', payments: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_WEBHOOK_SECRET) })
  } catch (error) {
    console.error('Health check failed', error)
    return Response.json({ ok: false, database: 'unavailable', payments: false }, { status: 503 })
  }
}
