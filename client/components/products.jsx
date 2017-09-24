import React from 'react';
import FixedHeader from './header';
import { Meteor } from 'meteor/meteor';
import Location from './location';
import { List } from 'react-virtualized'
import Checkout from './checkout/checkout';

export default class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      showCart: false,
      products: [],
      transforms: [],
      query: '',
      focusProduct: {},
      focusOpen: false,
    };
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  getEforoProducts(page) {
    Meteor.call('getEforoProducts', page, (err, products) => {
      const { items, pageCount } = products;

      if (!err) {
        this.setState({ products: this.state.products.concat(items) });
        if (page < pageCount) {
          this.getEforoProducts(page + 1);
        }
      }
    });
  }

  componentDidMount() {
    this.getEforoProducts(1)
    Meteor.call('getTransforms', (err, transforms) => {
      if (!err) { this.setState({ transforms }) }
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
    const shoppingCartOverview = !this.state.showCart ? '' : (
      <div className="shopping-cart-overview">
        {
          this.state.cart.map(p => (
            <div className='cart-item'>
              { p.photo_urls.length > 0 ? <img src={p.photo_urls[0]} /> : '' }
              <span className='title'>{p.characteristics.manufacturer + ': ' + p.characteristics.model}</span>
              <span className='value'>${(+p.value).toFixed(2)}</span>
              <span className='description'>{p.description.replace(/ *\([^)]*\) */g, "").split("WAS")[0]}</span>
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
          { this.state.focusOpen ? this.getProductOverlayLayout() : <span /> }
          <div className='fixed-search-bar'>
            <div className='products-search'>
              Search <input onChange={e => this.setState({ query: e.target.value })}/>
            </div>
            <div className='search-status'>
              { this.state.query !== '' ? <div>Showing <span className='query-count'>{filteredProducts.length}</span> result(s) for <span className="query">{this.state.query}</span></div> : <div>Showing all <span className='query-count'>{filteredProducts.length}</span> results</div> }
              <div className="cart-count">{this.state.cart.length}</div>
              <div className="cart-total">{'$' + this.state.cart.reduce((acc, next) => +acc + +next.value, 0.00).toFixed(2)}</div>
              <div className="icon-cart" onClick={e => this.setState({showCart: !this.state.showCart})}>
                <div className="cart-line-1"></div>
                <div className="cart-line-2"></div>
                <div className="cart-line-3"></div>
                <div className="cart-wheel"></div>
              </div>
            </div>
          </div>
          { loading ? <div className="loader">Loading...</div> : <div></div>}
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
    const filteredProducts = this.state.products.filter(product => product.title.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1);
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
            {product.photo_urls.length > 0 ? <img src={product.photo_urls[0]} /> : '' }
            <h2>${parseFloat(product.value).toFixed(2)}</h2>
          </div>
          <div className='product-content'>
            <h1>{product.characteristics.manufacturer + ': ' + product.characteristics.model}</h1>
            <h3>{product.description.replace(/ *\([^)]*\) */g, "").split("WAS")[0].replace("Brand:", '\nBrand:')}</h3>
          </div>
          <div className='shopping-cart-buttons'>
            <button
              className="add-to-cart"
              onClick={e => this.state.cart.filter(p => p.characteristics.sku === product.characteristics.sku && product.quantity === '1').length === 0 ? this.setState({cart: this.state.cart.concat([product])}) : '' }
            >Add to cart</button>
            <button className="add-to-cart checkout" onClick={e => this.setState({showCheckout: true, showCart: false, cart: this.state.cart.concat([product])})}>Add to cart and checkout</button>
          </div>
        </div>
      </div>
    )
  }
};
