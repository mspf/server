import React, { Component, PropTypes } from 'react';
 
export default class Question extends Component {
  render() {
    return (
      <li>
        {this.props.question.text}
        <span className='answer'>A. {this.props.question.a1}</span>
        <span className='answer'>B. {this.props.question.a2}</span>
      </li>
    );
  }
}
 
Question.propTypes = {
  question: PropTypes.object.isRequired,
};
