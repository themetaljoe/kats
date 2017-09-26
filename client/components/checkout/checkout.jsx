import React from 'react';
import { Meteor } from 'meteor/meteor';
import Products from './products';

export default class Checkout extends React.Component {
  getEmailLayout() {
    return (
      <div className="form-main-section">
        <div className="title">Email Address</div>
        {
          this.getFormLine({
            key: 'email',
            labelText: 'Email your want your receipt should be sent to.',
          })
        }
      </div>
    );
  }

  getCreditCardLayout() {
    return (
      <div className="form-main-section">
        <div className="title">Credit Card</div>
        {
          [
            { key: 'cardNumber', labelText: 'Credit Card Number' },
            { key: 'expirationDate', labelText: 'Credit Card Expiration Date' },
            { key: 'cardCode', labelText: 'Credit Card Security Code' },
          ].map(config => this.getFormLine(config))
        }
      </div>
    );
  }

  getBillingAddressLayout() {
    return (
      <div className="form-main-section">
        <div className="title">Billing Address</div>
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
    );
  }

  getShippingAddressLayout() {
    return (
      <div className="form-main-section">
        <div className="title">Shipping Address</div>
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
    );
  }

  render() {
    const { cart, update, close } = this.props;
    const total = `$${cart.reduce((acc, next) => +acc + +next.value, 0.00).toFixed(2)}`;

    if (cart.length === 0) { close(); }

    return (
      <div className="checkout-component">
        <button
          className="back-to-products"
          onClick={() => close()}
        >
          Back To Products Page
        </button>
        <Products cart={cart} total={total} update={update} />
        <div className="checkout-form">
          { this.getEmailLayout() }
          { this.getCreditCardLayout() }
          { this.getBillingAddressLayout() }
          { this.getShippingAddressLayout() }
          <button onClick={this.authCard.bind(this)}>
            BUY
          </button>
        </div>
      </div>
    );
  }

  getFormLine({ key, labelText }) {
    return (
      <div key={`${key}-${labelText}`} className="checkout-form-line">
        <span className="checkout-label">{labelText}</span>
        <input
          className="checkout-input"
          onChange={(e) => {
            const newState = {};
            newState[key] = e.target.value;
            this.setState(newState);
          }}
        />
      </div>
    );
  }

  authCard() {
    Meteor.call(
      'authCreditCard',
      this.props.cart, {
        cardNumber: '5424000000000015',
        expirationDate: '1220',
        cardCode: '999',
      },
      this.state,
      (err, res) => { console.log('auth', err, res); },
    );
  }
}
