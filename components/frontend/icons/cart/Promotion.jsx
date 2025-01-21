import React from 'react';
import Box from '../../Box';
import Span from './Span';
import Image from 'next/image';
import P from './Paragraph';

export default function Promotion() {
  return (
    <Box delivery>
      <Span>
        <Image
          width={100}
          height={100}
          layout="intrinsic"
          src="/icons8-confetti-48.png"
          alt=""
        />
      </Span>
      <P delivery>
        <Span delivery>Free delivery on this order </Span>Congrats, you get FREE
        Standard Shipping to your location for spending over $70.00!
      </P>
    </Box>
  );
}
