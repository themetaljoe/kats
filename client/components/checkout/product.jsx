import React from 'react';

export default class CheckoutProduct extends React.Component {
  render() {
    const { p, cart, update } = this.props;
    return (
      <div className='cart-item'>
        { p.photo_urls.length > 0 ? <img src={p.photo_urls[0]} /> : '' }
        <span className='title'>{p.characteristics.manufacturer + ': ' + p.characteristics.model}</span>
        <span className='value'>${(+p.value).toFixed(2)}</span>
        <span className='description'>{p.description.replace(/ *\([^)]*\) */g, "").split("WAS")[0]}</span>
        <button
          className="remove-item"
          onClick={e => update(cart.filter(prod => prod.characteristics.sku !== p.characteristics.sku))}
        >REMOVE</button>
      </div>
    )
  }
}
