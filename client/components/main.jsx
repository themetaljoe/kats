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
              <div>Reviews</div>
            </div>
          </div>
          <div className="katslogo">
            <img src="./allpawnlogo-optimized.png" />
          </div>
          <div className="slogan">
            <h1>FULL LINE MUSIC STORE – HUGE SELECTION</h1>
          </div>
          <div className="call-to-action">
            <button>BUY</button>
            <button>SELL</button>
            <button>FAQ</button>
          </div>
          <div className="about" id="about">
            <h1>WELCOME TO KAT'S GUITARS - TONS OF INSTRUMENTS</h1>
            <div className="column">
              <div className="about-content">
                <img src="texasflag.png" />
                <p>We are a Full Line Music Store serving
                  The Woodlands, Spring, Conroe, and Willis, Texas.</p>
              </div>
            </div>
            <div className="column">
              <div className="about-content">
                <img src="guitarelectronics.png" />
                <p>Stocked with hundreds of instrumets, pickups, pedals and parts
                  ready to go.</p>
              </div>
            </div>
            <div className="column">
              <div className="about-content">
                <img src="musicnote.png" />
                <p>A full service repair department and experienced
                  music teachers offering a wide range of in-house lessons.</p>
              </div>
            </div>
            <div className="column">
              <div className="about-content">
                <img src="musicnote.png" />
                <p>We also have a full service repair department and experienced
                  music teachers offering a wide range of in-house lessons.</p>
              </div>
            </div>
          </div>
          <div className='divider'></div>
        </div>
      </div>
    );
  }
}
