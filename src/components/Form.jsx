import TodoList from "./TodoList";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodos, deleteTodos } from "../redux/modules/todos";
import { storage } from "../utils/storage";
import nextId from "react-id-generator";
import Button from "./Button";
import Input from "./Input";

const Form = () => {
  const id = nextId();
  const [text, setText] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [query, setQuery] = useState(() => localStorage.getItem("search"));
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
    todoArr = storage.parseToArray("allTodos") || [];
    todoArr.push(req);
    storage.save("allTodos", todoArr);

    // API Post
    dispatch(createTodos(req));
    setText("");
    setDeadLine("");
  };

  const onDeleteHandler = () => {
    if (checkedItems.length > 0 && window.confirm("삭제할까요?") === true) {
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

      // API Delete
      dispatch(deleteTodos(checkedItems));
      setCheckedItems([]);
    } else {
      setCheckedItems([]);
      return false;
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
          <Input
            type={"text"}
            required
            value={text}
            placeholder={"투두를 입력하세요"}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            style={{ cursor: "pointer" }}
            type={"date"}
            value={deadLine}
            required
            min={todaysDate}
            onChange={(e) => setDeadLine(e.target.value)}
          />
          <Button type={"submit"}>등록</Button>
          <Button type={"button"} onClick={onDeleteHandler}>
            삭제
          </Button>
          <Input
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
