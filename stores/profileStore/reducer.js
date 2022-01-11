import produce from 'immer';

const defaultState = {
  fullProfilesData: {},
  profiles: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_PROFILE': {
      return produce(state, (draft) => {
        const username = action.fullProfileData.user_name;
        const postType = action.postType;
        if (!draft.fullProfilesData[username]) {
          draft.fullProfilesData[username] = {};
        }
        draft.fullProfilesData[username][postType] = action.fullProfileData;
      });
    }
    case 'RECEIVE_PROFILES': {
      debugger
      return { ...state, profiles: action.profiles };
    }
    default:
      return state;
  }
}
