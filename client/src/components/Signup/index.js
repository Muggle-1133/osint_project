import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Navbar from "../Navbar/index";
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormInput,
  FormH1,
  FormButton,
  SuccessMsgBox,
  MessageContent,
  LinkBtn,
  Content,
  ContentContainer,
} from "./SignupElements";
import { FaInfoCircle } from "react-icons/fa";
import AlertMessage from "./AlertMessage";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ setLoginStatus }) => {
  const history = useHistory();

  const [signupStatus, setSignUpStatus] = useState(false);

  const Text = "로그인";
  const location = "/signin";
  const iconClass = "fa-solid fa-right-to-bracket";

  // SNS Icon style 지정
  const EmailIcon = {
    url: "/img/letter_icon.svg",
    size: "27px 55%",
  };
  const PwIcon = { url: "/img/password_icon.svg", size: "28px 50%" };
  const NameIcon = {
    url: "/img/user_icon.svg",
    size: "28px 53%",
  };

  // 회원가입 form input들의 state 선언부
  const [input, setInput] = useState({
    email: "",
    pw: "",
    confirmPw: "",
    userName: "",
  });
  const [message, setMessage] = useState({
    email: "",
    pw: "",
    confirmPw: "",
    userName: "",
  });
  const [isTrue, setIsTrue] = useState({
    email: false,
    pw: false,
    confirmPw: false,
    userName: false,
  });
  const [display, setDisplay] = useState({
    email: "none",
    pw: "none",
    confirmPw: "none",
    userName: "none",
  });
  const [btnType, setBtnType] = useState("button");

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // email 유효성 검사
  const CheckEmail = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    // email란이 공백인 경우
    if (input.email === "") {
      setMessage({ ...message, email: "이메일을 입력해 주세요." });
      setDisplay({ ...display, email: "flex" });
      setIsTrue({ ...isTrue, email: false });
    }
    // email란이 공백이 아닌 경우
    else {
      // email 형식이 잘못된 경우
      if (!emailRegex.test(input.email)) {
        setMessage({ ...message, email: "이메일 형식이 올바르지 않습니다." });
        setDisplay({ ...display, email: "flex" });
        setIsTrue({ ...isTrue, email: false });
      }
      // email 형식에 맞게 입력된 경우
      else {
        setMessage({ ...message, email: "" });
        setDisplay({ ...display, email: "none" });
        setIsTrue({ ...isTrue, email: true });
      }
    }
  };

  // paaword 유효성 검사
  const CheckPw = () => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    // password란이 공백인 경우
    if (input.pw === "") {
      setMessage({ ...message, pw: "비밀번호를 입력해 주세요." });
      setDisplay({ ...display, pw: "flex" });
      setIsTrue({ ...isTrue, pw: false });
    }
    // password란이 공백이 아닌 경우
    else {
      // password 형식이 잘못된 경우
      if (!passwordRegex.test(input.pw)) {
        setMessage({
          ...message,
          pw: "비밀번호는 영문자, 숫자, 특수문자 모두 포함한 8자리 이상이어야 합니다.",
        });
        setDisplay({ ...display, pw: "flex" });
        setIsTrue({ ...isTrue, pw: false });
      }
      // password 형식에 맞게 입력된 경우
      else {
        setDisplay({ ...display, pw: "none" });
        setMessage({ ...message, pw: "" });
        setIsTrue({ ...isTrue, pw: true });
      }
    }
  };

  // 패스워드, 패스워드 확인 값이 동일한지 확인
  const CheckConfirmPw = () => {
    // password 확인란이 공백인 경우
    if (input.confirmPw === "") {
      setMessage({ ...message, confirmPw: "비밀번호 확인을 입력해주세요." });
      setDisplay({ ...display, confirmPw: "flex" });
      setIsTrue({ ...isTrue, confirmPw: false });
    }
    // password 확인란이 공백이 아닌 경우
    else {
      // password와 값이 동일하지 않은 경우
      if (input.pw !== input.confirmPw) {
        setMessage({
          ...message,
          confirmPw: "입력하신 비밀번호와 동일하지 않습니다.",
        });
        setDisplay({ ...display, confirmPw: "flex" });
        setIsTrue({ ...isTrue, confirmPw: false });
      }
      // password와 값이 동일한 경우
      else {
        setDisplay({ ...display, confirmPw: "none" });
        setMessage({ ...message, confirmPw: "" });
        setIsTrue({ ...isTrue, confirmPw: true });
      }
    }
  };

  // 사용자 이름 값 확인
  const CheckUserName = () => {
    // userName을 3글자 이상 입력하지 않은 경우
    if (input.userName.length < 3) {
      setMessage({
        ...message,
        userName: "사용자 이름을 3글자 이상 입력해주세요.",
      });
      setDisplay({ ...display, userName: "flex" });
      setIsTrue({ ...isTrue, userName: false });
    }
    // userName을 3글자 이상 입력한 경우
    else {
      setDisplay({ ...display, userName: "none" });
      setMessage({ ...message, userName: "" });
      setIsTrue({ ...isTrue, userName: true });
    }
  };
  const onClickButton = () => {
    if (isTrue.email && isTrue.pw && isTrue.confirmPw && isTrue.userName) {
      setBtnType("submit");
    }
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      CheckEmail();
      CheckPw();
      CheckConfirmPw();
      CheckUserName();
      onClickButton();
    }
  };
  // form 처리(onSubmit)
  const onSubmitForm = (e) => {
    e.preventDefault();
    Axios.post("//" + window.location.hostname + ":4000/api/register", {
      email: input.email,
      password: input.pw,
      username: input.userName,
    }).then((res) => {
      // 회원가입에 실패한 경우
      if (res.data.message) {
        console.log(res.data.message);
        setSignUpStatus(false);
      }
      // 회원가입에 성공한 경우
      else {
        setSignUpStatus(true);
        //history.push("/signin");
      }
    });
  };
  return (
    <Container>
      <FormWrap>
        <Navbar
          Text={Text}
          location={location}
          iconClass={iconClass}
          setLoginStatus={setLoginStatus}
        />
        <FormContent>
          {signupStatus ? (
            <SuccessMsgBox>
              <img src="/img/Hello.png" alt="images" />
              <ContentContainer>
                <MessageContent>TRI 회원가입이 완료되었습니다.</MessageContent>
                <Content>로그인 후 이용가능합니다.</Content>
              </ContentContainer>
              <LinkBtn onClick={() => history.push("/signin")}>
                로그인 페이지로 이동
              </LinkBtn>
            </SuccessMsgBox>
          ) : (
            <Form onSubmit={onSubmitForm}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="\img\logo_dark.png"
                  alt="logo"
                  style={{
                    width: "88px",
                    height: "73px",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <FormH1>회원가입</FormH1>
              <FormInput
                type="text"
                name="userName"
                placeholder="User Name은 3글자 이상 작성해 주세요."
                value={input.userName}
                required
                url={NameIcon.url}
                size={NameIcon.size}
                onChange={onChange}
                onKeyUp={CheckUserName}
              />
              <AlertMessage display={display.userName}>
                <FaInfoCircle />
                {message.userName}
              </AlertMessage>
              <FormInput
                type="email"
                name="email"
                placeholder="Email을 입력해 주세요."
                value={input.email}
                url={EmailIcon.url}
                size={EmailIcon.size}
                onChange={onChange}
                onKeyUp={CheckEmail}
                required
              />
              <AlertMessage display={display.email}>
                <FaInfoCircle />
                {message.email}
              </AlertMessage>
              <FormInput
                type="password"
                name="pw"
                placeholder="비밀번호는 영문자, 숫자, 특수문자 모두 포함 8자리 이상으로 작성해 주세요."
                value={input.pw}
                url={PwIcon.url}
                size={PwIcon.size}
                onChange={onChange}
                onKeyUp={CheckPw}
                required
              />
              <AlertMessage display={display.pw}>
                <FaInfoCircle />
                {message.pw}
              </AlertMessage>
              <FormInput
                type="password"
                name="confirmPw"
                placeholder="비밀번호와 동일하게 입력해주세요."
                value={input.confirmPw}
                url={PwIcon.url}
                size={PwIcon.size}
                onChange={onChange}
                onKeyUp={CheckConfirmPw}
                onKeyPress={onKeyPress}
                required
              />
              <AlertMessage display={display.confirmPw}>
                <FaInfoCircle />
                {message.confirmPw}
              </AlertMessage>

              <FormButton type={btnType} onClick={onClickButton}>
                <i className="fa-solid fa-user-plus"></i>계정 만들기
              </FormButton>
            </Form>
          )}
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default SignUp;
