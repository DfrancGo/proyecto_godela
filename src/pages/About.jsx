import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { asset } from '../lib/asset.js'
import CtaBand from '../components/CtaBand.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowRight, Leaf, Scissors, Shield } from '../components/Icons.jsx'

const values = [
  {
    icon: <Scissors />,
    title: 'Artesanía',
    text: 'Cada pieza pasa por manos que conocen el oficio. El detalle y el acabado son parte de nuestra identidad.',
  },
  {
    icon: <Shield />,
    title: 'Innovación',
    text: 'Invertimos en maquinaria de última generación para mantener la precisión sin renunciar al volumen.',
  },
  {
    icon: <Leaf />,
    title: 'Sostenibilidad',
    text: 'Materiales más responsables, procesos optimizados y producción local para reducir nuestro impacto.',
  },
]

export default function About() {
  usePageMeta(
    'Sobre nosotros — Manufacturas GODELA',
    'Más de 20 años de experiencia en el diseño y fabricación de adornos para calzado y marroquinería.',
  )

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">Sobre nosotros</p>
            <h1>Tradición, precisión y una mirada puesta en el futuro.</h1>
          </div>
          <p className="page-hero__lead">
            En el competitivo mundo de la marroquinería y los adornos para calzado, hay
            nombres que se convierten en sinónimo de calidad, tradición y vanguardia.
            Manufacturas Godela es uno de ellos.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about">
          <Reveal className="about__copy">
            <p className="eyebrow">Nuestra historia</p>
            <h2>Más de dos décadas creando detalle.</h2>
            <p>
              Con una trayectoria sólida de más de veinte años en el sector, nos hemos
              consolidado como referente en el diseño, fabricación y distribución de
              adornos para calzado y complementos de marroquinería de alta gama.
            </p>
            <p>
              Gracias a una firme apuesta por la innovación constante, la calidad de las
              pieles utilizadas y un cuidadoso proceso artesanal, nuestros productos
              lucen en algunas de las pasarelas de moda más prestigiosas del mundo,
              integrándose en colecciones de marcas reconocidas a nivel global.
            </p>

            <div className="about__stats">
              <div><strong>20+</strong><span>años de experiencia</span></div>
              <div><strong>Nacional</strong><span>e internacional</span></div>
              <div><strong>Elche</strong><span>producción local</span></div>
            </div>
          </Reveal>

          <Reveal className="about__media" delay={100}>
            <figure>
              <img
                src={asset('assets/productos/manufacturas-elche.jpg')}
                alt="Distintos tipos y colores de pieles"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure>
              <img
                src={asset('assets/productos/pieles-zapatos.jpg')}
                alt="Piel tipo lagarto en distintos colores"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <div>
              <p className="eyebrow">Lo que nos define</p>
              <h2>Artesanía, tecnología y responsabilidad.</h2>
            </div>
          </Reveal>

          <div className="values">
            {values.map((value, index) => (
              <Reveal className="value" key={value.title} delay={index * 90}>
                <span className="value__icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="about__quote">
            <p className="eyebrow">Nuestro compromiso</p>
            <blockquote>
              “La clave está en unir el oficio de siempre con la precisión que exige la
              moda actual.”
            </blockquote>
            <p>
              Ese equilibrio nos permite acompañar a nuestros clientes desde la idea
              hasta la pieza terminada, con la flexibilidad de un taller y la fiabilidad
              de un socio industrial.
            </p>
            <Link className="btn btn--primary" to="/contacto">
              Hablemos de tu proyecto
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Catálogo"
        title="Descubre lo que podemos crear."
        text="Estamos preparando el catálogo completo. Mientras tanto, podemos mostrarte nuestras capacidades."
        cta="Ver catálogo"
        to="/catalogo"
      />
    </>
  )
}
