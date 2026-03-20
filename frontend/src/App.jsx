import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SubmitProjectPage from './pages/SubmitProjectPage'
import PortfolioPage from './pages/PortfolioPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/submit-project" element={<SubmitProjectPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Layout>
  )
}

export default App
