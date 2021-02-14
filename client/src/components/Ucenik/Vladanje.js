import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Vladanje extends Component {
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
    if (!this.state.response[0].Napomene) {
      return <span>Loading...</span>;
    }
    //let napomenaList = this.state.response[0].Napomene.map(nap => <a key={nap._id} href="#" className="list-group-item">{nap.Tekst} </a>)
    let napomenaList = this.state.response[0].Napomene.map((nap) => (
      <tr>
        <td> {nap.Tekst} </td>
      </tr>
    ));

    return (
      <div className='MT'>
        <h4 style={{ color: 'red', marginBottom: '20px' }}>
          Trenutna ocena iz vladanja je:{' '}
          <span className='vladanjeOcena'>
            {' '}
            {this.state.response[0].Vladanje}{' '}
          </span>{' '}
        </h4>

        <table className='table  table-hover '>
          <thead>
            <th>Napomena</th>
          </thead>
          <tbody>{napomenaList}</tbody>
        </table>
      </div>
    );
  }
}
export default Vladanje;
