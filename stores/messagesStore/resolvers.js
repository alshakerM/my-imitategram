import { requestThreads, receiveThreads, receiveThread } from './actions';

export function* getThreads() {
  const threads = yield requestThreads(undefined, [
    'from_user_id',
    'from_user_thumbnail',
    'from_username',
    'last_message',
  ]);
  yield receiveThreads(threads);
}

export function* getThread(fromUserId) {
  const thread = yield requestThreads(fromUserId);
  yield receiveThread(thread);
}

