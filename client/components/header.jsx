import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div className="fixed-header">
        <div className="header-title">
        <h3>Kat's Guitars</h3>
        </div>
        <div className="header-links">
          <div>
            <a href="/">Home</a>
          </div>
          <div>
            <a href="#about">About</a>
          </div>
          <div>Brands</div>
          <div>Location</div>
          <div>Reviews</div>
        </div>
      </div>
    );
  }
}
