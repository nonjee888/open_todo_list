import React from "react";
import styled from "styled-components";

const Pagination = ({ pageNum, paginate, selected }) => {
  //pageNumber ( 전체 페이지 수 / 각 페이지 당 포스트 수) 를 계산하여 전체 페이지 번호를 구한 배열

  return (
    <StNumber
      key={pageNum}
      onClick={() => paginate(pageNum)}
      style={
        selected === pageNum
          ? { background: "#ececec", fontWeight: "900" }
          : { background: "#ffffff" }
      }
    >
      {pageNum}
    </StNumber>
  );
};

export default Pagination;

const StNumber = styled.li`
  border-radius: 100%;
  width: 30px;
  height: 30px;
  border: 1px solid none;
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
