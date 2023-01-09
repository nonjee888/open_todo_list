const TODOS_PER_PAGE = 5;

const page = {
  indexOfLastTodo(value) {
    return value * TODOS_PER_PAGE;
  },

  indexOfFirstTodo(value) {
    return this.indexOfLastTodo(value) - TODOS_PER_PAGE;
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
      (a, b) => new Date(a.deadLine).getDate() - new Date(b.deadLine).getDate()
    );
  },

  showCurrentTodos(indexOfFirstTodo, indexOfLastTodo, array, query) {
    return this.sortByDate(array, query).slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );
  },

  paginate(pageNumber, key) {
    key(pageNumber);
  },

  number(value) {
    return Math.ceil(value.length / TODOS_PER_PAGE);
  },

  numberArray(value, array) {
    for (let i = 1; i <= page.number(value); i++) {
      array.push(i);
    }
    return array;
  },
};

export { page };
