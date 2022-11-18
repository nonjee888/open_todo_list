import React from "react";
import styled from "styled-components";

const Pagination = ({ pageNum, paginate, selected }) => {
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
