import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Todo = ({ props, todo, idx }) => {
  const { checkedItems, setCheckedItems } = props;
  const navigate = useNavigate();

  // 체크박스 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedItems((prev) => [...prev, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  return (
    <>
      <StTodoUl>
        <StTodoLi>
          <StInput
            id={todo.id}
            type="checkbox"
            name={`select-${todo.id}`}
            onChange={(e) => {
              handleSingleCheck(e.target.checked, todo.id);
            }}
            checked={checkedItems.includes(todo.id) ? true : false}
          />
          <StTextdiv
            onClick={() => {
              navigate("/" + todo.id, { state: idx });
            }}
          >
            {todo.text}
          </StTextdiv>
          <div>D-Day : {todo.deadLine}</div>
        </StTodoLi>
      </StTodoUl>
    </>
  );
};

export default Todo;
const StTodoUl = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
`;
const StTodoLi = styled.li`
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
