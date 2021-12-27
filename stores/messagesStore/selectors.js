export function getMessages(state, fromUserId, fields) {
  let filteredData = state.messages;
  if (fromUserId) {
    filteredData = state.messages.find(
      (thread) => thread.from_user_id === fromUserId
    );
  }
  if (fields) {
    filteredData = state.messages.map((thread) => {
      const filteredThread = {};
      fields.forEach((field) => {
        filteredThread[field] = thread[field];
      });
      return filteredThread;
    });
  }
  return filteredData;
}
export function getMessageFieldText(state) {
  return state.messageFieldText;
}
