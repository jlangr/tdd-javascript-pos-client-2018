import { ADD_ITEM, ERROR, REPLACE_CHECKOUT } from "../actions/types";

export const INITIAL_STATE = {
  items: [],
  id: 0,
  error: undefined
};

// TODO tests, also around clearing error
export default(state = INITIAL_STATE, action) => {
  // TODO common code to clear error
  switch(action.type) {
    case REPLACE_CHECKOUT:
      const checkout = action.payload;
      return { ...state, error: undefined, items: checkout.items, id: checkout.id };

    case ADD_ITEM:
      const newItem = action.payload;
      return { ...state, error: undefined, items: [...state.items, newItem]};

    case ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}