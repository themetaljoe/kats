import React from 'react';
import faq from '../constants/faq';

function contains(sentence, query) {
  return sentence.toLowerCase().indexOf(query.toLowerCase()) !== -1;
}

export default class Faq extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  render() {
    const filteredFaq = faq
      .filter(pair =>
        contains(pair.question, this.state.query) || contains(pair.answer, this.state.query),
      );

    return (
      <div className="faq" id="faq">
        <h1 className="title">General Pawn Q & A</h1>
        <input
          className="input-box"
          onChange={e => this.setState({ query: e.target.value })}
        />
        <br />
        {
          filteredFaq.map(qaPair => (
            <div key={qaPair.question.replace(/ /g, '-')}className="a-qa-pair">
              <div className="questions">
                <h2>{qaPair.question}</h2>
              </div>
              <div className="answers">
                <blockquote>{qaPair.answer}</blockquote>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}
