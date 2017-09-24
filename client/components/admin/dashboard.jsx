import React from 'react';
import Product from './product';
import ToolBar from './tool-bar';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      transforms: [],
      lookAtTransforms: false,
    }
  }

  checkData() {
    const { products } = this.state;

    if (products.length === 0 && !this.gettingProducts) {
      this.gettingProducts = true;
      this.getProducts();
      this.getTransforms();
    }
  }

  getProductsNotTransformedYet() {
    const { products, transforms } = this.state;

    return products.filter((prod) =>
      !transforms.some((trans) =>
        trans.characteristics.sku === prod.characteristics.sku
      )
    );
  }

  render() {
    const { products, transforms, lookAtTransforms } = this.state;
    const notTransformed = this.getProductsNotTransformedYet();
    const filtered = lookAtTransforms ? transforms : notTransformed;
    this.checkData();

    return (
      <div className='admin'>
        <ToolBar
          lookAtTransforms={lookAtTransforms}
          transforms={transforms}
          setLookAt={lookAtTransforms => this.setState({ lookAtTransforms })}
          products={products}
        />
        {
          filtered.map(p => <Product updateTransforms={this.getTransforms.bind(this)} product={p} />)
        }
        { products.length === 0 ? 'loading ...' : '' }
      </div>
    )
  }

  getProducts() {
    Meteor.call('getEforoProducts', (err, products) => {
      if (!err) {
        this.setState({ products: this.state.products.concat(products) });
      }
    });
  }

  getTransforms() {
    Meteor.call('getTransforms', (err, transforms) => {
      if (!err) {
        this.setState({ transforms })
      }
    })
  }
}
