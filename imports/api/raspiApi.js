import { Meteor } from 'meteor/meteor';
import bodyParser from 'body-parser';

import { Questions } from './questions.js';
import { Answers } from './answers.js';

import Twit from 'twit';
import * as lodash from 'lodash';

const TwitterClient = new Twit({
  consumer_key: '_your_twitter_credential_',
  consumer_secret: '_your_twitter_credential_',
  access_token: '_your_twitter_credential_',
  access_token_secret: '_your_twitter_credential_',
  timeout_ms: 60 * 1000,
});

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

Picker.route('/questions', function(params, req, res) {
  const questions = Questions.find({}, { sort: { createdAt: -1 } }).fetch();
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(questions));
});

Picker.route('/answers', function(params, req, res, next) {
  //assert(_.isArray(req.body));
  let questionList = [];

  req.body.forEach(answer => {
    Answers.insert({
      questionId: answer.questionId,
      answer: answer.answer,
      createdAt: new Date(parseInt(answer.createdAt)),
    });
    questionList.push(answer.questionId);
    Questions.update({_id: answer.questionId}, {$inc: {['count.' + answer.answer]: 1}});
  });

  let tweetList = lodash.uniq(questionList);

  let hashtag = '#VoteWithYourFeet ';
  tweetList.forEach(questionId => {
    let question = Questions.findOne({_id: questionId});
    if (question) {
      let status = hashtag +
        'Q: ' +
        lodash.truncate(question.text, {length: 43}) +
        '? ' +
        lodash.truncate(question.optionA, {length: 20}) +
        ': ' +
        (question.count && question.count.A || '0') +
        ', ' +
        lodash.truncate(question.optionB, {length: 20}) +
        ': ' +
        (question.count && question.count.B || '0') +
        ' vwyf.1x1.cm';

      TwitterClient.post('statuses/update', {status}, (err, data, res) => {
        console.log('success post to twitter');
      });
    }
  });


  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('OK');
});
