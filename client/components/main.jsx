import React from 'react';
import FixedHeader from './header';
import MainAboveFold from './main-above-fold';
import About from './about';
export default class Home extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="background"></div>
        <div className="layout">
          <FixedHeader />
          <MainAboveFold />
          <About />
        </div>
      </div>
    );
  }
}
