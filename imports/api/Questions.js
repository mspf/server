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
  createdAt: {
    type: Date,
    label: "when the question was created",
  },
});

Questions.attachSchema(QuestionSchema);

Meteor.methods({
  'questions.insert'(text, optionA, optionB) {
    check(text, String);
    check(optionA, String);
    check(optionB, String);

    Questions.insert({
      text,
      optionA,
      optionB,
      createdAt: new Date(),
    });
  },
  'questions.remove'(questionId) {
    check(questionId, String);
    Questions.remove(questionId);
  },
});

// debuging
if (Meteor.isClient) {
  window.Questions = Questions;
}
