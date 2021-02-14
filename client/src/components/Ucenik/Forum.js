import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 'staro',
      idDeteta: 'staro',
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
    }
  }

  getDete() {
    fetch('http://localhost:5000/Dete/' + this.state.idDeteta).then((res) =>
      res.json().then((json) => {
        this.setState({ response: json });
      })
    );
  }

  sort(niz) {
    let i = 0;
    let j = 0;
    let f = 1;
    for (i = 0; i < niz.length - 1; i++) {
      for (j = i + 1; j < niz.length; j++) {
        f = 1;
        let k = 0;
        for (k = 0; k < niz[i].Datum.length; k++) {
          if (niz[i].Datum[k] > niz[j].Datum[k]) f = 0;
          if (parseInt(niz[i].Datum[k]) < parseInt(niz[j].Datum[k]) && f == 1) {
            let pom = niz[i];
            niz[i] = niz[j];
            niz[j] = pom;
            f = 0;
          }
        }
      }
    }
  }

  render() {
    if (!this.state.response[0].Post) {
      return <span>Loading...</span>;
    }
    let sviPostovi = this.state.response[0].Post;
    let DomaciPost = [];
    let TestPost = [];
    let VannastavnePost = [];

    this.sort(sviPostovi);
    //let OstaloPost = [];
    sviPostovi.forEach((p) => {
      let td = [];
      td.push(React.createElement('td', { style: { color: 'red' } }, p.Datum));
      td.push(React.createElement('td', null, p.ProfesorIme));
      td.push(React.createElement('td', null, p.Sadrzaj));
      if (p.TipPosta == 'Domaci') {
        DomaciPost[DomaciPost.length] = <tr>{td}</tr>;
      } else if (p.TipPosta == 'Test') {
        TestPost[TestPost.length] = <tr>{td}</tr>;
      } else if (p.TipPosta == 'Vannastavne') {
        VannastavnePost[VannastavnePost.length] = <tr>{td}</tr>;
      }
    });

    return (
      <div className='MT panel-group ' id='accordion'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h4 className='panel-title'>
              <a
                data-toggle='collapse'
                data-parent='#accordion'
                href='#collapse1'
              >
                Domaci zadaci
              </a>
            </h4>
          </div>
          <div id='collapse1' className='panel-collapse collapse  '>
            <div className='panel-body'>
              <table className='table  table-hover '>
                <thead>
                  <tr>
                    <th className='datumfix'>Datum</th>
                    <th className='datumfix'>Profesor</th>
                    <th>Obavestenje</th>
                  </tr>
                </thead>
                <tbody>{DomaciPost}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div class='panel panel-default'>
          <div class='panel-heading'>
            <h4 class='panel-title'>
              <a
                data-toggle='collapse'
                data-parent='#accordion'
                href='#collapse2'
              >
                Testovi
              </a>
            </h4>
          </div>
          <div id='collapse2' class='panel-collapse collapse'>
            <div class='panel-body'>
              <table className='table  table-hover '>
                <thead>
                  <tr>
                    <th className='datumfix'>Datum</th>
                    <th className='datumfix'>Profesor</th>
                    <th>Obavestenje</th>
                  </tr>
                </thead>
                <tbody>{TestPost}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h4 className='panel-title'>
              <a
                data-toggle='collapse'
                data-parent='#accordion'
                href='#collapse3'
              >
                Vannastavne aktivnosti
              </a>
            </h4>
          </div>
          <div id='collapse3' className='panel-collapse collapse in'>
            <div className='panel-body'>
              <table className='table  table-hover '>
                <thead>
                  <tr>
                    <th className='datumfix'>Datum</th>
                    <th className='datumfix'>Profesor</th>
                    <th>Obavestenje</th>
                  </tr>
                </thead>
                <tbody>{VannastavnePost}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Forum;
