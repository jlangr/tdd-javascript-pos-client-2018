import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { max } from '../helper';
import Table from 'rc-table'; // see https://github.com/react-component/table 
import ax from 'axios';

const server = 'http://localhost:3101';
const request = path => `${server}${path}`;

class CustomerExperience extends Component {
  constructor() {
    super();
    this.state = { items: [], scanCode: '', checkoutId: 0 };
    this.createCheckout();
  }

  createCheckout() {
    console.log('CREATING CHECKOUT');
    ax.post(request('/checkouts'), {})
      .then(response => 
        this.setState({ items: response.data.items, checkoutId: response.data.id })
      )
      .catch(error => { 
        console.log('error creating checkout ', error);
      });
  }

  voidItem = index => {
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({ items });
  }

  postItem = (scanCode) => {
    ax.post(request(`/checkouts/${this.state.checkoutId}/items`), {"upc": scanCode})
      .then(response => {
        const item = response.data;
        this.setState({ items: [...this.state.items, item]})
      })
      .catch(error => { 
        console.log('error creating item ', error);
      });
  }

  // class method--`this` automatically transferred to this (no need for bind!)
  addItem = () => {
    this.postItem(this.state.scanCode);
  }

  renderDelete = (_o, row, index) => {
    return (
      <Button id={`btn-void-${row.id}`} 
       onClick={this.voidItem.bind(this, index)}>Void</Button>
    );
  }

  render() {
    const columns = [
      { title: 'Description', dataIndex: 'description', key: 'description', width: 200 }, 
      { title: 'Price', dataIndex: 'price', key: 'price', width: 100 },
      { title: 'Operations', dataIndex: '', key: 'operations', render: this.renderDelete }
    ];
    return(
      <div>
        <h3>Welcome, Shopper!</h3>
        <h4>Items</h4>
        <Table 
          id='table-items'
          columns={columns} 
          rowKey='id'
          data={this.state.items} 
        />
        <hr />
        <Form>
          <FormGroup>
            <Button className='btn-add f' onClick={this.addItem}>Add Item</Button>
            <ControlLabel className='f'>Scan code</ControlLabel>
            <FormControl 
              className='input-scan-code f'
              onChange={ event => this.setState({ scanCode: event.target.value }) } />
          </FormGroup>
        </Form>
      </div>
    );
  }
};

export default CustomerExperience;
