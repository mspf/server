import { Mongo } from 'meteor/mongo';
 
export const Answers = new Mongo.Collection('answers');

const AnswerSchema = new SimpleSchema({
  questionId: {
    type: String,
    label: "Question Answsered",
  },
  answer: {
    type: String,
    label: "Answer",
    allowedValues: ['A', 'B'],
  },
  createdAt: {
    type: Date,
    label: "when the answer was created",
  },
});

Answers.attachSchema(AnswerSchema);

// debuging
if (Meteor.isClient) {
  window.Answers = Answers;
}
