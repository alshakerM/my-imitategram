import { requestMessages, receiveMessages } from './actions';

export function* getMessages() {
  const messages = yield requestMessages();
  yield receiveMessages(messages);
}
