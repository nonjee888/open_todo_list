import styled from "styled-components";
import Todo from "./Todo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/modules/todos";
import Pagination from "./Pagenation";

const List = (props) => {
  const { todos } = useSelector((state) => state.todos);
  const query = props.query;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // 해당 페이지에서의 마지막 todo의 index
  const indexOfLastTodo = currentPage * todosPerPage;
  // 해당 페이지에서 첫번째 todo의 index
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  // 각 페이지에서 보여질 투두 배열
  const currentTodos = todos?.slice(indexOfFirstTodo, indexOfLastTodo);

  const filteredTodos = currentTodos.filter((todo) => {
    return todo.text.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <>
      <StListDiv>
        <StTodosDiv>
          {filteredTodos.map((todo) => {
            return <Todo props={props} todo={todo} key={todo.id} />;
          })}
        </StTodosDiv>
      </StListDiv>{" "}
      <Pagination
        todosPerPage={todosPerPage}
        totalTodos={todos?.length}
        paginate={paginate}
      />
    </>
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
