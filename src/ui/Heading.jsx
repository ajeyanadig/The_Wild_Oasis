import styled, { css } from "styled-components";
//this css function(w tagged literal) is compulsory if you wanna use LOGIC inside externally places variable with css(like test) !!!!
/*const test = css`
  text-align: center;
  ${10 > 5 ? "font-weight:900" : "font-weight:900"}
`;*/
//can use logic in these styled tags
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
`;
export default Heading;
