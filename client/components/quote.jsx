import React from 'react';
import FixedHeader from './header';
import Location from './location';

export default class QuoteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {},
    }
  }

  getStateObject(key, val) {
    const stateObj = this.state.form;
    stateObj[key] = val;
    return stateObj;
  }

  getField(name) {
    return <div><span>{name}</span> <input onChange={e => this.setState(this.getStateObject(name, e.target.value))} /></div>;
  }

  submit() {
    console.log(this.state.form)
  }

  render() {
    return(
      <div className="page">
        <div className="layout quote">
          <FixedHeader />
          <div className="quote-form">
            <h1>Interested getting some cash for your gear?</h1>
            <p>Fill out the form below and we will call or email you with a price. Please include pictures of the item so that we can give you a better estimate.</p>
            {this.getField('Name')}
            {this.getField('Phone Number')}
            {this.getField('Email Address')}
            {this.getField('Product Name')}
            {this.getField('Product Seriel Number')}
            {this.getField('Condition of item')}
            <button onClick={() => this.submit()}>GET A QUOTE</button>
          </div>
          <Location />
        </div>
      </div>
    );
  }
};
