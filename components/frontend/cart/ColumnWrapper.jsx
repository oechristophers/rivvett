import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 0 15px;
  position: relative;
  align-items: flex-start;
  gap: 10px;
  justify-content: center;
  margin-top: 40px;
  justify-content: center;
  a,
  button {
    color: black;
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    padding: 0 5px;
  }
`;
export default function ColumnWrapper({ children, className, ...rest }) {
  return (
    <Wrapper className={`wrapper ${className}`} {...rest}>
      {children}
    </Wrapper>
  );
}
