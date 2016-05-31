import React from 'react';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import AppContainer from './components/AppContainer.jsx';
import FeedPage from './components/pages/FeedPage.jsx';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={FeedPage}/>
    </Route>
  </Router>
);
