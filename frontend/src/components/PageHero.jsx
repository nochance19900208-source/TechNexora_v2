export default function PageHero({ title, subtitle, imageUrl }) {
  return (
    <section className="page-hero page-hero-with-bg">
      <div className="page-hero-bg" aria-hidden="true">
        <img src={imageUrl} alt="" />
        <span className="page-hero-overlay" />
      </div>
      <div className="container page-hero-content">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}
