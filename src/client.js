import Iso from 'iso';
import Router from 'react-router';
import {render} from 'react-dom';

var React = require('react/addons');
var routes = require('./routes.jsx');
var alt = require('./alt');

window.onload = function() {
  Iso.bootstrap(function(state, meta, container) {
    alt.bootstrap(state);


    Router.run(routes, Router.HistoryLocation, function(Handler) {
      var node = React.createElement(Handler);
      React.render(node, container);
    });
  });
}
