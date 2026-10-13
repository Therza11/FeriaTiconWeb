import { ArrowRight, ArrowUpRight, CalendarDays, CirclePlay, Handshake, Info, MapPin, PenLine, Sprout } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CSSProperties, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Countdown from '../components/Countdown'
import MascotGuide from '../components/MascotGuide'
import type { MascotLine } from '../components/MascotGuide'
import Reveal from '../components/Reveal'
import { fair } from '../data/content'

type SectionCard = {
  to: string
  number: string
  title: string
  description: string
  icon: LucideIcon
  tone: string
}

const sections: SectionCard[] = [
  { to: '/feria', number: '01', title: 'La feria', description: 'Qué es TIC-ON y los temas que mueven esta edición.', icon: Sprout, tone: 'green' },
  { to: '/agenda', number: '02', title: 'Agenda', description: 'Tres días de encuentro: organiza tu visita.', icon: CalendarDays, tone: 'navy' },
  { to: '/multimedia', number: '03', title: 'Multimedia', description: 'Videos para conocer la feria antes de llegar.', icon: CirclePlay, tone: 'blue' },
  { to: '/inscripcion', number: '04', title: 'Inscripción', description: 'Reserva tu lugar en menos de un minuto.', icon: PenLine, tone: 'lime' },
  { to: '/aliados', number: '05', title: 'Aliados', description: 'Las organizaciones que hacen posible la feria.', icon: Handshake, tone: 'royal' },
]

const greetings: MascotLine[] = [
  { pose: 'wave', text: '¡Hola! Soy el robot anfitrión de la feria. Tócame y te cuento más.' },
  { pose: 'celebrate', text: 'Serán tres días de innovación, tecnología y agricultura sostenible.' },
  { pose: 'think', text: '¿Ya viste la agenda? Te ayuda a planear tu visita.' },
  { pose: 'thumbs-up', text: 'Inscribirte toma menos de un minuto. ¡Te espero!' },
]

function trackPointer(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget
  const bounds = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${event.clientX - bounds.left}px`)
  card.style.setProperty('--my', `${event.clientY - bounds.top}px`)
}

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <span className="home-hero-orbit" aria-hidden="true" />
        <div className="home-hero-inner">
          <div className="home-welcome">
            <p className="hero-eyebrow"><span className="status-dot" /> {fair.edition} EDICIÓN · {fair.dateLabel.toUpperCase()}</p>
            <h1>Sembrando semillas de <span>innovación</span></h1>
            <p className="home-description">
              La {fair.edition} {fair.name} reúne innovación, tecnología y agricultura sostenible en tres días para aprender, compartir y conectar.
            </p>
            <div className="hero-actions">
              <Link className="button button-light" to="/inscripcion">Inscribirme <ArrowRight size={17} /></Link>
              <Link className="text-link" to="/agenda">Ver la agenda <ArrowUpRight size={16} /></Link>
            </div>
            <Countdown />
          </div>
          <MascotGuide className="home-mascot" lines={greetings} />
        </div>
        <div className="home-hero-bar">
          <span className="hero-fact"><CalendarDays size={18} /> <span><strong>04 — 05 — 06</strong><small>NOVIEMBRE 2026</small></span></span>
          <span className="hero-fact"><MapPin size={18} /> <span><strong>{fair.venue}</strong><small>{fair.place.toUpperCase()}</small></span></span>
          <a className="scroll-cue" href="#secciones" aria-label="Ir a las secciones del sitio"><ArrowRight size={17} /></a>
        </div>
      </section>

      <section className="section-wrap home-menu" id="secciones">
        <Reveal className="home-menu-heading">
          <div>
            <p className="eyebrow menu-eyebrow">MENÚ PRINCIPAL</p>
            <h2>Explora la feria <span>a tu ritmo.</span></h2>
          </div>
          <p>Cada sección tiene lo esencial para que llegues con todo claro: qué verás, cuándo y cómo participar.</p>
        </Reveal>

        <div className="interface-grid">
          {sections.map((section, index) => (
            <Link
              key={section.to}
              className={`interface-card tone-${section.tone}`}
              to={section.to}
              style={{ '--i': index } as CSSProperties}
              onMouseMove={trackPointer}
            >
              <span className="interface-card-top"><span>{section.number}</span><section.icon size={22} /></span>
              <span className="interface-card-title">{section.title}</span>
              <span className="interface-card-description">{section.description}</span>
              <ArrowUpRight className="interface-card-arrow" size={20} />
            </Link>
          ))}
        </div>

        <Reveal className="home-info-strip">
          <Info size={18} />
          <span>La feria se realiza en el {fair.venue}, {fair.place}.</span>
          <Link to="/inscripcion">Reservar mi lugar <ArrowRight size={15} /></Link>
        </Reveal>
      </section>
    </>
  )
}

export default HomePage
