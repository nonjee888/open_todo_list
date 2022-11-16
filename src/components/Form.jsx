import React from "react";
import styled from "styled-components";

const Form = () => {
  return (
    <StForm>
      <StElementsDiv>
        <input />
        <input type="date" />
        <button>등록</button>
        <button>삭제</button>
      </StElementsDiv>
    </StForm>
  );
};

export default Form;

const StForm = styled.form``;
const StElementsDiv = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
`;
