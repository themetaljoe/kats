import React from 'react';
import { slide as Menu } from 'react-burger-menu'

export default class Home extends React.Component {
  render() {
    return (
      <div className="fixed-header">
        <div className="header-title">
        <h3>Kat's Guitars</h3>
        </div>
       <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="#about">About</a>
          <a id="contact" className="menu-item" href="#contact">Contact</a>
          <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
        </Menu>
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
