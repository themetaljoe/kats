import React from 'react';

const convert = (str) => {
  return str.split("WAS")[0].replace(/\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .replace(/Brand: /g, "").replace(/A&l/g, "Art and Lutherie").replace(/B&s/g, 'Back And Sides')
    .replace(/Color: /g, "").replace(/Model: /g, "")
    .replace(/Musical Instrument/g, "").replace(/ *\([^)]*\) */g, "")
    .replace(/&/g, " and ").replace(/ \//g,', ').replace('/\-/', ', ')
    .replace(/c\/e/g, "c / E").replace(/  /g, " ")
}

export default class CheckoutProduct extends React.Component {
  render() {
    const { p, cart, update } = this.props;
    return (
      <div className='cart-item'>
        { p.photo_urls.length > 0 ? <img src={p.photo_urls[0]} /> : <img src="https://unsplash.it/200/300" /> }
        <span className='title'>{convert(p.characteristics.manufacturer) + ': ' + p.characteristics.model}</span>
        <span className='value'>${(+p.value).toFixed(2)}</span>
        <span className='description'>{convert(p.description)}</span>
        <button
          className="remove-item"
          onClick={e => update(cart.filter(prod => prod.characteristics.sku !== p.characteristics.sku))}
        >REMOVE</button>
      </div>
    )
  }
}
