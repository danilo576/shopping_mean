import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Raspored extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 'staro',
      idDeteta: 'staro',
      Roditelj: null,
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
      })
    );
  }

  render() {
    if (!this.state.response[0].Raspored) {
      return <span>Loading...</span>;
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    const danasnjiDan = String(today.getDay());

    let dani = this.state.response[0].Raspored;
    let th = [];

    th.push(React.createElement('th', { className: 'head' }, 'Cas'));
    let granica = 0; // koliko max predmeta ima u jednom danu
    console.log('Danasnji ' + danasnjiDan);
    dani.forEach((d) => {
      if (th.length == danasnjiDan) {
        th.push(
          React.createElement(
            'th',
            { style: { backgroundColor: 'red' } },
            d.Dan
          )
        );
      } else th.push(React.createElement('th', { className: 'head' }, d.Dan));
      if (granica < d.Predmeti.length) granica = d.Predmeti.length;
    });

    let tr = [];
    let i;

    for (i = 0; i < granica; i++) {
      let td = [];
      td.push(
        React.createElement(
          'td',
          { className: 'head', style: { font: 'bold' } },
          i + 1
        )
      );

      dani.forEach((dan) => {
        td.push(
          React.createElement('td', { className: 'head' }, dan.Predmeti[i])
        );
      });
      tr[i] = <tr>{td}</tr>;
    }

    return (
      <table className='table-responsive table table-hover MT1 head'>
        <thead className='head'>
          <tr>{th}</tr>
        </thead>
        <tbody>{tr}</tbody>
      </table>
    );
  }
}

export default Raspored;
