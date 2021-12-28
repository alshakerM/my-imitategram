export async function REQUEST_PROFILE(action) {
  const { userName, postType } = action;
  let url = '/api/users?';
  if (userName) {
    url += `userId=${userName}&`;
  }

  if (postType) {
    url += `postType=${postType}`;
  }

  const response = await fetch(url);
  return await response.json();
}
