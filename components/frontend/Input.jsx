import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-family: Futura Std Medium;
  font-size:.88rem ;
  ${(props) =>
    props.search &&
    `
        border-radius: 50px;
        height: 38px;
        padding: 0 15px;
        font-size: 1rem;
         font-size: .89rem;
    `}

  @media screen and (min-width: 980px) {
    display: flex;
  }
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
