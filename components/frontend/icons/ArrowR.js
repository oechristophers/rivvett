import styled from 'styled-components';

const Icon = styled.svg`
  width: ${(props) => props.size || '40px'};
  height: ${(props) => props.size || '40px'};
`;
export default function ArrowR({ size }) {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </Icon>
  );
}
