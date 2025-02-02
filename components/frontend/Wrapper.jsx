import styled from 'styled-components';
import css from 'styled-jsx/css';

const StyledWrapper = styled.div`
  padding: 0 25px;
  ${(props) =>
    props.header &&
    `
  padding: 0 25px;
`}

  @media screen and (max-width: 900px) {
    ${(props) =>
      props.header &&
      `
  padding: 0 10px;
`}
  }
  @media screen and (min-width: 600px) {
    ${(props) =>
      props.products &&
      `
  padding: 0 70px;
`}
  }
  @media screen and (min-width: 750px) {
    ${(props) =>
      props.products &&
      `
  padding: 0 10px;
`}
  }

  ${(props) =>
    props.products &&
    `
  padding: 0px;
`}
  ${(props) =>
    props.pid &&
    `
      padding: 0 10px;
      @media screen and (max-width: 780px) {
        padding: 0;
      }
    `}
`;
export default function Wrapper({ children, header, products, pid }) {
  return (
    <StyledWrapper header={header} products={products} pid={pid}>
      {children}
    </StyledWrapper>
  );
}
