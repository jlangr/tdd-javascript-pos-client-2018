import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Item extends Component {
  constructor() {
    super();
    this.state = { id: 0, description: '', price: 0 };
  }
  render() { 
    return (
      <div className='item'>
        <Form>
          <FormGroup>
            <ControlLabel>Item</ControlLabel>
            <FormControl 
              className='input-description'
              onChange={event => this.setState({ description: event.target.value })} />
            <ControlLabel>Price</ControlLabel>
            <FormControl 
              className='input-price'
              onChange={event => this.setState({ price: event.target.value })} />
          </FormGroup>
        </Form>
        <Button 
          className='btn-void'
          onClick={() => this.props.voidItem(this.props.item.id)} >
          Void
         </Button>
      </div>
    );
  }
}

export default Item;