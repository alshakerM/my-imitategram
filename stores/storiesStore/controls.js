import { isomorphicFetch } from "../../utils";

export async function REQUEST_STORIES(action) {
  const { userId } = action;
  if (userId) {
    const response = await isomorphicFetch(`/api/stories/?userId=${userId}`);
    return await response.json();
  } else {
    const response = await isomorphicFetch('/api/stories');
    return await response.json();
  }
}
