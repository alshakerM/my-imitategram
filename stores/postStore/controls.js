export async function REQUEST_POSTS(action) {
  const { postId, pageNumber } = action;
  let response;
  if (postId) {
    response = await fetch(`/api/posts?postId=${postId}`);
  } else {
    response = await fetch('/api/posts');
  }
  if (pageNumber >= 0) {
    response = await fetch(`/api/posts?pageNumber=${pageNumber}`);
  }
  const results = await response.json();
  return results;
}
