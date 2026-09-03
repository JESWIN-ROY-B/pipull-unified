import { ShieldCheck, Lock, Award } from 'lucide-react'
import { trustFeatures } from '@/lib/pipull-data'

const icons = [ShieldCheck, Lock, Award]

export function TrustSection() {
  return (
    <section className="border-y border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-verified">
            Trust &amp; Safety
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight">
            Built for safe, local, peer-to-peer exchange
          </h2>
          <p className="mt-2 text-pretty text-background/70">
            Pipull is designed around trust — because you&apos;re transacting with
            classmates, not strangers.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {trustFeatures.map((feature, i) => {
            const Icon = icons[i]
            return (
              <div
                key={feature.id}
                className="rounded-2xl border border-background/10 bg-background/5 p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-verified/15 text-verified">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-background/70">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
