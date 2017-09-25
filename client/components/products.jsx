import React from 'react';
import FixedHeader from './header';
import { Meteor } from 'meteor/meteor';
import Location from './location';
import { List } from 'react-virtualized'
import Checkout from './checkout/checkout';

const convert = (str) => {
  return str.split("WAS")[0].replace(/\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .replace(/Brand: /g, "").replace(/A&l/g, "Art and Lutherie").replace(/B&s/g, 'Back And Sides')
    .replace(/Color: /g, "").replace(/Model: /g, "")
    .replace(/Musical Instrument/g, "").replace(/ *\([^)]*\) */g, "")
    .replace(/&/g, " and ").replace(/ \//g,', ').replace('/\-/', ', ')
    .replace(/c\/e/g, "c / E").replace(/  /g, " ")
}

export default class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      showCart: false,
      products: [],
      transforms: [],
      query: '',
      gettingMoreData: true,
    };
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  getEforoProducts(page) {
    Meteor.call('getEforoProducts', page, (err, products) => {
      const { items, pageCount } = products;

      if (!err) {
        if (page < pageCount) {
          this.getEforoProducts(page + 1);
          this.setState({ gettingMoreData: true });
        } else {
          this.setState({ gettingMoreData: false });
        }
        this.setState({ products: this.state.products.concat(items) });
      }
    });
  }

  componentWillMount() {
    if(unescape(window.location.search).replace(/\?/g, '').split("=")[1]) {
      this.setState({ query: unescape(window.location.search).replace(/\?/g, '').split("=")[1] });
    }
  }

  componentDidMount() {
    this.getEforoProducts(1)
    Meteor.call('getTransforms', (err, transforms) => {
      if (!err) { this.setState({ transforms }) }
    });
  }

  render() {
    const loading = this.state.products.length === 0;
    const filteredProducts = this.state.products.filter(product =>
      new RegExp(this.state.query.toLowerCase(), "i").test(convert(product.description).toLowerCase())
    );

    const shoppingCartOverview = !this.state.showCart ? '' : (
      <div className="shopping-cart-overview">
        {
          this.state.cart.map(p => (
            <div className='cart-item'>
              { p.photo_urls.length > 0 ? <img src={p.photo_urls[0]} /> : <img src="https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg" /> }
              <span className='title'>{p.characteristics.manufacturer + ': ' + p.characteristics.model}</span>
              <span className='value'>${(+p.value).toFixed(2)}</span>
              <span className='description'>{convert(p.description)}</span>
              <button
                className="remove-item"
                onClick={e =>
                    this.setState({
                      cart: this.state.cart.filter(prod => prod.characteristics.sku !== p.characteristics.sku)
                    })
                }
              >REMOVE</button>
            </div>
          ))
        }
        <button className='overview-checkout' onClick={e => this.setState({ showCheckout: true, showCart: false })}>Checkout</button>
      </div>
    )
    return  (
      <div className="page">
        { shoppingCartOverview }
        <div className="background"></div>

        <div className="products">
          <FixedHeader />
          <div className='fixed-search-bar'>
            <div className='products-search'>
              <span className='search-icon' />
              <input defaultValue={this.state.query} onChange={e => this.setState({ query: e.target.value })}/>
              { <div className="results"><span className='query-count'>{filteredProducts.length}</span> results <span className="query">{this.state.query}</span></div> }
              { this.state.gettingMoreData ? <div className="search-loading">checking for more products ...</div> : '' }
              {
                !this.state.gettingMoreData && filteredProducts.length === 0 ?
                  <div className="no-products-found">Sorry no products were found. More products are coming soon. Try searching for another brand or product.</div>
                  : ''
              }
              <div
                className={`shopping-cart-container ${this.state.showCart ? 'open' : ''}`}
                onClick={e => this.setState({showCart: !this.state.showCart})}
              >
                <div className="cart-count">{this.state.cart.length}</div>
                <div className="cart-total">{'$' + this.state.cart.reduce((acc, next) => +acc + +next.value, 0.00).toFixed(2)}</div>
                <div className="icon-cart">
                  <div className="cart-line-1"></div>
                  <div className="cart-line-2"></div>
                  <div className="cart-line-3"></div>
                  <div className="cart-wheel"></div>
                </div>
              </div>
            </div>
          </div>
          { loading || this.state.gettingMoreData && filteredProducts.length === 0 ? <div className="loader">Loading...</div> : <div></div>}
          <List
            width={window.innerWidth}
            height={window.innerHeight}
            type={this.state.type}
            rowCount={filteredProducts.length}
            rowHeight={300}
            rowRenderer={this.rowRenderer}
          />
        </div>
        { this.state.showCheckout ? <Checkout update={this.updateCart.bind(this)} close={this.closeCart.bind(this)} cart={this.state.cart} /> : '' }
      </div>
    );
  }

  closeCart() {
    this.setState({ showCheckout: false });
  }

  updateCart(cart) {
    this.setState({ cart });
  }

  rowRenderer ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) {
    let { products } = this.state;
    const { query } = this.state;
    const filteredProducts = this.state.products.filter(product =>
      new RegExp(this.state.query.toLowerCase(), "i").test(convert(product.description).toLowerCase())
    );
    const asProduct = filteredProducts[index];
    const isTransform = this.state.transforms.filter(prod => prod.characteristics.sku === asProduct.characteristics.sku);
    const product = isTransform.length > 0 ? isTransform[0] : asProduct;

    return (
      <div
        className={`a-product ${index % 2 === 0 ?  'even' : 'odd' }`}
        key={key}
        style={style}
      >
        <div
        >
          <div className='image-price'>
            {product.photo_urls.length > 0 ? <img src={product.photo_urls[0]} /> : <img src='https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg' /> }
            <h2>${parseFloat(product.value).toFixed(2)}</h2>
          </div>
          <div className='product-content'>
            <h1>{convert(product.characteristics.manufacturer) + " " + product.characteristics.model}</h1>
            <h3>{convert(product.description)}</h3>
          </div>
          <div className='shopping-cart-buttons'>
            <button
              className="add-to-cart"
              onClick={e => this.state.cart.filter(p => p.characteristics.sku === product.characteristics.sku && product.quantity === '1').length === 0 ? this.setState({cart: this.state.cart.concat([product])}) : '' }
            >ADD TO CART</button>
            <button className="add-to-cart checkout" onClick={e => this.setState({showCheckout: true, showCart: false, cart: this.state.cart.concat([product])})}>ADD AND CHECKOUT</button>
          </div>
        </div>
      </div>
    )
  }
};
