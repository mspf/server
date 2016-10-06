import React from 'react';
import _ from 'lodash'
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Questions } from '../api/questions.js';

const ResultItem = ({question}) =>
  (<div className='col-md-4'>
    <div className='result-wrapper'>
      <h1>{question.text}</h1>
      <div className="">
        <span>{question.optionA}</span>
        <span>{question.optionB}</span>
        {question.count && question.count.A || 0}
        {question.count && question.count.B || 0}
      </div>
    </div>
  </div>);

const ResultsRow = ({questions}) => (
  <div className='row results-row'>
    {questions.map(question => <ResultItem key={question.id} question={question} />)}
  </div>);

class Results extends TrackerReact(React.Component) {

  renderResults() {
    let questions = Questions.find().fetch();
    return _.chunk(questions, 3).map(
      (threeQuestions, i) => <ResultsRow key={i} questions={threeQuestions} />);
  }

  render() {
    return (
      <div className="main container-fluid">
        <header>
          <a href='http://test.com/link_to_google_form' target='_blank'>SUBMIT QUESTIONS</a>
        </header>
        <div className='container all-results-wrapper'>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

export default Results;
