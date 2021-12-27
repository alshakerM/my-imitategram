export function getThreads(state) {
  return state.threads;
}

export function getThread(state, fromUserId) {
  return state.loadedThreads[fromUserId];
}

export function getLoadedThread(state, fromUserId) {
  return state.loadedThreads[fromUserId];
}

export function getMessageFieldText(state) {
  return state.messageFieldText;
}
