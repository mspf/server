import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Questions } from '../api/questions.js'
 
export default class Question extends Component {
  constructor(props) {
    super(props);
    this.deleteThisQuestion = this.deleteThisQuestion.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
  }
  updatePriority(e) {
    Meteor.call('questions.priority.update', this.props.question._id, Number(e.currentTarget.value));
  }
  deleteThisQuestion() {
    Meteor.call('questions.remove', this.props.question._id);
  }
  render() {
    let priority = this.props.question.priority || '';
    return (
      <li>
        <div className="row">
          <div className="col-lg-2">
            <select value={priority.toString()}
                    onChange={this.updatePriority} >
              <option value='0'>Urgent</option>
              <option value='1'>High</option>
              <option value='2'>Medium</option>
              <option value='3'>Low</option>
            </select>
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
