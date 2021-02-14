import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { response: '' };
  }

  render() {
    return (
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button
              type='button'
              className='navbar-toggle'
              data-toggle='collapse'
              data-target='#myNavbar'
            >
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <a className='navbar-brand' href='/'>
              iDnevnik
            </a>
          </div>
          <div className='collapse navbar-collapse' id='myNavbar'>
            <ul className='nav navbar-nav '>
              {/* <li><a href="/Zahtevi" title="Zahtevi">ZAHTEVI</a></li> */}
            </ul>

            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a href='/PromenaLozinke'>
                  <span className='glyphicon glyphicon-cog'></span> Promena
                  lozinke
                </a>
              </li>
              <li>
                <a href=''>
                  <span className='glyphicon glyphicon-log-out'></span> Izlaz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
