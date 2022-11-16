import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTodos } from "../redux/modules/todos";

const TodoDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailTodo, setDetailTodo] = useState({});
  useEffect(() => {
    dispatch(getTodos(id)).then((res) => {
      setDetailTodo(res.payload);
    });
  }, []);
  return (
    <>
      <StIdDiv>No.{detailTodo.id}</StIdDiv>
      <StTextDiv>내용 :{detailTodo.text}</StTextDiv>
      <StDeadLineDiv>기한 :{detailTodo.deadLine}</StDeadLineDiv>
      <StEditButton>수정</StEditButton>

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
