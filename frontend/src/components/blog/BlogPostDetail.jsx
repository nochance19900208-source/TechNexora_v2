import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostComments, addComment, likePost, dislikePost } from '../../services/blogApi'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default function BlogPostDetail({ post }) {
  const { slug } = useParams()
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState(post.likes ?? 0)
  const [dislikes, setDislikes] = useState(post.dislikes ?? 0)
  const [loadingComments, setLoadingComments] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchPostComments(post.id)
      .then((data) => { if (!cancelled) setComments(data) })
      .finally(() => { if (!cancelled) setLoadingComments(false) })
    return () => { cancelled = true }
  }, [post.id])

  const handleComment = (text, author) => {
    addComment(post.id, text, author)
      .then((newComment) => setComments((prev) => [newComment, ...prev]))
      .catch(() => {})
  }

  const handleLike = () => {
    likePost(post.id).then(() => setLikes((prev) => prev + 1)).catch(() => {})
  }

  const handleDislike = () => {
    dislikePost(post.id).then(() => setDislikes((prev) => prev + 1)).catch(() => {})
  }

  const date = post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

  return (
    <article className="blog-post">
      <div className="container">
        <header className="blog-post-header">
          <h1>{post.title}</h1>
          {date && <time>{date}</time>}
        </header>
        <div className="blog-post-content">
          {post.content}
        </div>
        <div className="blog-post-actions">
          <button onClick={handleLike} className="btn btn-action">Like ({likes})</button>
          <button onClick={handleDislike} className="btn btn-action">Dislike ({dislikes})</button>
        </div>
        <section className="blog-comments">
          <h2>Comments ({comments.length})</h2>
          <CommentForm onSubmit={handleComment} />
          {loadingComments ? <p>Loading comments...</p> : <CommentList comments={comments} />}
        </section>
      </div>
    </article>
  )
}
