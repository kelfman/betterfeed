import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import routes from './routes.jsx';
import AppContainer from './components/AppContainer.jsx';


window.onload = function() {
  Iso.bootstrap(function(state, meta, container) {
    alt.bootstrap(state);
    render(routes, container);
});
