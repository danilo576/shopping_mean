import React from 'react';

export const ProfesorHeader = (props) => (
  <nav className='navbar navbar-inverse'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <button
          type='button'
          className='navbar-toggle collapsed'
          data-toggle='collapse'
          data-target='#bs-example-navbar-collapse-1'
          aria-expanded='false'
        >
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
        </button>
        <a className='navbar-brand' href='/preview'>
          iDnevnik
        </a>
      </div>

      <div
        className='collapse navbar-collapse'
        id='bs-example-navbar-collapse-1'
      >
        <ul className='nav navbar-nav'>
          <li className='active'>
            <a href='/preview'>
              Forum <span className='sr-only'>(current)</span>
            </a>
          </li>
          <li className='dropdown'>
            <a
              href='/Profesor'
              className='dropdown-toggle'
              data-toggle='dropdown'
              role='button'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Izaberi odeljenje <span className='caret'></span>
            </a>
            <ul className='dropdown-menu'>
              {props.profesor.odeljenja
                ? props.profesor.odeljenja.map((value, ind) => {
                    return (
                      <li key={ind}>
                        <a
                          href={
                            '/Odeljenje/' +
                            value.godina +
                            '/' +
                            value.odeljenje +
                            '/' +
                            props.profesor.predmet +
                            '/' +
                            props.profesor.razredni +
                            '/' +
                            props.profesor.odeljenjaRazredni[0].godina +
                            '/' +
                            props.profesor.odeljenjaRazredni[0].odeljenje
                          }
                        >
                          {value.godina}/{value.odeljenje}
                        </a>
                      </li>
                    );
                  })
                : null}
            </ul>
          </li>
          <li className='dropdown'>
            <a
              href='/Prisutni'
              className='dropdown-toggle'
              data-toggle='dropdown'
              role='button'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Prisutni<span className='caret'></span>
            </a>
            <ul className='dropdown-menu'>
              {props.profesor.odeljenja
                ? props.profesor.odeljenja.map((value, ind) => {
                    return (
                      <li key={ind}>
                        <a
                          href={
                            '/Prisutni/' +
                            value.godina +
                            '/' +
                            value.odeljenje +
                            '/' +
                            props.profesor.predmet
                          }
                        >
                          {value.godina}/{value.odeljenje}
                        </a>
                      </li>
                    );
                  })
                : null}
            </ul>
          </li>

          <li className='dropdown'>
            <a
              href='/StranaZaOpravdavanje'
              className='dropdown-toggle'
              data-toggle='dropdown'
              role='button'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Opravdaj izostanke<span className='caret'></span>
            </a>
            <ul className='dropdown-menu'>
              {props.profesor.odeljenjaRazredni
                ? props.profesor.odeljenjaRazredni.map((value, ind) => {
                    return (
                      <li key={ind}>
                        <a
                          href={
                            '/StranaZaOpravdavanje/' +
                            value.godina +
                            '/' +
                            value.odeljenje +
                            '/' +
                            props.profesor._id
                          }
                        >
                          {value.godina}/{value.odeljenje}
                        </a>
                      </li>
                    );
                  })
                : null}
            </ul>
          </li>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          {/* <li><a href="/StranaZaOpravdavanje"><span className="glyphicon glyphicon-wrench"></span>Opravdaj izostanke</a></li> */}
          <li>
            <a href='/InfoiKontakt'>
              <span className='glyphicon glyphicon-user'></span>{' '}
              {props.profesor.email
                ? ' ' +
                  props.profesor.email.substring(
                    0,
                    props.profesor.email.indexOf('@')
                  )
                : ''}
            </a>
          </li>
          <li>
            <a href='/PromenaLozinke'>
              <span className='glyphicon glyphicon-cog'></span> Promena lozinke
            </a>
          </li>
          <li>
            <a href='http://localhost:5000/logout'>Odjavi se</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
