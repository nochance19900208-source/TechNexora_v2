import { Link } from 'react-router-dom'
import LogoMark from './LogoMark.jsx'
import LogoLockup from './LogoLockup.jsx'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              to="/"
              className="logo logo-footer"
              aria-label="TechNeoxra home"
              onClick={() => window.scrollTo(0, 0)}
            >
              <LogoMark />
              <LogoLockup variant="compact" />
            </Link>
            <p className="footer-tagline">Software development based in Nagoya, Japan.</p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About us</Link>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/submit-project">Submit Project</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:contact@technexora.co">contact@technexora.co</a>
            <p className="footer-address">Minato Ward, Nagoya<br />Aichi 455-0067, Japan</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} TechNeoxra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
