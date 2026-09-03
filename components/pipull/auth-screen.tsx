'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, CheckCircle2, KeyRound, ShieldCheck, Smartphone } from 'lucide-react'
import { demoAccounts, getDemoAccount, getRoleLabel, type DemoAccount } from '@/lib/pipull-demo'

export function AuthScreen({ onLogin }: { onLogin: (account: DemoAccount) => void }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [signupStep, setSignupStep] = useState<1 | 2 | 3>(1)
  const [role, setRole] = useState<'recruiter' | 'job-seeker'>('job-seeker')
  const [location, setLocation] = useState('Delhi/NCR')
  const [skill, setSkill] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [message, setMessage] = useState('')

  function submitEmail(event: FormEvent) {
    event.preventDefault()
    const account = getDemoAccount(email)
    if (!account) {
      setMessage('For the hackathon demo, use one of the pre-seeded accounts below.')
      return
    }
    setPhone(account.phone)
    setStep('otp')
    setMessage(`Demo OTP sent to ${account.phone}. Enter any 4 digits to continue.`)
  }

  function submitOtp(event: FormEvent) {
    event.preventDefault()
    const account = getDemoAccount(email)
    if (!account || !/^\d{4}$/.test(otp)) {
      setMessage('Enter a 4-digit OTP to continue.')
      return
    }
    onLogin(account)
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-4 py-10 sm:px-6">
      <section className="w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-slate-200/70">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-brand px-6 py-10 text-brand-foreground sm:px-12 sm:py-14">
            <p className="font-mono text-sm font-bold tracking-[0.18em]">PIPULL</p>
            <h1 className="mt-10 max-w-lg text-balance text-4xl font-bold tracking-tight sm:text-6xl">Local skills. Real opportunity.</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-brand-foreground/80">A trusted marketplace for finding reliable help and getting your skills hired on campus.</p>
            <div className="mt-12 grid gap-4 text-sm">
              {['Verified people, not anonymous listings', 'Match scores tuned to your real request', 'Payments designed for transparent platform fees'].map((item) => (
                <div key={item} className="flex items-center gap-3"><CheckCircle2 className="size-5 shrink-0 text-emerald-300" />{item}</div>
              ))}
            </div>
          </div>
          <div className="px-6 py-10 sm:px-12 sm:py-14">
            <div className="flex items-center gap-3 text-sm font-semibold text-foreground"><ShieldCheck className="size-5 text-verified" /> Secure demo sign in</div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Use your mobile number and OTP. Demo accounts are ready for evaluation.</p>
            {step === 'email' ? (
              <form onSubmit={submitEmail} className="mt-8 space-y-5">
                <label className="block text-sm font-medium">Email address<input autoFocus required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@college.edu" className="mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none ring-brand/20 transition focus:border-brand focus:ring-4" /></label>
                <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-brand-foreground transition hover:-translate-y-0.5">Continue <ArrowRight className="size-4" /></button>
              </form>
            ) : (
              <form onSubmit={submitOtp} className="mt-8 space-y-5">
                <div className="flex items-center gap-3 rounded-xl bg-surface p-3 text-sm"><Smartphone className="size-5 text-brand" /><span>Code sent to {phone}</span></div>
                <label className="block text-sm font-medium">4-digit OTP<input autoFocus required inputMode="numeric" maxLength={4} pattern="[0-9]{4}" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="1234" className="mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-center text-lg tracking-[0.4em] outline-none focus:border-brand focus:ring-4 focus:ring-brand/20" /></label>
                <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-brand-foreground"><KeyRound className="size-4" /> Enter demo dashboard</button>
                <button type="button" onClick={() => setStep('email')} className="w-full text-sm font-semibold text-brand">Use a different email</button>
              </form>
            )}
            {message && <p role="status" className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">{message}</p>}
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setSignupStep(1); setMessage('') }} className="mt-6 w-full rounded-xl border border-brand/30 bg-accent px-4 py-3 text-sm font-bold text-brand transition hover:border-brand">{mode === 'login' ? 'New to Pipull? Sign Up' : 'Already have an account? Sign in'}</button>
            {mode === 'signup' && <div className="mt-5 rounded-2xl border border-border bg-surface p-4"><div className="flex items-center justify-between"><p className="text-sm font-bold">Sign up in 3 steps</p><span className="text-xs font-semibold text-brand">Step {signupStep} of 3</span></div>{signupStep === 1 && <div className="mt-4 space-y-3"><label className="block text-sm font-medium">Mobile or email<input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@college.edu" className="mt-2 min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand" /></label><button type="button" onClick={() => setSignupStep(2)} className="min-h-11 w-full rounded-xl bg-brand px-4 text-sm font-semibold text-brand-foreground">Verify OTP</button></div>}{signupStep === 2 && <div className="mt-4 space-y-3"><p className="text-sm text-muted-foreground">Choose how you will use Pipull.</p><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setRole('job-seeker')} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${role === 'job-seeker' ? 'border-brand bg-accent text-brand' : 'border-border'}`}>Job seeker</button><button type="button" onClick={() => setRole('recruiter')} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${role === 'recruiter' ? 'border-brand bg-accent text-brand' : 'border-border'}`}>Recruiter</button></div><button type="button" onClick={() => setSignupStep(3)} className="min-h-11 w-full rounded-xl bg-brand px-4 text-sm font-semibold text-brand-foreground">Continue</button></div>}{signupStep === 3 && <div className="mt-4 space-y-3"><label className="block text-sm font-medium">Location<input value={location} onChange={(event) => setLocation(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand" /></label><label className="block text-sm font-medium">Core trade or skill<input value={skill} onChange={(event) => setSkill(event.target.value)} placeholder="Electrician, plumbing, cooking..." className="mt-2 min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-brand" /></label><button type="button" onClick={() => onLogin({ email: email || 'new@pipul.com', name: 'New Pipull Member', role, phone: '+91 90000 00000' })} className="min-h-11 w-full rounded-xl bg-brand px-4 text-sm font-semibold text-brand-foreground">Create demo profile</button></div>}</div>}
            <div className="mt-8 border-t border-border pt-6"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Demo accounts</p><div className="mt-3 grid gap-2">{demoAccounts.map((account) => <button type="button" key={account.email} onClick={() => { setEmail(account.email); setMessage('Selected demo account. Continue to receive the OTP.') }} className="flex items-center justify-between rounded-xl border border-border px-3 py-3 text-left text-sm transition hover:border-brand hover:bg-accent"><span><span className="block font-semibold">{account.email}</span><span className="text-xs text-muted-foreground">{getRoleLabel(account.role)}</span></span><ArrowRight className="size-4 text-muted-foreground" /></button>)}</div></div>
          </div>
        </div>
      </section>
    </main>
  )
}
