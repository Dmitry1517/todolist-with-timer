/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
    label: "",
    labelMin: "",
    labelSec: ""
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  onLabelMinChange = (event) => {
    this.setState({
      labelMin: event.target.value
    });
  };

  onLabelSecChange = (event) => {
    this.setState({
      labelSec: event.target.value
    });
  };

  onSubmit = (event) => {
    const { addItem } = this.props;
    const { label, labelMin, labelSec } = this.state;
    event.preventDefault();
    if (label.trim() !== "" && labelMin !== "" && labelSec !== "") {
      addItem(label, labelMin, labelSec);
      this.setState({
        label: "",
        labelMin: "",
        labelSec: ""
      });
    }
  };

  render() {
    const { placeholder } = this.props;
    const { label, labelMin, labelSec } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder={placeholder}
          onChange={(event) => this.onLabelChange(event)}
          value={label}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(event) => this.onLabelMinChange(event)}
          autoFocus
          value={labelMin}
          type="number"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(event) => this.onLabelSecChange(event)}
          autoFocus
          value={labelSec}
          type="number"
        />
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
