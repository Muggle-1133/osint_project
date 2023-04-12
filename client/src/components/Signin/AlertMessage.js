import React from "react";
import styled from "styled-components";

export default function AlertMessage({ display, children }) {
  return <MessageBox display={display}>{children}</MessageBox>;
}

export const MessageBox = styled.div`
  display: ${(props) => props.display};
  width: 100%;
  align-items: flex-start;
  margin-top: -23px;
  margin-bottom: 32px;
  color: #f15d24;
  font-size: 0.8125rem;
  white-space: pre-line;

  svg {
    width: 0.9rem;
    height: 1rem;
    margin-right: 0.375rem;
    margin-top: 0.1rem;
  }
`;
