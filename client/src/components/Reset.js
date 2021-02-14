import React, { Component } from 'react';

class Reset extends Component {
  render() {
    console.log('string je: ' + this.props.location.search.substr(7));
    return (
      <form
        method='POST'
        action={
          'http://localhost:5000/reset/' + this.props.location.search.substr(7)
        }
      >
        <input
          type='password'
          name='password'
          placeholder='New password'
        ></input>

        <input
          type='password'
          name='confirm'
          placeholder='Confirm password'
        ></input>

        <button type='submit'>Promeni sifru</button>
      </form>
    );
  }
}

export default Reset;
