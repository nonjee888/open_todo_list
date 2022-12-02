import axios from "axios";

function fetchTodo() {
  return axios.get(process.env.REACT_APP_HOST + "/api/todos");
}

function getTodo(payload) {
  return axios.get(process.env.REACT_APP_HOST + `/api/todos/${payload}`);
}

function createTodo(payload) {
  return axios.post(process.env.REACT_APP_HOST + "/api/todos", payload);
}

function updateTodoById(id, req) {
  return axios.put(process.env.REACT_APP_HOST + `/api/todos/${id}`, req);
}

function deleteTodoById(payload) {
  for (let i = 0; i < payload.length; i++) {
    axios
      .delete(process.env.REACT_APP_HOST + `/api/todos/${payload[i]}`)

      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

function deleteTodo(state, action) {
  const length = action.meta.arg.length;
  for (let i = 0; i < length; i++) {
    let index = state.todos.findIndex((todo) => todo.id === action.meta.arg[i]);
    state.todos.splice(index, 1);
  }
}

export {
  fetchTodo,
  getTodo,
  createTodo,
  deleteTodoById,
  updateTodoById,
  deleteTodo,
};
