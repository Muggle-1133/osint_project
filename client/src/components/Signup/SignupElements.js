import styled from "styled-components";

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
  max-width: 552px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 20px 32px 35px 32px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgb(45 42 42 / 37%);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #fff;
  letter-spacing: 0.1rem;
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 26px;
  font-weight: 400;
  text-align: center;
`;

export const FormTitle = styled.div`
  width: 100%;
  font-size: 15px;
  height: auto;
  padding-bottom: 7px;
`;
export const FormInput = styled.input`
  padding: 13px 38px;
  margin-bottom: 28px;
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
    color: #E5E5E5;
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

export const FormButton = styled.button`
  background: #01bf71;
  padding: 12px 0;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;

  i{
    margin-right: 8px;
    font-size: 19px;
  }
  &:hover {
    background: #01bf71d6;
  }
`;

export const SuccessMsgBox = styled.div`
  display: grid;
  z-index: 1;
  justify-content: center;
  align-items: center;
  height: 680px;
  padding: 17px 0;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

export const ContentContainer = styled.div`
  height: 128px;
  
`;
export const MessageContent = styled.h2`
  font-family: "IBM Plex Sans KR", sans-serif;
  color: #fbfafa;
  font-size: 32px;
  margin: 0;
`;

export const Content = styled.p`
  font-family: "IBM Plex Sans KR", sans-serif;
  text-align: center;
  color: #fbfafa;
  font-size: 18px;
  margin-top: 8px;
`;

export const LinkBtn = styled.button`
  background: #01bf71;
  padding: 9px 0;
  border: none;
  border-radius: 5px;
  color: #fdfafa;
  font-size: 20px;
  cursor: pointer;
  // width: 380px;
  // justify-self: center;
  font-family: "IBM Plex Sans KR", sans-serif;
  margin: 0;
  &:hover {
    background: #01bf71d6;
  }
`;
