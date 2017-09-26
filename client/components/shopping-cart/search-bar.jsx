import React from 'react';

export default function CheckoutOverview(props) {
  const {
    query,
    setQuery,
    cart,
    gettingMoreData,
    showCart,
    toggleCart,
    filteredProducts,
  } = props;
  const total = cart.reduce((acc, next) => +acc + +next.value, 0.00).toFixed(2);

  return (
    <div className="fixed-search-bar">
      <div className="products-search">
        <span className="search-icon" />
        <input defaultValue={query} onChange={e => setQuery(e.target.value)} />
        {
          <div className="results">
            <span className="query-count">{filteredProducts.length}</span>
            <span className="results-content">results</span>
            <span className="query">{query}</span>
          </div>
        }
        {
          gettingMoreData ?
            <div className="search-loading">checking for more products ...</div>
            : ''
        }
        {
          !gettingMoreData && filteredProducts.length === 0 ?
            <div className="no-products-found">
              Sorry no products were found. More products are coming soon.
              Try searching for another brand or product.
            </div>
            : ''
        }
        <div
          className={`shopping-cart-container ${showCart ? 'open' : ''}`}
          onClick={() => toggleCart()}
        >
          <div className="cart-count">{cart.length}</div>
          <div className="cart-total">
            {`$${total}`}
          </div>
          <div className="icon-cart">
            <div className="cart-line-1" />
            <div className="cart-line-2" />
            <div className="cart-line-3" />
            <div className="cart-wheel" />
          </div>
        </div>
      </div>
    </div>
  );
}
