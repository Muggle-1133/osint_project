import styled from "styled-components";

export const SearchForm = styled.form`
  position: relative;
  width: 470px;
  height: 55px;
  background: #fff;
  border-radius: 3px;
  transition: 0.5s;
  box-shadow: 0 0 0 5px #11d386;
  over-flow: hidden;
`;

export const SearchBtn = styled.button`
  transform: translateY(-49%);
  positon: absolute;
  width: 53px;
  height: 53.5px;
  background: #fff;
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
export const IconContainer = styled.div`
  position: relative;
  top: -28px;
  left: 417px;
  width: 53px;
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
`;

export const SelectBox = styled.select`
  outline: none;
  border: 1px solid #0bd46c;
  border-radius: 3px;
  position: absolute;
  left: 0;
  padding: 8px 0 8px 3px;
  font-size: 15px;
`;

export const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 17px;
  padding: 10px 0 10px 5px;

  ::placeholder {
    color: #989999;
  }
  &:focus::placeholder {
    visibility: hidden;
  }
`;

export const ClearSpan = styled.span`
  position: absolute;
  top: 30px;
  left: 4%;
  //top: 50%;
  //transform: translateY(-50%);
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
    background: #999;
    transform: rotate(45deg);
  }
  &:after {
    position: absolute;
    content: "";
    width: 1px;
    height: 17px;
    background: #999;
    transform: rotate(315deg);
  }
  &:hover {
    visibility: visible;
  }
`;
