export async function REQUEST_SUGGESTIONS(action) {
  const { count } = action;
  if (count) {
    const response = await fetch(`/api/explore/people?count=${count}`);
    return await response.json();
  } else {
    const response = await fetch(`/api/explore/people`);
    return await response.json();
  }
}
