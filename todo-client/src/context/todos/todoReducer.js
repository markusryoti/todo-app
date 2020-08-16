export default (state, action) => {
  switch (action.type) {
    case 'TODOS_LOADED':
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.todo_id === action.payload.todo_id ? action.payload : todo
        ),
        loading: false,
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.todo_id !== action.payload),
        loading: false,
      };
    case 'SET LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'TODO_LOAD_ERROR':
      return {
        ...state,
        todos: [],
        error: action.payload.message,
      };

    default:
      return {
        ...state,
      };
  }
};
