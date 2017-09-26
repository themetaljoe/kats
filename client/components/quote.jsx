import React from 'react';
import FixedHeader from './header';
import Location from './location';

export default class QuoteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {},
      images: [],
    };
  }

  getStateObject(key, val) {
    const stateObj = this.state.form;
    stateObj[key] = val;
    return stateObj;
  }

  getField(name) {
    return (
      <div>
        <span>{name}</span>
        <input onChange={e => this.setState(this.getStateObject(name, e.target.value))} />
      </div>
    );
  }

  handleFile(e) {
    this.setState({ images: this.state.images.concat(e.target.files[0]).filter(file => file) });
  }

  submit() {
    console.log(this.state.form, this.state.images);
  }

  render() {
    return (
      <div className="page">
        <div className="layout quote">
          <FixedHeader />
          <a href="/loans"><h3>Do you have questions concerning what we buy or accept as collatoral for loans? Please click here.</h3></a>
          <div className="quote-form">
            <h1>Interested getting some cash for your gear?</h1>
            <p>Fill out the form below and we will call or email you with a price. Please include pictures of the item so that we can give you a better estimate.</p>
            {this.getField('Name')}
            {this.getField('Phone Number')}
            {this.getField('Email Address')}
            {this.getField('Product Name')}
            {this.getField('Product Seriel Number')}
            {this.getField('Condition of item')}
            {
              this.state.images.map(img => <img className="upload-preview" src={window.URL.createObjectURL(img)} />)
            }
            <button className="upload-button" onClick={() => $('#file-upload').click()}>UPLOAD IMAGE</button>
            <button className="quote-submit" onClick={() => this.submit()}>GET A QUOTE</button>
            <input id="file-upload" onChange={e => this.handleFile(e)} style={{ display: 'none' }} type="file" />
          </div>
          <Location />
        </div>
      </div>
    );
  }
};
