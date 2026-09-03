'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, CheckCircle2, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { demoAccounts, getDemoAccount, type DemoAccount } from '@/lib/pipull-demo'

type AuthMode = 'login' | 'signup'

type IdentifierKind = 'username' | 'phone' | 'email'

function classifyIdentifier(value: string): IdentifierKind | null {
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'email'
  if (/^\+?[0-9][0-9\s-]{7,14}$/.test(value)) return 'phone'
  if (/^[a-zA-Z0-9_.-]{3,24}$/.test(value)) return 'username'
  return null
}

function accountFromIdentifier(identifier: string, role: DemoAccount['role']): DemoAccount {
  const existing = getDemoAccount(identifier)
  if (existing) return existing
  const kind = classifyIdentifier(identifier)
  return {
    id: `local-${identifier.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    email: kind === 'email' ? identifier : `${identifier.toLowerCase().replace(/[^a-z0-9]+/g, '')}@pipull.local`,
    name: identifier.replace(/[._-]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    role,
    phone: kind === 'phone' ? identifier : '+91 90000 00000',
  }
}

export function AuthScreen({ onLogin }: { onLogin: (account: DemoAccount) => void }) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<DemoAccount['role']>('job-seeker')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    setMessage('')
    const kind = classifyIdentifier(identifier.trim())
    if (!kind) {
      setMessage('Enter a valid username, phone number, or email address.')
      return
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters.')
      return
    }
    if (mode === 'signup' && password !== confirmPassword) {
      setMessage('Passwords do not match. Re-enter the same password to continue.')
      return
    }
    onLogin(accountFromIdentifier(identifier.trim(), role))
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode)
    setMessage('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl shadow-slate-200/70 sm:p-9">
        <div className="flex items-center justify-center gap-2 text-brand">
          <span className="grid size-10 place-items-center rounded-xl bg-brand text-lg font-black text-brand-foreground">P</span>
          <span className="font-mono text-lg font-bold tracking-[0.18em]">PIPULL</span>
        </div>
        <div className="mt-8 flex rounded-xl border border-border bg-surface p-1" role="tablist" aria-label="Authentication mode">
          {(['login', 'signup'] as AuthMode[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => switchMode(item)} className={`min-h-11 flex-1 rounded-lg text-sm font-bold capitalize transition ${mode === item ? 'bg-brand text-brand-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              {item === 'login' ? 'Sign in' : 'Sign up'}
            </button>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="size-5 text-verified" /> Secure account access</div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Use a username, phone number, or email. Valid entries are required before continuing.</p>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <label className="block text-sm font-medium">Username, phone, or email<input autoFocus required value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="you@example.com or username" className="mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20" /></label>
          {mode === 'signup' && <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setRole('job-seeker')} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${role === 'job-seeker' ? 'border-brand bg-accent text-brand' : 'border-border'}`}>Worker</button><button type="button" onClick={() => setRole('recruiter')} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${role === 'recruiter' ? 'border-brand bg-accent text-brand' : 'border-border'}`}>Customer</button></div>}
          <label className="block text-sm font-medium">Password<div className="relative mt-2"><input required minLength={8} type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" className="min-h-12 w-full rounded-xl border border-input bg-background px-4 pr-12 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-3.5 text-muted-foreground">{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></div></label>
          {mode === 'signup' && <label className="block text-sm font-medium">Confirm password<input required minLength={8} type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter your password" className="mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20" /></label>}
          <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-brand-foreground transition hover:-translate-y-0.5">{mode === 'login' ? 'Sign in' : 'Sign up'} <ArrowRight className="size-4" /></button>
        </form>
        {message && <p role="alert" className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">{message}</p>}
        <div className="mt-8 border-t border-border pt-6"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"><CheckCircle2 className="size-4 text-verified" /> Demo accounts</p><div className="mt-3 grid gap-2">{demoAccounts.map((account) => <button type="button" key={account.email} onClick={() => { setIdentifier(account.email); setPassword('demo-password') }} className="flex items-center justify-between rounded-xl border border-border px-3 py-3 text-left text-sm transition hover:border-brand hover:bg-accent"><span><span className="block font-semibold">{account.email}</span><span className="text-xs text-muted-foreground">Use any 8+ character password</span></span><ArrowRight className="size-4 text-muted-foreground" /></button>)}</div></div>
      </section>
    </main>
  )
}
