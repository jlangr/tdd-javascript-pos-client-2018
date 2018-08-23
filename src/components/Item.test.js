import React from 'react';
import { shallow } from 'enzyme';
import Item from './Item';

describe('Item', () => {
  const mockVoid = jest.fn();
  const item = { id: 1, description: 'milk', price: 0 };
  const props = { item, voidItem: mockVoid };
  const itemComponent = shallow(<Item {...props}></Item>);

  it('renders properly', () => {
    expect(itemComponent).toMatchSnapshot();
  });

  it('initializes an item in `state`', () => {
    expect(itemComponent.state()).toEqual({ id: 0, description: '', price: 0 });
  });

  describe('when typing into input', () => {
    const description = 'milk';

    beforeEach(() => {
      itemComponent.find('.input-description').simulate('change', { target: { value: description }});
    });

    it('updates the item in `state`', () => {
      expect(itemComponent.state().description).toEqual(description);
    });
  });

  describe('when typing into the price input', () => {
    const price = 4.00;

    beforeEach(() => {
      itemComponent.find('.input-price').simulate('change', { target: { value: price }});
    });

    it('updates the price in `state`', () => {
      expect(itemComponent.state().price).toEqual(price);
    });
  });

  describe('when clicking `void item` button', () => {
    beforeEach(() => {
      itemComponent.find('.btn-void').simulate('click');
    });

    it('calls the void item callback', () => {
      expect(mockVoid).toHaveBeenCalledWith(item.id);
    });
  });
});