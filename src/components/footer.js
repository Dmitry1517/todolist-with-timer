/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "./tasks-filter";

const Footer = ({ counter, deleteAll, onFilterChange, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{counter()} items left</span>
      <TasksFilter onFilterChange={onFilterChange} filter={filter} />
      <button className="clear-completed" type="button" onClick={deleteAll}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  filter: PropTypes.string,
  counter: PropTypes.func,
  deleteAll: PropTypes.func,
  onFilterChange: PropTypes.func
};

export default Footer;
