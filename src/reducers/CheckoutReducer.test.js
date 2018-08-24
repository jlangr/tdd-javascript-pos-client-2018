import * as actions from '../actions/CheckoutActions';
import CheckoutReducer, { INITIAL_STATE } from './CheckoutReducer';

describe('checkout reducer', () => {
  describe('success paths', () => {
    let newState;

    afterEach(() => {
      expect(newState.error).toBeUndefined();
    });

    it('returns default state when action type not matched', () => {
      newState = CheckoutReducer(undefined, { type: 'xyz' });

      expect(newState).toEqual(INITIAL_STATE);
    });

    describe('add item', () => {
      it('adds an item to items list', () => {
        newState = CheckoutReducer(undefined, actions.addItem({ id: 1001, description: 'x', price: 1 }));

        expect(newState.items).toEqual([{ id: 1001, description: 'x', price: 1}]);
      });
    });

    describe('replace checkout', () => {
      it('', () => {
        const newCheckout = { id: 1, items: [] };
        newState = CheckoutReducer(undefined, actions.replaceCheckout(newCheckout));

        expect(newState.id).toEqual(1);
        expect(newState.items).toEqual([]);
      });
    });
  });

  describe('error', () => {
    it('attaches error to state', () => {
      const newState = CheckoutReducer(undefined, actions.error('errorObj', 'msg'));

      expect(newState.error).toEqual('msg: errorObj');
    });
  });
});