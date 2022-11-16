import styled from "styled-components";

const Todo = () => {
  return (
    <StTodoLi>
      <StTextDiv>내용 :</StTextDiv>
      <StDeadLineDiv>기한 :</StDeadLineDiv>
      <StEditButton>수정</StEditButton>
    </StTodoLi>
  );
};

export default Todo;

const StTodoLi = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-left: 10px;
  background-color: aliceblue;
  height: 100px;
  list-style: none;
  gap: 10px;
`;

const StTextDiv = styled.div``;
const StDeadLineDiv = styled.div``;
const StEditButton = styled.button``;
