import type { LucideIcon } from 'lucide-react'
import { preSeededWorkers, preSeededJobOffers } from './seedData'
import {
  Palette,
  GraduationCap,
  Camera,
  Code2,
  Bike,
} from 'lucide-react'

export type Category = {
  id: string
  label: string
  icon: LucideIcon
  count: number
}

export const categories: Category[] = [
  { id: 'design', label: 'Design & Media', icon: Palette, count: 128 },
  { id: 'academics', label: 'Academics & Tutoring', icon: GraduationCap, count: 214 },
  { id: 'events', label: 'Event Support', icon: Camera, count: 76 },
  { id: 'tech', label: 'Tech & Coding', icon: Code2, count: 93 },
  { id: 'errands', label: 'Delivery & Errands', icon: Bike, count: 152 },
]

export type Student = {
  id: string
  name: string
  major: string
  gradYear: string
  verified: boolean
  avatarColor: string
  primarySkill: string
  endorsements: number
  secondarySkills: string[]
  rating: number
  completedGigs: number
  portfolio: string
  tagline: string
}

const legacyStudents: Student[] = [
  {
    id: 's1',
    name: 'Alex Rivera',
    major: 'Visual Communication Design',
    gradYear: "'26",
    verified: true,
    avatarColor: '#2563eb',
    primarySkill: 'Figma',
    endorsements: 24,
    secondarySkills: ['Branding', 'Motion'],
    rating: 4.9,
    completedGigs: 18,
    portfolio: '/pipull/poster-design.png',
    tagline: 'Poster & brand systems for campus orgs',
  },
  {
    id: 's2',
    name: 'Priya Nair',
    major: 'Applied Mathematics',
    gradYear: "'25",
    verified: true,
    avatarColor: '#10b981',
    primarySkill: 'Calculus',
    endorsements: 41,
    secondarySkills: ['Statistics', 'Physics'],
    rating: 5.0,
    completedGigs: 32,
    portfolio: '/pipull/tutoring.png',
    tagline: 'Patient 1:1 STEM tutoring, exam prep',
  },
  {
    id: 's3',
    name: 'Marcus Bell',
    major: 'Film & Photography',
    gradYear: "'27",
    verified: true,
    avatarColor: '#0f172a',
    primarySkill: 'Event Photo',
    endorsements: 19,
    secondarySkills: ['Lightroom', 'Video'],
    rating: 4.8,
    completedGigs: 14,
    portfolio: '/pipull/photography.png',
    tagline: 'Fast-turnaround event & club coverage',
  },
  {
    id: 's4',
    name: 'Sofia Chen',
    major: 'Computer Science',
    gradYear: "'26",
    verified: true,
    avatarColor: '#2563eb',
    primarySkill: 'React',
    endorsements: 37,
    secondarySkills: ['Python', 'APIs'],
    rating: 4.9,
    completedGigs: 27,
    portfolio: '/pipull/coding.png',
    tagline: 'Ships side projects & fixes bugs fast',
  },
]

export type GigTab = 'popular' | 'express' | 'academic'

export type Gig = {
  id: string
  tab: GigTab
  title: string
  provider: string
  providerSkill: string
  avatarColor: string
  verified: boolean
  turnaround: string
  price: number
  rating: number
  reviews: number
  image: string
  inclusions: string[]
}

const legacyGigs: Gig[] = [
  {
    id: 'g1',
    tab: 'popular',
    title: 'Event Poster & Social Kit',
    provider: 'Alex Rivera',
    providerSkill: 'Design & Media',
    avatarColor: '#2563eb',
    verified: true,
    turnaround: '2 Hr Delivery',
    price: 15,
    rating: 4.9,
    reviews: 18,
    image: '/pipull/poster-design.png',
    inclusions: [
      'Print-ready poster (A3 + A4)',
      '3 matching Instagram story graphics',
      '1 round of revisions included',
    ],
  },
  {
    id: 'g2',
    tab: 'academic',
    title: 'Calculus & Exam Prep Session',
    provider: 'Priya Nair',
    providerSkill: 'Academics & Tutoring',
    avatarColor: '#10b981',
    verified: true,
    turnaround: '60 Min Session',
    price: 22,
    rating: 5.0,
    reviews: 32,
    image: '/pipull/tutoring.png',
    inclusions: [
      'Live 1:1 walkthrough of tricky topics',
      'Practice problem set with solutions',
      'Follow-up notes shared after session',
    ],
  },
  {
    id: 'g3',
    tab: 'popular',
    title: 'Club Event Photography',
    provider: 'Marcus Bell',
    providerSkill: 'Event Support',
    avatarColor: '#0f172a',
    verified: true,
    turnaround: 'Next Day Gallery',
    price: 45,
    rating: 4.8,
    reviews: 14,
    image: '/pipull/photography.png',
    inclusions: [
      'Up to 2 hours on-site coverage',
      '40+ edited high-res photos',
      'Private shareable gallery link',
    ],
  },
  {
    id: 'g4',
    tab: 'express',
    title: 'Bug Fix & Code Review',
    provider: 'Sofia Chen',
    providerSkill: 'Tech & Coding',
    avatarColor: '#2563eb',
    verified: true,
    turnaround: '90 Min Express',
    price: 30,
    rating: 4.9,
    reviews: 27,
    image: '/pipull/coding.png',
    inclusions: [
      'Screen-share debugging session',
      'Commented fixes pushed to your repo',
      'Short summary of what went wrong',
    ],
  },
  {
    id: 'g5',
    tab: 'express',
    title: 'Campus Errand & Pickup',
    provider: 'Jordan Lee',
    providerSkill: 'Delivery & Errands',
    avatarColor: '#10b981',
    verified: true,
    turnaround: '30 Min Pickup',
    price: 8,
    rating: 4.7,
    reviews: 51,
    image: '/pipull/photography.png',
    inclusions: [
      'Pickup & drop anywhere on campus',
      'Live status updates in chat',
      'Contactless handoff option',
    ],
  },
  {
    id: 'g6',
    tab: 'academic',
    title: 'Essay Proofread & Feedback',
    provider: 'Nadia Osei',
    providerSkill: 'Academics & Tutoring',
    avatarColor: '#0f172a',
    verified: true,
    turnaround: '3 Hr Delivery',
    price: 18,
    rating: 4.9,
    reviews: 23,
    image: '/pipull/tutoring.png',
    inclusions: [
      'Line-by-line grammar & clarity edits',
      'Structure & argument feedback notes',
      'Up to 2,000 words per gig',
    ],
  },
]

// Canonical 25-trade seed data powers the marketplace while preserving the MVP card contracts.
export const students: Student[] = preSeededWorkers.map((worker, index) => ({
  id: worker.id,
  name: worker.name,
  major: worker.trade,
  gradYear: 'Verified trade pro',
  verified: worker.verificationStatus === 'Verified',
  avatarColor: ['#2563eb', '#10b981', '#0f172a'][index % 3],
  primarySkill: worker.trade,
  endorsements: worker.completedJobs,
  secondarySkills: worker.skills.slice(0, 2),
  rating: worker.rating,
  completedGigs: worker.completedJobs,
  portfolio: '/pipull/coding.png',
  tagline: worker.bio,
}))

export const gigs: Gig[] = preSeededJobOffers.map((job, index) => ({
  id: job.id,
  tab: index % 3 === 0 ? 'express' : index % 3 === 1 ? 'academic' : 'popular',
  title: job.title,
  provider: job.recruiterName,
  providerSkill: job.trade,
  avatarColor: ['#2563eb', '#10b981', '#0f172a'][index % 3],
  verified: true,
  turnaround: job.rateType === 'Hourly' ? 'Hourly booking' : 'Local trade offer',
  price: job.offeredRate,
  rating: 4.8,
  reviews: 25 + index,
  image: '/pipull/coding.png',
  inclusions: job.requiredSkills,
}))

export const gigTabs: { id: GigTab; label: string }[] = [
  { id: 'popular', label: 'Popular Gigs' },
  { id: 'express', label: 'Express Requests' },
  { id: 'academic', label: 'Academic Help' },
]

export const trustFeatures = [
  {
    id: 'identity',
    title: 'Verified Campus Identity',
    description:
      'Every provider authenticates with a .edu email and student ID, so you only ever transact with real, enrolled peers.',
  },
  {
    id: 'escrow',
    title: 'Escrow Payments & Guarantee',
    description:
      'Funds are held safely in escrow and released only when your gig is marked complete — never pay upfront and hope.',
  },
  {
    id: 'endorsements',
    title: 'Peer Endorsements & Skill Badges',
    description:
      'Skills are verified through completed gigs and endorsements from classmates, building reputation you can trust.',
  },
]

export type Activity = {
  id: string
  name: string
  action: string
  time: string
  color: string
}

export const liveActivity: Activity[] = [
  { id: 'a1', name: 'Alex', action: 'completed a Poster Design gig', time: '2m ago', color: '#2563eb' },
  { id: 'a2', name: 'Priya', action: 'finished a Calculus Tutoring session', time: '5m ago', color: '#10b981' },
  { id: 'a3', name: 'Marcus', action: 'delivered an Event Photo gallery', time: '11m ago', color: '#0f172a' },
  { id: 'a4', name: 'Sofia', action: 'shipped a Bug Fix in 42 minutes', time: '18m ago', color: '#2563eb' },
  { id: 'a5', name: 'Jordan', action: 'completed a Campus Pickup errand', time: '24m ago', color: '#10b981' },
]

export const topSkills = [
  { skill: 'Figma & Design', earnings: '$1,240', trend: '+18%' },
  { skill: 'STEM Tutoring', earnings: '$980', trend: '+12%' },
  { skill: 'Coding Help', earnings: '$860', trend: '+9%' },
  { skill: 'Event Photo', earnings: '$720', trend: '+15%' },
]

export function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
}
