import * as actions from '../actions/CheckoutActions';
import CheckoutReducer from './CheckoutReducer';

describe('checkout reducer', () => {
  it('adds an item', () => {
    const state = CheckoutReducer(undefined, 
      actions.addItem({ id: 1001, description: 'x', price: 1 }));

    expect(state.items).toEqual([{ id: 1001, description: 'x', price: 1}]);
  });
});