const defaultState = {
  expanded: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_EXPANDED': {
      return { ...state, expanded: action.expanded };
    }
    default:
      return state;
  }
}
