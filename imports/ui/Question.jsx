import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Questions } from '../api/questions.js'
 
export default class Question extends Component {

  constructor(props) {
    super(props);
    this.deleteThisQuestion = this.deleteThisQuestion.bind(this);
  }

  deleteThisQuestion() {
    Meteor.call('questions.remove', this.props.question._id);
  }

  render() {
    let priority = '';
    switch (this.props.question.priority) {
      case 0:
        priority = "Urgent";
        break;
      case 1:
        priority = "High";
        break;
      case 2:
        priority = "Medium";
        break;
      case 3:
        priority = "Low";
        break;
    }
    console.log(this.props.question.priority, priority);
    return (
      <li>
        <div className="row">
          <div className="col-lg-2">
            <span className='priority'>{priority}</span>
          </div>
          <div className="col-lg-4">
            {this.props.question.text}
          </div>
          <div className="col-lg-2">
            <span className='answer'>A. {this.props.question.optionA}</span>
          </div>
          <div className="col-lg-2">
            <span className='answer'>B. {this.props.question.optionB}</span>
          </div>
          <div className="col-lg-2">
            <button className="delete" onClick={this.deleteThisQuestion}>
              &times;
            </button>
          </div>
        </div>
      </li>
    );
  }
}
 
Question.propTypes = {
  question: PropTypes.object.isRequired,
};
