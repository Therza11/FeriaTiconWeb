import { useEffect, useState } from 'react'

export type CountdownPhase = 'before' | 'during' | 'after'

export function useCountdown(startsAt: string, endsAt: string) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const start = new Date(startsAt).getTime()
  const end = new Date(endsAt).getTime()
  const phase: CountdownPhase = now < start ? 'before' : now < end ? 'during' : 'after'
  const remaining = Math.max(0, Math.floor((start - now) / 1000))

  return {
    phase,
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
  }
}
