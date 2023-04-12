import React from "react";
import styled from "styled-components";

export default function SNSIcon({ bgColor, color, children }) {
  return <StyledIcon background={bgColor}>
      {React.cloneElement(children, {color})}
    </StyledIcon>;
}

const StyledIcon = styled.div`
  height: 65px;
  width: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3.5rem;
  cursor: pointer;
  background: ${(props) => props.background};

  svg {
    width: 2.3rem;
    height: 2.3rem;
    color: ${(props) => props.color};
    
  }

  &:hover {
    background: ${(props) => props.background + "c4"};
  }
`;
