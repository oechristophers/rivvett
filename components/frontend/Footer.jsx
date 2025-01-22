import React, { act, useState } from 'react';
import Wrapper from './Wrapper';
import { CountryList, FooterNav } from '@/constants/FooterItems';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';
import { Add, Remove } from '@mui/icons-material';
import css from 'styled-jsx/css';

const FooterWrapper = styled.div`
  background: #000;

  ${(props) =>
    props.activeButton &&
    `
    background-color: #d4cfcf70;
    padding-top: 20px;
  `}
`;
const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background: #fffefee8;
  padding: 0 20px;
  padding-top: 30px;
  ${(props) =>
    props.activeButton &&
    `
    background: #fffefe17;
    padding: 0;
   display: flex;
   flex-direction: column;
  `}
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 768px) {
    padding-top: 5px;
  }
`;
const StyledButtonLink = styled(ButtonLink)`
  font-family: 'Futura Std Heavy';
  letter-spacing: 1.2px;
`;
const Div = styled.div`
  padding: 0 20px;
  gap: 0;
  ${(props) =>
    props.rights &&
    `padding:20px;background: #fffefed9;display: flex;justify-content: space-between;`}
  @media screen and (max-width: 1000px) {
    ${(props) =>
      props.country &&
      `
         grid-column: span 3;
         border-top: 1px solid #49474728;
         padding:0;
         margin:0 20px;
       `}
    ${(props) =>
      props.activeButton &&
      `
       padding:0;
       `}
  }
  @media screen and (max-width: 768px) {
    ${(props) =>
      props.navs &&
      `
          display:none;
          
       `}
    ${(props) =>
      props.country &&
      `
         border-top: none;
         padding:0;
         margin:0;
         `}
  }
`;
const StyledUl = styled.div`
  list-style-type: none;
  padding-bottom: 40px;
  display: grid;
  margin-top: 0;
  ${(props) =>
    props.country &&
    css`
      display: flex;
      gap: 25px;
      flex-wrap: wrap;
      padding-right: 20px;
      padding-bottom: 20px;
      @media screen and (max-width: 600px) {
        gap: 20px;
      }
    `}
  ${(props) =>
    props.activeButton &&
    css`
      padding: 0 20px;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition:
        max-height 0.3s ease-in-out,
        opacity 0.3s ease-in-out;

      &.expanded {
        max-height: 500px;
        opacity: 1;
        display: flex;
        flex-direction: column;
      }
    `}

  @media screen and (max-width: 1000px) {
    padding-bottom: 30px;
  }
  @media screen and (max-width: 768px) {
    padding-bottom: 15px;
  }
`;

const Title = styled.h3`
  color: #494747dd;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0;
  padding-bottom: 6px;
  font-family: 'Futura Std Heavy';
  letter-spacing: 1.2px;
  ${(props) =>
    props.foot &&
    `
    margin-top:0;
  `}
  ${(props) =>
    props.activeButton &&
    css`
      padding: 0 20px;
      padding-bottom: 10px;
      font-size: 0.7rem;
      font-family: 'Futura Std Book';
      text-align: left;
      letter-spacing: 1.2px;
      border: none;
      cursor: pointer;
      display: flex;
      border-bottom: 1px solid #49474728;
      justify-content: space-between;
      text-transform: capitalize;
      align-items: center;
    `}
  @media screen and (max-width: 1000px) {
    ${(props) =>
      props.hide &&
      `
   display: none;
  `}
  }
`;
const P = styled.p`
  color: #494747dd;
  margin: 0;
  font-size: 0.76rem;
  padding: 0 20px;

  @media screen and (max-width: 400px) {
    span {
      display: none;
    }
  }
`;

const Span = styled.div`
  margin-top: 12px;
  img {
    width: 25px;
    height: 15px;
    border-right: 2px solid #494747dd;
    padding-right: 7px;
  }
`;
const Sect = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0;
  ${(props) =>
    props.country &&
    `
    flex-direction: column;
  `}
  @media screen and (max-width: 1000px) {
    ${(props) =>
      props.country &&
      `
     flex-direction: row;
    `}
    ${(props) =>
      props.activeButton &&
      `
     padding: 0 20px;
    `}
  }
  @media screen and (max-width: 768px) {
    ${(props) =>
      props.hide &&
      `
     display:none;
    `}
    ${(props) =>
      props.country &&
      `
     flex-direction: column;
    `}
  }
`;
const H4 = styled.h4`
  color: #494747dd;
  font-size: 0.8rem;
  font-weight: normal;
  font-family: 'Futura Std Book';
  padding: 0;
  margin-top: 10px;
  ${(props) =>
    props.nopad &&
    `
    margin-top:0;
    margin:0;
    width: 23ch;
  `}
`;
const IconWrapper = styled.div`
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(90deg)')};
`;

export default function Footer({ activeButton }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FooterWrapper activeButton={activeButton}>
      <FooterGrid activeButton={activeButton}>
        {activeButton ? (
          <div className="flex flex-col">
            {FooterNav &&
              FooterNav.map((item, index) => (
                <Div key={index} activeButton={activeButton}>
                  <Title
                    onClick={() => toggleAccordion(index)}
                    activeButton={activeButton}
                  >
                    {item.title}
                    <IconWrapper isOpen={openIndex === index}>
                      {openIndex === index ? <Remove /> : <Add />}
                    </IconWrapper>
                  </Title>
                  <StyledUl
                    activeButton={activeButton}
                    className={openIndex === index ? 'expanded' : ''}
                  >
                    {item.items.map((item, itemIndex) => (
                      <ButtonLink foot href={item.link} key={itemIndex}>
                        {item.name}
                      </ButtonLink>
                    ))}
                  </StyledUl>
                </Div>
              ))}
            <Sect activeButton={activeButton}>
              <H4>You&apos;re in </H4>{' '}
              <Span>
                {CountryList && (
                  <img src={CountryList[0].flag} alt={CountryList[0].name} />
                )}
              </Span>{' '}
              <Title foot>
                <StyledButtonLink foot href="/">
                  Change
                </StyledButtonLink>
              </Title>{' '}
            </Sect>
          </div>
        ) : (
          <>
            {FooterNav &&
              FooterNav.map((item, index) => (
                <Div navs key={index}>
                  <Title>{item.title}</Title>
                  <StyledUl>
                    {item.items.map((item, itemIndex) => (
                      <ButtonLink foot href={item.link} key={itemIndex}>
                        {item.name}
                      </ButtonLink>
                    ))}
                  </StyledUl>
                </Div>
              ))}
          </>
        )}
        {!activeButton && (
          <Div country>
            <Title hide>Shopping From:</Title>
            <Sect hide>
              <H4>You&apos;re in </H4>{' '}
              <Span>
                {CountryList && (
                  <img
                    src={CountryList[0].flag}
                    alt={CountryList[0].name}
                    className="w-4 h-4
                    "
                  />
                )}
              </Span>{' '}
              <Title foot>
                <StyledButtonLink foot href="/">
                  Change
                </StyledButtonLink>
              </Title>{' '}
            </Sect>
            <Sect country>
              <H4 nopad>Some of our international sites:</H4>
              <StyledUl country>
                {CountryList &&
                  CountryList.map((item, index) => (
                    <ButtonLink country href={item.name} key={index}>
                      <img src={item.flag} alt={item.name} />
                    </ButtonLink>
                  ))}
              </StyledUl>
            </Sect>
          </Div>
        )}
      </FooterGrid>
      {!activeButton && (
        <Div rights>
          <P>&copy;2022 Rivvett</P>
          <P>
            {' '}
            Privacy & Cookies | Ts&Cs<span>| Accesibility</span>
          </P>
        </Div>
      )}
    </FooterWrapper>
  );
}
