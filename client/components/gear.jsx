import React from 'react';
import { GearBrandMap } from '../constants/gear';

export default class GearList extends React.Component {
  render() {
    return (
      <div id="gear" className="gear-list">
        {
          Object.keys(GearBrandMap).map(key => {
            return (
              <div key={`gear-category-${key}`} className='a-gear-category'>
                <div className="card">
                  <h5>{key}</h5>
                  <ul>
                    {
                      GearBrandMap[key].map(brandName => {
                        return (
                          <li key={`brands-${brandName.name}`}>
                            <div><img src={brandName.logoPath} /></div>
                            <div>{brandName.name}</div>
                            <button>SHOP</button>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
              </div>
            );
          })
        }
        <div className='divider'></div>
      </div>
    );
  }
};