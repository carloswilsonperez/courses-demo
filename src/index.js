import './index.css';

import * as serviceWorker from './serviceWorker';

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {
  isLoading,
  isOn,
  modules,
  topics
} from './reducers';

import App from './App';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { loadingBarReducer } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  isLoading,
  modules,
  topics,
  isOn,
  loadingBar: loadingBarReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
