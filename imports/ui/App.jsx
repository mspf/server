import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Questions } from '../api/questions.js';
 
import Question from './Question.jsx';
 
class App extends Component {
  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }

  handleSubmit(event) {
    event.preventDefault();

    Questions.insert({
      text: this.questionInput.value.trim(),
      optionA: this.optionAInput.value.trim(),
      optionB: this.optionBInput.value.trim(),
      createdAt: new Date(), // current time
    });

    // Clear form
    this.questionInput.value = '';
    this.optionAInput.value = '';
    this.optionBInput.value = '';
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
            ref={ref => this.questionInput = ref}
            placeholder='Type to add new questions'
          />

          <input
            type='text'
            ref={ref => this.optionAInput = ref}
            placeholder='Option A'
          />

          <input
            type='text'
            ref={ref => this.optionBInput = ref}
            placeholder='Option B'
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
    { _id: 1, text: 'Are you a Robot?', optionA: 'Yes', optionB: 'No' },
    { _id: 2, text: 'Trump or Clinton?', optionA: 'Trump', optionB: 'Clinton' },
  ]
};
 
export default createContainer(() => {
  return {
    questions: Questions.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
