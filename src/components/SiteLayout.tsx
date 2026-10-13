import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUp, MapPin, Menu, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '../assets/logo.webp'
import { fair } from '../data/content'

const navigation = [
  { to: '/feria', label: 'La feria' },
  { to: '/agenda', label: 'Agenda' },
  { to: '/multimedia', label: 'Multimedia' },
  { to: '/aliados', label: 'Aliados' },
]

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <Link className="wordmark" to="/" aria-label={`${fair.edition} ${fair.name}, menú principal`}>
          <img className="site-logo" src={logo} width={560} height={241} alt="" />
        </Link>
        <button className="menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="navegacion" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="navegacion" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Inicio</NavLink>
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>
          ))}
          <NavLink className="nav-register" to="/inscripcion" onClick={() => setMenuOpen(false)}>Inscribirme <ArrowRight size={16} /></NavLink>
        </nav>
      </header>

      <main id="contenido" className="page-transition" key={pathname}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-about">
            <Link className="footer-brand" to="/" aria-label={`${fair.edition} ${fair.name}, menú principal`}>
              <img className="site-logo" src={logo} width={560} height={241} alt="" loading="lazy" />
            </Link>
            <p>Innovación, tecnología y agricultura sostenible.</p>
          </div>
          <nav className="footer-nav" aria-label="Secciones del sitio">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>{item.label}</Link>
            ))}
            <Link to="/inscripcion">Inscripción</Link>
          </nav>
          <p className="footer-place"><MapPin size={16} /> <span>{fair.venue}<br />{fair.place}</span></p>
        </div>
        <div className="footer-bottom">
          <span className="footer-edition">XI FERIA · {fair.dateLabel.toUpperCase()}</span>
          <button className="footer-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Volver arriba <ArrowUp size={15} /></button>
        </div>
      </footer>
    </>
  )
}

export default SiteLayout
