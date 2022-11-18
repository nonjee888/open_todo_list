import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditTodoModal = (props) => {
  const navigate = useNavigate();
  const { detail, closeModal } = props;
  const initialState = {
    id: detail.id,
    text: detail.text,
    deadLine: detail.deadLine,
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
      alert("다시 시도해주세요!");
      closeModal(false);
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

export default EditTodoModal;

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
