export function requestMessages() {
  return { type: 'REQUEST_MESSAGES' };
}

export function receiveMessages(messages) {
  return {
    type: 'RECEIVE_MESSAGES',
    messages,
  };
}
export function setMessageFieldText(text) {
  return {
    type: 'SET_MESSAGE_FIELD_TEXT',
    text,
  };
}
export function submitMessage(userIndex) {
  return {
    type: 'SUBMIT_MESSAGE',
    userIndex,
  };
}
