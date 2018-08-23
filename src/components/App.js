import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Item from './Item';

class App extends Component {
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

    const ids = this.state.items.map(item => item.id);
    const max_id = ids.length > 0 ? Math.max(...ids) : 0;

    items.push({ id: max_id  + 1 });

    this.setState({ items });
  };

  render() {
    return(
      <div>
        <h2>Welcome</h2>
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

export default App;