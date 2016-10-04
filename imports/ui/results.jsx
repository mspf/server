import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Questions } from '../api/questions.js';

const ResultItem = ({question}) =>
  (<li>
      <div className="row">
        <div className="col-lg-4">
          {question.text}
        </div>
        <div className="col-lg-8">
          <div className="col-lg-12">
            <div className="col-lg-9">
              {question.optionA}
            </div>
            <div className="col-lg-3">
              {question.count && question.count.A || 0}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="col-lg-9">
              {question.optionB}
            </div>
            <div className="col-lg-3">
              {question.count && question.count.B || 0}
            </div>
          </div>
        </div>
      </div>
  </li>);

class Results extends TrackerReact(React.Component) {
  renderResults() {
    let questions = Questions.find().fetch();

    console.log(questions);

    return questions.map((question) => <ResultItem question={question} />);
  }
  render() {
    let results = this.renderResults();
    console.log(results);
    return (
      <div className="container">
        <header>
          <h1>VWYF Answers</h1>
        </header>
        <ul style={{
            listStylePosition: 'inside',
            borderWidth: '1px',
            borderColor: '#9d9d9d',
            borderStyle: 'solid'}}>
          {results}
        </ul>
      </div>
    );
  }
}

export default Results;
