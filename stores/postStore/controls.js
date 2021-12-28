export async function REQUEST_POSTS(action) {
  const { postId } = action;
  let response;
  if (postId) {
    response = await fetch(`/api/posts?postId=${postId}`);
  } else {
    response = await fetch('/api/posts');
  }
  const results = await response.json();
  return results;
}
