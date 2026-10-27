import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset.js'
import { products } from '../data/products.js'
import { ArrowRight } from './Icons.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const AUTOPLAY_MS = 4800

export default function ProductCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const total = products.length
  const touchStart = useRef(null)

  useEffect(() => {
    if (paused || reducedMotion) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [paused, reducedMotion, total])

  const goTo = (next) => setIndex(((next % total) + total) % total)

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return
    const delta = event.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (Math.abs(delta) < 45) return
    goTo(index + (delta < 0 ? 1 : -1))
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Selección de productos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel__frame">
        {products.map((product, itemIndex) => (
          <figure
            key={product.src}
            className={`carousel__slide${itemIndex === index ? ' is-active' : ''}`}
            aria-hidden={itemIndex !== index}
          >
            <img
              src={asset(product.src)}
              alt={product.alt}
              loading={itemIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <figcaption className="carousel__caption">
              <span>
                <span className="carousel__category">{product.category}</span>
                <strong>{product.name}</strong>
              </span>
              <span className="carousel__count">
                {String(itemIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        ))}

        <div className="carousel__controls">
          <button
            className="carousel__arrow carousel__arrow--prev"
            type="button"
            aria-label="Producto anterior"
            onClick={() => goTo(index - 1)}
          >
            <ArrowRight />
          </button>
          <button
            className="carousel__arrow"
            type="button"
            aria-label="Producto siguiente"
            onClick={() => goTo(index + 1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="carousel__dots">
        {products.map((product, itemIndex) => (
          <button
            key={product.src}
            className={`carousel__dot${itemIndex === index ? ' is-active' : ''}`}
            type="button"
            aria-label={`Ir a ${product.name}`}
            aria-current={itemIndex === index ? 'true' : undefined}
            onClick={() => goTo(itemIndex)}
          />
        ))}
      </div>
    </div>
  )
}
