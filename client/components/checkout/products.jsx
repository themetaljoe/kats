import React from 'react';
import Product from './product';

export default function CheckoutProducts(props) {
  const { cart, total, update } = props;
  return (
    <div className="checkout-products">
      <h1 className="your-items">Your Items</h1>
      {
        cart.map(p =>
          <Product
            key={`${p.characteristics.sku}`}
            p={p}
            cart={cart}
            update={update}
          />,
        )
      }
      <div className="checkout-total">Total Purchase Amount: {total}</div>
    </div>
  );
}
