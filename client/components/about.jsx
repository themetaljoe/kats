import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <div className="about" id="about">
          <h1>KAT'S GUITARS: INSTRUMENTS, REPAIRS, LESSONS, OH MY!</h1>
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
              <p>As home of some of the best musicians in Houston, Kat's offers
                a wide range of in-house lessons.</p>
            </div>
          </div>
          <div className="column">
            <div className="about-content">
              <img src="screwdriver.png" />
              <p>With long time experienced technicians that have played in the houston scene
                we have years of experience.</p>
            </div>
          </div>
        </div>
        <div className='divider'></div>
      </div>
    );
  }
}

