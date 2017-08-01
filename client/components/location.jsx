import React from 'react';

export default class Location extends React.Component {
  render() {
    return (
      <div className='location' id='location'>
        <div className="address">
          <div className='address-content'>
            <div className='pin-container'>
              <img src="pinicon.png" />
            </div>
            <h3>All Pawn & Kat's Guitars</h3>
            <p>25907 Interstate 45 N,</p>
            <p>Spring, TX 77380</p>
            <p>(281) 363-2103</p>
            <p>Monday - Friday: 9AM - 6:30PM</p>
            <p>Saturday: 9AM - 5:30PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div className='map'></div>
      </div>
    );
  }
}
