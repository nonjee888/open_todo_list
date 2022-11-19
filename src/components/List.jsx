import styled from "styled-components";
import Todo from "./Todo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/modules/todos";
import Pagination from "./Pagenation";

const List = (props) => {
  const { todos, error } = useSelector((state) => state.todos);
  const query = props.query || "";
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  // 키워드 search시 전체 투두를 필터
  const filteredTodos =
    todos &&
    todos.filter((todo) => {
      if (query === "") return todos;
      const todoo = todo.text || "";
      return todoo.toLowerCase().includes(query && query.toLowerCase());
    });

  // 날짜별 오름차순 정렬
  const sortedTodos = filteredTodos.sort(
    (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
  );

  // 각 페이지에서 보여질 투두 배열
  const currentTodos = sortedTodos?.slice(indexOfFirstTodo, indexOfLastTodo);

  // 페이지 나누기
  const pageNumber = [];
  const totalTodos = todos.length;
  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumber.push(i);
  }

  /*--------------------- localStorage ---------------------*/

  let localPageNumber = [];

  // 로컬스토리지의 투두들을 리스트로 변환
  const todosFromLocalStorage = localStorage.getItem("allTodos");
  const localTodos = JSON.parse(todosFromLocalStorage);

  // 키워드 search시 로컬스토리지 전체 투두 필터
  const filteredLocalTodos =
    localTodos &&
    localTodos.filter((todo) => {
      if (query === "") return localTodos;
      const todoo = todo.text || "";
      return todoo.toLowerCase().includes(query.toLowerCase());
    });

  // 로컬스토리지 투두 배열 오름차순으로 정렬
  const sortedLocalTodos =
    filteredLocalTodos &&
    filteredLocalTodos.sort(
      (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
    );

  // 각 페이지에서 보여질 로컬스토리지의 투두 배열
  const currentLocalTodos = sortedLocalTodos?.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );
  const totalLocalTodos = localTodos && localTodos.length;

  //pageNumber ( 전체 페이지 수 / 각 페이지 당 포스트 수) 를 계산하여 전체 페이지 번호를 구한 배열
  for (let i = 1; i <= Math.ceil(totalLocalTodos / todosPerPage); i++) {
    localPageNumber.push(i);
  }

  useEffect(() => {
    dispatch(fetchTodos()).then((res) => {
      if (res.error.message === "Rejected") {
      }
    });
  }, []);

  if (error) {
    return (
      <div>
        {currentLocalTodos &&
          currentLocalTodos.map((todo) => {
            return (
              <Todo props={props} todo={todo} key={todo.id} error={error} />
            );
          })}
        <StPageNumberUl>
          {localPageNumber.map((pageNum) => {
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
      </div>
    );
  }

  return (
    <>
      {currentTodos.map((todo, idx) => {
        return <Todo props={props} todo={todo} key={todo.id} idx={idx} />;
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

export default List;

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
