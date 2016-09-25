import React from 'react';

class InlineTextEditor extends React.Component {
  constructor(props) {
    super();
    this.state = {visible: false};
    this.toggle = this.toggle.bind(this);
    this.updateChange = this.updateChange.bind(this);
  }
  updateChange(e) {
    this.props.updateMethod(this.props.type, e.currentTarget.value.trim());
    this.toggle();
  }
  toggle(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    let visible = this.state.visible ? false : true;
    this.setState({visible});
  }
  render() {
    let content = (
      <a onClick={this.toggle}>
        <span>{this.props.prefix}{this.props.text}</span>
      </a>
    );
    if (this.state.visible) {
      content = (
        <input type="text" onBlur={this.updateChange} defaultValue={this.props.text} />
      );
    }
    return (
      <div>  
        {content}
      </div>  
    );
  }
}

InlineTextEditor.propTypes = {
  text: React.PropTypes.string,
  type: React.PropTypes.string,
  prefix: React.PropTypes.string,
  updateMethod: React.PropTypes.func,
};

InlineTextEditor.defaultTypes = {
  text: '',
  prefix: '',
  type: 'text',
  updateMethod: () => {},
};

export default InlineTextEditor;
