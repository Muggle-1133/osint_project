import styled from "styled-components";

export const Form = styled.form`
  position: relative;
  width: 470px;
  height: 55px;
  background: rgb(66 66 66 / 28%);
  border-radius: 30px;
  transition: 0.5s;
  box-shadow: 0 0 0 3px #11d386;
  margin: 15px 0 30px 5px;
`;

export const ClearSpan = styled.span`
  position: absolute;
  top: 28px;
  left: 4%;
  width: 15px;
  right: 15px;
  background: #ff0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    position: absolute;
    content: "";
    width: 1px;
    height: 17px;
    background: #b9b9b9;
    transform: rotate(45deg);
  }
  &:after {
    position: absolute;
    content: "";
    width: 1px;
    height: 17px;
    background: #b9b9b9;
    transform: rotate(315deg);
  }
  &:hover {
    visibility: visible;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 368px;
  height: 55px;
  left: 45px;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

export const SearchInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 19px;
  padding: 10px 0 10px 5px;
  color: #f9f9f9;
  background: transparent;
  ::placeholder {
    color: #edecec;
  }
  &:focus::placeholder {
    visibility: hidden;
  }
`;

export const IconContainer = styled.div`
  position: relative;
  top: -28px;
  left: 417px;
  width: 53px;
`;

export const SearchBtn = styled.button`
  transform: translateY(-50%);
  positon: absolute;
  top: 0;
  width: 53px;
  height: 54px;
  background: transparent;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  outline: none;
  border: none;
  &:before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border: 3px solid #11d386;
    border-radius: 50%;
    transform: translate(-3px, -4px);
  }
  &:after {
    content: "";
    position: absolute;
    width: 3px;
    height: 12px;
    background: #11d386;
    transform: translate(6px, 7px) rotate(315deg);
  }
  &:active {
    width: ${(props) => props.active};
  }
`;
