import List from "./List";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createTodos } from "../redux/modules/todos";
import { deleteTodos } from "../redux/modules/todos";
const Form = () => {
  const [text, setText] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const dispatch = useDispatch();
  let req = {
    text,
    deadLine,
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await Promise.all(dispatch(createTodos(req)));
  };
  const onDeleteHandler = () => {
    if (checkedItems.length > 0) {
      dispatch(deleteTodos(checkedItems));
    }
  };
  return (
    <>
      <StForm onSubmit={onSubmitHandler}>
        <StElementsDiv>
          <input
            type="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="date"
            value={deadLine}
            required
            onChange={(e) => setDeadLine(e.target.value)}
          />
          <button type="submit">등록</button>
          <button type="button" onClick={onDeleteHandler}>
            삭제
          </button>
        </StElementsDiv>
      </StForm>
      <List checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
    </>
  );
};

export default Form;

const StForm = styled.form``;
const StElementsDiv = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
`;
