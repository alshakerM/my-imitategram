import produce from 'immer';

const defaultState = {
  threads: [],
  messageFieldText: '',
  messagesFieldUserIndex: null,
  loadedThreads: {},
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_THREADS': {
      return { ...state, threads: action.threads };
    }

    case 'RECEIVE_THREAD': {
      return produce(state, (draft) => {
        draft.loadedThreads[action.thread.from_user_id] = action.thread;
      });
    }

    case 'SET_MESSAGE_FIELD_TEXT': {
      const newState = { ...state };
      newState.messageFieldText = action.text;
      return newState;
    }

    case 'MESSAGE_LIKE': {
      return produce(state, (draft) => {
        const message =
          draft.loadedThreads[action.fromUserId].messages[action.index];
        message.is_liked_by_user = action.like;
      });
    }
    case 'DELETE_MESSAGE': {
      return produce(state, (draft) => {
        const deletedMessage = draft.loadedThreads[
          action.fromUserId
        ].messages.splice(action.index, 1);
      });
    }

    case 'SUBMIT_MESSAGE': {
      return produce(state, (draft) => {
        draft.loadedThreads[action.fromUserId].messages.push({
          message_body: action.text,
          sent_on: new Date().toISOString(),
          is_liked_by_user: false,
          direction: 'sent',
        });
        draft.messageFieldText = '';
      });
    }

    default:
      return state;
  }
}
