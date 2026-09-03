import { PipullLogo } from './logo'

const columns = [
  {
    title: 'Marketplace',
    links: ['Discover gigs', 'Browse talent', 'Post a gig', 'Categories'],
  },
  {
    title: 'For students',
    links: ['Become a provider', 'Skill endorsements', 'Earnings & payouts', 'Success stories'],
  },
  {
    title: 'Trust & safety',
    links: ['Verification', 'Escrow protection', 'Community guidelines', 'Report an issue'],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <PipullLogo />
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              The trusted, hyper-local marketplace where campus skills become
              opportunity.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pipull. Built for campus, by campus.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#top" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#top" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#top" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
