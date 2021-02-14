import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Dogadjaji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 'staro',
      idDeteta: 'staro',
      Roditelj: 'staro',
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
        //this.getProfesor();
      })
    );
  }

  sort(niz) {
    console.log(niz.length);
    for (let i = 0; i < niz.length; i++) console.log(niz[i].Datum);
    let i = 0;
    let j = 0;
    let f = 1;
    for (i = 0; i < niz.length - 1; i++) {
      console.log(niz[i]);
      console.log('niz i datum ' + niz[i].Datum);
      for (j = i + 1; j < niz.length; j++) {
        f = 1;
        console.log('Poredjujem');
        console.log(niz[i].Datum);
        console.log('sa');
        console.log(niz[j].Datum);
        let k = 0;
        for (k = 0; k < niz[i].Datum.length; k++) {
          console.log(niz[i].Datum[k]);
          console.log(niz[j].Datum[k]);
          if (niz[i].Datum[k] > niz[j].Datum[k]) f = 0;
          if (parseInt(niz[i].Datum[k]) < parseInt(niz[j].Datum[k]) && f == 1) {
            console.log('USO');
            console.log('F ' + f);
            console.log(niz[i].Datum[k]);
            console.log(niz[j].Datum[k]);
            let pom = niz[i];
            niz[i] = niz[j];
            niz[j] = pom;
            f = 0;
          }
        }
      }
    }
    for (let i = 0; i < niz.length; i++) console.log(niz[i].Datum);
  }

  render() {
    if (!this.state.response[0].Dogadjaji) {
      return <span>Loading...</span>;
    }

    let dogadjaji = this.state.response[0].Dogadjaji;
    this.sort(dogadjaji);
    let trList = dogadjaji.map((dog) => (
      <tr>
        <td className='redDatum'>{dog.Datum}</td>
        <td>{dog.Tekst}</td>
      </tr>
    ));

    return (
      <div className='MT'>
        <div>
          <table className='table  table-hover '>
            <thead>
              <tr>
                <th className='datumfix'>Datum</th>
                <th>Obavestenje</th>
              </tr>
            </thead>
            <tbody>{trList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dogadjaji;
