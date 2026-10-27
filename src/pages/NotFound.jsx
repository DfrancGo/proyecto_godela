import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { ArrowRight } from '../components/Icons.jsx'

export default function NotFound() {
  usePageMeta('Página no encontrada — Manufacturas GODELA')

  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1>Esta página no existe.</h1>
        <p>Puede que el enlace haya cambiado o que la página ya no esté disponible.</p>
        <Link className="btn btn--primary" to="/">
          Volver al inicio
          <ArrowRight />
        </Link>
      </div>
    </section>
  )
}
