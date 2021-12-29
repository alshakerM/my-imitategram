export async function REQUEST_SUGGESTIONS(action) {
  const { count } = action;
  if (count) {
    const response = await fetch(`/api/suggestions/?count=${count}`);
    return await response.json();
  } else {
    const response = await fetch(`/api/suggestions/`);
    return await response.json();
  }
}
