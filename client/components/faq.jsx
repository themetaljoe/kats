import React from 'react';
import faq from '../constants/faq';

export default class Faq extends React.Component {
  render() {
    return (
      <div className="faq">
        {
          faq.map(qaPair => {
            return (
              <div>
                <div className="questions">{ qaPair.question }</div>
                <div className="answers">{ qaPair.answer }</div>
              </div>
            );
          })
        }
        
      </div>
    );
  }
}