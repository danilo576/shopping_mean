import React, { Component } from 'react';
import axios from 'axios';
import { ProfesorHeader } from './ProfesorHeader';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import swal from 'sweetalert';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

class ProfesorPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      podaciLogovanogProfesora: {},
      kliknut: '',
      razred: '',
      odeljenje: '',
      sadrzaj: '',
      razred1: '',
      odeljenje1: '',
      datum: '',
    };
    this.posaljiPodatke = this.posaljiPodatke.bind(this);
  }
  componentDidMount() {
    axios
      .post('http://localhost:5000/profesori/vratiProfesora', {
        email: this.props.podaci.username,
      })
      .then((res) => this.setState({ podaciLogovanogProfesora: res.data }))
      .catch((err) => console.log(err));
  }

  handleChange(data) {
    this.setState({
      kliknut: data,
    });
  }

  onChangeRad(event) {
    let tmp = event.target.value;
    let broj = tmp.charAt(0);
    let broj1 = parseInt(broj, 10);
    let ode = tmp.charAt(2);
    let ode1 = parseInt(ode, 10);
    this.setState({
      razred: broj1,
      odeljenje: ode1,
    });
  }
  onChangeDatePick(event) {
    let pom = document.getElementById('datepicker').value;
    this.setState({ datum: pom });
  }
  onChangeRad1(event) {
    let tmp = event.target.value;
    let broj = tmp.charAt(0);
    let broj1 = parseInt(broj, 10);
    let ode = tmp.charAt(2);
    let ode1 = parseInt(ode, 10);
    this.setState({
      razred1: broj1,
      odeljenje1: ode1,
    });
  }
  onChangeText(event) {
    this.setState({
      sadrzaj: event.target.value,
    });
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

  posaljiPodatke() {
    let today = this.vreme();
    var posalji = {
      razred: this.state.razred,
      odeljenje: this.state.odeljenje,
      obavestenje: {
        TipPosta: this.state.kliknut,
        Sadrzaj: this.state.sadrzaj,
        Datum: today,
        ProfesorIme: this.state.podaciLogovanogProfesora.ime,
      },
    };

    console.log(posalji);

    if (
      !this.state.sadrzaj ||
      !this.state.kliknut ||
      !this.state.razred ||
      !this.state.odeljenje
    ) {
      swal('Paznja!', 'Niste popunili sva potrebna polja');
    } else {
      swal({
        title: 'Da li si siguran?',
        text:
          'Sadrzaj posta koji dodajete na forum ucenika je: ' +
          posalji.obavestenje.Sadrzaj,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('Uspesno dodato na forum!', {
            icon: 'success',
          });

          axios
            .post('http://localhost:5000/profesori/dodajDogadjaj', posalji)
            .then((res) => {
              console.log('Uspesno odradjen posao');
            })
            .catch((error) => {
              console.log(error);
            });
          console.log('Ovo je napisano posle axios');
        } else {
          swal('Uspesno ste odustali!');
        }
      });
    }
  }
  roditeljski() {
    if (!this.state.datum) {
      swal(
        'Paznja!',
        'Morate da izaberete odgovarajuci datum klikom na kalendar'
      );
      return;
    }
    if (!this.state.razred1) {
      swal('Paznja!', 'Niste izabrali odgovarajuce odeljenje');
      return;
    }
    let saljemOvo = {
      razred1: this.state.razred1,
      odeljenje1: this.state.odeljenje1,
      dogadjaj: {
        Tekst: 'Roditeljski sastanak je zakazan datuma ' + this.state.datum,
        Datum: this.vreme(),
      },
    };
    console.log(saljemOvo);
    axios
      .post('http://localhost:5000/profesori/zakaziRoditeljski', saljemOvo)
      .then((res) => {
        console.log('Uspeo sam');
      })
      .catch((error) => {
        console.log(error);
      });
    swal('Uspesno zakazan roditeljski!', {
      icon: 'success',
    });
  }

  render() {
    let vremence = this.vreme();
    return (
      <div>
        <ProfesorHeader profesor={this.state.podaciLogovanogProfesora} />
        <div className='container'>
          <div>
            <div>
              <h1 style={{ textAlign: 'center', fontFamily: 'Book Antiqua' }}>
                Dodaj novi post na forumu
              </h1>
              <div
                style={{
                  border: '1px solid black',
                  height: '200px',
                  backgroundColor: '#3b3939',
                  fontFamily: 'Book Antiqua',
                }}
              >
                <RadioGroup onChange={this.handleChange.bind(this)} horizontal>
                  <RadioButton value='Domaci'>Domaci zadatak</RadioButton>
                  <RadioButton value='Test'>Test</RadioButton>
                  <RadioButton value='Vannastavne'>
                    Vannastavne aktivnosti
                  </RadioButton>
                </RadioGroup>

                <div
                  style={{
                    marginLeft: '20px',
                    color: '#f0ad4e',
                    marginTop: '7px',
                    fontFamily: 'Book Antiqua',
                  }}
                >
                  Izaberite odeljenje:
                  {this.state.podaciLogovanogProfesora.odeljenja
                    ? this.state.podaciLogovanogProfesora.odeljenja.map(
                        (val, ind) => {
                          return (
                            <label
                              style={{ color: '#f0ad4e', marginLeft: '15px' }}
                              class='radio-inline'
                            >
                              <input
                                onChange={this.onChangeRad.bind(this)}
                                type='radio'
                                name='rate'
                                value={val.godina + '/' + val.odeljenje}
                              />
                              {val.godina}/{val.odeljenje}
                            </label>
                          );
                        }
                      )
                    : null}
                </div>

                <div
                  style={{
                    marginTop: '15px',
                    marginLeft: '0px',
                    width: '100%',
                  }}
                  class='col-lg-6'
                >
                  <div class='input-group'>
                    <input
                      onChange={this.onChangeText.bind(this)}
                      style={{
                        height: '50px',
                        backgroundColor: '#d8e0ed',
                        width: '100%',
                      }}
                      type='text'
                      class='form-control'
                      placeholder='Dodaj sadrzaj...'
                    />
                    <span class='input-group-btn'>
                      <button
                        style={{ height: '50px' }}
                        class='btn btn-warning'
                        type='button'
                        onClick={this.posaljiPodatke}
                      >
                        Dodaj
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1
              style={{
                textAlign: 'center',
                fontFamily: 'Book Antiqua',
                marginTop: '40px',
              }}
            >
              Dodaj novi dogadjaj
            </h1>
            <div
              style={{
                marginLeft: '0px',
                color: '#020030',
                marginTop: '7px',
                fontFamily: 'Book Antiqua',
              }}
            >
              Izaberite odeljenje:
              {this.state.podaciLogovanogProfesora.odeljenja
                ? this.state.podaciLogovanogProfesora.odeljenja.map(
                    (val, ind) => {
                      return (
                        <label
                          style={{ color: '#020030', marginLeft: '15px' }}
                          class='radio-inline'
                        >
                          <input
                            onChange={this.onChangeRad1.bind(this)}
                            type='radio'
                            name='rate1'
                            value={val.godina + '/' + val.odeljenje}
                          />
                          {val.godina}/{val.odeljenje}
                        </label>
                      );
                    }
                  )
                : null}
            </div>

            <DatePickerComponent
              format='yyyy-MM-dd'
              value={vremence}
              id='datepicker'
              onChange={this.onChangeDatePick.bind(this)}
            />
            <button
              className='btn btn-primary'
              onClick={this.roditeljski.bind(this)}
            >
              Zakazi
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfesorPage;
