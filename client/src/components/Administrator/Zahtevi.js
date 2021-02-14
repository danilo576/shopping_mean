import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Zahtevi extends Component {
  constructor(props) {
    super(props);
    this.state = { response: 'staro' };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8080/').then((res) =>
      res.json().then((json) => {
        this.setState({ response: json });
      })
    );
  }

  render() {
    if (!this.state.response[0].Zahtevi) {
      return <span>Loading...</span>;
    }
    let sviZahtevi = this.state.response[0].Zahtevi;
    let DodajZahtev = [];
    let ObrisiZahtev = [];
    let AzurirajZahtev = [];

    sviZahtevi.forEach((p) => {
      let td = [];
      td.push(React.createElement('td', null, p.Sadrzaj));
      td.push(React.createElement('td', null, p.Datum));
      if (p.TipZahteva == 'Dodaj') {
        DodajZahtev[DodajZahtev.length] = <tr>{td}</tr>;
      } else if (p.TipPosta == 'Obrisi') {
        ObrisiZahtev[ObrisiZahtev.length] = <tr>{td}</tr>;
      } else {
        AzurirajZahtev[AzurirajZahtev.length] = <tr>{td}</tr>;
      }
    });
    return (
      <div className='MT'>
        <div>
          <h2>Zahtevi za dodavanje</h2>
          <table className='table  table-hover '>
            <thead>
              <tr>
                <th>Obavestenje</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>{DodajZahtev}</tbody>
          </table>
        </div>

        <div>
          <h2>Testovi</h2>
          <table className='table  table-hover '>
            <thead>
              <tr>
                <th>Obavestenje</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>{ObrisiZahtev}</tbody>
          </table>
        </div>

        <div>
          <h2>Vannastavne aktivnosti</h2>
          <table className='table  table-hover '>
            <thead>
              <tr>
                <th>Obavestenje</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>{AzurirajZahtev}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Forum;
