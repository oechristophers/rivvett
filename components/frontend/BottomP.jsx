import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  padding: 25px 0;
`;

const P = styled.p`
  max-width: 50%;
  margin: 0 auto;
  text-align: center;
  line-height: 2;
  font-size: 0.8rem;
  letter-spacing: 1px;
  font-family: 'Futura Std Book';
  font-weight: lighter;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;
export default function BottomP() {
  const router = useRouter();
  const path = router.pathname.split('/')[1];
  return (
    <Div>
      {path === 'men' && (
        <P>
          Level up your off-duty looks with Rivvett, bringing you on-trend
          menswear and accessories from Rivvett Collection shops. Elevate your
          layering game with refined basics, featuring must-have essentials like
          smart-casual polos, oversized tees, and easy-to-throw-on shirts in
          sleek tonal shades. If you&apos;re hunting for trousers and denim,
          explore everything from on-trend cargos to classic fits in the denim
          collection. Keep your shoe game strong with a selection of versatile
          kicks, perfect for finishing off your look. Whether you&apos;re
          looking to stay cozy or active, Rivvett&apos;s got you covered. Time
          to scroll!
        </P>
      )}
      {path === 'women' && (
        <P>
          Your one-stop destination for fashion-forward looks, Rivvett brings
          you the latest in womenswear and accessories – so you can feel your
          best, no matter your style. With collections for every occasion and
          vibe, Rivvett DESIGN drops smart-casual staples and bold, head-turning
          pieces for those statement moments. Browse through evening dresses
          perfect for your next night out, with faux feathers, sequins, and
          satin taking center stage. For trendy, off-duty looks season after
          season, explore the collection of on-trend trousers, tops, footwear,
          and accessories in must-have cuts and colors. Ready to level up your
          athleisure? Rivvett&apos;s sportswear edit has got you covered,
          delivering performance-focused pieces in bold prints and vibrant hues.
          Time to hit checkout!
        </P>
      )}
    </Div>
  );
}
