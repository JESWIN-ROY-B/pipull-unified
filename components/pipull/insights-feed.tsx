import { TrendingUp, Activity as ActivityIcon } from 'lucide-react'
import { liveActivity, topSkills } from '@/lib/pipull-data'

export function InsightsFeed() {
  return (
    <section id="feed" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Campus Feed
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground">
            The campus economy, in real time
          </h2>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Live activity */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <ActivityIcon className="size-5 text-brand" />
              <h3 className="font-semibold text-foreground">Live activity</h3>
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-verified">
                <span className="size-1.5 animate-pulse rounded-full bg-verified" />
                Updating
              </span>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {liveActivity.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  >
                    {item.name[0]}
                  </span>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{item.name}</span>{' '}
                    <span className="text-muted-foreground">{item.action}</span>
                  </p>
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top earning skills */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-verified" />
              <h3 className="font-semibold text-foreground">Top earning skills</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">This week on campus</p>
            <ul className="mt-4 space-y-3">
              {topSkills.map((item, i) => (
                <li key={item.skill} className="flex items-center gap-3">
                  <span className="w-5 text-sm font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.skill}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.earnings}
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-verified/10 px-1.5 py-0.5 text-xs font-semibold text-verified">
                    {item.trend}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
