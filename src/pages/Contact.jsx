import { usePageMeta } from '../hooks/usePageMeta.js'
import { Mail, MapPin, Phone } from '../components/Icons.jsx'
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
            <form
              action="https://formsubmit.co/danielosbourne10@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Nueva consulta desde la web" />
              <input type="hidden" name="_template" value="table" />

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

              <button className="btn btn--primary btn--full" type="submit">
                Enviar consulta
              </button>
              <p className="form-card__note">
                Al enviar este formulario aceptas nuestra política de privacidad.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
