import React from 'react';
import faq from '../constants/faq';

export default class Faq extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
    };
  }

  contains(sentence, query) {
    return sentence.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  }

  render() {
    const filteredFaq = faq
      .filter(pair => this.contains(pair.question, this.state.query) || this.contains(pair.answer, this.state.query));

    return (
      <div className="faq" id="faq">
        <input className="input-box" onChange={ e => this.setState({query:e.target.value})} />
        <br />
        {
          filteredFaq.map(qaPair => {
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
