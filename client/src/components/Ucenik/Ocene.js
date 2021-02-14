import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Ocene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 'staro',
      roditelj: 'staro',
      polugodiste: 'prvo',
      tip: 'srednja',
      razred: 0,
      zakljuceneSve: false,
      prosek: '/',
      idDeteta: null,
      Roditelj: null,
    };
    this.changePolugodiste = this.changePolugodiste.bind(this);
    this.changeRazred = this.changeRazred.bind(this);
    //this.IzvuciDete = this.IzvuciDete.bind(this);
    this.changeProsek = this.changeProsek.bind(this);
    this.changeZakljucene = this.changeZakljucene.bind(this);

    this.getRoditelj = this.getRoditelj.bind(this);
    this.getDete = this.getDete.bind(this);
  }

  changePolugodiste(pol) {
    this.setState({ polugodiste: pol });
  }

  changeZakljucene(z) {
    this.setState({ zakljuceneSve: z });
  }

  changeProsek(pros) {
    pros = parseFloat(pros).toFixed(2);
    this.setState({ prosek: pros });
  }

  changeRazred(r) {
    this.setState({ razred: r });
  }

  drawNumbers() {
    let brojRazreda;
    if (this.state.tip == 'osnovna') brojRazreda = 8;
    else brojRazreda = 4;
    let li = [];
    for (let i = 1; i <= brojRazreda; i++) {
      li.push(
        <li key={i} className={this.state.razred == i ? 'active' : ''}>
          <a onClick={() => this.changeRazred(i)} href='#'>
            {i}
          </a>
        </li>
      );
    }
    return li;
  }

  componentDidMount() {
    this.getRoditelj();

    var today = new Date();
    var mm = String(today.getMonth() + 1);
    if (mm > 0 && mm < 9) this.changePolugodiste('drugo');
    else this.changePolugodiste('prvo');
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
    } else if (this.props.infoKorisnika.username != null) {
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
          this.setState({ Roditelj: json });
        })
      );
    }
  }

  getDete() {
    fetch('http://localhost:5000/Dete/' + this.state.idDeteta).then((res) =>
      res.json().then((json) => {
        this.setState({ response: json });
      })
    );
  }

  render() {
    if (!this.state.response[0].Predmeti) {
      return <span>Loading...</span>;
    }

    if (this.state.razred == 0)
      this.changeRazred(this.state.response[0].Razred);

    let sviPredmeti = this.state.response[0].Predmeti;
    let tr = [];

    let odgovarajuciPredmetiCount = sviPredmeti.length;
    let odgovarajuceZakljucneOcene = [];

    sviPredmeti.forEach((predmet, i) => {
      let odgovarajuciPredmeti = [];
      let odgovarajuceOcene = [];
      let odgovarajucaZakljucnaOcena;

      odgovarajuciPredmeti.push(React.createElement('td', null, predmet.Naziv));

      predmet.Ocene.forEach((ocena) => {
        if (
          ocena.Razred == this.state.razred &&
          ocena.Polugodiste == this.state.polugodiste
        )
          odgovarajuceOcene.push(ocena.Vrednost);
      });

      predmet.ZakljucnaOcena.forEach((z) => {
        if (
          z.Razred == this.state.razred &&
          z.Polugodiste == this.state.polugodiste
        ) {
          odgovarajuceZakljucneOcene.push(z.Vrednost);
          odgovarajucaZakljucnaOcena = z.Vrednost;
        }
      });

      let suma = 0;
      let brOcena = 0;
      let odgovarajuceOceneString = '';
      odgovarajuceOcene.forEach((oc) => {
        odgovarajuceOceneString += oc + ' ';
        suma += oc;
        brOcena++;
      });

      let prosecnaOcena;
      let pom;
      if (brOcena != 0) {
        prosecnaOcena = suma / brOcena;
        pom = parseFloat(prosecnaOcena).toFixed(2);
      } else {
        prosecnaOcena = '/';
        pom = '/';
      }

      odgovarajuciPredmeti.push(
        React.createElement('td', null, odgovarajuceOceneString)
      );
      odgovarajuciPredmeti.push(React.createElement('td', null, pom));
      odgovarajuciPredmeti.push(
        React.createElement('td', null, odgovarajucaZakljucnaOcena)
      );
      tr[i] = <tr>{odgovarajuciPredmeti}</tr>;
    });

    if (odgovarajuceZakljucneOcene.length == odgovarajuciPredmetiCount) {
      console.log('Zakljucene sve');
      let suma = 0;
      console.log(odgovarajuceZakljucneOcene);
      for (let i = 0; i < odgovarajuceZakljucneOcene.length; i++) {
        suma += odgovarajuceZakljucneOcene[i];
      }
      console.log('SUMA ' + suma);
      let proseks = this.state.response[0].Prosek;
      proseks.forEach((p) => {
        if (
          p.Razred == this.state.razred &&
          p.Polugodiste == this.state.polugodiste &&
          this.state.prosek == '/'
        ) {
          p.Vrednost = suma / odgovarajuceZakljucneOcene.length;
          let pom = p.Vrednost;
          this.changeProsek(pom);
        }
      });
    }

    return (
      <div className='visina MT'>
        <h3 className='RazredTekst'>Razred</h3>
        <div className='Razred'>
          <ul className='pagination'>{this.drawNumbers()}</ul>
        </div>

        <div className='polugodiste'>
          <ul className='pagination'>
            <li className={this.state.polugodiste == 'prvo' ? 'active' : ''}>
              <a
                onClick={() => this.changePolugodiste('prvo')}
                href='#prvopolugodiste'
              >
                Prvo polugodiste
              </a>
            </li>
            <li className={this.state.polugodiste == 'drugo' ? 'active' : ''}>
              <a
                onClick={() => this.changePolugodiste('drugo')}
                href='#drugopolugodiste'
              >
                Drugo polugodiste
              </a>
            </li>
          </ul>
        </div>

        <div>
          <table className='table-responsive table table-hover'>
            <thead>
              <tr>
                <th>Predmet</th>
                <th>Ocene</th>
                <th>Prosecna ocena</th>
                <th>Zakljucna ocena</th>
              </tr>
            </thead>
            <tbody>{tr}</tbody>
          </table>
        </div>

        {/* <h3 style={{ color: "red" }}>Prosek:<h3 className="Prosek" style={{ color: "red" }}> / </h3></h3> */}
        {odgovarajuceZakljucneOcene.length == odgovarajuciPredmetiCount ? (
          <h3 style={{ color: 'red' }}> Prosek: {this.state.prosek}</h3>
        ) : null}
      </div>
    );
  }
}

export default Ocene;
