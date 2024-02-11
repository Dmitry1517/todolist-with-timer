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
/* eslint-disable react/prop-types */
/* eslint-disable no-lonely-if */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.labelText,
      totalTime: 0,
      timer: null,
      timerWork: false
    };

    this.tick = () => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.totalTime > 0) {
        this.setState({ timerWork: true });
        this.setState(({ totalTime }) => ({
          totalTime: totalTime - 1
        }));
      }
    };

    this.runTick = () => {
      if (this.state.timerWork) {
        return;
      }
      const timer = setInterval(this.tick, 1000);
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        timer
      });
    };

    this.stopTick = () => {
      if (!this.state.timerWork) {
        return;
      }
      const { timer } = this.state;
      clearInterval(timer);
      this.setState({ timerWork: false });
    };
  }

  componentDidMount() {
    const { timerValue } = this.props;
    this.setState({
      totalTime: +timerValue[0] * 60 + +timerValue[1]
    });
  }

  componentWillUnmount() {
    this.stopTick();
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  onSubmit = (event) => {
    const { editingChange, id } = this.props;
    const { label } = this.state;
    event.preventDefault();
    if (label !== "") {
      editingChange(id, label);
    }
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
    const { label } = this.state;
    let { totalTime } = this.state;

    let classNames = "";
    if (checked) classNames = "completed";
    if (editing) classNames = "editing";

    const result = formatDistanceToNow(date, { includeSeconds: true });

    const min =
      totalTime % 60 < 10
        ? `0${Math.floor(totalTime / 60)}`
        : Math.floor(totalTime / 60);
    const sec =
      totalTime % 60 < 10 ? (totalTime = `0${totalTime % 60}`) : totalTime % 60;
    const timer = `${min}:${sec}`;

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
                onClick={this.runTick}
              ></button>
              <button
                type="button"
                className="icon icon-pause"
                onClick={this.stopTick}
              ></button>

              <span style={{ marginLeft: 7 }}>{timer}</span>
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
