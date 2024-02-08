/* eslint-disable react/state-in-constructor */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import NewTaskForm from './new-task-form';
import TaskList from './task-list';
import Footer from './footer';

import '../style/index.css';

export default class App extends Component {
  state = {
    todoData: [],
    filter: 'All',
  };

  maxId = 0;

  onItemAdded = (text) => {
    const newItem = {
      id: this.maxId++,
      label: text,
      checked: false,
      editing: false,
      date: new Date(),
    };

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const resArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: resArr,
      };
    });
  };

  checkItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (todoData[idx].checked) {
        return {
          todoData: [
            ...todoData.slice(0, idx),
            { ...todoData[idx], checked: false },
            ...todoData.slice(idx + 1),
          ],
        };
      }
      return {
        todoData: [
          ...todoData.slice(0, idx),
          { ...todoData[idx], checked: true },
          ...todoData.slice(idx + 1),
        ],
      };
    });
  };

  editItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (!todoData[idx].editing) {
        return {
          todoData: [
            ...todoData.slice(0, idx),
            { ...todoData[idx], editing: true },
            ...todoData.slice(idx + 1),
          ],
        };
      }
    });
  };

  taskCounter = () => {
    const filtered = this.state.todoData.filter(
      (item) => item.checked === false,
    );
    return filtered.length;
  };

  deleteAllCompleted = () => {
    this.setState(({ todoData }) => {
      const completedTasks = todoData.filter((item) => item.checked === true);
      const resArr = todoData.slice();
      for (const i of completedTasks) {
        const idx = resArr.findIndex((el) => el.label === i.label);
        resArr.splice(idx, 1);
      }
      return {
        todoData: resArr,
      };
    });
  };

  filteredTasks = () => {
    const { todoData, filter } = this.state;
    if (filter === 'All') return todoData;
    if (filter === 'Active')
      return todoData.filter((item) => item.checked === false);
    if (filter === 'Completed')
      return todoData.filter((item) => item.checked === true);
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  editingChange = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      return {
        todoData: [
          ...todoData.slice(0, idx),
          { ...todoData[idx], editing: false, label: text },
          ...todoData.slice(idx + 1),
        ],
      };
    });
  };

  render() {
    const { filter } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm addItem={this.onItemAdded} />
        </header>
        <section className="main">
          <TaskList
            todos={this.filteredTasks()}
            onDeleted={this.deleteItem}
            onChecked={this.checkItem}
            onEditing={this.editItem}
            editingChange={this.editingChange}
          />
          <Footer
            counter={this.taskCounter}
            deleteAll={this.deleteAllCompleted}
            onFilterChange={this.onFilterChange}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}
