import React, { useContext, useEffect } from 'react';
import TodoContext from '../context/todos/todoContext';
import Todo from './Todo';

const TodoList = () => {
  const todoContext = useContext(TodoContext);
  const { todos, getTodos, filtered, loading } = todoContext;

  useEffect(() => {
    getTodos();
    //eslint-disable-next-line
  }, [filtered]);

  return (
    <div className="todo-container">
      {loading && <h1>Loading</h1>}
      <div>
        {filtered
          ? filtered.map((todo) => <Todo key={todo.todo_id} todo={todo} />)
          : todos &&
            todos.map((todo) => <Todo key={todo.todo_id} todo={todo} />)}
      </div>
    </div>
  );
};

export default TodoList;
