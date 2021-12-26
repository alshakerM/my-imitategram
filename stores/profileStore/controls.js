export async function REQUEST_PROFILE(action) {
  const { userName } = action;
  if (userName) {
    const response = await fetch(`/api/users?userId=${userName}`);
    return await response.json();
  }
}
