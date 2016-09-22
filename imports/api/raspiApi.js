import { Meteor } from 'meteor/meteor';
import bodyParser from 'body-parser';

import { Questions } from './questions.js';
import { Answers } from './answers.js';

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Picker.route('/questions', function(params, req, res) {
  const questions = Questions.find({}, { sort: { createdAt: -1 } }).fetch();
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(questions));
});

Picker.route('/results', function(params, req, res, next) {
  assert(_.isArray(req.body))

  req.body.forEach(answer => {
    Answers.insert({
      questionId: answer.questionId,
      answer: answer.answer,
      createdAt: new Date(answer.createdAt),
    });
  });

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('OK');
});
