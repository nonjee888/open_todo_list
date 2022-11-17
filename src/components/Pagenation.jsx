import React from "react";
import styled from "styled-components";

const Pagination = ({ todosPerPage, totalTodos, paginate }) => {
  //pageNumber ( 전체 페이지 수 / 각 페이지 당 포스트 수) 를 계산하여 전체 페이지 번호를 구한 배열
  const pageNumber = [];

  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Head>
      {pageNumber.map((pageNum) => (
        <Number key={pageNum} onClick={() => paginate(pageNum)}>
          {pageNum}
        </Number>
      ))}
    </Head>
  );
};

export default Pagination;

const Head = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  list-style: none;
  padding: 0;
  gap: 10px;
  padding-bottom: 5px;
`;
const Number = styled.li`
  display: inline-block;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  border: 1px solid #9c7fcb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;

  :hover {
    color: black;
    font-weight: bold;
    text-decoration: underline;
  }
`;
