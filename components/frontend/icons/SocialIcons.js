import { socialIcons } from '@/constants/paymentIcons';
import styled from 'styled-components';
import ButtonLink from '../ButtonLink';
import Link from 'next/link';

const StyledIcon = styled.li`
  width: ${({ width }) => width || '48px'};
  height: ${({ height }) => height || '48px'};
  display: inline-flex;
  padding: 5px;
  border: 1px solid black;
  border-radius: 48px;
  background: ${({ color }) => color};
`;

export default function SocialIcon({ height, width }) {
  return (
    <>
      {socialIcons &&
        socialIcons.map((icon, index) => (
          <Link key={index} href={icon.name}>
            {' '}
            <StyledIcon
              key={index}
              width={width}
              height={height}
              color={icon.bgColor}
            >
              {icon.svg}
            </StyledIcon>
          </Link>
        ))}
    </>
  );
}
