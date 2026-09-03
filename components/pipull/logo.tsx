export function PipullLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="flex items-center gap-2">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* connecting link between the two peer nodes */}
          <path
            d="M11 21 L21 11"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* lower-left peer node */}
          <circle cx="9" cy="23" r="5" fill="#2563eb" />
          {/* upper-right peer node with growth accent */}
          <circle cx="23" cy="9" r="5" fill="#10b981" />
          {/* upward growth accent */}
          <path
            d="M23 9 L27 5 M27 5 L24 5 M27 5 L27 8"
            stroke="#0f172a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xl font-bold tracking-tight text-foreground">
          Pipull
        </span>
      </span>
    </div>
  )
}
