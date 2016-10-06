import { Meteor } from 'meteor/meteor';
import bodyParser from 'body-parser';

import { Questions } from './questions.js';
import { Answers } from './answers.js';
import { tweetNewAnswers } from './tweet.js';

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Picker.route('/questions', function(params, req, res) {
  const questions = Questions.find({}, { sort: { createdAt: -1 } }).fetch();
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(questions));
});

Picker.route('/answers', function(params, req, res, next) {
  req.body.forEach(answer => {
    Answers.insert({
      questionId: answer.questionId,
      answer: answer.answer,
      createdAt: new Date(parseInt(answer.createdAt)),
    });
    Questions.update({_id: answer.questionId}, {$inc: {['count.' + answer.answer]: 1}});
    Questions.update({_id: answer.questionId}, {$set: {'lastUpdatedAt': new Date()}});
  });

	tweetNewAnswers(req.body);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('OK');
});
