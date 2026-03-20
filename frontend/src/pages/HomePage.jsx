import { Link } from 'react-router-dom'

const stats = [
  { value: '8k+', label: 'Clients' },
  { value: '10+', label: 'Years experience' },
  { value: '150+', label: 'Completed projects' },
]

const benefits = [
  { num: '01', title: 'Focused team', desc: 'A small team means you work directly with the people building your product. No layers, clear communication.' },
  { num: '02', title: 'Full-stack delivery', desc: 'From design to deployment, we handle web and mobile applications, APIs, and integrations in one place.' },
  { num: '03', title: 'Maintainable code', desc: 'We write clean, documented code so your project can evolve and scale without costly rewrites.' },
]

export default function HomePage() {
  return (
    <div className="page page-home">
      <section className="hero hero-with-bg hero-editorial">
        <div className="hero-bg" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=85" alt="" />
          <span className="hero-bg-overlay" />
        </div>
        <div className="container hero-content">
          <p className="hero-label">Software development · Nagoya, Japan</p>
          <h1 className="hero-title">
            We build software<br />that works.
          </h1>
          <p className="hero-desc">
            TechNeoxra delivers custom web and mobile applications for businesses that need reliable, maintainable solutions.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary">Our services</Link>
            <Link to="/contact" className="btn btn-secondary">Get in touch</Link>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-inner">
            {stats.map((item, i) => (
              <div key={i} className="stat">
                <span className="stat-value">{item.value}</span>
                <span className="stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-areas">
        <div className="container">
          <span className="section-label">What we do</span>
          <h2 className="section-title">Our focus areas</h2>
          <p className="section-intro">
            From automation and web to mobile and backend—we deliver end-to-end solutions for your business.
          </p>
          <div className="areas-grid">
            <Link to="/services" className="area-card">
              <h3>Automation</h3>
              <p>Workflows, process automation, integrations, CI/CD.</p>
            </Link>
            <Link to="/services" className="area-card">
              <h3>Web</h3>
              <p>Websites, web apps, e‑commerce, dashboards.</p>
            </Link>
            <Link to="/services" className="area-card">
              <h3>Mobile</h3>
              <p>iOS and Android, native and cross‑platform.</p>
            </Link>
            <Link to="/services" className="area-card">
              <h3>Backend & API</h3>
              <p>Systems integration, APIs, databases.</p>
            </Link>
          </div>
          <div className="section-cta">
            <Link to="/services" className="link-arrow">View all services</Link>
          </div>
        </div>
      </section>

      <section className="section section-benefits">
        <div className="container">
          <span className="section-label">Why work with us</span>
          <h2 className="section-title">Advantages of working with us</h2>
          <div className="benefits-list">
            {benefits.map((item) => (
              <article key={item.num} className="benefit-item">
                <span className="benefit-num">{item.num}</span>
                <div className="benefit-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/about" className="link-arrow">About us</Link>
          </div>
        </div>
      </section>

      <section className="section section-quote section-with-bg">
        <div className="section-bg" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" alt="" />
          <span className="section-bg-overlay" />
        </div>
        <div className="container quote-content">
          <blockquote className="quote-block">
            <p className="quote-text">We focus on understanding the problem first, then choose the right technology. That keeps projects on track and within budget.</p>
            <footer className="quote-footer">TechNeoxra team</footer>
          </blockquote>
        </div>
      </section>

      <section className="section section-cta-bottom section-cta-with-bg">
        <div className="section-bg" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80" alt="" />
          <span className="section-bg-overlay" />
        </div>
        <div className="container cta-content">
          <div className="cta-block">
            <h2>Start a project with us</h2>
            <p>Describe your idea. We’ll get back within one business day.</p>
            <div className="cta-actions">
              <Link to="/submit-project" className="btn btn-primary">Submit your project</Link>
              <Link to="/contact" className="btn btn-secondary">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
