import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { izabrani: '' };
  }

  handleChange(izabraniString) {
    this.setState({ izabrani: izabraniString });
  }
  renderFormu() {
    if (this.state.izabrani == 'ucenik')
      return (
        <div>
          <div class='form-group'>
            <label for='imeImput'>Ime</label>
            <input
              type='text'
              class='form-control'
              id='imeImput'
              placeholder='Ime'
              name='ime'
            ></input>
          </div>
          <div class='form-group'>
            <label for='prezimeImput'>Prezime</label>
            <input
              type='text'
              class='form-control'
              id='prezimeImput'
              placeholder='Prezime'
              name='prezime'
            ></input>
          </div>
          <div class='form-group'>
            <label for='jmpgInput'>JMBG</label>
            <input
              type='number'
              class='form-control'
              id='jmpgInput'
              placeholder='123456789'
              name='jmbg'
            ></input>
          </div>
          <div class='form-group'>
            <label for='datumInput'>Datum</label>
            <input
              type='date'
              class='form-control'
              id='datumInput'
              placeholder='Datum'
              name='datumrodjenja'
            ></input>
          </div>
          <div class='form-group'>
            <label for='adresaInput'>Adresa</label>
            <input
              type='text'
              class='form-control'
              id='adresaInput'
              placeholder='Adresa'
              name='adresa'
            ></input>
          </div>
          <div class='form-group'>
            <label for='polInput'>Pol</label>
            <input
              type='text'
              class='form-control'
              id='polInput'
              placeholder='M/Z'
              name='pol'
            ></input>
          </div>
          <div class='form-group'>
            <label for='adresaInput'>Razred</label>
            <input
              type='number'
              class='form-control'
              id='adresaInput'
              placeholder='Razred'
              name='razred'
            ></input>
          </div>
          <div class='form-group'>
            <label for='adresaInput'>Odeljenje</label>
            <input
              type='number'
              class='form-control'
              id='adresaInput'
              placeholder='Odeljenje'
              name='odeljenje'
            ></input>
          </div>
          <div class='form-group'>
            <label for='razredniInput'>Id Razrednog</label>
            <input
              type='text'
              class='form-control'
              id='razredniInput'
              placeholder='ID'
              name='razredni'
            ></input>
          </div>
        </div>
      );
    if (this.state.izabrani == 'roditelj')
      return (
        <div>
          <div class='form-group'>
            <label for='imeImput'>Ime</label>
            <input
              type='text'
              class='form-control'
              id='imeImput'
              placeholder='Ime'
              name='Ime'
            ></input>
          </div>
          <div class='form-group'>
            <label for='prezimeImput'>Prezime</label>
            <input
              type='text'
              class='form-control'
              id='prezimeImput'
              placeholder='Prezime'
              name='Prezime'
            ></input>
          </div>
          <div class='form-group'>
            <label for='telefonInput'>Telefon</label>
            <input
              type='number'
              class='form-control'
              id='telefonInput'
              placeholder='Telefon'
              name='Telefon'
            ></input>
          </div>
          <div class='form-group'>
            <label for='polInput'>Pol</label>
            <input
              type='text'
              class='form-control'
              id='polInput'
              placeholder='M/Z'
              name='Pol'
            ></input>
          </div>
          <div class='form-group'>
            <label for='deteIdInput'>Id Deteta</label>
            <input
              type='text'
              class='form-control'
              id='deteIdInput'
              placeholder='ID'
              name='idDeteta'
            ></input>
          </div>
        </div>
      );
    if (this.state.izabrani == 'profesor')
      return (
        <div>
          <div class='form-group'>
            <label for='imeImput'>Ime</label>
            <input
              type='text'
              class='form-control'
              id='imeImput'
              placeholder='Ime'
              name='ime'
            ></input>
          </div>
          <div class='form-group'>
            <label for='prezimeImput'>Prezime</label>
            <input
              type='text'
              class='form-control'
              id='prezimeImput'
              placeholder='Prezime'
              name='prezime'
            ></input>
          </div>
          <div class='form-group'>
            <label for='predmetInput'>Predmet</label>
            <input
              type='text'
              class='form-control'
              id='predmetInput'
              placeholder='Razred'
              name='predmet'
            ></input>
          </div>
          <div class='form-group'>
            <label for='polInput'>Pol</label>
            <input
              type='text'
              class='form-control'
              id='polInput'
              placeholder='M/Z'
              name='pol'
            ></input>
          </div>
          <div class='form-group'>
            <label for='rezredniInput'>Razredni</label>
            <input
              type='checkbox'
              class='form-control'
              id='rezredniInput'
              placeholder='Razredni'
              name='razredni'
              value='true'
            ></input>
          </div>
        </div>
      );

    return <div></div>;
  }

  render() {
    return (
      <form method='POST' action='http://localhost:5000/register'>
        <input placeholder='Email' type='email' name='username'></input>
        <input placeholder='Password' type='password' name='password'></input>

        <p>
          <label>
            <input
              type='radio'
              name='type'
              value='ucenik'
              onChange={() => {
                this.handleChange('ucenik');
              }}
            />
            <span>Ucenik</span>
          </label>
        </p>
        <p>
          <label>
            <input
              type='radio'
              name='type'
              value='roditelj'
              onChange={() => {
                this.handleChange('roditelj');
              }}
            />
            <span>Roditelj</span>
          </label>
        </p>
        <p>
          <label>
            <input
              type='radio'
              name='type'
              value='profesor'
              onChange={() => {
                this.handleChange('profesor');
              }}
            />
            <span>Profesor</span>
          </label>
        </p>

        {this.renderFormu()}

        <button type='submit'>Registruj se</button>
      </form>
    );
  }
}

export default RegisterForm;
