import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store/index';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0rp8RkSXjYaJDLVNFD__FsO1wzLWdTeA",
    authDomain: "panacloud-guru.firebaseapp.com",
    databaseURL: "https://panacloud-guru.firebaseio.com",
    projectId: "panacloud-guru",
    storageBucket: "",
    messagingSenderId: "270679089338"
  };
  firebase.initializeApp(config);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
