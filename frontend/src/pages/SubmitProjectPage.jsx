import { useState, useEffect } from 'react'
import PageHero from '../components/PageHero'
import CountrySelect from '../components/CountrySelect'
import CategorySelect from '../components/CategorySelect'
import SkillSelect from '../components/SkillSelect'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85'

const MAX_FILES = 3
const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200MB

const INITIAL_FORM = {
  clientName: '',
  clientCountry: '',
  linkedinUrl: '',
  projectCategory: '',
  projectSkill: '',
  projectSummary: '',
  phone: '',
  email: '',
  other: '',
}

function isValidLinkedInUrl(value) {
  if (!value || !value.trim()) return true
  const url = value.trim()
  return /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w%-]+\/?$/i.test(url)
}

function isValidPhone(value) {
  if (!value || !value.trim()) return false
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function isValidEmail(value) {
  if (!value || !value.trim()) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export default function SubmitProjectPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState(null)
  const [linkedinError, setLinkedinError] = useState(null)
  const [phoneError, setPhoneError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [summaryError, setSummaryError] = useState(null)
  const [categoryError, setCategoryError] = useState(null)
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState(null)

  useEffect(() => {
    if (!linkedinError) return
    const t = setTimeout(() => setLinkedinError(null), 5000)
    return () => clearTimeout(t)
  }, [linkedinError])

  useEffect(() => {
    if (!phoneError) return
    const t = setTimeout(() => setPhoneError(null), 3000)
    return () => clearTimeout(t)
  }, [phoneError])

  useEffect(() => {
    if (!emailError) return
    const t = setTimeout(() => setEmailError(null), 3000)
    return () => clearTimeout(t)
  }, [emailError])

  useEffect(() => {
    if (!nameError && !summaryError && !categoryError) return
    const t = setTimeout(() => {
      setNameError(null)
      setSummaryError(null)
      setCategoryError(null)
    }, 3000)
    return () => clearTimeout(t)
  }, [nameError, summaryError, categoryError])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'linkedinUrl') setLinkedinError(null)
    if (name === 'phone') setPhoneError(null)
    if (name === 'email') setEmailError(null)
    if (name === 'clientName') setNameError(null)
    if (name === 'projectSummary') setSummaryError(null)
  }
  const handleCategoryChange = (v) => {
    setForm((prev) => ({ ...prev, projectCategory: v }))
    setCategoryError(null)
  }

  const handleFileChange = (e) => {
    setFileError(null)
    const chosen = Array.from(e.target.files || [])
    const oversized = chosen.filter((f) => f.size > MAX_FILE_SIZE)
    if (oversized.length) {
      setFileError(`Some files exceed 200MB limit: ${oversized.map((f) => f.name).join(', ')}`)
      e.target.value = ''
      return
    }
    const combined = [...files, ...chosen].slice(0, MAX_FILES)
    if (combined.length > MAX_FILES) {
      setFileError(`Maximum ${MAX_FILES} files allowed. Only the first ${MAX_FILES} were added.`)
      setFiles(combined.slice(0, MAX_FILES))
    } else {
      setFiles(combined)
    }
    e.target.value = ''
  }

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
    setFileError(null)
  }

  const handlePhoneBlur = () => {
    if (form.phone && !isValidPhone(form.phone)) {
      setPhoneError('Please enter a valid phone number (10-15 digits, e.g. +81-90-1234-5678)')
      setForm((prev) => ({ ...prev, phone: '' }))
    } else {
      setPhoneError(null)
    }
  }

  const handleEmailBlur = () => {
    if (form.email && !isValidEmail(form.email)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com)')
      setForm((prev) => ({ ...prev, email: '' }))
    } else {
      setEmailError(null)
    }
  }

  const handleLinkedInBlur = () => {
    if (form.linkedinUrl && !isValidLinkedInUrl(form.linkedinUrl)) {
      setLinkedinError('Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/yourprofile)')
      setForm((prev) => ({ ...prev, linkedinUrl: '' }))
    } else {
      setLinkedinError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const hasName = form.clientName?.trim()
    const hasSummary = form.projectSummary?.trim()
    if (!hasName) {
      setNameError('Please enter your name')
      return
    }
    if (!hasSummary) {
      setSummaryError('Please enter a project summary')
      return
    }
    if (!form.projectCategory?.trim()) {
      setCategoryError('Please select a category')
      return
    }
    if (form.linkedinUrl && !isValidLinkedInUrl(form.linkedinUrl)) {
      setLinkedinError('Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/yourprofile)')
      setForm((prev) => ({ ...prev, linkedinUrl: '' }))
      return
    }
    if (!isValidPhone(form.phone)) {
      setPhoneError('Please enter a valid phone number (10-15 digits)')
      setForm((prev) => ({ ...prev, phone: '' }))
      return
    }
    if (!isValidEmail(form.email)) {
      setEmailError('Please enter a valid email address')
      setForm((prev) => ({ ...prev, email: '' }))
      return
    }
    setLinkedinError(null)
    setPhoneError(null)
    setEmailError(null)
    setNameError(null)
    setSummaryError(null)
    setCategoryError(null)
    setStatus('sending')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v || ''))
      files.forEach((f) => fd.append('attachments', f))
      const res = await fetch('/api/project', {
        method: 'POST',
        body: fd,
      })
      if (res.ok) {
        setStatus('sent')
        setForm(INITIAL_FORM)
        setFiles([])
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus(data.error || 'error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page page-submit-project">
      <PageHero
        title="Submit your project"
        subtitle="Tell us about your idea. We'll review it and get back to you soon."
        imageUrl={HERO_IMAGE}
      />

      <section className="section submit-project-section">
        <div className="container submit-project-wrapper">
          <p className="submit-project-intro">Share your vision. We’ll help bring it to life.</p>
          <form className="submit-project-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="clientName">Name <span className="required">*</span></label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                className={nameError ? 'input-error' : ''}
              />
              {nameError && <p className="field-error">{nameError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="clientCountry">Country</label>
              <CountrySelect
                value={form.clientCountry}
                onChange={(v) => setForm((prev) => ({ ...prev, clientCountry: v }))}
                placeholder="Search country or region..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn profile link</label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                value={form.linkedinUrl}
                onChange={handleChange}
                onBlur={handleLinkedInBlur}
                placeholder="https://linkedin.com/in/..."
                className={linkedinError ? 'input-error' : ''}
              />
              {linkedinError && <p className="field-error">{linkedinError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="projectCategory">Category <span className="required">*</span></label>
              <CategorySelect
                value={form.projectCategory}
                onChange={handleCategoryChange}
                error={categoryError}
              />
              {categoryError && <p className="field-error">{categoryError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="projectSkill">Project skills</label>
              <SkillSelect
                value={form.projectSkill}
                onChange={(v) => setForm((prev) => ({ ...prev, projectSkill: v }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectSummary">Project summary <span className="required">*</span></label>
              <textarea
                id="projectSummary"
                name="projectSummary"
                rows="6"
                value={form.projectSummary}
                onChange={handleChange}
                placeholder="Describe your project, goals, and timeline..."
                className={summaryError ? 'input-error' : ''}
              />
              {summaryError && <p className="field-error">{summaryError}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handlePhoneBlur}
                  placeholder="e.g. +81-90-1234-5678"
                  className={phoneError ? 'input-error' : ''}
                />
                {phoneError && <p className="field-error">{phoneError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  placeholder="e.g. name@example.com"
                  className={emailError ? 'input-error' : ''}
                />
                {emailError && <p className="field-error">{emailError}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="attachments">Attach files (max {MAX_FILES}, 200MB each)</label>
              <input
                type="file"
                id="attachments"
                multiple
                onChange={handleFileChange}
                disabled={files.length >= MAX_FILES}
                className="file-input"
              />
              {files.length > 0 && (
                <ul className="file-list">
                  {files.map((f, i) => (
                    <li key={`${f.name}-${i}`}>
                      <span>{f.name}</span> ({(f.size / 1024).toFixed(1)} KB)
                      <button type="button" onClick={() => removeFile(i)} className="file-remove">
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {fileError && <p className="field-error">{fileError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="other">Other (optional)</label>
              <textarea
                id="other"
                name="other"
                rows="3"
                value={form.other}
                onChange={handleChange}
                placeholder="Any additional details, questions, or attachments..."
              />
            </div>

            {status === 'sent' && <p className="form-success">✓ Your project has been submitted. We'll review it and contact you within one business day.</p>}
            {status === 'error' && <p className="form-error">Something went wrong. Please try again or email us at support@technexora.co</p>}
            <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Submitting...' : 'Submit project'}
            </button>
          </form>
          <div className="submit-project-next">
            <h4>What happens next?</h4>
            <ul>
              <li>We review your submission within one business day</li>
              <li>A team member reaches out to discuss your project</li>
              <li>We provide a tailored proposal and timeline</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
