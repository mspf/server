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

//Questions.attachSchema(QuestionSchema);

Meteor.methods({
  'questions.insert'(data) {
    check(data, Object);

    Object.assign(data, {createdAt: new Date(), count: {A: 0, B: 0} });
    Questions.insert(data);
  },
  'questions.remove'(questionId) {
    check(questionId, String);
    Questions.remove(questionId);
  },
  'questions.priority.update'(questionId, priority) {
    check(questionId, String);
    check(priority, Number);
    Questions.update({_id: questionId}, {$set: {priority}});
  },
  'questions.content.update'(questionId, data) {
    check(questionId, String);
    check(data, Object);
    Questions.update({_id: questionId}, {$set: data});
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
