import React, { Component } from 'react';
import UcenikPage from './Ucenik/UcenikPage';
import ProfesorPage from './Profesor/ProfesorPage';
import RegisterForm from './RegisterForm';

class PreviewPage extends Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    if (this.props.response === null) {
      return <h1>Loading...</h1>;
    }
    if (this.props.response === false) {
      return <h1>Niste ulogovani</h1>;
    } else {
      if (
        this.props.response.type === 'ucenik' ||
        this.props.response.type === 'roditelj'
      ) {
        return (
          <UcenikPage
            ucenik={this.props.ucenik}
            response={this.props.response}
          />
        );
      }
      if (this.props.response.type === 'profesor') {
        return <ProfesorPage podaci={this.props.response} />;
      }
      if (this.props.response.type === 'admin') {
        return <RegisterForm />;
      }
      return <h1>Neka greska</h1>;
    }
  }
  render() {
    //console.log(this.props);
    return this.renderContent();
  }
}

export default PreviewPage;
