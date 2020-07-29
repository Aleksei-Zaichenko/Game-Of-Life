import { IS_DISABLED } from "../actions/actions";

const initialState = {
  disabled: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case IS_DISABLED:
      return {
        ...state,
        disabled: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
