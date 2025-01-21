import React from 'react';
import Center from '../Center';
import Span from './Span';
import { WorkOutlineSharp } from '@mui/icons-material';
import P from './Paragraph';
import PButton from './PButton';
import H4 from './Texth4';

export default function EmptyBag() {
  return (
    <Center>
      <Span>
        <WorkOutlineSharp />
      </Span>
      <H4>Your bag is empty</H4>
      <P
        empty
        style={{
          fontFamily: 'Futura Std Book',
          fontWeight: 'lighter',
          letterSpacing: '1.2px',
        }}
      >
        Items remain in your bag for 60 minutes, and then they&apos;re moved to
        your Saved Items.
      </P>
      <PButton
        empty
        style={{
          fontFamily: 'Futura Std Heavy',
          fontWeight: 'lighter',
          letterSpacing: '1.2px',
        }}
      >
        View saved items
      </PButton>

      <PButton shopmore> Continue Shopping</PButton>
    </Center>
  );
}
