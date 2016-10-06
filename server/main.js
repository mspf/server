import { Meteor } from 'meteor/meteor';
import '../imports/api/questions.js';
import '../imports/api/raspiApi.js';
import '../imports/api/methods.js';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (Meteor.users.find().count() < 1) {
    Accounts.createUser({
      username: 'vwyf',
      email: 'vwyf@vwyf.com',
      password: 'vwyf2016',
      profile: {},
    });
  }
});
