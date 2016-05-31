import alt from './alt.js';
import Iso from 'iso';
import React from 'react';
import {render} from 'react-dom';
import routes from './routes.jsx';

window.onload = function() {
  Iso.bootstrap(function(state, container) {
    alt.bootstrap(state);
    render(routes, container);
  });
};
