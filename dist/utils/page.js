"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = void 0;
var TODOS_PER_PAGE = 5;
var page = {
    indexOfLastTodo: function (value) {
        return value * TODOS_PER_PAGE;
    },
    indexOfFirstTodo: function (value) {
        return this.indexOfLastTodo(value) - TODOS_PER_PAGE;
    },
    filterByQuery: function (array, query) {
        return (array &&
            array.filter(function (todo) {
                if (query === "")
                    return array;
                var todoo = todo.text || "";
                return todoo.toLowerCase().includes(query.toLowerCase());
            }));
    },
    sortByDate: function (array, query) {
        return this.filterByQuery(array, query).sort(function (a, b) { return new Date(a.deadLine).getDate() - new Date(b.deadLine).getDate(); });
    },
    showCurrentTodos: function (indexOfFirstTodo, indexOfLastTodo, array, query) {
        return this.sortByDate(array, query).slice(indexOfFirstTodo, indexOfLastTodo);
    },
    paginate: function (pageNumber, key) {
        key(pageNumber);
    },
    number: function (value) {
        return Math.ceil(value.length / TODOS_PER_PAGE);
    },
    numberArray: function (value, array) {
        for (var i = 1; i <= page.number(value); i++) {
            array.push(i);
        }
        return array;
    },
};
exports.page = page;
