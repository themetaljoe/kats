import React from 'react';
import deepmerge from 'deepmerge';

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
    this.setState({ changedObject: product });
  }

  componentDidMount() {
    $(this.el).on('input', '.product-value', (e) => {
      const $target = e.currentTarget
      const value = e.target.value;
      const currentKey = $($target).prev().html();
      const parentKey = $($target).parent().attr('class');
      const hasParentKey = parentKey !== 'product';
      const key = hasParentKey ? `product.${parentKey}.${currentKey}` : `product.${currentKey}`
      const { changedObject } = this;

      if (key.indexOf('photo_urls') > -1) {
        changedObject.photo_urls = [value];
      } else if (hasParentKey) {
        if(!changedObject[hasParentKey]) {
          changedObject[parentKey] = {};
        }
        changedObject[parentKey][currentKey] = value;
      } else {
        changedObject[currentKey] = value;
      }

      this.changedObject = changedObject;

      if (!this.state.hasChanges) {
        this.setState({ hasChanges: true });
      }
      e.stopPropagation();
    })
  }

  layoutFromObject(obj, keyname) {
    return (
      <div key={Meteor.uuid()}>
        {keyname}
        {
          Object.keys(obj)
          .map(key => {
            if(key === 'photo_urls') {
              return (
                <div key={Meteor.uuid()} className={'photo_urls'}>
                  <div className="product-key">
                    photo_urls
                  </div>
                  <input className="product-value" defaultValue={ obj[key][0] ? obj[key][0] : 'https://sample.url.com/pig.png' } />
                </div>
              );
            } else if (obj[key] && typeof(obj[key]) === 'object') {
              return (this.layoutFromObject(obj[key], key));
            }
            return (
              <div key={Meteor.uuid()} className={keyname}>
                <div className="product-key">
                  {key}
                </div>
                <input className="product-value" defaultValue={obj[key]} />
              </div>
            );
          })
        }
      </div>
    )
  }

  saveTransform() {
    const { product } = this.props;
    const { changedObject } = this;
    Meteor.call('saveTransform', deepmerge(product, changedObject), (err, res) => {
      if (!err) {
        changedObject._id = res;
        this.setState({ hasChanges: false, changedObject })
        this.props.updateTransforms();
      }
    });
  }

  render() {
    const { product } = this.props;
    const { expanded, hasChanges } = this.state;
    return (
      <div ref={el => this.el = el} className='admin-product'>
        <div
          className="collapse-product"
          onClick={e => this.setState({ expanded: !expanded })}
        >
          {expanded ? '-' : '+'}
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
        <div className={`admin-product-content ${expanded ? '' : 'collapsed'}`}>
          {
            expanded ?
              this.layoutFromObject(product, 'product') :
              <div className='admin-product-collapse-content'>{product.title}</div>
          }
        </div>
      </div>
    )
  }
}
