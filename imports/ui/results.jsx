import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Questions } from '../api/questions.js';

const ResultItem = ({question}) =>
  (<div className="results-wrapper col-md-4">
      <h1>{question.text}</h1>
      <div className="row">
          <span>{question.optionA}</span>
          <span>{question.optionB}</span>
      </div>
      <div className="row">
          {question.count && question.count.A || 0}
          {question.count && question.count.B || 0}
      </div>
  </div>);

class Results extends TrackerReact(React.Component) {

  renderResults() {
    let questions = Questions.find().fetch();
    return questions.map(question => <ResultItem key={question.id} question={question} />);
  }

  render() {
    return (
      <div className="container">
        <header>
          <a href='http://test.com/link_to_google_form' target='_blank'>SUBMIT QUESTIONS</a>
        </header>
        <ul>
          {this.renderResults()}
        </ul>
      </div>
    );
  }
}

export default Results;
