const defaultState = {
  profileData: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_PROFILE': {
      return { ...state, profileData: action.profileData };
    }
    case 'SET_LOADING': {
      const newState = { ...state, profileData: [...state.profileData] };
      newState.isLoading = action.isLoading;
      return newState;
    }
    default:
      return state;
  }
}
