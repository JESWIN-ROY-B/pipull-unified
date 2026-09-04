import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null }
if (process.env.NODE_ENV !== 'production') global.mongooseCache = cached

export async function connectMongo() {
  if (!uri) throw new Error('MONGODB_URI is not configured')
  if (cached.conn) return cached.conn
  if (!cached.promise) cached.promise = mongoose.connect(uri, { dbName: process.env.MONGODB_DB || 'people_unified', maxPoolSize: 10, serverSelectionTimeoutMS: 5000 })
  cached.conn = await cached.promise
  return cached.conn
}
