import React, { Component } from 'react';

class Forget extends Component {
  render() {
    return (
      <form method='POST' action='http://localhost:5000/forgot'>
        <input placeholder='Email' type='email' name='username'></input>

        <button type='submit'>Uloguj se</button>
      </form>
    );
  }
}

export default Forget;
