import * as type from "../actions/types";

export const INITIAL_STATE = { items: [], id: 0, error: undefined };

export default(state = INITIAL_STATE, action) => {
  let error = undefined;

  switch(action.type) {
    case type.REPLACE_CHECKOUT:
      const checkout = action.payload;
      return { ...state, error, items: checkout.items, id: checkout.id };

    case type.ADD_ITEM:
      const newItem = action.payload;
      return { ...state, error, items: [...state.items, newItem]};

    case type.ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}