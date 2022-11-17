import styled from "styled-components";

const Header = () => {
  return <StHeader>TO DO LIST</StHeader>;
};

export default Header;

const StHeader = styled.div`
  font-size: 40px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 100%;
  background-color: #ffffffcc;
`;
