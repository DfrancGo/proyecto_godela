import { useLayoutEffect, useRef } from 'react'
import { asset } from '../lib/asset.js'
import { galleryItems } from '../data/products.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import Reveal from './Reveal.jsx'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3)

const intro = {
  text: 'Fornituras, cadenas, hebillas, broches, adornos para marroquinería, tiradores, mosquetones, botones y adornos para calzado.',
}

function GalleryGrid({ cardRefs, className = '' }) {
  return (
    <div className={`gallery-grid${className ? ` ${className}` : ''}`}>
      {galleryItems.map((item, index) => (
        <figure
          className="gallery-card"
          key={item.src}
          ref={(node) => {
            if (cardRefs) cardRefs.current[index] = node
          }}
        >
          <img src={asset(item.src)} alt={item.alt} loading="lazy" decoding="async" />
          <figcaption>
            <span>{item.label}</span>
            <span>{String(index + 1).padStart(2, '0')}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function ScrollGallery() {
  const isDesktop = useMediaQuery('(min-width: 900px)')
  const reducedMotion = useReducedMotion()
  const animated = isDesktop && !reducedMotion

  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const footRef = useRef(null)
  const meterRef = useRef(null)

  useLayoutEffect(() => {
    if (!animated) return

    let frame = null

    const update = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const distance = section.offsetHeight - window.innerHeight
      const progress = distance > 0 ? clamp(-rect.top / distance, 0, 1) : 0

      const width = window.innerWidth
      const height = window.innerHeight
      const starts = [0, 0.06, 0.12]
      const origins = [
        { x: -0.14 * width, y: 0.1 * height, rotate: -7, scale: 0.8 },
        { x: 0, y: 0.16 * height, rotate: 2, scale: 0.9 },
        { x: 0.14 * width, y: -0.05 * height, rotate: 7, scale: 0.8 },
      ]

      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const local = easeOutCubic(clamp((progress - starts[index]) / 0.6, 0, 1))
        const origin = origins[index]
        const remaining = 1 - local

        card.style.transform = `translate3d(${origin.x * remaining}px, ${origin.y * remaining}px, 0) rotate(${origin.rotate * remaining}deg) scale(${origin.scale + (1 - origin.scale) * local})`
        card.style.opacity = String(0.35 + 0.65 * local)
      })

      if (footRef.current) {
        const reveal = clamp((progress - 0.58) / 0.22, 0, 1)
        footRef.current.style.opacity = String(reveal)
        footRef.current.style.transform = `translateY(${18 * (1 - reveal)}px)`
      }

      if (meterRef.current) {
        meterRef.current.style.transform = `scaleX(${progress})`
      }
    }

    const onScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        frame = null
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [animated])

  if (!animated) {
    return (
      <section id="galeria_2" className="gallery-static" aria-labelledby="galeria-static-title">
        <div className="container">
          <Reveal className="gallery-static__head">
            <p className="eyebrow eyebrow--light">Colección</p>
            <h2 id="galeria-static-title">Adornos y marroquinería</h2>
            <p>{intro.text}</p>
          </Reveal>
          <GalleryGrid />
        </div>
      </section>
    )
  }

  return (
    <section id="galeria_2" className="scroll-gallery" ref={sectionRef} aria-labelledby="galeria-title">
      <div className="scroll-gallery__sticky">
        <span className="scroll-gallery__watermark" aria-hidden="true">GODELA</span>

        <div className="container scroll-gallery__inner">
          <div className="scroll-gallery__head">
            <div>
              <p className="eyebrow eyebrow--light">Colección</p>
              <h2 id="galeria-title">Adornos y marroquinería</h2>
            </div>
            <p className="scroll-gallery__hint">Desplaza para alinear</p>
          </div>

          <div className="scroll-gallery__stage">
            <GalleryGrid cardRefs={cardRefs} className="gallery-grid--scroll" />
          </div>

          <div className="scroll-gallery__foot" ref={footRef}>
            <p>{intro.text}</p>
            <div className="scroll-gallery__meter" aria-hidden="true">
              <span ref={meterRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
