import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Questions } from '../api/questions.js'

import InlineTextEditor from './inline_text_editor.jsx'

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.deleteThisQuestion = this.deleteThisQuestion.bind(this);
    this.updatePriority = this.updatePriority.bind(this);
    this.updateText = this.updateText.bind(this);
  }
  updatePriority(e) {
    if (Meteor.userId()) {
      Meteor.call('questions.priority.update',
        this.props.question._id,
        Number(e.currentTarget.value));
    } else {
      alert('Please login');
    }
  }
  deleteThisQuestion() {
    if (Meteor.userId()) {
      Meteor.call('questions.remove', this.props.question._id);
    } else {
      alert('Please login');
    }
  }
  updateText(type, content) {
    if (Meteor.userId()) {
      Meteor.call('questions.content.update',
        this.props.question._id,
        {[type]: content});
    } else {
      alert('Please login');
    }
  }
  render() {
    let priority = this.props.question.priority || '';
    return (
      <li>
        <div className="row">
          <div className="col-md-2">
            <select value={priority.toString()}
                    onChange={this.updatePriority} >
              <option value='0'>Urgent</option>
              <option value='1'>High</option>
              <option value='2'>Medium</option>
              <option value='3'>Low</option>
            </select>
          </div>
          <div className="col-md-4">
            <InlineTextEditor text={this.props.question.text}
                              type={'text'}
                              updateMethod={this.updateText} />
          </div>
          <div className="col-md-2">
            <InlineTextEditor text={this.props.question.optionA}
                              type={'optionA'}
                              prefix={'A. '}
                              updateMethod={this.updateText} />
          </div>
          <div className="col-md-2">
            <InlineTextEditor text={this.props.question.optionB}
                              type={'optionB'}
                              prefix={'B. '}
                              updateMethod={this.updateText} />
          </div>
          <div className="col-md-2">
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
