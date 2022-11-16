import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const TodoDetail = () => {
  const navigate = useNavigate();
  return (
    <>
      <StIdDiv>No.</StIdDiv>
      <StTextDiv>내용 :</StTextDiv>
      <StDeadLineDiv>기한 :</StDeadLineDiv>
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
