import React, { Component } from 'react';
import 'jquery/src/jquery';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';

class Header extends Component {
  renderContent() {
    console.log('Ucenik:');
    console.log(this.props.ucenik);

    console.log('Response:');
    console.log(this.props.response);

    if (this.props.response === false) {
      return (
        <li>
          <a href='/login'>
            <span className='glyphicon glyphicon-log-in'></span> Login
          </a>
        </li>
      );
    }
    if (this.props.response === null) {
      return <li>Loading...</li>;
    }

    return (
      <li>
        <a href='http://localhost:5000/logout'>
          <span className='glyphicon glyphicon-log-out'></span> Logout
        </a>
      </li>
    );
  }
  render() {
    console.log(window.location.pathname);
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
            <ul className='nav navbar-nav '>
              <li>
                <a href='/Ocene' title='Ocene'>
                  OCENE
                </a>
              </li>
              {this.props.response.type == 'ucenik' ? (
                <li>
                  <a href='/Forum' title='Forum'>
                    FORUM
                  </a>
                </li>
              ) : null}

              <li>
                <a href='/Izostanci' title='Izostanci'>
                  IZOSTANCI
                </a>
              </li>
              {/* <li ><a href="/Vladanje" title="Vladanje">VLADANJE</a></li> */}
              <li>
                <a href='/Raspored' title='Raspored'>
                  RASPORED CASOVA
                </a>
              </li>
              <li>
                <a href='/Dogadjaji' title='Dogadjaji'>
                  RODITELJSKI SASTANCI
                </a>
              </li>
            </ul>

            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a href='/InfoiKontakt'>
                  <span className='glyphicon glyphicon-user'></span>{' '}
                  {this.props.response
                    ? ' ' +
                      this.props.response.username.substring(
                        0,
                        this.props.response.username.indexOf('@')
                      )
                    : ''}
                </a>
              </li>
              {/* <li><a><span className="glyphicon glyphicon-user"></span> {this.props.ucenik ? this.props.response.type : ""}</a></li> */}
              {this.renderContent()}
              <li>
                <a href='/PromenaLozinke'>
                  <span className='glyphicon glyphicon-cog'></span> Promena
                  lozinke
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
