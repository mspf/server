import React from 'react';
import _ from 'lodash'
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Questions } from '../api/questions.js';

const GOOGLE_FORM_LINK = 'https://goo.gl/forms/lf9dBVNkjt0ixVmn2';

const ResultItem = ({question}) =>
  (<div className='col-md-4'>
    <div className='result-wrapper'>
      <h1>{question.text}</h1>
      <div className="">
        <span>{question.optionA}: {question.count && question.count.A || 0}</span>
        <span>{question.optionB}: {question.count && question.count.B || 0}</span>
      </div>
    </div>
  </div>);

const ResultsRow = ({questions}) => (
  <div className='results-row'>
    <div className='container'>
      <div className='row'>
        {questions.map(question => <ResultItem key={question.id} question={question} />)}
      </div>
    </div>
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
          <a className='title' href='/' target='_blank'>#VoteWithYourFeet</a>
          <a className='submit' href={GOOGLE_FORM_LINK} target='_blank'>SUBMIT QUESTIONS</a>
        </header>
        <div className='all-results-wrapper'>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

export default Results;
