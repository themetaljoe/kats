import React from 'react';

export default class Home extends React.Component {
  constructor() {
    super();
    this.menuBreakPoint = 725; this.state = {
      collapsed: false,
      menuHidden: true,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("optimizedResize", () => this.handleResize());
  }

  handleResize() {
    if (innerWidth < this.menuBreakPoint && !this.state.collapsed) {
      this.setState({ collapsed: true })
    } else if (this.state.collapsed && innerWidth >= this.menuBreakPoint){
      this.setState({ collapsed: false, menuHidden: true })
    }
  }

  getLinksExpanded() {
    return (
      <div className="header-links">
        <div>
          <a href="/">Home</a>
        </div>
        <div>
          <a href="#about">About</a>
        </div>
        <div>
          <a href="#gear">Brands</a>
        </div>
        <div>
          <a href="#location">Location</a>
        </div>
      </div>
    );
  }

  getMiniMenuLayout() {
    return (
      <div>
        <img onClick={() => { this.setState({ menuHidden: true }) }} id='hamburger' src="hamburger.png" />
        <div className="hidden-menu">
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

  getHamburger() {
    return (
      <div>
        <img onClick={() => { this.setState({ menuHidden: false }) }} id='hamburger' src="hamburger.png" />
      </div>
    );
  }

  getLinksCollapsed() {
    return (
      <div>
        { this.state.menuHidden ? this.getHamburger() : this.getMiniMenuLayout() }
      </div>
    );
  }

  render() {
    return (
      <div className="fixed-header">
        <div className="header-title">
        <h3>Allpawn - Kat's Guitars</h3>
        </div>
        { this.state.collapsed ? this.getLinksCollapsed() : this.getLinksExpanded() }
      </div>
    );
  }
}

(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();


