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
    case 'UPDATE_TODO':
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
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
    case 'SET_MODAL_STATE':
      return {
        ...state,
        modalState: action.payload,
      };
    case 'SET LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
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
