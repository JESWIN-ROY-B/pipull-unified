import crypto from 'node:crypto'
import { connectMongo } from '@/lib/mongodb'
import { Availability, CooperativeActivity, CooperativeRequest, ForumPost, Membership, Notification, OfferThread, Proposal, Vote } from '@/lib/mongodb/models'

const maxExpiryDays = 90
const defaultExpiryDays = 30

async function seed(memberId: string) {
  await Membership.updateOne({ memberId }, { $setOnInsert: { memberId, membershipType: 'worker-member', status: 'active' } }, { upsert: true })
  const existing = await Proposal.countDocuments({ status: 'active' })
  if (!existing) await Proposal.create({ id: `proposal_${crypto.randomUUID()}`, title: 'Fund training for local worker-members?', description: 'Allocate a proposed 5% of monthly cooperative surplus to member training.', closesAt: new Date(Date.now() + 3 * 86400000) })
}

function expiryDate(value: unknown) {
  const days = Math.min(maxExpiryDays, Math.max(1, Number(value || defaultExpiryDays)))
  return new Date(Date.now() + days * 86400000)
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const memberId = url.searchParams.get('memberId')?.trim()
  const period = (url.searchParams.get('period') || 'weekly') as 'daily' | 'weekly' | 'monthly'
  const requestId = url.searchParams.get('requestId')?.trim()
  if (!memberId) return Response.json({ error: 'memberId is required' }, { status: 400 })
  if (!['daily', 'weekly', 'monthly'].includes(period)) return Response.json({ error: 'Invalid period' }, { status: 400 })
  try {
    await connectMongo(); await seed(memberId)
    await CooperativeRequest.updateMany({ expiresAt: { $lt: new Date() }, status: { $in: ['open', 'matched'] } }, { $set: { status: 'expired' } })
    const activity = await CooperativeActivity.findOneAndUpdate({ memberId, period }, { $setOnInsert: { memberId, period, jobs: period === 'daily' ? 1 : period === 'weekly' ? 6 : 24, earnings: period === 'daily' ? 1250 : period === 'weekly' ? 8450 : 32400, votes: period === 'daily' ? 0 : period === 'weekly' ? 3 : 8, communityFund: period === 'daily' ? 180 : period === 'weekly' ? 1240 : 4860, skillCircles: 2 } }, { upsert: true, new: true }).lean()
    const [membership, requests, proposals, notifications, forum, availability] = await Promise.all([Membership.findOne({ memberId }).lean(), CooperativeRequest.find({ $or: [{ memberId }, { status: 'open', expiresAt: { $gt: new Date() } }] }).sort({ createdAt: -1 }).limit(40).lean(), Proposal.find({ status: 'active' }).sort({ createdAt: -1 }).limit(10).lean(), Notification.find({ memberId }).sort({ createdAt: -1 }).limit(30).lean(), ForumPost.find().sort({ createdAt: -1 }).limit(30).lean(), Availability.find({ memberId }).sort({ date: 1 }).lean()])
    const voted = await Vote.find({ memberId, proposalId: { $in: proposals.map((proposal) => proposal.id) } }).lean()
    const thread = requestId ? await OfferThread.find({ requestId }).sort({ createdAt: 1 }).lean() : []
    return Response.json({ membership, activity, requests, proposals, notifications, forum, availability, thread, votedProposalIds: voted.map((vote) => vote.proposalId) })
  } catch (error) {
    console.error('Cooperative data lookup failed', error)
    return Response.json({ error: 'Cooperative data is unavailable' }, { status: 503 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>
    const memberId = String(body.memberId || '').trim()
    const action = String(body.action || '')
    if (!memberId) return Response.json({ error: 'memberId is required' }, { status: 400 })
    await connectMongo(); await seed(memberId)
    if (action === 'create-request' || action === 'create-circle' || action === 'create-listing') {
      const title = String(body.title || (action === 'create-circle' ? 'New Skill Circle' : action === 'create-listing' ? 'Cooperative lookout' : 'Cooperative service request')).slice(0, 200)
      const listingType = String(body.listingType || '')
      const created = await CooperativeRequest.create({ id: `req_${crypto.randomUUID()}`, memberId, title, kind: action === 'create-circle' ? 'circle' : listingType === 'seek-work' || listingType === 'offer-service' ? 'work' : 'service', amount: Math.max(0, Number(body.amount || 0)), expiresAt: expiryDate(body.expiryDays), requesterName: String(body.requesterName || 'PiPull member'), requesterPhone: String(body.requesterPhone || ''), metadata: { intent: listingType || 'service-request', keywords: body.keywords || [], description: body.description || '', serviceArea: body.serviceArea || 'Local', radiusKm: Math.min(100, Math.max(1, Number(body.radiusKm || 10))), verifiedOnly: body.verifiedOnly !== false } })
      return Response.json({ request: created }, { status: 201 })
    }
    if (action === 'accept-request' || action === 'decline-request') {
      const requestId = String(body.requestId || '')
      const target = await CooperativeRequest.findOne({ id: requestId, expiresAt: { $gt: new Date() }, status: { $in: ['open', 'matched'] } })
      if (!target) return Response.json({ error: 'Request not found or expired' }, { status: 404 })
      if (action === 'decline-request') { await CooperativeRequest.updateOne({ id: requestId }, { $set: { status: 'declined' } }); await Notification.create({ memberId: target.memberId, type: 'request-declined', title: 'Request declined', body: 'A member declined your cooperative offer.', requestId }); return Response.json({ status: 'declined' }) }
      const updated = await CooperativeRequest.findOneAndUpdate({ id: requestId }, { $set: { status: 'accepted', acceptedBy: memberId, contactShared: true, 'reliability.responder': 0 } }, { new: true }).lean()
      await Promise.all([Notification.create({ memberId: target.memberId, type: 'request-accepted', title: 'Your request was accepted', body: 'Contact details are now available to both members.', requestId }), Notification.create({ memberId, type: 'request-accepted', title: 'Request accepted', body: 'The requester contact details are now available in this offer thread.', requestId })])
      return Response.json({ request: updated, contacts: { requesterName: target.requesterName, requesterPhone: target.requesterPhone, responderName: String(body.responderName || 'PiPull member'), responderPhone: String(body.responderPhone || '') } })
    }
    if (action === 'send-message') {
      const requestId = String(body.requestId || ''); const target = await CooperativeRequest.findOne({ id: requestId, $or: [{ memberId }, { acceptedBy: memberId }], status: 'accepted' })
      if (!target) return Response.json({ error: 'Private thread is unavailable until the offer is accepted' }, { status: 403 })
      const message = String(body.message || '').trim(); if (!message) return Response.json({ error: 'Message is required' }, { status: 400 })
      const created = await OfferThread.create({ requestId, memberId, authorName: String(body.authorName || 'PiPull member'), message, private: true })
      return Response.json({ message: created }, { status: 201 })
    }
    if (action === 'set-availability') {
      const date = String(body.date || ''); const occupancy = Math.min(100, Math.max(0, Number(body.occupancy || 0)))
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return Response.json({ error: 'Valid date is required' }, { status: 400 })
      const saved = await Availability.findOneAndUpdate({ memberId, date }, { $set: { occupancy } }, { upsert: true, new: true }).lean(); return Response.json({ availability: saved })
    }
    if (action === 'mark-notifications-read') { await Notification.updateMany({ memberId, read: false }, { $set: { read: true } }); return Response.json({ ok: true }) }
    if (action === 'create-forum-post') { const post = await ForumPost.create({ memberId, authorName: String(body.authorName || 'PiPull member'), title: String(body.title || '').slice(0, 180), body: String(body.body || '').slice(0, 4000), tags: Array.isArray(body.tags) ? body.tags : [] }); return Response.json({ post }, { status: 201 }) }
    if (action === 'vote') { const proposalId = String(body.proposalId || ''); const choice = String(body.choice || '') as 'yes' | 'no' | 'abstain'; if (!proposalId || !['yes', 'no', 'abstain'].includes(choice)) return Response.json({ error: 'proposalId and valid choice are required' }, { status: 400 }); try { const vote = await Vote.create({ proposalId, memberId, choice }); await Proposal.updateOne({ id: proposalId }, { $inc: { [choice]: 1 } }); return Response.json({ vote }) } catch { return Response.json({ error: 'This member has already voted on this proposal' }, { status: 409 }) } }
    if (action === 'update-membership') { const membershipType = String(body.membershipType || 'worker-member'); if (!['worker-member', 'customer-member', 'partner', 'steward'].includes(membershipType)) return Response.json({ error: 'Invalid membership type' }, { status: 400 }); const membership = await Membership.findOneAndUpdate({ memberId }, { $set: { membershipType } }, { new: true, upsert: true }).lean(); return Response.json({ membership }) }
    return Response.json({ error: 'Unsupported cooperative action' }, { status: 400 })
  } catch (error) { console.error('Cooperative action failed', error); return Response.json({ error: 'Cooperative action failed' }, { status: 500 }) }
}
