import * as type from '../actions/types';
import ax from 'axios';

const server = 'http://localhost:3101';
export const request = path => `${server}${path}`;

export const createCheckout = () =>
  dispatch => 
    ax.post(request('/checkouts'), {})
      .then(response => dispatch(replaceCheckout(response.data)))
      .catch(errorObj => dispatch(error(errorObj, 'unable to create checkout')));

export const postItem = (scanCode, checkoutId) => 
  dispatch => 
    ax.post(request(`/checkouts/${checkoutId}/items`), {"upc": scanCode})
      .then(response => dispatch(addItem(response.data)))
      .catch(errorObj => dispatch(error(errorObj, 'unable to create item')));

export const error = (errorObj, message) => ({ type: type.ERROR, payload: `${message}: ${errorObj.toString()}` });

export const replaceCheckout = checkout => ({ type: type.REPLACE_CHECKOUT, payload: checkout });

export const addItem = newItem => ({ type: type.ADD_ITEM, payload: newItem });