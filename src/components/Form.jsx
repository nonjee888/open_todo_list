import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createTodos } from "../redux/modules/todos";

const Form = () => {
  const [text, setText] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const dispatch = useDispatch();
  let req = {
    text,
    deadLine,
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(req);
    dispatch(createTodos(req));
  };
  const onDeleteHandler = () => {};

  return (
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
        <button type="button">삭제</button>
      </StElementsDiv>
    </StForm>
  );
};

export default Form;

const StForm = styled.form``;
const StElementsDiv = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
`;
