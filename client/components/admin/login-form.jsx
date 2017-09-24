import React from 'react';

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      un: '',
      pw: '',
    };
  }

  render() {
    const { login } = this.props;
    return (
      <div>
        UN: <input onChange={e => this.setState({ un: e.target.value })} />
        PW: <input onChange={e => this.setState({ pw: e.target.value })} />
        <button
          onClick={e => {
            Meteor.call('login', this.state.un, this.state.pw, (err, res) => {
              if(res) {
                login()
              }
            })
          }}
        >Sign In</button>
      </div>
    );
  }
}


