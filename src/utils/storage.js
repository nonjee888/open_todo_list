const storage = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  parseToArray(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  addTodo(key, req) {
    // 로컬스토리지에 저장 할 배열 생성
    let todoArr = [];
    // 로컬스토리지에 추가
    todoArr = storage.parseToArray(key) || [];
    todoArr.push(req);
    storage.save(key, todoArr);
  },

  updateById(key, value, req) {
    // 로컬스토리지의 투두들을 리스트로 변환
    const localTodos = storage.parseToArray(key);
    // 수정할 투두 index 찾기
    const index = localTodos.findIndex((todo) => todo.id === value);
    // 수정할 투두로 배열 원소 교체
    localTodos.splice(index, 1, req);
    // 교체된 배열 다시 로컬스토리지 저장
    storage.save(key, localTodos);
  },

  deleteById(checkedItems) {
    // 로컬스토리지의 투두들을 리스트로 변환
    const localTodos = storage.parseToArray("allTodos");
    // 로컬스토리지에서 삭제
    for (let i = 0; i < checkedItems.length; i++) {
      const index =
        localTodos &&
        localTodos.findIndex((todo) => todo.id === checkedItems[i]);
      if (index > -1) {
        localTodos && localTodos.splice(index, 1);
      }
      // 삭제된 배열을 다시 로컬스토리지에 넣어줌
      storage.save("allTodos", localTodos);
    }
  },

  selectById(id) {
    const localTodos = storage.parseToArray("allTodos");
    return (
      localTodos &&
      localTodos.filter((detail) => {
        return detail.id === id;
      })
    );
  },

  saveQuery(key, value) {
    localStorage.setItem(key, value);
  },
};

export { storage };
