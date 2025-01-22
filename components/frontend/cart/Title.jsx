import React from 'react';
import styled from 'styled-components';

const Text = styled.h2`
  font-family: 'Futura Std Heavy';
  letter-spacing: 2px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1rem;
`;

export default function Title({ children, className, ...rest }) {
  return (
    <Text className={`Title ${className}`} {...rest}>
      {children}
    </Text>
  );
}
