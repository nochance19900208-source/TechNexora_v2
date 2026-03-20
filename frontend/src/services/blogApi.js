const API = '/api'

export async function fetchPosts() {
  const res = await fetch(`${API}/blog/posts`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export async function fetchPost(slug) {
  const res = await fetch(`${API}/blog/posts/${slug}`)
  if (!res.ok) throw new Error('Post not found')
  return res.json()
}

export async function fetchPostComments(postId) {
  const res = await fetch(`${API}/blog/posts/${postId}/comments`)
  if (!res.ok) return []
  return res.json()
}

export async function addComment(postId, text, author) {
  const res = await fetch(`${API}/blog/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, author }),
  })
  if (!res.ok) throw new Error('Failed to post comment')
  return res.json()
}

export async function likePost(postId) {
  const res = await fetch(`${API}/blog/posts/${postId}/like`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to like')
  return res.json()
}

export async function dislikePost(postId) {
  const res = await fetch(`${API}/blog/posts/${postId}/dislike`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to dislike')
  return res.json()
}
