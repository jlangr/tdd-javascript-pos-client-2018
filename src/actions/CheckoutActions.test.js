import * as actions from './CheckoutActions';
import * as type from './types';
import ax from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';

describe('createCheckout', () => {
  let mock;
  let dispatch;

  beforeEach(() => {
    mock = new MockAdapter(ax);
    dispatch = jest.fn();
  });

  afterEach(() => {
    mock.restore();
  });

  describe('`addCheckout`', () => {
    it('dispatches to `replaceCheckout` on success', async () => {
      const checkout = { id: 1001, items: [] };
      mock.onPost(actions.request('/checkouts')).reply(201, checkout);

      await actions.createCheckout()(dispatch);
      
      expect(dispatch).toHaveBeenCalledWith(actions.replaceCheckout(checkout));
    });

    it('dispatches to error action from catch', async () => {
      mock.onPost(actions.request('/checkouts')).reply(500);

      await actions.createCheckout()(dispatch);
      
      expectErrorDispatchWithMessage(dispatch, /^unable to create checkout/);
    });
  });

  describe('`postItem`', () => {
    it('dispatches to `addItem` on success', async () => {
      const newItem = { description: 'milk' };
      mock.onPost(actions.request('/checkouts/101/items')).reply(200, newItem);

      await actions.postItem('scan123', 101)(dispatch);
      
      expect(dispatch).toHaveBeenCalledWith(actions.addItem(newItem));
    });

    it('dispatches to error action from catch', async () => {
      mock.onPost(actions.request('/checkouts/101/items')).reply(500);

      await actions.postItem('', 101)(dispatch);
      
      expectErrorDispatchWithMessage(dispatch, /^unable to create item/);
    });
  });

  // TODO jest supports custom matchers
  const expectErrorDispatchWithMessage = (dispatch, matchExpression) => {
    expect(dispatch).toBeCalled();
    const dispatchCallFirstArg = dispatch.mock.calls[0][0];
    expect(dispatchCallFirstArg.type).toEqual(type.ERROR);
    expect(dispatchCallFirstArg.payload).toMatch(matchExpression);
  }
});

