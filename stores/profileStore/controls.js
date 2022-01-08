export async function REQUEST_PROFILE(action) {
  const { userName, postType, fields } = action;
  let url = '/api/users?';
  if (userName) {
    url += `userId=${userName}&`;
  }

  if (postType) {
    url += `postType=${postType}`;
  }
  if (fields) {
    url += `fields=${fields.join(',')}`;
  }
  const response = await fetch(url);
  return await response.json();
}
