import { isomorphicFetch } from "../../utils";

export async function REQUEST_THREADS(action) {
  const { fromUserId, fields } = action;
  let url = '/api/messages?';

  if (fromUserId) {
    url += `fromUserId=${fromUserId}&`;
  }

  if (fields) {
    url += `fields=${fields.join(',')}`;
  }

  const response = await isomorphicFetch(url);
  return await response.json();
}

export async function REQUEST_MESSAGE_LIKE(action) {
  await isomorphicFetch('/api/messages?action=messageLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromUserId: action.fromUserId,
      index: action.index,
      like: action.like,
    }),
  });
}

export async function DELETE_MESSAGE(action) {
  await isomorphicFetch('/api/messages?action=deleteMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromUserId: action.fromUserId,
      index: action.index,
    }),
  });
}
export async function SUBMIT_MESSAGE(action) {
  await isomorphicFetch('/api/messages?action=submitMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromUserId: action.fromUserId,
      text: action.text,
    }),
  });
}
