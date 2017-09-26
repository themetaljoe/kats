import React from 'react';
import FixedHeader from './header';
import Location from './location';

const CollatoralMap = {
  ELECTRONICS: [
    'CD Players/CDs',
    'Computers/Laptops',
    'DVD Players/Movies',
    'Console Games/Systems',
    'Handheld Games/Systems',
    'Televisions (HD)',
    'iPods/MP3 Players',
    'iPads/Tablets',
    'Video/Digital Cameras',
  ],
  VEHICLES: [
    'Trailers',
    'Automobiles',
    'Motorcycles',
    'Go Carts',
    'Golf Carts',
    'Four Wheelers',
    'Dirt Bikes',
    'Bicycles',
    'Kayaks',
  ],
  INSTRUMENTS: [
    'Acoustic Guitars',
    'Electric Guitars',
    'Bass Guitars',
    'Brass Instruments',
    'Woodwind Instruments',
    'String Instruments',
    'Percussion Instruments',
    'Electronic Keyboards',
    'Microphones/Speakers',
    'Effect Pedals',
  ],
  JEWELRY: [
    'Antiques',
    'Pocket Watches',
    'Rolex Watches',
    'Gold (in any form)',
    'Silver (in any form)',
    'Platinum (in any form)',
    'Crystal/Sterling Service',
    'Large Diamonds',
  ],
  TOOLS: [
    'Hand Tools',
    'Power Tools',
    'Air Tools',
    'Industrial Tools',
    'Ladders',
  ],
  OTHER: [
    'Authenticated Art',
    'Military Memorabilia',
    'Antiques',
    'Historical Items',
    'Guns',
    'Rods and Reels',
    'Knives/Swords 1',
  ],
};

export default function Loans() {
  return (
    <div className="loans">
      <FixedHeader />
      <h1>Get a cash loan for your gear.</h1>
      <p>We accept all of the following as a form of collatoral on your loan</p>
      {
        Object.keys(CollatoralMap).map(key => (
          <div className="collatoral-list">
            <h3>{key}</h3>
            <span className="sexy_line title" />
            <ul>
              {
                CollatoralMap[key].map(category => (
                  <li>
                    <p>{category}</p>
                    <span className="sexy_line" />
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
      <div className="divider" />
      <h3>MORE INFORMATION</h3>
      <p>German, Japanese and American made Knives/Swords are preferred.</p>
      <p>If the item to be pawned or sold is in the electronics category or has moving parts, be prepared to demonstrate that it works.</p>
      <p>If it does not work or is in need of repair, we will in most cases exercise our option not make an offer.</p>
      <p>If you do not personally own the item you are pawning or selling we don't want it under any circumstances. No exceptions.</p>
      <p>If it's dented, scratched, wrecked or otherwise unusable or cosmetically undesirable we will in most cases exercise our option not make an offer. Extremely dirty or grease laden items are generally undesirable.</p>
      <p>Note: This subsection may not apply to jewelry and precious metals articles in need of repair.</p>
      <p>Loans on cars, trucks, motorcycles and motorized vehicles: All Pawn, Inc. does make pawn loans on cars, boats, motorcycles and other motorized vehicles. If you want to sell or pawn an automobile, motorcycle, or other motorized vehicle, you must present a clear title, with the same name imprinted on your legal photo identification. When lending on vehicles, we are required by law to hold the title and store the vehicle on our property until you redeem. Absolutely no exceptions. Vehicle loans are available only at the Spring / Woodlands location.</p>
      <p>Electronics such as televisions, stereos, computers, etc. must be less than three years old and have all necessary cords.</p>
      <p>Cameras must be at least 18 megapixels and power tools must be at least 18 volt.</p>
      <p>If the item is new, in the original carton, bring the purchase receipt.</p>
      <p>All Pawn, Inc. reserves the right to decline to make an offer on any item.</p>
      <p>We may have interest in items not listed as desirable.</p>
      <p>If you do not see your item in the lists or have questions, please call us at (281) 363-2110 or (936) 890-7296.</p>
      <Location />
    </div>
  );
}
