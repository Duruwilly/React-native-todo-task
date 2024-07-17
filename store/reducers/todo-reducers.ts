import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createItemType, todoType } from "../../common.type";

interface AppState {
  todos: todoType;
  todosId: string[];
}

const initialState: AppState = {
  todos: [],
  todosId: [],
};

const todoReducer = createSlice({
  name: "todoReducer",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todoType>) => {
      const newTodo = action.payload;
      state.todos.unshift(...newTodo);
    },
    updateTodo: (state, action: PayloadAction<createItemType>) => {
      const updatedTodo = action.payload;
      const todoIndex = state.todos.findIndex(
        (item) => item.id === updatedTodo.id
      );
      if (todoIndex !== -1) {
        state.todos[todoIndex] = updatedTodo;
      }
    },
    deleteTodo: (state, action: PayloadAction<{todoId: string}>) => {
      const { todoId } = action.payload;
      state.todos = state.todos.filter((item) => item.id !== todoId);
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } =
  todoReducer.actions;
export default todoReducer.reducer;
