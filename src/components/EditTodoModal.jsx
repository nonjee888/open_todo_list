import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditTodoModal = (props) => {
  const navigate = useNavigate();
  const { detailTodo, closeModal } = props;
  const initialState = {
    id: detailTodo.id,
    text: detailTodo.text,
    deadLine: detailTodo.deadLine,
  };
  const [oldDetail, setOldDetail] = useState(initialState);
  const [id, setId] = useState(oldDetail.id);
  const [text, setText] = useState(oldDetail.text);
  const [deadLine, setDeadLine] = useState(oldDetail.deadLine);

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    let req = {
      id,
      text,
      deadLine,
    };
    try {
      const data = await axios.put(
        process.env.REACT_APP_HOST + `/todos/${id}`,
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
        <StIdDiv>No.{oldDetail.id}</StIdDiv>
        <StTextDiv>
          내용 :
          <input
            required
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
        </StTextDiv>
        <StDeadLineDiv>
          기한 :
          <input
            type="date"
            required
            onChange={(e) => {
              setDeadLine(e.target.value);
            }}
            value={deadLine}
          />
        </StDeadLineDiv>
        <StEditButton type="submit">수정</StEditButton>
        <button
          type="button"
          onClick={() => {
            closeModal(true);
          }}
        >
          닫기
        </button>
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
  top: calc(50vh - 250px);
  left: calc(50vw - 320px);
  background-color: white;
  display: block;
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  width: 400px;
  height: 300px;
`;

const StIdDiv = styled.div``;
const StTextDiv = styled.div``;
const StDeadLineDiv = styled.div``;
const StEditButton = styled.button``;
