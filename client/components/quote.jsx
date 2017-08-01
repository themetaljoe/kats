import React from 'react';
import FixedHeader from './header';

export default class QuoteForm extends React.Component {
  render() {
    return(
      <div className="page">
        <div className="background"></div>
        <div className="layout quote">
          <FixedHeader />
          <div>
            <h1>Interested getting some cash for your gear?</h1>
          </div>
        </div>
      </div>
    );
  }
};
