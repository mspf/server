import React from 'react';
import { Meteor } from 'meteor/meteor';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const self = this;
    const data = {
      text: self.questionInput.value.trim(),
      optionA: self.optionAInput.value.trim(),
      optionB: self.optionBInput.value.trim(),
      priority: Number(self.selectPriority.value),
    }

    Meteor.call('questions.insert', data);

    // Clear form
    this.questionInput.value = '';
    this.optionAInput.value = '';
    this.optionBInput.value = '';
    this.selectPriority.value = '';
  }
  render() {
    return (
      <form className='new-question' onSubmit={this.handleSubmit} >
        <input
          className="question-input"
          type='text'
          ref={ref => this.questionInput = ref}
          placeholder='Type to add new questions'
        />
        <input
          className="option-input"
          type='text'
          ref={ref => this.optionAInput = ref}
          placeholder='Option A'
        />
        <input
          className="option-input"
          type='text'
          ref={ref => this.optionBInput = ref}
          placeholder='Option B'
        />
        <select
          className="select-input"
          ref={ref => this.selectPriority = ref}>
          <option value='0'>Urgent</option>
          <option value='1'>High</option>
          <option value='2'>Medium</option>
          <option value='3'>Low</option>
        </select>

        <button className='btn btn-default'>Add</button>
      </form>
    );
  }
}

export default QuestionForm;
