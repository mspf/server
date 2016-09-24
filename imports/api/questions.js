import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Questions = new Mongo.Collection('questions');

// Define the schema
const QuestionSchema = new SimpleSchema({
  text: {
    type: String,
    label: "Question Description",
    max: 200,
  },
  optionA: {
    type: String,
    label: "Option A",
    min: 0,
    max: 15,
  },
  optionB: {
    type: String,
    label: "Option B",
    min: 0,
    max: 15,
  },
  priority: {
    type: Number,
    label: "Priority",
  },
  createdAt: {
    type: Date,
    label: "when the question was created",
  },
});

Questions.attachSchema(QuestionSchema);

Meteor.methods({
  'questions.insert'(data) {
    check(data, Object);

    let obj = Object.assign(data, {createdAt: new Date()});
    Questions.insert(obj);
  },
  'questions.remove'(questionId) {
    check(questionId, String);
    Questions.remove(questionId);
  },
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('questions', function questionsPublication() {
    return Questions.find({}, { sort: { createdAt: -1 } });
  });
}

// debuging
if (Meteor.isClient) {
  window.Questions = Questions;
}
