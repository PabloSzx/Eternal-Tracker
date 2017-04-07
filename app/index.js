import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import './app.global.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);


const firebase = require('firebase');

firebase.initializeApp({
  apiKey: 'AIzaSyBO9sEGNVIX4vaWT-j7Km9HoZ4P8biTqSw',
  authDomain: 'eternal-tracker.firebaseapp.com',
  databaseURL: 'https://eternal-tracker.firebaseio.com',
  projectId: 'eternal-tracker',
  storageBucket: 'eternal-tracker.appspot.com',
  messagingSenderId: '14424380151'
});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
