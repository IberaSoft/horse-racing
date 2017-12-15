import React from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import LandingPage from './landing';
import RacePage from './race';

export const render = ({store, history}) => <Provider store={store}>
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/:pageCode" component={RacePage}/>
    </div>
  </ConnectedRouter>
</Provider>;
