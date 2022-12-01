import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 35px;
  width: 50px;
  height: 30px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: aliceblue;
`;

const Button = (props) => {
  return (
    <StyledButton type={props.type} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
