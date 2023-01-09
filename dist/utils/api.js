"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodoById = exports.deleteTodoById = exports.createTodo = exports.getTodo = exports.fetchTodo = void 0;
var axios_1 = require("axios");
function fetchTodo() {
    return axios_1.default.get(process.env.REACT_APP_HOST + "/api/todos");
}
exports.fetchTodo = fetchTodo;
function getTodo(payload) {
    return axios_1.default.get(process.env.REACT_APP_HOST + "/api/todos/".concat(payload));
}
exports.getTodo = getTodo;
function createTodo(payload) {
    return axios_1.default.post(process.env.REACT_APP_HOST + "/api/todos", payload);
}
exports.createTodo = createTodo;
function updateTodoById(id, req) {
    return axios_1.default.put(process.env.REACT_APP_HOST + "/api/todos/".concat(id), req);
}
exports.updateTodoById = updateTodoById;
function deleteTodoById(payload) {
    for (var i = 0; i < payload.length; i++) {
        axios_1.default
            .delete(process.env.REACT_APP_HOST + "/api/todos/".concat(payload[i]))
            .then(function (res) {
            // console.log(res);
        })
            .catch(function (error) {
            console.log(error.message);
        });
    }
}
exports.deleteTodoById = deleteTodoById;
function deleteTodo(state, action) {
    var length = action.meta.arg.length;
    var _loop_1 = function (i) {
        var index = state.todos.findIndex(function (todo) { return todo.id === action.meta.arg[i]; });
        state.todos.splice(index, 1);
    };
    for (var i = 0; i < length; i++) {
        _loop_1(i);
    }
}
exports.deleteTodo = deleteTodo;
