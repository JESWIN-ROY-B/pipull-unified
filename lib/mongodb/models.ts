import { Schema, model, models, type InferSchemaType } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
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
  id: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  workerId: { type: String, index: true },
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

const membershipSchema = new Schema({
  memberId: { type: String, required: true, unique: true, index: true },
  membershipType: { type: String, enum: ['worker-member', 'customer-member', 'partner', 'steward'], default: 'worker-member' },
  status: { type: String, enum: ['active', 'pending', 'suspended'], default: 'active', index: true },
  votingPower: { type: Number, default: 1, min: 0 },
  benefitEligibility: { type: Boolean, default: true },
  surplusParticipation: { type: Boolean, default: true },
  skills: { type: [String], default: [] },
  availability: { type: String, default: 'Immediate' },
}, { timestamps: true })

const cooperativeRequestSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  memberId: { type: String, required: true, index: true },
  title: { type: String, required: true, maxlength: 200 },
  kind: { type: String, enum: ['service', 'work', 'circle'], default: 'service' },
  status: { type: String, enum: ['open', 'matched', 'accepted', 'declined', 'active', 'completed', 'cancelled', 'expired'], default: 'open', index: true },
  amount: { type: Number, min: 0, default: 0 },
  workerId: String,
  expiresAt: { type: Date, required: true, index: true },
  acceptedBy: String,
  requesterName: String,
  requesterPhone: String,
  contactShared: { type: Boolean, default: false },
  reliability: { requester: { type: Number, default: 0 }, responder: { type: Number, default: 0 } },
  metadata: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true })

const offerThreadSchema = new Schema({
  requestId: { type: String, required: true, index: true },
  memberId: { type: String, required: true, index: true },
  authorName: { type: String, required: true },
  message: { type: String, required: true, maxlength: 2000 },
  private: { type: Boolean, default: true },
}, { timestamps: true })

const notificationSchema = new Schema({
  memberId: { type: String, required: true, index: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  read: { type: Boolean, default: false, index: true },
  requestId: String,
}, { timestamps: true })

const availabilitySchema = new Schema({
  memberId: { type: String, required: true, index: true },
  date: { type: String, required: true },
  occupancy: { type: Number, min: 0, max: 100, default: 0 },
}, { timestamps: true })
availabilitySchema.index({ memberId: 1, date: 1 }, { unique: true })

const forumPostSchema = new Schema({
  memberId: { type: String, required: true, index: true },
  authorName: { type: String, required: true },
  title: { type: String, required: true, maxlength: 180 },
  body: { type: String, required: true, maxlength: 4000 },
  tags: { type: [String], default: [] },
  replies: { type: Number, default: 0 },
}, { timestamps: true })

const proposalSchema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true, maxlength: 240 },
  description: { type: String, required: true, maxlength: 2000 },
  status: { type: String, enum: ['active', 'passed', 'rejected', 'closed'], default: 'active', index: true },
  closesAt: { type: Date, required: true },
  yes: { type: Number, default: 0, min: 0 },
  no: { type: Number, default: 0, min: 0 },
  abstain: { type: Number, default: 0, min: 0 },
}, { timestamps: true })

const voteSchema = new Schema({
  proposalId: { type: String, required: true, index: true },
  memberId: { type: String, required: true, index: true },
  choice: { type: String, enum: ['yes', 'no', 'abstain'], required: true },
}, { timestamps: true })
voteSchema.index({ proposalId: 1, memberId: 1 }, { unique: true })

const cooperativeActivitySchema = new Schema({
  memberId: { type: String, required: true, index: true },
  period: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  jobs: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  communityFund: { type: Number, default: 0 },
  skillCircles: { type: Number, default: 0 },
}, { timestamps: true })
cooperativeActivitySchema.index({ memberId: 1, period: 1 }, { unique: true })

export type UserDocument = InferSchemaType<typeof userSchema>
export type BookingDocument = InferSchemaType<typeof bookingSchema>
export const User = models.User || model('User', userSchema)
export const Profile = models.Profile || model('Profile', profileSchema)
export const Booking = models.Booking || model('Booking', bookingSchema)
export const PaymentEvent = models.PaymentEvent || model('PaymentEvent', paymentEventSchema)
export const Membership = models.Membership || model('Membership', membershipSchema)
export const CooperativeRequest = models.CooperativeRequest || model('CooperativeRequest', cooperativeRequestSchema)
export const Proposal = models.Proposal || model('Proposal', proposalSchema)
export const Vote = models.Vote || model('Vote', voteSchema)
export const CooperativeActivity = models.CooperativeActivity || model('CooperativeActivity', cooperativeActivitySchema)
export const OfferThread = models.OfferThread || model('OfferThread', offerThreadSchema)
export const Notification = models.Notification || model('Notification', notificationSchema)
export const Availability = models.Availability || model('Availability', availabilitySchema)
export const ForumPost = models.ForumPost || model('ForumPost', forumPostSchema)
