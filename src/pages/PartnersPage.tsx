import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Mascot from '../components/Mascot'
import PageIntro from '../components/PageIntro'
import Reveal from '../components/Reveal'
import { partners } from '../data/content'

function PartnersPage() {
  return (
    <div className="section-wrap content-page">
      <PageIntro
        number="05"
        eyebrow="ALIADOS"
        title="Crecemos"
        accent="en red."
        description="La feria es posible gracias a las organizaciones que creen en la innovación y en el campo."
      />

      <Reveal>
        <ul className="partner-page-grid">
          {partners.map((partner, index) => (
            <li className="partner-tile" key={partner.name}>
              <span className="partner-number">0{index + 1}</span>
              <span className="partner-logo"><img src={partner.logo} alt="" loading="lazy" /></span>
              <strong>{partner.name}</strong>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="partner-thanks">
        <div>
          <p><strong>Gracias por sembrar con nosotros.</strong> Cada aliado suma conocimiento, tecnología y manos para que la feria llegue más lejos.</p>
          <Link className="inline-link" to="/inscripcion">Quiero participar <ArrowRight size={16} /></Link>
        </div>
        <Mascot pose="thumbs-up" className="partners-mascot" label="Mascota de la feria con el pulgar arriba" />
      </Reveal>
    </div>
  )
}

export default PartnersPage
