import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos";

export default configureStore({
  reducer: {
    todos: todos.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
