import React, { Component, useState } from 'react';
import Slika from './slika1.png';
import axios from 'axios';
import swal from 'sweetalert';

const Ucenik = (props) => (
  <div className='row'>
    {props.ucenici.map((ucenik, index) => {
      return (
        <div key={ucenik._id} className='col-md-4'>
          <div className='thumbnail' value={index}>
            <img src={Slika} style={{ height: '200px' }} alt='slika' />
            <div className='caption'>
              <h3>
                {ucenik.Ime} {ucenik.Prezime}
              </h3>
              <h5>
                Odeljenje: {ucenik.Razred}/{ucenik.Odeljenje}
              </h5>
              <p>
                {' '}
                <a
                  style={{ width: '96%', backgroundColor: '#cce8d7' }}
                  href={'/Statistika/' + ucenik._id + '/' + props.predmet}
                  className='btn btn-default'
                  role='button'
                >
                  Vidi statistiku
                </a>
              </p>
              <div className='input-group'>
                <input
                  id={index}
                  style={{ width: '110px', height: '25px', marginTop: '4px' }}
                  type='number'
                  min='1'
                  max='5'
                  className='form-control'
                  placeholder='Unesi ocenu'
                />
                <select
                  style={{ marginLeft: '5px', marginTop: '0px' }}
                  className='terza'
                >
                  <option value='prvo'>1.Polugodiste</option>
                  <option value='drugo'>2.Polugodiste</option>
                </select>
                <button
                  className='btn-success'
                  onClick={() => props.myFunction(ucenik._id, index)}
                  style={{
                    marginLeft: '8px',
                    height: '25px',
                    marginTop: '4px',
                    width: '100px',
                  }}
                >
                  Dodaj
                </button>

                {props.godina == props.godinaKojojJeRazredni &&
                props.odeljenje == props.odeljenjeKojemJeRazredni ? (
                  <div>
                    <div
                      style={{ marginBottom: '2px' }}
                      class='form-group mx-sm-3 mb-2 terza1'
                    >
                      <label for='inputPassword2' class='sr-only'>
                        Dodaj ocenu iz vladanja
                      </label>
                      <input
                        style={{ marginTop: '9px', width: '65' }}
                        type='number'
                        class='form-control'
                        id={'t' + index}
                        placeholder='Unesi ocenu iz vladanja'
                      />
                      <h5>Polugodje?</h5>
                      <label style={{ marginLeft: '0px', color: 'purple' }}>
                        1
                      </label>
                      <input
                        value='prvo'
                        style={{ marginLeft: '3px' }}
                        type='radio'
                        name='r'
                      />
                      <label style={{ marginLeft: '5px', color: 'purple' }}>
                        2
                      </label>
                      <input
                        value='drugo'
                        style={{ marginLeft: '3px' }}
                        type='radio'
                        name='r'
                      />
                    </div>
                    <button
                      style={{ width: '40%', marginTop: '0px' }}
                      class='btn btn-primary mb-2'
                      onClick={() => props.funkcijaVladanja(ucenik._id, index)}
                    >
                      Dodaj ocenu
                    </button>
                    <button
                      style={{
                        width: '55%',
                        marginTop: '0px',
                        marginLeft: '13px',
                      }}
                      type='submit'
                      class='btn btn-danger mb-2'
                      onClick={() => props.zakljuciVladanje(ucenik._id, index)}
                    >
                      Zakljuci ocenu vladanja
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default class Odeljenje extends Component {
  constructor(props) {
    super(props);
    this.myFunction = this.myFunction.bind(this);
    this.funkcijaVladanja = this.funkcijaVladanja.bind(this);
    this.zakljuciVladanje = this.zakljuciVladanje.bind(this);

    this.state = {
      ucenici: [],
      unetaOcena: '',
      predmet: this.props.match.params.pred,

      godina: this.props.match.params.god,
      odeljenje: this.props.match.params.ode,
      godinaKojojJeRazredni: this.props.match.params.godR,
      odeljenjeKojemJeRazredni: this.props.match.params.odeR,
    };
  }

  componentDidMount() {
    axios
      .get(
        'http://localhost:5000/ucenici/' +
          this.props.match.params.god +
          '/' +
          this.props.match.params.ode
      )
      .then((res) => {
        this.setState({ ucenici: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  nadjiDetetuRoditelja(idDeteta, ocena) {
    axios
      .get('http://localhost:5000/nadjiPrekoDeteta/' + idDeteta)
      .then((res) => {
        this.posaljiMejlRoditelju(res.data[0].Email, ocena);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  posaljiMejlRoditelju(mejl, ocena) {
    axios
      .post('http://localhost:5000/posaljiMejl', {
        mejlRoditelja: mejl,
        tekstPoruke:
          'Vase dete je dobilo novu ocenu ' +
          ocena +
          ' iz predmeta ' +
          this.state.predmet,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }
  zakljuciVladanje(id, ind) {
    let pom = document.getElementById('t' + ind).value;
    let pom1 = parseInt(pom);
    let id1 = id;
    let evoga = document.getElementsByClassName('terza1')[ind];
    let polugodje = evoga.querySelector('input[type=radio]:checked').value;

    var posalji = {
      id_ucenika: id1,
      imePredmeta: 'Vladanje',
      ocena: {
        Razred: parseInt(this.state.godinaKojojJeRazredni),
        Polugodiste: polugodje,
        Vrednost: pom1,
      },
    };
    console.log(posalji);

    if (!pom1) {
      swal('Paznja!', 'Niste uneli zakljucnu ocenu');
    } else {
      if (pom1 >= 1 && pom1 <= 5) {
        swal({
          title: 'Da li si siguran?',
          text: 'Ocena koju zakljucujete: ' + pom1,
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios
              .post('http://localhost:5000/ucenici/dodajZakljucnu', posalji)
              .then((res) => {
                //res.send('Zakljucio sam!')
                this.nadjiDetetuRoditelja(id1, pom1);
              })
              .catch((error) => {
                console.log(error);
              });

            swal('Ocena je uspesno zakljucena!', {
              icon: 'success',
            });
            // window.location.reload();
            this.props.history.push('/preview');
          } else {
            swal('Uspesno ste odustali od upisa ocene!');
          }
        });
      } else {
        swal('Paznja!', 'Ocena mora biti izmedju 1-5');
      }
    }
  }

  funkcijaVladanja(id, ind) {
    let tmp = document.getElementById('t' + ind).value;
    let evoga = document.getElementsByClassName('terza1')[ind];
    let polugodje = evoga.querySelector('input[type=radio]:checked').value;
    const zaSlanje = {
      id_ucenika: id,
      imePredmeta: 'Vladanje',
      ocena: {
        Razred: this.props.match.params.god,
        Polugodiste: polugodje,
        Vrednost: tmp,
      },
    };
    console.log(zaSlanje);
    if (!tmp) {
      swal('Paznja!', 'Popunite sva polja');
    }
    if (tmp >= 1 && tmp <= 5) {
      swal({
        title: 'Da li si siguran?',
        text: 'Ocena koju unisite: ' + tmp,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('Ocena je uspesno dodata!', {
            icon: 'success',
          });

          axios
            .post('http://localhost:5000/ucenici/test', zaSlanje)
            .then((res) => {
              this.nadjiDetetuRoditelja(id, tmp);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          swal('Uspesno ste odustali od upisa ocene!');
        }
      });
    } else {
      swal('Paznja!', 'Ocena mora biti izmedju 1-5');
    }
  }

  myFunction(id, index) {
    let tmp = document.getElementById(index).value;
    let evoga = document.getElementsByClassName('terza')[index];
    let napokon = evoga.options[evoga.selectedIndex].value;
    const zaSlanje = {
      id_ucenika: id,
      imePredmeta: this.state.predmet,
      ocena: {
        Razred: this.props.match.params.god,
        Polugodiste: napokon,
        Vrednost: tmp,
      },
    };
    console.log(zaSlanje);
    if (tmp >= 1 && tmp <= 5) {
      swal({
        title: 'Da li si siguran?',
        text: 'Ocena koju unisite: ' + tmp,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('Ocena je uspesno dodata!', {
            icon: 'success',
          });

          axios
            .post('http://localhost:5000/ucenici/test', zaSlanje)
            .then((res) => {
              this.nadjiDetetuRoditelja(id, tmp);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          swal('Uspesno ste odustali od upisa ocene!');
        }
      });
    } else {
      swal('Paznja!', 'Ocena mora biti izmedju 1-5');
    }
  }

  render() {
    console.log(
      this.state.jelRazredni,
      this.state.godinaKojojJeRazredni,
      this.state.odeljenjeKojemJeRazredni
    );
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
        <div className='container' style={{ marginTop: '30px' }}>
          <div className='row'>
            <Ucenik
              godina={this.state.godina}
              odeljenje={this.state.odeljenje}
              godinaKojojJeRazredni={this.state.godinaKojojJeRazredni}
              odeljenjeKojemJeRazredni={this.state.odeljenjeKojemJeRazredni}
              predmet={this.state.predmet}
              ucenici={this.state.ucenici}
              myFunction={this.myFunction}
              funkcijaVladanja={this.funkcijaVladanja}
              zakljuciVladanje={this.zakljuciVladanje}
            />
          </div>
        </div>
      </div>
    );
  }
}
