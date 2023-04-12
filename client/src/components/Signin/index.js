import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormH1,
  FormInput,
  FormButton,
  LabelContainer,
  Label,
  InputCheckBox,
  FindPwdLink,
} from "./SigninElements";
import AlertMessage from "./AlertMessage";
import "./signin.css";
import Navbar from "../Navbar/index";
import { FaInfoCircle } from "react-icons/fa";

const SignIn = ({ setLoginStatus }) => {
  /*====== 로그인 폼의 input과 관련된 state 선언 =====*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTrue, setIsTrue] = useState({
    email: false,
    password: false,
  });
  const [message, setMessage] = useState({
    email: "이메일을 입력해 주세요.",
    password: "비밀번호를 입력해 주세요.",
  });
  const [buttonType, setButtonType] = useState("button");
  const [display, setDisplay] = useState({
    email: "none",
    password: "none",
  });
  const history = useHistory();

  Axios.defaults.withCredentials = true;
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const Text = "회원가입";
  const location = "/signup";
  const iconClass = "fa-solid fa-user-plus";

  const EmailIcon = {
    url: "/img/letter_icon.svg",
    size: "27px 55%",
  };
  const PwIcon = { url: "/img/password_icon.svg", size: "28px 50%" };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkEmail = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email === "") {
      setIsTrue({ ...isTrue, email: false });
      setMessage({ ...message, email: "이메일을 입력해 주세요." });
      setDisplay({ ...display, email: "flex" });
    } else {
      if (!emailRegex.test(email)) {
        setIsTrue({ ...isTrue, email: false });
        setMessage({ ...message, email: "이메일 형식이 올바르지 않습니다." });
        setDisplay({ ...display, email: "flex" });
      } else {
        setIsTrue({ ...isTrue, email: true });
        setMessage({ ...message, email: "" });
        setDisplay({ ...display, email: "none" });
      }
    }
  };
  const checkPassword = () => {
    if (password === "") {
      setIsTrue({ ...isTrue, password: false });
      setMessage({ ...message, password: "비밀번호를 입력해 주세요." });
      setDisplay({ ...display, password: "flex" });
    } else {
      setIsTrue({ ...isTrue, password: true });
      setMessage({ ...message, password: "" });
      setDisplay({ ...display, password: "none" });
    }
  };

  const onClickButton = () => {
    checkEmail();
    if (isTrue.email && isTrue.password) {
      setButtonType("submit");
    } else {
      setButtonType("button");
    }
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      checkPassword();
      onClickButton();
    }
  };
  /*====== Email 기억하기 버튼 클릭 ======*/
  const checkInputRef = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const setStorage = () => {
    if (localStorage.getItem("rememberEmail") !== null) {
      setEmail(localStorage.getItem("rememberEmail"));
      setIsChecked(true);
    }
  };

  useEffect(() => {
    setStorage();
  }, []);
  useEffect(() => {
    checkEmail();
  }, [email]);
  const onClickRemember = (e) => {
    setIsChecked(!isChecked);
  };

  /*====== Sign in 버튼 클릭 ======*/
  const onSubmitForm = (e) => {
    e.preventDefault();

    Axios.post("//" + window.location.hostname + ":4000/api/login", {
      email: email,
      password: password,
    }).then((res) => {
      // 일치하는 email 또는 pw가 없는 경우
      if (res.data.message) {
        alert(res.data.message);
        inputEmailRef.current.focus();
      }
      // 성공적으로 로그인한 경우
      else {
        sessionStorage.setItem("user_id", res.data.id);
        sessionStorage.setItem("user_name", res.data.username);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("password", res.data.plainPassword);
        if (isChecked) {
          localStorage.setItem("rememberEmail", email);
          setIsChecked(true);
        } else if (
          localStorage.getItem("rememberEmail") !== null &&
          !isChecked
        ) {
          localStorage.clear();
          setIsChecked(false);
        }
        setLoginStatus(true);
        history.push("/");
      }
    });
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Navbar
            Text={Text}
            location={location}
            iconClass={iconClass}
            setLoginStatus={setLoginStatus}
          />
          <FormContent>
            <Form onSubmit={onSubmitForm}>
              <FormH1>로그인</FormH1>
              <FormInput
                type="email"
                placeholder="Email을 입력해 주세요."
                name="email"
                url={EmailIcon.url}
                size={EmailIcon.size}
                ref={inputEmailRef}
                required
                onChange={onChangeEmail}
                value={email}
              />
              <AlertMessage display={display.email}>
                <FaInfoCircle />
                {message.email}
              </AlertMessage>
              <FormInput
                type="password"
                placeholder="Password를 입력해 주세요."
                name="pw"
                url={PwIcon.url}
                size={PwIcon.size}
                ref={inputPasswordRef}
                required
                onChange={onChangePassword}
                onKeyUp={checkPassword}
                onKeyPress={onKeyPress}
              />
              <AlertMessage display={display.password}>
                <FaInfoCircle />
                {message.password}
              </AlertMessage>
              <LabelContainer>
                <Label>
                  <InputCheckBox
                    type="checkbox"
                    id="saveId"
                    name="saveId"
                    ref={checkInputRef}
                    checked={isChecked}
                    onChange={onClickRemember}
                  />
                  email 저장하기
                  {/* <FindPwdLink to="/signup">Forgot Password?</FindPwdLink> */}
                </Label>
              </LabelContainer>
              <FormButton type={buttonType} onClick={onClickButton}>
                <i className="fa-solid fa-right-to-bracket"></i>로그인
              </FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
