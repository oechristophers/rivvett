import React from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';
import Search from '../Search';
import { UseIsDevice } from '../DeviceView';

const Div = styled.div`
  display: flex;
  position: relative;
  margin-left: 40px;
  margin-right: 40px;
  width: 100%;
  .Scontain {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .flexed {
    display: flex;
    padding-top: 13px;
    position: relative;
  }

  @media screen and (max-width: 800px) {
    ${(props) =>
      props.showInput &&
      `
        position: absolute;
        margin: 0;
        padding: 0;
        z-index: 1000;
      `}
  }
`;
export default function SearchBar({
  showInput,
  showResults,
  setShowInput,
  setShowResults,
  searchContainerRef,
  data,
}) {
  const { higherMobile } = UseIsDevice();
  return (
    <Div
      ref={searchContainerRef}
      showResults={showResults}
      showInput={showInput}
      tabIndex={0}
      onFocus={() => {
        !higherMobile && setShowInput(true);
        setShowResults(true);
      }}
      onBlur={() => {
        setShowResults(false);
      }}
    >
      <Search
        showResults={showResults}
        showInput={showInput}
        setShowInput={setShowInput}
        setShowResults={setShowResults}
        data={data}
      />
    </Div>
  );
}
