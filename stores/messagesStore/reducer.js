import { LOGGED_IN_USER } from '../constants';
import produce from 'immer';

const defaultState = {
  messages: [],
  messageFieldText: '',
  messagesFieldUserIndex: null,
};
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_MESSAGES': {
      return { ...state, messages: action.messages };
    }

    case 'SET_MESSAGE_FIELD_TEXT': {
      const newState = { ...state };
      newState.messageFieldText = action.text;
      return newState;
    }
    case 'SUBMIT_MESSAGE': {
      return produce(state, (draft) => {
        draft.messages[action.userIndex].messages.push({
          message_body: draft.messageFieldText,
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
