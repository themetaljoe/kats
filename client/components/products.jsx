import React from 'react';
import FixedHeader from './header';
import { Meteor } from 'meteor/meteor';

export default class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    Meteor.call('getEbayProducts', (err, products) => {
      if (!err) {
        this.setState({ products });
      }
    });
  }

  render() {
    return  (
      <div className="page">
        <div className="background"></div>
        <div className="products">
          <FixedHeader />
          {
            this.state.products.map(product => (
              <a href={product.link}>
                <div className='a-product'>
                  <h1>{product.name}</h1>
                  <img src={product.path} />
                  <h2>{product.price}</h2>
                  <h3>{product.info}</h3>
                </div>
              </a>
            ))
          }
        </div>
      </div>
    );
  }
};
