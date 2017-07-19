import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="background"></div>
        <div className="layout">
          <div className="fixed-header">
            <div className="header-title">
            <h3>Kat's Guitars</h3>
            </div>
            <div className="header-links">
              <div>Home</div>
              <div>About</div>
              <div>Brands</div>
              <div>Location</div>
            </div>
          </div>
          <div className="katslogo">
            <img src="./katsguitarslogo.png" />
          </div>
          <div className="slogan">
            <h1>"God's gift to pawn shop customers" - Jesus</h1>
          </div>
          <div className="call-to-action">
            <button>BUY</button>
            <button>SELL</button>
            <button>QUESTIONS?</button>
          </div>
        </div>
      </div>
    );
  }
}
