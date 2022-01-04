export function requestThreads(fromUserId, fields) {
  return { type: 'REQUEST_THREADS', fields, fromUserId };
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
export function toggleMessageLike(fromUserId, index) {
  return {
    type: 'TOGGLE_MESSAGE_LIKE',
    fromUserId,
    index,
  };
}
export function deleteMessage(fromUserId, index) {
  return {
    type: 'DELETE_MESSAGE',
    fromUserId,
    index,
  };
}
