import { createClient } from '@supabase/supabase-js'
import type { Participation } from '../data/content'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const registrationEnabled = supabase !== null

export type Registration = {
  full_name: string
  email: string
  phone: string
  organization: string
  participation: Participation
  consent: boolean
}

const UNIQUE_VIOLATION = '23505'

export async function submitRegistration(registration: Registration) {
  if (!supabase) {
    throw new Error('La inscripción en línea estará disponible cuando se configure el servicio de registro.')
  }

  const { error } = await supabase.from('registrations').insert({
    ...registration,
    full_name: registration.full_name.trim(),
    email: registration.email.trim().toLowerCase(),
    phone: registration.phone.trim(),
    organization: registration.organization.trim(),
  })

  if (!error) return
  if (error.code === UNIQUE_VIOLATION) {
    throw new Error('Este correo ya está inscrito en la feria.')
  }
  throw new Error('No pudimos guardar tu inscripción. Revisa tu conexión e inténtalo de nuevo.')
}
