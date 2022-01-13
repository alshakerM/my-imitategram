import { isomorphicFetch } from "../../utils";

export async function REQUEST_SUGGESTIONS(action) {
  const { count } = action;
  if (count) {
    const response = await isomorphicFetch(`/api/suggestions/?count=${count}`);
    return await response.json();
  } else {
    const response = await isomorphicFetch(`/api/suggestions/`);
    return await response.json();
  }
}
