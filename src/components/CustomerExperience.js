import React, { Component } from 'react';
import { Button, Col, FormControl, Grid, Label, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Table from 'rc-table'; // see https://github.com/react-component/table 

import { createCheckout, postItem } from '../actions';

export class CustomerExperience extends Component {
  constructor() {
    super();
    this.itemTableColumns = this.createTableColumns();
    this.state = { scanCode: '' };
  }

  createTableColumns() {
    return [
      { title: 'Description', dataIndex: 'description', key: 'description', width: 200 }, 
      { title: 'Price', dataIndex: 'price', key: 'price', width: 100 },
      { title: '', dataIndex: '', key: 'operations', render: this.renderDeleteButton }
    ];
  }

  componentDidMount() {
    this.props.createCheckout();
  }

  addItem = () => {
    this.props.postItem(this.state.scanCode, this.props.checkoutId);
  }

  renderDeleteButton = (_o, row, index) => 
    <Button id={`btn-void-${row.id}`} onClick={() => {}}>Void</Button>;

    // <FormGroup>

  render() {
    return(
      <div>
        <h3>Welcome, Shopper!</h3>
        <h4>Items</h4>
        <Table id='table-items' columns={this.itemTableColumns} rowKey='id' data={this.props.items} />
        <hr />
        <div>
          <Grid>
            <Row>
              <Col xs={6} md={4}>
                <Button className='btn-add' onClick={this.addItem}>Add Item by Scan Code</Button>
              </Col>
              <Col xs={6} md={4}>
                <FormControl className='input-scan-code' 
                  type='text' 
                  onChange={ event => this.setState({ scanCode: event.target.value }) } />
              </Col>
            </Row>
            <Row><Label className='errorMessage'>{this.props.error}</Label></Row>
          </Grid>
      </div>
      </div>
    );
  }
};

const mapStateToProps = ({ checkout }) => ({ ...checkout, checkoutId: checkout.id });

export default connect(mapStateToProps, { createCheckout, postItem })(CustomerExperience);
