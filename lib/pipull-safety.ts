export type JobStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'

export function isRateLimited(attempts: number, now: number, windowStartedAt: number, limit = 5, windowMs = 15 * 60_000) {
  return now - windowStartedAt < windowMs && attempts >= limit
}

export function canVerifyOtp(code: string, expected: string, attempts: number, maxAttempts = 5) {
  return attempts < maxAttempts && /^\d{6}$/.test(code) && code === expected
}

const transitions: Record<JobStatus, JobStatus[]> = {
  requested: ['accepted', 'cancelled'],
  accepted: ['in_progress', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
}

export function canTransitionJob(from: JobStatus, to: JobStatus) {
  return transitions[from].includes(to)
}

export function validateCheckout(items: Array<{ price: number; quantity?: number }>, maxTotal = 10_000) {
  if (!items.length) return { ok: false as const, error: 'At least one item is required.' }
  const total = items.reduce((sum, item) => {
    const quantity = item.quantity ?? 1
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10 || !Number.isFinite(item.price) || item.price < 0) return Number.NaN
    return sum + item.price * quantity
  }, 0)
  if (!Number.isFinite(total) || total > maxTotal) return { ok: false as const, error: 'Checkout total or quantity is invalid.' }
  return { ok: true as const, total }
}

export function compressImage(file: File, maxWidth = 1600, quality = 0.82) {
  return new Promise<Blob>((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const scale = Math.min(1, maxWidth / image.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      const context = canvas.getContext('2d')
      if (!context) return reject(new Error('Canvas is unavailable.'))
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Image compression failed.'))), 'image/jpeg', quality)
      URL.revokeObjectURL(image.src)
    }
    image.onerror = () => reject(new Error('Image could not be read.'))
    image.src = URL.createObjectURL(file)
  })
}
