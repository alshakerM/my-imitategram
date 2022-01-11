import { isomorphicFetch } from "../../utils";

export async function REQUEST_PROFILE(action) {
  const { userName, postType } = action;
  let url = '/api/users?';
  if (userName) {
    url += `userId=${userName}&`;
  }

  if (postType) {
    url += `postType=${postType}`;
  }

  const response = await isomorphicFetch(url);
  return await response.json();
}

export async function REQUEST_PROFILES(action) {
  const { fields } = action;
  let url = '/api/users?';
  if (fields) {
    url += `fields=${fields.join(',')}`;
  }
  const response = await isomorphicFetch(url);
  return await response.json();
}
