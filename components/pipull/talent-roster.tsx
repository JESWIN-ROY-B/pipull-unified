'use client'

import Image from 'next/image'
import { BadgeCheck, Star, ThumbsUp } from 'lucide-react'
import { students, type Student } from '@/lib/pipull-data'
import { Avatar } from './avatar'

function TalentCard({
  student,
  onHire,
}: {
  student: Student
  onHire: (s: Student) => void
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={student.portfolio || '/placeholder.svg'}
          alt={`${student.name}'s portfolio preview`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="-mt-10 flex items-end justify-between">
          <Avatar name={student.name} color={student.avatarColor} className="size-14 text-lg" />
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
            <Star className="size-3.5 fill-brand text-brand" />
            {student.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <h3 className="font-semibold text-foreground">{student.name}</h3>
          {student.verified && (
            <BadgeCheck className="size-4 text-verified" aria-label="Verified campus student" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {student.major} • {student.gradYear}
        </p>

        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          {student.tagline}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
            <ThumbsUp className="size-3" />
            {student.primarySkill} • {student.endorsements}
          </span>
          {student.secondarySkills.map((s) => (
            <span
              key={s}
              className="rounded-md bg-surface px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {student.completedGigs} completed campus gigs
        </p>

        <button
          type="button"
          onClick={() => onHire(student)}
          className="mt-4 w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-brand"
        >
          Hire / Request Gig
        </button>
      </div>
    </article>
  )
}

export function TalentRoster({ onHire }: { onHire: (s: Student) => void }) {
  return (
    <section id="talent" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Top Skilled Students
            </p>
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">
              Meet your campus talent roster
            </h2>
            <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
              Verified peers with endorsed skills, real portfolios, and a track
              record of completed gigs.
            </p>
          </div>
          <a
            href="#talent"
            className="text-sm font-semibold text-brand transition-colors hover:text-foreground"
          >
            View all students →
          </a>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {students.map((student) => (
            <TalentCard key={student.id} student={student} onHire={onHire} />
          ))}
        </div>
      </div>
    </section>
  )
}
