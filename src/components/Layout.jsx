import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function Layout() {
  const skipToContent = (event) => {
    event.preventDefault()
    const content = document.getElementById('contenido')
    content?.focus()
    content?.scrollIntoView()
  }

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#contenido" onClick={skipToContent}>
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
