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
  useEffect(() => {
    getTodos(id);
  }, []);
  const getTodos = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_HOST + `/todos/${id}`
    );
    setDetailTodo(data);
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
