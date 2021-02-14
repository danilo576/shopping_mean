import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const Ocene1 = (props) => (
  <tr style={{ color: '#000000' }} key={props._id}>
    {props.predmeti.map((predmet, index) => {
      return (
        <td id={predmet.Naziv} style={{ height: 40 }} key={index}>
          {predmet.Ocene.map((value) => {
            if (value.Polugodiste === 'prvo') return value.Vrednost + ' ';
          })}
        </td>
      );
    })}
  </tr>
);

const Ocene2 = (props) => (
  <tr key={props._id}>
    {props.predmeti.map((predmet, index) => {
      return (
        <td id={predmet.Naziv + 'r'} style={{ height: 40 }} key={index}>
          {predmet.Ocene.map((value) => {
            if (value.Polugodiste === 'drugo') return value.Vrednost + ' ';
          })}
        </td>
      );
    })}
  </tr>
);

export default class Statistika extends Component {
  constructor(props) {
    super(props);

    this.state = {
      predmeti: [],
      ucenik: '',
      predmetZakljuci: this.props.match.params.predmet,
    };
    this.zakljuci1 = this.zakljuci1.bind(this);
    this.zakljuci2 = this.zakljuci2.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/ucenici/ucenik/' + this.props.match.params.id)
      .then((res) => {
        this.setState({ predmeti: res.data.Predmeti, ucenik: res.data });
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
          'Vase dete je dobilo zakljucnu ocenu ' +
          ocena +
          ' iz predmeta ' +
          this.state.predmetZakljuci,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }
  zakljuci1() {
    let pom = document.getElementById('prvopolugodje').value;
    let pom1 = parseInt(pom);
    let id1 = this.props.match.params.id;
    var posalji = {
      id_ucenika: id1,
      imePredmeta: this.state.predmetZakljuci,
      ocena: {
        Razred: this.state.ucenik.Razred,
        Polugodiste: 'prvo',
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

  zakljuci2() {
    let pom = document.getElementById('drugopolugodje').value;
    let pom1 = parseInt(pom);
    let id1 = this.props.match.params.id;
    var posalji = {
      id_ucenika: id1,
      imePredmeta: this.state.predmetZakljuci,
      ocena: {
        Razred: this.state.ucenik.Razred,
        Polugodiste: 'drugo',
        Vrednost: pom1,
      },
    };
    // console.log(posalji)

    let niz = this.state.ucenik.Predmeti;
    let nizOcena;
    niz.forEach((el) => {
      if (el.Naziv == this.state.predmetZakljuci) {
        nizOcena = el;
      }
    });

    if (!nizOcena.ZakljucnaOcena[0]) {
      swal('Paznja!', 'Morate prvo zakljuciti ocenu iz prvog polugodista!');
      return;
    }

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
                // res.send('Zakljucio sam!')
                this.nadjiDetetuRoditelja(id1, pom1);
              })
              .catch((error) => {
                console.log(error);
              });

            swal('Posao izvrsen', 'Uspesno ste zakljucili ocenu', 'success');
            window.location.reload(false);
          } else {
            swal('Uspesno ste odustali od upisa ocene!');
          }
        });
      } else {
        swal('Paznja!', 'Ocena mora biti izmedju 1-5');
      }
    }
  }

  render() {
    if (!this.state.ucenik) {
      return <h3>Loading...</h3>;
    }

    let str = 'Zakljuci ocenu iz predmeta ' + this.state.predmetZakljuci;
    let niz = this.state.ucenik.Predmeti;
    let nizOcena;
    niz.forEach((el) => {
      if (el.Naziv == this.state.predmetZakljuci) {
        nizOcena = el;
      }
    });

    let str1 = this.state.predmetZakljuci;
    let heh = document.getElementById(str1);
    if (heh) {
      if (nizOcena.ZakljucnaOcena[0]) {
        heh.style.backgroundColor = '#eb5455';
        heh.style.color = '#000000';
      }
    }
    let str2 = this.state.predmetZakljuci + 'r';
    let heh2 = document.getElementById(str2);
    if (heh2) {
      if (nizOcena.ZakljucnaOcena[1]) {
        heh2.style.backgroundColor = '#eb5455';
        heh2.style.color = '#000000';
      }
    }

    // console.log(nizOcena)
    let saberi = 0;
    let broj = 0;
    nizOcena.Ocene.forEach((ocena) => {
      if (ocena.Polugodiste == 'prvo') {
        saberi += ocena.Vrednost;
        broj++;
      }
    });
    let prosecna = saberi / broj;
    let stampaj1 = parseFloat(prosecna).toFixed(2);
    console.log(stampaj1);

    let saberi2 = 0;
    let broj2 = 0;
    nizOcena.Ocene.forEach((ocena) => {
      if (ocena.Polugodiste == 'drugo') {
        saberi2 += ocena.Vrednost;
        broj2++;
      }
    });
    let prosecna2 = saberi2 / broj2;
    let stampaj2 = parseFloat(prosecna2).toFixed(2);
    console.log(stampaj2);

    let zaDugme1;
    if (nizOcena.ZakljucnaOcena[0] || nizOcena.ZakljucnaOcena[1]) {
      if (nizOcena.ZakljucnaOcena[0]) {
        if (nizOcena.ZakljucnaOcena[0].Polugodiste == 'prvo') {
          zaDugme1 = true;
        }
      }

      if (nizOcena.ZakljucnaOcena[1]) {
        if (nizOcena.ZakljucnaOcena[1].Polugodiste == 'prvo') {
          zaDugme1 = true;
        }
      }
    }

    let zaDugme2;
    if (nizOcena.ZakljucnaOcena[0] || nizOcena.ZakljucnaOcena[1]) {
      if (nizOcena.ZakljucnaOcena[0]) {
        if (nizOcena.ZakljucnaOcena[0].Polugodiste == 'drugo') {
          zaDugme2 = true;
        }
      }

      if (nizOcena.ZakljucnaOcena[1]) {
        if (nizOcena.ZakljucnaOcena[1].Polugodiste == 'drugo') {
          zaDugme2 = true;
        }
      }
    }
    let terzica;
    if (nizOcena.ZakljucnaOcena[0]) {
      terzica = nizOcena.ZakljucnaOcena[0].Vrednost;
    }
    let terzica1;
    if (nizOcena.ZakljucnaOcena[1]) {
      terzica1 = nizOcena.ZakljucnaOcena[1].Vrednost;
    }

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
          <h2 style={{ color: '#000000' }}>
            {this.state.ucenik.Ime} {this.state.ucenik.Prezime}:{' '}
            {this.state.ucenik.Razred}/{this.state.ucenik.Odeljenje},
            Polugodiste: 1
          </h2>
          <table
            style={{ borderColor: '#e3dd2b' }}
            className='table table-bordered table-striped'
          >
            <thead>
              <tr>
                {this.state.predmeti.map((predmet, ind) => {
                  return (
                    <th
                      style={{ borderColor: '#e3dd2b', color: '#000000' }}
                      key={ind}
                    >
                      {predmet.Naziv}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <Ocene1 predmeti={this.state.predmeti} />
            </tbody>
          </table>

          <div style={{ width: '33%', height: '100%' }}>
            <div class='input-group'>
              <input
                style={{ marginBottom: '2px' }}
                id='prvopolugodje'
                type='number'
                class='form-control'
                placeholder={str}
              />
              <span class='input-group-btn'>
                <button
                  disabled={zaDugme1}
                  id='zak1'
                  style={{ height: '34px', marginBottom: '10px' }}
                  class='btn btn-success'
                  type='button'
                  onClick={this.zakljuci1}
                >
                  Zakljuci
                </button>
              </span>
            </div>
          </div>

          {!nizOcena.ZakljucnaOcena[0] ? (
            <div style={{ width: '100%' }}>
              <h3 style={{ color: 'purple' }}>
                Trenutna prosecna ocena za predmet {this.state.predmetZakljuci}{' '}
                iznosi: {stampaj1}
              </h3>
            </div>
          ) : (
            <h3 style={{ color: '#eb5456' }}>
              Ocena je zakljucena i iznosi {terzica}
            </h3>
          )}

          <br></br>
          <br></br>
          <br></br>

          <h2 style={{ color: '#000000' }}>
            {this.state.ucenik.Ime} {this.state.ucenik.Prezime}:{' '}
            {this.state.ucenik.Razred}/{this.state.ucenik.Odeljenje},
            Polugodiste: 2
          </h2>
          <table
            style={{ borderColor: '#e3dd2b' }}
            className='table table-bordered table-striped'
          >
            <thead>
              <tr>
                {this.state.predmeti.map((predmet, ind) => {
                  return (
                    <th
                      style={{ borderColor: '#e3dd2b', color: '#000000' }}
                      key={ind}
                    >
                      {predmet.Naziv}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <Ocene2 predmeti={this.state.predmeti} />
            </tbody>
          </table>

          <div style={{ width: '33%' }}>
            <div class='input-group'>
              <input
                id='drugopolugodje'
                type='number'
                class='form-control'
                placeholder={str}
              />
              <span class='input-group-btn'>
                <button
                  disabled={zaDugme2}
                  style={{ height: '34px' }}
                  class='btn btn-success'
                  type='button'
                  onClick={this.zakljuci2}
                >
                  Zakljuci
                </button>
              </span>
            </div>
          </div>
          {!nizOcena.ZakljucnaOcena[1] ? (
            <div style={{ width: '100%' }}>
              <h3 style={{ color: 'purple' }}>
                Trenutna prosecna ocena za predmet {this.state.predmetZakljuci}{' '}
                iznosi: {stampaj2}
              </h3>
            </div>
          ) : (
            <h3 style={{ color: '#eb5456' }}>
              Ocena je zakljucena i iznosi {terzica1}
            </h3>
          )}
        </div>
      </div>
    );
  }
}
