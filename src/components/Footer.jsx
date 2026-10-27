import { Link } from 'react-router-dom'
import { asset } from '../lib/asset.js'
import { Mail, MapPin, Phone } from './Icons.jsx'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={asset('assets/logos/logo_barra_nav.png')} alt="Manufacturas Godela" />
            <p>
              Diseño y fabricación de adornos para calzado y marroquinería de alta gama.
              Artesanía, tecnología y detalle desde Elche.
            </p>
          </div>

          <nav className="footer__col" aria-label="Navegación del pie de página">
            <h2>Navegación</h2>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/portal-empleados">Portal empleados</Link></li>
            </ul>
          </nav>

          <div className="footer__col">
            <h2>Contacto</h2>
            <ul>
              <li>
                <a href="mailto:info@godela.es">
                  <Mail /> info@godela.es
                </a>
              </li>
              <li>
                <a href="tel:+34965494540">
                  <Phone /> +34 965 494 540
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/zsvf6fqvxZEpdP5X8"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin /> Pol. Ind. Vizcarra, Nave 26, Elche
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h2>Síguenos</h2>
            <ul>
              <li><span className="footer__pending">Facebook</span></li>
              <li><span className="footer__pending">Instagram</span></li>
            </ul>
            <div className="footer__legal">
              <span className="footer__pending">Aviso legal</span>
              <span className="footer__pending">Privacidad</span>
              <span className="footer__pending">Cookies</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Manufacturas GODELA. Todos los derechos reservados.</p>
          <p>Elche · Alicante · España</p>
        </div>
      </div>
    </footer>
  )
}
