import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../utils/storage";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";

const StyledEditTodoForm = styled.form`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;
const StyledEditBox = styled.div`
  padding: 30px;
  position: absolute;
  top: calc(50vh - 220px);
  left: calc(50vw - 230px);
  background-color: #d9d9d9;
  display: block;
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  width: 400px;
  height: 300px;
`;
const StyledIdDiv = styled.div`
  margin-bottom: 20px;
`;
const StyledButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const EditTodoModal = (props) => {
  const navigate = useNavigate();
  const { detail, closeModal, error, localTodosDetail } = props;
  const initialState = {
    id: error === null ? detail.id : localTodosDetail[0].id,
    text: error === null ? detail.text : localTodosDetail[0].text,
    deadLine: error === null ? detail.deadLine : localTodosDetail[0].deadLine,
  };
  const [text, setText] = useState(initialState.text);
  const [deadLine, setDeadLine] = useState(initialState.deadLine);

  // 오늘 날짜
  const todaysDate = new Date().toISOString().split("T")[0];

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    let req = {
      id: initialState.id,
      text,
      deadLine,
    };
    try {
      const data = await axios.put(
        process.env.REACT_APP_HOST + `/api/todos/${initialState.id}`,
        req
      );
      if (data.statusText === "OK") {
        navigate("/");
      }
    } catch {
      // 로컬스토리지의 투두들을 리스트로 변환
      const localTodos = storage.parseToArray("allTodos");
      // 수정할 투두 index 찾기
      const index = localTodos.findIndex((todo) => todo.id === initialState.id);
      // 수정할 투두로 배열 원소 교체
      localTodos.splice(index, 1, req);
      // 교체된 배열 다시 로컬스토리지 저장
      storage.save("allTodos", localTodos);
      navigate("/");
    }
  };

  return (
    <StyledEditTodoForm onSubmit={onUpdateHandler}>
      <StyledEditBox>
        <StyledIdDiv>No.{initialState.id}</StyledIdDiv>
        <div>
          <Input
            required
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
        </div>
        <div>
          <Input
            type="date"
            required
            onChange={(e) => {
              setDeadLine(e.target.value);
            }}
            value={deadLine}
            min={todaysDate}
          />
        </div>
        <StyledButtonsDiv>
          <Button type={"submit"}>수정</Button>
          <Button
            type={"button"}
            onClick={() => {
              closeModal(true);
            }}
          >
            닫기
          </Button>
        </StyledButtonsDiv>
      </StyledEditBox>
    </StyledEditTodoForm>
  );
};

export default EditTodoModal;
