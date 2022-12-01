const page = {
  indexOfLastTodo(value) {
    const todosPerPage = 5;
    return value * todosPerPage;
  },

  indexOfFirstTodo(value) {
    const todosPerPage = 5;
    return this.indexOfLastTodo(value) - todosPerPage;
  },

  filterByQuery(array, query) {
    return (
      array &&
      array.filter((todo) => {
        if (query === "") return array;
        const todoo = todo.text || "";
        return todoo.toLowerCase().includes(query.toLowerCase());
      })
    );
  },

  sortByDate(array, query) {
    return this.filterByQuery(array, query).sort(
      (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
    );
  },

  showCurrentTodos(indexOfFirstTodo, indexOfLastTodo, array, query) {
    return this.sortByDate(array, query).slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );
  },

  totalTodos(array) {
    return array && array.length;
  },

  number(value1, value2) {
    return Math.ceil(page.totalTodos(value1) / value2);
  },
};

export { page };
