import React from 'react';
import convert from '../../utilities/convert';

export default function CheckoutOverview() {
  const { cart, updateCart, openCheckout } = props;
  const defaultImg = 'https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg';

  return (
    <div className="shopping-cart-overview">
      {
        cart.map(p => (
          <div
            key={`${p.characteristics.sku}`}
            className="cart-item"
          >
            {
              p.photo_urls.length > 0 ?
                <img alt={p.title} src={p.photo_urls[0]} /> :
                <img alt="missing" src={defaultImg} />
            }
            <span className="title">
              {
                `${p.characteristics.manufacturer}: ${p.characteristics.model}`
              }
            </span>
            <span className="value">
              ${(+p.value).toFixed(2)}
            </span>
            <span className="description">
              {convert(p.description)}
            </span>
            <button
              className="remove-item"
              onClick={() =>
                updateCart(cart.filter(prod =>
                  prod.characteristics.sku !== p.characteristics.sku,
                ))
              }
            >
              REMOVE
            </button>
          </div>
        ))
      }
      <button
        className="overview-checkout"
        onClick={() => openCheckout()}
      >
        Checkout
      </button>
    </div>
  );
}
