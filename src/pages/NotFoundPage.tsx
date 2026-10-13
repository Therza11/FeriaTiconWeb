import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Mascot from '../components/Mascot'

function NotFoundPage() {
  return (
    <div className="section-wrap content-page not-found">
      <Mascot pose="surprised" className="not-found-mascot" label="Mascota de la feria sorprendida" />
      <div>
        <p className="eyebrow menu-eyebrow">ERROR 404</p>
        <h1>Esta página <span>no existe.</span></h1>
        <p>Puede que el enlace haya cambiado o tenga un error. Desde el inicio encuentras todas las secciones de la feria.</p>
        <Link className="button button-dark" to="/">Volver al inicio <ArrowRight size={17} /></Link>
      </div>
    </div>
  )
}

export default NotFoundPage
