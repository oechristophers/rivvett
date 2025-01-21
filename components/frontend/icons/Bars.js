import styled from 'styled-components';

const Icon = styled.svg`
  width: ${(props) => props.size || '25px'};
  height: ${(props) => props.size || '25px'};
`;
export default function BarsIcon({ size }) {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </Icon>
  );
}
