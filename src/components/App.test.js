import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  const app = shallow(<App />);
  const id = 1;

  it('renders correct', () => {
    expect(app).toMatchSnapshot();
  });

  it('initializes the `state` with an empty list of gifts', () => {
    expect(app.state().items).toEqual([]);
  });

  describe('when clicking `scan item`', () => {
    beforeEach(() => {
      app.setState({ items: [] });
      app.find('.btn-add').simulate('click');
    })

    it('adds a new item to `state`', () => {
      expect(app.state().items).toEqual([{ id }]);
    });

    it('adds a new item to rendered list', () => {
      expect(app.find('.item-list').children().length).toEqual(1);
    })

    it('creates an Item component', () => {
      expect(app.find('Item').exists()).toBe(true);
    });
  });

  describe('and the user wants to void item', () => {
    beforeEach(() => {
      app.setState({ items: [] });
    });

    it('removes the item from `state`', () => {
      app.find('.btn-add').simulate('click');

      app.instance().voidItem(id); // UGH id correlation

      expect(app.state().items).toEqual([]);     
    });
  });
});