import Twit from 'twit';
import * as lodash from 'lodash';

import { Questions } from './questions.js';

const TwitterClient = new Twit({
  consumer_key: '_your_twitter_credential_',
  consumer_secret: '_your_twitter_credential_',
  access_token: '_your_twitter_credential_',
  access_token_secret: '_your_twitter_credential_',
  timeout_ms: 60 * 1000,
});

function getQuestionText(question) {
  if (question.text === '?') {
    return `${question.optionA} or ${question.optionB}?`
  }
  return question.text;
}

const hashtag = '#VoteWithYourFeet ';

function tweetQuestionStatus(questionId) {
  let question = Questions.findOne({_id: questionId});
  if (question) {
    let status = hashtag +
      'Q: ' +
      lodash.truncate(getQuestionText(question), {length: 32}) +
      '? ' +
      lodash.truncate(question.optionA, {length: 20}) +
      ': ' +
      (question.count && question.count.A || '0') +
      ', ' +
      lodash.truncate(question.optionB, {length: 20}) +
      ': ' +
      (question.count && question.count.B || '0') +
      ' VoteWithYourFeet.org';

    TwitterClient.post('statuses/update', {status}, (err, data, res) => {
      console.log('success post to twitter');
    });
  }
};

export function tweetNewAnswers(answers) {
  const questionIds = lodash.uniq(answers.map(ans => ans.questionId));
  questionIds.forEach(tweetQuestionStatus)
}
