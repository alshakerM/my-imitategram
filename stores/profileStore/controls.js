export async function REQUEST_PROFILE(action) {
  const { userName } = action;
  if (userName) {
    const response = await fetch(`/api/${userName}`);
    return await response.json();
  }
}
