import { useState } from 'react'

export default function CommentForm({ onSubmit }) {
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setSubmitting(true)
    onSubmit(text.trim(), author.trim() || 'Anonymous')
      .finally(() => {
        setText('')
        setSubmitting(false)
      })
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="comment-form-author"
      />
      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        rows={3}
        className="comment-form-text"
      />
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post comment'}
      </button>
    </form>
  )
}
