import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Item from './Item';
import { max } from '../helper';

class CustomerExperience extends Component {
  constructor() {
    super();
    this.state = { items: []};
  }

  voidItem = id => {
    const items = this.state.items.filter(item => item.id !== id);
    this.setState({ items });
  }

  // class method--`this` automatically transferred to this (no need for bind!)
  addItem = () => {
    const { items } = this.state;
    items.push({ id: max(this.state.items.map(item => item.id)) + 1 });
    this.setState({ items });
  };

  render() {
    return(
      <div>
        <h3>Welcome, Shopper!</h3>
        <div className = 'item-list'>
          {this.state.items.map(item => {
            return (
              <Item 
                key={item.id}
                item={item}
                voidItem={this.voidItem}></Item>
            );
          })}
        </div>
        <Button className='btn-add' onClick={this.addItem}>Add Item</Button>
      </div>
    );
  }
};

export default CustomerExperience;
