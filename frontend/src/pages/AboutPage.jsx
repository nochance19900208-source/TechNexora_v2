import { useState, useRef, useEffect } from 'react'
import PageHero from '../components/PageHero'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80'

const REVIEWS_VISIBLE = 3

const reviews = [
  {
    quote: 'We needed an internal tool to replace a bunch of spreadsheets. TechNeoxra built it in about three months. It’s been running for a year now with almost no issues.',
    name: 'Koji Watanabe',
    role: 'Operations Manager, logistics company',
  },
  {
    quote: 'I was worried about working with a smaller team, but they were responsive and didn’t overcomplicate things. The app we shipped does exactly what we asked for.',
    name: 'Sarah Chen',
    role: 'Founder, retail startup',
  },
  {
    quote: 'They fixed our legacy API and documented it properly. Finally our new team can work with the system without calling the previous dev every week.',
    name: 'Takeshi Mori',
    role: 'IT lead, manufacturing',
  },
  {
    quote: 'We went through two other vendors before finding TechNeoxra. No fluff, clear estimates, and they actually delivered on the dates they gave us.',
    name: 'Rina Okamoto',
    role: 'Director, healthcare services',
  },
  {
    quote: 'The team understood our industry constraints from the start. We got a secure, compliant portal without the usual back-and-forth.',
    name: 'Yuki Honda',
    role: 'Compliance lead, financial services',
  },
  {
    quote: 'Quick turnaround on the MVP. We could test the idea with real users in under four months.',
    name: 'James Park',
    role: 'Product lead, SaaS company',
  },
  {
    quote: 'Good communication even with the time difference. They’re our go-to for any new features on the platform.',
    name: 'Maria Santos',
    role: 'CTO, e-commerce',
  },
]

const team = [
  { name: 'Yuki Tanaka', role: 'CEO & Co-founder', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
  { name: 'Kenji Sato', role: 'CTO', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { name: 'Aiko Nakamura', role: 'Head of HR', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
  { name: 'Takeshi Yamamoto', role: 'Lead Developer', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { name: 'Zain Butt', role: 'Full-Stack Developer', photo: '/member/zain-butt.jpeg' },
  { name: 'Miki Suzuki', role: 'Product Manager', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { name: 'Hiroshi Watanabe', role: 'Senior Engineer', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { name: 'Emi Kobayashi', role: 'Design Lead', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { name: 'Ryu Matsumoto', role: 'Operations', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' },
]

const GAP_REM = 1.5

export default function AboutPage() {
  const maxStart = Math.max(0, reviews.length - REVIEWS_VISIBLE)
  const [startIndex, setStartIndex] = useState(0)
  const trackRef = useRef(null)
  const [offsetPx, setOffsetPx] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const updateOffset = () => {
      const card = track.querySelector('.review-card')
      if (!card) return
      const gap = GAP_REM * 16
      setOffsetPx(card.offsetWidth + gap)
    }
    updateOffset()
    const ro = new ResizeObserver(updateOffset)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  const goPrev = () => setStartIndex((i) => (i === 0 ? maxStart : i - 1))
  const goNext = () => setStartIndex((i) => (i >= maxStart ? 0 : i + 1))
  const totalSteps = maxStart + 1

  return (
    <div className="page">
      <PageHero
        title="About us"
        subtitle="We are a software development company based in Nagoya. We focus on building software that solves real problems."
        imageUrl={HERO_IMAGE}
      />

      <section className="section about-intro">
        <div className="container">
          <div className="about-content">
            <p>
              TechNeoxra was founded to serve businesses that need custom software without the overhead of large agencies. Our team of eight works closely with clients from concept to launch and beyond.
            </p>
            <p>
              We are located in Minato Ward, Nagoya, and work with clients across Japan and internationally. Most of our projects are web and mobile applications, backend systems, and integrations.
            </p>
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="container">
          <h2 className="section-title">What clients say</h2>
          <div className="reviews-carousel">
            <button
              type="button"
              className="reviews-arrow reviews-arrow-prev"
              onClick={goPrev}
              aria-label="Previous review"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="reviews-viewport">
              <div
                ref={trackRef}
                className="reviews-track"
                style={{
                  transform: offsetPx ? `translateX(-${startIndex * offsetPx}px)` : `translateX(-${startIndex * (100 / reviews.length)}%)`,
                }}
              >
                {reviews.map((review, i) => (
                  <blockquote key={i} className="review-card">
                    <p className="review-quote">"{review.quote}"</p>
                    <footer className="review-footer">
                      <span className="review-name">{review.name}</span>
                      <span className="review-role">{review.role}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="reviews-arrow reviews-arrow-next"
              onClick={goNext}
              aria-label="Next review"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <div className="reviews-dots">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`reviews-dot ${i === startIndex ? 'active' : ''}`}
                onClick={() => setStartIndex(i)}
                aria-label={`Go to position ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">Our team</h2>
          <div className="team-grid">
            {team.map((member, i) => (
              <article key={i} className="team-card">
                <div className="team-photo">
                  <img src={member.photo} alt={member.name} loading="lazy" />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
