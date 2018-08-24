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

  describe('add checkout', () => {
    it('dispatches to replace song on successful post', async () => {
      const checkout = { id: 1001, items: [] };
      mock.onPost(actions.request('/checkouts')).reply(201, checkout);

      await actions.createCheckout()(dispatch);
      
      expect(dispatch).toHaveBeenCalledWith(actions.replaceCheckout(checkout));
    });

    it('dispatches to error message', async () => {
      mock.onPost(actions.request('/checkouts')).reply(500);

      await actions.createCheckout()(dispatch);
      
      const dispatchCall = dispatch.mock.calls[0];
      const arg = dispatchCall[0];
      expect(arg.type).toEqual(type.ERROR);
      expect(arg.payload).toMatch(/^unable to create checkout/);
      // expect(dispatch).toHaveBeenCalledWith({ type: type.ERROR, payload: '' });
    });
  });

  xdescribe('save song', () => {
    it('dispatches to replace song on successful retrieve', async () => {
      mock.onPost(actions.request('/song')).reply(200);

      await actions.saveSong()(dispatch);
      
      expect(dispatch).toHaveBeenCalledWith({ type: type.MESSAGE, payload: 'song saved' });
    });

    it('dispatches to error message', async () => {
      mock.onPost(actions.request('/song')).reply(500);

      await actions.saveSong()(dispatch);
      
      expect(dispatch).toHaveBeenCalledWith({ type: type.ERROR, payload: 'unable to save your song, sorry: Error: Request failed with status code 500' });
    });
  });

});

