import { Link } from 'react-router-dom'

export default function BlogCard({ post }) {
  const slug = post.slug ?? String(post.id)
  const excerpt = post.excerpt || post.content?.slice(0, 150) || ''
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

  return (
    <article className="blog-card">
      <Link to={`/blog/${slug}`} className="blog-card-link">
        <h3>{post.title}</h3>
        {date && <time className="blog-card-date">{date}</time>}
        <p className="blog-card-excerpt">{excerpt}{post.content?.length > 150 ? '...' : ''}</p>
      </Link>
      <div className="blog-card-meta">
        <span className="likes">{post.likes ?? 0} likes</span>
        <span className="comments">{post.comment_count ?? 0} comments</span>
      </div>
    </article>
  )
}
