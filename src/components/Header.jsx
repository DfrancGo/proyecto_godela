import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { asset } from '../lib/asset.js'
import { Close, Menu, User } from './Icons.jsx'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/sobre-nosotros', label: 'Sobre nosotros' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
        <div className="container header__inner">
        <Link className="header__brand" to="/" aria-label="Manufacturas Godela, inicio">
          <img src={asset('assets/logos/logo_barra_nav.png')} alt="Manufacturas Godela" />
        </Link>

        <nav className="header__nav" id="menu-principal" aria-label="Navegación principal">
          <ul className="header__links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `header__link${isActive ? ' is-active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="header__nav-extra">
            <NavLink className="header__session" to="/portal-empleados">
              <User />
              <span>Portal empleados</span>
            </NavLink>
            <Link className="btn btn--primary" to="/contacto">
              Contactar
            </Link>
          </div>
        </nav>

        <div className="header__actions">
          <NavLink
            className="header__icon-btn"
            to="/portal-empleados"
            aria-label="Portal de empleados"
          >
            <User />
          </NavLink>
          <Link className="btn btn--primary header__cta" to="/contacto">
            Contactar
          </Link>
          <button
            className="header__toggle"
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
        </div>
      </header>

      <button
        className={`header__backdrop${open ? ' is-open' : ''}`}
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
    </>
  )
}
