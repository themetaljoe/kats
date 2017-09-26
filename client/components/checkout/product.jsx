import React from 'react';
import convert from '../../utilities/convert';

export default function CheckoutProduct(props) {
  const { p, cart, update } = props;
  const defaultImage = 'https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg';
  const hasPhotos = p.photo_urls.length > 0;
  const ProductImage = hasPhotos ?
    <img alt={p.title} src={p.photo_urls[0]} /> :
    <img alt="missing" src={defaultImage} />;

  return (
    <div className="cart-item">
      { ProductImage }
      <span className="title">
        {
          `
            ${convert(p.characteristics.manufacturer)}
            : ${p.characteristics.model}
          `
        }
      </span>
      <span className="value">${(+p.value).toFixed(2)}</span>
      <span className="description">{convert(p.description)}</span>
      <button
        className="remove-item"
        onClick={() =>
            update(cart
              .filter(prod =>
                prod.characteristics.sku !== p.characteristics.sku,
              ),
            )
        }
      >REMOVE</button>
    </div>
  );
}
