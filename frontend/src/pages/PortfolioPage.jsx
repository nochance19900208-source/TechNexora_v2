import PageHero from '../components/PageHero'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80'

export default function PortfolioPage() {
  const projects = [
    { title: 'E-commerce platform', client: 'Retail client', category: 'E-commerce & CMS', stack: 'React, Node.js, MySQL', summary: 'Custom online store with inventory, orders, and analytics.' },
    { title: 'Internal dashboard', client: 'Enterprise client', category: 'Data & Analytics', stack: 'React, Python, PostgreSQL', summary: 'Data visualization and reporting dashboard.' },
    { title: 'Mobile app', client: 'Startup', category: 'Mobile development', stack: 'React Native, Firebase', summary: 'Cross-platform app for iOS and Android.' },
    { title: 'Workflow automation', client: 'Enterprise client', category: 'Automation', stack: 'Python, Zapier, REST APIs', summary: 'Automated order processing and CRM sync, reducing manual work.' },
    { title: 'SaaS web application', client: 'SMB', category: 'Web development', stack: 'Vue.js, Node.js, PostgreSQL', summary: 'Subscription-based B2B tool with billing and admin panel.' },
    { title: 'API & integration hub', client: 'Enterprise client', category: 'API & Integration', stack: 'Node.js, GraphQL, Redis', summary: 'Central API gateway connecting internal and third-party systems.' },
    { title: 'Healthcare booking app', client: 'Startup', category: 'Mobile development', stack: 'React Native, Node.js, MongoDB', summary: 'Appointment booking and reminders for clinics and patients.' },
    { title: 'Marketing website', client: 'Retail client', category: 'Web development', stack: 'React, headless CMS', summary: 'Fast, SEO-optimized site with blog and contact forms.' },
    { title: 'CI/CD pipeline setup', client: 'SMB', category: 'DevOps & Infrastructure', stack: 'GitHub Actions, Docker, AWS', summary: 'Automated build, test, and deploy for a development team.' },
    { title: 'Legacy system migration', client: 'Enterprise client', category: 'Database development', stack: 'Python, PostgreSQL, ETL', summary: 'Data migration and new backend for an existing product.' },
  ]

  return (
    <div className="page">
      <PageHero
        title="Portfolio"
        subtitle="Selected projects we have delivered for clients."
        imageUrl={HERO_IMAGE}
      />

      <section className="section portfolio-section">
        <div className="container">
          <div className="portfolio-grid">
            {projects.map((project, i) => (
              <article key={i} className="portfolio-card">
                <div className="portfolio-number">{String(i + 1).padStart(2, '0')}</div>
                <h3>{project.title}</h3>
                <p className="portfolio-client">{project.client}</p>
                <p className="portfolio-category">{project.category}</p>
                <p className="portfolio-stack">{project.stack}</p>
                <p className="portfolio-summary">{project.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
