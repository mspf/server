import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Questions } from './questions.js';
import { Answers } from './answers.js';

Meteor.methods({
  'questions.insert'(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(data, Object);

    Object.assign(data, {createdAt: new Date(), count: {A: 0, B: 0} });
    Questions.insert(data);
  },
  'questions.remove'(questionId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(questionId, String);
    Questions.remove(questionId);
    Answers.remove({questionId: questionId});
  },
  'questions.priority.update'(questionId, priority) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(questionId, String);
    check(priority, Number);
    Questions.update({_id: questionId}, {$set: {priority}});
  },
  'questions.content.update'(questionId, data) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(questionId, String);
    check(data, Object);
    Questions.update({_id: questionId}, {$set: data});
  },
  'questions.reset'(questionId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Questions.update({_id: questionId}, {$set: {'count.A': 0, 'count.B': 0}});
    Answers.remove({questionId: questionId});
  },
  'answers.count'() {
    return Answers.find().count();
  }
});

