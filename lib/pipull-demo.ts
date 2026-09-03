import type { Gig, Student } from '@/lib/pipull-data'

export type DemoRole = 'recruiter' | 'job-seeker'

export type DemoAccount = {
  email: string
  name: string
  role: DemoRole
  phone: string
}

export const demoAccounts: DemoAccount[] = [
  { email: 'harvey@pipul.com', name: 'Harvey Specter', role: 'recruiter', phone: '+91 98765 43210' },
  { email: 'louislitt@pipul.com', name: 'Louis Litt', role: 'recruiter', phone: '+91 98765 43212' },
  { email: 'mikeross@pipull.com', name: 'Mike Ross', role: 'job-seeker', phone: '+91 98765 43211' },
]

export function getDemoAccount(email: string) {
  return demoAccounts.find((account) => account.email.toLowerCase() === email.trim().toLowerCase())
}

export function getRoleLabel(role: DemoRole) {
  return role === 'recruiter' ? 'Recruiter' : 'Job seeker'
}

export function scoreMatch(query: string, item: Gig | Student) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return 0
  const terms = normalized.split(/\s+/).filter(Boolean)
  const text = 'title' in item
    ? [item.title, item.provider, item.providerSkill, item.turnaround, ...item.inclusions].join(' ')
    : [item.name, item.major, item.primarySkill, item.tagline, ...item.secondarySkills].join(' ')
  const haystack = text.toLowerCase()
  const keywordHits = terms.filter((term) => haystack.includes(term)).length
  const categoryHit = 'providerSkill' in item && terms.some((term) => item.providerSkill.toLowerCase().includes(term))
  const verifiedBonus = item.verified ? 10 : 0
  const proximityBonus = terms.some((term) => ['campus', 'college', 'university', 'local'].includes(term)) ? 8 : 0
  return Math.min(99, Math.round((keywordHits / terms.length) * 62 + (categoryHit ? 18 : 0) + verifiedBonus + proximityBonus))
}

export function rankMatches<T extends Gig | Student>(query: string, items: T[]) {
  return items
    .map((item) => ({ item, score: scoreMatch(query, item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
}

export function checkoutTotals(subtotal: number, platformFeePercent = 3.5) {
  const fee = Math.round(subtotal * (platformFeePercent / 100) * 100) / 100
  return { subtotal, fee, total: Math.round((subtotal + fee) * 100) / 100 }
}
