import * as type from '../actions/types';
import ax from 'axios';

const server = 'http://localhost:3101';
const request = path => `${server}${path}`;

// TODO common error processing; component error processing

export const createCheckout = () => {
  return dispatch => {
    return ax.post(request('/checkouts'), {})
      .then(response => dispatch(replaceCheckout(response.data)))
      .catch(errorObj => dispatch(error(errorObj), 'unable to load song'));
  }
};

export const postItem = (scanCode, checkoutId) => {
  return dispatch => {
    return ax.post(request(`/checkouts/${checkoutId}/items`), {"upc": scanCode})
      .then(response => dispatch(addItem(response.data)))
      .catch(errorObj => dispatch(error(errorObj), 'unable to create item'));
  }
};

const error = (errorObj, message) => ({ type: type.ERROR, payload: `${message}: ${errorObj.toString()}` });

export const replaceCheckout = checkout => ({ type: type.REPLACE_CHECKOUT, payload: checkout });

export const addItem = newItem => ({ type: type.ADD_ITEM, payload: newItem });