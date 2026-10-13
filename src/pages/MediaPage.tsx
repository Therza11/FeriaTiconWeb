import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Mascot from '../components/Mascot'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import { videos } from '../data/content'

function MediaPage() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const video = videos[current]

  function select(index: number) {
    setCurrent((index + videos.length) % videos.length)
    setAutoPlay(true)
  }

  return (
    <div className="section-wrap content-page media-page">
      <PageIntro
        number="03"
        eyebrow="MULTIMEDIA"
        title="La feria,"
        accent="en movimiento."
        description="Un adelanto de lo que encontrarás: tecnología en el campo y nuestro robot anfitrión."
      />

      <Reveal>
        <div
          className={`media-player${video.portrait ? ' is-portrait' : ''}`}
          style={{ '--poster': `url("${video.poster}")` } as CSSProperties}
        >
          <video
            key={video.src}
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            autoPlay={autoPlay}
            aria-label={video.title}
            onEnded={() => { if (current < videos.length - 1) select(current + 1) }}
          />
        </div>

        <div className="media-bar">
          <p className="media-now"><span>{video.kicker.toUpperCase()}</span><strong>{video.title}</strong></p>
          <span className="media-counter">{String(current + 1).padStart(2, '0')}<span>/</span>{String(videos.length).padStart(2, '0')}</span>
          <button className="icon-button" type="button" aria-label="Video anterior" onClick={() => select(current - 1)}><ChevronLeft size={20} /></button>
          <button className="icon-button" type="button" aria-label="Video siguiente" onClick={() => select(current + 1)}><ChevronRight size={20} /></button>
        </div>

        <div className="media-picker">
          {videos.map((item, index) => (
            <button
              key={item.src}
              className={`media-option${index === current ? ' is-selected' : ''}`}
              type="button"
              aria-pressed={index === current}
              onClick={() => select(index)}
            >
              <span className="media-thumb">
                <img src={item.poster} alt="" loading="lazy" />
                <span className="media-option-play"><Play size={14} fill="currentColor" /></span>
              </span>
              <span className="media-option-text">
                <small>{index === current ? 'REPRODUCIENDO' : item.kicker.toUpperCase()} · {item.duration}</small>
                <strong>{item.title}</strong>
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="media-mascot-note">
        <p>¿Te gustó lo que viste?<br />En la feria lo vives en persona.</p>
        <Mascot pose="thumbs-up" className="media-mascot" label="Mascota de la feria con el pulgar arriba" />
      </div>
    </div>
  )
}

export default MediaPage
