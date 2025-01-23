import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 90%;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
  z-index: 50;
  overflow-y: auto;
  font-family: 'Futura Std Book';
  letter-spacing: 0.9px;
  h2 {
    font-family: 'Futura Std Heavy';
    letter-spacing: 1.2px;
  }
`;

export default SidebarContainer;
