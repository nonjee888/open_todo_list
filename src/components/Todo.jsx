import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
            <StTodoLi key={todo.id}>
              <StInput
                id={todo.id}
                type="checkbox"
                name="todoChecked"
                onChange={(e) => {
                  handleSingleCheck(e.target.checked, todo.id);
                }}
                checked={checkedItems.includes(todo.id) ? true : false}
              />

              <StTextdiv
                onClick={() => {
                  navigate("/" + todo.id);
                }}
              >
                {todo.text}
              </StTextdiv>

              <div>{todo.deadLine}</div>
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
  margin-bottom: 10px;
  height: 100px;
  list-style: none;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
  background-color: aliceblue;
  display: grid;
  grid-template-columns: 5% 70% 20%;
  gap: 20px;
`;
const StInput = styled.input`
  width: 20px;
  height: 20px;
`;
const StTextdiv = styled.div`
  &:hover {
    color: #0071ce;
    font-weight: bold;
    font-size: large;
  }
`;
