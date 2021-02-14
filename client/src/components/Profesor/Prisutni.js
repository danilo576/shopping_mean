import React, { Component } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
class Prisutni extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ucenici: [],
      predmet: this.props.match.params.pred,
      izostaliUcenici: [],
      indexiIzostalihUcenika: [],
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.god);
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
  promeniStanje(index) {
    const noviNizIzostalih = [...this.state.indexiIzostalihUcenika];
    if (this.state.indexiIzostalihUcenika.includes(index)) {
      delete noviNizIzostalih[noviNizIzostalih.indexOf(index)];
      this.setState({ indexiIzostalihUcenika: noviNizIzostalih });
    } else {
      noviNizIzostalih.push(index);
      this.setState({ indexiIzostalihUcenika: noviNizIzostalih });
    }

    const noviNiz = [...this.state.izostaliUcenici];
    if (noviNiz[index] == null) noviNiz[index] = true;
    else if (noviNiz[index] == true) noviNiz[index] = false;
    else noviNiz[index] = true;
    this.setState({ izostaliUcenici: noviNiz });
  }

  posaljiIzostanke() {
    this.state.indexiIzostalihUcenika
      .filter((vrednost) => {
        return vrednost != undefined;
      })
      .forEach((item, index) => {
        this.nadjiDetetuRoditelja(this.state.ucenici[item]._id);

        //Dodaje Detetu izostanak na cekanju kako bi roditelj mogao da ga opravda
        this.upisiIzostanakNaCekanju(this.state.ucenici[item]);
      });

    swal('Upisani Izostanci');
  }
  vreme() {
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return yyyy + '.' + mm + '.' + dd;
  }
  kojePolugodiste() {
    let today = new Date();
    var mm = today.getMonth() + 1;
    if (mm >= 1 && mm <= 6) return 'drugo';
    else return 'prvo';
  }

  upisiIzostanakNaCekanju(dete) {
    let niz = dete.Izostanci;

    let izostanak = {
      Razred: this.props.match.params.god,
      Polugodiste: this.kojePolugodiste(),
      Tip: 'Na cekanju',
      Predmet: this.state.predmet,
      Datum: this.vreme(),
    };

    axios
      .post('http://localhost:5000/ucenici/dodajIzostanak', {
        id_deteta: dete._id,
        izostanak: izostanak,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  nadjiDetetuRoditelja(idDeteta) {
    axios
      .get('http://localhost:5000/nadjiPrekoDeteta/' + idDeteta)
      .then((res) => {
        this.posaljiMejlRoditelju(res.data[0].Email);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  posaljiMejlRoditelju(mejl) {
    axios
      .post('http://localhost:5000/posaljiMejl', {
        mejlRoditelja: mejl,
        tekstPoruke: 'aaaa',
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
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
        <div style={{ height: '722px' }}>
          <div className='container'>
            <ListGroup variant='flush'>
              {this.state.ucenici.map((ucenik, index) => {
                return (
                  <ListGroup.Item
                    action
                    variant={
                      this.state.izostaliUcenici[index] ? 'danger' : 'info'
                    }
                    key={index}
                  >
                    {ucenik.Ime + ' ' + ucenik.Prezime}
                    <label></label>
                    <Button
                      variant='info'
                      style={{ marginLeft: '2rem' }}
                      onClick={() => {
                        this.promeniStanje(index);
                      }}
                    >
                      Nije Prisutan
                    </Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <Button
              variant='danger'
              onClick={() => {
                this.posaljiIzostanke();
              }}
            >
              Upisi Izostanke
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Prisutni;
