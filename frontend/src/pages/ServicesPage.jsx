import PageHero from '../components/PageHero'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80'

export default function ServicesPage() {
  // Order: trend & impact first, then core build (web/mobile), foundation (backend), ongoing (maintenance), advisory (consulting)
  const services = [
    {
      title: 'Automation',
      desc: 'Workflow automation, process automation, and system integrations that save time and reduce errors. From no-code tools to custom scripts and CI/CD pipelines, we help you automate repetitive tasks and scale operations—a focus that’s become essential for modern teams. Flexible scope and budget, from quick wins to enterprise solutions.',
    },
    {
      title: 'Web development',
      desc: 'We build responsive, fast websites and web applications. From marketing sites to complex SaaS platforms, we focus on performance, accessibility, and maintainability. The core of most digital presence—essential for every business.',
    },
    {
      title: 'Mobile app development',
      desc: 'Native iOS and Android apps, or cross-platform solutions with React Native or Flutter. We choose the approach that fits your timeline and requirements. High impact for user reach and engagement.',
    },
    {
      title: 'Backend & APIs',
      desc: 'Scalable backend systems, REST and GraphQL APIs, database design, and integrations with external services. The foundation that powers web, mobile, and automation.',
    },
    {
      title: 'Maintenance & support',
      desc: 'Ongoing updates, bug fixes, security patches, and feature enhancements for existing applications. Keeps your systems reliable and up to date.',
    },
    {
      title: 'Consulting',
      desc: 'Technical review, architecture advice, tech stack selection, and process improvement for development teams. Advisory that fits before or alongside any project.',
    },
  ]

  return (
    <div className="page">
      <PageHero
        title="Services"
        subtitle="Full-spectrum software development for businesses in Japan and abroad."
        imageUrl={HERO_IMAGE}
      />

      <section className="section services-list">
        <div className="container">
          {services.map((service, i) => (
            <article key={i} className="service-item">
              <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
              <div className="service-content">
                <h2>{service.title}</h2>
                <p>{service.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
