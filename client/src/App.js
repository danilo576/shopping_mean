import './App.css';
import Register from './components/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Products from './components/Products';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/products' component={Products} />
      </Router>
    </div>
  );
}

export default App;
