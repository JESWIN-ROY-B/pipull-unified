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

function accountFromIdentifier(identifier: string, role: DemoAccount['role'], name?: string): DemoAccount {
  const existing = getDemoAccount(identifier)
  if (existing) return existing
  const kind = classifyIdentifier(identifier)
  return { id: `local-${identifier.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, email: kind === 'email' ? identifier : `${identifier.toLowerCase().replace(/[^a-z0-9]+/g, '')}@pipull.local`, name: name || identifier.replace(/[._-]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()), role, phone: kind === 'phone' ? identifier : '+91 90000 00000' }
}

export function AuthScreen({ onLogin }: { onLogin: (account: DemoAccount) => void }) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [identifier, setIdentifier] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [aadhaarName, setAadhaarName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [usernameState, setUsernameState] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')

  async function checkUsername(value = username) {
    const candidate = value.trim().toLowerCase()
    if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(candidate)) { setUsernameState('idle'); return }
    setUsernameState('checking')
    try {
      const response = await fetch(`/api/auth/username-availability?username=${encodeURIComponent(candidate)}`)
      const result = await response.json() as { available?: boolean }
      setUsernameState(result.available ? 'available' : 'taken')
    } catch { setUsernameState('idle') }
  }

  function submit(event: FormEvent) {
    event.preventDefault(); setMessage('')
    if (mode === 'signup') {
      if (!firstName.trim() || !lastName.trim() || !aadhaarName.trim()) { setMessage('Enter your first name, last name, and name exactly as shown on Aadhaar.'); return }
      if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(username.trim())) { setMessage('Choose a username between 3 and 24 characters.'); return }
      if (usernameState !== 'available') { setMessage(usernameState === 'checking' ? 'Wait for username availability to finish checking.' : 'Choose an available username.'); return }
    }
    const loginIdentifier = mode === 'signup' ? username.trim() : identifier.trim()
    if (!classifyIdentifier(loginIdentifier)) { setMessage('Enter a valid username, phone number, or email address.'); return }
    if (password.length < 8) { setMessage('Password must be at least 8 characters.'); return }
    if (mode === 'signup' && password !== confirmPassword) { setMessage('Passwords do not match.'); return }
    onLogin(accountFromIdentifier(loginIdentifier, 'recruiter', mode === 'signup' ? `${firstName.trim()} ${lastName.trim()}` : undefined))
  }

  function switchMode(nextMode: AuthMode) { setMode(nextMode); setMessage(''); setPassword(''); setConfirmPassword(''); setUsernameState('idle') }
  const inputClass = 'mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20'

  return <main className="flex min-h-dvh w-full items-center justify-center bg-surface px-4 py-8 sm:px-8 lg:px-12"><section className="flex min-h-[calc(100dvh-4rem)] w-full max-w-5xl flex-col justify-center rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-slate-200/70 sm:p-12 lg:p-16"><div className="mx-auto w-full max-w-2xl"><div className="flex items-center justify-center gap-2 text-brand"><span className="grid size-11 place-items-center rounded-xl bg-brand text-lg font-black text-brand-foreground">P</span><span className="font-mono text-xl font-bold tracking-[0.18em]">PIPULL</span></div><div className="mt-10 flex rounded-xl border border-border bg-surface p-1" role="tablist" aria-label="Authentication mode">{(['login', 'signup'] as AuthMode[]).map((item) => <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => switchMode(item)} className={`min-h-12 flex-1 rounded-lg text-sm font-bold capitalize transition ${mode === item ? 'bg-brand text-brand-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{item === 'login' ? 'Sign in' : 'Sign up'}</button>)}</div><div className="mt-9 flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="size-5 text-verified" /> Secure account access</div><p className="mt-4 rounded-xl border border-brand/20 bg-accent/40 px-4 py-3 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">PiPull is a cooperative.</strong> Members create fair local work together, share value transparently, and participate in community decisions.</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">{mode === 'login' ? 'Use a username, phone number, or email. Valid entries are required before continuing.' : 'Use your legal name and choose an available username to create your PiPull account.'}</p><form onSubmit={submit} className="mt-7 space-y-5">{mode === 'signup' && <><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">First name<input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className={inputClass} /></label><label className="block text-sm font-medium">Last name<input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className={inputClass} /></label></div><label className="block text-sm font-medium">Name as per Aadhaar<input required value={aadhaarName} onChange={(e) => setAadhaarName(e.target.value)} placeholder="Exact name on Aadhaar" className={inputClass} /></label><label className="block text-sm font-medium">Username<div className="relative"><input required value={username} onChange={(e) => { setUsername(e.target.value); setUsernameState('idle') }} onBlur={() => void checkUsername()} placeholder="Choose a username" className={`${inputClass} pr-32`} />{usernameState !== 'idle' && <span className={`absolute right-3 top-5 text-xs font-bold ${usernameState === 'available' ? 'text-verified' : usernameState === 'taken' ? 'text-red-600' : 'text-muted-foreground'}`}>{usernameState === 'checking' ? 'Checking…' : usernameState === 'available' ? 'Available' : 'Unavailable'}</span>}</div></label></>}{mode === 'login' ? <label className="block text-sm font-medium">Username, phone, or email<input autoFocus required value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="you@example.com or username" className={inputClass} /></label> : <label className="block text-sm font-medium">Email or phone<input required value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="you@example.com or +91 phone" className={inputClass} /></label>}<label className="block text-sm font-medium">Password<div className="relative"><input required minLength={8} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className={`${inputClass} pr-12`} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-3.5 text-muted-foreground">{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></div></label>{mode === 'signup' && <label className="block text-sm font-medium">Confirm password<input required minLength={8} type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" className={inputClass} /></label>}<button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-brand-foreground transition hover:-translate-y-0.5">{mode === 'login' ? 'Sign in' : 'Sign up'} <ArrowRight className="size-4" /></button></form>{message && <p role="alert" className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">{message}</p>}<div className="mt-8 border-t border-border pt-6"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"><CheckCircle2 className="size-4 text-verified" /> Demo accounts</p><div className="mt-3 grid gap-2 sm:grid-cols-3">{demoAccounts.map((account) => <button type="button" key={account.email} onClick={() => { setIdentifier(account.email); setPassword('demo-password'); setMode('login') }} className="flex items-center justify-between rounded-xl border border-border px-3 py-3 text-left text-sm transition hover:border-brand hover:bg-accent"><span><span className="block truncate font-semibold">{account.email}</span><span className="text-xs text-muted-foreground">Use any 8+ password</span></span><ArrowRight className="size-4 shrink-0 text-muted-foreground" /></button>)}</div></div></div></section></main>
}
