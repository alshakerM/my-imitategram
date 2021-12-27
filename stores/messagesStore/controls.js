export async function REQUEST_MESSAGES(action) {
  const { fromUserId, fields } = action;
  let url = '/api/messages/?';

  if (fromUserId) {
    url += `fromUserId=${fromUserId}&`;
  }

  if (fields) {
    url += `fields=${fields.join(',')}`;
  }

  const response = await fetch(url);
  return await response.json();
}
