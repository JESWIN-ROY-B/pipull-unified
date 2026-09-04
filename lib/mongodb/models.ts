import { Schema, model, models, type InferSchemaType } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  roles: { type: [String], enum: ['Worker', 'Recruiter', 'Admin'], default: ['Worker', 'Recruiter'] },
  verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending', index: true },
}, { timestamps: true })

const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  bio: { type: String, default: '', maxlength: 2000 },
  skills: { type: [String], default: [] },
  location: { type: String, default: '', index: true },
  languages: { type: [String], default: [] },
  availability: { type: String, default: 'Immediate' },
  hourlyRate: { type: Number, min: 0 },
  portfolio: [{ title: String, description: String, url: String }],
}, { timestamps: true })

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  workerId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  title: { type: String, required: true, trim: true },
  lineItems: [{ id: String, title: String, amount: { type: Number, min: 0 }, quantity: { type: Number, min: 1, default: 1 } }],
  subtotal: { type: Number, required: true, min: 1 },
  platformFee: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 1 },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'payment_initiated', 'paid', 'in_escrow', 'completed', 'refunded', 'failed', 'disputed'], default: 'pending', index: true },
  razorpayOrderId: { type: String, index: true, sparse: true },
  razorpayPaymentId: { type: String, index: true, sparse: true },
}, { timestamps: true })

const paymentEventSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
  event: { type: String, required: true, index: true },
  orderId: String,
  paymentId: String,
  bookingId: String,
  payload: { type: Schema.Types.Mixed, required: true },
  processedAt: { type: Date, default: Date.now },
}, { timestamps: true })

export type UserDocument = InferSchemaType<typeof userSchema>
export type BookingDocument = InferSchemaType<typeof bookingSchema>
export const User = models.User || model('User', userSchema)
export const Profile = models.Profile || model('Profile', profileSchema)
export const Booking = models.Booking || model('Booking', bookingSchema)
export const PaymentEvent = models.PaymentEvent || model('PaymentEvent', paymentEventSchema)
