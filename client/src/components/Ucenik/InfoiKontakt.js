import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class InfoiKontakt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 'staro',
      idDeteta: 'staro',
      profa: 'staro',
      rod: 'staro',
    };

    this.getRoditelj = this.getRoditelj.bind(this);
    this.getDete = this.getDete.bind(this);
  }

  componentDidMount() {
    this.getRoditelj();
  }

  getRoditelj() {
    if (
      this.props.infoKorisnika.username != null &&
      this.props.infoKorisnika.type == 'ucenik'
    ) {
      axios
        .post('http://localhost:5000/vratiDete', {
          email: this.props.infoKorisnika.username,
        })
        .then((res) => {
          this.setState({ idDeteta: res.data._id });
          this.getDete();
        })
        .catch((err) => console.log(err));
    } else if (
      this.props.infoKorisnika.username != null &&
      this.props.infoKorisnika.type == 'roditelj'
    ) {
      axios
        .post('http://localhost:5000/vratiRoditelja', {
          email: this.props.infoKorisnika.username,
        })
        .then((res) => {
          this.setState({ idDeteta: res.data.Deca });
          this.getDete();
        })
        .catch((err) => console.log(err));

      fetch(
        'http://localhost:5000/Roditelj/GetRoditeljByEmail/' +
          this.props.infoKorisnika.username
      ).then((res) =>
        res.json().then((json) => {
          this.setState({ rod: json });
        })
      );
    } else {
      axios
        .post('http://localhost:5000/profesori/vratiProfesora', {
          email: this.props.infoKorisnika.username,
        })
        .then((res) => this.setState({ profa: res.data }))
        .catch((err) => console.log(err));
    }
  }

  getDete() {
    fetch('http://localhost:5000/Dete/' + this.state.idDeteta).then((res) =>
      res.json().then((json) => {
        this.setState({ response: json });
        this.getProfesor();
      })
    );
  }

  getProfesor() {
    fetch(
      'http://localhost:5000/profesori/Profesor/' +
        this.state.response[0].razredni
    ).then((res) => res.json().then((json) => this.setState({ profa: json })));
  }

  render() {
    if (
      this.props.infoKorisnika.type == 'ucenik' &&
      this.state.idDeteta == 'staro'
    )
      return <h3>Loading1...</h3>;
    else if (
      this.props.infoKorisnika.type == 'roditelj' &&
      this.state.rod == 'staro'
    )
      return <h3>Loading2...</h3>;
    else if (
      this.props.infoKorisnika.type == 'profesor' &&
      this.state.profa == 'staro'
    )
      return <h3>Loading3...</h3>;

    let dete = this.state.response[0];
    let prof = this.state.profa;
    console.log(prof);
    let roditelj;
    if (this.props.infoKorisnika.type == 'roditelj') {
      if (!this.state.rod[0].Ime) {
        return <span>Loading...</span>;
      } else {
        roditelj = this.state.rod[0];
      }
    }

    let informacije = [];
    let pol = '';
    if (this.props.infoKorisnika.type == 'ucenik') {
      informacije.push(React.createElement('h5', null, 'Ime: ' + dete.Ime));
      informacije.push(
        React.createElement('h5', null, 'Prezime: ' + dete.Prezime)
      );
      informacije.push(React.createElement('h5', null, 'Jmbg: ' + dete.Jmbg));
      informacije.push(
        React.createElement('h5', null, 'Datum rodjenja: ' + dete.DatumRodjenja)
      );
      informacije.push(
        React.createElement('h5', null, 'Adresa: ' + dete.Adresa)
      );
      informacije.push(
        React.createElement('h5', null, 'Email adresa: ' + dete.Email)
      );
      informacije.push(
        React.createElement(
          'h5',
          null,
          'Razred: ' + dete.Razred + '/' + dete.Odeljenje
        )
      );
      pol = dete.Pol;
    } else if (this.props.infoKorisnika.type == 'roditelj') {
      informacije.push(React.createElement('h5', null, 'Ime: ' + roditelj.Ime));
      informacije.push(
        React.createElement('h5', null, 'Prezime: ' + roditelj.Prezime)
      );
      informacije.push(
        React.createElement('h5', null, 'Email: ' + roditelj.Email)
      );
      informacije.push(
        React.createElement('h5', null, 'Telefon: ' + roditelj.Telefon)
      );
      pol = roditelj.pol;
    } else if (this.props.infoKorisnika.type == 'profesor') {
      informacije.push(React.createElement('h5', null, 'Ime: ' + prof.ime));
      informacije.push(
        React.createElement('h5', null, 'Prezime: ' + prof.prezime)
      );
      informacije.push(React.createElement('h5', null, 'Email: ' + prof.email));
      informacije.push(
        React.createElement('h5', null, 'Predmet: ' + prof.predmet)
      );
      pol = prof.pol;
    }

    return (
      <div>
        {this.state.profa == 'staro' ? null : (
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
                  ADULINX SOFT
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
        )}

        <div className='cards'>
          {pol == 'M' ? (
            <img
              className='slika'
              src='https://www.w3schools.com/howto/img_avatar.png'
              alt='Avatar'
              style={{ width: '100%' }}
            />
          ) : (
            <img
              className='slika'
              src='https://www.w3schools.com/howto/img_avatar2.png'
              alt='Avatar'
              style={{ width: '100%' }}
            />
          )}
          <div className='containers'>
            {/* <h4><b>John Doe</b></h4> 
                    <p>Architect & Engineer</p>  */}
            {informacije}
          </div>
        </div>
      </div>
    );
  }
}
export default InfoiKontakt;
