const defaultState = {
  suggestions: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'RECEIVE_SUGGESTIONS': {
      return { ...state, suggestions: action.suggestions };
    }
    case 'SET_LOADING': {
      const newState = { ...state, suggestions: [...state.suggestions] };
      newState.isLoading = action.isLoading;
      return newState;
    }
    default:
      return state;
  }
}
