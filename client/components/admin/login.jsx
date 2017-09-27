import React from 'react';
import LoginForm from './login-form';
import Dashboard from './dashboard';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
    };
  }

  render() {
    const login = this.state.loggedIn ?
      <Dashboard /> :
      <LoginForm login={() => this.setState({ loggedIn: true })} />;

    return (
      <div>{login}</div>
    );
  }
}
