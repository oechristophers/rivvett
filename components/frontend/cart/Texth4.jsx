import React from 'react';
import styled from 'styled-components';

const Text = styled.h4`
  font-family: 'Futura Std Bold';
  letter-spacing: 2.3px;
  font-weight: 900;
`;
export default function H4({ children, className, ...rest }) {
  return (
    <Text className={`h4 ${className}`} {...rest}>
      {children}
    </Text>
  );
}
