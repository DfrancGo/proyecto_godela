import { useEffect, useRef, useState } from 'react'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { Close, Mail, MapPin, Phone } from '../components/Icons.jsx'
import Reveal from '../components/Reveal.jsx'

const fields = [
  { id: 'nombre', label: 'Nombre', type: 'text', name: 'nombre', autoComplete: 'name', required: true },
  { id: 'telefono', label: 'Teléfono', type: 'tel', name: 'telefono', autoComplete: 'tel', required: true },
  { id: 'email', label: 'Email', type: 'email', name: 'email', autoComplete: 'email', required: true },
  { id: 'empresa', label: 'Empresa', type: 'text', name: 'empresa', autoComplete: 'organization', required: false },
]

export default function Contact() {
  usePageMeta(
    'Contacto — Manufacturas GODELA',
    'Contacta con Manufacturas GODELA para tu próximo proyecto de adornos y marroquinería.',
  )

  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [resultMsg, setResultMsg] = useState('')
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const privacyDialogRef = useRef(null)

  useEffect(() => {
    if (!privacyOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [privacyOpen])

  const openPrivacy = () => {
    const dialog = privacyDialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    setPrivacyOpen(true)
  }

  const closePrivacy = () => {
    privacyDialogRef.current?.close()
    setPrivacyOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setResultMsg('Enviando consulta...')

    const formData = new FormData(event.target)
    
    // Configuración de Web3Forms
    formData.append('access_key', 'ed002779-1b38-47cb-9bfd-66bcb193b367')
    formData.append('subject', 'Nueva consulta desde la web — Manufacturas GODELA')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setResultMsg('¡Gracias! Hemos recibido tu consulta y te responderemos lo antes posible.')
        event.target.reset()
      } else {
        setStatus('error')
        setResultMsg(data.message || 'Hubo un problema al enviar la consulta. Inténtalo de nuevo.')
      }
    } catch (error) {
      setStatus('error')
      setResultMsg('Error de red. Por favor, comprueba tu conexión e inténtalo de nuevo.')
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">Contacto</p>
            <h1>Hablemos de tu próximo proyecto.</h1>
          </div>
          <p className="page-hero__lead">
            Cuéntanos qué necesitas y te ayudamos a encontrar la pieza adecuada. También
            puedes escribirnos o llamarnos directamente.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact">
          <Reveal className="contact__info">
            <h2>Información de contacto</h2>
            <ul className="contact__list">
              <li>
                <span className="contact__icon"><Mail /></span>
                <span>
                  <small>Email</small>
                  <a href="mailto:info@godela.es">info@godela.es</a>
                </span>
              </li>
              <li>
                <span className="contact__icon"><Phone /></span>
                <span>
                  <small>Teléfono</small>
                  <a href="tel:+34965494540">+34 965 494 540</a>
                </span>
              </li>
              <li>
                <span className="contact__icon"><MapPin /></span>
                <span>
                  <small>Dirección</small>
                  <a
                    href="https://maps.app.goo.gl/zsvf6fqvxZEpdP5X8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pol. Ind. Vizcarra – Nave 26, Avinguda de Dolores, km 1.8,
                    03290 Elche, Alicante
                  </a>
                </span>
              </li>
            </ul>

            <p className="contact__note">
              Respondemos de lunes a viernes en horario laboral. Para consultas sobre
              pedidos en curso, indica tu empresa y número de referencia.
            </p>
          </Reveal>

          <Reveal className="form-card" delay={100}>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {fields.map((field) => (
                  <div className="field" key={field.id}>
                    <label htmlFor={field.id}>
                      {field.label}
                      {field.required ? <span aria-hidden="true"> *</span> : null}
                    </label>
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>

              <div className="field">
                <label htmlFor="consulta">
                  Consulta <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="consulta"
                  name="consulta"
                  rows="5"
                  placeholder="Cuéntanos qué necesitas..."
                  required
                />
              </div>

              <button
                className="btn btn--primary btn--full"
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar consulta'}
              </button>

              {resultMsg && (
                <p className={`form-card__status form-card__status--${status}`} style={{ marginTop: '1rem' }}>
                  {resultMsg}
                </p>
              )}

              <p className="form-card__note">
                Al enviar este formulario aceptas nuestra{' '}
                <button className="privacy-link" type="button" onClick={openPrivacy}>
                  política de privacidad
                </button>
                .
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <dialog
        ref={privacyDialogRef}
        className="privacy-modal"
        aria-labelledby="privacy-title"
        onClose={() => setPrivacyOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePrivacy()
        }}
      >
        <div className="privacy-modal__panel">
          <header className="privacy-modal__head">
            <div>
              <p className="eyebrow">Protección de datos</p>
              <h2 id="privacy-title">Política de privacidad</h2>
            </div>
            <button
              className="privacy-modal__close"
              type="button"
              onClick={closePrivacy}
              aria-label="Cerrar política de privacidad"
            >
              <Close />
            </button>
          </header>

          <div className="privacy-modal__body">
            <article className="privacy__item">
              <h3>1. Responsable del Tratamiento</h3>
              <dl className="privacy__data">
                <dt>Identidad</dt>
                <dd>Manufacturas GODELA</dd>
                <dt>Dirección</dt>
                <dd>
                  Pol. Ind. Vizcarra – Nave 26, Avinguda de Dolores, km 1.8,
                  03290 Elche, Alicante
                </dd>
                <dt>Email</dt>
                <dd><a href="mailto:info@godela.es">info@godela.es</a></dd>
                <dt>Teléfono</dt>
                <dd><a href="tel:+34965494540">+34 965 494 540</a></dd>
              </dl>
            </article>

            <article className="privacy__item">
              <h3>2. Finalidad del Tratamiento de Datos</h3>
              <p>
                Los datos personales facilitados a través del formulario de contacto
                (nombre, email, teléfono y empresa) se utilizarán exclusivamente para
                responder a las consultas, solicitudes o encargos realizados por el
                usuario. No se realizarán perfiles ni se utilizarán los datos para el
                envío de comunicaciones comerciales no solicitadas.
              </p>
            </article>

            <article className="privacy__item">
              <h3>3. Legitimación</h3>
              <p>
                La base legal para el tratamiento de tus datos es el consentimiento del
                interesado al enviar el formulario de contacto.
              </p>
            </article>

            <article className="privacy__item">
              <h3>4. Destinatarios de los Datos y Encargados del Tratamiento</h3>
              <p>Los datos no se venderán ni cederán a terceros, salvo obligación legal.</p>
              <p>
                Para llevar a cabo el envío técnico de las consultas, utilizamos el
                servicio Web3Forms (proveedor del servicio de formulario). Puedes
                consultar la política de privacidad de Web3Forms en su sitio web oficial
                (
                <a
                  href="https://web3forms.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  web3forms.com/privacy
                </a>
                ).
              </p>
            </article>

            <article className="privacy__item">
              <h3>5. Conservación de Datos</h3>
              <p>
                Los datos personales se conservarán durante el tiempo estrictamente
                necesario para atender la consulta o mientras se mantenga la relación
                comercial, y posteriormente durante los plazos legalmente exigidos.
              </p>
            </article>

            <article className="privacy__item">
              <h3>6. Derechos del Usuario</h3>
              <p>
                Puedes ejercitar en cualquier momento tus derechos de acceso,
                rectificación, supresión, oposición, limitación del tratamiento y
                portabilidad enviando un correo electrónico a{' '}
                <a href="mailto:info@godela.es">info@godela.es</a> indicando el derecho
                que deseas ejercer.
              </p>
            </article>

            <article className="privacy__item">
              <h3>7. Uso de Cookies</h3>
              <p>
                Este sitio web no utiliza cookies propias ni de terceros para la recogida
                de datos de navegación, perfilado ni analítica de usuarios.
              </p>
            </article>
          </div>
        </div>
      </dialog>
    </>
  )
}
