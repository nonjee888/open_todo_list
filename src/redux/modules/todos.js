import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_HOST + `/todos/${payload}`
      );
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
  async (payload) => {
    for (let i = 0; i < payload.length; i++) {
      await axios
        .delete(process.env.REACT_APP_HOST + `/todos/${payload[i]}`)

        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
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
    [getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [createTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos.push(action.payload.data);
    },
    [createTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      let length = action.meta.arg.length;
      for (let i = 0; i < length; i++) {
        let index = state.todos.findIndex(
          (todo) => todo.id === action.meta.arg[i]
        );
        state.todos.splice(index, 1);
      }
    },

    [deleteTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todos;
