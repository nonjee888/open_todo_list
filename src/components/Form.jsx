import TodoList from "./TodoList";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodos, deleteTodos } from "../redux/modules/todos";
import nextId from "react-id-generator";

const Form = () => {
  const id = nextId();
  const [text, setText] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [query, setQuery] = useState(localStorage.getItem("search"));
  const dispatch = useDispatch();

  // 오늘 날짜
  const todaysDate = new Date().toISOString().split("T")[0];

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let req = {
      id,
      text,
      deadLine,
    };

    // 로컬스토리지에 저장 할 배열 생성
    let todoArr = [];

    // 로컬스토리지에 추가
    todoArr = JSON.parse(localStorage.getItem("allTodos")) || [];
    todoArr.push(req);

    localStorage.setItem("allTodos", JSON.stringify(todoArr));

    // API Post
    dispatch(createTodos(req));
    setText("");
    setDeadLine("");
  };

  const onDeleteHandler = () => {
    if (checkedItems.length > 0) {
      if (window.confirm("삭제할까요?") === true) {
        // 로컬스토리지의 투두들을 리스트로 변환
        const todosFromLocalStorage = localStorage.getItem("allTodos");
        const localTodos = JSON.parse(todosFromLocalStorage);

        // 로컬스토리지에서 삭제
        for (let i = 0; i < checkedItems.length; i++) {
          const index =
            localTodos &&
            localTodos.findIndex((todo) => todo.id === checkedItems[i]);
          if (index > -1) {
            localTodos && localTodos.splice(index, 1);
          }

          // 삭제된 배열을 다시 로컬스토리지에 넣어줌
          let allTodos = JSON.stringify(localTodos);
          localStorage.setItem("allTodos", allTodos);
        }

        // API Delete
        dispatch(deleteTodos(checkedItems));
        setCheckedItems([]);
      } else {
        setCheckedItems([]);
        return false;
      }
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    localStorage.setItem("search", e.target.value);
  };

  return (
    <>
      <StForm onSubmit={onSubmitHandler}>
        <StElementsDiv>
          <StInput
            type="text"
            value={text}
            required
            placeholder="투두를 입력하세요"
            onChange={(e) => setText(e.target.value)}
          />
          <StInput
            style={{ cursor: "pointer" }}
            type="date"
            value={deadLine}
            required
            min={todaysDate}
            onChange={(e) => setDeadLine(e.target.value)}
          />
          <StButton type="submit">등록</StButton>
          <StButton type="button" onClick={onDeleteHandler}>
            삭제
          </StButton>{" "}
          <StSearchInput
            type="search"
            value={query || ""}
            onChange={handleSearch}
            placeholder="검색어를 입력하세요"
          />
        </StElementsDiv>
      </StForm>

      <TodoList
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        query={query}
      />
    </>
  );
};

export default Form;

const StForm = styled.form`
  background-color: #ececec;
  height: 100px;
`;
const StElementsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-left: 10px;
  gap: 20px;
`;
const StInput = styled.input`
  margin: 35px 0 20px 0;
  width: 200px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;
const StButton = styled.button`
  margin-top: 35px;
  width: 50px;
  height: 30px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: aliceblue;
`;
const StSearchInput = styled.input`
  margin-top: 35px;
  width: 200px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;
