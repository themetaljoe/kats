import React from 'react';
import faq from '../constants/faq';

export default class Faq extends React.Component {
  render() {
    return (
      <div className="faq" id="faq">
        {
          faq.map(qaPair => {
            return (
              <div className="a-qa-pair">
                <div className="questions">
                  <h2>{qaPair.question}</h2>
                </div>
                <div className="answers">
                  <blockquote>{qaPair.answer}</blockquote>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
