import React from 'react';
import FixedHeader from './header';
import MainAboveFold from './main-above-fold';
import About from './about';
import GearList from './gear';
import Location from './location';
import Faq from './faq';

export default class Home extends React.Component {
  componentDidMount() {
    if(window.location.hash !== '') {
      window.scrollTo(0, $(window.location.hash).offset().top - 70)
    }
  }
  render() {
    return (
      <div className="page">
        <div className="background"></div>
        <div className="layout">
          <FixedHeader />
          <MainAboveFold />
          <About />
          <GearList />
          <Location />
          <Faq />
        </div>
      </div>
    );
  }
}
