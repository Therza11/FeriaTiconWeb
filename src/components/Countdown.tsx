import { fair } from '../data/content'
import { useCountdown } from '../hooks/useCountdown'

function Countdown() {
  const { phase, days, hours, minutes, seconds } = useCountdown(fair.startsAt, fair.endsAt)

  if (phase === 'during') {
    return <p className="countdown-status"><span className="status-dot" /> ¡La feria está en marcha! Te esperamos en el {fair.venue}.</p>
  }
  if (phase === 'after') {
    return <p className="countdown-status">Gracias por acompañarnos en esta edición.</p>
  }

  const units = [
    { value: days, label: 'días' },
    { value: hours, label: 'horas' },
    { value: minutes, label: 'min' },
    { value: seconds, label: 'seg' },
  ]

  return (
    <div className="countdown" role="timer" aria-label={`Faltan ${days} días, ${hours} horas y ${minutes} minutos para la feria`}>
      <span className="countdown-title">Faltan</span>
      {units.map((unit) => (
        <span className="countdown-unit" key={unit.label} aria-hidden="true">
          <span className="countdown-value">{String(unit.value).padStart(2, '0')}</span>
          <span className="countdown-label">{unit.label}</span>
        </span>
      ))}
    </div>
  )
}

export default Countdown
