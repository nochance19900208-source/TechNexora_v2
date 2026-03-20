import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoMark from './LogoMark.jsx'
import LogoLockup from './LogoLockup.jsx'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/submit-project', label: 'Submit Project' },
  { path: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          to="/"
          className="logo logo-with-lockup"
          aria-label="TechNeoxra — Software development"
          onClick={() => {
            setMenuOpen(false)
            window.scrollTo(0, 0)
          }}
        >
          <LogoMark />
          <LogoLockup variant="full" />
        </Link>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
