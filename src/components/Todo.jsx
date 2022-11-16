import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/modules/todos";

const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos } = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <>
      <StTodoUl>
        {todos.map((todo) => {
          return (
            <StTodoLi style={{ display: "flex", gap: "10px" }} key={todo.id}>
              <input type="checkbox" id={todo.id} value={todo.id} />
              <div
                onClick={() => {
                  navigate("/" + todo.id);
                }}
                style={{ display: "flex", gap: "10px" }}
                //hover 넣기
              >
                <StIdDiv>No.{todo.id}</StIdDiv>
                <StTextDiv>내용 :{todo.text}</StTextDiv>
                <StDeadLineDiv>기한 :{todo.deadLine}</StDeadLineDiv>
              </div>
            </StTodoLi>
          );
        })}
      </StTodoUl>
    </>
  );
};

export default Todo;
const StTodoUl = styled.ul``;
const StTodoLi = styled.li`
  width: 100%;
  margin-bottom: 10px;
  height: 100px;
  list-style: none;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
  background-color: aliceblue;
`;
const StIdDiv = styled.div``;
const StTextDiv = styled.div``;
const StDeadLineDiv = styled.div``;
const StEditButton = styled.button``;
