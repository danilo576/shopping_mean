import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import PreviewPage from './PreviewPage';
import Header from './Header';
import Forget from './Forget';
import Reset from './Reset';
import Vladanje from './Ucenik/Vladanje';
import Dogadjaji from './Ucenik/Dogadjaji';
import Raspored from './Ucenik/Raspored';
import Ocene from './Ucenik/Ocene';
import PromenaLozinke from './Ucenik/PromenaLozinke';
import Forum from './Ucenik/Forum';
import Glavna from './Ucenik/Glavna';
import Izostanci from './Ucenik/Izostanci';
import axios from 'axios';
import Header2 from './Header2';
import Odeljenje from './Profesor/Odeljenje';
import Statistika from './Profesor/Statistika';
import Prisutni from './Profesor/Prisutni';
import InfoiKontakt from './Ucenik/InfoiKontakt';
import StranaZaOpravdavanje from './Profesor/StranaZaOpravdavanje';

const Landing = () => {
  return (
    <div>
      <header className='animated-header'>
        {/* <div className="loading">Waiting for "load" event...</div> */}
        <div className='earth'>
          <img src='https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-03.png' />
        </div>
        <div className='moon'>
          <img src='https://cdn.pixabay.com/photo/2013/07/12/12/18/calligraphy-145521_960_720.png' />
        </div>
      </header>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      ucenik: null,
    };
  }

  componentDidMount() {
    axios
      .get('/api/current_user')
      .then((res) => {
        this.setState({ response: res.data || false });
      })
      .then(() => {
        if (this.state.response)
          axios
            .get(
              'http://localhost:5000/DeteEmail/' + this.state.response.username
            )
            .then((ucenikRes) => {
              this.setState((prevState) => ({
                ...prevState,
                ucenik: ucenikRes.data,
              }));
            });
      });
  }

  render() {
    document.body.classList.add('js-loading');

    window.addEventListener('load', showPage, false);

    function showPage() {
      document.body.classList.remove('js-loading');
    }

    if (this.state.response == null) {
      return <span>Loading...</span>;
    }

    return (
      <div>
        <BrowserRouter>
          <div>
            {/* {!this.state.response ? <Header2 /> : this.state.response.type=="ucenik" ? <Header /> : null } */}
            {this.state.response.type == 'ucenik' ||
            this.state.response.type == 'roditelj' ? (
              <Header
                ucenik={this.state.ucenik}
                response={this.state.response}
              />
            ) : null}
            {!this.state.response ? <Header2 /> : null}
            <Route exact path='/' component={Glavna}>
              {' '}
              {this.state.response ? <Redirect to='/preview' /> : <Landing />}
            </Route>
            <Route exact path='/login' component={LoginForm} />
            {/* <Route exact path="/register" component={RegisterForm}/> */}
            <Route
              exact
              path='/preview'
              ucenik={this.state.ucenik}
              response={this.state.response}
              render={(props) => (
                <PreviewPage {...props} response={this.state.response} />
              )}
            />

            <Route
              exact
              path='/Forum'
              render={(props) => (
                <Forum {...props} infoKorisnika={this.state.response} />
              )}
            />
            <Route
              exact
              path='/Izostanci'
              render={(props) => (
                <Izostanci {...props} infoKorisnika={this.state.response} />
              )}
            />
            <Route
              exact
              path='/Vladanje'
              render={(props) => (
                <Vladanje {...props} infoKorisnika={this.state.response} />
              )}
            />
            <Route
              exact
              path='/Raspored'
              render={(props) => (
                <Raspored {...props} infoKorisnika={this.state.response} />
              )}
            />
            <Route
              exact
              path='/Dogadjaji'
              render={(props) => (
                <Dogadjaji {...props} infoKorisnika={this.state.response} />
              )}
            />
            <Route
              exact
              path='/Ocene'
              render={(props) => (
                <Ocene {...props} infoKorisnika={this.state.response} />
              )}
            />
            <Route exact path='/PromenaLozinke' component={PromenaLozinke} />
            <Route
              exact
              path='/InfoiKontakt'
              render={(props) => (
                <InfoiKontakt {...props} infoKorisnika={this.state.response} />
              )}
            />

            <Route exact path='/Forget' component={Forget} />
            <Route path='/Reset' component={Reset} />

            <Route
              path='/Odeljenje/:god/:ode/:pred/:raz/:godR/:odeR'
              exact
              component={Odeljenje}
            />
            <Route
              path='/Statistika/:id/:predmet'
              exact
              component={Statistika}
            />
            <Route
              path='/Prisutni/:god/:ode/:pred'
              exact
              component={Prisutni}
            />
            <Route
              path='/StranaZaOpravdavanje/:god/:ode/:idprofe'
              exact
              component={StranaZaOpravdavanje}
            />
            {/* <Footer /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
