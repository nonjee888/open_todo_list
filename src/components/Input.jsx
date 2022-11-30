import styled from "styled-components";

const Input = (props) => {
  return (
    <StyledInput
      style={props.style}
      type={props.type}
      required={props.required}
      value={props.value || ""}
      onChange={props.onChange}
      placeholder={props.placeholder}
      min={props.min}
    />
  );
};
export default Input;
const StyledInput = styled.input`
  margin: 35px 0 20px 0;
  width: 200px;
  height: 30px;
  border: none;
  border-radius: 5px;
`;
