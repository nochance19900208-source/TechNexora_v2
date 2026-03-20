import { useState, useEffect } from 'react'
import PageHero from '../components/PageHero'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80'

function isValidEmail(value) {
  if (!value || !value.trim()) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [subjectError, setSubjectError] = useState(null)
  const [messageError, setMessageError] = useState(null)

  useEffect(() => {
    if (!nameError && !emailError && !subjectError && !messageError) return
    const t = setTimeout(() => {
      setNameError(null)
      setEmailError(null)
      setSubjectError(null)
      setMessageError(null)
    }, 3000)
    return () => clearTimeout(t)
  }, [nameError, emailError, subjectError, messageError])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'name') setNameError(null)
    if (name === 'email') setEmailError(null)
    if (name === 'subject') setSubjectError(null)
    if (name === 'message') setMessageError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const hasName = form.name?.trim()
    const hasEmail = form.email?.trim()
    const hasSubject = form.subject?.trim()
    const hasMessage = form.message?.trim()
    if (!hasName) {
      setNameError('Please enter your name')
      return
    }
    if (!hasEmail) {
      setEmailError('Please enter your email')
      return
    }
    if (!isValidEmail(form.email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    if (!hasSubject) {
      setSubjectError('Please enter a subject')
      return
    }
    if (!hasMessage) {
      setMessageError('Please enter a message')
      return
    }
    setNameError(null)
    setEmailError(null)
    setSubjectError(null)
    setMessageError(null)
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page">
      <PageHero
        title="Contact us"
        subtitle="Reach out for project inquiries, partnerships, or general questions."
        imageUrl={HERO_IMAGE}
      />

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get in touch</h3>
              <p>
                <a href="mailto:contact@technexora.co">contact@technexora.co</a>
              </p>
              <p>Minato Ward, Nagoya<br />Aichi 455-0067<br />Japan</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={nameError ? 'input-error' : ''}
                />
                {nameError && <p className="field-error">{nameError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={emailError ? 'input-error' : ''}
                />
                {emailError && <p className="field-error">{emailError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={subjectError ? 'input-error' : ''}
                />
                {subjectError && <p className="field-error">{subjectError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className={messageError ? 'input-error' : ''}
                />
                {messageError && <p className="field-error">{messageError}</p>}
              </div>
              {status === 'sent' && <p className="form-success">Message sent. We will get back to you soon.</p>}
              {status === 'error' && <p className="form-error">Something went wrong. Please try again or email us directly.</p>}
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
