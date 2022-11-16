import styled from "styled-components";

const Header = () => {
  return <StHeader>OPEN TO DO</StHeader>;
};

export default Header;

const StHeader = styled.div`
  font-size: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 100px;
  width: 100%;
  background-color: #ecec;
`;
