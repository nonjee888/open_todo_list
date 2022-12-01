import TodoList from "./TodoList";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodos, deleteTodos } from "../redux/modules/todos";
import { todaysDate } from "../utils/date";
import { storage } from "../utils/storage";
import nextId from "react-id-generator";
import Button from "./Button";
import Input from "./Input";

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

const Form = () => {
  const id = nextId();
  const [text, setText] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [query, setQuery] = useState(() => localStorage.getItem("search"));
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let req = {
      id,
      text,
      deadLine,
    };
    // LocalStorage에 todo 추가
    storage.addTodo("allTodos", req);

    // API Post 요청
    dispatch(createTodos(req));
    setText("");
    setDeadLine("");
  };

  const onDeleteHandler = () => {
    if (checkedItems.length > 0 && window.confirm("삭제할까요?") === true) {
      // LocalStorage Delete
      storage.deleteById(checkedItems);
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
    storage.saveQuery("search", e.target.value);
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
