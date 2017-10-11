import React from 'react';
import { Meteor } from 'meteor/meteor';
import Products from './products';

function validateCreditCardNumber(number, component, key) {
  const { errors } = component.state;
  const re = /^\d+$/;
  if (!re.test(number)) {
    errors[key] = 'Please enter a valid credit card number.';
    component.setState({ errors });
  } else {
    errors[key] = null;
    component.setState({ errors });
  }
  return re.test(number);
}

function validateEmail(email, component, key) {
  const { errors } = component.state;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    errors[key] = 'Please enter a valid email address';
    component.setState({ errors });
  } else {
    errors[key] = null;
    component.setState({ errors });
  }
  return re.test(email);
}

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      auth: false,
      authId: 'randomID',
      showShipping: true,
      processingPayment: false,
      paymentErrors: {},
    };
  }

  getEmailLayout() {
    return (
      <div className="form-main-section">
        <div className="title">Email Address</div>
        {
          this.getFormLine({
            key: 'email',
            labelText: 'Email you would prefer your receipt sent to.',
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
        <span className="checkout-label">The address as it appears on your credit card</span>
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
        <input id="checkBox" type="checkbox" onChange={e => this.setState({ showShipping: !e.target.checked })} />
        <label htmlFor="checkBox" className="checkout-label">SAME AS ABOVE</label>
        {
          this.state.showShipping ? (
            <div>
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
          ) : ''
        }
      </div>
    );
  }

  render() {
    const { cart, update, close } = this.props;
    const total = `$${cart.reduce((acc, next) => +acc + +next.value, 0.00).toFixed(2)}`;
    const { paymentErrors } = this.state;
    if (cart.length === 0) { close(); }

    return (
      <div className="checkout-component">
        <h1 className="cc-disabled">ATTENTION: Credit Card / Bank Card Transactions are currently disabled we apologize for the inconvenience.  Please call the store at <a href="tel:1-281-363-2103">281-363-2103</a> to finish this transaction.</h1>
        <a className="terms-link" href="/terms">Terms and Conditions</a>
        <br />
        {
          paymentErrors && paymentErrors.transactionResponse ? (
            <div className="payment-failed">
              { paymentErrors.transactionResponse.errors.error[0].errorText}
              <button className="ok" onClick={() => this.setState({ paymentErrors: {} })}>OK</button>
            </div>
          ) : ''
        }
        <button
          className="back-to-products"
          onClick={() => {
            if (this.state.auth) {
              update([]);
              window.location = '/products';
            }
            close();
          }}
        >
          Back To Products Page
        </button>
        {
          !this.state.auth ? (
            <div>
              <Products cart={cart} total={total} update={update} />
              <div className="checkout-form">
                { this.getEmailLayout() }
                { this.getCreditCardLayout() }
                { this.getBillingAddressLayout() }
                { this.getShippingAddressLayout() }
                {
                  this.state.processingPayment ? (
                    <button>
                      Processing...
                    </button>
                  ) : (
                    <button onClick={this.authCard.bind(this)}>
                      BUY
                    </button>
                  )
                }
              </div>
            </div>
          ) : (
            <div className="transaction processed">
              <img
                className="success-logo"
                alt="success"
                src="http://www.iconsdb.com/icons/preview/green/check-mark-8-xxl.png"
              />
              <span className="approved-transaction">Your transaction was approved.</span>
              <h1>Transaction: #{this.state.authId}</h1>
              <h3>Thank you for your purchase.</h3>
              <p>You should receive your receipt via email sent to { this.state.email }.</p>
              <p>If you need more information regarding your order please call us at</p>
              <a href="tel:281-363-2110">281-363-2110</a>
            </div>
          )
        }
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
        {
          this.state.errors[key] ?
            <p className="form-errors">{this.state.errors[key]}</p> :
            <span />
        }
      </div>
    );
  }

  validateFields() {
    const { state } = this;
    if (!state.showShipping) {
      Object.keys(state).forEach((key) => {
        if (key[0] === 'b') {
          state[`s${key.substr(1, key.length)}`] = state[key];
        }
      });
    }

    const defaultValidator = (data, component, key) => {
      const { errors } = component.state;
      const isString = typeof data === 'string';
      const isFilled = data && data.length !== 0;
      if (!isString || !isFilled) {
        errors[key] = `${key.substr(1, key.length)} is a required field.`;
        component.setState({ errors });
      } else {
        errors[key] = null;
        component.setState({ errors });
      }

      return isFilled && isString;
    };

    const requiredKeys = {
      sfirstName: defaultValidator,
      slastName: defaultValidator,
      scompany: defaultValidator,
      saddress: defaultValidator,
      scity: defaultValidator,
      sstate: defaultValidator,
      szip: defaultValidator,
      scountry: defaultValidator,
      bfirstName: defaultValidator,
      blastName: defaultValidator,
      bcompany: defaultValidator,
      baddress: defaultValidator,
      bcity: defaultValidator,
      bstate: defaultValidator,
      bzip: defaultValidator,
      bcountry: defaultValidator,
      email: validateEmail,
      cardNumber: validateCreditCardNumber,
      expirationDate: defaultValidator,
      cardCode: defaultValidator,
    };

    const validatedKeys = Object.keys(requiredKeys).filter(key => requiredKeys[key](state[key], this, key));
    console.log(validatedKeys, state);
    return validatedKeys.length === Object.keys(requiredKeys).length;
  }

  authCard() {
    return false;
    this.setState({ processingPayment: true });
    if (!this.validateFields()) {
      console.log('need data');
      this.setState({ processingPayment: false });
      return false;
    }
    const { cart, update } = this.props;
    const { cardNumber, expirationDate, cardCode } = this.state;

    Meteor.call(
      'authCreditCard',
      cart, {
        cardNumber,
        expirationDate,
        cardCode,
      },
      this.state,
      (err, res) => {
        console.log('auth', err, res);
        if (!err) {
          if (typeof res === 'string') {
            this.setState({ auth: true, authId: res, processingPayment: false, paymentErrors: {} });
            this.buyItem();
          } else {
            console.log(res);
            this.setState({ auth: false, processingPayment: false, paymentErrors: res });
          }
        } else {
          console.log(err);
        }
      },
    );
  }

  buyItem() {
    const { cart } = this.props
    const { sfirstName, slastName, email, saddress, scity, sstate, szip, scountry } = this.state;
    const customer = {
      email,
      name: `${sfirstName} ${slastName}`,
      street1: saddress,
      city: scity,
      state: sstate,
      postal_code: szip,
      country: scountry,
    };

    return cart.reduce((acc, next) => {
      return acc.then(() => new Promise((resolve, reject) => {
        Meteor.call('markEforoProductAsSold', next, customer, (err, res) => {
          console.log(err, res);
          resolve({ err, res });
        });
      }),
    )}, Promise.resolve());
  }
}
