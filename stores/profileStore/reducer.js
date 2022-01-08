const defaultState = {
  profileData: {
    posts: {},
    tagged: {},
  },
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_PROFILE': {
      const profileData = { ...state.profileData };
      profileData[action.postType] = action.profileData;

      return { ...state, profileData };
    }
    case 'RECEIVE_ALL_PROFILE': {
      console.log(action.profileData);
      return { ...state, profileData: action.profileData };
    }
    default:
      return state;
  }
}
