import { createContext } from 'react';

const TodoContext = createContext();

export default TodoContext;

export const MODAL_STATE = {
  HIDDEN: 1,
  ADD: 2,
  EDIT: 3,
};
