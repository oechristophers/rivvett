import React from 'react';
import Box from '../Box';
import styled from 'styled-components';
import { ExpandMore } from '@mui/icons-material';
import P from './Paragraph';
import InfoCell from './InfoCell';
import Div from './Div';
import Title from './Title';
import ImageBox from './ImageBox';
import Button from '../Button';
import Image from 'next/image';

const ExpandableDiv = styled.div`
  max-height: ${(props) => (props.expanded ? '300px' : '0')};
  overflow: hidden;
  transition:
    max-height 0.8s ease,
    opacity 0.3s ease;
  opacity: ${(props) => (props.expanded ? '1' : '0')};
`;
const ExpandMoreIcon = styled(ExpandMore)`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export default function Premium({ expanded, setExpanded }) {
  return (
    <Box cgrid>
      <InfoCell>
        <ImageBox>
          {/* Display the product image */}
          <Image
            width={100}
            height={100}
            layout="responsive"
            src={'/images/shipping.png'}
            alt={'shipping'}
            className="shipping"
          />
        </ImageBox>
        <Div className="shipDiv">
          <Title className="title">RIVVETT Premier USA</Title>&nbsp;
          <P title className="shipping">
            Enjoy unlimited Express Delivery on all orders of $50+ and Standard
            Shipping on all others over $20 for a whole year for only $19.99!
            Ts&Cs apply.
          </P>
          <Button className="shipBtn">Add to bag</Button>
        </Div>
        <ExpandMoreIcon
          className="expandMore"
          expanded={expanded}
          style={{}}
          onClick={() => {
            setExpanded(!expanded);
          }}
        />
      </InfoCell>
      <ExpandableDiv expanded={expanded} className="shipDiv">
        <P title className="shipping">
          Sign up to RIVETT Premier USA for unlimited Express Delivery on orders
          of $50+ (plus, Standard Shipping on all others over $20!) for a whole
          year. Say hello to speedy, hassle-free shopping!
        </P>
        <Title className="title">Only $19.99 for 12 months</Title>
        <P title className="shipping">
          By signing up, you&apos;re agreeing to these terms and conditions.
          *Cut-off times and dates, and postcode restrictions apply.
        </P>
        <br />
      </ExpandableDiv>
    </Box>
  );
}
