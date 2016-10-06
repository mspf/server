import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '/imports/ui/App.jsx';
import Results from '/imports/ui/results.jsx';
import HomeView from '/imports/ui/home.jsx';

import { Router, browserHistory, Route, IndexRoute } from 'react-router';


Meteor.startup(() => {
  Meteor.subscribe('questions');

  render((
    <Router history={browserHistory} >
      <Route path="/" component={HomeView} />
      <Route path="/results" component={Results} />
      <Route path="/admin" component={App} />
      <Route path="*" component={Results} />
    </Router>
  ), document.getElementById('render-target'));
});
