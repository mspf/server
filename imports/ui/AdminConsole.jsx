import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Questions } from '../api/questions.js';
import Question from './Question.jsx';
import QuestionForm from './QuestionForm.jsx';

class AdminConsole extends TrackerReact(Component) {
  constructor(props) {
    super(props);
  }

  renderQuestions() {
    let questions = Questions.find().fetch();
    return questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }

  render() {
    return (
      <div className='admin container'>
        <header>
          <h1>MSPF VWYF Admin</h1>
        </header>

        <QuestionForm />

        <ul>
          {this.renderQuestions()}
        </ul>
      </div>
    );
  }
}

AdminConsole.propTypes = {
  questions: PropTypes.array.isRequired,
};

AdminConsole.defaultProps = {
  questions: []
};

export default AdminConsole;
