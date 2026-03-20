import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard'
import { fetchPosts } from '../services/blogApi'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchPosts()
      .then((data) => { if (!cancelled) setPosts(data) })
      .catch((err) => { if (!cancelled) setError(err.message || 'Failed to load posts') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Blog</h1>
          <p className="page-subtitle">
            Updates, insights, and technical notes from the TechNeoxra team.
          </p>
        </div>
      </section>

      <section className="section blog-section">
        <div className="container">
          {loading && <p className="blog-loading">Loading posts...</p>}
          {error && <p className="blog-error">{error}</p>}
          {!loading && !error && (
            <div className="blog-grid">
              {posts.length === 0 ? (
                <p className="blog-empty">No posts yet. Check back soon.</p>
              ) : (
                posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
