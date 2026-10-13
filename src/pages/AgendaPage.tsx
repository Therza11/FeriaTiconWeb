import { useState } from 'react'
import { ArrowRight, ChevronDown, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import CalendarActions from '../components/CalendarActions'
import Mascot from '../components/Mascot'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import { fair, fairDays } from '../data/content'

function AgendaPage() {
  const [openDay, setOpenDay] = useState<number | null>(0)

  return (
    <div className="agenda-page">
      <div className="section-wrap agenda-page-inner">
        <PageIntro
          dark
          number="02"
          eyebrow="AGENDA"
          title="Tres días para"
          accent="conectar ideas."
          description="Elige el día que más te interese o acompáñanos en toda la feria. Toca cada jornada para ver su detalle."
        />

        <Reveal>
          <ul className="day-list">
            {fairDays.map((day, index) => {
              const open = openDay === index
              return (
                <li className={`day-item${open ? ' is-open' : ''}`} key={day.index}>
                  <button
                    className="day-row"
                    type="button"
                    aria-expanded={open}
                    aria-controls={`dia-${day.index}`}
                    onClick={() => setOpenDay(open ? null : index)}
                  >
                    <span className="day-index">DÍA {day.index}</span>
                    <span className="day-date">{day.date}</span>
                    <span className="day-month">NOV<br />{day.weekday.toUpperCase()}</span>
                    <span className="day-text"><strong>{day.title}</strong><span>{day.summary}</span></span>
                    <ChevronDown className="day-chevron" size={20} />
                  </button>
                  <div className="day-panel" id={`dia-${day.index}`} aria-hidden={!open}>
                    <div className="day-panel-inner">
                      {day.sessions.length > 0 ? (
                        <ol className="session-list">
                          {day.sessions.map((session) => (
                            <li key={`${session.time}-${session.title}`}>
                              <span className="session-time"><Clock size={14} /> {session.time}</span>
                              <span className="session-title">{session.title}</span>
                              {session.place && <span className="session-place">{session.place}</span>}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="day-pending">
                          <Clock size={16} /> La programación detallada de esta jornada se publicará pronto.
                        </p>
                      )}
                      <p className="day-place"><MapPin size={16} /> {fair.venue}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal className="agenda-footer">
          <div className="agenda-meta">
            <span><MapPin size={17} /> {fair.venue} · {fair.place}</span>
            <div className="agenda-calendar">
              <span className="agenda-calendar-label">AGREGAR A MI CALENDARIO</span>
              <CalendarActions />
            </div>
          </div>
          <div className="agenda-mascot-note">
            <Mascot pose="think" className="agenda-mascot" label="Mascota de la feria pensando" />
            <p>
              <strong>¿Vienes los tres días?</strong>
              Inscríbete una sola vez y participa en todas las jornadas.
              <Link className="text-link" to="/inscripcion">Inscribirme <ArrowRight size={15} /></Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default AgendaPage
