import React from 'react';
import FixedHeader from './header';
import { Meteor } from 'meteor/meteor';
import Location from './location';

export default class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      query: '',
      focusProduct: {},
      focusOpen: false,
    };
  }

  componentDidMount() {
    Meteor.call('getEforoProducts', (err, products) => {
      const productsByKat = {};
      products.map(p => {
        const cat = p.description.split(" ")[0];
        const key = productsByKat[cat];
        return key ? key.push(p) : productsByKat[cat] = [p];
      });
      console.log(productsByKat);
      if (!err) {
        this.setState({ products: this.state.products.concat(products) });
      }
    });
  }

  getProductOverlayLayout() {
    const product = this.state.focusProduct;
    return (
      <div className='product-focus-page'>
        <div className='product-focus-overlay' />
        <div className='product-focus-content' onClick={() => { this.setState({ focusOpen: false }) }}>
          <div
            className="a-product focus"
          >
            <h1>{product.characteristics.manufacturer + ': ' + product.characteristics.model}</h1>
            { product.photo_urls.length > 0 ? <img src={product.photo_urls[0]} /> : '' }
            <h2>${parseFloat(product.value).toFixed(2)}</h2>
            <h3>{product.description.replace(/ *\([^)]*\) */g, "").split("WAS")[0]}</h3>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const loading = this.state.products.length === 0;
    const filteredProducts = this.state.products.filter(product => product.title.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1);
    return  (
      <div className="page">
        <div className="background"></div>
        <div className="products">
          <FixedHeader />
          { this.state.focusOpen ? this.getProductOverlayLayout() : <span /> }
          <div className='fixed-search-bar'>
            <div className='products-search'>
              Search <input onChange={e => this.setState({ query: e.target.value })}/>
            </div>
            <div className='search-status'>
              { this.state.query !== '' ? <div>Showing <span className='query-count'>{filteredProducts.length}</span> result(s) for <span className="query">{this.state.query}</span></div> : <div>Showing all <span className='query-count'>{filteredProducts.length}</span> results</div> }
            </div>
          </div>
          { loading ? <div className="loader">Loading...</div> : <div></div>}
          {
            filteredProducts.map((product, i) => (
              <div
                className={`a-product ${i % 2 === 0 ?  'even' : 'odd' }`}
                onClick={() => { window.scroll(0, 0); this.setState({ focusProduct: product, focusOpen: true }); }}
              >
                <h1>{product.characteristics.manufacturer + ': ' + product.characteristics.model}</h1>
                { product.photo_urls.length > 0 ? <img src={product.photo_urls[0]} /> : '' }
                <h2>${parseFloat(product.value).toFixed(2)}</h2>
                <h3>{product.description.replace(/ *\([^)]*\) */g, "").split("WAS")[0].replace("Brand:", '\nBrand:')}</h3>
              </div>
            ))
          }
          <Location />
        </div>
      </div>
    );
  }
};
