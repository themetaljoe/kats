import React from 'react';
import FixedHeader from './header';
import { Meteor } from 'meteor/meteor';

export default class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      query: '',
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
    const loading = this.state.products.length === 0;
    const filteredProducts = this.state.products.filter(product => product.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1);
    console.log(this.state.query)
    return  (
      <div className="page">
        <div className="background"></div>
        <div className="products">
          <FixedHeader />
          <div className='products-search'>
            Search <input onChange={e => this.setState({ query: e.target.value })}/>
          </div>
          <div className='search-status'>
            { this.state.query !== '' ? <div>Showing <span className='query-count'>{filteredProducts.length}</span> result(s) for <span className="query">{this.state.query}</span></div> : <div>Showing all <span className='query-count'>{filteredProducts.length}</span> results</div> }
          </div>
          { loading ? <div className="loader">Loading...</div> : <div></div>}
          {
            filteredProducts.map(product => (
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
