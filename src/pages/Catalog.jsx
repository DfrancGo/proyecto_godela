import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { asset } from '../lib/asset.js'
import Reveal from '../components/Reveal.jsx'
import { ArrowRight } from '../components/Icons.jsx'

const mosaic = [
  { src: 'assets/productos/bordado.webp', alt: 'Corte de piel con bordado de flores' },
  { src: 'assets/productos/manufacturas-elche.jpg', alt: 'Distintos tipos y colores de pieles' },
  { src: 'assets/productos/tachas.webp', alt: 'Corte de piel dorado con tachas plateadas' },
  { src: 'assets/productos/zapatos-elche.jpg', alt: 'Zapatos con adornos de Godela' },
  { src: 'assets/productos/transfer.webp', alt: 'Corte de piel con dibujo de rosal y brillantes' },
]

export default function Catalog() {
  usePageMeta(
    'Catálogo — Manufacturas GODELA',
    'Catálogo de adornos y marroquinería de Manufacturas GODELA. Próximamente disponible.',
  )

  return (
    <>
      <section className="page-hero page-hero--center">
        <div className="container">
          <p className="eyebrow">Catálogo</p>
          <h1>Muy pronto.</h1>
          <p className="page-hero__lead">
            Estamos preparando el catálogo completo de adornos y marroquinería.
            Mientras tanto, podemos mostrarte nuestras capacidades y ayudarte con tu
            próxima colección.
          </p>
          <div className="catalog__actions">
            <Link className="btn btn--primary" to="/contacto">
              Solicitar información
              <ArrowRight />
            </Link>
            <Link className="btn btn--ghost" to="/sobre-nosotros">
              Conoce la empresa
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <Reveal className="catalog__mosaic">
            {mosaic.map((item) => (
              <figure className="mosaic__item" key={item.src}>
                <img src={asset(item.src)} alt={item.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </Reveal>
          <Reveal className="catalog__note" delay={120}>
            <p>
              ¿Necesitas una referencia concreta? Cuéntanos qué buscas y te enviamos una
              selección personalizada.
            </p>
            <Link className="text-link" to="/contacto">
              Escríbenos
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
