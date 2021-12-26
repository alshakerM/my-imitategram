export async function REQUEST_STORIES(action) {
  const { userId } = action;
  if (userId) {
    const response = await fetch(`/api/stories/?userId=${userId}`);
    return await response.json();
  } else {
    const response = await fetch('/api/stories');
    return await response.json();
  }
}
