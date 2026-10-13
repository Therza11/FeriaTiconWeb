import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, CalendarDays, CircleAlert, CircleCheck, Info, MapPin } from 'lucide-react'
import CalendarActions from '../components/CalendarActions'
import Mascot, { preloadMascot } from '../components/Mascot'
import type { MascotLine } from '../components/MascotGuide'
import PageIntro from '../components/PageIntro'
import { fair, participationOptions } from '../data/content'
import type { Participation } from '../data/content'
import { registrationEnabled, submitRegistration } from '../lib/supabase'

type FormValues = {
  full_name: string
  email: string
  phone: string
  organization: string
  participation: Participation | ''
  consent: boolean
}

type FieldName = keyof FormValues
type Status = 'idle' | 'sending' | 'success' | 'error'

const emptyForm: FormValues = { full_name: '', email: '', phone: '', organization: '', participation: '', consent: false }
const requiredFields: FieldName[] = ['full_name', 'email', 'participation', 'consent']

function validate(values: FormValues) {
  const errors: Partial<Record<FieldName, string>> = {}
  const name = values.full_name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()

  if (name.length < 2) errors.full_name = 'Escribe tu nombre completo.'
  else if (name.length > 120) errors.full_name = 'El nombre es demasiado largo.'

  if (!email) errors.email = 'Escribe tu correo electrónico.'
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Revisa el correo: debe verse como nombre@dominio.com.'

  if (phone && !/^\+?[\d\s-]{7,20}$/.test(phone)) errors.phone = 'Usa solo números, espacios o guiones (mínimo 7 dígitos).'
  if (values.organization.trim().length > 120) errors.organization = 'El nombre de la organización es demasiado largo.'
  if (!values.participation) errors.participation = 'Elige cómo vas a participar.'
  if (!values.consent) errors.consent = 'Necesitamos tu autorización para inscribirte.'

  return errors
}

function RegistrationPage() {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')

  const errors = validate(values)
  const completed = requiredFields.filter((field) => !errors[field]).length
  const started = Object.values(touched).some(Boolean) || values.full_name !== ''
  const firstName = values.full_name.trim().split(/\s+/)[0]

  useEffect(() => {
    preloadMascot(['celebrate', 'surprised', 'think', 'thumbs-up', 'confident'])
  }, [])

  function update<K extends FieldName>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }))
    if (status === 'error') setStatus('idle')
  }

  const touch = (field: FieldName) => setTouched((current) => ({ ...current, [field]: true }))
  const errorFor = (field: FieldName) => (touched[field] || attempted ? errors[field] : undefined)
  const describe = (field: FieldName) => (errorFor(field) ? `${field}-error` : undefined)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)

    const firstInvalid = (Object.keys(errors) as FieldName[])[0]
    if (firstInvalid) {
      setStatus('error')
      setMessage('Revisa los campos marcados para continuar.')
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    if (website) {
      setStatus('success')
      return
    }

    setStatus('sending')
    setMessage('')
    try {
      await submitRegistration({ ...values, participation: values.participation as Participation })
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'No pudimos guardar tu inscripción. Inténtalo de nuevo.')
    }
  }

  function reset() {
    setValues(emptyForm)
    setTouched({})
    setAttempted(false)
    setStatus('idle')
    setMessage('')
  }

  const mood: MascotLine =
    status === 'success' ? { pose: 'celebrate', text: '¡Inscripción lista! Nos vemos en la feria.' }
    : status === 'error' ? { pose: 'surprised', text: '¡Ups! Algo falta. Revisa lo que quedó marcado.' }
    : status === 'sending' ? { pose: 'think', text: 'Guardando tu inscripción…' }
    : completed === requiredFields.length ? { pose: 'thumbs-up', text: '¡Todo en orden! Ya puedes enviar.' }
    : started ? { pose: 'confident', text: `Vas muy bien: ${completed} de ${requiredFields.length} datos listos.` }
    : { pose: 'wave', text: 'Solo necesito unos datos para guardar tu lugar.' }

  return (
    <div className="registration-page">
      <div className="section-wrap registration-layout">
        <div className="registration-copy">
          <PageIntro
            dark
            number="04"
            eyebrow="INSCRIPCIÓN"
            title="Reserva tu"
            accent="lugar."
            description="Llenar el formulario toma menos de un minuto. Con tu inscripción sabremos que vienes."
          />
          <p className="registration-date"><CalendarDays size={18} /> {fair.dateLabel}</p>
          <p className="registration-date"><MapPin size={18} /> {fair.venue} · {fair.place}</p>

          <div className="registration-mascot-box">
            <Mascot pose={mood.pose} className="registration-mascot" label="" />
            <p className="speech-bubble speech-bubble-left" aria-live="polite"><span key={mood.text}>{mood.text}</span></p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="registration-form registration-success" role="status">
            <CircleCheck size={40} />
            <h2>{firstName ? `¡Listo, ${firstName}!` : '¡Listo!'}</h2>
            <p>Tu inscripción a la {fair.edition} {fair.name} quedó registrada. Te esperamos del {fair.dateLabel} en el {fair.venue}.</p>
            <p className="success-label">GUÁRDALO EN TU CALENDARIO</p>
            <CalendarActions />
            <button className="text-link success-reset" type="button" onClick={reset}>Inscribir a otra persona <ArrowRight size={15} /></button>
          </div>
        ) : (
          <form className="registration-form" onSubmit={onSubmit} noValidate>
            <div className="form-heading">
              <span>FORMULARIO DE INSCRIPCIÓN</span>
              <span>{completed} / {requiredFields.length}</span>
            </div>
            <div className="form-progress" aria-hidden="true"><span style={{ width: `${(completed / requiredFields.length) * 100}%` }} /></div>

            {!registrationEnabled && (
              <p className="form-notice"><Info size={17} /> La inscripción en línea aún no está habilitada. Vuelve pronto para reservar tu lugar.</p>
            )}

            <div className="field-group">
              <label className="field-label" htmlFor="full_name">Nombre completo <span>*</span></label>
              <input
                id="full_name" name="full_name" type="text" autoComplete="name" maxLength={120} placeholder="Como aparece en tu documento"
                value={values.full_name} onChange={(event) => update('full_name', event.target.value)} onBlur={() => touch('full_name')}
                aria-invalid={Boolean(errorFor('full_name'))} aria-describedby={describe('full_name')} required
              />
              {errorFor('full_name') && <p className="field-error" id="full_name-error"><CircleAlert size={14} /> {errorFor('full_name')}</p>}
            </div>

            <div className="field-row">
              <div className="field-group">
                <label className="field-label" htmlFor="email">Correo electrónico <span>*</span></label>
                <input
                  id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} placeholder="nombre@correo.com"
                  value={values.email} onChange={(event) => update('email', event.target.value)} onBlur={() => touch('email')}
                  aria-invalid={Boolean(errorFor('email'))} aria-describedby={describe('email')} required
                />
                {errorFor('email') && <p className="field-error" id="email-error"><CircleAlert size={14} /> {errorFor('email')}</p>}
              </div>
              <div className="field-group">
                <label className="field-label" htmlFor="phone">Teléfono <small>opcional</small></label>
                <input
                  id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={20} placeholder="300 000 0000"
                  value={values.phone} onChange={(event) => update('phone', event.target.value)} onBlur={() => touch('phone')}
                  aria-invalid={Boolean(errorFor('phone'))} aria-describedby={describe('phone')}
                />
                {errorFor('phone') && <p className="field-error" id="phone-error"><CircleAlert size={14} /> {errorFor('phone')}</p>}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="organization">Institución u organización <small>opcional</small></label>
              <input
                id="organization" name="organization" type="text" autoComplete="organization" maxLength={120} placeholder="Colegio, empresa, asociación…"
                value={values.organization} onChange={(event) => update('organization', event.target.value)} onBlur={() => touch('organization')}
                aria-invalid={Boolean(errorFor('organization'))} aria-describedby={describe('organization')}
              />
              {errorFor('organization') && <p className="field-error" id="organization-error"><CircleAlert size={14} /> {errorFor('organization')}</p>}
            </div>

            <fieldset className="field-group choice-field" aria-describedby={describe('participation')}>
              <legend className="field-label">¿Cómo vas a participar? <span>*</span></legend>
              <div className="choice-row">
                {participationOptions.map((option) => (
                  <label className="choice" key={option.value}>
                    <input
                      type="radio" name="participation" value={option.value}
                      checked={values.participation === option.value}
                      onChange={() => { update('participation', option.value); touch('participation') }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errorFor('participation') && <p className="field-error" id="participation-error"><CircleAlert size={14} /> {errorFor('participation')}</p>}
            </fieldset>

            <label className="consent-label">
              <input
                type="checkbox" name="consent" checked={values.consent}
                onChange={(event) => { update('consent', event.target.checked); touch('consent') }}
                aria-invalid={Boolean(errorFor('consent'))} aria-describedby={describe('consent')} required
              />
              <span>Autorizo el tratamiento de mis datos personales para gestionar mi participación en la feria. <b>*</b></span>
            </label>
            {errorFor('consent') && <p className="field-error" id="consent-error"><CircleAlert size={14} /> {errorFor('consent')}</p>}

            <label className="trap-field" aria-hidden="true">
              Sitio web
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </label>

            <button className="button button-submit" type="submit" disabled={status === 'sending' || !registrationEnabled}>
              {status === 'sending' ? 'Enviando…' : 'Enviar inscripción'} <ArrowRight size={17} />
            </button>
            <p className={`form-message${status === 'error' ? ' is-error' : ''}`} role="alert">{status === 'error' ? message : ''}</p>
            <p className="form-required"><span>*</span> Campos obligatorios</p>
          </form>
        )}
      </div>
    </div>
  )
}

export default RegistrationPage
