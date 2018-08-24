import React from 'react';
import { shallow } from 'enzyme';
import { CustomerExperience } from './CustomerExperience';

describe('CustomerExperience', () => {
  let component = shallow(<CustomerExperience />);

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('local state', () => {
    it('initializes the `state` with an empty scan code', () => {
      expect(component.state().scanCode).toEqual('');
    });

    it('updates the scanCode', () => {
      component.find('.input-scan-code').simulate('change', { target: { value: '123' }});
      expect(component.state().scanCode).toEqual('123');
    });
  });

  describe('when clicking `add item` button', () => {
    it('calls the addItem callback', () => {
      const mockPostItem = jest.fn();
      const props = { checkoutId: 1001, postItem: mockPostItem };
      const injectedComponent = shallow(<CustomerExperience { ...props } />); 
      injectedComponent.setState({ scanCode: 'scanCode123' });

      injectedComponent.find('.btn-add').simulate('click');

      expect(mockPostItem).toHaveBeenCalledWith('scanCode123', 1001);
    });
  });

  xdescribe('when clicking `scan item`', async () => {
    it('adds a new item to `state`', () => {
      // component.setState({ items: [] });
      // see https://github.com/airbnb/enzyme/issues/1153
      // component.find('.btn-add').simulate('click');
      // component = component.update();
      // assert that the DOM contains the new row... not so easy
    });
  });
});
