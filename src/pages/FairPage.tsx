import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ArrowRight, Bot, BrainCircuit, Cpu, Leaf, Lightbulb, Radar, ScanLine, Sprout } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Mascot, { preloadMascot } from '../components/Mascot'
import type { MascotPose } from '../components/Mascot'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import { fair } from '../data/content'

const themes: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Lightbulb, title: 'Innovación', description: 'Ideas y proyectos que proponen nuevas formas de resolver los retos del territorio.' },
  { icon: Cpu, title: 'Tecnología', description: 'Drones, robótica e inteligencia artificial puestos al servicio de quienes producen.' },
  { icon: Leaf, title: 'Agricultura sostenible', description: 'Producir mejor cuidando el suelo, el agua y los cultivos de la región.' },
]

type Topic = {
  id: string
  icon: LucideIcon
  label: string
  title: string
  description: string
  pose: MascotPose
}

const topics: Topic[] = [
  {
    id: 'drones',
    icon: Radar,
    label: 'Drones agrícolas',
    title: 'Ojos en el cielo para cuidar el cultivo',
    description: 'Un dron recorre en minutos lo que a pie toma horas: permite revisar el estado de las plantas y aplicar insumos solo donde hacen falta.',
    pose: 'wave',
  },
  {
    id: 'precision',
    icon: ScanLine,
    label: 'Agricultura de precisión',
    title: 'Decidir con datos, no con suposiciones',
    description: 'Mapas, sensores e imágenes muestran qué necesita cada parte del terreno, para usar mejor el agua y los recursos.',
    pose: 'think',
  },
  {
    id: 'robotica',
    icon: Bot,
    label: 'Robótica',
    title: 'Máquinas que aprenden a ayudar',
    description: 'La robótica acerca la programación y la electrónica a problemas reales, desde el aula hasta el campo.',
    pose: 'confident',
  },
  {
    id: 'ia',
    icon: BrainCircuit,
    label: 'Inteligencia artificial',
    title: 'Tecnología que reconoce patrones',
    description: 'Los modelos de IA ayudan a interpretar imágenes y datos para anticiparse a lo que el ojo no alcanza a ver.',
    pose: 'surprised',
  },
]

function FairPage() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const topic = topics[selected]

  useEffect(() => {
    preloadMascot(topics.map((item) => item.pose))
  }, [])

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const step = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (selected + step + topics.length) % topics.length
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="section-wrap content-page">
      <PageIntro
        number="01"
        eyebrow="LA FERIA"
        title="Tecnología que"
        accent="siembra futuro."
        description={`TIC-ON es el encuentro donde la innovación y el campo se dan la mano. Llega a su ${fair.edition} edición en el ${fair.venue}.`}
      />

      <Reveal className="fair-feature-band">
        <p>Tres días para ver, probar y conversar sobre la tecnología que está transformando la agricultura.</p>
        <span><Sprout size={18} /> {fair.dateLabel.toUpperCase()}</span>
        <Mascot pose="confident" className="fair-mascot" label="Mascota de la feria en pose decidida" />
      </Reveal>

      <Reveal className="theme-grid">
        {themes.map((theme, index) => (
          <article className="theme-item" key={theme.title}>
            <span className="theme-number">0{index + 1}</span>
            <theme.icon size={26} />
            <h2>{theme.title}</h2>
            <p>{theme.description}</p>
          </article>
        ))}
      </Reveal>

      <Reveal className="explorer">
        <div className="explorer-heading">
          <p className="eyebrow menu-eyebrow">EXPLORA LOS TEMAS</p>
          <h2>Lo que inspira <span>esta edición.</span></h2>
        </div>
        <div className="explorer-body">
          <div className="explorer-tabs" role="tablist" aria-label="Temas de la feria" aria-orientation="vertical">
            {topics.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => { tabs.current[index] = node }}
                className={`explorer-tab${index === selected ? ' is-selected' : ''}`}
                type="button"
                role="tab"
                id={`tema-${item.id}`}
                aria-selected={index === selected}
                aria-controls="tema-panel"
                tabIndex={index === selected ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={onTabKeyDown}
              >
                <item.icon size={20} /> {item.label}
              </button>
            ))}
          </div>
          <div className="explorer-panel" role="tabpanel" id="tema-panel" aria-labelledby={`tema-${topic.id}`}>
            <div className="explorer-copy" key={topic.id}>
              <span className="explorer-count">0{selected + 1} / 0{topics.length}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
            <Mascot pose={topic.pose} className="explorer-mascot" label="" />
          </div>
        </div>
      </Reveal>

      <Link className="inline-link page-next-link" to="/agenda">Ver la agenda de los tres días <ArrowRight size={16} /></Link>
    </div>
  )
}

export default FairPage
