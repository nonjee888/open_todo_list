import {
  fetchTodo,
  getTodo,
  createTodo,
  deleteTodoById,
  deleteTodo,
} from "../../utils/api";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const data = await fetchTodo();

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const { data } = await getTodo(payload);
      // console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTodos = createAsyncThunk(
  "todos/createTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await createTodo(payload);

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (payload) => {
    deleteTodoById(payload);
  }
);

export const todos = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    detail: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    clearDetail: (state, action) => {
      state.detail = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detail = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload.data);
      })
      .addCase(createTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        deleteTodo(state, action);
        console.log(action);
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default todos;
