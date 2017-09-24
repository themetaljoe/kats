import React from 'react';
import Product from './product';

export default class CheckoutProducts extends React.Component {
  render() {
    const { cart, total, update } = this.props;
    return (
      <div className="checkout-products">
        <h1 className='your-items'>Your Items</h1>
        { cart.map(p => <Product p={p} cart={cart} update={update} />) }
        <div className="checkout-total">Total Purchase Amount: {total}</div>
      </div>
    );
  }
}

