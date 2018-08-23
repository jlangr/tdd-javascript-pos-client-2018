import React from 'react';
import { shallow } from 'enzyme';
import CustomerExperience from './CustomerExperience';

describe('CustomerExperience', () => {
  const component = shallow(<CustomerExperience />);
  const id = 1;

  it('renders correct', () => {
    expect(component).toMatchSnapshot();
  });

  it('initializes the `state` with an empty list of items', () => {
    expect(component.state().items).toEqual([]);
  });

  describe('when clicking `scan item`', () => {
    beforeEach(() => {
      component.setState({ items: [] });
      component.find('.btn-add').simulate('click');
    })

    it('adds a new item to `state`', () => {
      expect(component.state().items).toEqual([{ id }]);
    });

    it('adds a new item to rendered list', () => {
      expect(component.find('.item-list').children().length).toEqual(1);
    })

    it('creates an Item component', () => {
      expect(component.find('Item').exists()).toBe(true);
    });
  });

  describe('and the user wants to void item', () => {
    beforeEach(() => {
      component.setState({ items: [] });
    });

    it('removes the item from `state`', () => {
      component.find('.btn-add').simulate('click');

      component.instance().voidItem(id); // UGH id correlation

      expect(component.state().items).toEqual([]);     
    });
  });
});
