import { createAsyncThunk } from '@reduxjs/toolkit';
import type todo from '../models/todoModel';
import axios from 'axios';

const BASE_URL = 'http://localhost:3500/todos'

interface TodoInput {
  title: string;
  completed: boolean;
}

export const fetchAllTodos = createAsyncThunk(
  'todos/fetchPosts',
  async (state) => {
      const response = await axios.get<todo[]>(BASE_URL);
      // const data: todo[] = response.data
      return response.data;
  
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (initialTodo: TodoInput) => {

      const response = await axios.post<todo>(
        BASE_URL,
        initialTodo
      );
      return response.data;
  
  }
);

export const removeTodo = createAsyncThunk('todos/deleteTod', async (id: number ) => {
   await axios.delete(`${BASE_URL}/${id}`)
   return id
});  


export const updateTodo = createAsyncThunk('todos/updateTodo', async(initialTodo: todo) => {
  const response = await axios.put(`${BASE_URL}/${initialTodo.id}`, {...initialTodo, completed: !initialTodo.completed})
  return response.data
})