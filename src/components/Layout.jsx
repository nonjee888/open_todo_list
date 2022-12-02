import styled from "styled-components";

const StyledLayout = styled.div`
  max-width: 900px;
  height: 100%;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Layout = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

export default Layout;
