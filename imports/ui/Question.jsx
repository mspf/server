import React, { Component, PropTypes } from 'react';

import { Questions } from '../api/questions.js'
 
export default class Question extends Component {

  constructor(props) {
    super(props);
    this.deleteThisQuestion = this.deleteThisQuestion.bind(this);
  }

  deleteThisQuestion() {
    Questions.remove(this.props.question._id);
  }

  render() {
    return (
      <li>
        <button className="delete" onClick={this.deleteThisQuestion}>
          &times;
        </button>

        {this.props.question.text}
        <span className='answer'>A. {this.props.question.optionA}</span>
        <span className='answer'>B. {this.props.question.optionB}</span>
      </li>
    );
  }
}
 
Question.propTypes = {
  question: PropTypes.object.isRequired,
};
