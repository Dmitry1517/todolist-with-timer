/* eslint-disable import/extensions */
/* eslint-disable react/state-in-constructor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

export default class Task extends Component {
  state = {
    label: this.props.labelText,
    second: 0,
    timerWork: false
  };

  timer = null;

  componentDidMount() {
    if (this.state.timerWork) {
      this.timer = setInterval(() => {
        this.setState((prevState) => ({
          second: prevState.second + 1
        }));
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (!this.state.timerWork) {
      this.setState({ timerWork: true });
    }
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        second: prevState.second + 1
      }));
    }, 1000);
  };

  stopTimer = () => {
    if (this.state.timerWork) {
      clearInterval(this.timer);
      this.setState({
        timerWork: false
      });
    }
  };

  renderTimer = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min < 10 ? "0" : ""}${min} : ${sec < 10 ? "0" : ""}${sec}`;
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  onSubmit = (event) => {
    const { editingChange, id } = this.props;
    const { label } = this.state;
    event.preventDefault();
    editingChange(id, label);
  };

  render() {
    const {
      id,
      date,
      labelText,
      onDeleted,
      checked,
      editing,
      onChecked,
      onEditing
    } = this.props;
    const { label, second } = this.state;

    let classNames = "";
    if (checked) classNames = "completed";
    if (editing) classNames = "editing";

    const result = formatDistanceToNow(date, { includeSeconds: true });

    return (
      <li className={classNames}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            checked={checked}
            onChange={onChecked}
          />
          <label htmlFor={id}>
            <span className="title">{labelText}</span>
            <span className="description">
              <button
                type="button"
                className="icon icon-play"
                onClick={this.startTimer}
              ></button>
              <button
                type="button"
                className="icon icon-pause"
                onClick={this.stopTimer}
              ></button>
              <span style={{ marginLeft: 7 }}>{this.renderTimer(second)}</span>
            </span>
            <span className="description">created {result} ago</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={onEditing}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
          />
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            onChange={(event) => this.onLabelChange(event)}
            value={label}
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number,
  labelText: PropTypes.string,
  onDeleted: PropTypes.func,
  onChecked: PropTypes.func,
  onEditing: PropTypes.func,
  editingChange: PropTypes.func,
  checked: PropTypes.bool,
  editing: PropTypes.bool,
  date: PropTypes.object
};
