import React, { Component } from 'react';
import axios from 'axios';

export default class StranaZaOpravdavanje extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_profesora: this.props.match.params.idprofe,
      godina_kojoj_je_razredni: parseInt(this.props.match.params.god),
      odeljenje_kojem_je_razredni: parseInt(this.props.match.params.ode),
      podaci_profesora: {},
    };
    this.opravdaj = this.opravdaj.bind(this);
    this.neopravdaj = this.neopravdaj.bind(this);
  }
  componentDidMount() {
    axios
      .get(
        'http://localhost:5000/profesori/Profesor/' + this.state.id_profesora
      )
      .then((res) => {
        this.setState({ podaci_profesora: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  opravdaj(id, dat, tip1, idzahteva) {
    let zaSlanje = {
      iducenika: id,
      datum: dat,
      tip: tip1,
    };
    console.log(zaSlanje);
    axios
      .post('http://localhost:5000/profesori/odlukaOpravdanja', zaSlanje)
      .then((res) => {
        console.log('Uspeo sam jupiiiiiii');
      })
      .catch((error) => {
        console.log(error);
      });

    let objekat = {
      idprofesora: this.state.id_profesora,
      idcelogzahteva: idzahteva,
    };
    // console.log(objekat)
    axios
      .post('http://localhost:5000/profesori/brisemIzostanak', objekat)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log('greskaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      });
  }

  neopravdaj(id, dat, tip1, idzahteva) {
    let zaSlanje = {
      iducenika: id,
      datum: dat,
      tip: tip1,
    };
    console.log(zaSlanje);
    axios
      .post('http://localhost:5000/profesori/odlukaOpravdanja', zaSlanje)
      .then((res) => {
        console.log('Uspeo sam jupiiiiiii');
      })
      .catch((error) => {
        console.log(error);
      });

    let objekat = {
      idprofesora: this.state.id_profesora,
      idcelogzahteva: idzahteva,
    };
    // console.log(objekat)
    axios
      .post('http://localhost:5000/profesori/brisemIzostanak', objekat)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log('greskaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      });
  }
  render() {
    if (!this.state.podaci_profesora.zahtevi) {
      return <h3>Loading...</h3>;
    }
    let zahtevi = this.state.podaci_profesora.zahtevi;

    return (
      <div>
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
                <li>
                  <a href='/preview'>
                    Forum <span className='sr-only'>(current)</span>
                  </a>
                </li>
                <li className='dropdown'>
                  {/* <a href="/Profesor" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Izaberi odeljenje <span className="caret"></span></a> */}
                  {/* <ul className="dropdown-menu">
            {props.profesor.odeljenja ? props.profesor.odeljenja.map((value,ind) => {
              return <li key={ind}><a href={'/Odeljenje/'+value.godina+'/'+value.odeljenje+'/'+props.profesor.predmet} >{value.godina}/{value.odeljenje}</a></li>
            }) : null}
          </ul> */}
                </li>
              </ul>
              <ul className='nav navbar-nav navbar-right'>
                <li>
                  <a href='/PromenaLozinke'>
                    <span className='glyphicon glyphicon-cog'></span> Promena
                    lozinke
                  </a>
                </li>
                <li>
                  <a href='http://localhost:5000/logout'>Odjavi se</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className='container'>
          <table class='table table-dark'>
            <thead>
              <tr>
                <th scope='col'>Ime</th>
                <th scope='col'>Prezime</th>
                <th scope='col'>Izostao sa predmeta</th>
                <th>Izostao dana</th>
                <th>Polugodiste</th>
                <th>Da li roditelj zeli da opravda?</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {zahtevi.map((zahtev) => {
                return (
                  <tr>
                    <td>{zahtev.ImeDeteta}</td>
                    <td>{zahtev.PrezimeDeteta}</td>
                    <td>{zahtev.Predmet}</td>
                    <td>{zahtev.Datum}</td>
                    <td>{zahtev.Polugodiste}</td>
                    <td>{zahtev.Prihvata ? 'Da' : 'Ne'}</td>
                    <td>
                      <button
                        className='btn-success'
                        onClick={() =>
                          this.opravdaj(
                            zahtev.DeteId,
                            zahtev.Datum,
                            'Opravdani',
                            zahtev._id
                          )
                        }
                      >
                        Opravdaj
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn-danger'
                        onClick={() =>
                          this.neopravdaj(
                            zahtev.DeteId,
                            zahtev.Datum,
                            'Neopravdani',
                            zahtev._id
                          )
                        }
                      >
                        Neopravdaj
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
