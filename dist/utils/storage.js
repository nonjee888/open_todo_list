"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
var storage = {
    save: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    parseToArray: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    addTodo: function (key, req) {
        // 로컬스토리지에 저장 할 배열 생성
        var todoArr = [];
        // 로컬스토리지에 추가
        todoArr = storage.parseToArray(key) || [];
        todoArr.push(req);
        storage.save(key, todoArr);
    },
    updateById: function (key, value, req) {
        // 로컬스토리지의 투두들을 리스트로 변환
        var localTodos = storage.parseToArray(key);
        // 수정할 투두 index 찾기
        var index = localTodos.findIndex(function (todo) { return todo.id === value; });
        // 수정할 투두로 배열 원소 교체
        localTodos.splice(index, 1, req);
        // 교체된 배열 다시 로컬스토리지 저장
        storage.save(key, localTodos);
    },
    deleteById: function (checkedItems) {
        // 로컬스토리지의 투두들을 리스트로 변환
        var localTodos = storage.parseToArray("allTodos");
        var _loop_1 = function (i) {
            var index = localTodos &&
                localTodos.findIndex(function (todo) { return todo.id === checkedItems[i]; });
            if (index > -1) {
                localTodos && localTodos.splice(index, 1);
            }
            // 삭제된 배열을 다시 로컬스토리지에 넣어줌
            storage.save("allTodos", localTodos);
        };
        // 로컬스토리지에서 삭제
        for (var i = 0; i < checkedItems.length; i++) {
            _loop_1(i);
        }
    },
    selectById: function (id) {
        var localTodos = storage.parseToArray("allTodos");
        return (localTodos &&
            localTodos.filter(function (detail) {
                return detail.id === id;
            }));
    },
    saveQuery: function (key, value) {
        localStorage.setItem(key, value);
    },
};
exports.storage = storage;
