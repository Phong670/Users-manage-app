import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./redux/reducers/todolist.reducer";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
