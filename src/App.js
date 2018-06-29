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
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.clearstate(); 
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: 232064780897684,
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v3.0'
      });
      window.FB.getLoginStatus((res) => {
        console.log(res)
          this.props.token(res);
      })
      window.FB.Event.subscribe('auth.statusChange');
    };
  }

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
          <Route path="/:id" component={Home} />
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    user: state,
    loader: state.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    clearstate: () => { dispatch(AuthActions.ClearState()) },
    token: (response) => { dispatch(AuthMiddleware.accessTokenMiddleware(response)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

