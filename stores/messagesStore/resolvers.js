import { requestMessages, receiveMessages } from './actions';

export function* getMessages(fromUserId, fields) {
  const messages = yield requestMessages(fromUserId, fields);
  yield receiveMessages(messages);
}
