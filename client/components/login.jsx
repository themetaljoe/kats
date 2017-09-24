import React from 'react';
import ProductAdmin from './product-admin';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      transforms: [],
      un: '',
      pw: '',
      lookAtTransforms: false,
      loggedIn: true,
    };
  }

  getLogin() {
    return (
      <div>
        UN: <input onChange={e => this.setState({ un: e.target.value })} />
        PW: <input onChange={e => this.setState({ pw: e.target.value })} />
        <button
          onClick={e => {
            Meteor.call('login', this.state.un, this.state.pw, (err, res) => {
              if(res) {
                this.setState({ loggedIn: true })
              }
            })
          }}
        >Sign In</button>
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

  getAdmin() {
    if (this.state.products.length === 0 && !this.gettingProducts) {
      this.gettingProducts = true;
      this.getProducts();
      this.getTransforms();
    }
    const { products } = this.state;

    const filtered = this.state.lookAtTransforms ?
      this.state.transforms :
      this.state.products.filter((prod) => !this.state.transforms.some((trans) => trans.characteristics.sku === prod.characteristics.sku));

    console.log(filtered, products, this.state.transforms)
    return (
      <div className='admin'>
        <div className='admin-tool-bar'>
          <div className='needs-transform' onClick={e => this.setState({ lookAtTransforms: false })}>
            <div className={`count ${this.state.lookAtTransforms ? '' : 'active'}`}>
              {this.state.products.filter((prod) => !this.state.transforms.some((trans) => trans.characteristics.sku === prod.characteristics.sku)).length}
            </div>
            <div>NEEDS TRANSFORM</div>
          </div>
          <div className='has-transform' onClick={e => this.setState({ lookAtTransforms: true })}>
            <div className={`count ${this.state.lookAtTransforms ? 'active' : ''}`}>
              {this.state.products.filter((prod) => this.state.transforms.some((trans) => trans.characteristics.sku === prod.characteristics.sku)).length}
            </div>
            <div>HAS TRANSFORMS</div>
          </div>

        </div>
        {
          filtered.map(p => <ProductAdmin updateTransforms={this.getTransforms.bind(this)} product={p} />)
        }
        { products.length === 0 ? 'loading ...' : '' }
      </div>
    )
  }

  render() {
    const login = this.state.loggedIn ? this.getAdmin() : this.getLogin();
    return (
      <div>
        { login }
      </div>
    )
  }
}
