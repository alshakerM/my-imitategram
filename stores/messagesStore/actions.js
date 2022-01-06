export function requestThreads(fromUserId, fields) {
  return { type: 'REQUEST_THREADS', fields, fromUserId };
}
export function requestMessageLike(fromUserId, index, like) {
  return { type: 'REQUEST_MESSAGE_LIKE', index, fromUserId, like };
}

export function receiveThreads(threads) {
  return {
    type: 'RECEIVE_THREADS',
    threads,
  };
}

export function receiveThread(thread) {
  return {
    type: 'RECEIVE_THREAD',
    thread,
  };
}

export function setMessageFieldText(text) {
  return {
    type: 'SET_MESSAGE_FIELD_TEXT',
    text,
  };
}
export function submitMessage(userId) {
  return {
    type: 'SUBMIT_MESSAGE',
    userId,
  };
}

export function* messageLike(fromUserId, index, like = true) {
  yield requestMessageLike(fromUserId, index, like);

  yield {
    type: 'MESSAGE_LIKE',
    fromUserId,
    index,
    like,
  };
}
export function* deleteMessage(fromUserId, index) {
  yield {
    type: 'DELETE_MESSAGE',
    fromUserId,
    index,
  };
  return {
    type: 'DELETE_MESSAGE',
    fromUserId,
    index,
  };
}
