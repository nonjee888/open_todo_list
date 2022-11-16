import styled from "styled-components";
import Todo from "./Todo";

const List = () => {
  return (
    <StListDiv>
      <StTodosDiv>
        <Todo />
      </StTodosDiv>
    </StListDiv>
  );
};

export default List;

const StListDiv = styled.div`
  height: 100%;
  display: flex;
`;

const StTodosDiv = styled.div`
  width: 100%;
`;
