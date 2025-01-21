import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Add, Remove } from '@mui/icons-material';

const AccordionContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  @media screen and (max-width: 780px) {
    max-width: fit-content;
  }
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #ccc;
  font-family: 'Futura Std Book';
  font-weight: lighter;
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 0.7rem;
  font-size: 0.8rem;
  font-family: 'Futura Std Heavy';
  text-align: left;
  letter-spacing: 1.2px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #e7e7e7;
  }
`;

const AccordionContent = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;
  white-space: pre-line;
  font-size: 1rem;

  p {
    font-weight: 100;
    font-size: 0.8rem;
    margin: 0;
    color: #000000a8;
  }
`;

const IconWrapper = styled.div`
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(90deg)')};
`;

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const refs = useRef([]); // Array of refs for each item

  const toggleAccordion = (index) => {
    const contentRef = refs.current[index];
    if (contentRef) {
      const contentHeight = contentRef.scrollHeight;
      contentRef.style.height =
        openIndex === index ? '0px' : `${contentHeight}px`;
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => toggleAccordion(index)}>
            {item.title}
            <IconWrapper isOpen={openIndex === index}>
              {openIndex === index ? <Remove /> : <Add />}
            </IconWrapper>
          </AccordionHeader>
          <AccordionContent
            ref={(el) => (refs.current[index] = el)} // Assign ref to current item
          >
            <br />
            {item.content.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
            <br />
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

export default Accordion;
