import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditTodoModal from "./EditTodoModal";

const TodoDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [detailTodo, setDetailTodo] = useState({});

  // 오늘 날짜 밀리세컨으로 변환
  const nowToMilliSeconds = Date.now();
  // 선택된 날짜 밀리세컨으로 변환
  const selectedDate = Date?.parse(detailTodo && detailTodo?.deadLine);
  // 1일
  const milliSeconds = 24 * 60 * 60 * 1000;
  // 몇일 남았는지 계산
  const daysLeft = Math.ceil((selectedDate - nowToMilliSeconds) / milliSeconds);

  function timer() {
    if (daysLeft !== NaN && 0 < daysLeft && daysLeft <= 3) {
      alert(`D-day 까지 ${daysLeft}일 남았습니다`);
    } else if (daysLeft !== NaN && 0 >= daysLeft && daysLeft >= -1) {
      alert("D-day입니다");
    }
  }
  let alertMsg = setTimeout(timer, 100);
  // clearTimeout(alertMsg, 500);

  useEffect(() => {
    getTodos(id);
  }, []);

  const getTodos = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_HOST + `/todos/${id}`
    );
    setDetailTodo(data && data);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      {modal ? (
        <EditTodoModal detailTodo={detailTodo} closeModal={closeModal} />
      ) : null}
      <StIdDiv>No.{detailTodo.id}</StIdDiv>
      <StTextDiv>내용 :{detailTodo.text}</StTextDiv>
      <StDeadLineDiv>기한 :{detailTodo.deadLine}</StDeadLineDiv>
      <StEditButton
        onClick={() => {
          setModal(true);
        }}
      >
        수정
      </StEditButton>

      <StEditButton
        onClick={() => {
          navigate(-1);
        }}
      >
        이전
      </StEditButton>
    </>
  );
};

export default TodoDetail;

const StIdDiv = styled.div``;
const StTextDiv = styled.div``;
const StDeadLineDiv = styled.div``;
const StEditButton = styled.button``;
