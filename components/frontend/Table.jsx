import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: normal;
    font-size: large.7rem;
  }
  td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
