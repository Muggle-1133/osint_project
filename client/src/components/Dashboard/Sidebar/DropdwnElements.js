import styled from "styled-components";

export const DropdownBox = styled.ul`
  display: ${(props) => props.display};
  position: absolute;
  width: 100%;
  left: 8px;
  top: 44px;
  margin: 0;
  padding: 0;
  z-index: 10;
`;

export const DropdownList = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 2.5rem;
  padding: 0 0 0 2rem;
  position: relative;
  transition: all 0.2s ease;
  font-size: 16px;
  color: rgba(35, 134, 88, 0.877);

  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 25%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const DropdownMenu = styled.li`
  display: block;
  width: 100%;
  height: 84px;
  background-color: #1bd185e1;
  border-radius: 7px;
  box-shadow: 5px 5px 4px 0 rgb(32 32 32 / 15%);
`;

export const Item = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 9px 27px;
  width: 100%;
  color: #fff;
  transition: all 0.2s ease;

  &:hover {
    cursor: pointer;
    color: rgb(32 30 30);
  }
`;
