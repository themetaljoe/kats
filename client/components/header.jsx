import React from 'react';
/* TODO: Move this to a constant file */
const links = [
  { href: '/', content: "Home" },
  { href: '/#about', content: "About" },
  { href: '/#gear', content: "Brands" },
  { href: '/#location', content: "Location" }
];

export default class FixedHeader extends React.Component {
  constructor() {
    super();

    /* menuBreakPoint is the width of the screen when the mobile menu shows up */
    this.menuBreakPoint = 745;

    /* state requires two keys to run this component
     *   Bool: collapsed
     *     true: when the main links should be collapsed to hamburger img
     *       screen width > this.menuBreakPoint
     *     false: when all links should be visible
     *       screen width <= this.menuBreakPoint
     *   Bool: menuHidden
     *     true: when the menu is collapsed and the mobile menu is hidden
     *     false: when the menu is collapsed and the mobile menu is to be shown
     * * */
    this.state = {
      collapsed: false,
      menuHidden: true,
    };
  }

  /* Resize events can be really process intense on a browser so after we mount
   * the component. We utilize a throttle script running from file:
   *   '../scripts.js'
   * this runs our resize function responsibly instead of everytime the browser
   * calls a resize
   * * * */
  componentDidMount() {
    this.handleResize();
    window.addEventListener("optimizedResize", () => this.handleResize());
  }

  /* handleResize()
   *   this function is responsible for showing and collapsing the links in the
   *   main menu based on the width of the device viewing the page
   * * * */
  handleResize() {
    if (innerWidth < this.menuBreakPoint && !this.state.collapsed) {
      this.setState({ collapsed: true })
    } else if (this.state.collapsed && innerWidth >= this.menuBreakPoint){
      this.setState({ collapsed: false, menuHidden: true })
    }
  }

  /* getLinksExpanded()
   *  returns the default link layout for the fixed header
   * * * */
  getLinksExpanded() {
    return (
      <div className="header-links">
        { links.map(link => (<div><a href={link.href}>{link.content}</a></div>)) }
      </div>
    );
  }

  /* Just a handle for closing the menu in a less verbose way */
  closeMenu() {
    this.setState({ menuHidden: true });
  }

  /* getMiniMenuLayout()
   *   returns the layout for how the mobile menu looks when it is not hidden
   * * * */
  getMiniMenuLayout() {
    return (
      <div>
        <img onClick={() => { this.closeMenu() }} id='hamburger' src="hamburger.png" />
        <div className="hidden-menu">
        { links.map(link => (<a key={`link-${link.href}`}href={link.href} onClick={() => { this.closeMenu() }}><div>{link.content}</div></a>)) }
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
