import React from 'react';

export default class MainAboveFold extends React.Component {
  render() {
    return (
      <div>
        <div className="katslogo">
          <img src="./allpawnlogo-optimized.png" />
        </div>
        <div className="slogan">
          <h1>FULL LINE MUSIC STORE – HUGE SELECTION</h1>
        </div>
        <div className="call-to-action">
          <button>BUY</button>
          <button>SELL / LOAN</button>
          <button>QUESTIONS?</button>
        </div>
      </div>
    );
  }
}

