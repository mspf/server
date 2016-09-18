import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Questions } from '../api/Questions.js';
 
import Question from './Question.jsx';
 
class App extends Component {
  renderQuestions() {
    this.props.questions.forEach(console.log);
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }

  handleSubmit(event) {
    event.preventDefault();

    Questions.insert({
      text: this.inputQuestion.value.trim(),
      a1: this.inputAnswerA.value.trim(),
      a2: this.inputAnswerB.value.trim(),
      createdAt: new Date(), // current time
    });

    // Clear form
    this.inputQuestion.value = '';
    this.inputAnswerA.value = '';
    this.inputAnswerB.value = '';
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

        <form className='new-question' onSubmit={this.handleSubmit.bind(this)} >
          <input
            type='text'
            ref={ref => this.inputQuestion = ref}
            placeholder='Type to add new questions'
          />

          <input
            type='text'
            ref={ref => this.inputAnswerA = ref}
            placeholder='Answer A'
          />

          <input
            type='text'
            ref={ref => this.inputAnswerB = ref}
            placeholder='Answer B'
          />
        
          <button className='btn'>Add</button>
        </form>
      </div>
    );
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired,
};

App.defaultProps = {
  questions: [
    { _id: 1, text: 'Are you a robot?', a1: 'Yes', a2: 'No' },
    { _id: 2, text: 'Trump or Hillary?', a1: 'Trump', a2: 'Hillary' }
  ]
};
 
export default createContainer(() => {
  return {
    questions: Questions.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
