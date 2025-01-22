import React from 'react';
import styled from 'styled-components';

const IBox = styled.div`
  position: relative;
  width: 6rem;
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .shipping {
    max-width: 70%;
    min-width: 20%;
  }
`;
export default function ImageBox({ children, className, ...rest }) {
  return (
    <IBox className={`span ${className}`} {...rest}>
      {children}
    </IBox>
  );
}
