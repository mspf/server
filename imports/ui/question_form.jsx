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

    if (Meteor.userId()) {
      Meteor.call('questions.insert', data);
    } else {
      alert('Please login');
    }

    // Clear form
    this.questionInput.value = '';
    this.optionAInput.value = '';
    this.optionBInput.value = '';
    this.selectPriority.value = '';
  }
  render() {
    return (
      <form className='new-question row' onSubmit={this.handleSubmit} >

        <div className="col-md-2">
          <select
            defaultValue='2'
            ref={ref => this.selectPriority = ref}>
            <option value='0'>Urgent</option>
            <option value='1'>High</option>
            <option value='2'>Medium</option>
            <option value='3'>Low</option>
          </select>
        </div>

        <div className="col-md-4">
          <input
            type='text'
            ref={ref => this.questionInput = ref}
            placeholder='Type to add new questions'
          />
        </div>

        <div className="col-md-2">
          <input
            type='text'
            ref={ref => this.optionAInput = ref}
            placeholder='Option A'
          />
        </div>

        <div className="col-md-2">
          <input
            type='text'
            ref={ref => this.optionBInput = ref}
            placeholder='Option B'
          />
        </div>

        <div className='col-md-2'>
          <button className='btn btn-default add-btn'>Add</button>
        </div>
      </form>
    );
  }
}

export default QuestionForm;
