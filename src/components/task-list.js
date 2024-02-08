/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import Task from "./task";

const TaskList = ({
  todos,
  onDeleted,
  onChecked,
  onEditing,
  editingChange
}) => {
  const elements = todos.map((item) => (
    <Task
      id={item.id}
      date={item.date}
      key={item.id}
      labelText={item.label}
      checked={item.checked}
      editing={item.editing}
      onDeleted={() => onDeleted(item.id)}
      onChecked={() => onChecked(item.id)}
      onEditing={() => onEditing(item.id)}
      editingChange={editingChange}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  editingChange: PropTypes.func,
  onDeleted: PropTypes.func,
  onChecked: PropTypes.func,
  onEditing: PropTypes.func,
  todos: PropTypes.array
};

export default TaskList;
