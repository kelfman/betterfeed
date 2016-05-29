import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import App from './components/AppContainer.jsx';

// var PostListView = require('./components/PostListView.jsx');
// var SinglePostView = require('./components/SinglePostView.jsx');

export default {
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
    </Route>
  </Router>
};
