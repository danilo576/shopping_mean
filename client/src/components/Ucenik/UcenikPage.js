import React, { Component } from 'react';
import Glavna from './Glavna';
import { BrowserRouter } from 'react-router-dom';

class UcenikPage extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Glavna />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default UcenikPage;
