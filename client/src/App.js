import './App.css';
import Register from './components/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Router>
    </div>
  );
}

export default App;
