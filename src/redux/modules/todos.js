import axios from "axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const data = await axios.get(process.env.REACT_APP_HOST + "/todos");

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTodos = createAsyncThunk(
  "todos/createTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        process.env.REACT_APP_HOST + "/todos",
        payload
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTodos = createAsyncThunk(
  "todos/updateTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.put(
        process.env.REACT_APP_HOST + `/todos/${payload}`,
        payload
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        process.env.REACT_APP_HOST + `/todos/${payload}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const todos = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    isLoading: false,
    error: null,
  },
  redecers: {},
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [createTodos.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.todos.push(action.payload.data);
    },
    [createTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todos;
