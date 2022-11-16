import styled from "styled-components";
import Todo from "./Todo";

const List = (props) => {
  return (
    <StListDiv>
      <StTodosDiv>
        <Todo props={props} />
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
