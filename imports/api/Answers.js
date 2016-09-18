import { Mongo } from 'meteor/mongo';
 
export const Answers = new Mongo.Collection('answers');

// debuging
if (Meteor.isClient) {
  window.Answers = Answers;
}
