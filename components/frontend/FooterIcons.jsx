import { payIcons } from '@/constants/paymentIcons';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SocialIcon from './icons/SocialIcons';
import css from 'styled-jsx/css';

const IconWrapper = styled.div`
  display: flex;
  width: 100%;
  place-content: center;
  border-top: 1px solid #ccc;
  margin-top: 20px;

  justify-content: center;
  align-items: center;
  transition: all 0.3s ease; /* Smooth transition */
  @media screen and (max-width: 768px) {
    display: none;
    ${(props) =>
      props.activeButton &&
      `
        display: flex;
        border: none;
        margin: 0;
        height: 3.7rem;
        justify-content: center;
        align-items: center;
      `}
  }
  @media screen and (max-width: 950px) {
    ${(props) =>
      props.activeButton &&
      `
        display: flex;
        border: none;
        margin: 0;
        height: 3.7rem;
        justify-content: center;
        align-items: center;
      `}
  }
`;

const Li = styled.li`
  img {
    height: 30px; /* Set a fixed height to avoid distortion */
    width: 30px;  /* Ensure width is equal to height */
    object-fit: contain; /* Prevent distortion when resizing */
  }
`;

const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
  padding-right: 35px;
  gap: 45px;
  ${(props) =>
    props.social &&
    `
  padding-right: 35px;
  gap: 45px;
`}
  ${(props) =>
    props.pay &&
    `
  border-left: 1px solid black;
  height: 20px;
  gap: 30px;
  margin: 22px 0;
  padding-left: 40px;
`}
  ${(props) =>
    props.activeButton &&
    `
      padding-right: 0;
      gap: 50px;
    `}
`;

export default function FooterIcons({ activeButton }) {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // If the component hasn't mounted yet, don't render anything
  if (!mounted) return null;

  return (
    <IconWrapper activeButton={activeButton}>
      {activeButton ? (
        <StyledUl social activeButton={activeButton}>
          <SocialIcon height="34px" width="34px" color="#ff3366" />
        </StyledUl>
      ) : (
        <>
          <StyledUl social>
            <SocialIcon height="30px" width="30px" />
          </StyledUl>

          <StyledUl pay>
            {payIcons &&
              payIcons.map((icon, index) => (
                <Li key={index}>
                  <img src={icon.logo} alt={icon.name} />
                </Li>
              ))}
          </StyledUl>
        </>
      )}
    </IconWrapper>
  );
}
