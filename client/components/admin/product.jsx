import React from 'react';
import deepmerge from 'deepmerge';

const whitelistedKeys = [
  'photo_urls',
  'description',
  'manufacturer',
  'model',
];

export default class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      hasChanges: false,
    }
    this.changedObject = {};
  }

  componentWillMount() {
    const { product } = this.props;
    this.changedObject = JSON.parse(JSON.stringify(product));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state))
  }

  onChangeHandler(e) {
    const $target = e.currentTarget
    const value = e.target.value;
    const currentKey = $($target).prev().html();
    const parentKey = $($target).parent().attr('class');
    const hasParentKey = parentKey !== 'product';
    const key = hasParentKey ? `product.${parentKey}.${currentKey}` : `product.${currentKey}`
    const changedObject = JSON.parse(JSON.stringify(this.changedObject));

    if (key.indexOf('photo_urls') > -1) {
      changedObject.photo_urls = [value];
    } else if (hasParentKey) {
      changedObject[parentKey][currentKey] = value;
    } else {
      changedObject[currentKey] = value;
    }

    if (!this.state.hasChanges) {
      this.setState({ hasChanges: true });
    }
    this.changedObject = changedObject;
    e.stopPropagation();
  }

  layoutFromObject(obj, keyname) {
    return (
      <div key={`${JSON.stringify(obj)}`}>
        {
          Object.keys(obj)
          .map(key => {
            if(key === 'photo_urls') {
              return (
                <div key={`${this.changedObject.characteristics.sku}-${key}`} className={'photo_urls'}>
                  <div className="product-key">
                    photo_urls
                  </div>
                  <input
                    onChange={this.onChangeHandler.bind(this)}
                    className="product-value"
                    defaultValue={ obj[key][0] ? obj[key][0] : 'https://sample.url.com/pig.png' }
                  />
                </div>
              );
            } else if (obj[key] && typeof(obj[key]) === 'object') {
              return (this.layoutFromObject(obj[key], key));
            }
            else if(obj[key] && whitelistedKeys.indexOf(key) > -1) {
              return (
                <div key={`${this.changedObject.characteristics.sku}-${key}`} className={keyname}>
                  <div className="product-key">
                    {key}
                  </div>
                  <input
                    className="product-value"
                    defaultValue={obj[key]}
                    onChange={this.onChangeHandler.bind(this)}
                  />
                </div>
              );
            }
          })
        }
      </div>
    )
  }

  saveTransform() {
    const { changedObject } = this;
    Meteor.call('saveTransform', changedObject, (err, res) => {
      if (!err) {
        if (res) {
          changedObject._id = res;
        }
        this.setState({ hasChanges: false })
        this.props.updateTransforms();
      }
    });
  }

  render() {
    const { product } = this.props;
    const { hasChanges } = this.state;
    return (
      <div ref={el => this.el = el} className='admin-product'>
        <div
          className="collapse-product"
          onClick={e => this.setState({ expanded: !this.state.expanded })}
        >
          {this.state.expanded ? '-' : '+'}
        </div>
        {
          hasChanges ?
            (
              <div className="folder-container">
                <div className="folder" onClick={e => this.saveTransform()}>
                </div>
              </div>
            ) : ''
        }
        <div className={`admin-product-content ${this.state.expanded ? '' : 'collapsed'}`}>
          {
            this.state.expanded ?
              this.layoutFromObject(product, 'product') :
              <div className='admin-product-collapse-content'>{product.characteristics.manufacturer + ': ' + product.characteristics.model}</div>
          }
        </div>
      </div>
    )
  }
}
