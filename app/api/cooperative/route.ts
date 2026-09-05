import crypto from 'node:crypto'
import { connectMongo } from '@/lib/mongodb'
import { CooperativeActivity, CooperativeRequest, Membership, Proposal, Vote } from '@/lib/mongodb/models'

async function seed(memberId: string) {
  await Membership.updateOne({ memberId }, { $setOnInsert: { memberId, membershipType: 'worker-member', status: 'active' } }, { upsert: true })
  const existing = await Proposal.countDocuments({ status: 'active' })
  if (!existing) await Proposal.create({ id: `proposal_${crypto.randomUUID()}`, title: 'Fund training for local worker-members?', description: 'Allocate a proposed 5% of monthly cooperative surplus to member training.', closesAt: new Date(Date.now() + 3 * 86400000) })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const memberId = url.searchParams.get('memberId')?.trim()
  const period = (url.searchParams.get('period') || 'weekly') as 'daily' | 'weekly' | 'monthly'
  if (!memberId) return Response.json({ error: 'memberId is required' }, { status: 400 })
  if (!['daily', 'weekly', 'monthly'].includes(period)) return Response.json({ error: 'Invalid period' }, { status: 400 })
  try {
    await connectMongo(); await seed(memberId)
    const activity = await CooperativeActivity.findOneAndUpdate({ memberId, period }, { $setOnInsert: { memberId, period, jobs: period === 'daily' ? 1 : period === 'weekly' ? 6 : 24, earnings: period === 'daily' ? 1250 : period === 'weekly' ? 8450 : 32400, votes: period === 'daily' ? 0 : period === 'weekly' ? 3 : 8, communityFund: period === 'daily' ? 180 : period === 'weekly' ? 1240 : 4860, skillCircles: 2 } }, { upsert: true, new: true }).lean()
    const [membership, requests, proposals] = await Promise.all([Membership.findOne({ memberId }).lean(), CooperativeRequest.find({ memberId }).sort({ createdAt: -1 }).limit(20).lean(), Proposal.find({ status: 'active' }).sort({ createdAt: -1 }).limit(10).lean()])
    const voted = await Vote.find({ memberId, proposalId: { $in: proposals.map((proposal) => proposal.id) } }).lean()
    return Response.json({ membership, activity, requests, proposals, votedProposalIds: voted.map((vote) => vote.proposalId) })
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
    if (action === 'create-request' || action === 'create-circle') {
      const title = String(body.title || (action === 'create-circle' ? 'New Skill Circle' : 'Cooperative service request')).slice(0, 200)
      const created = await CooperativeRequest.create({ id: `req_${crypto.randomUUID()}`, memberId, title, kind: action === 'create-circle' ? 'circle' : 'service', amount: Math.max(0, Number(body.amount || 0)), metadata: { skills: body.skills || [], serviceArea: body.serviceArea || 'Local' } })
      return Response.json({ request: created }, { status: 201 })
    }
    if (action === 'vote') {
      const proposalId = String(body.proposalId || '')
      const choice = String(body.choice || '') as 'yes' | 'no' | 'abstain'
      if (!proposalId || !['yes', 'no', 'abstain'].includes(choice)) return Response.json({ error: 'proposalId and valid choice are required' }, { status: 400 })
      try {
        const vote = await Vote.create({ proposalId, memberId, choice })
        await Proposal.updateOne({ id: proposalId }, { $inc: { [choice]: 1 } })
        return Response.json({ vote })
      } catch { return Response.json({ error: 'This member has already voted on this proposal' }, { status: 409 }) }
    }
    if (action === 'update-membership') {
      const membershipType = String(body.membershipType || 'worker-member')
      if (!['worker-member', 'customer-member', 'partner', 'steward'].includes(membershipType)) return Response.json({ error: 'Invalid membership type' }, { status: 400 })
      const membership = await Membership.findOneAndUpdate({ memberId }, { $set: { membershipType } }, { new: true, upsert: true }).lean()
      return Response.json({ membership })
    }
    return Response.json({ error: 'Unsupported cooperative action' }, { status: 400 })
  } catch (error) {
    console.error('Cooperative action failed', error)
    return Response.json({ error: 'Cooperative action failed' }, { status: 500 })
  }
}
