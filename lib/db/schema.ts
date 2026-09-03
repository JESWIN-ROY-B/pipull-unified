import { integer, jsonb, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull().unique(), role: text('role').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const workers = pgTable('workers', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull(), trade: text('trade').notNull(), skills: jsonb('skills').$type<string[]>().notNull().default([]), hourlyRate: integer('hourly_rate').notNull(), experienceYears: integer('experience_years').notNull().default(0), location: text('location').notNull(), verificationStatus: text('verification_status').notNull().default('Pending'), rating: numeric('rating', { precision: 3, scale: 2 }).notNull().default('0'), completedJobs: integer('completed_jobs').notNull().default(0), bio: text('bio').notNull().default(''), availability: text('availability').notNull().default('Immediate'), createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const jobOffers = pgTable('job_offers', {
  id: text('id').primaryKey(), recruiterId: text('recruiter_id').notNull(), recruiterName: text('recruiter_name').notNull(), recruiterCompany: text('recruiter_company').notNull(), title: text('title').notNull(), trade: text('trade').notNull(), location: text('location').notNull(), offeredRate: integer('offered_rate').notNull(), rateType: text('rate_type').notNull(), requiredSkills: jsonb('required_skills').$type<string[]>().notNull().default([]), description: text('description').notNull().default(''), status: text('status').notNull().default('Open'), matchScore: integer('match_score').notNull().default(80), createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(), userId: text('user_id').notNull(), workerId: text('worker_id'), jobOfferId: text('job_offer_id'), kind: text('kind').notNull().default('gig'), title: text('title').notNull(), amount: integer('amount').notNull(), platformFee: integer('platform_fee').notNull(), total: integer('total').notNull(), status: text('status').notNull().default('pending'), razorpayOrderId: text('razorpay_order_id'), razorpayPaymentId: text('razorpay_payment_id'), createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Worker = typeof workers.$inferSelect
export type JobOffer = typeof jobOffers.$inferSelect
export type Booking = typeof bookings.$inferSelect
