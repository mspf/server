import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Questions } from '../api/questions.js';
import Question from './Question.jsx'; //component
import QuestionForm from './question_form.jsx';
 
class App extends Component {
  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }
  render() {
    return (
      <div className='container'>
        <header>
          <h1>VWYF Questions</h1>
        </header>
 
        <ul>
          {this.renderQuestions()}
        </ul>

        <QuestionForm />
      </div>
    );
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired,
};

App.defaultProps = {
  questions: [
    { _id: 1, text: 'Are you a Robot?', optionA: 'Yes', optionB: 'No' },
    { _id: 2, text: 'Trump or Clinton?', optionA: 'Trump', optionB: 'Clinton' },
  ]
};
 
export default createContainer(() => {
  Meteor.subscribe('questions');

  return {
    questions: Questions.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
