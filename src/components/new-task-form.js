/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  state = {
    label: ""
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  onSubmit = (event) => {
    const { addItem } = this.props;
    const { label } = this.state;
    event.preventDefault();
    addItem(label);
    this.setState({
      label: ""
    });
  };

  render() {
    const { placeholder } = this.props;
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder={placeholder}
          onChange={(event) => this.onLabelChange(event)}
          value={label}
          autoFocus
        />
        <input className="new-todo-form__timer" placeholder="Min" autoFocus />
        <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
        <button type="submit"></button>
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
  placeholder: PropTypes.string
};

NewTaskForm.defaultProps = {
  placeholder: "What needs to be done?"
};
