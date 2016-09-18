import { Meteor } from 'meteor/meteor';

import { Questions } from './questions.js';

if (Meteor.isServer) {
  const RasPiApi = new Restivus({
    authRequired: false, // :P
    prettyJson: true,
  });

  RasPiApi.addRoute('questions', {
    get: function() {
      return Questions.find({}, { sort: { createdAt: -1 } });
    }
  });
}
