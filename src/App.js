import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from 'firebase';
import AuthActions from './store/actions/authActions';
import AuthMiddleware from './store/middleware/authMiddleware';
import SignIn from './container/SignIn/signin';
import SignUp from './container/SignUp/signup';
import SignBtn from './container/SignBtn/signbtn';
import Home from './container/Home/home';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h2>Quiz App</h2>
            <Route path="/signup" component={SignBtn} />
            <Route exact path="/" component={SignBtn} />
          </div>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
