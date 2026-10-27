import { useState } from 'react'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { Link } from 'react-router-dom'
import { Lock, User } from '../components/Icons.jsx'
import Reveal from '../components/Reveal.jsx'

export default function EmployeePortal() {
  usePageMeta(
    'Portal de empleados — Manufacturas GODELA',
    'Acceso restringido al personal de Manufacturas GODELA.',
  )

  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setNotice('El portal de empleados estará disponible próximamente.')
  }

  return (
    <section className="login-page">
      <div className="container login-page__inner">
        <Reveal className="login-card">
          <Link className="login-card__back" to="/">
            Volver al inicio
          </Link>

          <span className="login-card__icon"><User /></span>
          <p className="eyebrow">Área privada</p>
          <h1>Portal de empleados</h1>
          <p className="login-card__lead">
            Acceso restringido al personal de Manufacturas GODELA.
          </p>

          <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
            <div className="field">
              <label htmlFor="usuario">Usuario</label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                autoComplete="username"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                minLength="8"
                required
              />
            </div>

            <button className="btn btn--primary btn--full" type="submit">
              Iniciar sesión
            </button>
            {notice ? (
              <p className="login-card__notice" role="status">{notice}</p>
            ) : null}
          </form>

          <p className="login-card__note">
            <Lock />
            Si tienes problemas de acceso, contacta con administración.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
