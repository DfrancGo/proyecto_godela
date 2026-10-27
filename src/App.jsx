import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Catalog from './pages/Catalog.jsx'
import Contact from './pages/Contact.jsx'
import EmployeePortal from './pages/EmployeePortal.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre-nosotros" element={<About />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="portal-empleados" element={<EmployeePortal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
