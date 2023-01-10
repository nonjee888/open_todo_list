type Storage = {
  key: "allTodos";
  request: { id: string; text: string; deadLine: string };
  id: string;
  checkedItems: string[];
  queryAlias: "search";
  searchKeyWord: string;
};

const storage = {
  save({key, request}:Storage) {
    localStorage.setItem(key, JSON.stringify(request));
  },

  parseToArray({key}: Storage) {
    return JSON.parse(localStorage.getItem(key));
  },

  addTodo({key, request}: Storage) {
    // 로컬스토리지에 저장 할 배열 생성
    let todoArr = [];
    // 로컬스토리지에 추가
    todoArr = storage.parseToArray(key: Storage) || [];
    todoArr.push(request);
    storage.save(key, todoArr);
  },

  updateById(key, id, request) {
    // 로컬스토리지의 투두들을 리스트로 변환
    const localTodos = storage.parseToArray(key);
    // 수정할 투두 index 찾기
    const index = localTodos.findIndex((todo) => todo.id === id);
    // 수정할 투두로 배열 원소 교체
    localTodos.splice(index, 1, request);
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

  selectById(id: string) {
    const localTodos = storage.parseToArray("allTodos");
    return (
      localTodos &&
      localTodos.filter((detail) => {
        return detail.id === id;
      })
    );
  },

  saveQuery(queryAlias, searchKeyWord) {
    localStorage.setItem(queryAlias, searchKeyWord);
  },
};

export { storage };
