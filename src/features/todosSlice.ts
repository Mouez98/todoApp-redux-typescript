import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchAllTodos, addTodo, removeTodo, updateTodo } from './apiCalls';
import type todo from '../models/todoModel';
import type { RootState } from '../app/store';
import type { PayloadAction } from '@reduxjs/toolkit';


// interface TodosState {
//   entities: []
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
// }

interface TodosState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | string 
}

const todosAdapter = createEntityAdapter<todo>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (todo) => todo.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = todosAdapter.getInitialState({
  status: 'idle',
  error: ''
})

// const initialState = {
//   status: 'idle',
//   error: null,

// } as TodosState

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    completedTodo: (state, action: PayloadAction<todo>) => {
      const { id, completed } = action.payload;
      const exicitingTodo = state.entities[id];

      if (exicitingTodo) exicitingTodo.completed = !completed;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (action.payload) todosAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        console.log(action.payload);
        state.status = 'failed';
        if(action.error.message) state.error = action.error.message        
      })
      .addCase(addTodo.fulfilled, (state, {payload}) => {
        if(payload) todosAdapter.addOne(state, payload)
        
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        todosAdapter.removeOne(state, action.payload)
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
         console.log(action.payload)
         
      })
     
  },
});

// export const getAllTodos = (state: RootState) => state.todos;

export const { selectAll: getAllTodos, selectIds: todoIds, selectById: getTodoById } = todosAdapter.getSelectors(
  (state: RootState) => state.todos
);
export const getTodosStatus = (state: RootState) => state.todos.status;
export const getTodosError = (state: RootState) => state.todos.error;

export const { completedTodo } = todosSlice.actions;

export default todosSlice.reducer;
