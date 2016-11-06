import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AdminConsole from '/imports/ui/AdminConsole.jsx';
import { ResultsView } from '/imports/ui/Results.jsx';
import HomeView from '/imports/ui/Home.jsx';

import { Router, browserHistory, Route, IndexRoute } from 'react-router';


Meteor.startup(() => {
  Meteor.subscribe('questions');

  render((
    <Router history={browserHistory} >
      <Route path="/" component={HomeView} />
      <Route path="/results" component={ResultsView} />
      <Route path="/admin" component={AdminConsole} />
      <Route path="*" component={HomeView} />
    </Router>
  ), document.getElementById('render-target'));
})  
