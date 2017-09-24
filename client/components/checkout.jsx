import React from 'react';

export default class Checkout extends React.Component {
  render() {
    const { cart } = this.props;
    const { update } = this.props;
    const { close } = this.props;
    if (cart.length === 0) {
      close();
    }
    const total = `$${cart.reduce((acc, next) => +acc + +next.value, 0.00).toFixed(2)}`
    return (
      <div className='checkout-component'>
        <div className="checkout-products">
          {
            cart.map(p => (
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
            ))
          }
          <div className="checkout-total">Total Purchase Amount: {total}</div>
        </div>
        <div className="checkout-form">
          <div className='form-main-section'>
            <div className='title'>Credit Card</div>
            {
              [
                { key: 'cardNumber', labelText: 'Credit Card Number' },
                { key: 'expirationDate', labelText: 'Credit Card Expiration Date' },
                { key: 'cardCode', labelText: 'Credit Card Security Code' },
              ].map(config => this.getFormLine(config))
            }
          </div>
          <div className='form-main-section'>
            <div className='title'>Billing Address</div>
            {
              [
                { key: 'bfirstName', labelText: 'First Name' },
                { key: 'blastName', labelText: 'Last Name' },
                { key: 'bcompany', labelText: 'Company' },
                { key: 'baddress', labelText: 'Address' },
                { key: 'bcity', labelText: 'City' },
                { key: 'bstate', labelText: 'State' },
                { key: 'bzip', labelText: 'Zip' },
                { key: 'bcountry', labelText: 'Country' },
              ].map(config => this.getFormLine(config))
            }
          </div>
          <div className='form-main-section'>
            <div className='title'>Shipping Address</div>
            {
              [
                { key: 'sfirstName', labelText: 'First Name' },
                { key: 'slastName', labelText: 'Last Name' },
                { key: 'scompany', labelText: 'Company' },
                { key: 'saddress', labelText: 'Address' },
                { key: 'scity', labelText: 'City' },
                { key: 'sstate', labelText: 'State' },
                { key: 'szip', labelText: 'Zip' },
                { key: 'scountry', labelText: 'Country' },
              ].map(config => this.getFormLine(config))
            }
          </div>
          <button
            onClick={e => {
              Meteor.call('authCreditCard', cart, { cardNumber: "5424000000000015", expirationDate: "1220", cardCode: "999" }, this.state, (err, res) => {
                console.log('auth', err, res)
              })
            }}
          >BUY</button>
        </div>
      </div>
    )
  }

  getFormLine({ key, labelText }) {
    return (
      <div className="checkout-form-line">
        <span className="checkout-label">{labelText}</span>
        <input className="checkout-input" onChange={e => {
          const newState = {};
          newState[key] = e.target.value;
          this.setState(newState);
        }}/>
      </div>
    );
  }
}
