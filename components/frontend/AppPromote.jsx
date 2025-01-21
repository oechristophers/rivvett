import React from 'react';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';

export default function AppPromote() {
  const Div = styled.div`
    display: flex;
    padding: 30px 0;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    margin-bottom: 30px;
    background: linear-gradient(90deg, #ff385c 0%, #f799ba 100%);
  `;
  const Button = styled(ButtonLink)`
    color: black;
    border: 2px solid black;
    border-radius: 9999px;
    padding: 10px 40px;
    font-family: 'Futura Std bold';
    font-size: 1.8rem;
    ${(props) =>
      props.darkOne &&
      `
      background-color: black;
      color: white;
      font-size:1.3rem;
      padding: 6px 25px;
    `}
  `;
  return (
    <Div>
      <Button href="">THE RIVVETT APP</Button>
      <Button darkOne href="">
        DOWNLOAD NOW
      </Button>
    </Div>
  );
}
