import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Header2 extends Component {
  render() {
    return (
      <nav className='navbar navbar-inverse fixed-top '>
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
            <ul className='nav navbar-nav navbar-right'>
              {/* <li><a><span className="glyphicon glyphicon-user"></span> {this.props.ucenik ? this.props.ucenik[0].Ime : ""}</a></li> */}
              <li>
                <a href='/login'>
                  <span className='glyphicon glyphicon-log-in'></span> Login
                </a>
              </li>
              <li>
                <a href='/Forget'>
                  <span className='glyphicon glyphicon-cog'></span> Zaboravljena
                  lozinka
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header2;
