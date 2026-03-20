import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPost } from '../services/blogApi'
import BlogPostDetail from '../components/blog/BlogPostDetail'

export default function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchPost(slug)
      .then((data) => { if (!cancelled) setPost(data) })
      .catch((err) => { if (!cancelled) setError(err.message || 'Post not found') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [slug])

  if (loading) return <div className="page"><div className="container" style={{ padding: '4rem 1.5rem' }}>Loading...</div></div>
  if (error || !post) return <div className="page"><div className="container" style={{ padding: '4rem 1.5rem' }}><p>{error || 'Post not found'}</p><button className="btn btn-secondary" onClick={() => navigate('/blog')}>Back to blog</button></div></div>

  return (
    <div className="page">
      <BlogPostDetail post={post} />
    </div>
  )
}
