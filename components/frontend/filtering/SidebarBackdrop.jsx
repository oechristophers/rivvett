import styled from 'styled-components';

const SidebarBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  transition: opacity 0.4s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

export default SidebarBackdrop;
