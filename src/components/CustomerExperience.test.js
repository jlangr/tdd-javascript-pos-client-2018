import React from 'react';
import { shallow, mount } from 'enzyme';
import CustomerExperience from './CustomerExperience';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('CustomerExperience', () => {
  let component = shallow(<CustomerExperience />);
  const id = 1;

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  xit('initializes the `state` with an empty list of items', () => {
    expect(component.state().items).toEqual([]);
  });

  describe('when clicking `scan item`', async () => {
    beforeEach(async () => {
      component.setState({ items: [] });

      // see https://github.com/airbnb/enzyme/issues/1153

      component.find('.btn-add').simulate('click');
      component = component.update();
    })

    it('adds a new item to `state`', () => {
      expect(component.state().items).toEqual([{ id, description: 'milk', price: 3.29 }]);
    });

    xit('adds a new item to rendered html', () => {
      // console.log(component.html());
      // const tableRows = component.find('.rc-table-row');

      const tableRows = component.find('.rc-table');
      // console.log(tableRows.html());
      expect(tableRows.length).toEqual(1);
    })

    xit('creates an Item component', () => {
      expect(component.find('Item').exists()).toBe(true);
    });
  });

  xdescribe('on an item void', () => {
    let component1 = mount(<CustomerExperience />);
    beforeEach(() => {
      component1.setState({ items: [] });
    });

    it('removes the item from `state`', () => {
      component1.find('.btn-add').simulate('click');
      console.log(component1.html());
      // component1.update(); // workaround?
      const b = component1.find('#btn-void-1');
      console.log(b.html());
      b.simulate('click');

      component1.instance().voidItem(id); // UGH id correlation

      expect(component1.state().items).toEqual([]);     
    });
  });
});
