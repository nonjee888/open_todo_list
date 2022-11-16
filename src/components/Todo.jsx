import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/modules/todos";

const Todo = ({ props }) => {
  const { checkedItems, setCheckedItems } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos } = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  // 체크 될 아이템 담을 배열

  // 체크박스 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedItems((prev) => [...prev, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      todos.forEach((el) => idArray.push(el.id));
      setCheckedItems(idArray);
    } else {
      setCheckedItems([]);
    }
  };

  return (
    <>
      <StTodoUl id="sTable">
        {todos.map((todo) => {
          return (
            <StTodoLi style={{ display: "flex", gap: "10px" }} key={todo.id}>
              <input
                id={todo.id}
                type="checkbox"
                name="todoChecked"
                onChange={(e) => {
                  handleSingleCheck(e.target.checked, todo.id);
                }}
                checked={checkedItems.includes(todo.id) ? true : false}
              />
              <div
                onClick={() => {
                  navigate("/" + todo.id);
                }}
                style={{ display: "flex", gap: "10px" }}
                //hover 넣기
              >
                <StIdDiv>No.{todo.id}</StIdDiv>
                <StTextDiv>{todo.text}</StTextDiv>
                <StDeadLineDiv>{todo.deadLine}</StDeadLineDiv>
              </div>
            </StTodoLi>
          );
        })}
      </StTodoUl>
    </>
  );
};

export default Todo;
const StTodoUl = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;
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
