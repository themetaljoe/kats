import React from 'react';
/* GearBrandMap is an {Object} with [keys] who are types of gear IE: "Amps,
 * pedals, ect"
 *   each Type is the key and the value is an [Array] of "brandNames" in that
 *   category
 *
 * If you wish to edit the list of categories and brand names do so in the file
 *   '../constants/gear.jsx'
 * * * */
import { GearBrandMap } from '../constants/gear';

/* Another static component for displaying a set of gear "types" with a list of
 * brands.
 *   The type is the "key" IE "AMPLIFIERS".
 *   The value is an [Array] of {Objects} that is as follows
 *   {
 *     name: "The name of the brand",
 *     logoPath: "A href path to the logo asset img",
 *   }
 *   TODO: When we add the store these should have a third [key] which is a
 *   "link" [key] this will allow users to tap/click on the li and go to a
 *   search in that category for that brand.
 * * */
export default class GearList extends React.Component {
  /* getListItem (key)
   *  accepts argument key which is the type IE: "AMPLIFIERS"
   *    then (maps) over all {brandName}s in that type
   *    return [Array] of <JSX-Layouts />
   * * * */
  getListItems(key) {
    return GearBrandMap[key].map(brandName => (
      <li key={`brands-${brandName.name}`}>
        <div><img src={brandName.logoPath} /></div>
        <div>{brandName.name}</div>
        <button>SHOP</button>
        <div className='divider'></div>
      </li>
    ));
  }

  /* getLists
   *  iterate over all types IE: "AMPLIFIERS", "PEDALS & EFFECTS", ect
   *    returns [Array] of <JSX-Layouts />
   * * */
  getLists() {
    return Object.keys(GearBrandMap).map(key => (
      <div key={`gear-category-${key}`} className='a-gear-category'>
        <div className="card">
          <h5>{key}</h5>
          <ul>
            {this.getListItems(key)}
          </ul>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div id="gear" className="gear-list">
        <h1>Top of the line gear!</h1>
        {this.getLists()}
        <div className='divider'></div>
      </div>
    );
  }
};
