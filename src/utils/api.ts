import axios from "axios";

type State = {
  todos: { id: string; text: string; deadLine: string }[];
  detail: {};
  isLoading: boolean;
  error: any;
};

type Action = {
  meta: { arg: string[]; requestId: string; requestStatus: "fulfilled" };
};

function fetchTodo() {
  return axios.get(process.env.REACT_APP_HOST + "/api/todos");
}

function getTodo(payload: string) {
  return axios.get(process.env.REACT_APP_HOST + `/api/todos/${payload}`);
}

function createTodo(payload: { id: string; text: string; deadLine: string }) {
  return axios.post(process.env.REACT_APP_HOST + "/api/todos", payload);
}

function updateTodoById(
  id: string,
  req: { id: string; text: string; deadLine: string }
) {
  return axios.put(process.env.REACT_APP_HOST + `/api/todos/${id}`, req);
}

function deleteTodoById(payload: string[]) {
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

function deleteTodo(state: State, action: Action) {
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
