import React, { FC } from 'react';
// import { useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../hooks/useTypedSelectors';
import {
  getAllTodos,
  getTodosStatus,
  getTodosError,
  completedTodo,
  todoIds,
  getTodoById,
} from './todosSlice';
import { removeTodo, updateTodo } from './apiCalls';

import type todo from '../models/todoModel';

const Todos: FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(getAllTodos);
  const todosIds = useAppSelector(todoIds);
  const todo = useAppSelector((state) => getTodoById(state, 4));
  const todosStatus = useAppSelector(getTodosStatus);
  const todoError = useAppSelector(getTodosError);

  const onDeleteHandler = (id: number) => dispatch(removeTodo(id));
  const onCompletedHandler = (todo: todo) => {
    dispatch(updateTodo(todo));
    dispatch(completedTodo(todo));
  };

  let content;

  if (todosStatus === 'pending') {
    content = <p>Loading...</p>;
  } else if (todosStatus === 'succeeded') {
    content = todos.map((todo: todo) => {
      const { id, title, completed } = todo;
      return (
        <li key={id}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onCompletedHandler(todo)}
          />
          {title}
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => onDeleteHandler(id)}
          >
            ❌
          </span>
        </li>
      );
    });
  } else if (todosStatus === 'failed') {
    content = <p>{todoError}</p>;
  }

  return <ul>{content}</ul>;
};

export default Todos;
