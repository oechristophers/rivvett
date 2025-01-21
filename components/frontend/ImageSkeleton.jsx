import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonLoader = styled.div`
  width: 100%;
  height: auto;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const SkeletonLoader2 = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
`;

export const SkeletonItem = styled.li`
  height: 40px; /* Adjust to match the height of the category buttons */
  width: 100%; /* Optional, or use a fixed width if necessary */
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 5px; /* Optional, for rounded edges */
`;
