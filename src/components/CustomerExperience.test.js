import React from 'react';
import { shallow } from 'enzyme';
import { CustomerExperience } from './CustomerExperience';


describe('CustomerExperience', () => {
  let component = shallow(<CustomerExperience />);
  const id = 1;

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

  // TODO on click does action get invoked

  // describe('when clicking `void item` button', () => {
  //   beforeEach(() => {
  //     itemComponent.find('.btn-void').simulate('click');
  //   });

  //   it('calls the void item callback', () => {
  //     expect(mockVoid).toHaveBeenCalledWith(item.id);
  //   });
  // });

  describe('when clicking `scan item`', async () => {
    beforeEach(async () => {
      // component.setState({ items: [] });
      // see https://github.com/airbnb/enzyme/issues/1153
      // component.find('.btn-add').simulate('click');
      // component = component.update();
    })

    it('adds a new item to `state`', () => {
    });
  });
});
