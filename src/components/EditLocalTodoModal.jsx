import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* 로컬스토리지 데이터 수정용 모달 */
const EditLocalTodoModal = (props) => {
  const navigate = useNavigate();
  const { closeModal, localTodosDetail } = props;
  const initialState = {
    id: localTodosDetail[0].id,
    text: localTodosDetail[0].text,
    deadLine: localTodosDetail[0].deadLine,
  };

  const [text, setText] = useState(initialState.text);
  const [deadLine, setDeadLine] = useState(initialState.deadLine);

  const todaysDate = new Date().toISOString().split("T")[0];
  const today = Date.parse(todaysDate);
  const selectedDate = Date.parse(deadLine);

  useEffect(() => {
    if (selectedDate < today) {
      alert("현재 보다 이전의 날짜는 설정할 수 없습니다.");
      setDeadLine("");
    }
  }, [deadLine]);

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    let req = {
      id: initialState.id,
      text,
      deadLine,
    };
    try {
      const data = await axios.put(
        process.env.REACT_APP_HOST + `/todos/${initialState.id}`,
        req
      );
      if (data.statusText === "OK") {
        navigate("/");
      }
    } catch {
      // 로컬스토리지의 투두들을 리스트로 변환
      const todosFromLocalStorage = localStorage.getItem("allTodos");
      const localTodos = JSON.parse(todosFromLocalStorage);
      // 수정할 투두 index 찾기
      const index = localTodos.findIndex((todo) => todo.id === initialState.id);
      // 수정할 투두로 배열 원소 교체
      localTodos.splice(index, 1, req);
      // 교체된 배열 다시 로컬스토리지 저장
      let allTodos = JSON.stringify(localTodos);
      localStorage.setItem("allTodos", allTodos);
      navigate("/");
    }
  };

  return (
    <StEditTodoForm onSubmit={onUpdateHandler}>
      <StEditBox>
        <StIdDiv>No.{initialState.id}</StIdDiv>
        <StTextDiv>
          내용
          <StInput
            required
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
        </StTextDiv>
        <StDeadLineDiv>
          기한
          <StInput
            type="date"
            required
            onChange={(e) => {
              setDeadLine(e.target.value);
            }}
            value={deadLine}
          />
        </StDeadLineDiv>
        <div style={{ display: "flex", gap: "10px" }}>
          <StEditButton type="submit">수정</StEditButton>
          <StDeleteButton
            type="button"
            onClick={() => {
              closeModal(true);
            }}
          >
            닫기
          </StDeleteButton>
        </div>
      </StEditBox>
    </StEditTodoForm>
  );
};

export default EditLocalTodoModal;

const StEditTodoForm = styled.form`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;
const StEditBox = styled.div`
  padding: 30px;
  position: absolute;
  top: calc(50vh - 220px);
  left: calc(50vw - 230px);
  background-color: white;
  display: block;
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  width: 400px;
  height: 300px;
`;
const StIdDiv = styled.div`
  margin-top: 30px;
`;
const StTextDiv = styled.div`
  margin-top: 40px;
`;
const StInput = styled.input`
  margin-left: 10px;
  width: 200px;
`;
const StDeadLineDiv = styled.div`
  margin-top: 30px;
`;
const StEditButton = styled.button`
  margin: 50px 0 0 100px;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;
const StDeleteButton = styled.button`
  margin-top: 50px;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;
