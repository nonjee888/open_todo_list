import styled from "styled-components";

const StyledLayout = styled.div`
  max-width: 900px;
  height: 100%;
  margin: 0 auto;
`;

const Layout = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

export default Layout;
