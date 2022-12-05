import styled from "styled-components";
import Todo from "./Todo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/modules/todos";
import { storage } from "../utils/storage";
import { page } from "../utils/page";
import Pagination from "./Pagination";

const StPageNumberUl = styled.ul`
  display: flex;
  justify-content: center;
  margin-block-start: 0;
  margin-block-end: 0;
  list-style: none;
  padding: 0;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: aliceblue;
`;

const TodoList = (props) => {
  const { todos, error } = useSelector((state) => state.todos);
  const query = props.query || "";
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const localTodos = storage.parseToArray("allTodos");

  // 각 페이지에서 보여질 투두 배열
  const currentTodos = page.showCurrentTodos(
    page.indexOfFirstTodo(currentPage),
    page.indexOfLastTodo(currentPage),
    error ? localTodos : todos,
    query
  );

  // 페이지 나누기
  const pageNumber = [];
  page.numberArray(error ? localTodos : todos, pageNumber);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <>
      {currentTodos &&
        currentTodos.map((todo) => {
          return <Todo props={props} todo={todo} key={todo.id} error={error} />;
        })}
      <StPageNumberUl>
        {pageNumber.map((pageNum) => {
          return (
            <Pagination
              pageNum={pageNum}
              key={pageNum}
              paginate={paginate}
              selected={currentPage}
            />
          );
        })}
      </StPageNumberUl>
    </>
  );
};

export default TodoList;
