import React from 'react';

const whitelistedKeys = [
  'photo_urls',
  'description',
  'manufacturer',
  'model',
  'value',
];

const defaultImage = 'https://sample.url.com/pig.png';

class Uploader extends React.Component {
  constructor() {
    super();
    this.state = {
      uploaded: false,
      uploading: false,
      url: '',
      imageData: null,
    };
  }
  componentDidMount() {
    const { eforoProduct, containerElement } = this.props;
    $(containerElement).on('change', `${eforoProduct.characteristics.sku}-file`, (e) => {
    });
  }

  upload() {
    this.setState({ uploading: true });
    const { eforoProduct } = this.props;
    const inputValue = $(`#${eforoProduct.characteristics.sku}.photo_urls`).val();
    const isDefault = inputValue === defaultImage;
    const { imageData } = this.state;
    if (!isDefault || imageData) {
      Meteor.call('uploadImageToEforo', eforoProduct.external_id, inputValue, imageData, (err, res) => {
        if (err) {
          this.setState({ uploading: false });
          console.log(err);
        } else {
          console.log(res);
          this.setState({ uploaded: true, url: res.photo_url, uploading: false });
        }
      });
    } else {
      setState({ Uploading: false });
    }
  }

  render() {
    const { eforoProduct } = this.props;
    return (
      <div className="admin-uploader">
        {
          this.state.uploaded ? (
            <img src={this.state.url} />
          ) : (
            <div>
              <button
                onClick={() => {
                  if (!this.state.uploading) {
                    this.upload();
                  }
                }}
                className="admin-upload"
              >{ this.state.uploading ? 'Uploading...' : 'Upload'}</button>
              <p className="form-errors">Upload is required for https purposes to remain credit card transactions certified on ssl.</p>
              <div className="image-capture">
                Or Take a Picture:
                <input
                  id={`${eforoProduct.characteristics.sku}-file`}
                  type="file"
                  className='image-capture-input'
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        this.setState({ imageData: reader.result });
                        console.log(reader.result, file.type);
                      };
                      reader.onerror = () => {
                        console.log('error reading data');
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              {
                this.state.imageData ?
                  <img src={this.state.imageData} /> :
                  ''
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      hasChanges: false,
    };
    this.changedObject = {};
  }

  componentWillMount() {
    const { product } = this.props;
    this.changedObject = JSON.parse(JSON.stringify(product));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      JSON.stringify(nextProps) === JSON.stringify(this.props)
      && JSON.stringify(nextState) === JSON.stringify(this.state)
    );
  }

  onChangeHandler(e) {
    const $target = e.currentTarget;
    const value = e.target.value;
    const currentKey = $($target).prev().html();
    const parentKey = $($target).parent().attr('class');
    const hasParentKey = parentKey !== 'product';
    const key = hasParentKey ? `product.${parentKey}.${currentKey}` : `product.${currentKey}`;
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

  layoutFromObject(obj, keyname, eforoProduct) {

    return (
      <div key={`${JSON.stringify(obj)}`}>
        {
          Object.keys(obj)
          .map(key => {
            if(key === 'photo_urls' && eforoProduct.photo_urls.length === 0) {
              return (
                <div key={`${this.changedObject.characteristics.sku}-${key}`} className={'photo_urls'}>
                  <div className="product-key">
                    photo_urls
                  </div>
                  <input
                    onChange={this.onChangeHandler.bind(this)}
                    id={`${eforoProduct.characteristics.sku}`}
                    className="product-value photo_urls"
                    defaultValue={ obj[key][0] ? obj[key][0] : defaultImage }
                  />
                  <Uploader eforoProduct={eforoProduct} containerElement={this.el} />
                </div>
              );
            } else if (key === 'photo_urls' && eforoProduct.photo_urls.length > 0) {
              return (
                <div>
                  <img src={eforoProduct.photo_urls[eforoProduct.photo_urls.length - 1]} />
                  <Uploader eforoProduct={eforoProduct} containerElement={this.el} />
                </div>
              )
            } else if (obj[key] && typeof(obj[key]) === 'object') {
              return this.layoutFromObject(obj[key], key, eforoProduct);
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
    const { product, products } = this.props;
    const { hasChanges } = this.state;
    const eforoProduct = products.filter(p =>
      p.characteristics.sku === product.characteristics.sku,
    ).pop();

    if (!eforoProduct) { return <div />; }
    return (
      <div ref={(el) => { this.el = el; }} className="admin-product">
        <div
          className="collapse-product"
          onClick={() => this.setState({ expanded: !this.state.expanded })}
        >
          {this.state.expanded ? '-' : '+'}
        </div>
        {
          hasChanges ?
            (
              <div className="folder-container">
                <div className="folder" onClick={() => this.saveTransform()} />
              </div>
            ) : ''
        }
        {
          eforoProduct.photo_urls.length === 0 ?
            <span className="needs-image">Needs Image Uploaded</span> : ''
        }
        <div className={`admin-product-content ${this.state.expanded ? '' : 'collapsed'}`}>
          {
            this.state.expanded ?
            this.layoutFromObject(product, 'product', eforoProduct) : (
              <div className="admin-product-collapse-content">
                {
                  `${product.characteristics.manufacturer}: ${product.characteristics.model}`
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

