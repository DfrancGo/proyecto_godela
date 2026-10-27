import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons.jsx'
import Reveal from './Reveal.jsx'

export default function CtaBand({
  eyebrow = 'Hablemos',
  title = '¿Trabajamos en tu próxima colección?',
  text = 'Cuéntanos qué necesitas y te ayudamos a encontrar la pieza adecuada.',
  cta = 'Contactar',
  to = '/contacto',
}) {
  return (
    <section className="cta">
      <div className="container">
        <Reveal className="cta__inner">
          <div>
            <p className="eyebrow eyebrow--light">{eyebrow}</p>
            <h2>{title}</h2>
            <p className="cta__text">{text}</p>
          </div>
          <Link className="btn btn--light" to={to}>
            {cta}
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
