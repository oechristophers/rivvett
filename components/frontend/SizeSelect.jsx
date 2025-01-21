import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  height: 2.5rem;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 0;
  outline: none;
  ${(props) =>
    props.cartSide &&
    css`
      border: none;
      width: fit-content;
    `}
`;
const SizeSelect = ({ sizeProp, value, onChange }) => (
  <StyledSelect value={value} onChange={onChange}>
    <option value="">Please select</option>
    {sizeProp?.length > 0 &&
      sizeProp.map((s) => (
        <option key={s} value={`US Size ${s.toUpperCase()}`}>
          {`US Size ${s.toUpperCase()}`}
        </option>
      ))}
  </StyledSelect>
);

export default SizeSelect;
