import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { asset } from '../lib/asset.js'
import ProductCarousel from '../components/ProductCarousel.jsx'
import ScrollGallery from '../components/ScrollGallery.jsx'
import CtaBand from '../components/CtaBand.jsx'
import Reveal from '../components/Reveal.jsx'
import {
  ArrowRight,
  Check,
  Leaf,
  MapPin,
  Scissors,
  Shield,
  Spark,
} from '../components/Icons.jsx'

const stats = [
  { value: '20+', label: 'años de experiencia' },
  { value: '2', label: 'mercados: nacional e internacional' },
  { value: 'Elche', label: 'origen y producción local' },
]

const marqueeItems = [
  'Diseño',
  'Corte',
  'Troquelado',
  'Estampación',
  'Bordado',
  'Control de calidad',
  'Producción local',
]

const checklist = [
  'Selección de materiales ecológicos y pieles de curtición vegetal.',
  'Optimización de procesos para reducir consumo y residuos.',
  'Producción local y piezas duraderas, alineadas con la economía circular.',
]

export default function Home() {
  usePageMeta(
    'Manufacturas GODELA — Adornos para calzado y marroquinería',
    'Diseño y fabricación de adornos para calzado y marroquinería de alta gama en Elche, Alicante.',
  )

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              Elche · Alicante
            </p>
            <h1 className="hero__title">
              Adornos que <em>elevan</em> cada pieza.
            </h1>
            <p className="hero__lead">
              Más de 20 años diseñando y fabricando adornos para el calzado y la
              marroquinería. Artesanía cuidada, innovación constante y un control de
              calidad que se nota en cada detalle.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/catalogo">
                Ver catálogo
                <ArrowRight />
              </Link>
              <Link className="btn btn--ghost" to="/contacto">
                Hablemos
              </Link>
            </div>

            <dl className="hero__stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero__visual">
            <ProductCarousel />
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>

      <section className="section" id="innovacion">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Innovación</p>
              <h2>Tecnología al servicio del detalle.</h2>
            </div>
            <p className="section-head__lead">
              La combinación entre artesanía y tecnología es una de las claves de
              nuestro éxito. Maquinaria de última generación y un control estricto en
              cada fase del proceso.
            </p>
          </Reveal>

          <div className="bento">
            <Reveal className="bento__card bento__card--media bento__card--wide">
              <img
                src={asset('assets/productos/impresion_laser.webp')}
                alt="Corte de piel con flores impresas de colores"
                loading="lazy"
                decoding="async"
              />
              <div className="bento__overlay">
                <span className="tag">Maquinaria</span>
                <h3>Corte, troquelado y estampación de precisión</h3>
              </div>
            </Reveal>

            <Reveal className="bento__card bento__card--dark" delay={90}>
              <span className="bento__icon"><Shield /></span>
              <p className="bento__value">100%</p>
              <h3>Control de calidad</h3>
              <p>
                Verificamos cada pieza para cumplir las especificaciones técnicas y
                estéticas, reduciendo devoluciones y asegurando la satisfacción final.
              </p>
            </Reveal>

            <Reveal className="bento__card bento__card--plain" delay={140}>
              <span className="bento__icon"><MapPin /></span>
              <h3>Producción local</h3>
              <p>
                Fabricamos en Elche, cerca de nuestros clientes y proveedores, cuidando
                el proceso de principio a fin.
              </p>
            </Reveal>

            <Reveal className="bento__card bento__card--media" delay={190}>
              <img
                src={asset('assets/productos/manufacturas-elche.jpg')}
                alt="Distintos tipos y colores de pieles"
                loading="lazy"
                decoding="async"
              />
              <div className="bento__overlay">
                <span className="tag">Materiales</span>
                <h3>Pieles seleccionadas</h3>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split">
          <Reveal className="split__media">
            <img
              src={asset('assets/productos/cordela_1.png')}
              alt="Pieza de calzado hecha con cordela"
              loading="lazy"
              decoding="async"
            />
            <div className="split__badge">
              <Leaf />
              <span>Pieles de curtición vegetal</span>
            </div>
          </Reveal>

          <Reveal className="split__body" delay={100}>
            <p className="eyebrow">Sostenibilidad</p>
            <h2>Compromiso con el futuro.</h2>
            <p>
              La sostenibilidad no es una tendencia: es parte de nuestra forma de
              trabajar. Seleccionamos materiales más responsables, optimizamos los
              procesos productivos y apostamos por una producción local que alarga la
              vida útil de cada pieza.
            </p>
            <ul className="checklist">
              {checklist.map((item) => (
                <li key={item}>
                  <span><Check /></span>
                  {item}
                </li>
              ))}
            </ul>
            <Link className="btn btn--ghost" to="/sobre-nosotros">
              Conoce la empresa
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <ScrollGallery />

      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <div>
              <p className="eyebrow">Del boceto a la pieza final</p>
              <h2>Un proceso cuidado en cada etapa.</h2>
            </div>
          </Reveal>

          <div className="process">
            <Reveal className="process__step">
              <span className="process__icon"><Scissors /></span>
              <span className="process__number">01</span>
              <h3>Diseño y desarrollo</h3>
              <p>Traducimos la idea en una pieza técnicamente viable y coherente con la colección.</p>
            </Reveal>
            <Reveal className="process__step" delay={90}>
              <span className="process__icon"><Spark /></span>
              <span className="process__number">02</span>
              <h3>Fabricación</h3>
              <p>Corte, troquelado, estampación, bordado y ensamblado con maquinaria de precisión.</p>
            </Reveal>
            <Reveal className="process__step" delay={180}>
              <span className="process__icon"><Shield /></span>
              <span className="process__number">03</span>
              <h3>Control y entrega</h3>
              <p>Revisión exhaustiva de cada lote para garantizar acabados y plazos.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
