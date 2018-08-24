import { REPLACE_CHECKOUT, ADD_ITEM } from "../actions/types";

export const INITIAL_STATE = {
  items: [],
  id: 0
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case REPLACE_CHECKOUT:
      const checkout = action.payload;
      return { ...state, items: checkout.items, id: checkout.id };

    case ADD_ITEM:
      const newItem = action.payload;
      return { ...state, items: [...state.items, newItem]};

    default:
      return state;
  }
}