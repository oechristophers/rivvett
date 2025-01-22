import styled from 'styled-components';
import css from 'styled-jsx/css';
const Box = styled.div`
  background-color: #fff;
  max-width: 580px;
  @media screen and (max-width: 900px) {
    max-width: 100%;
  }
  height: auto;
  ${(props) =>
    props.proImage &&
    `
      background-color: transparent;
      padding: 0 50px;
    `}
  ${(props) =>
    props.small &&
    `
      padding: 25px 30px;
      grid-area: a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.bgrid &&
    `
      grid-area: b;
      padding: 10px 20px;
    `}
  ${(props) =>
    props.egrid &&
    `
      padding: 5px 30px;
      grid-area: e;
    `}
  ${(props) =>
    props.fgrid &&
    `
      padding: 20px 20px;
      grid-area: f;
      padding-bottom: 60px;
    `}
  ${(props) =>
    props.dgrid &&
    `
      max-width: fit-content;
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
      margin-bottom: 20px;
      font-family: 'Futura Std Book';
      width: 100%;
      @media screen and (min-width: 900px) {
        align-self: start;
        width: 100%;
      }
    `}
    ${(props) =>
    props.cgrid &&
    `
      grid-area: c;
      display: flex;
      padding: 0 20px;
      padding-top: 10px;
      flex-direction: column;
      gap: 20px;
      transition: all 0.3s ease; /* duration and timing function */
    `}
    ${(props) =>
    props.ggrid &&
    `
      position: relative;
      grid-area: g;
      display: flex;
      padding: 0 20px;
      flex-direction: column;
      gap: 20px;
      transition: all 0.3s ease; /* duration and timing function */
      @media screen and (max-width: 600px) {
        padding: 0;
      }
    `}

    .shipDiv2 {
    display: flex;
    padding: 30px 70px;
    flex-direction: column;
    gap: 0;
    transition: all 0.3s ease;
    @media screen and (max-width: 600px) {
      padding: 20px 10px;
      padding-left: 60px;
    }
    .title {
      margin-top: 10px;
      margin-bottom: -10px;
    }
    p {
      font-size: 0.75rem;
      font-family: 'Futura Std Book';
      color: #000;
    }
    .shipBtn {
      padding-top: 6px;
      font-size: 0.8rem;
      font-family: 'Futura Std Book';
      text-decoration: underline;
      width: fit-content;
      cursor: pointer;
    }
    .shipping {
      margin: 0;
      padding: 0;
      @media screen and (max-width: 900px) {
        width: 100%;
      }
    }
    ::before {
      content: '';
      position: absolute;
      display: block;
      margin-top: 7px;
      left: 30px;
      top: 28px;
      background-size: 36px;
      height: 36px;
      width: 36px;
      background-position: center top;
      background-image: url('/fast-delivery.png');
      @media screen and (max-width: 600px) {
        left: 10px;
      }
    }
  }

  ${(props) =>
    props.delivery &&
    `
      display: flex;
      justify-content: center;
      padding: 10px;
      max-width: 100%;
      background-color: #cceedf;
      align-items: center;
    `}
  ${(props) =>
    props.empty &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      width: 100%;
      padding: 0;
    `}
`;

export default Box;
