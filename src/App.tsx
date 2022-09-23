import React from 'react';
import './App.css';
import AddTodo from './features/AddTodo';
import Todos from './features/Todos';

function App() {
  return (
    <div className="App">
     <h2>Redux Typescript Todo app</h2>
     <AddTodo />
     <Todos />
    </div>
  );
}

export default App;
