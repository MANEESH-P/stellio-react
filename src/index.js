import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { saveState, getState } from './redux/store/localStore';
import reducers from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import browserMediaNotification from './utilities/media-session';

getState().then((localState) => {
  let store;
  store = createStore(reducers, localState, composeWithDevTools());
  browserMediaNotification.setStore(store);
  store.subscribe(() => {
    saveState({
      songs: store.getState().songs,
      recentlyPlayed: store.getState().recentlyPlayed,
    });
  });

  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
