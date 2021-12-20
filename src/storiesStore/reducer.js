const defaultState = {
  stories: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_STORIES': {
      return { ...state, stories: action.stories };
    }
    case 'SET_LOADING': {
      const newState = { ...state, stories: [...state.stories] };
      newState.isLoading = action.isLoading;
      return newState;
    }
    default:
      return state;
  }
}
