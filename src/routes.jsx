import React from 'react';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import AppContainer from './components/AppContainer.jsx';
import FeedPage from './components/pages/FeedPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import PostPage from './components/pages/PostPage.jsx';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={AppContainer}>
      <Route path='' component={FeedPage}>
        <Route path='post' component={PostPage}/>
      </Route>
      <Route path='login' component={LoginPage}/>
      <IndexRoute component={FeedPage}/>
    </Route>
  </Router>
);
