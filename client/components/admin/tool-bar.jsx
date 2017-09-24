import React from 'react';

export default class ToolBar extends React.Component {
  render() {
    const { lookAtTransforms, transforms, setLookAt, products } = this.props
    const notTransformedCount = products
      .filter((prod) =>
        !transforms.some((trans) =>
          trans.characteristics.sku === prod.characteristics.sku
        )
      ).length;

    const transformedCount = products
      .filter((prod) =>
        transforms.some((trans) =>
          trans.characteristics.sku === prod.characteristics.sku
        )
      ).length;

    return (
      <div className='admin-tool-bar'>
        <div className='needs-transform' onClick={(e) => setLookAt(false)}>
          <div className={`count ${lookAtTransforms ? '' : 'active'}`}>
            {notTransformedCount}
          </div>
          <div>NEEDS TRANSFORM</div>
        </div>
        <div className='has-transform' onClick={e => setLookAt(true)}>
          <div className={`count ${lookAtTransforms ? 'active' : ''}`}>
            {transformedCount}
          </div>
          <div>HAS TRANSFORMS</div>
        </div>
      </div>
    );
  }
};
