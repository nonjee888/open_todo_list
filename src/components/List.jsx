import styled from "styled-components";
import Todo from "./Todo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/modules/todos";

const List = (props) => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <StListDiv>
      <StTodosDiv>
        {todos.map((todo) => {
          return <Todo props={props} todo={todo} key={todo.id} />;
        })}
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
