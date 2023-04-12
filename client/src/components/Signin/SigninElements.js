import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  // background: linear-gradient(135deg, rgb(14 14 14) 0%, rgb(102 115 129) 100%);
  background: #010101;
`;

export const FormWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 480px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 24px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  width: 145px;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

export const Form = styled.form`
  max-width: 470px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 60px 32px 35px 32px;
  box-shadow: 0 8px 32px 0 rgb(45 42 42 / 37%);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #fff;
  letter-spacing: 0.1rem;
`;

export const FormH1 = styled.h1`
  margin-top: -28px;
  margin-bottom: 60px;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  padding: 13px 38px;
  margin-bottom: 32px;
  border: none;
  outline: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  background-image: url(${(props) => `${props.url}`});
  background-size: ${(props) => `${props.size}`};
  background-repeat: no-repeat;
  background-position: 6px center;
  color: #f7f7f7;
  font-size: 14px;
  ::placeholder {
    color: #f3f3f3;
  }

  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.1rem #1df29a;
    transition: 0.1s;
    backdrop-filter: blur(12rem);
  }
  &:focus::placeholder {
    visibility: hidden;
  }
`;

export const Span = styled.span`
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-top: 34px;
  // margin-bottom: 38px;
`;

export const FormButton = styled.button`
  background: #01bf71;
  padding: 12px 0;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  i {
    margin-right: 8px;
    font-size: 19px;
  }
  &:hover {
    background: #01bf71d6;
  }
`;

export const Line = styled.hr`
  width: 100%;
  height: 0.2rem;
  border-radius: 0.8rem;
  border: none;
  margin: 1.5em 0 1rem 0;
  background: #f9f9f9;
  backdrop-filter: blur(25px);
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0.3rem 0;
  width: 100%;
`;

export const LabelContainer = styled.p`
  background-color: transparent;
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const Label = styled.label`
  overflow: hidden;
  background-color: transparent;
  color: #f3f3f3;
  margin-left: 3px;
  font-size: 14px;
`;

export const InputCheckBox = styled.input`
  float: left;
  height: 25px;
`;

export const FindPwdLink = styled(Link)`
  float: right;
  background-color: transparent;
  color: #f3f3f3;
`;



