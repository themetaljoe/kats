import React from 'react';
import FixedHeader from './header';
import MainAboveFold from './main-above-fold';
import About from './about';
import { slide as Menu } from 'react-burger-menu';
import Faq from './faq';

export default class Home extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="background"></div>
        <div className="layout">
          <FixedHeader />
          <MainAboveFold />
          <About />
          <Faq />
        </div>
      </div>
    );
  }
}
