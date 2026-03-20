export default function CommentList({ comments }) {
  if (!comments.length) return <p className="comments-empty">No comments yet. Be the first.</p>

  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li key={c.id} className="comment-item">
          <span className="comment-author">{c.author || 'Anonymous'}</span>
          <time className="comment-date">
            {c.created_at ? new Date(c.created_at).toLocaleString() : ''}
          </time>
          <p className="comment-text">{c.text}</p>
        </li>
      ))}
    </ul>
  )
}
