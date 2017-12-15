import './styles/bulma.global.scss';
import './styles/custom.global.scss';
import ReactDOM from 'react-dom';

import jquery from 'jquery';

global.$ = jquery;
global.JQuery = jquery;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import reducers from './app/reducers';

const history = createHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(
    routerMiddleware(history)
  )
);

const root = document.createElement('div');
document.body.appendChild(root);

function renderApp(){
  ReactDOM.render(
    require('./app').render({history, store}),
    root
  );
}

if(module.hot){

  module.hot.accept('./app', renderApp);

  module.hot.accept('./app/reducers', () => {
    const reducers = require('./app/reducers').default;

    store.replaceReducer(combineReducers({
      ...reducers,
      router: routerReducer
    }));
  });

}

renderApp();
